export default function Cases() {
  return (
    <section className="bg-[#EEF0F6] py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-[#4B4B48] text-3xl md:text-[32px] font-semibold tracking-tight mb-6">
          CASES
        </h2>

        {/* AJUSTE FINAL:
            - grid-cols-4 e auto-rows-[260px] mantidos.
            - Itens dispostos na ordem para que o Grid preencha L1 e comece L2.
        */}
        <div className="grid grid-cols-4 gap-5 auto-rows-[260px]">
          
          {/* Linha 1: Os 4 cards que ocupam 1x1 ou mais. */}
          
          {/* Item 1: Case 1 (C1 L1) */}
          <CardImage src="/cases/case-img-1.jpg" alt="Case 1 (Skeelo)" /> 
          
          {/* Item 2: Case 2 (C2 L1) */}
          <CardImage src="/cases/case-img-2.jpg" alt="Case 2 (Arpoador)" /> 
          
          {/* Item 3: Capitão América/Hulk (C3 L1-L2) -> row-span-2 */}
          <CardImage
            src="/cases/case-img-4.jpg"
            alt="Case 4 (Capitão América)"
            className="row-span-2" // Cobre C3, L1 e L2
          /> 
          
          {/* Item 4: SAO JOAO (C4 L1) */}
          <CardImage src="/cases/case-img-5.jpg" alt="Case 5 (SAO JOAO)" /> 
          
          {/* Linha 2 (Começa aqui) */}
          
          {/* Item 5: Rock in Rio (C1-C2 L2-L3) -> col-span-2 row-span-2 */}
          <CardImage
            src="/cases/case-img-3.jpg"
            alt="Case 3 (Rock in Rio)"
            className="col-span-2 row-span-2" // Cobre C1-C2, L2 e L3
          /> 
          
          {/* Item 6: ROUND 6 (C4 L2) */}
          <CardImage src="/cases/case-img-6.jpg" alt="Case 6 (ROUND 6)" /> 
          
          {/* Linha 3 (Começa aqui) */}
          
          {/* Item 7: New Balance (C3-C4 L3) -> col-span-2 */}
          <CardImage 
            src="/cases/case-img-7.jpg" 
            alt="Case 7 (New Balance)" 
            className="col-span-2" // Cobre C3-C4, L3
          /> 
          
        </div>
      </div>
    </section>
  );
}

// O componente CardImage continua o mesmo.
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