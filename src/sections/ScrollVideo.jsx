// src/sections/ScrollVideo.jsx
import React, { useEffect, useRef, useState } from "react";

/** CONFIGURAÇÕES */
const BG_COLOR = "#000";

/**
 * Recalibrado para 7 segundos:
 * Antes: 644 frames * 14px = ~9000px
 * Agora: 410 frames * 14px = ~5740px
 */
const VIRTUAL_FRAMES = 410;
const PX_PER_FRAME = 14;
const SCROLL_SPAN_PX = VIRTUAL_FRAMES * PX_PER_FRAME;

export default function ScrollVideo() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const videoRef = useRef(null);

  const progressRef = useRef(0);
  const isActiveRef = useRef(false);

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 768px)").matches;
  });

  const [sectionH, setSectionH] = useState(() => {
    if (typeof window === "undefined") return 0;
    return window.innerHeight + SCROLL_SPAN_PX;
  });

  // Detecta mobile dinamicamente
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const fn = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  // Resize do desktop
  useEffect(() => {
    if (isMobile || typeof window === "undefined") return;

    function resize() {
      setSectionH(window.innerHeight + SCROLL_SPAN_PX);
    }

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [isMobile]);

  // Lógica principal do scroll → progresso 0 → 1
  useEffect(() => {
    if (isMobile) return;

    const el = sectionRef.current;
    const pin = pinRef.current;
    if (!el || !pin) return;

    el.style.height = `${sectionH}px`;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const start = window.scrollY + rect.top;
      const end = start + sectionH - window.innerHeight;
      const y = window.scrollY;
      const viewportH = window.innerHeight;

      // pinning
      if (y < start) {
        pin.style.position = "absolute";
        pin.style.top = "0";
      } else if (y <= end) {
        pin.style.position = "fixed";
        pin.style.top = "0";
      } else {
        pin.style.position = "absolute";
        pin.style.top = "auto";
        pin.style.bottom = "0";
      }

      const span = sectionH - window.innerHeight;
      const clamped = Math.min(Math.max(y - start, 0), span);
      const t = span > 0 ? clamped / span : 0;

      progressRef.current = t;

      // Ativação da área
      isActiveRef.current =
        y + viewportH > start - viewportH && y < end + viewportH;
    };

    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => document.removeEventListener("scroll", onScroll);
  }, [sectionH, isMobile]);

  // Loop de suavização do vídeo
  useEffect(() => {
    if (isMobile) return;
    let frameId;

    const tick = () => {
      const video = videoRef.current;

      if (!isActiveRef.current || !video) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      if (video.readyState >= 2 && video.duration) {
        const duration = video.duration; // agora é 7s
        const targetTime = progressRef.current * duration;
        const current = video.currentTime;
        const diff = targetTime - current;

        if (Math.abs(diff) > 0.005) {
          video.currentTime = current + diff * 0.15;
        }
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isMobile]);

  // base path pra /HB
  const base =
    typeof import.meta !== "undefined" &&
    import.meta.env.BASE_URL &&
    import.meta.env.BASE_URL !== "./"
      ? import.meta.env.BASE_URL.replace(/\/+$/, "")
      : "";

  // ---------------- MOBILE ----------------
  if (isMobile) {
    return (
      <section className="w-full bg-[#F6F7FB] py-10 px-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-6 pt-5 pb-3">
            <h2 className="text-lg font-semibold text-[#1C1C1C]">
              Um tour pela nossa fabrica?
            </h2>
          </div>

          <div className="relative w-full pb-[56.25%]">
            <iframe
              src="https://www.youtube.com/embed/wRMdHROUmRM?rel=0&modestbranding=1&playsinline=1"
              title="Um tour pela nossa fabrica"
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    );
  }

  // ---------------- DESKTOP ----------------
  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: BG_COLOR,
        overflow: "visible",
        isolation: "isolate",
      }}
    >
      <div
        ref={pinRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          background: BG_COLOR,
        }}
      >
        <video
          ref={videoRef}
          src={`${base}/videos/site.mp4`}
          playsInline
          preload="metadata"
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    </section>
  );
}
