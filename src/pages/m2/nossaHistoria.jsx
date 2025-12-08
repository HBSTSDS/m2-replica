import React from "react";
import WhatsAppButton from "../../components/WhatsAppButton";
import capaImg from "../../assets/nossaHistoria/capa.png";

export default function NossaHistoria() {
  return (
    <section className="bg-[#F3F4F6] text-[#1E1E1E] font-inter">
      {/* Capa */}
      <div className="w-full overflow-hidden">
        <img
          src={capaImg}
          alt="Capa - Nossa História M2"
          className="w-full object-cover"
          onError={(e) => (e.currentTarget.src = capaImg)}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-10 py-14">

        {/* Barras coloridas */}
        <div className="flex items-center  mb-4">
          <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
          <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
          <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
          <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" />
        </div>

        {/* TÍTULO IGUAL AO PRINT */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight">
          NOSSA HISTÓRIA
        </h2>

        {/* TEXTO DO PRINT */}
        <div className="space-y-5 text-[16px] md:text-[17px] leading-7 max-w-[75ch]">

          <p>
            A história da M2 atravessa décadas no caminho construído por Roberto
            Santos no mercado da comunicação visual. Década após década, ele atuou
            como empresário do segmento, marcando presença em revenda, agência,
            fábrica e escritório — absorvendo as necessidades reais do mercado e do
            produto.
          </p>

          <p>
            Em 2017, esse percurso ganhou um novo capítulo com a aquisição da{" "}
            <strong>M2 Flex</strong>, que abriu espaço para a consolidação e o
            crescimento constante do negócio ao logo dos anos seguintes. Assim, a
            M2 se tornou referência entre as empresas do Rio de Janeiro.
          </p>

          <p>
            A M2 alicerçou investimentos em gestão estratégica, tecnologia produtiva,
            processos e funcionamento integrado, o que permitiu que, entre 2019 e
            2022, a comunicação visual da empresa desse um salto de performance.
            Desde então, ampliou o parque produtivo de galpões para mais de 6.000 m²,
            somando máquinas próprias de corte, acabamento e impressão UV 360°.
          </p>

          <p>
            Em 2023, chegamos a São Paulo com base e escritório em Interlagos,
            posicionando a M2 ainda mais próxima do maior ecossistema do país e
            facilitando a mobilidade de atendimento e análises do mercado paulista.
            Em 2025, expandimos nossa planta para um parque produtivo ainda maior.
          </p>

          <p>
            A partir desse cenário, a operação passou a ganhar protagonismo em
            oficinas de acabamentos, com um time altamente técnico, técnicas
            exclusivas e qualidade inconfundível, somando máquinas com tecnologia
            EFI e profissionais com anos de prática e aperfeiçoamento
            contínuo. Essa soma tornou a operação cada vez mais competitiva e
            pronta para atender às demandas de grande volume, prazos agressivos e
            projetos complexos.
          </p>

          <p>
            Hoje, valorizamos parcerias entre Rio de Janeiro e São Paulo para oferecer
            entregas cada vez mais ágeis e assertivas. Essa união evoluiu para um
            padrão corporativo nacional, onde a M2 atua com inteligência logística,
            operação integrada e acompanhamento próximo a todos os clientes.
          </p>

          <p>
            A frente executiva atua em liderança focada em escala, eficiência e
            inovação.
          </p>

          {/* NOMES COMO NO PRINT */}
          <div className="space-y-3 pt-4">
            <p>
              <strong>Roberto Santos, CEO —</strong> conduz a estratégia desde 2017,
              com foco em investimentos, gestão operacional e visão de impacto.
            </p>

            <p>
              <strong>Luciano Furtado, Diretor Operacional —</strong> lidera a gestão
              produtiva, equipes técnicas e operação 360°.
            </p>

            <p>
              <strong>Flavio Esteves, Sócio Diretor Administrativo —</strong> estrutura
              a expansão do negócio, opera a integração entre unidades e atua na
              prospecção de novos mercados com foco em impulsionar licenciamento e
              crescimento.
            </p>
          </div>

          {/* CAIXINHAS DO PRINT */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 pt-6">
            <div className="border border-[#D1D5DB] rounded-lg px-3 py-2 bg-white text-center">
              <p className="font-bold text-xl">400+</p>
              <p className="text-xs text-gray-600">colaboradores</p>
            </div>

            <div className="border border-[#D1D5DB] rounded-lg px-3 py-2 bg-white text-center">
              <p className="font-bold text-xl">24/7</p>
              <p className="text-xs text-gray-600">operação contínua</p>
            </div>

            <div className="border border-[#D1D5DB] rounded-lg px-3 py-2 bg-white text-center">
              <p className="font-bold text-xl">#1</p>
              <p className="text-xs text-gray-600">UV na AL</p>
            </div>

            <div className="border border-[#D1D5DB] rounded-lg px-3 py-2 bg-white text-center">
              <p className="font-bold text-xl">RJ + SP</p>
              <p className="text-xs text-gray-600">presença nacional</p>
            </div>

            <div className="border border-[#D1D5DB] rounded-lg px-3 py-2 bg-white text-center">
              <p className="font-bold text-xl">+EFI</p>
              <p className="text-xs text-gray-600">tecnologia de ponta</p>
            </div>
          </div>

          {/* ÚLTIMO TEXTO DO PRINT */}
          <p className="pt-4">
            A M2 segue investindo em escala produtiva, tecnologia e expansão,
            garantindo inovação em todos os produtos. Sustentabilidade e visão 360°
            para cada nova necessidade do mercado.
          </p>
        </div>
      </div>

      <WhatsAppButton />
    </section>
  );
}
