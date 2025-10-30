// src/sections/HeroVideo.jsx
import React from "react";

export default function HeroVideo() {
  return (
    <section className="relative w-full h-[calc(100vh-var(--nav-h,80px))] overflow-hidden bg-gray-200 flex items-center justify-center">
      {/* Placeholder do vídeo */}
      <div className="absolute inset-0 flex items-center justify-center bg-[#E5E5E5]">
        <span className="text-[#1C1C1C] text-lg font-medium">
          
        </span>
      </div>

      {/* Overlay de leve para simular o vídeo */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Botão play centralizado */}
      <button
        aria-label="play"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white/90 backdrop-blur hover:bg-white transition"
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </section>
  );
}
