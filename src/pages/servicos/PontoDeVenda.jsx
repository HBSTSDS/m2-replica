// src/pages/servicos/PontoDeVenda.jsx
import { useState } from "react";
import headerImg from "../../assets/pontoDeVenda/header.png";
import img2 from "../../assets/pontoDeVenda/img-2.png";

// IMPORT GLOBAL AUTOMÁTICO DAS TAGS DE PDV
// carrega qualquer arquivo que comece com "tag" dentro de /pontoDeVenda
const tagImages = Object.values(
  import.meta.glob("../../assets/pontoDeVenda/tag*.{png,jpg,jpeg}", {
    eager: true,
    import: "default",
  })
);

export default function PontoDeVenda() {
  const [lightboxImg, setLightboxImg] = useState(null);

  return (
    <main className="bg-[#E7E9F2] text-[#4B4B48]">
      {/* HEADER */}
      <section className="w-full">
        <img
          src={headerImg}
          alt="Ponto de Venda - header"
          className="w-full h-40 md:h-56 object-cover"
        />
      </section>

      {/* CONTEÚDO */}
      <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <div className="grid md:grid-cols-3 gap-10 md:gap-14 items-start">
          {/* COLUNA DE TEXTO */}
          <div className="md:col-span-2">
            {/* Barras coloridas */}
            <div className="flex items-center mb-4">
              <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
              <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
              <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
              <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" />
            </div>

            {/* Título principal */}
            <h1 className="text-[28px] md:text-[36px] font-extrabold tracking-wide mb-6">
              PONTO DE VENDA
            </h1>

            {/* TEXTOS */}
            <div className="space-y-10 leading-relaxed text-[16px] md:text-[17px]">
              {/* 1️⃣ O que é PDV na M2? */}
              <div>
                <div className="relative mb-2">
                  <span
                    className="
                      hidden md:block absolute right-full mr-5
                      top-1/2 -translate-y-1/2
                      h-5 w-24 bg-[#E5258C] rounded-r-md
                    "
                  />
                  <h2 className="font-bold text-[18px] md:text-[20px] leading-tight">
                    O que é PDV na M2?
                  </h2>
                </div>

                <p className="mb-3">
                  Na M2, PDV é onde toda a estratégia de comunicação visual
                  encontra seu momento mais decisivo: a hora da compra. Falamos
                  de displays, wobblers, testeiras, ilhas, expositores, faixas
                  de gôndola, stoppers e mobiliários especiais que organizam,
                  comunicam e valorizam produtos no ponto de venda.
                </p>

                <p className="mb-3">
                  Desenvolvemos materiais de PDV com foco em sell-out,
                  experiência e padronização de marca, garantindo que cada
                  campanha converse com o shopper, destaque os produtos certos e
                  traduza o posicionamento da marca na gôndola.
                </p>

                <p>
                  Do design à produção e instalação, integramos displays,
                  wobblers e mobiliários especiais em soluções completas para
                  varejo e redes.
                </p>
              </div>

              {/* 2️⃣ Por que investir em materiais de PDV? */}
              <div>
                <div className="relative mb-2">
                  <span
                    className="
                      hidden md:block absolute right-full mr-5
                      top-1/2 -translate-y-1/2
                      h-5 w-24 bg-[#FFD400] rounded-r-md
                    "
                  />
                  <h2 className="font-bold text-[18px] md:text-[20px] leading-tight">
                    Por que investir em materiais de PDV?
                  </h2>
                </div>

                <p className="mb-3">
                  Investir em PDV é investir onde a relação entre marca, produto
                  e consumidor acontece de forma mais direta:
                </p>

                <ul className="list-disc ml-5 space-y-1.5">
                  <li>
                    Influencia a decisão de compra no momento em que o cliente
                    está diante da gôndola ou do expositor;
                  </li>
                  <li>
                    Dá visibilidade às campanhas e lançamentos, destacando
                    produtos em meio a dezenas de opções;
                  </li>
                  <li>
                    Valoriza o produto e a marca, reforçando percepção de
                    qualidade e organização;
                  </li>
                  <li>
                    Aumenta o giro (sell-out) ao guiar o olhar, explicar
                    benefícios e evidenciar preços e ofertas;
                  </li>
                  <li>
                    Padroniza a comunicação entre lojas e regiões, fortalecendo
                    a identidade da marca no varejo.
                  </li>
                </ul>

                <p className="mt-3">
                  Um bom material de PDV não é apenas “decoração”: ele é uma
                  ferramenta de venda, pensada para conectar mensagem, exposição
                  e resultado.
                </p>
              </div>

              {/* 3️⃣ Por que escolher a M2 para materiais de PDV? */}
              <div>
                <div className="relative mb-2">
                  <span
                    className="
                      hidden md:block absolute right-full mr-5
                      top-1/2 -translate-y-1/2
                      h-5 w-24 bg-[#00B8F1] rounded-r-md
                    "
                  />
                  <h2 className="font-bold text-[18px] md:text-[20px] leading-tight">
                    Por que escolher a M2 para materiais de PDV?
                  </h2>
                </div>

                <p className="mb-3">
                  A M2 une criação, indústria gráfica e operação nacional para
                  entregar materiais de PDV prontos para performar no ponto de
                  venda.
                </p>

                <p className="mb-3">
                  <span className="font-semibold">Operação nacional 24/7</span>,
                  com prazos competitivos para ações sazonais, lançamentos e
                  campanhas de varejo que não podem atrasar.
                </p>

                <p className="mb-3">
                  Desenvolvimento de ilhas de loja, displays, wobblers,
                  testeiras, faixas, expositores e mobiliário personalizado.
                </p>

                <p className="mb-3">
                  Parque gráfico preparado para grande volume e múltiplas
                  versões de layout (SKUs, regiões, formatos).
                </p>

                <p className="mb-3">
                  Controle de cor e padrão visual, essencial para marcas que
                  precisam de consistência em todo o Brasil.
                </p>

                <p className="mb-3">
                  Logística e instalação, garantindo que o material chegue
                  certo, no prazo e seja aplicado corretamente.
                </p>

                <p className="mb-3">
                  Atendimento focado em campanhas de varejo, entendendo
                  calendário promocional e janelas de execução.
                </p>

                <p>
                  Com a M2, o PDV deixa de ser apenas o “final da cadeia” e
                  passa a ser tratado como um ativo estratégico de marca e
                  venda, com materiais pensados para entregar resultado no dia a
                  dia.
                </p>
              </div>
            </div>
          </div>

          {/* IMAGEM À DIREITA */}
          <aside>
            <figure className="rounded-xl overflow-hidden bg-white shadow-sm">
              <img
                src={img2}
                alt="Projeto de PDV"
                className="w-full h-[520px] object-cover"
              />
            </figure>
          </aside>
        </div>

        {/* FORMULÁRIO PADRÃO */}
        <div className="mt-16 md:mt-20">
          <h2 className="text-[18px] md:text-[20px] font-bold leading-snug">
            Gostou do que viu?
          </h2>
          <h3 className="text-[18px] md:text-[20px] font-bold mb-4">
            Peça agora seu orçamento!
          </h3>

          <form className="p-0 bg-[#E7E9F2] grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Nome:</label>
              <input className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm" />
            </div>

            <div>
              <label className="block text-sm mb-1">E-mail:</label>
              <input className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm mb-1">Whatsapp:</label>
              <input className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm" />
            </div>

            <div>
              <label className="block text-sm mb-1">Empresa:</label>
              <input className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm mb-1">CNPJ:</label>
              <input className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm" />
            </div>

            <div>
              <label className="block text-sm mb-1">Cargo:</label>
              <input className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm mb-1">Produto de interesse:</label>
              <input className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Mensagem:</label>
              <textarea
                rows={4}
                className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm resize-none"
              />
            </div>

            <div className="md:col-span-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-1">
              <label className="flex items-start gap-2 text-xs leading-snug max-w-xl">
                <input type="checkbox" className="mt-0.5" />
                <span>
                  Eu dou consentimento para processar meus dados pessoais e para
                  futuras comunicações de marketing.
                </span>
              </label>

              <button className="self-start px-6 py-2 rounded-full text-sm font-semibold bg-[#E5258C] text-white">
                enviar
              </button>
            </div>
          </form>
        </div>

        {/* GRID FINAL – TAGS PDV (AGORA CLICÁVEIS) */}
        <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {tagImages.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setLightboxImg(src)}
              className="rounded-xl overflow-hidden bg-white shadow-sm cursor-pointer focus:outline-none"
              aria-label={`Abrir tag PDV ${i + 1} em tela cheia`}
            >
              <img
                src={src}
                alt={`Tag PDV ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </button>
          ))}
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
          onClick={() => setLightboxImg(null)}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute -top-10 right-0 text-white text-3xl font-light hover:opacity-70"
            >
              ×
            </button>

            <img
              src={lightboxImg}
              alt="Imagem ampliada"
              className="w-full max-h-[85vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </main>
  );
}
