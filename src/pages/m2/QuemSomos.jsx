// src/pages/QuemSomos.jsx
import { useEffect } from "react";
import imgPrincipal from "../../assets/quemSomos/IMG_PRINCIPAL.png";

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
        <h1 className="text-[32px] md:text-[44px] font-semibold text-black">
          Quem somos
        </h1>

        <div className="mt-4 text-[16px] md:text-[17px] leading-7 max-w-[62ch] space-y-5 text-[#2B2B2B]">
          <p>
            A M2 nasceu no Rio de Janeiro, há duas décadas, com uma gráfica
            pequena, mas disposta a ir além. À medida que as marcas, os projetos
            e a própria gestão evoluíram, ficou claro que havia uma única
            resposta para acompanhar esse movimento:{" "}
            <span className="font-semibold">tecnologia.</span>{" "}
            <em>Essa foi a nossa virada de chave.</em>
          </p>

          <p>
            A partir daí, investir em{" "}
            <span className="font-semibold">
              parque gráfico, processos e pessoas
            </span>{" "}
            deixou de ser opção e virou caminho natural. Saímos de uma operação
            enxuta para nos tornar um dos{" "}
            <span className="font-semibold">
              maiores parques gráficos UV da América Latina
            </span>
            , com uma estrutura que hoje roda praticamente{" "}
            <span className="font-semibold">24/7</span> e atende do rígido ao
            flexível, do protótipo à grande tiragem.
          </p>

          <p>
            Mais do que máquinas, o que nos define é a forma como olhamos para
            cada trabalho. Não vemos apenas uma placa, um adesivo ou um painel:
            vemos a{" "}
            <span className="font-semibold">responsabilidade</span> de traduzir a
            presença de uma marca no mundo físico, mantendo consistência,
            qualidade e agilidade em escala nacional.
          </p>

          <p>
            Nosso{" "}
            <span className="font-semibold">
              HUB integra criação, engenharia de produção, impressão, acabamento
              e logística
            </span>{" "}
            em um fluxo contínuo, pensado para que o cliente tenha um único
            parceiro do início ao fim.
          </p>

          <p>
            A história da M2 é, no fundo, a história das marcas que confiaram em
            colocar suas campanhas, ativações e pontos de venda em nossas mãos.
            Crescemos <span className="font-semibold">junto com elas</span> e
            seguimos evoluindo todos os dias, mantendo o mesmo espírito do
            começo:{" "}
            <span className="font-semibold">
              proximidade, transparência e a certeza de que comunicar bem
            </span>
            , no ponto de venda ou na rua, faz toda a diferença nos resultados.
          </p>
        </div>

       
      </section>
    </div>
  );
}
