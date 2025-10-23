export default function HeroVideo() {
  return (
    // define a altura do hero usando a variável da navbar
    <section className="relative w-full h-[calc(100vh-var(--nav-h,80px))] overflow-hidden">
      {/* VÍDEO ou PÔSTER cobrindo tudo */}
      {/* Se ainda não tiver o MP4, deixe só o poster por enquanto */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        poster="/comunicacaoVisual/header.png"
      />

      {/* OVERLAY suave (opcional) */}
      <div className="absolute inset-0 bg-black/20" />

      {/* CONTEÚDO/PLAY (opcional) */}
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
