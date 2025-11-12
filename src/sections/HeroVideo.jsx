// src/sections/HeroVideo.jsx
import React, { useRef, useState, useEffect } from "react";

export default function HeroVideo() {
  const iframeRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // função de controle do YouTube via API postMessage
  const togglePlay = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const command = isPlaying ? "pauseVideo" : "playVideo";
    iframe.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: command,
        args: [],
      }),
      "*"
    );
    setIsPlaying(!isPlaying);
  };

  // inicializa o player com autoplay, loop e sem controles
  const YT_URL =
    "https://www.youtube.com/embed/RMFKv2lZ8f0?autoplay=1&mute=1&playsinline=1&loop=1&controls=0&playlist=RMFKv2lZ8f0&modestbranding=1&rel=0";

  useEffect(() => {
    // pausa o vídeo automaticamente se sair da tela (melhora performance)
    const handleVisibilityChange = () => {
      if (document.hidden && isPlaying) togglePlay();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isPlaying]);

  return (
    <section className="herovideo relative w-full h-[700px] md:h-[700px] sm:h-[280px] overflow-hidden bg-black flex items-center justify-center">
      {/* Vídeo do YouTube embedado */}
      <iframe
        ref={iframeRef}
        src={YT_URL}
        title="Vídeo institucional M2"
        frameBorder="0"
        allow="autoplay; fullscreen"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay sutil */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      
    </section>
  );
}
