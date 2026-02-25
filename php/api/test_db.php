<?php
require_once 'db_config.php';

header("Content-Type: application/json");

try {
    $stmt = $pdo->query("SELECT 1");
    echo json_encode(["status" => "ok", "message" => "Conexão com o banco de dados funcionando!"]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Falha na conexão: " . $e->getMessage()]);
}
?>