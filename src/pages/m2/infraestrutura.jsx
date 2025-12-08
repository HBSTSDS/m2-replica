import React from "react";
import WhatsAppButton from "../../components/WhatsAppButton";
import capaInfra from "../../assets/infra/capa_infra.png";

export default function Infraestrutura() {
  return (
    <section className="bg-[#E7E9F2] text-[#1E1E1E] font-inter">
      {/* Capa */}
      <div className="w-full overflow-hidden">
        <img
          src={capaInfra}
          alt="Infraestrutura M2"
          className="w-full object-cover"
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-10 py-14">

        {/* Barras coloridas */}
        <div className="flex items-center gap-2 mb-5">
          <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
          <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
          <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
          <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" />
        </div>

        {/* Título principal */}
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8">
          INFRAESTRUTURA
        </h1>

        {/* INFRAESTRUTURA */}
        <h2 className="text-lg font-semibold mb-3">INFRAESTRUTURA</h2>
        <p className="text-[16px] leading-7 max-w-[75ch] mb-6">
          Parques industriais para grandes operações em comunicação visual.
          A M2 reúne um dos maiores parques gráficos mais completos da América Latina,
          com estrutura industrial dimensionada para produção em grande volume,
          prazos agressivos e projetos de comunicação visual nas escalas mais variadas.
        </p>

        {/* PARQUE FABRIL E BASES OPERACIONAIS */}
        <h2 className="text-lg font-semibold mb-3">PARQUE FABRIL E BASES OPERACIONAIS</h2>

        <p className="text-[16px] leading-7 max-w-[75ch] mb-4">
          <strong>Sede RJ — Parque gráfico e logística</strong><br />
          Mais de 12.000 m² dedicados a impressão, movimentação de materiais e expedição,
          com fluxo preciso entre produção e setores técnicos como acabamento e inspeção.
        </p>

        <p className="text-[16px] leading-7 max-w-[75ch] mb-4">
          <strong>Galpão de Engenharia — RJ</strong><br />
          +5.000 m² de espaço para desenvolvimento e produção de estruturas, cenografia,
          soluções especiais e volumetrias, integrando serralheria, marcenaria e impressão 3D.
        </p>

        <p className="text-[16px] leading-7 max-w-[75ch] mb-4">
          <strong>Unidade SP — Interlagos</strong><br />
          Estrutura corporativa e operacional em plano de ampliação, preparada para absorver
          maior capacidade de produção e integração RJ+SP, garantindo logística, controle de
          prazos e atendimento especializado para contas corporativas.
        </p>

        <p className="text-[16px] leading-7 max-w-[75ch] mb-10">
          <strong>GO — Em implantação</strong><br />
          Unidade estratégica em desenvolvimento para ampliar operações em comunicação visual no
          Centro-Oeste e acelerar a operação de revendas parceiras.
        </p>

        {/* PARQUE DE IMPRESSÃO */}
        <h2 className="text-lg font-semibold mb-3">PARQUE DE IMPRESSÃO</h2>

        <p className="text-[16px] leading-7 max-w-[75ch] mb-4">
          <strong>Impressão UV</strong><br />
          Equipamentos UV de grande porte, como EFI VUTEk h5, Q5r, H5+, e Docan — permitem trabalhar
          com rígidos e flexíveis, layers, alto volume, cores fiéis e tecnologia LED que reduz
          consumo energético. As máquinas garantem agilidade e escala produtiva.
        </p>

        <p className="text-[16px] leading-7 max-w-[75ch] mb-4">
          <strong>Sublimação</strong><br />
          Equipamentos industriais como FabriVU 340i+ e Monti 901, com processos dedicados para
          tecido, eventos, bandeiras, soft signage e peças de grande formato — incluindo corte,
          costura e acabamento.
        </p>

        <p className="text-[16px] leading-7 max-w-[75ch] mb-4">
          <strong>Eco-solvente</strong><br />
          Linha Roland/Mimaki para vinis, adesivos especiais e aplicações técnicas.
        </p>

        <p className="text-[16px] leading-7 max-w-[75ch] mb-10">
          <strong>Fresa e router</strong><br />
          Fresas industriais garantem flexibilidade para vinis, lonas, adesivos e aplicações
          estruturais — com precisão e durabilidade no acabamento para produção de maior robustez.
        </p>

        {/* CORTE E ACABAMENTO */}
        <h2 className="text-lg font-semibold mb-3">CORTE, ACABAMENTO E ESTRUTURAÇÃO</h2>

        <p className="text-[16px] leading-7 max-w-[75ch] mb-10">
          A M2 possui infraestrutura robusta para corte CNC, plotters de recorte, máquinas de dobra
          e serralheria leve — agregando precisão técnica ao acabamento. Esse conjunto permite a
          produção de peças personalizadas, volumetrias e estruturas para ativações, com escalas
          pequenas, médias e grandes.
        </p>

        {/* SUSTENTABILIDADE */}
        <h2 className="text-lg font-semibold mb-3">SUSTENTABILIDADE INTEGRADA À OPERAÇÃO</h2>

        <p className="text-[16px] leading-7 max-w-[75ch]">
          O uso de tecnologia UV/LED reduz emissão de compostos orgânicos voláteis (VOCs) e elimina
          descarte de lâmpadas de vapor de mercúrio. A operação sustentável reflete em menor impacto
          ambiental, sem abrir mão de alta performance e responsabilidade industrial.
        </p>
      </div>

      <WhatsAppButton />
    </section>
  );
}
