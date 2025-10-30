// src/pages/servicos/Envelopamento.jsx
import headerImg from "../../assets/envelopamento/header.png";
import img2 from "../../assets/envelopamento/img-2.png";

export default function Envelopamento() {
  return (
    <main className="bg-[#E7E9F2] text-[#4B4B48]">
      <section className="w-full">
        <img
          src={headerImg}
          alt="Envelopamento - header"
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
              ENVELOPAMENTO
            </h1>

            <div className="space-y-5 text-[16px] leading-relaxed">
              <p>
                A M2 oferece soluções de envelopamento que transformam superfícies e ambientes, aliando impacto visual, durabilidade e alta performance técnica.
              </p>
              <p>
                Nossos processos garantem aderência perfeita e acabamento impecável, seja em veículos, fachadas, equipamentos ou estruturas temporárias.
              </p>
              <p>
                Com materiais certificados e equipe especializada, asseguramos qualidade e resistência para projetos em todo o Brasil.
              </p>
            </div>
          </div>

          <aside className="md:pl-2">
            <figure className="rounded-xl overflow-hidden shadow-sm bg-white">
              <img
                src={img2}
                alt="Projeto de envelopamento"
                className="w-full h-[520px] object-cover"
              />
            </figure>
          </aside>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
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
