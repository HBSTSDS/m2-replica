// src/pages/servicos/Midiaooh.jsx
import { Link } from "react-router-dom";

export default function Midiaooh() {
  return (
    <main className="bg-[#E7E9F2] text-[#4B4B48]">
      {/* HEADER – faixa de imagens */}
      <section className="w-full">
        <img
          src="/midiaooh/header.png"          // troque para .jpg se necessário
          alt="Mídia OOH - header"
          className="w-full h-40 md:h-56 object-cover"
        />
      </section>

      {/* CONTEÚDO PRINCIPAL */}
      <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <div className="grid md:grid-cols-3 gap-10 md:gap-14 items-start">
          {/* Texto (2/3) */}
          <div className="md:col-span-2">
            {/* faixinha colorida acima do h1 */}
            <div className="flex items-center mb-4">
              <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
              <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
              <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
              <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" />
            </div>

            <h1 className="text-[28px] md:text-[36px] font-extrabold tracking-wide mb-6">
              MÍDIA OOH
            </h1>

            <div className="space-y-5 leading-relaxed text-[16px] md:text-[17px]">
              <p>
                Planejamos e produzimos peças para OOH com foco em impacto e
                legibilidade, garantindo consistência de cor e durabilidade em
                grandes formatos. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Magnam, repellat. Aspernatur illum, explicabo
                incidunt beatae reiciendis provident.
              </p>
              <p>
                Da criação à instalação, nossa operação 24/7 assegura prazos
                competitivos em todo o Brasil, com materiais certificados e
                acabamento premium. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Quasi, eaque? Alias ex, nihil amet a eius
                deleniti.
              </p>
              <p>
                Atendemos campanhas nacionais com controle de qualidade em cada
                etapa, do preflight à aplicação. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Corrupti, ad.
              </p>
            </div>
          </div>

          {/* Imagem lateral (1/3) */}
          <aside className="md:pl-2">
            <figure className="rounded-xl overflow-hidden shadow-sm bg-white">
              <img
                src="/midiaooh/img-2.png"     // troque para .jpg se necessário
                alt="Projeto de Mídia OOH"
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
