<?php
// submit-form.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
// Se for multipart/form-data (upload), o content-type não será application/json na resposta obrigatoriamente, 
// mas para uniformidade manteremos json se possível, exceto se o cliente esperar outro. 
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'db_config.php';

// Tenta ler JSON
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Se não for JSON, tenta pegar do $_POST (para suportar FormData com arquivos)
if (!$data) {
    if (!empty($_POST)) {
        $data = $_POST;
    }
}

if (!$data && empty($_FILES)) {
    echo json_encode(['success' => false, 'message' => 'Nenhum dado recebido.']);
    exit;
}

// ----------------------------------------------------
// PROCESSAMENTO DE UPLOAD (se houver)
// ----------------------------------------------------
$uploadedFileLink = "";
$uploadedFilePath = "";

if (!empty($_FILES)) {
    $uploadDir = __DIR__ . '/uploads/';
    // Cria diretório se não existir
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    foreach ($_FILES as $key => $file) {
        if ($file['error'] === UPLOAD_ERR_OK) {

            // Valida apenas PDF
            // mime_content_type é mais seguro, mas depende da config do servidor. 
            // Vamos confiar inicialmente no type enviado e na extensão.
            $fileType = $file['type'];
            $fileName = $file['name'];
            $ext = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

            if ($ext !== 'pdf' || $fileType !== 'application/pdf') {
                // Se não for PDF, rejeita ou apenas ignora anexo. 
                // Vamos lançar erro para o usuário saber.
                echo json_encode(['success' => false, 'message' => 'Apenas arquivos PDF são permitidos.']);
                exit;
            }

            // Gera nome único para evitar colisão e caracteres estranhos
            $newFileName = uniqid('cv_') . '_' . time() . '.pdf';
            $destination = $uploadDir . $newFileName;

            if (move_uploaded_file($file['tmp_name'], $destination)) {
                // Link público para o arquivo
                // Assumindo que este script está em /HB/api/submit-form.php e uploads em /HB/api/uploads/
                $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
                $host = $_SERVER['HTTP_HOST'];
                // Ajuste o caminho se necessário conforme a estrutura real do servidor
                $baseDir = dirname($_SERVER['SCRIPT_NAME']);
                $uploadedFileLink = "$protocol://$host$baseDir/uploads/$newFileName";

                // Adiciona ao data para salvar no banco/email como referência
                $data[$key . '_link'] = $uploadedFileLink;
            } else {
                error_log("Falha ao mover arquivo enviado: " . $file['name']);
            }
        }
    }
}


// ----------------------------------------------------
// VALIDAÇÃO DE CAPTCHA (Stateless)
// ----------------------------------------------------
// --- GOOGLE RECAPTCHA VERIFICATION ---
$recaptcha_response = $data['g-recaptcha-response'] ?? '';

if (empty($recaptcha_response)) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Por favor, confirme que você não é um robô.']);
    exit;
}

// Google reCAPTCHA verify API
// TEST SECRET KEY: 6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
// REPLACE WITH YOUR OWN KEY IN PRODUCTION
$secret_key = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';
$verify_url = 'https://www.google.com/recaptcha/api/siteverify';

$data_recaptcha = [ // Renamed $data to $data_recaptcha to avoid conflict with form data
    'secret' => $secret_key,
    'response' => $recaptcha_response,
    'remoteip' => $_SERVER['REMOTE_ADDR']
];

$options = [
    'http' => [
        'header' => "Content-type: application/x-www-form-urlencoded\r\n",
        'method' => 'POST',
        'content' => http_build_query($data_recaptcha)
    ]
];

$context = stream_context_create($options);
$result_json = file_get_contents($verify_url, false, $context);
$result = json_decode($result_json);

if (!$result->success) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Falha na verificação do reCAPTCHA. Tente novamente.']);
    exit;
}
// --- END RECAPTCHA ----------------------------------------------------
// Dicionário de Tradução (Chave Técnica -> Rótulo Legível PT-BR)
// ----------------------------------------------------
$labels = [
    'formType' => 'Formulário',
    'form_type' => 'Formulário', // caso venha snake_case
    'name' => 'Nome',
    'nome' => 'Nome',
    'email' => 'E-mail',
    'whatsapp' => 'WhatsApp',
    'phone' => 'Telefone/WhatsApp',
    'company' => 'Empresa',
    'empresa' => 'Empresa',
    'cnpj' => 'CNPJ',
    'message' => 'Mensagem',
    'mensagem' => 'Mensagem',
    'produto_interesse' => 'Produto de Interesse',
    'product_interest' => 'Produto de Interesse',
    'formato' => 'Formato',
    'quantidade' => 'Quantidade',
    'obs' => 'Observações',
    'observation' => 'Observações',
    'curriculo' => 'Currículo',
    'curriculo_link' => 'Link do Currículo',
    'resume' => 'Currículo',
    'experience' => 'Experiência',
    'rating' => 'Avaliação',
    'ponto_positivo' => 'Ponto Positivo',
    'melhorias' => 'Sugestões de Melhoria',
    'recomendaria' => 'Recomendaria a M2?',
    'contato_posterior' => 'Contato Posterior',
    'comentarios' => 'Comentários Adicionais',
    'sources' => 'Como conheceu',
    'consent' => 'Consentimento',
    'subject' => 'Assunto'
];

