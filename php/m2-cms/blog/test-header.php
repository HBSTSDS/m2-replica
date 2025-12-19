    <?php
    // Arquivo de teste isolado para o Header M2
    // Objetivo: Testar apenas a sobreposição do menu sem interferência do resto do site

    $reactHeaderUrl = "/HB/embed/header";
    ?>
    <!DOCTYPE html>
    <html lang="pt-BR">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Teste Isolado Header</title>
        <style>
            body {
                margin: 0;
                background: #f0f0f0;
                font-family: sans-serif;
            }

            /* 1. O Wrapper que segura o espaço físico */
            .test-wrapper {
                position: relative;
                z-index: 9999;
                width: 100%;
                height: 96px;
                /* Altura do header fechado */
                background: #ccc;
                /* Cinza só pra gente ver onde ele está */
            }

            /* 2. O Iframe absoluto que flutua por cima */
            .test-iframe {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                /* Começa com 100% do wrapper (96px) */
                border: none;
                background: transparent;
            }

            /* Conteúdo de teste embaixo */
            .test-content {
                padding: 20px;
                background: #333333;
                /* Fundo escuro para destacar o menu branco */
                color: #ffffff;
                max-width: 800px;
                margin: 0 auto;
                min-height: 800px;
            }
        </style>
    </head>

    <body>

        <!-- Header Wrapper -->
        <div class="test-wrapper">
            <iframe id="testFrame" class="test-iframe" src="<?= htmlspecialchars($reactHeaderUrl) ?>"
                scrolling="no"></iframe>
        </div>

        <!-- Conteúdo que deve ficar EMBAIXO do menu quando ele abrir -->
        <div class="test-content">
            <h1>Teste de Sobreposição</h1>
            <p>Este texto deve ficar <strong>atrás</strong> do menu quando você clicar em "M2" ou "Soluções".</p>
            <p>Se o menu empurrar este texto para baixo, está errado.</p>
            <p>Se o menu for cortado e sumir, está errado.</p>
            <p>Se o menu flutuar por cima deste texto, <strong>SUCESSO</strong>.</p>
            <br>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua.</p>
        </div>

        <script>
            // Script simples de resize
            window.addEventListener("message", function (ev) {
                var data = ev.data || {};
                // console.log("Mensagem recebida:", data); // Debug
                if (data && data.__M2_EMBED__ && data.type === "resize" && data.target === "header") {
                    var el = document.getElementById("testFrame");
                    if (el) {
                        el.style.height = data.height + "px";
                    }
                }
            });
        </script>

    </body>

    </html>