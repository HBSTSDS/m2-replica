// src/pages/servicos/Sinalizacao.jsx
import { useState } from "react";
import headerImg from "../../assets/sinalizacao/header.png";
import img2 from "../../assets/sinalizacao/img-2.png";

// IMPORT GLOBAL AUTOMÁTICO DAS TAGS
// carrega tudo que começa com "tag" dentro de /sinalizacao
const tagImages = Object.values(
  import.meta.glob("../../assets/sinalizacao/tag*.{png,jpg,jpeg}", {
    eager: true,
    import: "default",
  })
);

export default function Sinalizacao() {
  const [lightboxImg, setLightboxImg] = useState(null);

  return (
    <main className="bg-[#E7E9F2] text-[#4B4B48]">
      {/* HEADER */}
      <section className="w-full">
        <img
          src={headerImg}
          alt="Sinalização - header"
          className="w-full h-40 md:h-56 object-cover"
        />
      </section>

      {/* CONTEÚDO */}
      <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <div className="grid md:grid-cols-3 gap-10 md:gap-14 items-start">
          {/* COLUNA DE TEXTO */}
          <div className="md:col-span-2">
            {/* Barras */}
            <div className="flex items-center mb-4">
              <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
              <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
              <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
              <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" />
            </div>

            {/* Título principal */}
            <h1 className="text-[28px] md:text-[36px] font-extrabold tracking-wide mb-6">
              SINALIZAÇÃO
            </h1>

            <div className="space-y-10 leading-relaxed text-[16px] md:text-[17px]">
              {/* 1️⃣ O que é sinalização na M2? */}
              <div>
                <div className="relative mb-2">
                  <span
                    className="
                      hidden md:block absolute right-full mr-5
                      top-1/2 -translate-y-1/2
                      h-5 w-24 bg-[#E5258C] rounded-r-md
                    "
                  />
                  <h2 className="font-bold text-[20px]">
                    O que é sinalização na M2?
                  </h2>
                </div>

                <p className="mb-3">
                  A M2 desenvolve soluções completas de sinalização corporativa e
                  institucional, unindo design, funcionalidade e performance.
                </p>

                <p className="mb-3">
                  Falamos de tudo que orienta, informa e organiza o fluxo de
                  pessoas em ambientes internos e externos: totens, placas de
                  identificação, placas de circulação, sinalização direcional,
                  pictogramas, sinalização de acessibilidade, sinalização
                  técnica, painéis e comunicação visual integrada.
                </p>

                <p className="mb-3">
                  Nossos projetos seguem normas de acessibilidade, requisitos
                  técnicos e padrões gráficos, garantindo leitura clara,
                  orientação eficiente e captação rápida das informações do
                  ambiente.
                </p>
              </div>

              {/* 2️⃣ Por que investir em sinalização? */}
              <div>
                <div className="relative mb-2">
                  <span
                    className="
                      hidden md:block absolute right-full mr-5
                      top-1/2 -translate-y-1/2
                      h-5 w-24 bg-[#FFD400] rounded-r-md
                    "
                  />
                  <h2 className="font-bold text-[20px]">
                    Por que investir em sinalização?
                  </h2>
                </div>

                <p className="mb-3">
                  A sinalização corporativa faz total diferença na experiência do
                  usuário quando ele transita por um espaço.
                </p>

                <ul className="list-disc ml-5 space-y-1.5">
                  <li>
                    Organiza fluxos, reduzindo dúvidas e deslocamentos
                    desnecessários;
                  </li>
                  <li>
                    Reflete profissionalismo, reforçando identidade visual da
                    marca;
                  </li>
                  <li>
                    Atende normas de acessibilidade e segurança, contribuindo
                    para conforto e conformidade legal;
                  </li>
                  <li>
                    Fortalece a identidade visual integrando logotipos, cores e
                    padrões aos sistemas de comunicação;
                  </li>
                  <li>
                    Aumenta percepção de qualidade e experiência do visitante.
                  </li>
                </ul>

                <p className="mt-3">
                  Mais do que apenas “placas na parede”, um bom sistema de
                  sinalização é parte da experiência do espaço, ajudando o
                  público a se localizar e a se sentir bem atendido.
                </p>
              </div>

              {/* 3️⃣ Por que escolher a M2 para sua sinalização? */}
              <div>
                <div className="relative mb-2">
                  <span
                    className="
                      hidden md:block absolute right-full mr-5
                      top-1/2 -translate-y-1/2
                      h-5 w-24 bg-[#00B8F1] rounded-r-md
                    "
                  />
                  <h2 className="font-bold text-[20px]">
                    Por que escolher a M2 para sua sinalização?
                  </h2>
                </div>

                <p className="mb-3">
                  A M2 une projeto, indústria gráfica e instalação para entregar
                  sistemas de sinalização completos, feitos para uso intenso.
                </p>

                <ul className="list-disc ml-5 space-y-1.5">
                  <li>
                    Estudo de fluxos e necessidades de cada ambiente (entrada,
                    circulação, setores, áreas técnicas);
                  </li>
                  <li>
                    Desenvolvimento de sistemas de placas (layouts,
                    pictogramas, cores, tamanhos e hierarquia de informação);
                  </li>
                  <li>
                    Produção de totens, placas, painéis e sinalização
                    complementar com materiais de alta performance;
                  </li>
                  <li>
                    Adequações às normas de acessibilidade (altura, contraste,
                    instalação etc.);
                  </li>
                  <li>
                    Acabamento premium e instalação profissional garantindo
                    alinhamento, fixação correta e durabilidade;
                  </li>
                  <li>
                    Atuação em todo o Brasil, com controle de qualidade em cada
                    etapa.
                  </li>
                </ul>

                <p className="mt-3">
                  Com a M2, a sinalização deixa de ser um item isolado e passa a
                  ser um sistema integrado ao projeto arquitetônico, à
                  comunicação visual e à identidade da sua marca.
                </p>
              </div>
            </div>
          </div>

          {/* IMAGEM */}
          <aside>
            <figure className="rounded-xl overflow-hidden bg-white shadow-sm">
              <img
                src={img2}
                alt="Projeto de sinalização"
                className="w-full h-[520px] object-cover"
              />
            </figure>
          </aside>
        </div>

        {/* FORMULÁRIO */}
        <div className="mt-16 md:mt-20">
          <h2 className="text-[20px] font-bold leading-snug">
            Gostou do que viu?
          </h2>
          <h3 className="text-[20px] font-bold mb-4">
            Peça agora seu orçamento!
          </h3>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <label className="text-sm mb-1 block">
                Produto de Interesse:
              </label>
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

        {/* GRID FINAL – TAGS (AGORA CLICÁVEIS) */}
        <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {tagImages.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setLightboxImg(src)}
              className="rounded-xl overflow-hidden bg-white shadow-sm cursor-pointer focus:outline-none"
              aria-label={`Abrir sinalização ${i + 1} em tela cheia`}
            >
              <img
                src={src}
                alt={`Tag Sinalização ${i + 1}`}
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
