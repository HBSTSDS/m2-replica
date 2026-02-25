<?php
require_once 'db_config.php';

try {
    $stmt = $pdo->query("SELECT id, name, email, created_at FROM form_submissions ORDER BY id DESC LIMIT 5");
    $submissions = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo "<h1>Últimas Submissões</h1>";
    echo "<pre>";
    print_r($submissions);
    echo "</pre>";
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}
?>