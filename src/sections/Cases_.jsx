import { useEffect, useState } from "react";
import case1 from "../assets/cases/case-img-1.png";
import case2 from "../assets/cases/case-img-2.png";
import case3 from "../assets/cases/case-img-3.png";
import case4 from "../assets/cases/case-img-4.png";
import case5 from "../assets/cases/case-img-5.png";
import case6 from "../assets/cases/case-img-6.png";
import case7 from "../assets/cases/case-img-7.png";

export default function Cases() {
  const [activeIndex, setActiveIndex] = useState(null);

  const images = [
    { src: case1, alt: "Case 1 (Skeelo)" },
    { src: case2, alt: "Case 2 (Arpoador)" },
    { src: case4, alt: "Case 4 (Capitão América)", className: "row-span-2" },
    { src: case5, alt: "Case 5 (São João)" },
    { src: case3, alt: "Case 3 (Rock in Rio)", className: "col-span-2 row-span-2" },
    { src: case6, alt: "Case 6 (Round 6)" },
    { src: case7, alt: "Case 7 (New Balance)", className: "col-span-2" },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev === null ? null : (prev + 1) % images.length));
  };

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev - 1 + images.length) % images.length
    );
  };

  // Fechar modal com ESC e navegar com setas
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    }
    if (activeIndex !== null) {
      window.addEventListener("keydown", handleKey);
    }
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex]);

  const activeImage = activeIndex !== null ? images[activeIndex] : null;

  return (
    <>
      <section className="bg-[#EEF0F6] py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-[#4B4B48] text-3xl md:text-[32px] font-semibold tracking-tight mb-6">
            CASES
          </h2>

          {/* GRID ORIGINAL */}
          <div
            className="
              grid grid-cols-4 gap-5
              auto-rows-[160px]
              md:auto-rows-[260px]
            "
          >
            {images.map(({ src, alt, className = "" }, i) => (
              <CardImage
                key={i}
                src={src}
                alt={alt}
                className={className}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* OVERLAY FULLSCREEN */}
      {activeImage && (
        <div
          className="
            fixed inset-0 z-[9999]
            bg-black/85
            flex items-center justify-center
            px-3 md:px-6
          "
          onClick={() => setActiveIndex(null)}
        >
          {/* Botão fechar */}
          <button
            className="
              absolute top-6 right-6
              text-white text-3xl font-light
              hover:opacity-70
              z-50
            "
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(null);
            }}
          >
            ✕
          </button>

          {/* Botão Anterior */}
          <button
            className="
              absolute left-2 md:left-8
              text-white text-4xl md:text-6xl font-thin
              hover:opacity-70
              z-50 p-4
            "
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
          >
            ‹
          </button>

          {/* Botão Próximo */}
          <button
            className="
              absolute right-2 md:right-8
              text-white text-4xl md:text-6xl font-thin
              hover:opacity-70
              z-50 p-4
            "
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
          >
            ›
          </button>

          <img
            // Key força remontagem para animação reiniciar ao trocar imagem
            key={activeIndex} 
            src={activeImage.src}
            alt={activeImage.alt}
            className="
              max-w-[85vw]
              max-h-[85vh]
              rounded-xl
              shadow-2xl
              scale-100
              md:scale-100
              transition-transform duration-300
              animate-[zoomIn_0.35s_ease-out]
            "
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

function CardImage({ src, alt, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        overflow-hidden rounded-[18px] bg-[#D9D9D9]
        cursor-pointer
        ${className}
      `}
    >
      <img
        src={src}
        alt={alt}
        className="
          w-full h-full object-cover
          transition-transform duration-300
          hover:scale-[1.05]
        "
        loading="lazy"
      />
    </div>
  );
}
