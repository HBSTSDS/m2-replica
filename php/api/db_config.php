<?php
// Carregar credenciais locais
$cred_file = __DIR__ . '/db_credentials.php';
if (file_exists($cred_file)) {
    include($cred_file);
} else {
    // Fallback ou erro se o arquivo não existir
    die("Erro: Arquivo de credenciais não encontrado.");
}

$host = $db_host;
$dbname = $db_name;
$username = $db_user;
$password = $db_pass;

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro na conexão: " . $e->getMessage());
}
?>