<?php
// =======================
// CONFIGURAÇÕES BÁSICAS
// =======================
$configFile = __DIR__ . "/../m2-cms/config.json";
$blogDir    = __DIR__ . "/../m2-cms/blog";
$postsFile  = $blogDir . "/posts.json";

$USER = "m2admin";
$PASS = "1234"; // TROCA AQUI

// =======================
// LOGIN SIMPLES
// =======================
session_start();

if (isset($_POST['logout'])) {
    session_destroy();
    header("Location: index.php");
    exit;
}

if (!isset($_SESSION['logado'])) {
    $erro = "";

    if (!empty($_POST['user']) && !empty($_POST['pass'])) {
        if ($_POST['user'] === $USER && $_POST['pass'] === $PASS) {
            $_SESSION['logado'] = true;
        } else {
            $erro = "Usuário ou senha inválidos.";
        }
    }

    if (!isset($_SESSION['logado'])) {
        ?>
        <!doctype html>
        <html lang="pt-BR">
        <head>
            <meta charset="utf-8" />
            <title>Painel M2 - Login</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style>
                * { box-sizing: border-box; }
                body {
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                    background:#f2f2f2;
                    margin:0;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    min-height:100vh;
                }
                .card {
                    background:#fff;
                    padding:24px;
                    border-radius:12px;
                    box-shadow:0 8px 24px rgba(0,0,0,.08);
                    width:320px;
                }
                h1 { margin:0 0 12px; font-size:22px; }
                label { font-size:14px; font-weight:600; }
                input {
                    width:100%;
                    padding:10px;
                    margin:6px 0 14px;
                    border-radius:6px;
                    border:1px solid #ccc;
                    font-size:14px;
                }
                button {
                    width:100%;
                    padding:10px;
                    border:none;
                    border-radius:6px;
                    background:#ff005c;
                    color:#fff;
                    font-weight:600;
                    font-size:14px;
                    cursor:pointer;
                }
                .erro { color:#c00; margin-bottom:10px; font-size:13px; }
                small { font-size:12px; color:#777; }
            </style>
        </head>
        <body>
        <div class="card">
            <h1>Painel M2</h1>
            <p><small>Entre com seu usuário e senha para editar os conteúdos.</small></p>
            <?php if (!empty($erro)) echo "<div class='erro'>$erro</div>"; ?>
            <form method="post">
                <label>Usuário</label>
                <input type="text" name="user" autocomplete="username" />

                <label>Senha</label>
                <input type="password" name="pass" autocomplete="current-password" />

                <button type="submit">Entrar</button>
            </form>
        </div>
        </body>
        </html>
        <?php
        exit;
    }
}

// =======================
// GARANTE CONFIG E POSTS
// =======================
if (!file_exists($configFile)) {
    $emptyConfig = [
        "heroTitle"      => "",
        "heroSubtitle"   => "",
        "heroBanner"     => "",
        "aboutTitle"     => "",
        "aboutText"      => "",
        "aboutImage"     => "",
        "whatsappNumber" => "",
        "whatsappLink"   => "",
        "footerEmail"    => "",
        "footerAddress"  => "",
        "footerCopy"     => "",
        "blogMioloTitle" => "",
        "blogMioloText"  => ""
    ];
    file_put_contents($configFile, json_encode($emptyConfig, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

$config = json_decode(file_get_contents($configFile), true);
if (!is_array($config)) $config = [];

// garantir novos campos mesmo em configs antigos
$config += [
    "blogMioloTitle" => "",
    "blogMioloText"  => ""
];

if (!is_dir($blogDir)) {
    mkdir($blogDir, 0755, true);
}

if (!file_exists($postsFile)) {
    file_put_contents($postsFile, json_encode([], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

$posts = json_decode(file_get_contents($postsFile), true);
if (!is_array($posts)) $posts = [];

// =======================
// SALVAR CONFIG
// =======================
$mensagem = "";
if (!empty($_POST['salvar_config'])) {

    $fields = [
        "heroTitle", "heroSubtitle", "heroBanner",
        "aboutTitle", "aboutText", "aboutImage",
        "whatsappNumber", "whatsappLink",
        "footerEmail", "footerAddress", "footerCopy",
        "blogMioloTitle", "blogMioloText"
    ];

    foreach ($fields as $field) {
        $config[$field] = trim($_POST[$field] ?? "");
    }

    file_put_contents($configFile, json_encode($config, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    $mensagem = "Informações salvas com sucesso! ✅";
}

// =======================
// ABA ATIVA
// =======================
$tab = $_GET['tab'] ?? 'site';

if (!empty($_GET['msg'])) {
    $mensagem = htmlspecialchars($_GET['msg']);
}
?>
<!doctype html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8" />
    <title>Painel M2 - Conteúdos</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
        *{box-sizing:border-box;}
        body{
            font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
            background:#f5f5f5;margin:0;
        }
        header{
            background:#111;color:#fff;
            padding:12px 20px;
            display:flex;justify-content:space-between;align-items:center;
        }
        header strong{color:#ff005c;}

        .wrap{
            max-width:1000px;
            margin:24px auto 40px;
            background:#fff;
            padding:24px;border-radius:12px;
            box-shadow:0 10px 30px rgba(0,0,0,.06);
        }
        h1{margin-top:0;font-size:24px;}
        h2{margin-top:24px;font-size:18px;border-bottom:1px solid #eee;padding-bottom:4px;}

        label{display:block;margin-top:12px;font-size:14px;font-weight:600;}
        input[type=text], textarea{
            width:100%;padding:8px 10px;border-radius:6px;border:1px solid #ccc;
            margin-top:4px;font-size:14px;
        }

        button.salvar{
            margin-top:20px;padding:10px 18px;
            border:none;border-radius:6px;
            background:#ff005c;color:#fff;cursor:pointer;
            font-size:14px;font-weight:600;
        }

        .tabs{
            display:flex;border-bottom:1px solid #eee;margin-bottom:16px;
        }
        .tabs a{
            padding:8px 16px;font-size:14px;
            text-decoration:none;color:#555;
            border-bottom:2px solid transparent;
        }
        .tabs a.active{
            color:#111;font-weight:600;border-color:#ff005c;
        }

        table{width:100%;border-collapse:collapse;margin-top:10px;font-size:14px;}
        th,td{padding:8px 6px;border-bottom:1px solid #eee;}
        th{background:#fafafa;}
        td.actions a{margin-right:8px;font-size:13px;text-decoration:none;}

        a.btn{
            display:inline-block;margin-top:8px;
            padding:8px 12px;border-radius:6px;
            background:#ff005c;color:#fff;font-size:13px;text-decoration:none;
        }
    </style>
</head>
<body>

<header>
    <div><strong>Painel M2</strong> – Conteúdos</div>
    <form method="post">
        <button name="logout" value="1">Sair</button>
    </form>
</header>

<div class="wrap">

    <h1>Gerenciar conteúdos do site</h1>

    <div class="tabs">
        <a href="?tab=site" class="<?= $tab === 'site' ? 'active' : '' ?>">Informações principais</a>
        <a href="?tab=blog" class="<?= $tab === 'blog' ? 'active' : '' ?>">Blog</a>
    </div>

    <?php if ($mensagem): ?>
        <div class="msg" style="background:#e8fbe8;color:#167a16;padding:10px 12px;border-radius:6px;margin-bottom:16px;">
            <?= $mensagem ?>
        </div>
    <?php endif; ?>

<?php if ($tab === 'site'): ?>

    <!-- ABA CONFIGURAÇÕES DO SITE -->
    <form method="post">

        <h2>Hero (capa da Home)</h2>
        <label>Título</label>
        <input type="text" name="heroTitle" value="<?= htmlspecialchars($config['heroTitle']) ?>">

        <label>Subtítulo</label>
        <textarea name="heroSubtitle"><?= htmlspecialchars($config['heroSubtitle']) ?></textarea>

        <label>URL da imagem</label>
        <input type="text" name="heroBanner" value="<?= htmlspecialchars($config['heroBanner']) ?>">

        <h2>Seção Sobre</h2>
        <label>Título</label>
        <input type="text" name="aboutTitle" value="<?= htmlspecialchars($config['aboutTitle']) ?>">

        <label>Texto</label>
        <textarea name="aboutText"><?= htmlspecialchars($config['aboutText']) ?></textarea>

        <label>URL da imagem</label>
        <input type="text" name="aboutImage" value="<?= htmlspecialchars($config['aboutImage']) ?>">

        <h2>Contato</h2>
        <label>Número WhatsApp</label>
        <input type="text" name="whatsappNumber" value="<?= htmlspecialchars($config['whatsappNumber']) ?>">

        <label>Link WhatsApp</label>
        <input type="text" name="whatsappLink" value="<?= htmlspecialchars($config['whatsappLink']) ?>">

        <h2>Rodapé</h2>
        <label>Email</label>
        <input type="text" name="footerEmail" value="<?= htmlspecialchars($config['footerEmail']) ?>">

        <label>Endereço</label>
        <input type="text" name="footerAddress" value="<?= htmlspecialchars($config['footerAddress']) ?>">

        <label>Copyright</label>
        <input type="text" name="footerCopy" value="<?= htmlspecialchars($config['footerCopy']) ?>">

        <h2>Blog – Miolo</h2>
        <label>Título padrão</label>
        <input type="text" name="blogMioloTitle" value="<?= htmlspecialchars($config['blogMioloTitle']) ?>">

        <label>Texto padrão</label>
        <textarea name="blogMioloText"><?= htmlspecialchars($config['blogMioloText']) ?></textarea>

        <button class="salvar" name="salvar_config">Salvar informações</button>
    </form>

<?php else: ?>

    <!-- ABA BLOG -->
    <h2>Blog – Notícias</h2>
    <a href="new-post.php" class="btn">+ Nova notícia</a>

    <?php if (!$posts): ?>
        <p style="margin-top:16px;">Nenhuma notícia cadastrada.</p>
    <?php else: ?>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Data</th>
                    <th>Slug</th>
                    <th style="width:140px;">Ações</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($posts as $p): ?>
                <tr>
                    <td><?= htmlspecialchars($p['id']) ?></td>
                    <td><?= htmlspecialchars($p['title']) ?></td>
                    <td><?= htmlspecialchars($p['date']) ?></td>
                    <td><?= htmlspecialchars($p['slug']) ?></td>
                    <td class="actions">
                        <a href="edit-post.php?id=<?= urlencode($p['id']) ?>">Editar</a>
                        <a href="delete-post.php?id=<?= urlencode($p['id']) ?>"
                           onclick="return confirm('Tem certeza que deseja excluir esta notícia?');">Excluir</a>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php endif; ?>

<?php endif; ?>

</div>
</body>
</html>
