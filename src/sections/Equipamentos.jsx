// src/sections/Equipamentos.jsx
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";

/* === IMPORTS das imagens === */
import VUTEK_Q5R  from "../assets/Equipamentos/VUTEK_Q5R.png";
import MAQUINA_2  from "../assets/Equipamentos/MAQUINA-2.png";
import MAQUINA_3  from "../assets/Equipamentos/MAQUINA-3.jpg";
import MAQUINA_4  from "../assets/Equipamentos/MAQUINA-4.jpg";
import MAQUINA_5  from "../assets/Equipamentos/MAQUINA-5.jpg";
import MAQUINA_6  from "../assets/Equipamentos/MAQUINA-6.png";
import MAQUINA_7  from "../assets/Equipamentos/MAQUINA-7.jpg";
import MAQUINA_8  from "../assets/Equipamentos/MAQUINA-8.jpg";
import MAQUINA_9  from "../assets/Equipamentos/MAQUINA-9.jpg";
import MAQUINA_10 from "../assets/Equipamentos/MAQUINA-10.jpg";
import MAQUINA_11 from "../assets/Equipamentos/MAQUINA-11.png";

/* Miniatura circular com nome abaixo */
function Thumb({ src, title, active = false, onClick, size = 92 }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={onClick}
        className={`relative shrink-0 rounded-full overflow-hidden bg-white transition-transform duration-200 ${
          active ? "ring-2 ring-gray-900 scale-[1.04]" : "hover:scale-105"
        }`}
        style={{ width: size, height: size }}
        aria-label={`Ver ${title}`}
      >
        <img
          src={src}
          alt={title}
          className="w-full h-full object-cover block select-none"
          draggable="false"
          loading="lazy"
        />
      </button>
      <p
        className={`text-[13px] md:text-[14px] font-medium text-center ${
          active ? "text-gray-900" : "text-gray-500"
        }`}
      >
        {title}
      </p>
    </div>
  );
}

export default function Equipamentos() {
  const items = useMemo(
    () => [
      { title: "VUTEK Q5R", src: VUTEK_Q5R },
      { title: "MAQUINA 2", src: MAQUINA_2 },
      { title: "MAQUINA 3", src: MAQUINA_3 },
      { title: "MAQUINA 4", src: MAQUINA_4 },
      { title: "MAQUINA 5", src: MAQUINA_5 },
      { title: "MAQUINA 6", src: MAQUINA_6 },
      { title: "MAQUINA 7", src: MAQUINA_7 },
      { title: "MAQUINA 8", src: MAQUINA_8 },
      { title: "MAQUINA 9", src: MAQUINA_9 },
      { title: "MAQUINA 10", src: MAQUINA_10 },
      { title: "MAQUINA 11", src: MAQUINA_11 },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const timer = useRef(null);

  const startAuto = useCallback(() => {
    clearInterval(timer.current);
    timer.current = setInterval(
      () => setActive((i) => (i + 1) % items.length),
      5000
    );
  }, [items.length]);

  useEffect(() => {
    startAuto();
    return () => clearInterval(timer.current);
  }, [startAuto]);

  const select = (idx) => {
    clearInterval(timer.current);
    setActive(idx);
    startAuto();
  };

  const go = (dir) => {
    clearInterval(timer.current);
    setActive((i) => (i + dir + items.length) % items.length);
    startAuto();
  };

  return (
    <section className="w-full bg-[#EEF0F6] py-16 overflow-hidden relative">
      <style>{`
        .no-scrollbar::-webkit-scrollbar{display:none}
        .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
      `}</style>

      {/* Cabeçalho */}
      <div className="max-w-7xl mx-auto px-4 text-[#1C1C1C]">
        <h2 className="text-2xl md:text-[28px] tracking-wide mb-6">EQUIPAMENTOS</h2>
      </div>

      {/* Imagem principal */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <div className="relative">
          <img
            src={items[active].src}
            alt={items[active].title}
            className="block w-full h-[55vh] min-h-[360px] object-cover select-none"
            draggable="false"
          />
          <button
            onClick={() => go(-1)}
            className="hidden absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-10 h-10 shadow flex items-center justify-center"
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            onClick={() => go(1)}
            className="hidden absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-10 h-10 shadow flex items-center justify-center"
            aria-label="Próximo"
          >
            ›
          </button>
        </div>
      </div>

      {/* Texto + Thumbs */}
      <div className="max-w-7xl mx-auto px-4 mt-6 text-[#1C1C1C]">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-medium">{items[active].title}</h3>
          <p className="mt-2 max-w-3xl mx-auto md:mx-0 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus
            pulvinar ut commodo amet. Imperdiet purus volutpat pharetra. Quis viverra leo.
            Lorem ipsum dolor sit amet.
          </p>
          <a
            href="#"
            className="inline-block mt-3 text-gray-700 underline underline-offset-4 hover:no-underline"
          >
            ver detalhes &gt;&gt;
          </a>
        </div>

        {/* Miniaturas com nomes */}
        <div className="mt-10 overflow-x-auto no-scrollbar">
          <div className="w-max mx-auto flex flex-nowrap gap-5 md:gap-6 pb-1">
            {items.map((it, i) => (
              <Thumb
                key={i}
                src={it.src}
                title={it.title}
                active={i === active}
                onClick={() => select(i)}
                size={86}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
