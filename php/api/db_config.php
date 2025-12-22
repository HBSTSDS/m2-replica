<?php
// db_config.php

// Substitua com suas credenciais reais
$host = 'localhost';
$dbname = 'flavi659_Respostas';
$username = 'flavi659_HB';
$password = 'Tranquedoneves1701';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    // Configura o PDO para lançar exceções em caso de erro
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Em produção, não exiba o erro detalhado diretamente para o usuário
    die("Erro na conexão com o banco de dados: " . $e->getMessage());
}
?>