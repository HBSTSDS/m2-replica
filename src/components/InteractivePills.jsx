// src/components/InteractivePills.jsx
import { useEffect, useRef, useState } from "react";

/* ============================================================
   MOBILE – INTERAÇÃO LEVE (ARRASTAR O BLOCO INTEIRO)
   ============================================================ */
function InteractivePillsMobile({ items }) {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef({
    dragging: false,
    lastX: 0,
    lastY: 0,
    vx: 0,
    vy: 0,
  });

  const rafRef = useRef(null);

  // animação suave quando solta o dedo
  const animateBack = () => {
    const step = () => {
      const { vx, vy } = drag.current;

      if (Math.abs(vx) < 0.02 && Math.abs(vy) < 0.02) {
        drag.current.vx = 0;
        drag.current.vy = 0;
        return;
      }

      drag.current.vx *= 0.9;
      drag.current.vy *= 0.9;

      setOffset((prev) => ({
        x: prev.x + drag.current.vx,
        y: prev.y + drag.current.vy,
      }));

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
  };

  const onPointerDown = (e) => {
    drag.current.dragging = true;
    drag.current.lastX = e.clientX;
    drag.current.lastY = e.clientY;
    drag.current.vx = 0;
    drag.current.vy = 0;
  };

  const onPointerMove = (e) => {
    if (!drag.current.dragging) return;

    const dx = e.clientX - drag.current.lastX;
    const dy = e.clientY - drag.current.lastY;

    drag.current.lastX = e.clientX;
    drag.current.lastY = e.clientY;

    drag.current.vx = dx * 0.4;
    drag.current.vy = dy * 0.4;

    // limite suave
    const max = 26;

    setOffset((prev) => ({
      x: Math.max(Math.min(prev.x + dx * 0.4, max), -max),
      y: Math.max(Math.min(prev.y + dy * 0.4, max), -max),
    }));
  };

  const onPointerUp = () => {
    drag.current.dragging = false;
    animateBack();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full pt-4 select-none"
      style={{ touchAction: "none" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div
        className="flex flex-wrap gap-x-3 gap-y-3"
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: drag.current.dragging ? "none" : "transform 0.25s ease-out",
        }}
      >
        {items.map((label, i) => (
          <span
            key={i}
            className="
              inline-flex items-center justify-center
              rounded-full border border-slate-300
              bg-white text-slate-800
              px-4 py-2 text-xs font-medium
              shadow-sm
              active:scale-95
              transition-transform duration-150
            "
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   DESKTOP – FÍSICA ORIGINAL (SEU CÓDIGO)
   ============================================================ */

function InteractivePillsDesktop({ items }) {
  const containerRef = useRef(null);
  const pillRefs = useRef([]);
  const rafRef = useRef(null);

  const [nodes, setNodes] = useState(() =>
    items.map((label, i) => ({
      id: i,
      label,
      x: 40 + (i % 3) * 140,
      y: 30 + Math.floor(i / 3) * 70,
      vx: 0,
      vy: 0,
      r: 28,
      w: 120,
      h: 40,
      dragging: false,
      z: 0,
    }))
  );

  const draggingId = useRef(null);
  const mouse = useRef({ x: 0, y: 0, dx: 0, dy: 0, inside: false });

  // Mede tamanhos
  useEffect(() => {
    if (!containerRef.current) return;

    const next = nodes.map((n, i) => {
      const el = pillRefs.current[i];
      if (!el) return n;

      const b = el.getBoundingClientRect();
      const cb = containerRef.current.getBoundingClientRect();
      const w = b.width;
      const h = b.height;
      const r = Math.max(h / 2, Math.min(w / 2, h * 0.75));

      const x = Math.min(Math.max(n.x, r + 4), cb.width - r - 4);
      const y = Math.min(Math.max(n.y, r + 4), cb.height - r - 4);

      return { ...n, w, h, r, x, y };
    });

    setNodes(next);
  }, []);

  // Física Desktop
  useEffect(() => {
    const conf = {
      dt: 1 / 60,
      damping: 0.92,
      repel: 1200,
      mouseInfluence: 1.3,
      dragStiff: 0.35,
      wallBounce: 0.7,
    };

    const step = () => {
      const c = containerRef.current;
      if (!c) return;

      const { width: W, height: H } = c.getBoundingClientRect();
      const m = mouse.current;

      setNodes((prev) => {
        const next = prev.map((n) => ({ ...n }));

        // vento do mouse
        if (m.inside) {
          for (const n of next) {
            if (n.dragging) continue;
            const dx = n.x - m.x;
            const dy = n.y - m.y;
            const dist = Math.hypot(dx, dy) + 1;
            n.vx += (m.dx * conf.mouseInfluence) / (dist * 0.15);
            n.vy += (m.dy * conf.mouseInfluence) / (dist * 0.15);
          }
        }

        // colisões
        for (let i = 0; i < next.length; i++) {
          for (let j = i + 1; j < next.length; j++) {
            const a = next[i];
            const b = next[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const d = Math.hypot(dx, dy) || 0.0001;
            const minD = a.r + b.r + 6;

            if (d < minD) {
              const overlap = (minD - d) / d;
              const fx = dx * overlap * conf.repel * 0.0005;
              const fy = dy * overlap * conf.repel * 0.0005;

              if (!a.dragging) {
                a.vx -= fx;
                a.vy -= fy;
              }
              if (!b.dragging) {
                b.vx += fx;
                b.vy += fy;
              }

              const corr = overlap * 0.5;

              if (!a.dragging) {
                a.x -= dx * corr;
                a.y -= dy * corr;
              }
              if (!b.dragging) {
                b.x += dx * corr;
                b.y += dy * corr;
              }
            }
          }
        }

        // movimento e colisão com as paredes
        for (const n of next) {
          if (n.dragging) continue;

          n.vx *= conf.damping;
          n.vy *= conf.damping;

          n.x += n.vx * conf.dt * 60;
          n.y += n.vy * conf.dt * 60;

          if (n.x < n.r + 2) {
            n.x = n.r + 2;
            n.vx = Math.abs(n.vx) * conf.wallBounce;
          } else if (n.x > W - n.r - 2) {
            n.x = W - n.r - 2;
            n.vx = -Math.abs(n.vx) * conf.wallBounce;
          }
          if (n.y < n.r + 2) {
            n.y = n.r + 2;
            n.vy = Math.abs(n.vy) * conf.wallBounce;
          } else if (n.y > H - n.r - 2) {
            n.y = H - n.r - 2;
            n.vy = -Math.abs(n.vy) * conf.wallBounce;
          }
        }

        return next;
      });

      mouse.current.dx *= 0.85;
      mouse.current.dy *= 0.85;

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onPointerMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouse.current.dx = x - mouse.current.x;
    mouse.current.dy = y - mouse.current.y;
    mouse.current.x = x;
    mouse.current.y = y;

    if (draggingId.current != null) {
      setNodes((prev) => {
        const next = prev.map((n) => ({ ...n }));
        const n = next[draggingId.current];

        const targetX = x;
        const targetY = y;

        n.vx += (targetX - n.x) * 0.35;
        n.vy += (targetY - n.y) * 0.35;

        return next;
      });
    }
  };

  const onPointerEnter = () => (mouse.current.inside = true);
  const onPointerLeave = () => (mouse.current.inside = false);

  const onDown = (idx) => (e) => {
    e.preventDefault();
    draggingId.current = idx;

    setNodes((prev) =>
      prev.map((n, i) =>
        i === idx ? { ...n, dragging: true, z: 1 } : { ...n, z: 0 }
      )
    );
  };

  const onUp = () => {
    draggingId.current = null;
    setNodes((prev) => prev.map((n) => ({ ...n, dragging: false, z: 0 })));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[500px] select-none rounded-xl"
      style={{ touchAction: "none" }}
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      {nodes.map((n, i) => (
        <span
          key={n.id}
          ref={(el) => (pillRefs.current[i] = el)}
          onPointerDown={onDown(i)}
          style={{
            transform: `translate(${n.x - n.w / 2}px, ${n.y - n.h / 2}px)`,
            zIndex: n.z ? 20 : 10,
          }}
          className="
            absolute inline-flex items-center rounded-full border-2
            border-slate-400/60 bg-white/80 text-slate-700
            px-4 py-2 text-sm font-medium shadow-sm
            cursor-grab active:cursor-grabbing
            transition-[box-shadow,transform] duration-150
          "
        >
          {n.label}
        </span>
      ))}
    </div>
  );
}

/* ============================================================
   WRAPPER – Decide mobile ou desktop
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

  if (isMobile) return <InteractivePillsMobile items={items} />;

  return <InteractivePillsDesktop items={items} />;
}
