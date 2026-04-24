<?php
session_start();

// se não estiver logado, volta pro index (login)
if (!isset($_SESSION['logado'])) {
    header("Location: index.php");
    exit;
}

// ATENÇÃO: mesmo posts.json do index.php e do view-post.php
$postsFile = __DIR__ . "/../m2-cms/blog/posts.json";

// carrega posts
$posts = [];
if (file_exists($postsFile)) {
    $posts = json_decode(file_get_contents($postsFile), true);
    if (!is_array($posts)) $posts = [];
}

// gera próximo ID (001, 002, 003...)
function gerarProximoId($posts) {
    $max = 0;
    foreach ($posts as $p) {
        if (isset($p['id']) && ctype_digit($p['id'])) {
            $n = (int)$p['id'];
            if ($n > $max) $max = $n;
        }
    }
    $novo = $max + 1;
    return str_pad((string)$novo, 3, "0", STR_PAD_LEFT);
}

$erro = "";
$title = $slug = $date = $image = $excerpt = $content = $contentHtml = $customCss = "";

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
        $novoId = gerarProximoId($posts);

        $posts[] = [
            "id"          => $novoId,
            "title"       => $title,
            "slug"        => $slug,
            "date"        => $date,
            "image"       => $image,
            "excerpt"     => $excerpt,
            "content"     => $content,      // texto simples (modal React)
            "contentHtml" => $contentHtml,  // HTML estilizado (layout Figma)
            "customCss"   => $customCss     // CSS individual do post ✔
        ];

        file_put_contents(
            $postsFile,
            json_encode($posts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
        );

        header("Location: index.php?tab=blog&msg=Not%C3%ADcia%20criada%20com%20sucesso%21");
        exit;
    }
}
?>
<!doctype html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8" />
    <title>Nova notícia - Painel M2</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #ff005c;
            --bg: #0a0a0b;
            --card: #141417;
            --text: #e0e0e6;
            --text-muted: #a0a0ab;
            --border: #27272a;
            --input: #1f1f23;
        }

        * { box-sizing: border-box; }

        body {
            font-family: 'Outfit', sans-serif;
            background: var(--bg);
            color: var(--text);
            margin: 0;
            line-height: 1.5;
        }

        header {
            background: rgba(10, 10, 11, 0.8);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid var(--border);
            padding: 16px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 0;
            z-index: 100;
        }

        header strong {
            color: var(--primary);
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 800;
        }

        .wrap {
            max-width: 900px;
            margin: 40px auto 100px;
            background: var(--card);
            padding: 40px;
            border-radius: 24px;
            border: 1px solid var(--border);
            box-shadow: 0 20px 50px rgba(0, 0, 0, .4);
        }

        h1 {
            margin-top: 0;
            font-size: 32px;
            font-weight: 800;
            background: linear-gradient(90deg, #fff, var(--primary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 30px;
        }

        label {
            display: block;
            margin-top: 20px;
            font-size: 14px;
            font-weight: 500;
            color: var(--text-muted);
        }

        input[type=text],
        textarea {
            width: 100%;
            padding: 12px 16px;
            border-radius: 12px;
            border: 1px solid var(--border);
            background: var(--input);
            color: var(--text);
            margin-top: 8px;
            font-size: 15px;
            transition: all 0.2s;
            outline: none;
            font-family: inherit;
        }

        input:focus, textarea:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(255, 0, 92, 0.1);
        }

        .botoes {
            margin-top: 40px;
            display: flex;
            gap: 15px;
        }

        button.salvar, a.btn-voltar {
            padding: 14px 28px;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: transform 0.2s, opacity 0.2s;
            text-decoration: none;
            display: inline-block;
        }

        button.salvar { background: var(--primary); color: #fff; }
        a.btn-voltar { background: transparent; border: 1px solid var(--border); color: var(--text-muted); }

        button:hover, a.btn-voltar:hover { opacity: 0.9; transform: translateY(-2px); }

        .erro {
            background: rgba(239, 68, 68, 0.1);
            color: #ef4444;
            padding: 16px;
            border-radius: 12px;
            margin-bottom: 30px;
            border: 1px solid rgba(239, 68, 68, 0.2);
            font-size: 14px;
        }

        small {
            display: block;
            font-size: 12px;
            color: var(--text-muted);
            margin-top: 6px;
            opacity: 0.7;
        }

        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }

        @media(max-width:768px) {
            .grid-2 { grid-template-columns: 1fr; }
            .wrap { padding: 24px; margin: 20px; }
        }
    </style>
</head>
<body>

<header>
    <div><strong>Painel M2</strong> – Blog</div>
    <a href="index.php?tab=blog" class="btn-voltar" style="padding: 8px 16px; font-size: 13px; margin: 0;">Voltar ao Início</a>
</header>

<div class="wrap">
    <h1>Adicionar nova notícia</h1>

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
                       placeholder="ex: m2-nozomi-14000-sd"
                       value="<?= htmlspecialchars($slug) ?>" />
                <small>Usado na URL: view-post.php?slug=esse-slug-aqui</small>
            </div>
            <div>
                <label for="date">Data</label>
                <input type="text" id="date" name="date"
                       placeholder="ex: 28/11/2025"
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
            <button class="salvar" type="submit">Salvar notícia</button>
            <a class="btn btn-voltar" href="index.php?tab=blog">Cancelar</a>
        </div>

    </form>
</div>
</body>
</html>
