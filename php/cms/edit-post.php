<?php
session_start();

if (!isset($_SESSION['logado'])) {
    header("Location: index.php");
    exit;
}

// mesmo arquivo de posts usado no index.php e view-post.php
$postsFile = __DIR__ . "/../m2-cms/blog/posts.json";

// carrega posts
$posts = [];
if (file_exists($postsFile)) {
    $posts = json_decode(file_get_contents($postsFile), true);
    if (!is_array($posts)) $posts = [];
}

// pega ID pela URL
$id = isset($_GET['id']) ? trim($_GET['id']) : '';
$postIndex = null;
$post = null;

foreach ($posts as $idx => $p) {
    if (isset($p['id']) && $p['id'] === $id) {
        $postIndex = $idx;
        $post = $p;
        break;
    }
}

if ($post === null) {
    http_response_code(404);
    echo "Post não encontrado.";
    exit;
}

$erro = "";

// valores iniciais vindos do JSON
$title       = $post['title']       ?? "";
$slug        = $post['slug']        ?? "";
$date        = $post['date']        ?? "";
$image       = $post['image']       ?? "";
$excerpt     = $post['excerpt']     ?? "";
$content     = $post['content']     ?? "";
$contentHtml = $post['contentHtml'] ?? "";
$customCss   = $post['customCss']   ?? "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title       = trim($_POST['title']       ?? "");
    $slug        = trim($_POST['slug']        ?? "");
    $date        = trim($_POST['date']        ?? "");
    $image       = trim($_POST['image']       ?? "");
    $excerpt     = trim($_POST['excerpt']     ?? "");
    $content     = trim($_POST['content']     ?? "");
    $contentHtml = trim($_POST['contentHtml'] ?? "");
    $customCss   = trim($_POST['customCss']   ?? "");

    if ($title === "" || $slug === "") {
        $erro = "Preencha pelo menos Título e Slug.";
    } else {
        $posts[$postIndex]['title']       = $title;
        $posts[$postIndex]['slug']        = $slug;
        $posts[$postIndex]['date']        = $date;
        $posts[$postIndex]['image']       = $image;
        $posts[$postIndex]['excerpt']     = $excerpt;
        $posts[$postIndex]['content']     = $content;
        $posts[$postIndex]['contentHtml'] = $contentHtml;
        $posts[$postIndex]['customCss']   = $customCss;

        file_put_contents(
            $postsFile,
            json_encode($posts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
        );

        header("Location: index.php?tab=blog&msg=Not%C3%ADcia%20atualizada%20com%20sucesso%21");
        exit;
    }
}
?>
<!doctype html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8" />
    <title>Editar notícia - Blog M2</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
        *{box-sizing:border-box;}
        body{
            font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
            background:#f5f5f5;
            margin:0;
        }
        .wrap{
            max-width:900px;
            margin:24px auto 40px;
            background:#fff;
            padding:24px;
            border-radius:12px;
            box-shadow:0 10px 30px rgba(0,0,0,.06);
        }
        h1{margin-top:0;font-size:22px;}
        label{display:block;margin-top:12px;font-size:14px;font-weight:600;}
        input[type="text"], textarea{
            width:100%;padding:8px 10px;border-radius:6px;border:1px solid #ccc;
            font-size:14px;font-family:inherit;margin-top:4px;
        }
        textarea{min-height:80px;resize:vertical;}
        .botoes{margin-top:20px;display:flex;gap:10px;}
        button, a.btn{
            padding:10px 18px;border-radius:6px;border:none;
            font-size:14px;font-weight:600;cursor:pointer;text-decoration:none;
        }
        button.salvar{background:#ff005c;color:#fff;}
        a.btn-voltar{background:#eee;color:#333;}
        .erro{
            margin-bottom:12px;padding:10px 12px;border-radius:6px;
            background:#ffeaea;color:#b71c1c;font-size:14px;
        }
        small{display:block;font-size:12px;color:#777;margin-top:2px;}
        .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
        @media(max-width:768px){.grid-2{grid-template-columns:1fr;}}
        .id-label{font-size:12px;color:#777;margin-top:4px;}
    </style>
</head>
<body>
<div class="wrap">
    <h1>Editar notícia</h1>
    <p class="id-label">ID: <?= htmlspecialchars($post['id']) ?></p>

    <?php if ($erro): ?>
        <div class="erro"><?= htmlspecialchars($erro) ?></div>
    <?php endif; ?>

    <form method="post">
        <label for="title">Título</label>
        <input type="text" id="title" name="title"
               value="<?= htmlspecialchars($title) ?>" />

        <div class="grid-2">
            <div>
                <label for="slug">Slug (URL)</label>
                <input type="text" id="slug" name="slug"
                       value="<?= htmlspecialchars($slug) ?>" />
                <small>Usado na URL: view-post.php?slug=esse-slug-aqui</small>
            </div>
            <div>
                <label for="date">Data</label>
                <input type="text" id="date" name="date"
                       value="<?= htmlspecialchars($date) ?>" />
            </div>
        </div>

        <label for="image">URL da imagem de capa</label>
        <input type="text" id="image" name="image"
               value="<?= htmlspecialchars($image) ?>" />

        <label for="excerpt">Resumo (aparece nos cards do blog e no modal)</label>
        <textarea id="excerpt" name="excerpt"><?= htmlspecialchars($excerpt) ?></textarea>

        <label for="content">Conteúdo (texto simples – usado no modal)</label>
        <textarea id="content" name="content"><?= htmlspecialchars($content) ?></textarea>
        <small>Esse texto aparece dentro do modal do blog, embaixo da imagem.</small>

        <label for="contentHtml">Conteúdo formatado (HTML – miolo padrão Figma)</label>
        <textarea id="contentHtml" name="contentHtml"><?= htmlspecialchars($contentHtml) ?></textarea>
        <small>
            Se preencher, esse conteúdo será usado na página completa do post,
            com o layout do Figma.
        </small>

        <!-- ✔ NOVO CAMPO - CSS PERSONALIZADO DO POST -->
        <label for="customCss">CSS personalizado (opcional)</label>
        <textarea id="customCss" name="customCss"><?= htmlspecialchars($customCss) ?></textarea>
        <small>Cole aqui apenas CSS. Ele será aplicado SOMENTE nesta notícia.</small>

        <div class="botoes">
            <button class="salvar" type="submit">Salvar alterações</button>
            <a class="btn btn-voltar" href="index.php?tab=blog">Voltar</a>
        </div>
    </form>
</div>
</body>
</html>
