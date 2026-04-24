<?php
/**
 * get_config.php
 * Retorna as configurações dinâmicas do site para o React.
 */
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *"); // Permitir acesso do React (ou domínios específicos no futuro)

$configFile = __DIR__ . "/../m2-cms/config.json";

if (!file_exists($configFile)) {
    echo json_encode(["error" => "Config file not found"]);
    exit;
}

$config = json_decode(file_get_contents($configFile), true);

if (!$config) {
    echo json_encode(["error" => "Invalid JSON in config"]);
    exit;
}

echo json_encode([
    "success" => true,
    "config" => $config
], JSON_UNESCAPED_UNICODE);
