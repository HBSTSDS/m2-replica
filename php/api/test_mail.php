<?php
$to = "marketing@m2flex.com.br";
$subject = "Teste de E-mail PHP " . date('Y-m-d H:i:s');
$message = "Este é um teste para verificar se a função mail() do servidor está funcionando.";
$headers = "From: contato@m2flex.com.br\r\n"; // Usando um e-mail que provavelmente existe no domínio

echo "Tentando enviar e-mail para $to...<br>";

if (mail($to, $subject, $message, $headers)) {
    echo "A função mail() retornou TRUE. O servidor DISPAROU o e-mail.<br>";
    echo "Se não chegar, verifique a pasta de SPAM ou logs do servidor de e-mail.";
} else {
    echo "A função mail() retornou FALSE. O servidor FALHOU ao disparar o e-mail.";
}
?>