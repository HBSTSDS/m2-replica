import { useState, useEffect } from "react";
import headerImg from "../../assets/blog/header.png";

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
  const [selectedPost, setSelectedPost] = useState(null);

  // ================================
  // CARREGAR POSTS DO CMS
  // ================================
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          "https://poster.flaviobrick.com.br/HB/m2-cms/blog/posts.json",
          { cache: "no-cache" }
        );
        if (!res.ok) throw new Error("Erro ao carregar posts");
        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erro carregando posts:", err);
        setPosts([]);
      }
    }
    load();
  }, []);

  // ================================
  // FECHAR MODAL NO ESC
  // ================================
  useEffect(() => {
    if (!selectedPost) return;
    function handleKey(e) {
      if (e.key === "Escape") setSelectedPost(null);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedPost]);

  function openPost(p) {
    setSelectedPost(p);
  }
  function closePost() {
    setSelectedPost(null);
  }

  return (
    <main className="min-h-screen bg-[#E7E9F2] text-[#4B4B48]">
      {/* HEADER */}
      <section className="relative">
        <Img
          src={headerImg}
          alt="Header Blog M2"
          className="w-full h-48 md:h-60 lg:h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <h1 className="absolute left-6 md:left-8 bottom-4 md:bottom-6 text-white font-semibold text-3xl md:text-4xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
          BLOG DA M2
        </h1>
      </section>

      {/* LISTA */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        {posts.length === 0 ? (
          <p className="text-sm text-[#4B4B48]/70">
            Nenhuma notícia cadastrada ainda.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((p) => (
              <article
                key={p.id}
                className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden"
              >
                <button
                  className="block w-full text-left group"
                  type="button"
                  onClick={() => openPost(p)}
                >
                  <div className="overflow-hidden">
                    <Img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex items-center mb-4">
                      <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
                      <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
                      <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
                      <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" />
                    </div>

                    <h2 className="text-[#1C1C1C] font-semibold text-base leading-tight">
                      {p.title}
                    </h2>

                    <p className="mt-2 text-sm text-[#4B4B48]/80 line-clamp-3">
                      {p.excerpt}
                    </p>

                    {p.date && (
                      <p className="mt-2 text-[11px] text-[#4B4B48]/60">
                        {p.date}
                      </p>
                    )}
                  </div>
                </button>
              </article>
            ))}
          </div>
        )}

        <div className="mt-10 h-px bg-[#D8DDE8]" />
      </section>

      {/* MODAL */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Fundo escuro */}
          <div className="absolute inset-0 bg-black/60" onClick={closePost} />

          {/* CARD */}
          <div className="relative bg-white max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            {/* FECHAR */}
            <button
              type="button"
              onClick={closePost}
              className="absolute top-3 right-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white text-sm"
            >
              ✕
            </button>

            {/* IMAGEM */}
            <Img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-56 md:h-64 object-cover"
            />

            {/* CONTEÚDO */}
            <div className="p-6 md:p-8 overflow-y-auto">
              <h2 className="text-xl md:text-2xl font-semibold text-[#1C1C1C]">
                {selectedPost.title}
              </h2>

              {selectedPost.date && (
                <p className="mt-1 text-xs md:text-sm text-[#4B4B48]/60">
                  {selectedPost.date}
                </p>
              )}

              <div className="mt-4 text-sm md:text-base text-[#4B4B48] leading-relaxed whitespace-pre-line">
                {selectedPost.content?.trim()?.length
                  ? selectedPost.content
                  : selectedPost.excerpt}
              </div>

              {/* BOTÃO PARA A PÁGINA COMPLETA */}
              <div className="mt-6">
                <a
                  href={`/HB/m2-cms/blog/view-post.php?slug=${encodeURIComponent(
                    selectedPost.slug
                  )}`}
                  className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold bg-[#E5258C] text-white hover:bg-[#c51f75] transition-colors"
                >
                  Ver página completa →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
