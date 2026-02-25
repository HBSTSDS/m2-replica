<?php

// RECAPTCHA GOOGLE

define('RECAPTCHA_SITE_KEY', '6Ld0s3YsAAAAAJPmxf-N98sdQ-ss2qSxojjdWZy_');

define('RECAPTCHA_SECRET_KEY', '6Ld0s3YsAAAAAEHxMKwird6hmzJ20YVu9Hh5XHfG');

// -------------------------
// HEADERS / CORS
// -------------------------
header("Access-Control-Allow-Origin: *"); // se quiser travar, troque para seu domínio
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// -------------------------
// CONFIG / DB
// -------------------------
require_once 'db_config.php';

// Segredos via variável de ambiente (recomendado). Ex.: RECAPTCHA_SECRET_KEY=...
// Se não tiver como usar env var, você pode definir a constante RECAPTCHA_SECRET_KEY em um arquivo fora do webroot.
$RECAPTCHA_SECRET = getenv('RECAPTCHA_SECRET_KEY');
if (!$RECAPTCHA_SECRET && defined('RECAPTCHA_SECRET_KEY')) {
    $RECAPTCHA_SECRET = RECAPTCHA_SECRET_KEY;
}

// (Opcional) valida hostname retornado pelo Google (ajuda a evitar abuso)
// defina: RECAPTCHA_ALLOWED_HOSTS="seudominio.com,www.seudominio.com"
$RECAPTCHA_ALLOWED_HOSTS = getenv('RECAPTCHA_ALLOWED_HOSTS');

// Limites básicos
$MAX_JSON_BYTES = 1024 * 1024;      // 1MB de payload
$MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB por arquivo

// -------------------------
// FUNÇÕES AUXILIARES
// -------------------------
function json_fail($message, $http_code = 400, $extra = [])
{
    http_response_code($http_code);
    echo json_encode(array_merge(['success' => false, 'message' => $message], $extra));
    exit;
}

function verify_recaptcha_v2($secret, $token, $remoteIp = null)
{
    $verify_url = 'https://www.google.com/recaptcha/api/siteverify';

    $post_fields = [
        'secret' => $secret,
        'response' => $token,
    ];
    if (!empty($remoteIp)) {
        $post_fields['remoteip'] = $remoteIp;
    }

    // Tenta cURL (melhor), senão fallback file_get_contents
    if (function_exists('curl_init')) {
        $ch = curl_init($verify_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post_fields));
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        $resp = curl_exec($ch);
        $err = curl_error($ch);
        curl_close($ch);

        if ($resp === false) {
            return ['success' => false, 'error' => 'curl_error', 'detail' => $err];
        }
    } else {
        $options = [
            'http' => [
                'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                'method' => 'POST',
                'content' => http_build_query($post_fields),
                'timeout' => 10
            ]
        ];
        $context = stream_context_create($options);
        $resp = @file_get_contents($verify_url, false, $context);
        if ($resp === false) {
            return ['success' => false, 'error' => 'http_request_failed'];
        }
    }

    $decoded = json_decode($resp, true);
    if (!is_array($decoded)) {
        return ['success' => false, 'error' => 'invalid_json'];
    }
    return $decoded;
}

// -------------------------
// LER ENTRADA (JSON ou FormData)
// -------------------------
$data = null;

// Tenta ler JSON com limite
$raw = file_get_contents('php://input', false, null, 0, $MAX_JSON_BYTES + 1);
if ($raw !== false && strlen($raw) > 0) {
    if (strlen($raw) > $MAX_JSON_BYTES) {
        json_fail('Payload muito grande.', 413);
    }
    $tmp = json_decode($raw, true);
    if (is_array($tmp)) {
        $data = $tmp;
    }
}

// Se não for JSON, tenta POST
if (!is_array($data)) {
    $data = !empty($_POST) ? $_POST : [];
}

// Se não vier nada (nem arquivos), encerra
if (empty($data) && empty($_FILES)) {
    json_fail('Nenhum dado recebido.');
}

