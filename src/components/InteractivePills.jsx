import { useEffect, useMemo, useRef, useState } from "react";

export default function InteractivePills({ items }) {
  const containerRef = useRef(null);
  const pillRefs = useRef([]);
  const rafRef = useRef(null);

  // estado físico
  const [nodes, setNodes] = useState(() =>
    items.map((label, i) => ({
      id: i,
      label,
      x: 40 + (i % 3) * 140,
      y: 30 + Math.floor(i / 3) * 70,
      vx: 0,
      vy: 0,
      r: 28,    // será ajustado após medir
      w: 120,   // idem
      h: 40,
      dragging: false,
      z: 0,
    }))
  );

  const draggingIdRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, dx: 0, dy: 0, inside: false });

  // medir tamanhos reais das pílulas (largura/altura) após montar
  useEffect(() => {
    if (!containerRef.current) return;
    const next = nodes.map((n, i) => {
      const el = pillRefs.current[i];
      if (!el) return n;
      const b = el.getBoundingClientRect();
      const cb = containerRef.current.getBoundingClientRect();
      const w = b.width;
      const h = b.height;
      // raio aproximado: metade da altura + um pouco da largura
      const r = Math.max(h / 2, Math.min(w / 2, h * 0.75));
      // reposiciona para dentro se estiver fora após medição
      const x = Math.min(Math.max(n.x, r + 4), cb.width - r - 4);
      const y = Math.min(Math.max(n.y, r + 4), cb.height - r - 4);
      return { ...n, w, h, r, x, y };
    });
    setNodes(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // loop de física
  useEffect(() => {
    const conf = {
      dt: 1 / 60,
      damping: 0.92,
      repel: 1200,          // força de repulsão entre pílulas
      mouseInfluence: 1.3,  // quanto o movimento do mouse empurra
      dragStiff: 0.35,      // “mola” quando arrasta
      wallBounce: 0.7,
    };

    const step = () => {
      const c = containerRef.current;
      if (!c) return;
      const { width: W, height: H } = c.getBoundingClientRect();
      const m = mouseRef.current;

      setNodes((prev) => {
        const next = prev.map((n) => ({ ...n }));

        // 1) interação com mouse (vento conforme movimento)
        if (m.inside) {
          for (const n of next) {
            if (n.dragging) continue;
            const dx = n.x - m.x;
            const dy = n.y - m.y;
            const dist = Math.hypot(dx, dy) + 1;
            // empurra na direção do movimento do mouse, diminui com a distância
            n.vx += (m.dx * conf.mouseInfluence) / (dist * 0.15);
            n.vy += (m.dy * conf.mouseInfluence) / (dist * 0.15);
          }
        }

        // 2) repulsão entre pílulas
        for (let i = 0; i < next.length; i++) {
          for (let j = i + 1; j < next.length; j++) {
            const a = next[i];
            const b = next[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const d = Math.hypot(dx, dy) || 0.0001;
            const minD = a.r + b.r + 6; // margem

            if (d < minD) {
              // empurra cada uma para lados opostos
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
              // correção posicional mínima para evitar travar
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

        // 3) atualização de velocidade/posição + paredes
        for (const n of next) {
          if (n.dragging) continue;

          n.vx *= conf.damping;
          n.vy *= conf.damping;

          n.x += n.vx * conf.dt * 60;
          n.y += n.vy * conf.dt * 60;

          // paredes
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

      // decai o delta do mouse (para não ficar empurrando para sempre)
      mouseRef.current.dx *= 0.85;
      mouseRef.current.dy *= 0.85;

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // handlers mouse/pointer
  const onPointerMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current.dx = x - mouseRef.current.x;
    mouseRef.current.dy = y - mouseRef.current.y;
    mouseRef.current.x = x;
    mouseRef.current.y = y;

    // se estiver arrastando, traciona o nó até o ponteiro
    if (draggingIdRef.current != null) {
      setNodes((prev) => {
        const next = prev.map((n) => ({ ...n }));
        const n = next[draggingIdRef.current];
        if (!n) return prev;
        const targetX = x;
        const targetY = y;
        n.vx += (targetX - n.x) * 0.35;
        n.vy += (targetY - n.y) * 0.35;
        return next;
      });
    }
  };

  const onPointerEnter = () => { mouseRef.current.inside = true; };
  const onPointerLeave = () => { mouseRef.current.inside = false; };

  const onDown = (idx) => (e) => {
    e.preventDefault();
    draggingIdRef.current = idx;
    setNodes((prev) => {
      const next = prev.map((n, i) =>
        i === idx ? { ...n, dragging: true, z: 1 } : { ...n, z: 0 }
      );
      return next;
    });
  };

  const onUp = () => {
    draggingIdRef.current = null;
    setNodes((prev) => prev.map((n) => ({ ...n, dragging: false, z: 0 })));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[500px] rounded-xl bg-transparent select-none"
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
            touchAction: "none",
          }}
          className={[
            "absolute inline-flex items-center rounded-full border-2",
            "border-slate-400/60 bg-white/80 text-slate-700",
            "px-4 py-2 text-sm font-medium shadow-sm cursor-grab active:cursor-grabbing",
            "transition-[box-shadow,transform] duration-150",
          ].join(" ")}
        >
          {n.label}
        </span>
      ))}
    </div>
  );
}
