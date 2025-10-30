// src/pages/solucoes/Supermercados.jsx
import headerImg from "../../assets/supermercados/header.png";
import img2 from "../../assets/supermercados/img-2.png";

export default function Supermercados() {
  return (
    <main className="bg-[#E7E9F2] text-[#4B4B48]">
      <section className="w-full">
        <img
          src={headerImg}
          alt="Supermercados - header"
          className="w-full h-40 md:h-56 object-cover"
        />
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <div className="grid md:grid-cols-3 gap-10 md:gap-14 items-start">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
              <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
              <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
              <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" />
            </div>

            <h1 className="text-[28px] md:text-[36px] font-extrabold mb-6">
              SUPERMERCADOS
            </h1>

            <div className="space-y-5 leading-relaxed text-[16px]">
              <p>
                A M2 atua no segmento de varejo alimentício com soluções que potencializam a comunicação visual em pontos de venda.
              </p>
              <p>
                Desenvolvemos projetos de sinalização, ambientação, fachadas, displays e materiais promocionais, garantindo integração estética e eficiência operacional.
              </p>
              <p>
                Nossa estrutura produtiva 24/7 assegura escala nacional, alto padrão de qualidade e consistência de cores em todas as unidades da rede.
              </p>
            </div>
          </div>

          <aside>
            <figure className="rounded-xl overflow-hidden bg-white shadow-sm">
              <img
                src={img2}
                alt="Projeto de comunicação visual em supermercados"
                className="w-full h-[520px] object-cover"
              />
            </figure>
          </aside>
        </div>

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
