// src/pages/servicos/Sinalizacao.jsx
import { Link } from "react-router-dom";

export default function Sinalizacao() {
  return (
    <main className="bg-[#E7E9F2] text-[#4B4B48]">
      {/* HEADER – faixa de imagens */}
      <section className="w-full">
        <img
          src="/sinalizacao/header.png"   // troque para .jpg se for o caso
          alt="Sinalização - header"
          className="w-full h-40 md:h-56 object-cover"
        />
      </section>

      {/* CONTEÚDO PRINCIPAL */}
      <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <div className="grid md:grid-cols-3 gap-10 md:gap-14 items-start">
          {/* Texto (2/3) */}
          <div className="md:col-span-2">
            {/* faixinha colorida acima do título */}
            <div className="flex items-center mb-4">
              <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
              <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
              <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
              <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" />
            </div>

            <h1 className="text-[28px] md:text-[36px] font-extrabold tracking-wide mb-6">
              SINALIZAÇÃO
            </h1>

            <div className="space-y-5 leading-relaxed text-[16px] md:text-[17px]">
              <p>
                A M2 desenvolve soluções completas de sinalização corporativa e
                institucional, unindo design, funcionalidade e durabilidade.
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam voluptatibus eaque facilis.
              </p>
              <p>
                Atuamos desde o estudo de fluxos até a instalação de totens,
                placas e painéis internos e externos, garantindo leitura clara e
                acabamento impecável. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Voluptatem quas, earum repellat, fuga sint
                commodi reiciendis, labore sit.
              </p>
              <p>
                Nossos projetos atendem padrões técnicos e normas de acessibilidade,
                com materiais de alta performance e controle total de cor. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Quod, maxime!
              </p>
            </div>
          </div>

          {/* Imagem lateral (1/3) */}
          <aside className="md:pl-2">
            <figure className="rounded-xl overflow-hidden shadow-sm bg-white">
              <img
                src="/sinalizacao/img-2.png"   // troque para .jpg se for o caso
                alt="Projeto de sinalização"
                className="w-full h-[520px] object-cover"
              />
            </figure>
          </aside>
        </div>

        {/* GRID DE CASES / BLOQUINHOS */}
        <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-xl bg-[#D8DCE7] hover:bg-[#cfd3df] transition-colors"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
