// src/pages/servicos/ComunicacaoVisual.jsx
import headerImg from "../../assets/comunicacaoVisual/header.png";
import img2 from "../../assets/comunicacaoVisual/img2.png";

export default function ComunicacaoVisual() {
  return (
    <main className="bg-[#E7E9F2] text-[#4B4B48]">
      {/* HEADER */}
      <section className="w-full">
        <img
          src={headerImg}
          alt="Comunicação Visual - header"
          className="w-full h-40 md:h-56 object-cover"
        />
      </section>

      {/* CONTEÚDO */}
      <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <div className="grid md:grid-cols-3 gap-10 md:gap-14 items-start">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
              <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
              <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
              <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" />
            </div>

            <h1 className="text-[28px] md:text-[36px] font-extrabold tracking-wide mb-6">
              <span className="inline-block w-3 h-3 rounded-sm bg-[#E5258C] mr-2 align-middle" />
              COMUNICAÇÃO VISUAL
            </h1>

            <div className="space-y-5 leading-relaxed text-[16px] md:text-[17px]">
              <p>
                A M2 integra estratégia, design e produção para entregar soluções completas em comunicação visual, com alto padrão de qualidade e escala nacional.
              </p>
              <p>
                Nossa estrutura 24/7 e o maior parque gráfico UV da América Latina garantem prazos competitivos, consistência de cores e acabamento premium.
              </p>
              <p>
                Do planejamento à instalação, conectamos todas as etapas em um ecossistema criativo que reduz custos e acelera entregas.
              </p>
            </div>
          </div>

          <aside className="md:pl-2">
            <figure className="rounded-xl overflow-hidden shadow-sm bg-white">
              <img
                src={img2}
                alt="Projeto de comunicação visual"
                className="w-full h-[450px] md:h-[520px] object-cover"
              />
            </figure>
          </aside>
        </div>

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
