import React, { useState, useEffect } from "react";

export default function HeroVideo() {
  const [loadVideo, setLoadVideo] = useState(false);
  const videoId = "RMFKv2lZ8f0";
  const YT_URL = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&loop=1&controls=0&playlist=${videoId}&modestbranding=1&rel=0`;
  
  const posterUrl = "/hero-poster.jpg";

  // Carrega o vídeo pesado apenas após o mount
  useEffect(() => {
    // Se for o robô de build (react-snap/puppeteer), carrega instantâneo para não dar timeout
    const isBot = window.navigator.userAgent.includes("Headless") || window.navigator.userAgent.includes("jsdom");
    const delay = isBot ? 100 : 8000;

    const timer = setTimeout(() => setLoadVideo(true), delay);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* HERO VIDEO SECTION */}
      <section className="herovideo relative w-full aspect-[16/9] md:aspect-auto md:h-[700px] overflow-hidden bg-black font-poppins">
        {/* IMAGEM DE POSTER (LCP) */}
        {!loadVideo && (
          <img
            src={posterUrl}
            alt="Fachada M2 Flex"
            fetchpriority="high"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            style={{ zIndex: 1 }}
          />
        )}

        {/* VÍDEO (CARREGA ATRASADO) */}
        {loadVideo && (
          <iframe
            src={YT_URL}
            title="Vídeo institucional M2"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 2 }}
          />
        )}

        {/* OVERLAY ESCURO */}
        <div className="absolute inset-0 bg-black/30 z-[10]" />

        {/* TEXTO DESKTOP */}
        <div className="hidden sm:block absolute z-[15] bottom-10 left-10 text-white max-w-[520px]">
          <h1 className="text-[26px] md:text-[32px] font-semibold mb-2 uppercase">
            SOBRE A M2
          </h1>
          <p className="text-[14px] md:text-[16px] leading-relaxed opacity-95">
            Mais que uma gráfica, somos o maior parque gráfico UV da América
            Latina. Operamos em escala industrial, com velocidade e consistência,
            para que marcas, agências e afiliados de todo o Brasil produzam do
            protótipo ao alto volume sem perder padrão.
          </p>
        </div>
      </section>


      {/* TEXTO MOBILE - FICA FORA DO VÍDEO */}
      <section className="block sm:hidden px-6 py-12 md:py-16 text-[#1C1C1C] font-poppins bg-white">
        <h2 className="text-[22px] font-semibold mb-2 uppercase">SOBRE A M2</h2>

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
