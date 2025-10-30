import React from "react";
import WhatsAppButton from "../../components/WhatsAppButton";
import capaInfra from "../../assets/infra/capa_infra.png"; // ✅ novo caminho correto

export default function Infraestrutura() {
  return (
    <section className="bg-[#F3F4F6] text-[#1E1E1E] font-inter">
      {/* Capa */}
      <div className="w-full overflow-hidden">
        <img
          src={capaInfra}
          alt="Parque Gráfico M2 - Infraestrutura"
          className="w-full object-cover"
          onError={(e) => (e.currentTarget.src = capaInfra)}
        />
      </div>

      {/* Conteúdo */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-14">
        <div className="flex items-center mb-4">
          <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
          <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
          <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
          <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" />
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">
          INFRAESTRUTURA
        </h1>

        {/* IMPRESSÃO UV */}
        <section className="mb-10">
          <h2 className="text-base md:text-lg font-semibold mb-3">IMPRESSÃO UV</h2>
          <ul className="list-disc pl-5 space-y-1 text-[15px] leading-relaxed">
            <li>EFI VUTEk <strong>Q5r</strong></li>
            <li>EFI VUTEk <strong>H5</strong></li>
            <li>Docan <strong>FR3200</strong></li>
            <li>Docan <strong>H3000</strong> (mesa & rolo)</li>
            <li>Ploter UV de mesa (fresa)</li>
          </ul>
        </section>

        {/* SUBLIMAÇÃO */}
        <section className="mb-10">
          <h2 className="text-base md:text-lg font-semibold mb-3">SUBLIMAÇÃO</h2>
          <ul className="list-disc pl-5 space-y-1 text-[15px] leading-relaxed">
            <li>Monti <strong>mod. 901</strong> (calandra)</li>
            <li>Impressoras de alta produção para tecido</li>
          </ul>
        </section>

        {/* ECO-SOLVENTE */}
        <section className="mb-10">
          <h2 className="text-base md:text-lg font-semibold mb-3">ECO-SOLVENTE</h2>
          <ul className="list-disc pl-5 space-y-1 text-[15px] leading-relaxed">
            <li>Roland / Mimaki para vinil e adesivos especiais</li>
            <li>Acabamento com laminação fria e quente</li>
          </ul>
        </section>

        {/* CORTE, DOBRA E ROUTERS */}
        <section className="mb-4">
          <h2 className="text-base md:text-lg font-semibold mb-3">CORTE, DOBRA E ROUTERS</h2>
          <ul className="list-disc pl-5 space-y-1 text-[15px] leading-relaxed">
            <li>Router CNC <strong>3x2m</strong> (fresa)</li>
            <li>Router CNC <strong>2,5x1,6m</strong></li>
            <li>Plotters de recorte (vinil)</li>
            <li>Dobra em acrílico e metal</li>
          </ul>
        </section>
      </div>

      <WhatsAppButton />
    </section>
  );
}
