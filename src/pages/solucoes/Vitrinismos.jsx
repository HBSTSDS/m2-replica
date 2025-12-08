// src/pages/solucoes/Vitrinismos.jsx
import headerImg from "../../assets/vitrinismos/header.png";
import img2 from "../../assets/vitrinismos/img-2.png";

export default function Vitrinismos() {
  return (
    <main className="bg-[#E7E9F2] text-[#4B4B48]">
      {/* HEADER */}
      <section className="w-full">
        <img
          src={headerImg}
          alt="Vitrinismos - header"
          className="w-full h-40 md:h-56 object-cover"
        />
      </section>

      {/* CONTEÚDO PRINCIPAL */}
      <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <div className="grid md:grid-cols-3 gap-10 md:gap-14 items-start">
          {/* COLUNA DE TEXTO */}
          <div className="md:col-span-2">
            {/* Barras coloridas do topo */}
            <div className="flex items-center mb-4">
              <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
              <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
              <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
              <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" />
            </div>

            {/* TÍTULO PRINCIPAL */}
            <h1 className="text-[28px] md:text-[36px] font-extrabold tracking-wide mb-6">
              VITRINISMOS
            </h1>

            <div className="space-y-10 leading-relaxed text-[16px] md:text-[17px]">
              {/* 1️⃣ O que é vitrinismo na M2? */}
              <div>
                <div className="relative mb-2">
                  {/* etiqueta rosa, fora do container */}
                  <span
                    className="
                      hidden md:block absolute right-full mr-5
                      top-1/2 -translate-y-1/2
                      h-5 w-24 bg-[#E5258C] rounded-r-md
                    "
                  />
                  <h2 className="font-bold text-[18px] md:text-[20px] leading-tight">
                    O que é vitrinismo na M2?
                  </h2>
                </div>

                <p className="mb-3">
                  Na M2, vitrinismo é a criação de vitrines que vendem:
                  conceito, layout, materiais e montagem pensados para traduzir
                  a linguagem da marca e chamar atenção de quem passa.
                </p>

                <p className="mb-3">
                  Concebemos vitrines que combinam linguagem de marca, fluxo da
                  loja e viabilidade de produção para máxima conversão, sempre
                  equilibrando impacto visual, custo e possibilidade de
                  replicação em redes.
                </p>

                <p>
                  Do projeto ao setup em campo, integramos impressão, corte,
                  displays, volumetria e iluminação, mantendo padronização em
                  redes nacionais e respeito ao calendário de lançamentos e
                  campanhas.
                </p>
              </div>

              {/* 2️⃣ Por que investir em vitrinismo? */}
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
                    Por que investir em vitrinismo?
                  </h2>
                </div>

                <p className="mb-3">
                  A vitrine é um dos principais pontos de contato da marca com
                  o consumidor.
                </p>

                <ul className="list-disc ml-5 space-y-1.5">
                  <li>
                    Atrai o olhar de quem passa, transformando fluxo em entrada
                    de loja;
                  </li>
                  <li>
                    Comunica campanhas, coleções e lançamentos de forma clara e
                    aspiracional;
                  </li>
                  <li>
                    Reflete o posicionamento da marca, reforçando estilo,
                    segmento e faixa de preço;
                  </li>
                  <li>
                    Organiza a exposição, destacando produtos-chave e guiando a
                    leitura;
                  </li>
                  <li>
                    Ajuda a converter mais, conectando mensagem, cenário e
                    mercadoria.
                  </li>
                </ul>

                <p className="mt-3">
                  Um bom vitrinismo vai além da “decoração”: ele é ferramenta de
                  venda e branding, pensada para trabalhar junto com mix de
                  produtos e estratégia comercial.
                </p>
              </div>

              {/* 3️⃣ Por que escolher a M2 para vitrinismo? */}
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
                    Por que escolher a M2 para vitrinismo?
                  </h2>
                </div>

                <p className="mb-3">
                  A M2 une criação, comunicação visual e operação em campo para
                  entregar vitrines com alto impacto visual e perfeita execução
                  técnica.
                </p>

                <ul className="list-disc ml-5 space-y-1.5">
                  <li>
                    Desenvolvimento de conceitos e roteiros de vitrines
                    alinhados à linguagem da marca e ao calendário do varejo;
                  </li>
                  <li>
                    Integração de impressão, recorte, displays, estruturas e
                    iluminação no mesmo projeto;
                  </li>
                  <li>
                    Padronização para redes nacionais, com kits pensados para
                    diferentes tamanhos e formatos de loja;
                  </li>
                  <li>
                    Operação 24/7 com controle de cor e acabamento premium para
                    lançamentos, coleções sazonais e ativações especiais;
                  </li>
                  <li>
                    Setup em campo, garantindo montagem correta, fidelidade ao
                    projeto e cumprimento de prazos.
                  </li>
                </ul>

                <p className="mt-3">
                  Com a M2, o vitrinismo passa a fazer parte de um ecossistema
                  completo de comunicação visual e PDV, ajudando sua marca a se
                  destacar na rua e a performar melhor dentro da loja.
                </p>
              </div>
            </div>
          </div>

          {/* IMAGEM DA DIREITA */}
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
              <input
                className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-sm mb-1 block">E-mail:</label>
              <input
                className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm mb-1 block">Whatsapp:</label>
              <input
                className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-sm mb-1 block">Empresa:</label>
              <input
                className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm mb-1 block">CNPJ:</label>
              <input
                className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-sm mb-1 block">Cargo:</label>
              <input
                className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm mb-1 block">Produto de Interesse:</label>
              <input
                className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm"
              />
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
