<?php
header("Content-Type: text/plain");

$dbname = 'flavi659_Respostas';
$username = 'flavi659_usuario_respostas';
$password = 'M2Flex2026!';

// Possíveis hosts para HostGator
$hosts = [
    '216.172.160.199', // Prioridade: Host remoto
    'localhost',
    '127.0.0.1',
    '162.241.62.235',
    'br362.hostgator.com.br'
];

echo "Iniciando Diagnóstico Agressivo...\n";
echo "Usuário: $username\n";
echo "Banco: $dbname\n\n";

foreach ($hosts as $h) {
    echo "--- Testando Host: $h ---\n";

    // Teste com PDO
    echo "  [PDO]: ";
    try {
        $pdo = new PDO("mysql:host=$h;dbname=$dbname;charset=utf8", $username, $password, [
            PDO::ATTR_TIMEOUT => 5,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);
        echo "✅ CONECTADO!\n";
    } catch (PDOException $e) {
        echo "❌ FALHA: " . $e->getMessage() . "\n";
    }

    // Teste com MySQLi
    echo "  [MySQLi]: ";
    $conn = @new mysqli($h, $username, $password, $dbname);
    if ($conn->connect_error) {
        echo "❌ FALHA: " . $conn->connect_error . "\n";
    } else {
        echo "✅ CONECTADO!\n";
        $conn->close();
    }
    echo "\n";
}

echo "\n--- Verificação de privilégios ---\n";
echo "Se todos falharem com 'Access denied', por favor confirme no cPanel se:\n";
echo "1. O usuário '$username' realmente possui a senha '$password'.\n";
echo "2. O usuário '$username' está na lista de 'Privileged Users' do banco '$dbname'.\n";
?>