<?php
// ========================
// CARREGAR CONFIG GLOBAL
// ========================
$configFile = __DIR__ . '/../config.json';
$config = [];

if (file_exists($configFile)) {
    $cfgJson = file_get_contents($configFile);
    $config = json_decode($cfgJson, true);
}
if (!is_array($config)) {
    $config = [];
}

$blogMioloTitle = $config['blogMioloTitle'] ?? '';
$blogMioloText = $config['blogMioloText'] ?? '';

// ========================
// CARREGAR POSTS
// ========================
$postsFile = __DIR__ . '/posts.json';

$posts = [];
if (file_exists($postsFile)) {
    $json = file_get_contents($postsFile);
    $posts = json_decode($json, true);
}
if (!is_array($posts)) {
    $posts = [];
}

// ========================
// ACHAR POST ATUAL PELO SLUG
// ========================
$slug = isset($_GET['slug']) ? trim($_GET['slug']) : '';
$post = null;
$currentIdx = null;

if ($slug !== '' && $posts) {
    foreach ($posts as $idx => $p) {
        if (isset($p['slug']) && $p['slug'] === $slug) {
            $post = $p;
            $currentIdx = $idx;
            break;
        }
    }
}

// ========================
// SE NÃO ACHAR, 404
// ========================
if (!$post) {
    http_response_code(404);
    ?>
    <!doctype html>
    <html lang="pt-BR">

    <head>
        <meta charset="utf-8" />
        <title>Post não encontrado - Blog M2</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/HB/assets/estiloM2.css">
    </head>

    <body class="erro404">
        <div class="erro-box">
            <h1>Post não encontrado</h1>
            <p>Essa notícia pode ter sido removida ou o link está incorreto.</p>
            <p><a href="/HB/#/blog">Voltar para o Blog da M2</a></p>
        </div>
    </body>

    </html>
    <?php
    exit;
}

// ========================
// CAMPOS DO POST
// ========================
$title = $post['title'] ?? 'Notícia';
$date = $post['date'] ?? '';
$excerpt = $post['excerpt'] ?? '';
$cover = $post['image'] ?? '';
$contentTxt = $post['content'] ?? null;
$contentHtml = $post['contentHtml'] ?? null;
$customCss = $post['customCss'] ?? ''; // CSS específico da notícia

// ========================
// POSTS PARA "DESTAQUES"
// ========================
$destaques = [];
foreach ($posts as $p) {
    if (!isset($p['id']) || $p['id'] === ($post['id'] ?? null))
        continue;
    $destaques[] = $p;
}
$destaques = array_slice($destaques, 0, 4);

// ========================
// POST ANTERIOR / PRÓXIMO
// ========================
$prevPost = $nextPost = null;
if ($currentIdx !== null) {
    if ($currentIdx > 0) {
        $prevPost = $posts[$currentIdx - 1];
    }
    if ($currentIdx < count($posts) - 1) {
        $nextPost = $posts[$currentIdx + 1];
    }
}

// ========================
// URLS DOS EMBEDS DO REACT
// (AGORA SEM HASH: /HB/embed/...)
// ========================
$reactHeaderUrl = "/HB/embed/header";
$reactFooterUrl = "/HB/embed/footer";
?>
<!doctype html>
<html lang="pt-BR">

