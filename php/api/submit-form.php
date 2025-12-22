<?php
// submit-form.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'db_config.php';

// Lê o JSON recebido
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'Nenhum dado recebido.']);
    exit;
}

// Extrai campos principais para colunas específicas
$formType = $data['formType'] ?? 'contact';
$name = $data['nome'] ?? ($data['name'] ?? '');
$email = $data['email'] ?? '';
$whatsapp = $data['whatsapp'] ?? '';
$company = $data['empresa'] ?? ($data['company'] ?? '');
$cnpj = $data['cnpj'] ?? '';

// Payload completo em JSON
$payload = json_encode($data, JSON_UNESCAPED_UNICODE);

// 1. Salvar no Banco
try {
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
$subject = "Novo Lead Site M2: " . $name;

// Monta o corpo do e-mail
$messageBody = "<h1>Novo contato pelo site</h1>";
$messageBody .= "<p><strong>Formulário:</strong> $formType</p>";
$messageBody .= "<hr>";
foreach ($data as $key => $value) {
    // Pula campos técnicos ou muito grandes se desejar
    if (is_array($value))
        $value = json_encode($value);
    $messageBody .= "<p><strong>" . ucfirst($key) . ":</strong> " . htmlspecialchars($value) . "</p>";
}

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: no-reply@m2flex.com.br" . "\r\n";
$headers .= "Reply-To: $email" . "\r\n";

$mailSent = mail($to, $subject, $messageBody, $headers);

echo json_encode([
    'success' => true,
    'message' => 'Recebido com sucesso.',
    'db_saved' => true,
    'mail_sent' => $mailSent
]);
?>