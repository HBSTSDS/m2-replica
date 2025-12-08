// src/pages/servicos/ProjetosEspeciais.jsx
import headerImg from "../../assets/projetosEspeciais/header.png";
import img2 from "../../assets/projetosEspeciais/img-2.png";

export default function ProjetosEspeciais() {
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
                  personalizadas que vão além do padrão da comunicação
                  visual do dia a dia.
                </p>

                <p className="mb-3">
                  Criamos ativações de destaque, estruturas cenográficas,
                  elementos de grande escala, formas especiais, integrações
                  com iluminação, design e apoio estrutural para proporcionar
                  experiências únicas.
                </p>

                <p className="mb-3">
                  Criamos ativações e estruturas personalizadas, integrando
                  arquitetura promocional, cenografia, iluminação, tecnologia
                  e montagem profissional para eventos, feiras, lançamentos,
                  projetos especiais e ações de marca em todo o Brasil.
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
                  Projetos especiais são indicados quando a marca precisa ir
                  além do convencional e gerar uma experiência memorável.
                </p>

                <p className="mb-3">
                  Dão protagonismo à marca em feiras, eventos e pontos estratégicos;
                </p>

                <ul className="list-disc ml-5 space-y-1.5">
                  <li>
                    Criam experiências imersivas, com uso de luz, LED, volumetria
                    e automação;
                  </li>
                  <li>
                    Reforçam posicionamento e inovação, traduzindo os valores da
                    marca no espaço físico;
                  </li>
                  <li>
                    Aumentam engajamento, estimulando proximidade, interação e
                    registro em fotos/vídeos;
                  </li>
                  <li>
                    Diferenciam a presença da marca em meio a vários expositores
                    e concorrentes.
                  </li>
                </ul>

                <p className="mt-3">
                  Mais do que “um stand ou estrutura”, um projeto especial bem pensado
                  vira plataforma de relacionamento, conteúdo e vendas.
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
                  A M2 reúne engenharia, design, produção gráfica e montagem em
                  uma mesma operação, garantindo que a ideia seja bela no papel
                  e viável na prática.
                </p>

                <ul className="list-disc ml-5 space-y-1.5">
                  <li>
                    Criação e desenvolvimento técnico de stands completos e
                    estruturas especiais;
                  </li>
                  <li>
                    Integração com LED, iluminação, tecnologia e automação;
                  </li>
                  <li>
                    Projeto estrutural de engenharia, com foco em segurança e
                    normas técnicas;
                  </li>
                  <li>
                    Produção interna de elementos gráficos e revestimentos, com
                    controle total de cor e acabamento;
                  </li>
                  <li>
                    Operação nacional, atendendo projetos de grande escala em
                    todo o Brasil;
                  </li>
                  <li>
                    Acompanhamento do conceito ao pós-instalação, com equipe
                    dedicada em cada etapa;
                  </li>
                  <li>
                    Atendimento focado em campanhas de varejo, garantindo
                    qualidade, padronização e cumprimento de prazos.
                  </li>
                </ul>

                <p className="mt-3">
                  Com a M2, um projeto especial deixa de ser apenas uma entrega –
                  e se torna uma solução completa que eleva a experiência e o
                  impacto que a sua marca precisa.
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
              <label className="text-sm mb-1 block">Produto de Interesse:</label>
              <input className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm" />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm mb-1 block">Mensagem:</label>
              <textarea rows={4} className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm resize-none" />
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
