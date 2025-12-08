// src/sections/Cases_.jsx
import case1 from "../assets/cases/case-img-1.jpg";
import case2 from "../assets/cases/case-img-2.jpg";
import case3 from "../assets/cases/case-img-3.jpg";
import case4 from "../assets/cases/case-img-4.jpg";
import case5 from "../assets/cases/case-img-5.jpg";
import case6 from "../assets/cases/case-img-6.jpg";
import case7 from "../assets/cases/case-img-7.jpg";

export default function Cases() {
  const images = [
    { src: case1, alt: "Case 1 (Skeelo)" },
    { src: case2, alt: "Case 2 (Arpoador)" },
    { src: case4, alt: "Case 4 (Capitão América)", className: "row-span-2" },
    { src: case5, alt: "Case 5 (São João)" },
    { src: case3, alt: "Case 3 (Rock in Rio)", className: "col-span-2 row-span-2" },
    { src: case6, alt: "Case 6 (Round 6)" },
    { src: case7, alt: "Case 7 (New Balance)", className: "col-span-2" },
  ];

  return (
    <section className="bg-[#EEF0F6] py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-[#4B4B48] text-3xl md:text-[32px] font-semibold tracking-tight mb-6">
          CASES
        </h2>

        {/* GRID ORIGINAL — só adaptando altura no mobile */}
        <div className="
          grid grid-cols-4 gap-5
          auto-rows-[160px]        /* mobile (reduzido) */
          md:auto-rows-[260px]     /* desktop (original) */
        ">
          {images.map(({ src, alt, className = "" }, i) => (
            <CardImage key={i} src={src} alt={alt} className={className} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CardImage({ src, alt, className = "" }) {
  return (
    <div className={`overflow-hidden rounded-[18px] bg-[#D9D9D9] ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03]"
        loading="lazy"
      />
    </div>
  );
}
