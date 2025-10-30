// src/pages/solucoes/Eventos.jsx
import headerImg from "../../assets/eventos/header.png";
import img2 from "../../assets/eventos/img-2.png";

export default function Eventos() {
  return (
    <main className="bg-[#E7E9F2] text-[#4B4B48]">
      {/* HEADER */}
      <section className="w-full">
        <img
          src={headerImg}
          alt="Eventos - header"
          className="w-full h-40 md:h-56 object-cover"
        />
      </section>

      {/* CONTEÚDO PRINCIPAL */}
      <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <div className="grid md:grid-cols-3 gap-10 md:gap-14 items-start">
          {/* Texto */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
              <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
              <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
              <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" />
            </div>

            <h1 className="text-[28px] md:text-[36px] font-extrabold mb-6">
              EVENTOS
            </h1>

            <div className="space-y-5 leading-relaxed text-[16px]">
              <p>
                Estruturamos a comunicação visual completa para feiras, congressos e ativações, integrando cenografia, sinalização e materiais promocionais.
              </p>
              <p>
                Do projeto ao campo, nossa operação 24/7 garante montagem ágil, acabamento premium e consistência de cores em grandes formatos.
              </p>
              <p>
                Atendemos projetos em todo o Brasil com logística otimizada e equipe especializada para prazos competitivos.
              </p>
            </div>
          </div>

          {/* Imagem lateral */}
          <aside className="md:pl-2">
            <figure className="rounded-xl overflow-hidden bg-white shadow-sm">
              <img
                src={img2}
                alt="Projeto para eventos"
                className="w-full h-[520px] object-cover"
              />
            </figure>
          </aside>
        </div>

        {/* GRID DE CASES */}
        <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-xl bg-[#D8DCE7] hover:bg-[#cfd3df]"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
