<?php
// =======================
// CONFIGURAÇÕES BÁSICAS
// =======================
$configFile = __DIR__ . "/../m2-cms/config.json";
$blogDir = __DIR__ . "/../m2-cms/blog";
$postsFile = $blogDir . "/posts.json";

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
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                }

                .card {
                    background: var(--card);
                    padding: 40px;
                    border-radius: 24px;
                    border: 1px solid var(--border);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, .4);
                    width: 360px;
                    text-align: center;
                }

                h1 {
                    margin: 0 0 8px;
                    font-size: 28px;
                    font-weight: 800;
                }

                h1 span { color: var(--primary); }

                p { color: var(--text-muted); font-size: 14px; margin-bottom: 30px; }

                label {
                    display: block;
                    text-align: left;
                    font-size: 13px;
                    font-weight: 600;
                    color: var(--text-muted);
                    margin-bottom: 6px;
                }

                input {
                    width: 100%;
                    padding: 12px 16px;
                    margin-bottom: 20px;
                    border-radius: 12px;
                    border: 1px solid var(--border);
                    background: var(--input);
                    color: var(--text);
                    font-size: 15px;
                    outline: none;
                }

                input:focus { border-color: var(--primary); }

                button {
                    width: 100%;
                    padding: 14px;
                    border: none;
                    border-radius: 12px;
                    background: var(--primary);
                    color: #fff;
                    font-weight: 600;
                    font-size: 16px;
                    cursor: pointer;
                    transition: transform 0.2s;
                }

                button:hover { transform: translateY(-2px); opacity: 0.9; }

                .erro {
                    background: rgba(255, 0, 0, 0.1);
                    color: #ff4d4d;
                    padding: 12px;
                    border-radius: 10px;
                    margin-bottom: 20px;
                    font-size: 13px;
                    border: 1px solid rgba(255, 0, 0, 0.2);
                }
            </style>
        </head>

        <body>
            <div class="card">
                <h1>Painel <span>M2</span></h1>
                <p>Entre com suas credenciais</p>
                <?php if (!empty($erro)) echo "<div class='erro'>$erro</div>"; ?>
                <form method="post">
                    <label>Usuário</label>
                    <input type="text" name="user" autocomplete="username" required />

                    <label>Senha</label>
                    <input type="password" name="pass" autocomplete="current-password" required />

                    <button type="submit">Entrar no Sistema</button>
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
        "heroTitle" => "",
        "heroSubtitle" => "",
        "heroBanner" => "",
        "aboutTitle" => "",
        "aboutText" => "",
        "aboutImage" => "",
        "whatsappNumber" => "",
        "whatsappLink" => "",
        "footerEmail" => "",
        "footerAddress" => "",
        "footerCopy" => "",
        "blogMioloTitle" => "",
        "blogMioloText" => ""
    ];
    file_put_contents($configFile, json_encode($emptyConfig, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

$config = json_decode(file_get_contents($configFile), true);
if (!is_array($config))
    $config = [];

// garantir novos campos mesmo em configs antigos
$config += [
    "blogMioloTitle" => "",
    "blogMioloText" => ""
];

if (!is_dir($blogDir)) {
    mkdir($blogDir, 0755, true);
}

if (!file_exists($postsFile)) {
    file_put_contents($postsFile, json_encode([], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

$posts = json_decode(file_get_contents($postsFile), true);
if (!is_array($posts))
    $posts = [];

// =======================
// SALVAR CONFIG
// =======================
$mensagem = "";
if (!empty($_POST['salvar_config'])) {

    $fields = [
        "heroTitle",
        "heroSubtitle",
        "heroBanner",
        "aboutTitle",
        "aboutText",
        "aboutImage",
        "whatsappNumber",
        "whatsappLink",
        "footerEmail",
        "footerAddress",
        "footerCopy",
        "blogMioloTitle",
        "blogMioloText",
        "instagramUrl",
        "linkedinUrl",
        "tiktokUrl",
        "youtubeUrl"
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
            max-width: 1100px;
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
        }

        h2 {
            margin: 40px 0 20px;
            font-size: 20px;
            font-weight: 600;
            color: var(--primary);
            display: flex;
            align-items: center;
            gap: 10px;
        }

        h2::after {
            content: "";
            flex: 1;
            height: 1px;
            background: var(--border);
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
        }

        input:focus, textarea:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(255, 0, 92, 0.1);
        }

        button.salvar, button.logout {
            margin-top: 30px;
            padding: 14px 28px;
            border: none;
            border-radius: 12px;
            background: var(--primary);
            color: #fff;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: transform 0.2s, opacity 0.2s;
        }

        button.logout {
            margin-top: 0;
            padding: 8px 16px;
            background: transparent;
            border: 1px solid var(--border);
            color: var(--text-muted);
            font-size: 13px;
        }

        button:hover { opacity: 0.9; transform: translateY(-2px); }

        .tabs {
            display: flex;
            gap: 10px;
            border-bottom: 1px solid var(--border);
            margin-bottom: 30px;
            overflow-x: auto;
        }

        .tabs a {
            padding: 12px 20px;
            font-size: 15px;
            text-decoration: none;
            color: var(--text-muted);
            border-bottom: 2px solid transparent;
            white-space: nowrap;
            transition: all 0.2s;
        }

        .tabs a.active {
            color: var(--primary);
            font-weight: 600;
            border-color: var(--primary);
        }

        .msg {
            background: rgba(74, 222, 128, 0.1);
            color: #4ade80;
            padding: 16px;
            border-radius: 12px;
            margin-bottom: 30px;
            border: 1px solid rgba(74, 222, 128, 0.2);
        }

        table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0 8px;
        }

        th { text-align: left; padding: 12px; font-size: 13px; color: var(--text-muted); }

        td {
            padding: 16px 12px;
            background: var(--input);
            border-top: 1px solid var(--border);
            border-bottom: 1px solid var(--border);
        }

        td:first-child { border-left: 1px solid var(--border); border-radius: 12px 0 0 12px; }
        td:last-child { border-right: 1px solid var(--border); border-radius: 0 12px 12px 0; }

        .btn {
            display: inline-block;
            padding: 10px 20px;
            border-radius: 12px;
            background: var(--primary);
            color: #fff;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
        }

        .actions a {
            color: var(--text);
            margin-right: 15px;
            font-size: 13px;
            text-decoration: none;
            opacity: 0.7;
        }

        .actions a:hover { opacity: 1; color: var(--primary); }
    </style>
</head>

<body>

    <header>
        <div><strong>Painel M2</strong> – Conteúdos</div>
        <form method="post">
            <button name="logout" value="1" class="logout">Sair do Sistema</button>
        </form>
    </header>

    <div class="wrap">

        <h1>Gerenciar conteúdos do site</h1>

        <div class="tabs">
            <a href="?tab=site" class="<?= $tab === 'site' ? 'active' : '' ?>">Informações principais</a>
            <a href="?tab=blog" class="<?= $tab === 'blog' ? 'active' : '' ?>">Blog</a>
            <a href="?tab=dashboard" class="<?= $tab === 'dashboard' ? 'active' : '' ?>">Dashboard (Analytics)</a>
        </div>

        <?php if ($mensagem): ?>
            <div class="msg"><?= $mensagem ?></div>
        <?php endif; ?>

        <?php if ($tab === 'site'): ?>

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
                <textarea name="aboutText" rows="4"><?= htmlspecialchars($config['aboutText']) ?></textarea>

                <label>URL da imagem</label>
                <input type="text" name="aboutImage" value="<?= htmlspecialchars($config['aboutImage']) ?>">

                <h2>Contato & Rodapé</h2>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <label>Número WhatsApp (Ex: +55 21 99999-9999)</label>
                        <input type="text" name="whatsappNumber" value="<?= htmlspecialchars($config['whatsappNumber']) ?>">
                    </div>
                    <div>
                        <label>Link WhatsApp (Completo)</label>
                        <input type="text" name="whatsappLink" value="<?= htmlspecialchars($config['whatsappLink']) ?>">
                    </div>
                </div>

                <label>Email de Contato</label>
                <input type="text" name="footerEmail" value="<?= htmlspecialchars($config['footerEmail']) ?>">

                <label>Endereço Completo</label>
                <input type="text" name="footerAddress" value="<?= htmlspecialchars($config['footerAddress']) ?>">

                <label>Copyright / Texto do Rodapé</label>
                <input type="text" name="footerCopy" value="<?= htmlspecialchars($config['footerCopy']) ?>">

                <h2>Redes Sociais</h2>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <label>Instagram URL</label>
                        <input type="text" name="instagramUrl" value="<?= htmlspecialchars($config['instagramUrl'] ?? '') ?>">
                    </div>
                    <div>
                        <label>LinkedIn URL</label>
                        <input type="text" name="linkedinUrl" value="<?= htmlspecialchars($config['linkedinUrl'] ?? '') ?>">
                    </div>
                    <div>
                        <label>TikTok URL</label>
                        <input type="text" name="tiktokUrl" value="<?= htmlspecialchars($config['tiktokUrl'] ?? '') ?>">
                    </div>
                    <div>
                        <label>YouTube URL</label>
                        <input type="text" name="youtubeUrl" value="<?= htmlspecialchars($config['youtubeUrl'] ?? '') ?>">
                    </div>
                </div>

                <h2>Blog – Miolo</h2>
                <label>Título padrão</label>
                <input type="text" name="blogMioloTitle" value="<?= htmlspecialchars($config['blogMioloTitle']) ?>">

                <label>Texto padrão</label>
                <textarea name="blogMioloText" rows="3"><?= htmlspecialchars($config['blogMioloText']) ?></textarea>

                <button class="salvar" name="salvar_config">Salvar todas as alterações</button>
            </form>

        <?php elseif ($tab === 'dashboard'): ?>

            <h2>Estatísticas do Site (GA4 & GSC)</h2>

            <div id="loading" style="padding:40px; color:var(--text-muted); text-align:center;">Carregando dados do Google... ⏳</div>

            <div id="dashboard-content" style="display:none;">
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-top:20px;">
                    <div style="background:var(--input); padding:30px; border-radius:20px; text-align:center; border:1px solid var(--border);">
                        <h3 style="margin:0; font-size:14px; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px;">Usuários Ativos</h3>
                        <div id="total-users" style="font-size:48px; font-weight:800; color:var(--primary); margin-top:10px;">0</div>
                    </div>
                    <div style="background:var(--input); padding:30px; border-radius:20px; text-align:center; border:1px solid var(--border);">
                        <h3 style="margin:0; font-size:14px; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px;">Cliques (Pesquisa)</h3>
                        <div id="total-clicks" style="font-size:48px; font-weight:800; color:var(--primary); margin-top:10px;">-</div>
                    </div>
                </div>

                <h3 style="margin-top:40px; font-size:18px; font-weight:600;">Top 10 Buscas no Google</h3>
                <table id="queries-table">
                    <thead>
                        <tr>
                            <th style="padding-left:0;">Palavra-chave</th>
                        </tr>
                    </thead>
                    <tbody id="queries-body">
                        <tr><td>Carregando buscas...</td></tr>
                    </tbody>
                </table>
            </div>

            <script>
                async function loadDashboard() {
                    try {
                        const response = await fetch('../api/google_proxy.php');
                        const result = await response.json();

                        if (!result.success) {
                            document.getElementById('loading').innerHTML = "⚠️ Erro na Proxy: " + (result.error || "Desconhecido");
                            console.error("Proxy Error:", result);
                            return;
                        }

                        let propertyId = "527208570"; // Fallback já fixado

                        const dataResponse = await fetch('../api/google_proxy.php?action=all&property_id=' + propertyId);
                        const dataResult = await dataResponse.json();

                        document.getElementById('loading').style.display = 'none';
                        document.getElementById('dashboard-content').style.display = 'block';

                        if (dataResult.data.ga4_report && dataResult.data.ga4_report.totals) {
                            document.getElementById('total-users').innerText = dataResult.data.ga4_report.totals[0].metricValues[0].value;
                        }

                        if (dataResult.data.gsc_report && dataResult.data.gsc_report.rows) {
                            const totalClicks = dataResult.data.gsc_report.rows.reduce((acc, row) => acc + (row.clicks || 0), 0);
                            document.getElementById('total-clicks').innerText = totalClicks || "0";
                        }

                        const queriesBody = document.getElementById('queries-body');
                        queriesBody.innerHTML = "";
                        if (dataResult.data.gsc_report && dataResult.data.gsc_report.rows) {
                            dataResult.data.gsc_report.rows.forEach(row => {
                                const tr = document.createElement('tr');
                                tr.innerHTML = `<td>${row.keys[0]}</td>`;
                                queriesBody.appendChild(tr);
                            });
                        } else {
                            queriesBody.innerHTML = "<tr><td>Nenhum dado de pesquisa encontrado ainda.</td></tr>";
                        }

                    } catch (e) {
                        document.getElementById('loading').innerHTML = "❌ Erro ao conectar ou processar dados: " + e.message;
                        console.error("Dashboard Load Error:", e);
                    }
                }
                loadDashboard();
            </script>

        <?php else: ?>

            <h2>Blog – Notícias</h2>
            <div style="margin-bottom: 20px;">
                <a href="new-post.php" class="btn">+ Nova notícia</a>
            </div>

            <?php if (!$posts): ?>
                <p style="color:var(--text-muted);">Nenhuma notícia cadastrada.</p>
            <?php else: ?>
                <table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th style="width:120px;">Data</th>
                            <th style="width:140px;">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach (array_reverse($posts) as $p): ?>
                            <tr>
                                <td><?= htmlspecialchars($p['title']) ?></td>
                                <td style="color:var(--text-muted); font-size:13px;"><?= htmlspecialchars($p['date']) ?></td>
                                <td class="actions">
                                    <a href="edit-post.php?id=<?= urlencode($p['id']) ?>">Editar</a>
                                    <a href="delete-post.php?id=<?= urlencode($p['id']) ?>"
                                        onclick="return confirm('Tem certeza que deseja excluir esta notícia?');" style="color:#ff4d4d;">Excluir</a>
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