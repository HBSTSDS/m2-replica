// src/pages/QuemSomos.jsx
import { useEffect } from "react";
import WhatsAppButton from "../../components/WhatsAppButton";

// ✅ importa todas as imagens do assets
import imgPrincipal from "../../assets/quemSomos/IMG_PRINCIPAL.png";
import redbox from "../../assets/quemSomos/REDBOX.png";
import efi from "../../assets/quemSomos/EFI.png";
import serilon from "../../assets/quemSomos/SERILON.png";

export default function QuemSomos() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="bg-[#EFF1F4]">
  {/* hero */}
  <div className="w-full">
    <img
      src={imgPrincipal}
      alt="Fachada M2"
      className="w-full h-44 md:h-60 object-cover"
    />
  </div>


      {/* conteúdo */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-14">
        {/* barras coloridas */}
        <div className="flex items-center mb-4">
          <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
          <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
          <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
          <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" />
        </div>

        {/* título */}
        <h1 className="text-[36px] md:text-[44px] font-extrabold leading-[1.05] tracking-tight text-[#2B2B2B]">
          <span className="block">QUEM</span>
          <span className="block">SOMOS</span>
        </h1>

        {/* texto principal */}
        <div className="mt-8 text-[16px] md:text-[17px] leading-7 max-w-[70ch] space-y-6 text-[#2B2B2B]">
          <p>
            Com 18 anos de trajetória e sede no Rio de Janeiro, a M2 consolidou-se como uma das principais empresas de comunicação visual do Brasil, reconhecida pela capacidade de integrar tecnologia, inovação e sustentabilidade em soluções completas para grandes marcas.
          </p>
          <p>
            Contamos com uma equipe de mais de 300 profissionais especializados, comprometidos em entregar resultados de excelência e alto padrão de qualidade em cada projeto.
          </p>
          <p>
            Somos o maior parque gráfico UV da América Latina, com tecnologia de ponta, infraestrutura moderna e capacidade produtiva 24/7 para atender projetos de todos os portes em todo o território nacional. Pioneira em impressão ecologicamente correta, a M2 alia eficiência produtiva e responsabilidade ambiental, investindo continuamente em inovação e processos sustentáveis.
          </p>
          <p>
            Nosso HUB 360º representa a integração total entre estratégia, design e produção, conectando todas as etapas — da pré-impressão à instalação — em um ecossistema criativo que entrega soluções completas, personalizadas e de alta performance.
          </p>
          <p>
            Em 2025, a M2 inicia uma nova fase de expansão nacional, com a abertura de escritório e unidade de produção em São Paulo, além da implantação de uma nova operação em Goiânia. Essa ampliação reforça nosso compromisso em estar mais próximos dos clientes, ampliando a capacidade produtiva e o alcance de nossas soluções em todo o Brasil.
          </p>
        </div>

        {/* seção de confiança e logos */}
        <h2 className="mt-14 text-[20px] md:text-[22px] font-extrabold tracking-[0.18em] text-[#2B2B2B]">
          CONFIANÇA DE MERCADO
        </h2>

        <div className="mt-5 text-[16px] md:text-[17px] leading-7 max-w-[62ch] space-y-5">
          <p>
            Com padrão internacional de qualidade comprovado, a M2 é homologada por algumas das maiores empresas dos setores de licenciamento, mídia e comunicação do mundo.
          </p>
          <p>
            Nosso compromisso com a excelência, o cumprimento de prazos e a qualidade superior nos tornou parceiros estratégicos de grandes marcas, que confiam na M2 para o desenvolvimento de projetos de alta visibilidade e impacto nacional.
          </p>
          <p>
            Acreditamos que confiança se constrói com resultado, por isso investimos continuamente em tecnologia, capacitação e inovação, assegurando padrões de desempenho que fortalecem parcerias duradouras e relações de credibilidade no mercado.
          </p>
        </div>

        {/* logos */}
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <img src={redbox} alt="Redbox" className="h-10 w-auto" />
          <img src={efi} alt="EFI" className="h-10 w-auto" />
          <img src={serilon} alt="Serilon" className="h-10 w-auto" />
        </div>

        {/* seção produtiva */}
        <h2 className="mt-16 text-[20px] md:text-[22px] font-extrabold tracking-[0.18em] text-[#2B2B2B]">
          POTÊNCIA PRODUTIVA 24/7
        </h2>

        <div className="mt-5 text-[16px] md:text-[17px] leading-7 max-w-[68ch] space-y-4">
          <p>
            A M2 opera 24 horas por dia, 7 dias por semana, com capacidade e estrutura para atender grandes demandas produtivas com qualidade, precisão e agilidade.
          </p>
          <p>
            Com tecnologia de ponta e processos integrados, garantimos alta performance operacional em todas as etapas da produção.
          </p>

          <div className="pl-6">
            <p className="font-semibold mb-1">Capacidade de produção diária:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Rígidos: até 36.000 m²/dia</li>
              <li>Flexíveis: até 32.400 m²/dia</li>
              <li>Sublimação: até 21.600 m²/dia</li>
            </ul>
          </div>

          <p>
            Nossa equipe técnica, composta por mais de 320 colaboradores altamente capacitados, atua com excelência e comprometimento, assegurando padrões de qualidade internacional e entregas contínuas em escala industrial.
          </p>
        </div>
      </section>

      <WhatsAppButton />
    </div>
  );
}
