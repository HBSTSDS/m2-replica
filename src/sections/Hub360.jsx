// src/sections/Hub360.jsx
import React, { useMemo, useRef, useState } from "react";
import InteractivePills from "../components/InteractivePills";

const ICON_NAMES = [
  "caixa", "camisa", "casa", "correto", "energetico", "engrenagem",
  "garrafa", "Impresora", "lampada", "lapis", "medalha", "minion", "papel", "serra",
];

/** === Carrega SVGs em src/assets/icons (Vite) ===
 * Como este arquivo está em src/sections/Hub360.jsx,
 * o caminho correto para src/assets/icons é ../assets/icons/*.svg
 */
const assetsGlob = import.meta.glob("../assets/icons/*.svg", {
  eager: true,
  as: "url",
});

// Mapa { base-lowercase -> url }
const ICON_URL_MAP = Object.fromEntries(
  Object.entries(assetsGlob).map(([path, url]) => {
    const file = path.split("/").pop();              // "caixa.svg"
    const base = file.replace(/\.svg$/i, "").toLowerCase(); // "caixa"
    return [base, url];
  })
);

// Resolve URL do ícone (assets -> public fallback)
function resolveIconUrl(name) {
  const key = String(name).toLowerCase();
  const inAssets = ICON_URL_MAP[key];

  if (!inAssets) {
    console.warn(`[Hub360] Ícone não encontrado em src/assets/icons: "${name}". Tentando /icons/${key}.svg`);
    return `/icons/${key}.svg`; // fallback para /public/icons
  }
  return inAssets;
}

// Constrói componentes <img/> para cada ícone
const icons = ICON_NAMES.map((name) => (props) => (
  <img
    src={resolveIconUrl(name)}
    alt={name}
    className="h-6 w-6"
    loading="lazy"
    draggable={false}
    onError={(e) => {
      const lowerFallback = `${window.location.origin}/icons/${String(name).toLowerCase()}.svg`;
      if (e.currentTarget.src !== lowerFallback) e.currentTarget.src = lowerFallback;
    }}
    {...props}
  />
));

export default function Hub360() {
  /** ==== TAMANHOS (edite aqui se quiser) ==== */
  const size = 680;          // diâmetro da roda
  const btnSizePx = 64;      // diâmetro de cada botão
  const trackPadding = 10;   // espaçamento ao redor dos botões
  const outerRadius = 260;   // raio externo do anel
  /** ======================================== */

  const center = size / 2;
  const total = icons.length;
  const trackWidth = btnSizePx + trackPadding * 2;
  const innerRadius = outerRadius - trackWidth;
  const iconRadius = innerRadius + trackWidth / 2;

  const wheelRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const drag = useRef({ dragging: false, startAngle: 0, startRotation: 0, movedDeg: 0 });

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
    e.preventDefault(); e.stopPropagation();
    // eslint-disable-next-line no-unused-vars
    try { wheelRef.current.setPointerCapture?.(e.pointerId); } catch (err) { /* noop */ }
    drag.current.dragging = true;
    drag.current.startAngle = getAngleFromPointer(e.clientX, e.clientY);
    drag.current.startRotation = rotation;
    drag.current.movedDeg = 0;
    window.addEventListener("pointermove", onPointerMove);
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
    // eslint-disable-next-line no-unused-vars
    try { wheelRef.current.releasePointerCapture?.(e.pointerId); } catch (err) { /* noop */ }
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  }

  function handleIconClick(i) {
    if (drag.current.movedDeg < 5) {
      const name = ICON_NAMES[i];
      console.log("Selecionado:", name);
    }
  }

  return (
    <section className="w-full bg-[#EEF0F6] py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          {/* ESQUERDA */}
          <div className="relative md:pr-16 z-0">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">HUB 360º</h2>
            <p className="mt-2 max-w-xl text-slate-600 leading-relaxed">
              O centro onde ideias, design e produção se conectam para transformar comunicação em resultado.
            </p>

            {/* === BLOCO DAS PÍLULAS COM LIMITE VISUAL === */}
            <div className="mt-6 max-w-[560px] md:max-w-[520px] overflow-hidden pb-12">
              <div className="relative">
                <InteractivePills
                  items={[
                    "DISPLAYS","GIGANTOGRAFIA","PRÉ IMPRESSÃO","MARKETING","TÊXTIL","CENOGRAFIA",
                    "IMPRESSÃO UV","IMPRESSÃO OFFSET","GRÁFICA RÁPIDA","PDV","MARCENARIA","SERRALHERIA",
                    "PROJETOS ESPECIAIS","LETRAS CAIXA",
                  ]}
                />
              </div>
            </div>

            {/* Espaço para textos adicionais, se quiser preencher depois */}
            <div className="mt-4 max-w-[60ch]">
              <p className="text-sm leading-7 text-slate-700"></p>
              <p className="mt-4 text-sm font-semibold text-slate-900"></p>
            </div>
          </div>

          {/* DIREITA (ANEL) */}
          <div className="mx-auto relative z-30">
            <div
              ref={wheelRef}
              className="relative select-none touch-none"
              style={{
                width: size,
                height: size,
                maxWidth: "92vw",
                maxHeight: "92vw",
              }}
              onPointerDown={onPointerDown}
              onDragStart={(e) => e.preventDefault()}
            >
              {/* ÍCONES */}
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
                      className="absolute grid place-items-center rounded-full bg-[#ECEFF7] shadow-sm hover:shadow-md active:scale-95 transition"
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
              <div className="absolute inset-0 grid place-content-center text-center pointer-events-none">
                <div>
                  <div className="text-slate-600 font-semibold tracking-wide text-2xl">HUB</div>
                  <div className="text-slate-800 font-extrabold tracking-tight text-7xl md:text-8xl">
                    360º
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TEXTO DE RODAPÉ */}
        <div className="mt-6 md:mt-10 max-w-4xl">
          <p className="text-slate-600 leading-relaxed">
            Unimos estratégia, design e produção em um único ecossistema criativo. Atuando de ponta a ponta — do
            planejamento à instalação — entregando soluções completas e personalizadas que transformam marcas em
            experiências visuais marcantes. Aqui, cada projeto é integrado, ágil e inteligente, feito para gerar
            impacto real e valor duradouro.
          </p>
          <h3 className="mt-4 text-xl text-slate-900">
            <strong>Uma só gráfica, um só executivo, uma única empresa.</strong>
          </h3>
        </div>
      </div>
    </section>
  );
}
