import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const headerImg = "https://flaviobrick.com.br/assets_externos/assets/blog/header_b.png";

/** Helper para trocar extensão caso a imagem falhe */
function Img({ src, alt, className = "" }) {
  const [cur, setCur] = useState(src);
  const order = [".jpg", ".png", ".jpeg", ".webp"];

  return (
    <img
      src={cur}
      alt={alt}
      onError={() => {
        const low = cur.toLowerCase();
        const found = order.findIndex((e) => low.endsWith(e));
        if (found >= 0 && found < order.length - 1) {
          setCur(cur.replace(order[found], order[found + 1]));
        }
      }}
      className={className}
      draggable="false"
    />
  );
}

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ================================
  // CARREGAR POSTS DO CMS
  // ================================
  useEffect(() => {
    async function load() {
      try {
        const url = "/api/blog-proxy.php";
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`Erro ${res.status} ao carregar posts`);
        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erro carregando posts:", err);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return (
    <main className="min-h-screen bg-[#E7E9F2] text-[#4B4B48]">
      {/* HEADER */}
      <section className="relative">
        <Img
          src={headerImg}
          alt="Blog M2 Flex - Notícias, Tendências e Inovações em Comunicação Visual"
          className="w-full h-48 md:h-60 lg:h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <h1 className="absolute left-6 md:left-8 bottom-4 md:bottom-6 text-white font-semibold text-3xl md:text-4xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
          BLOG DA M2
        </h1>
      </section>

      {/* LISTA */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        {isLoading ? null : posts.length === 0 ? (
          <p className="text-sm text-[#4B4B48]/70">
            Nenhuma notícia cadastrada ainda.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((p) => (
              <article
                key={p.id}
                className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden transition-all hover:shadow-lg active:scale-[0.98]"
              >
                <Link
                  to={`/blog/${p.slug}`}
                  className="block w-full text-left group"
                >
                  <div className="overflow-hidden">
                    <Img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-48 md:h-60 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5 md:p-6">
                    <div className="flex items-center mb-4">
                      <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
                      <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
                      <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
                      <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" />
                    </div>

                    <h2 className="text-[#1C1C1C] font-semibold text-lg md:text-xl leading-tight group-hover:text-[#E5258C] transition-colors">
                      {p.title}
                    </h2>

                    <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-4">
                      <div className="flex items-center gap-2">
                        {p.author?.image && (
                          <div className="w-6 h-6 rounded-full overflow-hidden border border-black/10">
                            <Img src={p.author.image} alt={p.author.name} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <span className="text-[10px] md:text-[11px] font-bold text-[#4B4B48]/50 uppercase tracking-widest leading-none">
                          {p.author?.name || "M2 Flex"}
                        </span>
                      </div>
                      <span className="text-[#E5258C] text-sm font-semibold group-hover:translate-x-1 transition-transform">
                        Ler artigo completo →
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        <div className="mt-10 h-px bg-[#D8DDE8]" />
      </section>
    </main>
  );
}
