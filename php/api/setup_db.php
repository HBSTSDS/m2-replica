<?php
// setup_db.php
// Script para criar a tabela automaticamente

require_once 'db_config.php';

try {
    $sql = "
    CREATE TABLE IF NOT EXISTS form_submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        form_type VARCHAR(50) NOT NULL,
        name VARCHAR(255),
        email VARCHAR(255),
        whatsapp VARCHAR(50),
        company VARCHAR(255),
        cnpj VARCHAR(50),
        payload JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ";

    $pdo->exec($sql);
    echo "Tabela 'form_submissions' criada (ou já existia) com sucesso!";

} catch (PDOException $e) {
    echo "Erro ao criar tabela: " . $e->getMessage();
}
?>