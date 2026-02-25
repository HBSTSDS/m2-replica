<?php
session_start();

if (!isset($_SESSION['logado'])) {
    header("Location: index.php");
    exit;
}

// Caminho para o arquivo de posts
$postsFile = __DIR__ . "/../m2-cms/blog/posts.json";

// Carrega posts existentes
$posts = [];
if (file_exists($postsFile)) {
    $posts = json_decode(file_get_contents($postsFile), true);
    if (!is_array($posts)) {
        $posts = [];
    }
}

// ID que será deletado
$id = isset($_GET['id']) ? trim($_GET['id']) : '';

// Só executa se o ID for válido
if ($id !== '') {

    // Novo array sem o post removido
    $filtrados = [];
    foreach ($posts as $p) {
        if (!isset($p['id']) || $p['id'] !== $id) {
            $filtrados[] = $p;
        }
    }

    // Salva de volta no JSON
    file_put_contents(
        $postsFile,
        json_encode($filtrados, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
    );
}

header("Location: index.php?tab=blog&msg=Not%C3%ADcia%20exclu%C3%ADda%20com%20sucesso%21");
exit;

