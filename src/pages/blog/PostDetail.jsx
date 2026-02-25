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

  return (
    <main className="min-h-screen bg-[#E7E9F2] pb-20 font-sans text-[#4B4B48]">
      {/* Injeção de CSS customizado do post e estilos base do blog */}
      <style dangerouslySetInnerHTML={{ __html: `
        .blog-article { font-size: 16px; line-height: 1.85; color: #4B4B48; }
        .blog-article p { margin-bottom: 28px; display: block; clear: both; }
        .blog-article strong { font-weight: 800; color: #1C1C1C; }
        .blog-article h2 { font-size: 26px; font-weight: 800; color: #1C1C1C; margin-top: 56px; margin-bottom: 24px; clear: both; text-transform: uppercase; letter-spacing: -0.02em; }
        .blog-article h3 { font-size: 22px; font-weight: 700; color: #1C1C1C; margin-top: 40px; margin-bottom: 20px; clear: both; }
        .blog-article ul { margin-bottom: 32px; padding-left: 20px; list-style: none; clear: both; }
        .blog-article li { margin-bottom: 14px; position: relative; padding-left: 1.5rem; }
        .blog-article li::before { content: "—"; position: absolute; left: 0; color: #E5258C; font-weight: bold; }
        
        /* Ajuste para imagens dentro do conteúdo */
        .blog-article img { border-radius: 20px; max-width: 100%; height: auto; margin: 48px 0; display: block; clear: both; }
        
        /* Forçar espaçamento em divs de conteúdo do CMS */
        .blog-article div { margin-bottom: 24px; }
        
        /* Estilos específicos que vêm do CMS */
        ${post.customCss || ''}
      ` }} />

      {/* HERO IMAGE */}
      {post.image && (
        <div className="max-w-[1180px] mx-auto px-4">
          <div className="overflow-hidden shadow-2xl bg-black aspect-[21/9] md:aspect-[21/7] rounded-b-[40px] md:rounded-b-[60px]">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* CONTEÚDO PRINCIPAL (CARD FIGMA) */}
      <div className="max-w-[1180px] mx-auto px-4 -mt-8 md:-mt-12 relative z-10">
        <div className="bg-[#F6F7FB] rounded-[40px] md:rounded-[60px] p-8 md:p-16 shadow-xl">
          
          {/* Header do Post Interno */}
          <div className="mb-12">
            {/* Faixa colorida Figma */}
            <div className="flex h-[8px] mb-8 rounded-full overflow-hidden w-[120px]">
              <span className="flex-1 bg-[#E5258C]" />
              <span className="flex-1 bg-[#00B8F1]" />
              <span className="flex-1 bg-[#FFD400]" />
              <span className="flex-1 bg-[#1C1C1C]" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-[900] text-[#1C1C1C] mb-6 leading-[0.95] tracking-tighter uppercase max-w-4xl">
              {post.title}
            </h1>
            
            {post.date && (
              <p className="text-sm font-black text-[#B0B2B8] tracking-[0.2em] uppercase">{post.date}</p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Coluna de Conteúdo (Mais larga) */}
            <div className="lg:col-span-8">
              <article className="blog-article">
                {post.contentHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
                ) : (
                  <div className="whitespace-pre-line">
                    <p className="text-xl font-bold leading-tight mb-8 text-[#1C1C1C]">
                      {post.excerpt}
                    </p>
                    {post.content || "Sem conteúdo detalhado disponível."}
                  </div>
                )}
              </article>

              {/* Navegação e Voltar */}
              <div className="mt-24 pt-12 border-t border-[#D4D7E2] flex flex-wrap gap-8 justify-between items-center">
                 <Link to="/blog" className="inline-flex items-center gap-3 px-8 py-4 bg-[#1C1C1C] text-white rounded-full font-black text-xs tracking-widest hover:bg-[#E5258C] transition-all duration-500 shadow-lg hover:scale-105 active:scale-95 uppercase">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                    VOLTAR AO BLOG
                 </Link>
                 
                 <div className="flex gap-8 text-[11px] font-black italic uppercase tracking-[0.2em] text-[#E5258C]">
                    <span className="cursor-pointer hover:underline">** Postagem Anterior</span>
                    <span className="cursor-pointer hover:underline">Próxima Postagem **</span>
                 </div>
              </div>
            </div>

            {/* Coluna Sidebar (Destaques) */}
            <aside className="lg:col-span-4 lg:border-l lg:border-[#D4D7E2] lg:pl-12">
              <div className="sticky top-12">
                <h3 className="text-xs font-black text-[#1C1C1C] tracking-[0.3em] uppercase mb-10 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-[#E5258C]"></span>
                  DESTAQUES
                </h3>
                
                <div className="space-y-8">
                  {destaques.map(d => (
                    <Link key={d.id} to={`/blog/${d.slug}`} className="block group">
                      <div className="bg-white rounded-[24px] overflow-hidden shadow-mobile hover:shadow-xl transition-all duration-500 border border-black/5">
                        {d.image && (
                          <div className="h-32 overflow-hidden">
                            <img 
                              src={d.image} 
                              alt={d.title} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                            />
                          </div>
                        )}
                        <div className="p-5">
                          <h4 className="text-[13px] font-extrabold text-[#1C1C1C] line-clamp-2 leading-[1.3] group-hover:text-[#E5258C] transition-colors uppercase">
                            {d.title}
                          </h4>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-[10px] text-[#E5258C] font-black tracking-widest uppercase">Saiba mais —</span>
                            <div className="flex gap-1 h-1">
                               <span className="w-2 bg-[#E5258C] rounded-full"></span>
                               <span className="w-2 bg-[#00B8F1] rounded-full"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
