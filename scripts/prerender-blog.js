/**
 * prerender-blog.js
 * 
 * Gera HTML estático para cada post do blog durante o build.
 * Roda APÓS o vite build e ANTES do react-snap.
 * 
 * O que faz:
 * 1. Lê posts.json (local ou remoto)
 * 2. Usa o dist/index.html como template (pega CSS/JS hasheados)
 * 3. Para cada post, gera dist/blog/{slug}/index.html com:
 *    - <title> e <meta description> corretos
 *    - <link rel="canonical"> correto
 *    - JSON-LD Article structured data
 *    - Conteúdo HTML real do artigo
 *    - Links <a href> nativos para outros posts
 * 4. React faz hydrate por cima quando o JS carregar
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
  // Tenta local primeiro, fallback para remoto
  if (fs.existsSync(POSTS_LOCAL)) {
    const posts = JSON.parse(fs.readFileSync(POSTS_LOCAL, 'utf-8'));
    console.log(`[prerender-blog] ${posts.length} posts carregados do arquivo local.`);
    return posts;
  }

  try {
    console.log('[prerender-blog] Buscando posts da API remota...');
    const res = await fetch(POSTS_REMOTE);
    if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
      const posts = await res.json();
      console.log(`[prerender-blog] ${posts.length} posts carregados da API remota.`);
      return posts;
    }
  } catch (err) {
    console.warn('[prerender-blog] API remota indisponível.');
  }

  console.error('[prerender-blog] ERRO: Nenhuma fonte de posts disponível!');
  return [];
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function buildArticleJsonLd(post) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": post.image ? [post.image] : [],
    "datePublished": post.date || new Date().toISOString(),
    "author": post.author ? [{
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.role,
      "description": post.author.bio,
      "image": post.author.image
    }] : [{
      "@type": "Organization",
      "name": "M2 Flex",
      "url": "https://m2flex.com.br"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "M2 Flex",
      "logo": {
        "@type": "ImageObject",
        "url": "https://m2flex.com.br/favicon-32x32.png"
      }
    },
    "description": post.excerpt || ""
  };
  return JSON.stringify(schema);
}

function buildRelatedPostsHtml(allPosts, currentSlug) {
  const related = allPosts.filter(p => p.slug !== currentSlug).slice(0, 4);
  if (related.length === 0) return '';

  const cards = related.map(d => `
        <a href="/blog/${d.slug}/" style="display:block;text-decoration:none;color:inherit;">
          <div style="background:white;border-radius:32px;overflow:hidden;border:1px solid rgba(0,0,0,0.05);margin-bottom:16px;">
            ${d.image ? `<img src="${escapeHtml(d.image)}" alt="${escapeHtml(d.title)}" style="width:100%;height:192px;object-fit:cover;" loading="lazy" />` : ''}
            <div style="padding:24px;">
              <h4 style="font-size:14px;font-weight:900;color:#1C1C1C;text-transform:uppercase;line-height:1.2;">${escapeHtml(d.title)}</h4>
              <span style="font-size:10px;color:#E5258C;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;">Ver agora</span>
            </div>
          </div>
        </a>`).join('\n');

  return `
      <div style="max-width:1240px;margin:128px auto 0;padding:0 24px;">
        <div style="height:1px;background:#D4D7E2;margin-bottom:80px;"></div>
        <h3 style="text-align:center;font-size:12px;font-weight:900;color:#1C1C1C;letter-spacing:0.4em;text-transform:uppercase;margin-bottom:64px;">LEIA TAMBÉM</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:32px;">
          ${cards}
        </div>
      </div>`;
}

function buildPostHtml(post, allPosts) {
  const excerpt = post.excerpt || '';
  const content = post.contentHtml || `<p>${escapeHtml(post.content || 'Sem conteúdo detalhado disponível.')}</p>`;

  // Navegação anterior/próximo
  const currentIndex = allPosts.findIndex(p => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = (currentIndex !== -1 && currentIndex < allPosts.length - 1) ? allPosts[currentIndex + 1] : null;

  // Seção do autor
  const authorHtml = post.author ? `
      <aside style="margin-top:96px;padding:48px;background:white;border-radius:40px;border:1px solid rgba(0,0,0,0.05);display:flex;gap:32px;align-items:flex-start;">
        ${post.author.image ? `<img src="${escapeHtml(post.author.image)}" alt="${escapeHtml(post.author.name)}" style="width:128px;height:128px;border-radius:50%;object-fit:cover;" />` : ''}
        <div>
          <span style="font-size:10px;font-weight:900;letter-spacing:0.3em;color:#E5258C;text-transform:uppercase;">Autor Convidado</span>
          <h3 style="font-size:24px;font-weight:900;color:#1C1C1C;text-transform:uppercase;letter-spacing:-0.04em;">${escapeHtml(post.author.name)}</h3>
          <p style="font-size:14px;font-weight:700;color:#B0B2B8;text-transform:uppercase;letter-spacing:0.1em;">${escapeHtml(post.author.role)}</p>
          <p style="font-size:14px;color:rgba(75,75,72,0.8);font-style:italic;margin-top:16px;">"${escapeHtml(post.author.bio)}"</p>
        </div>
      </aside>` : '';

  return `
    <main style="min-height:100vh;background:#F6F7FB;padding-bottom:80px;font-family:'Poppins',sans-serif;color:#4B4B48;">
      ${post.image ? `
      <div style="max-width:1240px;margin:0 auto;padding:32px 16px 0;">
        <div style="overflow:hidden;border-radius:40px;background:black;aspect-ratio:21/9;">
          <img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}" style="width:100%;height:100%;object-fit:cover;opacity:0.9;" />
        </div>
      </div>` : ''}

      <div style="max-width:900px;margin:0 auto;padding:64px 24px 0;">
        <div style="text-align:center;margin-bottom:80px;">
          <div style="display:flex;height:6px;margin-bottom:40px;border-radius:99px;overflow:hidden;width:100px;margin-left:auto;margin-right:auto;">
            <span style="flex:1;background:#E5258C;"></span>
            <span style="flex:1;background:#00B8F1;"></span>
            <span style="flex:1;background:#FFD400;"></span>
            <span style="flex:1;background:#1C1C1C;"></span>
          </div>
          <h1 style="font-size:clamp(2rem,5vw,4.5rem);font-weight:900;color:#1C1C1C;line-height:0.95;letter-spacing:-0.04em;text-transform:uppercase;margin:0 0 32px;">
            ${escapeHtml(post.title)}
          </h1>
          ${post.date ? `<span style="display:inline-block;padding:8px 24px;background:white;border-radius:99px;font-size:12px;font-weight:900;color:#B0B2B8;letter-spacing:0.2em;text-transform:uppercase;">${escapeHtml(post.date)}</span>` : ''}
        </div>

        <article class="blog-article" style="font-size:19px;line-height:1.8;color:#4B4B48;max-width:840px;margin:0 auto;">
          ${content}
        </article>

        ${authorHtml}

        <div style="margin-top:96px;padding-top:64px;border-top:1px solid #D4D7E2;text-align:center;">
          <a href="/blog/" style="display:inline-flex;align-items:center;gap:16px;padding:20px 40px;background:#1C1C1C;color:white;border-radius:99px;font-weight:900;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;">
            ← VOLTAR AO BLOG
          </a>
          <div style="margin-top:48px;display:flex;justify-content:center;gap:48px;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.25em;color:#B0B2B8;">
            ${prevPost ? `<a href="/blog/${prevPost.slug}/" style="color:#B0B2B8;text-decoration:none;">← Postagem Anterior</a>` : '<span style="opacity:0.2;">← Postagem Anterior</span>'}
            <span style="color:#D4D7E2;">|</span>
            ${nextPost ? `<a href="/blog/${nextPost.slug}/" style="color:#B0B2B8;text-decoration:none;">Próxima Postagem →</a>` : '<span style="opacity:0.2;">Próxima Postagem →</span>'}
          </div>
        </div>
      </div>

      ${buildRelatedPostsHtml(allPosts, post.slug)}
    </main>`;
}

// ========================================
// MAIN
// ========================================

async function main() {
  console.log('[prerender-blog] Iniciando pré-renderização dos posts...');

  // 1. Carregar posts
  const posts = await loadPosts();
  if (posts.length === 0) {
    console.warn('[prerender-blog] Nenhum post encontrado. Abortando.');
    return;
  }

  // 2. Ler o template base (dist/index.html gerado pelo Vite)
  const templatePath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('[prerender-blog] ERRO: dist/index.html não encontrado! Rode vite build primeiro.');
    process.exit(1);
  }
  const template = fs.readFileSync(templatePath, 'utf-8');

  // 3. Gerar HTML para cada post
  let count = 0;
  for (const post of posts) {
    const slug = post.slug;
    if (!slug) {
      console.warn(`[prerender-blog] Post "${post.title}" sem slug, pulando.`);
      continue;
    }

    const postTitle = `${post.title} | Blog M2 Flex`;
    const postDescription = post.excerpt || `Leia o artigo ${post.title} no blog da M2 Flex.`;
    const canonicalUrl = `${DOMAIN}/blog/${slug}/`;
    const robotsContent = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

    // Gerar o conteúdo HTML do post
    const postBodyHtml = buildPostHtml(post, posts);

    // Gerar JSON-LD
    const jsonLd = buildArticleJsonLd(post);

    // Aplicar ao template
    let html = template;

    // Substituir <title>
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(postTitle)}</title>`);

    // Substituir meta description
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${escapeHtml(postDescription)}" />`
    );

    // Substituir meta robots
    html = html.replace(
      /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/,
      `<meta name="robots" content="${robotsContent}" />`
    );

    // Adicionar/substituir canonical
    if (html.includes('<link rel="canonical"')) {
      html = html.replace(
        /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
        `<link rel="canonical" href="${canonicalUrl}" />`
      );
    } else {
      html = html.replace('</head>', `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
    }

    // Adicionar JSON-LD do artigo (antes do </head>)
    html = html.replace('</head>', `  <script type="application/ld+json" id="json-ld-article">${jsonLd}</script>\n</head>`);

    // Injetar conteúdo no <div id="root">
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${postBodyHtml}</div>`
    );

    // Salvar o arquivo
    const outDir = path.join(DIST_DIR, 'blog', slug);
    fs.mkdirSync(outDir, { recursive: true });
    const outPath = path.join(outDir, 'index.html');
    fs.writeFileSync(outPath, html);
    count++;

    console.log(`[prerender-blog] ✅ /blog/${slug}/index.html gerado`);
  }

  console.log(`[prerender-blog] Concluído! ${count} posts pré-renderizados.`);
}

main().catch(err => {
  console.error('[prerender-blog] Erro fatal:', err);
  process.exit(1);
});