<head>
    <meta charset="utf-8" />
    <title><?= htmlspecialchars($title) ?> - Blog M2</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- CSS global final do site -->
    <link rel="stylesheet" href="/HB/assets/estiloM2.css">

    <!-- Ajustes específicos da página de post (miolo no layout do Figma) -->
    <style>
        body.body-blog-view {
            background: #E7E9F2;
            margin: 0;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            color: #4B4B48;
        }

        /* NAVBAR SIMPLIFICADA */
        .simple-navbar {
            background: #F5F7FB;
            height: 96px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .simple-navbar .nav-container {
            max-width: 1180px;
            width: 100%;
            padding: 0 20px;
            display: flex;
            justify-content: center;
            /* Centraliza a nav */
        }

        .simple-navbar nav {
            /* Mesmo background que a original */
            padding: 12px 32px;
            border-radius: 999px;
            /* Pill shape */
            display: flex;
            align-items: center;
            justify-content: space-between;
            /* Espalha os itens */
            width: 100%;
            /* Ocupa toda a largura do container */
        }

        .simple-navbar .nav-link {
            color: #4B4B48;
            text-decoration: none;
            font-size: 15px;
            font-weight: 500;
            transition: color 0.2s;
        }

        .simple-navbar .nav-link:hover {
            color: #E5258C;
        }

        /* IFRAME FOOTER */
        .react-embed {
            width: 100%;
            border: 0;
            display: block;
            background: transparent;
        }

        .react-embed--footer {
            min-height: 320px;
        }

        /* HERO DO POST – só a imagem, sem título em cima */
        .blog-hero-wrapper {
            max-width: 1180px;
            margin: 32px auto 0;
            border-radius: 24px 24px 0 0;
            overflow: hidden;
            background: #000;
        }

        .blog-hero-wrapper img {
            width: 100%;
            height: 320px;
            object-fit: cover;
            display: block;
        }

        /* BLOCO PRINCIPAL – igual card grande do Figma */
        .blog-main-card {
            max-width: 1180px;
            margin: 0 auto 64px;
            background: #F6F7FB;
            border-radius: 0 0 24px 24px;
            padding: 32px 40px 40px;
            box-sizing: border-box;
        }

        /* ... restante do CSS mantido ... */

        /* Barrinha colorida em cima do título */
        .blog-color-strip {
            display: flex;
            height: 4px;
            margin-bottom: 24px;
            overflow: hidden;
            border-radius: 999px;
        }

        .blog-color-strip span:nth-child(1) {
            flex: 1;
            background: #E5258C;
        }

        .blog-color-strip span:nth-child(2) {
            flex: 1;
            background: #00B8F1;
        }

        .blog-color-strip span:nth-child(3) {
            flex: 1;
            background: #FFD400;
        }

        .blog-color-strip span:nth-child(4) {
            flex: 1;
            background: #1C1C1C;
        }

        /* Cabeçalho do texto (título + data) */
        .blog-header-text {
            margin-bottom: 24px;
        }

        .blog-header-title {
            font-size: 24px;
            font-weight: 700;
            margin: 0 0 4px;
            color: #1C1C1C;
        }

        .blog-header-date {
            font-size: 12px;
            color: #7C7F8A;
        }

        /* Layout 2 colunas: texto + destaques */
        .blog-layout {
            display: grid;
            grid-template-columns: minmax(0, 2.4fr) minmax(0, 1fr);
            gap: 40px;
            align-items: flex-start;
        }

        /* TEXTO PRINCIPAL */
        .blog-article {
            font-size: 14px;
            line-height: 1.8;
            color: #4B4B48;
        }

        .blog-article p {
            margin: 0 0 14px;
        }

        .blog-article h2 {
            font-size: 18px;
            margin: 24px 0 8px;
            color: #1C1C1C;
        }

        .blog-article h3 {
            font-size: 16px;
            margin: 20px 0 8px;
            color: #1C1C1C;
        }

        .blog-article ul {
            padding-left: 20px;
            margin: 10px 0 18px;
        }

        .blog-article li {
            margin-bottom: 6px;
        }

        .blog-excerpt-top {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 18px;
            color: #4B4B48;
        }

        /* Caixa cinza */
        .blog-box {
            background: #EDEFF7;
            border-radius: 20px;
            padding: 18px 20px;
            margin: 18px 0;
            font-size: 14px;
        }

        /* Navegação anterior / próximo */
        .blog-post-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 32px;
            font-size: 13px;
        }

        .blog-post-nav a {
            color: #E5258C;
            text-decoration: none;
            font-weight: 500;
        }

        .blog-post-nav a:hover {
            text-decoration: underline;
        }

        /* SIDEBAR – Destaques à direita */
        .blog-sidebar-title {
            font-size: 13px;
            font-weight: 700;
            color: #1C1C1C;
            margin: 0 0 12px;
        }

        .blog-sidebar-empty {
            font-size: 12px;
            color: #777;
        }

        .blog-highlight-card {
            background: #FFFFFF;
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 10px 28px rgba(0, 0, 0, .08);
            margin-bottom: 16px;
        }

        .blog-highlight-img img {
            width: 100%;
            height: 110px;
            object-fit: cover;
            display: block;
        }

        .blog-highlight-body {
            padding: 10px 14px 12px;
        }

        .blog-highlight-title {
            font-size: 13px;
            font-weight: 600;
            margin: 0 0 4px;
            color: #1C1C1C;
        }

        .blog-highlight-excerpt {
            font-size: 12px;
            color: #4B4B48;
            margin: 0 0 6px;
        }

        .blog-highlight-link {
            font-size: 12px;
            font-weight: 600;
            color: #E5258C;
            text-decoration: none;
        }

        .blog-highlight-link:hover {
            text-decoration: underline;
        }

        /* BOTÃO VOLTAR FLUTUANTE */
        .floating-back-btn {
            position: fixed;
            right: 20px;
            bottom: 24px;
            /* Ajuste conforme necessidade */
            z-index: 9999;
            background: #3B3B3B;
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 999px;
            /* Pill shape */
            padding: 12px 24px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .floating-back-btn:hover {
            background: #E5258C;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(229, 37, 140, 0.4);
        }

        @media (max-width: 900px) {
            .blog-hero-wrapper {
                margin: 16px auto 0;
                border-radius: 0;
            }

            .blog-hero-wrapper img {
                height: 220px;
            }

            .blog-main-card {
                border-radius: 0;
                padding: 20px 18px 32px;
            }

            .blog-layout {
                grid-template-columns: 1fr;
                gap: 28px;
            }

            .react-embed--footer {
                min-height: 360px;
            }

            .floating-back-btn {
                bottom: 16px;
                right: 16px;
                padding: 10px 20px;
            }
        }

        <?php if (!empty($customCss)): ?>
            /* ===========================
                               CSS PERSONALIZADO DA NOTÍCIA
                               =========================== */
            <?= $customCss ?>

        <?php endif; ?>
    </style>
</head>

<body class="body-blog-view">

    <!-- ================= NAVBAR SIMPLIFICADA HTML ================= -->
    <header class="simple-navbar">
        <div class="nav-container">
            <nav>
                <a href="/HB/" class="nav-link" style="display: flex; align-items: center;">
                    <img src="https://poster.flaviobrick.com.br/HB/imagnes_site/m2-logo.png" alt="M2"
                        style="height: 40px; width: auto;">
                </a>
                <a href="/HB/seja-um-revendedor" class="nav-link">Seja um Revendedor</a>
            </nav>
        </div>
    </header>

    <!-- HERO -->
    <?php if ($cover): ?>
        <div class="blog-hero-wrapper">
            <img src="<?= htmlspecialchars($cover) ?>" alt="<?= htmlspecialchars($title) ?>">
        </div>
    <?php endif; ?>

    <!-- MIOLO -->
    <main class="blog-main-card">

        <!-- Barrinha colorida + título + data -->
        <div class="blog-header-text">
            <div class="blog-color-strip">
                <span></span><span></span><span></span><span></span>
            </div>
            <h1 class="blog-header-title"><?= htmlspecialchars($title) ?></h1>
            <?php if ($date): ?>
                <div class="blog-header-date"><?= htmlspecialchars($date) ?></div>
            <?php endif; ?>
        </div>

        <div class="blog-layout">

            <!-- COLUNA ESQUERDA – texto principal -->
            <article class="blog-article">
                <?php if ($excerpt): ?>
                    <p class="blog-excerpt-top"><?= htmlspecialchars($excerpt) ?></p>
                <?php endif; ?>

                <?php
                if ($contentHtml) {
                    echo $contentHtml;
                } elseif ($contentTxt) {
                    echo nl2br(htmlspecialchars($contentTxt));
                } else {
                    echo '<p>Este post ainda não possui conteúdo cadastrado.</p>';
                }
                ?>

                <?php if ($blogMioloTitle || $blogMioloText): ?>
                    <div class="blog-box">
                        <?php if ($blogMioloTitle): ?>
                            <h2><?= htmlspecialchars($blogMioloTitle) ?></h2>
                        <?php endif; ?>
                        <?php if ($blogMioloText): ?>
                            <p><?= nl2br(htmlspecialchars($blogMioloText)) ?></p>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>

                <!-- Navegação entre posts -->
                <div class="blog-post-nav">
                    <div>
                        <?php if ($prevPost && !empty($prevPost['slug'])): ?>
                            <a href="?slug=<?= urlencode($prevPost['slug']) ?>">« Postagem anterior</a>
                        <?php endif; ?>
                    </div>
                    <div>
                        <?php if ($nextPost && !empty($nextPost['slug'])): ?>
                            <a href="?slug=<?= urlencode($nextPost['slug']) ?>">Próxima postagem »</a>
                        <?php endif; ?>
                    </div>
                </div>
            </article>

            <!-- COLUNA DIREITA – Destaques -->
            <aside>
                <h3 class="blog-sidebar-title">DESTAQUES</h3>

                <?php if (empty($destaques)): ?>
                    <p class="blog-sidebar-empty">Nenhuma outra notícia cadastrada.</p>
                <?php else: ?>
                    <?php foreach ($destaques as $d): ?>
                        <?php
                        $dTitle = $d['title'] ?? '';
                        $dImage = $d['image'] ?? '';
                        $dExcerpt = $d['excerpt'] ?? '';
                        $dSlug = $d['slug'] ?? '';
                        ?>
                        <div class="blog-highlight-card">
                            <?php if ($dImage): ?>
                                <div class="blog-highlight-img">
                                    <img src="<?= htmlspecialchars($dImage) ?>" alt="<?= htmlspecialchars($dTitle) ?>">
                                </div>
                            <?php endif; ?>
                            <div class="blog-highlight-body">
                                <p class="blog-highlight-title"><?= htmlspecialchars($dTitle) ?></p>
                                <?php if ($dExcerpt): ?>
                                    <p class="blog-highlight-excerpt"><?= htmlspecialchars($dExcerpt) ?></p>
                                <?php endif; ?>
                                <?php if ($dSlug): ?>
                                    <a href="?slug=<?= urlencode($dSlug) ?>" class="blog-highlight-link">Saiba mais →</a>
                                <?php endif; ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </aside>

        </div>
    </main>

    <!-- ================= FOOTER DO REACT ================= -->
    <iframe id="reactFooter" class="react-embed react-embed--footer" src="<?= htmlspecialchars($reactFooterUrl) ?>"
        title="M2 Footer" scrolling="no" loading="lazy"></iframe>

    <!-- BOTÃO VOLTAR FLUTUANTE -->
    <a href="/HB/#/blog" class="floating-back-btn" style="text-decoration:none;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Voltar ao Blog
    </a>

    <script>
        (function () {
            function setHeight(id, h) {
                var el = document.getElementById(id);
                if (!el) return;
                var height = parseInt(h, 10);
                if (!Number.isFinite(height) || height < 60) return;
                el.style.height = height + "px";
            }

            window.addEventListener("message", function (ev) {
                var data = ev.data || {};
                if (data && data.__M2_EMBED__ && data.type === "resize") {
                    if (data.target === "header") setHeight("reactHeader", data.height);
                    if (data.target === "footer") setHeight("reactFooter", data.height);
                }
            });
        })();
    </script>

</body>

</html>