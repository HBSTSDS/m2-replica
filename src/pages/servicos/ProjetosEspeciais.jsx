// src/pages/servicos/ProjetosEspeciais.jsx
import { useState } from "react";
import headerImg from "../../assets/projetosEspeciais/header.png";
import img2 from "../../assets/projetosEspeciais/img-2.png";

// IMPORT GLOBAL AUTOMÁTICO DAS TAGS
// carrega tudo que começa com "tag" dentro de /projetosEspeciais
const tagImages = Object.values(
  import.meta.glob("../../assets/projetosEspeciais/tag*.{png,jpg,jpeg}", {
    eager: true,
    import: "default",
  })
);

export default function ProjetosEspeciais() {
  const [lightboxImg, setLightboxImg] = useState(null);

  return (
    <main className="bg-[#E7E9F2] text-[#4B4B48]">
      {/* HEADER */}
      <section className="w-full">
        <img
          src={headerImg}
          alt="Projetos Especiais - header"
          className="w-full h-40 md:h-56 object-cover"
        />
      </section>

      {/* CONTEÚDO */}
      <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <div className="grid md:grid-cols-3 gap-10 md:gap-14 items-start">
          {/* TEXTOS */}
          <div className="md:col-span-2">
            {/* Barras coloridas */}
            <div className="flex items-center mb-4">
              <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
              <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
              <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
              <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" />
            </div>

            {/* TÍTULO PRINCIPAL */}
            <h1 className="text-[28px] md:text-[36px] font-extrabold tracking-wide mb-6">
              PROJETOS <br /> ESPECIAIS
            </h1>

            <div className="space-y-10 leading-relaxed text-[16px] md:text-[17px]">
              {/* 1️⃣ O que são projetos especiais na M2? */}
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
                    O que são projetos especiais na M2?
                  </h2>
                </div>

                <p className="mb-3">
                  Na M2, projetos especiais são ativações e estruturas
                  personalizadas que vão além do padrão da comunicação visual do
                  dia a dia.
                </p>

                <p className="mb-3">
                  Criamos ativações de destaque, estruturas cenográficas,
                  elementos de grande escala, formas especiais e integrações com
                  iluminação, design e apoio estrutural para proporcionar
                  experiências únicas.
                </p>

                <p>
                  Do conceito ao pós-instalação, nossa operação 360º garante
                  viabilidade técnica, segurança e acabamento premium.
                </p>
              </div>

              {/* 2️⃣ Por que investir em projetos especiais? */}
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
                    Por que investir em projetos especiais?
                  </h2>
                </div>

                <p className="mb-3">
                  Projetos especiais são indicados quando a marca precisa ir além
                  do convencional e gerar experiências memoráveis.
                </p>

                <ul className="list-disc ml-5 space-y-1.5">
                  <li>Criam experiências imersivas com luz, LED e volumetria;</li>
                  <li>Reforçam posicionamento e inovação;</li>
                  <li>Aumentam engajamento e registro em fotos e vídeos;</li>
                  <li>Diferenciam a presença da marca em eventos e feiras.</li>
                </ul>

                <p className="mt-3">
                  Um projeto especial bem executado vira plataforma de
                  relacionamento e vendas.
                </p>
              </div>

              {/* 3️⃣ Por que escolher a M2 para projetos especiais? */}
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
                    Por que escolher a M2 para projetos especiais?
                  </h2>
                </div>

                <p className="mb-3">
                  A M2 une engenharia, design, produção gráfica e montagem em uma
                  única operação.
                </p>

                <ul className="list-disc ml-5 space-y-1.5">
                  <li>Criação e desenvolvimento técnico;</li>
                  <li>Integração com LED, iluminação e automação;</li>
                  <li>Projeto estrutural com foco em segurança;</li>
                  <li>Produção gráfica interna com controle de acabamento;</li>
                  <li>Operação nacional para grandes projetos;</li>
                  <li>
                    Acompanhamento total, do conceito ao pós-instalação.
                  </li>
                </ul>

                <p className="mt-3">
                  Com a M2, cada projeto especial se torna uma solução completa
                  de impacto.
                </p>
              </div>
            </div>
          </div>

          {/* IMAGEM À DIREITA */}
          <aside>
            <figure className="rounded-xl overflow-hidden bg-white shadow-sm">
              <img
                src={img2}
                alt="Projeto Especial"
                className="w-full h-[520px] object-cover"
              />
            </figure>
          </aside>
        </div>

        {/* FORMULÁRIO */}
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

        {/* GRID FINAL — TAGS (AGORA CLICÁVEIS) */}
        <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {tagImages.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setLightboxImg(src)}
              className="rounded-xl overflow-hidden bg-white shadow-sm cursor-pointer focus:outline-none"
              aria-label={`Abrir projeto especial ${i + 1} em tela cheia`}
            >
              <img
                src={src}
                alt={`Projeto Especial ${i + 1}`}
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
