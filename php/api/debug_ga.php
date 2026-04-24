<?php
header('Content-Type: application/json');
require_once 'google_proxy.php';

$keyFile = __DIR__ . '/google-key.json';
$keyData = json_decode(file_get_contents($keyFile), true);
$accessToken = getAccessToken($keyData);

if (!$accessToken) {
    echo json_encode(['error' => 'Falha ao obter token de acesso']);
    exit;
}

$response = fetchGoogleApi('https://analyticsadmin.googleapis.com/v1/accountSummaries', $accessToken);

echo json_encode([
    'email' => $keyData['client_email'],
    'api_response' => $response
], JSON_PRETTY_PRINT);
