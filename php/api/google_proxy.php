<?php
/**
 * PHP Proxy to fetch Google Analytics 4 and Search Console data
 * Uses Service Account JSON key (no Composer required)
 */

header('Content-Type: application/json');

// 1. CARREGAR A CHAVE
$keyFile = __DIR__ . '/google-key.json';
if (!file_exists($keyFile)) {
    echo json_encode(['error' => 'Chave não encontrada']);
    exit;
}
$keyData = json_decode(file_get_contents($keyFile), true);

/**
 * Função para gerar o JWT e pegar o Access Token do Google
 */
function getAccessToken($keyData)
{
    $header = json_encode(['alg' => 'RS256', 'typ' => 'JWT']);
    $now = time();
    $payload = json_encode([
        'iss' => $keyData['client_email'],
        'scope' => 'https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/webmasters.readonly',
        'aud' => 'https://oauth2.googleapis.com/token',
        'exp' => $now + 3600,
        'iat' => $now
    ]);

    $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));

    $signature = '';
    openssl_sign($base64UrlHeader . "." . $base64UrlPayload, $signature, $keyData['private_key'], "SHA256");
    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

    $jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://oauth2.googleapis.com/token');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=' . $jwt);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);

    $data = json_decode($response, true);
    return $data['access_token'] ?? null;
}

$accessToken = getAccessToken($keyData);

if (!$accessToken) {
    error_log("Google Proxy: Falha ao obter access token. Verifique a chave e permissões.");
    echo json_encode(['error' => 'Falha ao obter token de acesso. Verifique a service account.']);
    exit;
}
error_log("Google Proxy: Access Token obtido com sucesso.");

// 2. PEGAR DADOS
$action = $_GET['action'] ?? 'summaries';
$propertyId = $_GET['property_id'] ?? null;
$results = [];

/**
 * Função auxiliar para CURL
 */
function fetchGoogleApi($url, $token, $postData = null)
{
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Bearer ' . $token, 'Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    if ($postData) {
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
    }
    $res = curl_exec($ch);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        error_log("Google Proxy CURL Error ($url): " . $error);
    }
    
    return json_decode($res, true);
}

// AÇÕES
if ($action === 'summaries' || $action === 'all') {
    // Listar contas e propriedades para auto-descoberta
    $results['account_summaries'] = fetchGoogleApi('https://analyticsadmin.googleapis.com/v1/accountSummaries', $accessToken);
}

if (($action === 'report' || $action === 'all') && $propertyId) {
    // GA4 Report (Usuários Ativos nos últimos 30 dias)
    $results['ga4_report'] = fetchGoogleApi("https://analyticsdata.googleapis.com/v1beta/properties/$propertyId:runReport", $accessToken, [
        'dateRanges' => [['startDate' => '30daysAgo', 'endDate' => 'today']],
        'dimensions' => [['name' => 'date']],
        'metrics' => [['name' => 'activeUsers']]
    ]);

    // Google Search Console (Cliques e Palavras-chave)
    // Usamos o domínio principal (com sc-domain: ou URL cheia dependendo de como está no GSC)
    $siteUrl = "https://m2flex.com.br/";
    $results['gsc_report'] = fetchGoogleApi("https://www.googleapis.com/webmasters/v3/sites/" . urlencode($siteUrl) . "/searchAnalytics/query", $accessToken, [
        'startDate' => date('Y-m-d', strtotime('-30 days')),
        'endDate' => date('Y-m-d'),
        'dimensions' => ['query'],
        'rowLimit' => 10
    ]);
}

echo json_encode([
    'success' => true,
    'action' => $action,
    'data' => $results
]);
