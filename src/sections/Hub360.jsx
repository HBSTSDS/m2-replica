// src/sections/Hub360.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import InteractivePills from "../components/InteractivePills";

/** Nomes dos ícones usados na roda */
const ICON_NAMES = [
  "caixa",
  "camisa",
  "casa",
  "correto",
  "energetico",
  "engrenagem",
  "garrafa",
  "Impresora",
  "lampada",
  "lapis",
  "medalha",
  "minion",
  "papel",
  "serra",
];

/** === Carrega SVGs em src/assets/icons (Vite) === */
const assetsGlob = import.meta.glob("../assets/icons/*.svg", {
  eager: true,
  as: "url",
});

// Mapa { base-lowercase -> url }
const ICON_URL_MAP = Object.fromEntries(
  Object.entries(assetsGlob).map(([path, url]) => {
    const file = path.split("/").pop();
    const base = file.replace(/\.svg$/i, "").toLowerCase();
    return [base, url];
  }),
);

function resolveIconUrl(name) {
  const key = String(name).toLowerCase();
  const inAssets = ICON_URL_MAP[key];
  if (!inAssets) {
    console.warn(
      `[Hub360] Ícone não encontrado em src/assets/icons: "${name}". Tentando /icons/${key}.svg`,
    );
    return `/icons/${key}.svg`;
  }
  return inAssets;
}

const icons = ICON_NAMES.map((name) => (props) => (
  <img
    src={resolveIconUrl(name)}
    alt={name}
    className="h-6 w-6"
    loading="lazy"
    draggable={false}
    onError={(e) => {
      const lowerFallback = `${window.location.origin}/icons/${String(
        name,
      ).toLowerCase()}.svg`;
      if (e.currentTarget.src !== lowerFallback) {
        e.currentTarget.src = lowerFallback;
      }
    }}
    {...props}
  />
));