// Função helper para obter rótulo
function getLabel($key, $labels)
{
    return $labels[$key] ?? ucfirst($key);
}

// Extrai campos principais para colunas específicas do banco (se existirem na tabela)
$formType = $data['formType'] ?? ($data['form_type'] ?? 'contato_geral');
$name = $data['nome'] ?? ($data['name'] ?? '');
$email = $data['email'] ?? '';
$whatsapp = $data['whatsapp'] ?? ($data['phone'] ?? '');
$company = $data['empresa'] ?? ($data['company'] ?? '');
$cnpj = $data['cnpj'] ?? '';

// Payload completo em JSON
$payload = json_encode($data, JSON_UNESCAPED_UNICODE);

// 1. Salvar no Banco
try {
    // Verifica se colunas existem na tabela antes de inserir ou usa try/catch genérico
    // Assumindo a estrutura da tabela form_submissions do passo anterior:
    // form_type, name, email, whatsapp, company, cnpj, payload
    $stmt = $pdo->prepare("INSERT INTO form_submissions (form_type, name, email, whatsapp, company, cnpj, payload) VALUES (:type, :name, :email, :whatsapp, :company, :cnpj, :payload)");
    $stmt->execute([
        ':type' => $formType,
        ':name' => $name,
        ':email' => $email,
        ':whatsapp' => $whatsapp,
        ':company' => $company,
        ':cnpj' => $cnpj,
        ':payload' => $payload
    ]);
} catch (Exception $e) {
    // Log do erro, mas continua para tentar enviar o email
    error_log("Erro ao salvar no banco: " . $e->getMessage());
}

// 2. Enviar E-mail
$to = "marketing@m2flex.com.br, contato@m2flex.com.br";

// Assunto Personalizado
$subject = "Novo Lead Site M2: " . ($name ?: 'Sem nome') . " [" . getLabel($formType, $labels) . "]";

// Monta o corpo do e-mail
$messageBody = "<div style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>";
$messageBody .= "<h2 style='color: #E5258C;'>Novo contato pelo site</h2>";
$messageBody .= "<p><strong>" . getLabel('formType', $labels) . ":</strong> " . htmlspecialchars($formType) . "</p>";
$messageBody .= "<hr style='border: 1px solid #eee; margin: 20px 0;'>";

foreach ($data as $key => $value) {
    // Ignora campos técnicos internos (case-insensitive)
    if (strcasecmp($key, 'formType') === 0 || strcasecmp($key, 'form_type') === 0)
        continue;

    // Ignora o curriculo (objeto file) se ele aparecer no POST acidentalmente, e foca no link
    // Se for o link do arquivo, faz um tratamento especial
    if ($key === 'curriculo_link') {
        $label = getLabel($key, $labels);
        $messageBody .= "<p style='margin: 10px 0;'><strong>{$label}:</strong> <br/><a href='{$value}' style='background:#E5258C; color:white; padding:10px 15px; text-decoration:none; border-radius:5px; display:inline-block; margin-top:5px;'>Baixar Currículo (PDF)</a></p>";
        continue;
    }

    // Tratamento para arrays (ex: checkboxes)
    if (is_array($value)) {
        $value = implode(", ", $value);
    }

    // Formatação amigável para checkbox "on"
    if ((strcasecmp($key, 'consent') === 0 || strcasecmp($key, 'consentimento') === 0) && $value === 'on') {
        $value = 'Sim';
    }

    $label = getLabel($key, $labels);
    $displayValue = htmlspecialchars((string) $value);

    // Formatação zebrada ou simples
    $messageBody .= "<p style='margin: 10px 0;'><strong>{$label}:</strong> {$displayValue}</p>";
}
$messageBody .= "</div>";

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: no-reply@m2flex.com.br" . "\r\n";
if ($email) {
    $headers .= "Reply-To: $email" . "\r\n";
}

$mailSent = mail($to, $subject, $messageBody, $headers);

echo json_encode([
    'success' => true,
    'message' => 'Recebido com sucesso.',
    'db_saved' => true, // assumindo sucesso se não exception fatal
    'mail_sent' => $mailSent
]);
?>