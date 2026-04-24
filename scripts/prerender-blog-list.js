/**
 * prerender-blog-list.js
 * 
 * Gera HTML estático para a página de listagem do blog.
 * Roda APÓS o prerender-blog.js e ANTES do react-snap.
 * 
 * O que faz:
 * 1. Lê posts.json (local ou remoto)
 * 2. Usa dist/index.html como template
 * 3. Gera dist/blog/index.html com:
 *    - <title> e <meta description> da página do blog
 *    - Lista de cards com links <a href="/blog/{slug}/"> nativos
 *    - Imagens, excerpts e autores
 */

import fs from 'fs';
import path from 'path';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const POSTS_LOCAL = path.resolve(process.cwd(), 'php/m2-cms/blog/posts.json');
const POSTS_REMOTE = 'https://poster.flaviobrick.com.br/HB/assets/blog/posts.json';
const DOMAIN = 'https://m2flex.com.br';

// ========================================
// HELPERS
// ========================================

async function loadPosts() {
  try {
    console.log('[prerender-blog-list] Buscando posts da API remota...');
    const res = await fetch(POSTS_REMOTE);
    if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
      const posts = await res.json();
      console.log(`[prerender-blog-list] ${posts.length} posts carregados da API remota.`);
      return posts;
    }
  } catch (err) {
    console.warn('[prerender-blog-list] API remota indisponível, usando fallback local.');
  }

  if (fs.existsSync(POSTS_LOCAL)) {
    const posts = JSON.parse(fs.readFileSync(POSTS_LOCAL, 'utf-8'));
    console.log(`[prerender-blog-list] ${posts.length} posts carregados do arquivo local.`);
    return posts;
  }

  console.error('[prerender-blog-list] ERRO: Nenhuma fonte de posts disponível!');
  return [];
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildPostCard(post) {
  return `
        <article style="border-radius:16px;background:white;overflow:hidden;border:1px solid rgba(0,0,0,0.05);transition:box-shadow 0.3s;">
          <a href="/blog/${post.slug}/" style="display:block;text-decoration:none;color:inherit;">
            ${post.image ? `
            <div style="overflow:hidden;">
              <img 
                src="${escapeHtml(post.image)}" 
                alt="${escapeHtml(post.title)}" 
                style="width:100%;height:240px;object-fit:cover;"
                loading="lazy"
              />
            </div>` : ''}
            <div style="padding:20px 24px;">
              <div style="display:flex;align-items:center;margin-bottom:16px;">
                <span style="height:6px;width:56px;background:#E5258C;border-radius:99px;"></span>
                <span style="height:6px;width:56px;background:#00B8F1;border-radius:99px;"></span>
                <span style="height:6px;width:56px;background:#FFD400;border-radius:99px;"></span>
                <span style="height:6px;width:56px;background:#1C1C1C;border-radius:99px;"></span>
              </div>
              <h2 style="color:#1C1C1C;font-weight:600;font-size:20px;line-height:1.2;margin:0 0 12px;">
                ${escapeHtml(post.title)}
              </h2>
              <p style="font-size:14px;color:rgba(75,75,72,0.8);line-height:1.5;margin:0 0 16px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">
                ${escapeHtml(post.excerpt)}
              </p>
              <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(0,0,0,0.05);padding-top:16px;">
                <div style="display:flex;align-items:center;gap:8px;">
                  ${post.author?.image ? `<img src="${escapeHtml(post.author.image)}" alt="${escapeHtml(post.author?.name)}" style="width:24px;height:24px;border-radius:50%;object-fit:cover;border:1px solid rgba(0,0,0,0.1);" />` : ''}
                  <span style="font-size:11px;font-weight:700;color:rgba(75,75,72,0.5);text-transform:uppercase;letter-spacing:0.1em;">
                    ${escapeHtml(post.author?.name || 'M2 Flex')}
                  </span>
                </div>
                <span style="color:#E5258C;font-size:14px;font-weight:600;">
                  Ler artigo completo →
                </span>
              </div>
            </div>
          </a>
        </article>`;
}

function buildBlogListHtml(posts) {
  const headerImg = 'https://flaviobrick.com.br/assets_externos/assets/blog/header_b.png';

  const postCards = posts.map(p => buildPostCard(p)).join('\n');

  return `
    <main style="min-height:100vh;background:#E7E9F2;color:#4B4B48;font-family:'Poppins',sans-serif;">
      <section style="position:relative;">
        <img 
          src="${headerImg}" 
          alt="Blog M2 Flex - Notícias, Tendências e Inovações em Comunicação Visual" 
          style="width:100%;height:256px;object-fit:cover;"
        />
        <div style="position:absolute;inset:0;background:rgba(0,0,0,0.2);"></div>
        <h1 style="position:absolute;left:32px;bottom:24px;color:white;font-weight:600;font-size:36px;text-shadow:0 2px 6px rgba(0,0,0,0.5);margin:0;">
          BLOG DA M2
        </h1>
      </section>

      <section style="max-width:1152px;margin:0 auto;padding:40px 24px;">
        ${posts.length === 0 
          ? '<p style="font-size:14px;color:rgba(75,75,72,0.7);">Nenhuma notícia cadastrada ainda.</p>'
          : `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(400px,1fr));gap:32px;">${postCards}</div>`
        }
        <div style="margin-top:40px;height:1px;background:#D8DDE8;"></div>
      </section>
    </main>`;
}

// ========================================
// MAIN
// ========================================

async function main() {
  console.log('[prerender-blog-list] Iniciando pré-renderização da listagem do blog...');

  const posts = await loadPosts();
  if (posts.length === 0) {
    console.warn('[prerender-blog-list] Nenhum post encontrado.');
  }

  // Ler template
  const templatePath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('[prerender-blog-list] ERRO: dist/index.html não encontrado!');
    process.exit(1);
  }
  const template = fs.readFileSync(templatePath, 'utf-8');

  const pageTitle = 'Blog M2 Flex | Notícias e Tendências';
  const pageDescription = 'Fique por dentro das novidades, cases de sucesso e tendências do mercado de comunicação visual.';
  const canonicalUrl = `${DOMAIN}/blog/`;
  const robotsContent = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  // Gerar HTML da listagem
  const blogListHtml = buildBlogListHtml(posts);

  // Aplicar ao template
  let html = template;

  // Substituir <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(pageTitle)}</title>`);

  // Substituir meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(pageDescription)}" />`
  );

  // Substituir meta robots
  html = html.replace(
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/,
    `<meta name="robots" content="${robotsContent}" />`
  );

  // Canonical
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
  }

  // Injetar conteúdo no <div id="root">
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${blogListHtml}</div>`
  );

  // Salvar
  const outDir = path.join(DIST_DIR, 'blog');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'index.html');
  fs.writeFileSync(outPath, html);

  console.log(`[prerender-blog-list] ✅ /blog/index.html gerado com ${posts.length} posts.`);
}

main().catch(err => {
  console.error('[prerender-blog-list] Erro fatal:', err);
  process.exit(1);
});