export default function Hub360() {
  /** ==== MOBILE / DESKTOP ==== */
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /** ==== TAMANHOS (diferentes pra mobile) ==== */
  const size = isMobile ? 320 : 680; // tamanho total da roda
  const btnSizePx = isMobile ? 44 : 64; // tamanho dos botões
  const trackPadding = isMobile ? 8 : 10;
  const outerRadius = isMobile ? 185 : 260; 
  /** ========================================= */

  const center = size / 2;
  const total = icons.length;
  const trackWidth = btnSizePx + trackPadding * 2;
  const innerRadius = outerRadius - trackWidth;
  const iconRadius = innerRadius + trackWidth / 2;

  const wheelRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const drag = useRef({
    dragging: false,
    startAngle: 0,
    startRotation: 0,
    movedDeg: 0,
  });

  const positions = useMemo(() => {
    return Array.from({ length: total }).map((_, i) => {
      const angle = -90 + (i * 360) / total;
      const rad = (angle * Math.PI) / 180;
      const x = center + iconRadius * Math.cos(rad);
      const y = center + iconRadius * Math.sin(rad);
      return { angle, rad, x, y };
    });
  }, [total, center, iconRadius]);

  function getAngleFromPointer(clientX, clientY) {
    const rect = wheelRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI;
  }

  function onPointerDown(e) {
    e.preventDefault();
    e.stopPropagation();

    try {
      wheelRef.current.setPointerCapture?.(e.pointerId);
    } catch (err) {}

    drag.current.dragging = true;
    drag.current.startAngle = getAngleFromPointer(e.clientX, e.clientY);
    drag.current.startRotation = rotation;
    drag.current.movedDeg = 0;

    window.addEventListener("pointermove", onPointerMove, { passive: false });
    window.addEventListener("pointerup", onPointerUp);
  }

  function onPointerMove(e) {
    if (!drag.current.dragging) return;
    e.preventDefault();

    const nowAngle = getAngleFromPointer(e.clientX, e.clientY);
    const delta = nowAngle - drag.current.startAngle;
    drag.current.movedDeg = Math.abs(delta);
    setRotation(drag.current.startRotation + delta);
  }

  function onPointerUp(e) {
    drag.current.dragging = false;
    try {
      wheelRef.current.releasePointerCapture?.(e.pointerId);
    } catch (err) {}

    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  }

  function handleIconClick(i) {
    // se não arrastou muito, considera click
    if (drag.current.movedDeg < 5) {
      const name = ICON_NAMES[i];
      console.log("Selecionado:", name);
      // aqui você pode integrar com algum estado, modal, etc
    }
  }

  return (
    <section className="w-full bg-[#EEF0F6] py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          {/* ESQUERDA */}
          <div className="relative z-0 md:pr-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
              HUB 360º
            </h2>
            <p className="mt-2 max-w-xl leading-relaxed text-slate-600">
              O centro onde ideias, design e produção se conectam para
              transformar comunicação em resultado.
            </p>

            {/* BLOCO DAS PÍLULAS */}
            <div className="mt-6 max-w-[560px] pb-12 md:max-w-[520px]">
              <div className="relative">
                <InteractivePills
                  items={[
                    "DISPLAYS",
                    "GIGANTOGRAFIA",
                    "PRÉ IMPRESSÃO",
                    "MARKETING",
                    "TÊXTIL",
                    "CENOGRAFIA",
                    "IMPRESSÃO UV",
                    "IMPRESSÃO OFFSET",
                    "GRÁFICA RÁPIDA",
                    "PDV",
                    "MARCENARIA",
                    "SERRALHERIA",
                    "PROJETOS ESPECIAIS",
                    "LETRAS CAIXA",
                  ]}
                />
              </div>
            </div>
          </div>

          {/* DIREITA – roda sempre ativa (desktop + mobile) */}
          <div className="relative z-30 mx-auto flex items-center justify-center">
            <div
              ref={wheelRef}
              className="relative select-none touch-none"
              style={{
                width: size,
                height: size,
                maxWidth: isMobile ? "320px" : "92vw",
                maxHeight: isMobile ? "320px" : "92vw",
                touchAction: "none", // importante pro mobile não rolar a página enquanto arrasta
              }}
              onPointerDown={onPointerDown}
              onDragStart={(e) => e.preventDefault()}
            >
              {/* ÍCONES EM VOLTA */}
              <div
                className="absolute inset-0 will-change-transform"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {positions.map(({ x, y }, i) => {
                  const Icon = icons[i];
                  const borderColors = ["#00D1FF", "#FFE600", "#FF005C"];
                  const borderColor = borderColors[i % borderColors.length];

                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleIconClick(i)}
                      className="absolute grid place-items-center rounded-full bg-[#ECEFF7] shadow-sm transition hover:shadow-md active:scale-95"
                      style={{
                        left: x,
                        top: y,
                        width: btnSizePx,
                        height: btnSizePx,
                        transform: `translate(-50%, -50%) rotate(${-rotation}deg)`,
                        cursor: "grab",
                        border: `3px solid ${borderColor}`,
                      }}
                      title={ICON_NAMES[i]}
                      aria-label={ICON_NAMES[i]}
                    >
                      <Icon />
                    </button>
                  );
                })}
              </div>

              {/* CENTRO */}
              <div className="pointer-events-none absolute inset-0 grid place-content-center text-center">
                <div>
                  <div className="text-2xl font-semibold tracking-wide text-slate-600">
                    HUB
                  </div>
                  <div className="text-7xl font-extrabold tracking-tight text-slate-800 md:text-8xl">
                    360º
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RODAPÉ */}
        <div className="mt-6 max-w-4xl md:mt-10">
          <p className="leading-relaxed text-slate-600">
            Unimos estratégia, design e produção em um único ecossistema
            criativo. Atuando de ponta a ponta — do planejamento à instalação —
            entregando soluções completas e personalizadas que transformam
            marcas em experiências visuais marcantes. Aqui, cada projeto é
            integrado, ágil e inteligente, feito para gerar impacto real e valor
            duradouro.
          </p>
          <h3 className="mt-4 text-xl text-slate-900">
            <strong>Uma só gráfica, um só executivo, uma única empresa.</strong>
          </h3>
        </div>
      </div>
    </section>
  );
}
