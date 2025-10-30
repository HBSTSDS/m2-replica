// src/pages/solucoes/Vitrinismos.jsx
import headerImg from "../../assets/vitrinismos/header.png";
import img2 from "../../assets/vitrinismos/img-2.png";

export default function Vitrinismos() {
  return (
    <main className="bg-[#E7E9F2] text-[#4B4B48]">
      <section className="w-full">
        <img
          src={headerImg}
          alt="Vitrinismos - header"
          className="w-full h-40 md:h-56 object-cover"
        />
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
              <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
              <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
              <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" />
            </div>

            <h1 className="text-[28px] md:text-[36px] font-extrabold mb-6">
              VITRINISMOS
            </h1>

            <div className="space-y-5 text-[16px] leading-relaxed">
              <p>
                Concebemos vitrines que combinam linguagem de marca, fluxo da loja e viabilidade de produção para máxima conversão.
              </p>
              <p>
                Do projeto ao setup em campo, integramos impressão, corte, displays e iluminação, mantendo padronização em redes nacionais.
              </p>
              <p>
                Operação 24/7 com controle de cor e acabamento premium para lançamentos, coleções sazonais e ativações especiais.
              </p>
            </div>
          </div>

          <aside>
            <figure className="rounded-xl overflow-hidden bg-white shadow-sm">
              <img
                src={img2}
                alt="Projeto de vitrinismo"
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
