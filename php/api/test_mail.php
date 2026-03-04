<?php
$to = "contato@m2flex.com.br";
$subject = "Teste de E-mail PHP " . date('Y-m-d H:i:s');
$message = "Este é um teste para verificar se a função mail() do servidor está funcionando.";
$from = "contato@m2flex.com.br";
$fromName = "Teste M2 - Deliverability";

$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: ' . $fromName . ' <' . $from . '>',
    'Reply-To: ' . $from,
    'X-Mailer: PHP/' . phpversion(),
    'Return-Path: ' . $from
];

$headersString = implode("\r\n", $headers);

echo "Tentando enviar e-mail de teste para $to...<br>";
echo "Configurações:<br>";
echo "- From: $from<br>";
echo "- Subject: $subject<br><br>";

$mailSent = mail($to, $subject, $message, $headersString, "-f" . $from);

// Log detalhado para depuração
$logEntry = date('Y-m-d H:i:s') . " - TESTE SOLICITADO: TO[$to] SUBJECT[$subject] FROM[$from] RESULT[" . ($mailSent ? 'SUCCESS' : 'FAILURE') . "]\n";
file_put_contents(__DIR__ . "/mail_log.txt", $logEntry, FILE_APPEND);

if ($mailSent) {
    echo "<b>SUCESSO:</b> O servidor disparou o e-mail para $to.<br>";
    echo "Verifique sua Caixa de Entrada e SPAM.";
} else {
    echo "<b>ERRO:</b> O servidor falhou ao enviar.";
}
?>