// -------------------------
// UPLOAD (se houver)
// -------------------------
if (!empty($_FILES)) {
    $uploadDir = __DIR__ . '/uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    // Usar finfo para validar MIME de verdade
    $finfo = function_exists('finfo_open') ? finfo_open(FILEINFO_MIME_TYPE) : null;

    foreach ($_FILES as $key => $file) {
        if (!is_array($file) || !isset($file['error']))
            continue;

        if ($file['error'] === UPLOAD_ERR_NO_FILE) {
            continue;
        }

        if ($file['error'] !== UPLOAD_ERR_OK) {
            json_fail('Falha no upload do arquivo.', 400, ['file' => $key, 'upload_error' => $file['error']]);
        }

        if (!empty($file['size']) && $file['size'] > $MAX_FILE_BYTES) {
            json_fail('Arquivo muito grande (máx. 10MB).', 413, ['file' => $key]);
        }

        $originalName = $file['name'] ?? 'arquivo';
        $ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

        $mime = $file['type'] ?? '';
        if ($finfo) {
            $mime = finfo_file($finfo, $file['tmp_name']);
        }

        // Aceitar PDF (MIME pode variar em alguns servers)
        $isPdf = ($ext === 'pdf') && in_array($mime, [
            'application/pdf',
            'application/x-pdf',
            'application/acrobat',
            'applications/vnd.pdf',
            'text/pdf'
        ], true);

        if (!$isPdf) {
            json_fail('Apenas arquivos PDF são permitidos.', 400, ['file' => $key, 'mime' => $mime, 'ext' => $ext]);
        }

        $newFileName = uniqid('cv_', true) . '_' . time() . '.pdf';
        $destination = $uploadDir . $newFileName;

        if (!move_uploaded_file($file['tmp_name'], $destination)) {
            error_log("Falha ao mover arquivo enviado: " . $originalName);
            json_fail('Não foi possível salvar o arquivo enviado.', 500);
        }

        // Link público
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? 'https' : 'http';
        $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
        $baseDir = rtrim(dirname($_SERVER['SCRIPT_NAME'] ?? ''), '/\\');
        $uploadedFileLink = "{$protocol}://{$host}{$baseDir}/uploads/{$newFileName}";

        $data[$key . '_link'] = $uploadedFileLink;
    }

    if ($finfo) {
        finfo_close($finfo);
    }
}

// -------------------------
// VALIDAR reCAPTCHA (v2)
// -------------------------
$recaptcha_token = $data['g-recaptcha-response'] ?? '';

if (empty($recaptcha_token)) {
    json_fail('Por favor, confirme que você não é um robô.');
}

if (empty($RECAPTCHA_SECRET)) {
    json_fail('reCAPTCHA não configurado no servidor (faltou RECAPTCHA_SECRET_KEY).', 500);
}

$verify = verify_recaptcha_v2($RECAPTCHA_SECRET, $recaptcha_token, $_SERVER['REMOTE_ADDR'] ?? null);

if (empty($verify['success'])) {
    error_log("reCAPTCHA failed: " . json_encode($verify));
    json_fail('Falha na verificação do reCAPTCHA. Tente novamente.');
}

// Validação extra de hostname (se ativar a env)
if (!empty($RECAPTCHA_ALLOWED_HOSTS) && !empty($verify['hostname'])) {
    $allowed = array_map('trim', explode(',', $RECAPTCHA_ALLOWED_HOSTS));
    if (!in_array($verify['hostname'], $allowed, true)) {
        error_log("reCAPTCHA hostname mismatch: " . $verify['hostname']);
        json_fail('Falha na verificação do reCAPTCHA (domínio inválido).');
    }
}

// -------------------------
// LABELS (PT-BR)
// -------------------------
$labels = [
    'formType' => 'Formulário',
    'form_type' => 'Formulário',
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
    'consentimento' => 'Consentimento',
    'subject' => 'Assunto',
    'g-recaptcha-response' => 'reCAPTCHA'
];

