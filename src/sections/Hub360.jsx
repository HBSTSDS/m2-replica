// src/sections/Hub360.jsx
import React, { useMemo, useRef, useState } from "react";
import InteractivePills from "../components/InteractivePills";

const ICON_NAMES = [
  "caixa", "camisa", "casa", "correto", "energetico", "engrenagem",
  "garrafa", "Impresora", "lampada", "lapis", "medalha", "minion", "papel", "serra",
];

const icons = ICON_NAMES.map((name) => (props) => (
  <img
    src={`/icons/${name}.svg`}
    alt={name}
    className="h-6 w-6"
    loading="lazy"
    draggable={false}
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
    try { wheelRef.current.setPointerCapture?.(e.pointerId); } catch {}
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
    try { wheelRef.current.releasePointerCapture?.(e.pointerId); } catch {}
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
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">HUB 360º</h2>
            <p className="mt-2 max-w-xl text-slate-600 leading-relaxed">
              O centro onde ideias, design e produção se conectam para transformar comunicação em resultado.
            </p>

            <div className="mt-6">
              <InteractivePills
                items={[
                  "DISPLAYS","GIGANTOGRAFIA",
                  "PRÉ IMPRESSÃO","MARKETING","TÊXTIL","CENOGRAFIA",
                  "IMPRESSÃO UV","IMPRESSÃO OFFSET","GRÁFICA RÁPIDA","PDV",
                  "MARCENARIA","SERRALHERIA","PROJETOS ESPECIAIS","LETRAS CAIXA",
                ]}
              />
            </div>
          </div>

          {/* DIREITA (ANEL) */}
          <div className="mx-auto">
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
