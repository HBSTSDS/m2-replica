// src/pages/servicos/ComunicacaoVisual.jsx
import headerImg from "../../assets/comunicacaoVisual/header.png";
import img2 from "../../assets/comunicacaoVisual/img2.png";

// Pega TODAS as imagens da pasta automaticamente (qualquer nome/extensão)
const allImages = import.meta.glob(
  "../../assets/comunicacaoVisual/*",
  {
    eager: true,
  }
);

// Monta array só com as imagens que NÃO são o header nem a img2
const gridImgs = Object.entries(allImages)
  .filter(([path]) => {
    // exclui header e img2
    return (
      !path.endsWith("/header.png") &&
      !path.endsWith("/img2.png")
    );
  })
  .map(([, mod]) => {
    // cada módulo vem como { default: 'url-da-imagem' }
    // então pegamos mod.default
    // se por algum motivo não tiver default, cai no fallback mod
    return mod.default ?? mod;
  });

export default function ComunicacaoVisual() {
  return (
    <main className="bg-[#E7E9F2] text-[#4B4B48]">
      {/* HEADER (MANTIDO) */}
      <section className="w-full">
        <img
          src={headerImg}
          alt="Comunicação Visual - header"
          className="w-full h-40 md:h-56 object-cover"
        />
      </section>

      {/* CONTEÚDO */}
      <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        {/* GRID TEXTO + IMAGEM */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-14 items-start">
          {/* COLUNA DE TEXTO */}
          <div className="md:col-span-2">
            {/* Faixas coloridas + título principal (MANTIDOS) */}
            <div className="flex items-center mb-4">
              <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
              <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
              <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
              <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" />
            </div>

            <h1 className="text-[28px] md:text-[36px] font-extrabold tracking-wide mb-6">
              COMUNICAÇÃO VISUAL
            </h1>

            {/* ------ MIÓLO ------ */}
            <div className="space-y-8 leading-relaxed text-[16px] md:text-[17px]">
              {/* 1️⃣ O QUE É COMUNICAÇÃO VISUAL */}
              <div>
                {/* Etiqueta 100% fora do container */}
                <div className="relative mb-2">
                  <span
                    className="
                      hidden md:block
                      absolute right-full mr-5
                      top-1/2 -translate-y-1/2
                      h-5 w-24
                      bg-[#E5258C]
                      rounded-r-md
                    "
                  />
                  <h2 className="font-bold text-[18px] md:text-[20px] leading-tight">
                    O que é comunicação visual?
                  </h2>
                </div>

                <p className="mb-3">
                  Na M2, quando falamos em comunicação visual, falamos em
                  transformar ideias em presença física: fachadas, impressos,
                  recorte, montagem e instalação. É o encontro entre criação e
                  indústria gráfica, materializando campanhas em displays,
                  sinalização, adesivos e materiais de ponto de venda.
                </p>
                <p>
                  A comunicação visual é o conjunto desses elementos que ajudam
                  a levar a identidade da sua marca para o mundo real com
                  impacto, clareza e propósito – seja em loja, rua, evento ou
                  feira.
                </p>
              </div>

              {/* 2️⃣ POR QUE INVESTIR */}
              <div>
                <div className="relative mb-2">
                  <span
                    className="
                      hidden md:block
                      absolute right-full mr-5
                      top-1/2 -translate-y-1/2
                      h-5 w-24
                      bg-[#FFD400]
                      rounded-r-md
                    "
                  />
                  <h2 className="font-bold text-[18px] md:text-[20px] leading-tight">
                    Por que investir em comunicação visual?
                  </h2>
                </div>

                <ul className="list-disc ml-5 space-y-1.5">
                  <li>
                    Chamar a atenção do cliente no meio de tantos estímulos
                    visuais;
                  </li>
                  <li>
                    Reforçar a identidade da marca, criando memória afetiva e
                    reconhecimento;
                  </li>
                  <li>
                    Comunicar campanhas, preços e ofertas de forma rápida e
                    objetiva;
                  </li>
                  <li>
                    Transparecer organização, profissionalismo e confiança,
                    impactando diretamente na decisão de compra.
                  </li>
                </ul>

                <p className="mt-3">
                  Uma imagem bem planejada e bem impressa transmite a mensagem
                  em segundos. Ela informa, orienta e convence o cliente que
                  circula pelo seu espaço e coloca sua marca um passo à frente
                  no ponto de venda.
                </p>
              </div>

              {/* 3️⃣ POR QUE ESCOLHER A M2 */}
              <div>
                <div className="relative mb-2">
                  <span
                    className="
                      hidden md:block
                      absolute right-full mr-5
                      top-1/2 -translate-y-1/2
                      h-5 w-24
                      bg-[#00B8F1]
                      rounded-r-md
                    "
                  />
                  <h2 className="font-bold text-[18px] md:text-[20px] leading-tight">
                    Por que escolher a M2 para sua comunicação visual?
                  </h2>
                </div>

                <p className="mb-3">
                  Na M2, unimos estratégia, design e um parque gráfico de alta
                  performance para entregar soluções completas em comunicação
                  visual, do planejamento à instalação.
                </p>

                <ul className="list-disc ml-5 space-y-1.5">
                  <li>
                    Escala e agilidade para campanhas de varejo e grandes redes;
                  </li>
                  <li>
                    Consistência de cores e padrões entre lojas, regiões e
                    materiais diferentes;
                  </li>
                  <li>
                    Acabamento premium, com foco em durabilidade e apresentação
                    impecável no ponto de venda;
                  </li>
                  <li>
                    Processos competitivos, mesmo em produções de alto volume;
                  </li>
                  <li>
                    Equipe especializada em instalação, garantindo que o projeto
                    saia do papel exatamente como foi criado.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* IMAGEM À DIREITA (MANTIDA) */}
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

        {/* FORMULÁRIO (sem borda externa, fundo igual ao site) */}
        <div className="mt-16 md:mt-20">
          <h2 className="text-[18px] md:text-[20px] font-bold leading-snug">
            Gostou do que viu?
          </h2>
          <h3 className="text-[18px] md:text-[20px] font-bold mb-4">
            Peça agora seu orçamento!
          </h3>

          <form className="p-0 bg-[#E7E9F2] grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nome */}
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Nome:</label>
              <input
                type="text"
                className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm outline-none focus:border-[#E5258C]"
              />
            </div>

            {/* E-mail | Whatsapp */}
            <div>
              <label className="block text-sm mb-1">E-mail:</label>
              <input
                type="email"
                className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm outline-none focus:border-[#E5258C]"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Whatsapp:</label>
              <input
                type="text"
                className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm outline-none focus:border-[#E5258C]"
              />
            </div>

            {/* Empresa | CNPJ */}
            <div>
              <label className="block text-sm mb-1">Empresa:</label>
              <input
                type="text"
                className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm outline-none focus:border-[#E5258C]"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">CNPJ:</label>
              <input
                type="text"
                className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm outline-none focus:border-[#E5258C]"
              />
            </div>

            {/* Cargo | Produto de interesse */}
            <div>
              <label className="block text-sm mb-1">Cargo:</label>
              <input
                type="text"
                className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm outline-none focus:border-[#E5258C]"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Produto de interesse:</label>
              <input
                type="text"
                className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm outline-none focus:border-[#E5258C]"
              />
            </div>

            {/* Mensagem */}
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Mensagem:</label>
              <textarea
                rows={4}
                className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm outline-none resize-none focus:border-[#E5258C]"
              />
            </div>

            {/* Checkbox + botão */}
            <div className="md:col-span-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-1">
              <label className="flex items-start gap-2 text-xs leading-snug max-w-xl">
                <input type="checkbox" className="mt-0.5" />
                <span>
                  Eu dou consentimento para processar meus dados pessoais e
                  confidenciais e para futuras comunicações de marketing.
                </span>
              </label>

              <button
                type="submit"
                className="self-start px-6 py-2 rounded-full text-sm font-semibold bg-[#E5258C] text-white hover:bg-[#c91f77] transition-colors"
              >
                enviar
              </button>
            </div>
          </form>
        </div>

        {/* GRID FINAL (AGORA COM AS IMAGENS) */}
        <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {gridImgs.map((src, i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-xl overflow-hidden bg-[#D8DCE7]"
            >
              <img
                src={src}
                alt={`Projeto de comunicação visual ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
