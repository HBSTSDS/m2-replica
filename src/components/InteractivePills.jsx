// src/components/InteractivePills.jsx
import { useEffect, useRef, useState, useLayoutEffect } from "react";

/* ============================================================
   ÚNICO MOTOR (DESKTOP + MOBILE)
   - Colisão elíptica (usa hw/hh) -> não “entra dentro”
   - Mantém o feeling da sua física original (damping/gravity/bounce)
   - OTIMIZADO: Removeu o React State do loop de animação (Direct DOM)
   ============================================================ */

function InteractivePillsPhysics({ items, isMobile }) {
  const containerRef = useRef(null);
  const pillRefs = useRef([]);
  const rafRef = useRef(null);

  const draggingId = useRef(null);
  const pointerIdRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Armazena o estado físico fora do React State para 60fps lisos
  const physics = useRef([]);

  // Mantemos um 'version' state apenas para forçar re-render se items mudarem drasticamente,
  // mas aqui usaremos o próprio array 'items' na renderização.
  
  // Inicializa/Sincroniza objetos de física com os items
  useLayoutEffect(() => {
    const newPhysics = items.map((label, i) => {
      // Preserva estado anterior se existir (para não resetar posição em resize)
      const existing = physics.current[i];
      if (existing) {
        return { ...existing, label };
      }
      // Se é novo, inicializa
      return {
        id: i,
        label,
        x: 80 + (i % 4) * 140,
        y: -50 - Math.random() * 120,
        vx: (Math.random() - 0.5) * 15,
        vy: 0,
        w: 120,
        h: 40,
        hw: 60,
        hh: 20,
        dragging: false,
        z: 0,
      };
    });
    
    physics.current = newPhysics;
    // Ajusta tamanho do array de refs
    pillRefs.current = pillRefs.current.slice(0, newPhysics.length);
  }, [items]);

  // Mede tamanho real das pílulas e atualiza a física
  useLayoutEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const cb = c.getBoundingClientRect();

    physics.current.forEach((n, i) => {
      const el = pillRefs.current[i];
      if (!el) return;

      const b = el.getBoundingClientRect();
      const w = b.width;
      const h = b.height;
      const hw = w / 2;
      const hh = h / 2;

      // Garante que spawne dentro ou ajuste se redimensionou
      const x = Math.min(Math.max(n.x, hw + 6), cb.width - hw - 6);

      // Atualiza referências
      n.w = w;
      n.h = h;
      n.hw = hw;
      n.hh = hh;
      n.x = x;
    });
  }, [items, isMobile]);

  // Loop de Física
  useEffect(() => {
    const conf = {
      dt: 1 / 60,
      damping: 0.965,
      repel: 900,
      wallBounce: 0.7,
      gravity: 12,
      collisionIters: isMobile ? 6 : 4,
      gap: isMobile ? 4 : 3,
      sep: 0.95,
    };

    const step = () => {
      const c = containerRef.current;
      if (!c) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }

      const { width: W, height: H } = c.getBoundingClientRect();
      const m = mouse.current;
      const nodes = physics.current;

      // Movimento + gravidade
      for (const n of nodes) {
        if (n.dragging) {
          n.x = m.x;
          n.y = m.y;
          n.vx = 0;
          n.vy = 0;
        } else {
          n.vy += conf.gravity * conf.dt;
          n.vx *= conf.damping;
          n.vy *= conf.damping;

          n.x += n.vx * conf.dt * 60;
          n.y += n.vy * conf.dt * 60;
        }
      }

      // Colisões (O(N^2) mas N é pequeno)
      for (let pass = 0; pass < conf.collisionIters; pass++) {
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i];
            const b = nodes[j];

            const dx = b.x - a.x;
            const dy = b.y - a.y;

            const rx = a.hw + b.hw + conf.gap;
            const ry = a.hh + b.hh + conf.gap;

            const nx = dx / (rx || 0.0001);
            const ny = dy / (ry || 0.0001);
            const s = nx * nx + ny * ny;

            if (s < 1) {
              const dist = Math.hypot(dx, dy) || 0.0001;
              const dirx = dx / dist;
              const diry = dy / dist;

              const d = Math.sqrt(s || 0.000001);
              const pen = 1 - d;
              const pushPx = pen * Math.min(rx, ry) * conf.sep;

              const fx = dirx * pushPx * 0.1;
              const fy = diry * pushPx * 0.1;

              if (!a.dragging) {
                a.vx -= fx;
                a.vy -= fy;
              }
              if (!b.dragging) {
                b.vx += fx;
                b.vy += fy;
              }

              if (a.dragging && !b.dragging) {
                b.x += dirx * pushPx;
                b.y += diry * pushPx;
              } else if (!a.dragging && b.dragging) {
                a.x -= dirx * pushPx;
                a.y -= diry * pushPx;
              } else {
                if (!a.dragging) {
                  a.x -= dirx * pushPx * 0.5;
                  a.y -= diry * pushPx * 0.5;
                }
                if (!b.dragging) {
                  b.x += dirx * pushPx * 0.5;
                  b.y += diry * pushPx * 0.5;
                }
              }
            }
          }
        }
      }

      // Paredes
      for (const n of nodes) {
        const left = n.hw + 2;
        const right = W - n.hw - 2;
        const top = n.hh + 2;
        const bottom = H - n.hh - 2;

        if (n.x < left) {
          n.x = left;
          n.vx = Math.abs(n.vx) * conf.wallBounce;
        } else if (n.x > right) {
          n.x = right;
          n.vx = -Math.abs(n.vx) * conf.wallBounce;
        }

        if (n.y < top) {
          n.y = top;
          n.vy = Math.abs(n.vy) * conf.wallBounce;
        } else if (n.y > bottom) {
          n.y = bottom;
          n.vy = -Math.abs(n.vy) * conf.wallBounce;
        }
      }

      // ----------------------------------------------------
      // APLICA NO DOM (Critical Path de Performance)
      // ----------------------------------------------------
      for (let i = 0; i < nodes.length; i++) {
        const el = pillRefs.current[i];
        const n = nodes[i];
        if (el) {
          el.style.transform = `translate(${n.x - n.w / 2}px, ${n.y - n.h / 2}px)`;
          // Z-index only changed explicitly via events, but we can sync here if needed
          // To save overhead, we only touch style.zIndex inside event handlers or if specific logic demands
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isMobile]);

  const onPointerMove = (e) => {
    const c = containerRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    mouse.current.x = e.clientX - rect.left;
    mouse.current.y = e.clientY - rect.top;
  };

  const onDown = (idx) => (e) => {
    e.preventDefault();
    e.stopPropagation(); // Good practice for multiple interactions

    pointerIdRef.current = e.pointerId;
    e.currentTarget.setPointerCapture?.(e.pointerId);

    const c = containerRef.current;
    if (c) {
      const rect = c.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    }

    draggingId.current = idx;
    
    // Atualiza estado físico + zIndex visual
    const n = physics.current[idx];
    if (n) {
      n.dragging = true;
      n.z = 1;
      // Atualiza DOM imediatamente para feedback visual (z-index, cursor)
      const el = pillRefs.current[idx];
      if (el) {
        el.style.zIndex = "20";
        el.style.cursor = "grabbing";
      }
    }
  };

  const onUp = () => {
    if (draggingId.current !== null) {
      const idx = draggingId.current;
      const n = physics.current[idx];
      if (n) {
        n.dragging = false;
        n.z = 0;
        const el = pillRefs.current[idx];
        if (el) {
          el.style.zIndex = "10";
          el.style.cursor = "grab";
        }
      }
    }
    draggingId.current = null;
    pointerIdRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full select-none rounded-xl ${
        isMobile ? "h-[240px]" : "h-[500px]"
      }`}
      style={{ touchAction: "none" }}
      onPointerMove={onPointerMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onPointerLeave={onUp}
    >
      {items.map((label, i) => (
        <span
          key={i}
          ref={(el) => (pillRefs.current[i] = el)}
          onPointerDown={onDown(i)}
          // Initial styles (will be overwritten by JS immediately, but good for SSR/First paint)
          style={{
            transform: "translate(-999px, -999px)", // esconde até o primeiro frame posicionar
            zIndex: 10,
            userSelect: "none",
            willChange: "transform", // Hint browser for optimization
          }}
          className={`
            absolute inline-flex items-center justify-center
            rounded-full border-2 border-slate-400/60
            bg-white/80 text-slate-700
            shadow-sm whitespace-nowrap
            cursor-grab active:cursor-grabbing
            ${isMobile ? "px-2.5 py-0.5 text-[11px]" : "px-4 py-2 text-sm"}
          `}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

/* ============================================================
   WRAPPER – DECIDE MOBILE OU DESKTOP
   ============================================================ */

export default function InteractivePills({ items }) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 768
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return <InteractivePillsPhysics items={items} isMobile={isMobile} />;
}
