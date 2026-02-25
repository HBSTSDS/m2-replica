<?php
header("Content-Type: text/plain");

$servername = "localhost";
$username = "flavi659_usuario_respostas";
$password = "M2Flex2026!";
$dbname = "flavi659_Respostas";

echo "Tentando conexão com mysqli...\n";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("❌ FALHA no mysqli: " . $conn->connect_error);
}
echo "✅ SUCESSO com mysqli!";
$conn->close();
?>