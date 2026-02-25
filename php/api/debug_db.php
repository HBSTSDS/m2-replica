<?php
header("Content-Type: text/plain");

$dbname = 'flavi659_Respostas';
$username = 'flavi659_usuario_respostas';
$password = 'M2Flex2026!';

$hosts = ['localhost', '127.0.0.1'];

foreach ($hosts as $h) {
    echo "Tentando conectar em: $h\n";
    try {
        $pdo = new PDO("mysql:host=$h;dbname=$dbname;charset=utf8", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "✅ SUCESSO com $h!\n\n";
    } catch (PDOException $e) {
        echo "❌ FALHA com $h: " . $e->getMessage() . "\n\n";
    }
}

echo "\nDica: Se todos falharem com 'Access denied', verifique se o usuário MySQL no cPanel tem uma senha diferente ou se há limites de conexão no servidor.";
?>