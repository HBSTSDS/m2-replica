/* src/pages/nossaHistoria.jsx */
import React from "react";
import WhatsAppButton from "../../components/WhatsAppButton"; // <-- caminho corrigido

export default function NossaHistoria() {
  return (
    <section className="bg-[#F3F4F6] text-[#1E1E1E] font-inter">
      {/* Faixa de imagem de capa */}
      <div className="w-full overflow-hidden">
        <img
          src="/nossaHistoria/capa.png"
          alt="Capa - Nossa História M2"
          className="w-full object-cover"
        />
      </div>

      
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-14">
        {/* Conteúdo principal */}
        <div className="flex items-center mb-4">
                    <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
                    <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
                    <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
                    <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" /> {/* branco/cinza final */}
                </div>
        <h2 className="text-3xl md:text-4xl font-semibold mb-2 tracking-tight">
          NOSSA HISTÓRIA
        </h2>

        {/* Linha colorida abaixo do título */}
        

        <h3 className="text-lg font-semibold mb-3">EXPANSÃO</h3>

        <p className="mt-5 text-[16px] md:text-[17px] leading-7 max-w-[62ch] space-y-5">
          Em 2023, abrimos nossa unidade na capital de São Paulo, com escritório
          e produção em Interlagos.
        </p>

        <p className="mt-5 text-[16px] md:text-[17px] leading-7 max-w-[62ch] space-y-5">
          Esse passo marca um dos maiores movimentos de expansão do M2,
          consolidando nossa presença no maior polo econômico do país. A adição
          de integrantes estratégicos e infraestrutura permitiu que estivéssemos
          ainda mais próximos de nossos principais clientes e parceiros, com
          ampla capacidade de atender demandas de alta complexidade e escala.
        </p>

        <p className="mt-5 text-[16px] md:text-[17px] leading-7 max-w-[62ch] space-y-5">
          No Rio de Janeiro e São Paulo, atendemos nacionalmente.
          A integração entre unidades potencializa nossa atuação e fortalece
          nossa trajetória brilhante, garantindo agilidade, segurança e
          qualidade em cada entrega. Acreditamos que essa expansão é apenas o
          começo de uma nova etapa de fortalecimento da marca M2, sustentada por
          talento, relacionamento e compromisso com nossos parceiros e clientes.
        </p>
      </div>

     

      {/* Botão flutuante de WhatsApp */}
      <WhatsAppButton />
    </section>
  );
}
