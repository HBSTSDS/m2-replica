import React, { useEffect, useMemo, useRef, useState } from "react";

/* Miniatura circular com fallback */
function Thumb({ src, alt = "", active = false, onClick, size = 96 }) {
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleError = () => {
    const order = [".png", ".jpg", ".jpeg", ".webp"];
    const cur = currentSrc.toLowerCase();
    const idx = order.findIndex((e) => cur.endsWith(e));
    if (idx >= 0 && idx < order.length - 1) {
      setCurrentSrc(currentSrc.replace(order[idx], order[idx + 1]));
    } else {
      console.warn("Thumb não encontrada:", currentSrc);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative shrink-0 rounded-full overflow-hidden bg-white
                  transition-transform duration-200
                  ${active ? "ring-2 ring-gray-800 scale-[1.04]" : "hover:scale-105"}`}
      style={{ width: size, height: size }}
      aria-label={`Ver ${alt}`}
    >
      <img
        src={currentSrc}
        alt={alt}
        onError={handleError}
        className="w-full h-full object-cover block select-none"
        draggable="false"
      />
    </button>
  );
}

export default function Equipamentos() {
  const items = useMemo(
    () => [
      { src: "/Equipamentos/VUTEK_Q5R.png", title: "VUTEK Q5R" },
      { src: "/Equipamentos/MAQUINA-2.png", title: "MAQUINA 2" },
      { src: "/Equipamentos/MAQUINA-3.png", title: "MAQUINA 3" },
      { src: "/Equipamentos/MAQUINA-4.png", title: "MAQUINA 4" },
      { src: "/Equipamentos/MAQUINA-5.png", title: "MAQUINA 5" },
      { src: "/Equipamentos/MAQUINA-6.png", title: "MAQUINA 6" },
      { src: "/Equipamentos/MAQUINA-7.png", title: "MAQUINA 7" },
      { src: "/Equipamentos/MAQUINA-8.png", title: "MAQUINA 8" },
      { src: "/Equipamentos/MAQUINA-9.png", title: "MAQUINA 9" },
      { src: "/Equipamentos/MAQUINA-10.png", title: "MAQUINA 10" },
      { src: "/Equipamentos/MAQUINA-11.png", title: "MAQUINA 11" },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => setActive((i) => (i + 1) % items.length), 5000);
    return () => clearInterval(timer.current);
  }, [items.length]);

  const select = (idx) => {
    clearInterval(timer.current);
    setActive(idx);
    timer.current = setInterval(() => setActive((i) => (i + 1) % items.length), 5000);
  };

  return (
    <section className="w-full bg-[#EEF0F6] py-16 overflow-hidden relative">
      <style>{`
        .no-scrollbar::-webkit-scrollbar{display:none}
        .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
      `}</style>

      {/* Container centralizado */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl tracking-wide text-gray-700 mb-6">EQUIPAMENTOS</h2>
      </div>

      {/* IMAGEM FULL-BLEED */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <img
          src={items[active].src}
          alt={items[active].title}
          onError={(e) => {
            const order = [".png", ".jpg", ".jpeg", ".webp"];
            const cur = e.currentTarget.src.toLowerCase();
            const idx = order.findIndex((x) => cur.endsWith(x));
            if (idx >= 0 && idx < order.length - 1) {
              e.currentTarget.src = e.currentTarget.src.replace(order[idx], order[idx + 1]);
            }
          }}
          className="block w-full h-[55vh] min-h-[360px] object-cover select-none"
          draggable="false"
        />
      </div>

      {/* Texto e thumbs (dentro do container normal) */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-medium text-gray-900">
            {items[active].title}
          </h3>
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

        {/* Miniaturas */}
        <div className="mt-8 overflow-x-auto no-scrollbar">
          <div className="w-max mx-auto flex flex-nowrap gap-4 md:gap-5 pb-1">
            {items.map((it, i) => (
              <Thumb
                key={i}
                src={it.src}
                alt={it.title}
                active={i === active}
                onClick={() => select(i)}
                size={84}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
