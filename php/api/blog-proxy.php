<?php
header('Content-Type: application/json');

$localPath = __DIR__ . "/../m2-cms/blog/posts.json";
if (file_exists($localPath)) {
    echo file_get_contents($localPath);
} else {
    function fetch_remote($url)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Accept: application/json',
            'Cache-Control: no-cache'
        ]);

        $result = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        return ['code' => $httpCode, 'data' => $result];
    }

    $url = "https://poster.flaviobrick.com.br/HB/assets/blog/posts.json";
    $res = fetch_remote($url);

    if ($res['code'] === 200) {
        echo $res['data'];
    } else {
        http_response_code($res['code']);
        echo json_encode([
            "error" => "Falha no servidor remoto e arquivo local não encontrado.",
            "url_attempted" => $url
        ]);
    }
}
?>