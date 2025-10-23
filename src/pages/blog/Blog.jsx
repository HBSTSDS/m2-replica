// pages/blog/Blog.jsx
import { Link } from "react-router-dom";
import { useState } from "react";

function Img({ src, alt, className = "" }) {
  // Tenta várias extensões automaticamente
  const order = [".jpg", ".png", ".jpeg", ".webp"];
  const [cur, setCur] = useState(src);

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

const posts = [
  {
    id: 1,
    slug: "stand-skeelo-bienal-2025",
    title: "STAND SKEELO BIENAL 2025",
    img: "/blog/img-1.jpg",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur. Sapien turpis pharetra volutpat purus. Elit et est sollicitudin metus.",
    date: "20/07/2025",
  },
  { id: 2, slug: "stand-skeelo-bienal-2025-2", title: "STAND SKEELO BIENAL 2025", img: "/blog/img-1.jpg", excerpt: "Lorem ipsum dolor sit amet, consectetur. Sapien turpis pharetra volutpat purus. Elit et est sollicitudin metus.", date: "20/07/2025" },
  { id: 3, slug: "stand-skeelo-bienal-2025-3", title: "STAND SKEELO BIENAL 2025", img: "/blog/img-1.jpg", excerpt: "Lorem ipsum dolor sit amet, consectetur. Sapien turpis pharetra volutpat purus. Elit et est sollicitudin metus.", date: "20/07/2025" },
  { id: 4, slug: "stand-skeelo-bienal-2025-4", title: "STAND SKEELO BIENAL 2025", img: "/blog/img-1.jpg", excerpt: "Lorem ipsum dolor sit amet, consectetur. Sapien turpis pharetra volutpat purus. Elit et est sollicitudin metus.", date: "20/07/2025" },
];

export default function Blog() {
  return (
    <main className="min-h-screen bg-[#E7E9F2] text-[#4B4B48]">
      {/* Banner / Header */}
      <section className="relative">
        <Img
          src="/blog/header.jpg"
          alt="Header Blog M2"
          className="w-full h-48 md:h-60 lg:h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <h1 className="absolute left-6 md:left-8 bottom-4 md:bottom-6 text-white font-semibold text-3xl md:text-4xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
          BLOG DA M2
        </h1>
      </section>

      {/* Conteúdo */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((p) => (
            <article
              key={p.id}
              className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden"
            >
              <Link to={`/blog/${p.slug}`} className="block group">
                <div className="overflow-hidden">
                  <Img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                    
                <div className="p-4">
                <div className="flex items-center mb-4">
                    <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
                    <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
                    <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
                    <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" /> {/* branco/cinza final */}
                </div>
                  <h2 className="text-[#1C1C1C] font-semibold text-base leading-tight">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-sm text-[#4B4B48]/80 line-clamp-3">
                    {p.excerpt}
                  </p>

                  {/* Faixinha colorida M2 */}
                  
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Linha fina entre cards e footer (igual ao Figma) */}
        <div className="mt-10 h-px bg-[#D8DDE8]" />
      </section>
    </main>
  );
}
