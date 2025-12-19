import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

// pega todas as PNGs da pasta Displays de forma “global”
const displayImages = import.meta.glob("../assets/Displays/*.png", {
  eager: true,
});

// helper pra resolver o caminho da imagem
function getImg(fileName) {
  const mod = displayImages[`../assets/Displays/${fileName}`];
  return mod?.default || "";
}

function Img({ src, alt, className = "" }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`block select-none ${className}`}
      draggable="false"
    />
  );
}

export default function Displays() {
  const introImg = getImg("intro.png");

  const items = useMemo(
    () => [
      {
        slug: "voila",
        title: "Voilá",
        file: "voila.png",
        desc:
          "Elegância e praticidade para comunicar com leveza e impacto: o Voilá é um display portátil de montagem rápida, ideal para eventos e pontos de venda, com visual limpo e área gráfica contínua. O diferencial está na facilidade de transporte e instalação, no acabamento mais premium e na troca simples de arte para campanhas diferentes.",
      },
      {
        slug: "displayauto",
        title: "Automático",
        file: "displaysauto.png",
        desc:
          "Abriu, montou, comunicou em segundos: o Automático é um display com estrutura autoexpansível, pensado para ações rápidas em eventos, lojas e ativações. Seu diferencial é a montagem ultrarrápida e a operação simples, reduzindo tempo de equipe e facilitando a repetição em várias praças.",
      },
      {
        slug: "displayevo",
        title: "Evolution",
        file: "displaysevo.png",
        desc:
          "Um display que evolui com a sua campanha: o Evolution é um sistema modular para montar diferentes formatos e composições de comunicação visual. O diferencial é a flexibilidade para reconfigurar tamanhos e layouts, reaproveitando a estrutura e trocando apenas os gráficos quando necessário.",
      },
      {
        slug: "displayflash",
        title: "Flash",
        file: "displaysflash.png",
        desc:
          "Impacto imediato para promoções e ativações: o Flash é um display leve e portátil, feito para destacar mensagens e ofertas em PDV e eventos. O diferencial é a praticidade de montar e desmontar, o bom custo-benefício e a agilidade para campanhas de curta duração.",
      },
      {
        slug: "displaypopup",
        title: "Pop Up",
        file: "displayspopup.png",
        desc:
          "Parede de impacto para fotos, marcas e grandes campanhas: o Pop Up é uma estrutura expansível que vira um painel de fundo (backdrop) para eventos, estandes e ações promocionais. O diferencial é a grande área de comunicação com montagem rápida, garantindo presença forte com logística simples.",
      },
      {
        slug: "displaysportico",
        title: "Pórtico",
        file: "displaysportico.png",
        desc:
          "A entrada que marca presença desde o primeiro passo: o Pórtico é uma estrutura em formato de arco ou portal usada para sinalizar entrada, percurso ou destaque em eventos e ativações. O diferencial é a alta visibilidade e o efeito cenográfico, ajudando a orientar o público e valorizar a experiência com a marca.",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const activeItem = items[active];
  const activeImg = getImg(activeItem.file);

  const renderTextBlock = (extraClasses = "") => (
    <div className={extraClasses}>
      <h3 className="text-xl font-medium text-gray-900 mb-2">
        DISPLAY {activeItem.title.toUpperCase()}
      </h3>
      <p className="text-gray-600 leading-relaxed">{activeItem.desc}</p>
      <Link
        to="/redbox"
        className="inline-block mt-4 text-gray-700 underline underline-offset-4 hover:no-underline"
      >
        ver detalhes &gt;&gt;
      </Link>
    </div>
  );

  return (
    <section className="w-full bg-[#E7E9F2] py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* INTRO */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl tracking-wide text-gray-700 mb-4">
              DISPLAYS
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Soluções versáteis para destacar marcas, mensagens e experiências
              em eventos, pontos de venda e ativações. Displays pensados para
              facilitar a montagem, otimizar logística e ampliar o impacto da
              comunicação visual em diferentes contextos.
            </p>
          </div>

          <div className="w-full max-w-[520px] mx-auto bg-[#E7E9F2] overflow-hidden rounded-lg">
            <Img
              src={introImg}
              alt="Displays - vitrine"
              className="w-full h-auto object-contain max-h-[220px] md:max-h-none"
            />
          </div>
        </div>

        <div className="my-10 h-px bg-black/5" />

        {/* LISTA + IMAGEM + TEXTO */}
        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-2
            lg:grid-cols-[220px_520px_1fr]
            gap-8
            items-start
          "
        >
          {/* COLUNA 1 – LISTA */}
          <div className="relative w-full md:w-[220px] col-span-1">
            <ul className="list-rail w-full select-none">
              {items.map((it, i) => (
                <li key={it.slug}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className="appearance-none bg-transparent p-0 m-0 cursor-pointer"
                  >
                    <span className="text-base leading-none">{it.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUNA 2 – IMAGEM + TEXTO (MOBILE/TABLET) */}
          <div className="col-span-1 space-y-4">
            <div className="w-full bg-[#E7E9F2] overflow-hidden rounded-lg">
              <Img
                key={activeItem.slug}
                src={activeImg}
                alt={`Display ${activeItem.title}`}
                className="w-full h-auto object-contain max-h-[220px] md:max-h-none opacity-0 animate-[fadeIn_250ms_ease-out_forwards]"
              />
            </div>

            {/* texto logo EMBAIXO da imagem no mobile */}
            <div className="block lg:hidden">{renderTextBlock("")}</div>
          </div>

          {/* TEXTO EM COLUNA SEPARADA NO DESKTOP */}
          <div className="hidden lg:block">{renderTextBlock("lg:pt-4")}</div>

          <style>{`@keyframes fadeIn { to { opacity: 1 } }`}</style>
        </div>
      </div>
    </section>
  );
}
