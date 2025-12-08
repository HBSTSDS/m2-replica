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
          {/* COLUNA DE TEXTO */}
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
              EVENTOS
            </h1>

            <div className="space-y-10 leading-relaxed text-[16px] md:text-[17px]">

              {/* 1️⃣ O que a M2 faz em eventos? */}
              <div>
                <div className="relative mb-2">
                  {/* etiqueta rosa */}
                  <span
                    className="
                      hidden md:block absolute right-full mr-5
                      top-1/2 -translate-y-1/2
                      h-5 w-24 bg-[#E5258C] rounded-r-md
                    "
                  />
                  <h2 className="font-bold text-[18px] md:text-[20px] leading-tight">
                    O que a M2 faz em eventos?
                  </h2>
                </div>

                <div className="space-y-3">
                  <p>
                    A M2 estrutura a <b>comunicação visual completa para feiras, congressos, festivais e ativações de marca</b>, integrando cenografia, sinalização e materiais promocionais em uma solução única.
                  </p>

                  <p>
                    Estruturamos a comunicação visual do evento como um todo: <b>entrada, acessos, fluxos, áreas de marca, pontos de ativação, palcos, vips, camarotes, backstage</b> e áreas técnicas.
                  </p>

                  <p>
                    Da criação ao campo, nossa <b>operação 24/7</b> garante montagem ágil, acabamento premium e consistência de cores em grandes formatos, mesmo em cronogramas apertados e projetos complexos.
                  </p>

                  <p>
                    A M2 assina a comunicação visual de grandes eventos e festivais, como <b>Rock in Rio, The Town, Lollapalooza, Fórmula 1, Fórmula E</b>, além de diversas feiras e ativações pelo Brasil.
                  </p>
                </div>
              </div>

              {/* 2️⃣ Por que investir em comunicação visual para eventos? */}
              <div>
                <div className="relative mb-2">
                  {/* etiqueta amarela */}
                  <span
                    className="
                      hidden md:block absolute right-full mr-5
                      top-1/2 -translate-y-1/2
                      h-5 w-24 bg-[#FFD400] rounded-r-md
                    "
                  />
                  <h2 className="font-bold text-[18px] md:text-[20px] leading-tight">
                    Por que investir em comunicação visual para eventos?
                  </h2>
                </div>

                <div className="space-y-3">
                  <p>
                    Em eventos, a comunicação visual é o que <b>organiza, orienta e dá cara à experiência</b>.
                  </p>

                  <p>
                    <b>Constrói a identidade do evento</b> em todos os pontos de contato (entrada, palcos, ativações, circulação);
                  </p>

                  <p>
                    <b>Orienta o público</b>, com sinalização clara de acessos, setores, serviços, banheiros, saídas e áreas especiais;
                  </p>

                  <p>
                    <b>Valoriza patrocinadores e marcas</b>, com espaços bem resolvidos de exposição e ativação;
                  </p>

                  <p>
                    <b>Cria cenários instagramáveis</b>, que geram conteúdo orgânico e ampliam o alcance nas redes sociais;
                  </p>

                  <p>
                    <b>Conecta logística e experiência</b>, ajudando na fluidez de público e operação.
                  </p>

                  <p>
                    Uma boa comunicação visual em eventos transforma a experiência de marca, reforçando posicionamento e percepção de qualidade.
                  </p>
                </div>
              </div>

              {/* 3️⃣ Por que escolher a M2 para eventos? */}
              <div>
                <div className="relative mb-2">
                  {/* etiqueta azul */}
                  <span
                    className="
                      hidden md:block absolute right-full mr-5
                      top-1/2 -translate-y-1/2
                      h-5 w-24 bg-[#00B8F1] rounded-r-md
                    "
                  />
                  <h2 className="font-bold text-[18px] md:text-[20px] leading-tight">
                    Por que escolher a M2 para eventos?
                  </h2>
                </div>

                <div className="space-y-3">
                  <p>
                    A M2 reúne <b>design, engenharia, indústria gráfica, cenografia e montagem</b> em uma operação totalmente integrada para eventos de todos os portes.
                  </p>

                  <p>
                    Estruturamos a comunicação visual completa para <b>feiras, congressos e ativações</b>, integrando cenografia, sinalização e materiais promocionais com o mesmo padrão de qualidade em todas as frentes.
                  </p>

                  <p>
                    <b>Operação 24/7</b>, preparada para janelas curtas de montagem e desmontagem;
                  </p>

                  <p>
                    <b>Grandes formatos</b> com consistência de cor, mesmo em volumes altos e múltiplos pontos;
                  </p>

                  <p>
                    <b>Equipe especializada em campo</b>, acostumada a trabalhar em eventos de grande porte e alta complexidade;
                  </p>

                  <p>
                    <b>Logística otimizada e atuação em todo o Brasil</b>, com gerenciamento de prazos e entregas;
                  </p>

                  <p>
                    Integração de <b>painéis, estruturas, revestimentos, totens, sinalização, PDV e ativações de marca</b> em um único fornecedor.
                  </p>

                  <p>
                    Atendemos projetos em todo o Brasil com logística estruturada, prazos competitivos e foco em acabamento premium, para que o evento aconteça com a força visual que <b>sua marca merece</b>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* IMAGEM DIREITA */}
          <aside>
            <figure className="rounded-xl overflow-hidden bg-white shadow-sm">
              <img
                src={img2}
                alt="Projeto de comunicação visual para eventos"
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
              <label className="text-sm mb-1 block">Produto de Interesse:</label>
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
                Eu dou consentimento para processar meus dados pessoais e para futuras comunicações de marketing.
              </label>

              <button className="self-start px-6 py-2 rounded-full text-sm font-semibold bg-[#E5258C] text-white">
                enviar
              </button>
            </div>
          </form>
        </div>

        {/* GRID FINAL */}
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