function getLabel($key, $labels)
{
    return $labels[$key] ?? ucfirst($key);
}

// -------------------------
// NORMALIZAR CAMPOS
// -------------------------
$formType = $data['formType'] ?? ($data['form_type'] ?? 'contato_geral');
$name = $data['nome'] ?? ($data['name'] ?? '');
$email = $data['email'] ?? '';
$whatsapp = $data['whatsapp'] ?? ($data['phone'] ?? '');
$company = $data['empresa'] ?? ($data['company'] ?? '');
$cnpj = $data['cnpj'] ?? '';

// payload completo
$payload = json_encode($data, JSON_UNESCAPED_UNICODE);

// -------------------------
// 1) SALVAR NO BANCO
// -------------------------
$db_saved = false;
try {
    $stmt = $pdo->prepare("INSERT INTO form_submissions (form_type, name, email, whatsapp, company, cnpj, payload)
                           VALUES (:type, :name, :email, :whatsapp, :company, :cnpj, :payload)");
    $stmt->execute([
        ':type' => $formType,
        ':name' => $name,
        ':email' => $email,
        ':whatsapp' => $whatsapp,
        ':company' => $company,
        ':cnpj' => $cnpj,
        ':payload' => $payload
    ]);
    $db_saved = true;
} catch (Exception $e) {
    error_log("Erro ao salvar no banco: " . $e->getMessage());
}

// -------------------------
// 2) ENVIAR E-MAIL
// -------------------------
$to = "marketing@m2flex.com.br, contato@m2flex.com.br";
$subject = "Novo Lead Site M2: " . ($name ?: 'Sem nome') . " [" . getLabel($formType, $labels) . "]";

$messageBody = "<div style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>";
$messageBody .= "<h2 style='color: #E5258C;'>Novo contato pelo site</h2>";
$messageBody .= "<p><strong>" . getLabel('formType', $labels) . ":</strong> " . htmlspecialchars((string) $formType) . "</p>";
$messageBody .= "<hr style='border: 1px solid #eee; margin: 20px 0;'>";

foreach ($data as $key => $value) {
    // ignora campos internos
    if (strcasecmp($key, 'formType') === 0 || strcasecmp($key, 'form_type') === 0)
        continue;
    if (strcasecmp($key, 'g-recaptcha-response') === 0)
        continue;

    if ($key === 'curriculo_link') {
        $label = getLabel($key, $labels);
        $safeUrl = htmlspecialchars((string) $value);
        $messageBody .= "<p style='margin: 10px 0;'><strong>{$label}:</strong><br/>"
            . "<a href='{$safeUrl}' style='background:#E5258C; color:white; padding:10px 15px; text-decoration:none; border-radius:5px; display:inline-block; margin-top:5px;'>Baixar Currículo (PDF)</a>"
            . "</p>";
        continue;
    }

    if (is_array($value)) {
        $value = implode(", ", $value);
    }

    if ((strcasecmp($key, 'consent') === 0 || strcasecmp($key, 'consentimento') === 0) && $value === 'on') {
        $value = 'Sim';
    }

    $label = getLabel($key, $labels);
    $displayValue = htmlspecialchars((string) $value);

    $messageBody .= "<p style='margin: 10px 0;'><strong>{$label}:</strong> {$displayValue}</p>";
}

$messageBody .= "</div>";

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type:text/html;charset=UTF-8\r\n";
$headers .= "From: M2 Flex <contato@m2flex.com.br>\r\n";
$headers .= "Return-Path: contato@m2flex.com.br\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
if (!empty($email)) {
    $headers .= "Reply-To: {$email}\r\n";
}

$mailSent = @mail($to, $subject, $messageBody, $headers);

// -------------------------
// RESPOSTA FINAL
// -------------------------
echo json_encode([
    'success' => true,
    'message' => 'Recebido com sucesso.',
    'db_saved' => $db_saved,
    'mail_sent' => (bool) $mailSent
]);
?>