// src/pages/servicos/Midiaooh.jsx
import headerImg from "../../assets/midiaooh/header.png";
import img2 from "../../assets/midiaooh/img-2.png";

// Importa automaticamente TODAS as imagens da pasta midiaooh
const allImages = import.meta.glob("../../assets/midiaooh/*", {
  eager: true,
});

// Filtra só as numeradas (1,2,3...) e ignora header/img-2
const gridImgs = Object.entries(allImages)
  .filter(([path]) => {
    const file = path.split("/").pop(); // ex: "1.png"
    const name = file.split(".")[0]; // ex: "1"

    if (file === "header.png") return false;
    if (file === "img-2.png") return false;

    // mantém só arquivos cujo nome é número (1,2,3...)
    return /^\d+$/.test(name);
  })
  // garante ordem 1,2,3...
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, mod]) => mod.default ?? mod);

export default function Midiaooh() {
  return (
    <main className="bg-[#E7E9F2] text-[#4B4B48]">
      {/* HEADER */}
      <section className="w-full">
        <img
          src={headerImg}
          alt="Mídia OOH - header"
          className="w-full h-40 md:h-56 object-cover"
        />
      </section>

      {/* CONTEÚDO */}
      <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-14 items-start">
          {/* COLUNA DE TEXTO */}
          <div className="md:col-span-2">
            {/* BARRAS */}
            <div className="flex items-center mb-4">
              <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
              <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
              <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
              <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" />
            </div>

            {/* TÍTULO PRINCIPAL */}
            <h1 className="text-[28px] md:text-[36px] font-extrabold tracking-wide mb-6">
              MÍDIA OOH
            </h1>

            {/* SEÇÕES */}
            <div className="space-y-10 leading-relaxed text-[16px] md:text-[17px]">
              {/* 1️⃣ O que é mídia OOH? */}
              <div>
                <div className="relative mb-2">
                  <span
                    className="
                      hidden md:block absolute right-full mr-5
                      top-1/2 -translate-y-1/2
                      h-5 w-24 bg-[#E5258C] rounded-r-md
                    "
                  />
                  <h2 className="font-bold text-[18px] md:text-[20px]">
                    O que é mídia OOH?
                  </h2>
                </div>

                <p className="mb-3">
                  Na M2, mídia OOH (Out of Home) é tudo aquilo que leva a sua
                  mensagem para as ruas: outdoors, painéis de grande formato,
                  frontlights, backlights, empenas, mobiliário urbano, metrô,
                  BRT, VLT, terminais e aeroportos.
                </p>

                <p className="mb-3">
                  Planejamos e produzimos peças para OOH com foco em impacto e
                  legibilidade, garantindo consistência na cor e durabilidade
                  mesmo em condições de alta exposição.
                </p>

                <p className="mb-3">
                  Do planejamento à instalação, nossa operação 24/7 assegura
                  prazos competitivos em todo o Brasil.
                </p>

                <p className="mb-3">
                  Na M2, não cuidamos apenas da arte final: entregamos a solução
                  completa em produção gráfica para OOH.
                </p>
              </div>

              {/* 2️⃣ Por que investir em mídia OOH? */}
              <div>
                <div className="relative mb-2">
                  <span
                    className="
                      hidden md:block absolute right-full mr-5
                      top-1/2 -translate-y-1/2
                      h-5 w-24 bg-[#FFD400] rounded-r-md
                    "
                  />
                  <h2 className="font-bold text-[18px] md:text-[20px]">
                    Por que investir em mídia OOH?
                  </h2>
                </div>

                <p className="mb-3">
                  Investir em mídia OOH é colocar sua marca em contato diário
                  com milhares de pessoas, em ambientes de grande fluxo:
                </p>

                <ul className="list-disc ml-5 space-y-1.5">
                  <li>
                    Aumenta a visibilidade da marca em rotas estratégicas e
                    pontos de alto tráfego;
                  </li>
                  <li>
                    Complementa campanhas online, reforçando a mensagem no mundo
                    físico;
                  </li>
                  <li>
                    Gera impacto em poucos segundos, com peças pensadas para
                    leitura rápida;
                  </li>
                  <li>
                    Fortalece posicionamento, destacando presença em pontos
                    premium da cidade;
                  </li>
                  <li>
                    Alcança públicos diversos, sem depender de algoritmos ou
                    segmentações digitais.;
                  </li>
                </ul>

                <p className="mt-3">
                  Quando bem planejada e bem produzida, a mídia OOH se torna um
                  ativo de marca, ajudando a construir lembrança, autoridade e
                  preferência na hora da compra.
                </p>
              </div>

              {/* 3️⃣ Por que escolher a M2 para sua mídia OOH? */}
              <div>
                <div className="relative mb-2">
                  <span
                    className="
                      hidden md:block absolute right-full mr-5
                      top-1/2 -translate-y-1/2
                      h-5 w-24 bg-[#00B8F1] rounded-r-md
                    "
                  />
                  <h2 className="font-bold text-[18px] md:text-[20px]">
                    Por que escolher a M2 para sua mídia OOH?
                  </h2>
                </div>

                <p className="mb-3">
                  Na M2, não cuidamos apenas da arte final: entregamos a solução
                  completa em produção gráfica para OOH.
                </p>

                <p className="mb-3">
                  Planejamos e produzimos peças para OOH com foco em impacto,
                  legibilidade, durabilidade e consistência na cor mesmo em
                  condições de alta exposição.
                </p>

                <p className="mb-3">
                  Do planejamento à instalação, nossa operação 24/7 assegura
                  prazos competitivos em todo o Brasil.
                </p>

                <p className="mb-3">
                  Prazos competitivos, preparados para grande volume e formatos
                  especiais.
                </p>

                <p className="mb-3">
                  Controle de cor e padrão visual, essencial em campanhas
                  nacionais.
                </p>

                <p className="mb-3">
                  Materiais adequados para área externa, com resistência a
                  intempéries e alta durabilidade.
                </p>

                <p className="mb-3">
                  Equipe de instalação especializada, com atuação em diferentes
                  cidades e estados.
                </p>

                <p className="mb-3">
                  Acompanhamento e controle de qualidade em cada etapa da
                  produção à aplicação.
                </p>

                <p className="mb-3">
                  Atendemos campanhas nacionais mantendo o mesmo padrão de
                  qualidade em todas as praças, garantindo que sua marca seja
                  vista com a mesma força e cuidado.
                </p>
              </div>
            </div>
          </div>

          {/* IMAGEM À DIREITA */}
          <aside>
            <figure className="rounded-xl overflow-hidden bg-white shadow-sm">
              <img
                src={img2}
                alt="Projeto OOH"
                className="w-full h-[520px] object-cover"
              />
            </figure>
          </aside>
        </div>

        {/* FORMULÁRIO — PADRÃO */}
        <div className="mt-16 md:mt-20">
          <h2 className="text-[18px] md:text-[20px] font-bold leading-snug">
            Gostou do que viu?
          </h2>
          <h3 className="text-[18px] md:text-[20px] font-bold mb-4">
            Peça agora seu orçamento!
          </h3>

          <form className="p-0 bg-[#E7E9F2] grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-sm mb-1 block">Nome:</label>
              <input className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm" />
            </div>

            <div>
              <label className="text-sm mb-1 block">E-mail:</label>
              <input className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm mb-1 block">Whatsapp:</label>
              <input className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm" />
            </div>

            <div>
              <label className="text-sm mb-1 block">Empresa:</label>
              <input className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm mb-1 block">CNPJ:</label>
              <input className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm" />
            </div>

            <div>
              <label className="text-sm mb-1 block">Cargo:</label>
              <input className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-sm mb-1 block">Produto de interesse:</label>
              <input className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm" />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm mb-1 block">Mensagem:</label>
              <textarea
                rows={4}
                className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm resize-none"
              />
            </div>

            <div className="md:col-span-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-1">
              <label className="flex items-start gap-2 text-xs leading-snug max-w-xl">
                <input type="checkbox" className="mt-0.5" />
                Eu dou consentimento para processar meus dados pessoais e para
                futuras comunicações de marketing.
              </label>

              <button className="self-start px-6 py-2 rounded-full text-sm font-semibold bg-[#E5258C] text-white">
                enviar
              </button>
            </div>
          </form>
        </div>

        {/* GRID FINAL — IMAGENS AUTOMÁTICAS */}
        <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {gridImgs.map((src, i) => (
            <figure
              key={i}
              className="aspect-[4/3] rounded-xl overflow-hidden bg-[#D8DCE7]"
            >
              <img
                src={src}
                alt={`Projeto OOH ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
