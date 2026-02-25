// src/sections/HeroVideo.jsx
import React from "react";

export default function HeroVideo() {
  const YT_URL =
    "https://www.youtube.com/embed/RMFKv2lZ8f0?autoplay=1&mute=1&playsinline=1&loop=1&controls=0&playlist=RMFKv2lZ8f0&modestbranding=1&rel=0";

  return (
    <>
      {/* HERO VIDEO */}
      <section className="herovideo relative w-full h-[700px] md:h-[700px] sm:h-[280px] overflow-hidden bg-black font-poppins">
        {/* VÍDEO */}
        <iframe
          src={YT_URL}
          title="Vídeo institucional M2"
          frameBorder="0"
          allow="autoplay; fullscreen"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OVERLAY ESCURO */}
        <div className="absolute inset-0 bg-black/30 z-[5]" />

        {/* TEXTO DESKTOP - FICA EM CIMA DO VÍDEO */}
        <div className="hidden sm:block absolute z-[10] bottom-10 left-10 text-white max-w-[520px]">
          <h3 className="text-[26px] md:text-[32px] font-semibold mb-2">
            SOBRE A M2
          </h3>

          <p className="text-[14px] md:text-[16px] leading-relaxed opacity-95">
            Mais que uma gráfica, somos o maior parque gráfico UV da América
            Latina. Operamos em escala industrial, com velocidade e consistência,
            para que marcas, agências e afiliados de todo o Brasil produzam do
            protótipo ao alto volume sem perder padrão.
          </p>
        </div>
      </section>

      {/* TEXTO MOBILE - FICA FORA DO VÍDEO */}
      <section className="block sm:hidden px-6 py-8 text-[#1C1C1C] font-poppins bg-white">
        <h3 className="text-[22px] font-semibold mb-2">SOBRE A M2</h3>

        <p className="text-[14px] leading-relaxed opacity-90">
          Mais que uma gráfica, somos o maior parque gráfico UV da América
          Latina. Operamos em escala industrial, com velocidade e consistência,
          para que marcas, agências e afiliados de todo o Brasil produzam do
          protótipo ao alto volume sem perder padrão.
        </p>
      </section>
    </>
  );
}
