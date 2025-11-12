import React, { useEffect, useRef, useState, useCallback } from "react";

/** CONFIG */
const TOTAL_FRAMES = 644;     // ajuste para a sua quantidade real (ex.: 403 ou 644)
const PAD = 3;                // seus arquivos estão como video_001.jpg (3 dígitos)
const PX_PER_FRAME = 14;      // quanto “comprimento” de scroll por frame
const BG_COLOR = "#000";

/** Monta URL respeitando /HB quando houver */
function frameUrl(quality, i) {
  const num = String(i).padStart(PAD, "0");
  const base =
    import.meta.env.BASE_URL && import.meta.env.BASE_URL !== "./"
      ? import.meta.env.BASE_URL.replace(/\/+$/, "")
      : "";
  return `${base}/frames${quality}/video_${num}.webp`; // sem framesA/B
}

/** 1080 no desktop, 720 no mobile */
function pickQuality() {
  return window.matchMedia("(max-width: 768px)").matches ? "720" : "1080";
}

/** Loader tolerante a erro (nunca rejeita) */
function loadImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ ok: true, img, url });
    img.onerror = (e) => resolve({ ok: false, error: e, url });
    img.src = url;
  });
}

export default function ScrollVideo() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const canvasRef = useRef(null);

  const qualityRef = useRef(pickQuality());
  const imgsRef = useRef([]);          // armazena os Image() carregados
  const currentFrameRef = useRef(0);   // para redesenhar no resize
  const [sectionH, setSectionH] = useState(
    window.innerHeight + TOTAL_FRAMES * PX_PER_FRAME
  );

  /** Desenha no canvas cobrindo a área (cover) */
  const draw = useCallback((img) => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;

    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, width, height);

    const ir = img.width / img.height;
    const cr = width / height;

    let dw, dh;
    if (ir > cr) {
      dh = height;
      dw = ir * dh;
    } else {
      dw = width;
      dh = dw / ir;
    }
    const dx = (width - dw) / 2;
    const dy = (height - dh) / 2;
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  /** Ajusta tamanho do canvas ao viewport + DPR */
  useEffect(() => {
    function resize() {
      setSectionH(window.innerHeight + TOTAL_FRAMES * PX_PER_FRAME);

      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // redesenha o frame atual (se já existe)
      const idx = currentFrameRef.current;
      const img = imgsRef.current[idx];
      if (img) draw(img);
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [draw]);

  /** PIN manual (seu código original) — inalterado na essência */
  useEffect(() => {
    const el = sectionRef.current;
    const pin = pinRef.current;
    if (!el || !pin) return;

    el.style.height = `${sectionH}px`;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const docTop = window.scrollY || window.pageYOffset;
      const start = docTop + rect.top;                         // topo absoluto da section
      const end = start + sectionH - window.innerHeight;       // ponto onde “solta”
      const y = window.scrollY || window.pageYOffset;

      // posicionamento (absolute/fixed) — mantém o “grudado” na viewport
      if (y < start) {
        pin.style.position = "absolute";
        pin.style.top = "0";
        pin.style.bottom = "auto";
        pin.style.left = "0";
        pin.style.width = "100%";
        pin.style.height = "100vh";
      } else if (y >= start && y <= end) {
        pin.style.position = "fixed";
        pin.style.top = "0";
        pin.style.bottom = "auto";
        pin.style.left = "0";
        pin.style.width = "100%";
        pin.style.height = "100vh";
      } else {
        pin.style.position = "absolute";
        pin.style.top = "auto";
        pin.style.bottom = "0";
        pin.style.left = "0";
        pin.style.width = "100%";
        pin.style.height = "100vh";
      }

      // ===== Scroll -> frame =====
      const span = sectionH - window.innerHeight || 1;
      const clamped = Math.min(Math.max(y - start, 0), span);
      const t = clamped / span; // 0..1
      const idx = Math.min(TOTAL_FRAMES - 1, Math.floor(t * (TOTAL_FRAMES - 1)));
      currentFrameRef.current = idx;

      const img = imgsRef.current[idx] || imgsRef.current[0];
      if (img) draw(img);
    };

    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => document.removeEventListener("scroll", onScroll);
  }, [sectionH, draw]);

  /** Preload dos frames (carrega 1º rápido, depois o resto) */
  useEffect(() => {
    let stop = false;

    async function boot() {
      // 1º frame — evita tela preta
      const firstUrl = frameUrl(qualityRef.current, 1);
      const first = await loadImage(firstUrl);
      if (stop) return;

      if (first.ok) {
        imgsRef.current = [first.img];
        requestAnimationFrame(() => draw(first.img));
      } else {
        console.error("Falha no primeiro frame:", firstUrl);
      }

      // demais frames
      const urls = Array.from({ length: TOTAL_FRAMES - 1 }, (_, k) =>
        frameUrl(qualityRef.current, k + 2)
      );
      const results = await Promise.all(urls.map(loadImage));
      if (stop) return;

      const okImgs = results.filter(r => r.ok).map(r => r.img);
      const bad = results.filter(r => !r.ok);
      if (bad.length) console.warn("Frames ausentes:", bad.slice(0, 8).map(b => b.url));

      imgsRef.current = [imgsRef.current[0], ...okImgs];

      // se faltou algum, repete o último válido para manter o comprimento
      if (imgsRef.current.length && imgsRef.current.length < TOTAL_FRAMES) {
        const last = imgsRef.current[imgsRef.current.length - 1];
        while (imgsRef.current.length < TOTAL_FRAMES) imgsRef.current.push(last);
      }
    }

    boot();
    return () => { stop = true; };
  }, [draw]);

  return (
    <section
      id="scroll-video"
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
          position: "absolute", // o onScroll muda para fixed durante a seção
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 10,
          background: BG_COLOR,
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />
      </div>
    </section>
  );
}
