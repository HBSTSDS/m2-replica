// src/pages/servicos/Envelopamento.jsx
import { Link } from "react-router-dom";

export default function Envelopamento() {
  return (
    <main className="bg-[#E7E9F2] text-[#4B4B48]">
      {/* HEADER – faixa de imagens */}
      <section className="w-full">
        <img
          src="/envelopamento/header.png"
          alt="Envelopamento - header"
          className="w-full h-40 md:h-56 object-cover"
        />
      </section>

      {/* CONTEÚDO PRINCIPAL */}
      <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <div className="grid md:grid-cols-3 gap-10 md:gap-14 items-start">
          {/* Texto (2/3) */}
          <div className="md:col-span-2">
            {/* Faixinha colorida acima do título */}
            <div className="flex items-center mb-4">
              <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
              <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
              <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
              <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" />
            </div>

            <h1 className="text-[28px] md:text-[36px] font-extrabold tracking-wide mb-6">
              ENVELOPAMENTO
            </h1>

            <div className="space-y-5 leading-relaxed text-[16px] md:text-[17px]">
              <p>
                A M2 oferece soluções de envelopamento que transformam superfícies
                e ambientes, aliando impacto visual, durabilidade e alta
                performance técnica. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Quibusdam repellat amet ea sed doloremque
                incidunt, tempore deleniti, aut itaque quasi voluptas facilis!
                Pariatur iste quas molestiae sequi, nobis modi architecto.
              </p>

              <p>
                Nossos processos garantem aderência perfeita e acabamento
                impecável, seja em veículos, fachadas, equipamentos ou estruturas
                temporárias. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Commodi, nobis fuga? Atque deserunt, aspernatur sit
                dignissimos reiciendis saepe similique harum, consectetur nihil
                modi fugiat optio earum voluptatibus soluta tempore porro.
              </p>

              <p>
                Com materiais certificados e equipe especializada, a M2 assegura
                qualidade e resistência para projetos de grande escala em todo o
                Brasil. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Debitis tempore, inventore sed accusantium corporis totam
                repudiandae dolores consectetur ad distinctio officiis sequi
                similique fugiat deserunt magni necessitatibus ducimus
                exercitationem voluptas.
              </p>
            </div>
          </div>

          {/* Imagem lateral (1/3) */}
          <aside className="md:pl-2">
            <figure className="rounded-xl overflow-hidden shadow-sm bg-white">
              <img
                src="/envelopamento/img-2.png"
                alt="Projeto de envelopamento"
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
