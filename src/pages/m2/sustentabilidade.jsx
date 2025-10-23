import React from "react";
import WhatsAppButton from "../../components/WhatsAppButton"; // <-- caminho corrigido

export default function Sustentabilidade() {
  // fallback de formato da imagem
  const handleImgError = (e) => {
    const order = [".png", ".jpg", ".jpeg", ".webp"];
    const cur = e.currentTarget.src.toLowerCase();
    const idx = order.findIndex((x) => cur.endsWith(x));
    if (idx >= 0 && idx < order.length - 1) {
      e.currentTarget.src = e.currentTarget.src.replace(order[idx], order[idx + 1]);
    } else {
      console.warn("Imagem de capa não encontrada:", e.currentTarget.src);
    }
  };

  return (
    <section className="bg-[#F3F4F6] text-[#1E1E1E] font-inter">
      {/* Capa */}
      <div className="w-full overflow-hidden">
        <img
          src="/sustetabilidade/capa_sustentabilidade.png"
          alt="Equipe M2 trabalhando com materiais recicláveis"
          className="w-full object-cover"
          onError={handleImgError}
        />
      </div>

            {/* Conteúdo */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 flex flex-col md:flex-row items-start gap-10">
        <div>
          
        </div>
        {/* Texto à esquerda */}
        
        <div className="flex-1">
          
          <div className="flex items-center mb-4">
                    <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
                    <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
                    <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
                    <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" /> {/* branco/cinza final */}
                </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">
            SUSTENTABILIDADE
          </h1>
          <p className="text-[15px] leading-relaxed mb-6">
            Na M2, acreditamos que inovação e responsabilidade ambiental
            caminham juntas. Buscamos constantemente soluções que reduzam o
            impacto ambiental e promovam práticas sustentáveis em toda a nossa
            cadeia de produção.
          </p>

          <p className="text-[15px] leading-relaxed mb-6">
            Nosso compromisso com o futuro é real e está presente em cada
            decisão, investimento e parceria. Adotamos práticas reconhecidas em
            todo o setor gráfico, como:
          </p>

          <ul className="list-disc pl-5 space-y-1 text-[15px] leading-relaxed mb-6">
            <li>Uso responsável e otimizado de matérias-primas.</li>
            <li>Impressões UV e ecossolventes com menor emissão de gases.</li>
            <li>Reutilização e reciclagem de resíduos de produção.</li>
            <li>
              Certificações e parcerias com fornecedores que compartilham dos
              mesmos valores ambientais.
            </li>
          </ul>

          <p className="text-[15px] leading-relaxed">
            Desde 2020, recebemos reconhecimentos ambientais por nossas práticas
            sustentáveis, incluindo o selo <strong>Greenguard</strong> e a
            certificação <strong>Indoor Air Quality</strong>, reforçando nosso
            compromisso com o meio ambiente e a saúde das pessoas.
          </p>
        </div>

        {/* Imagens dos selos à direita */}
            <div
              className="
                flex-shrink-0 flex justify-center md:justify-end
                w-full md:w-[35%]
                md:self-center md:mt-8 lg:mt-12
              "
            >
              <img
                src="/sustetabilidade/selos_verdes.png"
                alt="Selos ambientais Greenguard e Indoor Air Quality"
                className="w-72 md:w-80"
                onError={(e) => {
                  const order = [".png", ".jpg", ".jpeg", ".webp"];
                  const cur = e.currentTarget.src.toLowerCase();
                  const idx = order.findIndex((x) => cur.endsWith(x));
                  if (idx >= 0 && idx < order.length - 1) {
                    e.currentTarget.src = e.currentTarget.src.replace(order[idx], order[idx + 1]);
                  }
                }}
              />
</div>

      </div>


      {/* Botão flutuante */}
      <WhatsAppButton />
    </section>
  );
}
