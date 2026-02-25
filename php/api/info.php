<?php
header("Content-Type: text/plain");
echo "Informações do Servidor:\n";
echo "SERVER_ADDR: " . $_SERVER['SERVER_ADDR'] . "\n";
echo "HTTP_HOST: " . $_SERVER['HTTP_HOST'] . "\n";
echo "SERVER_NAME: " . $_SERVER['SERVER_NAME'] . "\n";
echo "DOCUMENT_ROOT: " . $_SERVER['DOCUMENT_ROOT'] . "\n";
echo "\nPHP Version: " . phpversion() . "\n";

echo "\nTestando Extensões:\n";
echo "PDO MySQL: " . (extension_loaded('pdo_mysql') ? "Sim" : "Não") . "\n";
echo "MySQLi: " . (extension_loaded('mysqli') ? "Sim" : "Não") . "\n";

echo "\nTentando descobrir Hostname do MySQL via comandos (se permitido):\n";
@$lh = gethostbyname('localhost');
echo "localhost IP: $lh\n";
?>