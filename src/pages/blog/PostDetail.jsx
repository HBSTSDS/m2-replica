import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const url = "/api/blog-proxy.php";
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error("Erro ao carregar post");
        const data = await res.json();
        
        const found = data.find(p => p.slug === slug);
        setPost(found);
        setAllPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
    window.scrollTo(0, 0);
  }, [slug]);

  // Lógica de SEO e Dados Estruturados para Artigos
  useEffect(() => {
    if (!post) return;

    document.title = `${post.title} | Blog M2 Flex`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
       metaDescription.setAttribute("content", post.excerpt || `Leia o artigo ${post.title}`);
    }

    const scriptId = "json-ld-article";
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    
    const articleSchema = {
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

    script.textContent = JSON.stringify(articleSchema);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) existingScript.remove();
    };
  }, [post]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E7E9F2]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E5258C]"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#E7E9F2] text-[#4B4B48]">
        <h1 className="text-2xl font-bold mb-4">Post não encontrado</h1>
        <Link to="/blog" className="text-[#E5258C] hover:underline">Voltar para o Blog</Link>
      </div>
    );
  }

  const destaques = allPosts.filter(p => p.slug !== slug).slice(0, 4);

  // Lógica de navegação: Anterior e Próximo
  const currentIndex = allPosts.findIndex(p => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = (currentIndex !== -1 && currentIndex < allPosts.length - 1) ? allPosts[currentIndex + 1] : null;

  return (
    <main className="min-h-screen bg-[#F6F7FB] pb-20 font-sans text-[#4B4B48]">
      {/* Injeção de CSS customizado do post e estilos base do blog */}
      <style dangerouslySetInnerHTML={{ __html: `
        .blog-article { 
          font-size: 19px; 
          line-height: 1.8; 
          color: #4B4B48;
          max-width: 840px;
          margin: 0 auto;
        }
        .blog-article p { margin-bottom: 32px; }
        .blog-article strong { font-weight: 800; color: #1C1C1C; }
        
        .blog-article h2 { 
          font-size: 36px; 
          font-weight: 940; 
          color: #1C1C1C; 
          margin-top: 100px; 
          margin-bottom: 32px; 
          text-transform: uppercase; 
          letter-spacing: -0.04em;
          line-height: 1.05;
        }
        
        .blog-article h3 { 
          font-size: 26px; 
          font-weight: 800; 
          color: #1C1C1C; 
          margin-top: 60px; 
          margin-bottom: 24px; 
        }

        .blog-article ul { margin-bottom: 40px; padding-left: 0; list-style: none; }
        .blog-article li { margin-bottom: 16px; position: relative; padding-left: 2rem; font-weight: 500; }
        .blog-article li::before { 
          content: ""; 
          position: absolute; 
          left: 0; 
          top: 0.65em;
          width: 10px;
          height: 10px;
          background: #E5258C;
          border-radius: 2px;
        }
        
        .blog-article img { 
          border-radius: 40px; 
          max-width: 100%; 
          height: auto; 
          margin: 80px 0; 
          display: block; 
        }
        
        ${post.customCss || ''}
      ` }} />

      {/* HERO IMAGE */}
      {post.image && (
        <div className="max-w-[1240px] mx-auto pt-8 px-4">
          <div className="overflow-hidden shadow-2xl bg-black aspect-[21/9] rounded-[40px] md:rounded-[60px]">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover opacity-90"
            />
          </div>
        </div>
      )}

      {/* CONTEÚDO PRINCIPAL (CENTRADO) */}
      <div className="max-w-[900px] mx-auto px-6 mt-16">
        
        {/* Header do Post */}
        <div className="mb-20 text-center flex flex-col items-center">
          {/* Faixa colorida Figma */}
          <div className="flex h-[6px] mb-10 rounded-full overflow-hidden w-[100px]">
            <span className="flex-1 bg-[#E5258C]" />
            <span className="flex-1 bg-[#00B8F1]" />
            <span className="flex-1 bg-[#FFD400]" />
            <span className="flex-1 bg-[#1C1C1C]" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-[900] text-[#1C1C1C] mb-8 leading-[0.95] tracking-tighter uppercase">
            {post.title}
          </h1>
          
          {post.date && (
            <div className="inline-block px-6 py-2 bg-white rounded-full shadow-sm text-xs font-black text-[#B0B2B8] tracking-[0.2em] uppercase">
              {post.date}
            </div>
          )}
        </div>

        {/* Artigo */}
        <article className="blog-article">
          {post.contentHtml ? (
            <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          ) : (
            <div className="whitespace-pre-line">
              <p className="text-2xl font-black leading-[1.2] mb-12 text-[#1C1C1C] tracking-tight">
                {post.excerpt}
              </p>
              {post.content || "Sem conteúdo detalhado disponível."}
            </div>
          )}
        </article>

        {/* SEÇÃO DO AUTOR (E-E-A-T SEO) */}
        {post.author && (
          <aside className="mt-24 p-8 md:p-12 bg-white rounded-[40px] border border-black/5 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-sm" aria-label="Sobre o autor">
            {post.author.image && (
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-[#F6F7FB]">
                <img 
                  src={post.author.image} 
                  alt={post.author.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="text-center md:text-left">
              <span className="text-[10px] font-black tracking-[0.3em] text-[#E5258C] uppercase mb-2 block">Autor Convidado</span>
              <h3 className="text-2xl font-black text-[#1C1C1C] mb-1 uppercase tracking-tighter leading-none">
                {post.author.name}
              </h3>
              <p className="text-sm font-bold text-[#B0B2B8] mb-4 uppercase tracking-widest">
                {post.author.role}
              </p>
              <div className="max-w-md">
                <p className="text-sm md:text-base text-[#4B4B48]/80 leading-relaxed italic">
                  "{post.author.bio}"
                </p>
              </div>
            </div>
          </aside>
        )}

        {/* Rodapé e Navegação */}
        <div className="mt-24 pt-16 border-t border-[#D4D7E2] flex flex-col items-center gap-12">
            <Link to="/blog" className="group relative inline-flex items-center gap-4 px-10 py-5 bg-[#1C1C1C] text-white rounded-full font-black text-xs tracking-[0.2em] transition-all duration-500 shadow-2xl hover:bg-[#E5258C] hover:scale-105 active:scale-95 uppercase">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              <span>VOLTAR AO BLOG</span>
            </Link>
            
            <div className="flex gap-12 text-[11px] font-black uppercase tracking-[0.25em] text-[#B0B2B8]">
              {prevPost ? (
                <Link to={`/blog/${prevPost.slug}`} className="cursor-pointer hover:text-[#E5258C] transition-colors">← Postagem Anterior</Link>
              ) : (
                <span className="opacity-20 cursor-default">← Postagem Anterior</span>
              )}
              <span className="text-[#D4D7E2]">|</span>
              {nextPost ? (
                <Link to={`/blog/${nextPost.slug}`} className="cursor-pointer hover:text-[#E5258C] transition-colors">Próxima Postagem →</Link>
              ) : (
                <span className="opacity-20 cursor-default">Próxima Postagem →</span>
              )}
            </div>
        </div>

      </div>

      {/* SEÇÃO DE DESTAQUES (OPCIONAL/CENTRADADA NO FINAL) */}
      <div className="max-w-[1240px] mx-auto px-6 mt-32">
        <div className="h-px bg-[#D4D7E2] mb-20" />
        <h3 className="text-center text-xs font-black text-[#1C1C1C] tracking-[0.4em] uppercase mb-16">
          LEIA TAMBÉM
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destaques.map(d => (
            <Link key={d.id} to={`/blog/${d.slug}`} className="group block">
              <div className="bg-white rounded-[32px] overflow-hidden shadow-mobile hover:shadow-2xl transition-all duration-700 h-full flex flex-col border border-black/5">
                {d.image && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={d.image} 
                      alt={d.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <h4 className="text-[14px] font-black text-[#1C1C1C] line-clamp-2 leading-tight uppercase group-hover:text-[#E5258C] transition-colors">
                    {d.title}
                  </h4>
                  <div className="mt-auto pt-6 flex items-center justify-between border-t border-black/5">
                    <span className="text-[10px] text-[#E5258C] font-black tracking-widest uppercase">Ver agora</span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-[#E5258C] rounded-full" />
                      <div className="w-1.5 h-1.5 bg-[#00B8F1] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
