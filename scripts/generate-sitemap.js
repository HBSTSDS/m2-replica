import fs from 'fs';
import path from 'path';

// Rotas estáticas
const staticRoutes = [
  "",
  "/quem-somos",
  "/nossa-historia",
  "/infraestrutura",
  "/sustentabilidade",
  "/fale-conosco",
  "/trabalhe-conosco",
  "/servicos/comunicacao-visual",
  "/servicos/envelopamento",
  "/servicos/midia-ooh",
  "/servicos/ponto-de-venda",
  "/servicos/projetos-especiais",
  "/servicos/sinalizacao",
  "/solucoes/vitrinismos",
  "/solucoes/supermercados",
  "/solucoes/eventos",
  "/blog",
  "/seja-um-revendedor",
  "/redbox"
];

const API_POSTS = "https://poster.flaviobrick.com.br/HB/assets/blog/posts.json";
const DOMAIN = "https://m2flex.com.br";

async function generateSitemap() {
  console.log("[generate-sitemap] Iniciando geração...");

  let urls = "";
  const now = new Date().toISOString();

  // 1. Inserir rotas estáticas
  for (const route of staticRoutes) {
      let priority = "0.8";
      if (route === "") priority = "1.0";
      const formattedRoute = route.endsWith("/") ? route : `${route}/`;

      urls += `
  <url>
    <loc>${DOMAIN}${formattedRoute}</loc>
    <lastmod>${now}</lastmod>
    <priority>${priority}</priority>
  </url>`;
  }

  // 2. Fetch posts do blog
  try {
     console.log(`[generate-sitemap] Buscando posts...`);
     let posts = [];
     const res = await fetch(API_POSTS);
     
     // Tentativa de ler o JSON, mas se o servidor retornar HTML, falha graciosamente
     if (res.ok && res.headers.get("content-type")?.includes("application/json")) {
         posts = await res.json();
     } else {
         console.warn(`[generate-sitemap] Endpoint retornou erro ou não-JSON. Usando fallback local...`);
         const localPath = path.resolve(process.cwd(), "php/m2-cms/blog/posts.json");
         if (fs.existsSync(localPath)) {
            posts = JSON.parse(fs.readFileSync(localPath, 'utf-8'));
         }
     }

     if (posts && posts.length > 0) {
         console.log(`[generate-sitemap] Foram encontrados ${posts.length} posts.`);
         for (const post of posts) {
             let validDate = now;
             if (post.date) {
                const parsed = new Date(post.date);
                if (!isNaN(parsed.getTime())) {
                   validDate = parsed.toISOString();
                }
             }

             urls += `
  <url>
    <loc>${DOMAIN}/blog/${post.slug}/</loc>
    <lastmod>${validDate}</lastmod>
    <priority>0.7</priority>
  </url>`;
         }
     }
  } catch (err) {
     console.error("[generate-sitemap] Erro na requisição dos posts:", err);
  }

  // 3. Montar XML final
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  // 4. Salvar na pasta public/ (dist não é o source real do Vite para sitemap manual, public/ copiado para dist/)
  const outPath = path.resolve(process.cwd(), "public/sitemap.xml");
  fs.writeFileSync(outPath, sitemapXml);
  
  console.log(`[generate-sitemap] Sitemap gerado com sucesso em ${outPath}!`);
}

generateSitemap();
