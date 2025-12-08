// src/sections/Equipamentos.jsx
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";

/* ====== IMPORTAÇÃO AUTOMÁTICA DAS MÁQUINAS ====== */
const equipamentosRaw = import.meta.glob(
  "../assets/Equipamentos/*.{png,jpg,jpeg,webp}",
  { eager: true }
);

function formatTitleFromFilename(filename) {
  const base = filename.split(".")[0];
  return base
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/* ORDEM MANUAL – usando os nomes EXATOS + extensões corretas */
const ordem = [
  "nozomi_14000.png",
  "EFI_vutek_H5.jpg",
  "vutek_fabrivu_340i1.png",
  "VUTEK_Q5R.png",
];

// prioridade por NOME DE ARQUIVO (normalizado em minúsculas)
const prioridadeMap = ordem.reduce((acc, file, idx) => {
  acc[file.toLowerCase()] = idx;
  return acc;
}, {});

/* MONTA A LISTA FINAL */
const equipamentosItems = Object.entries(equipamentosRaw)
  .sort(([a], [b]) => {
    const fileA = a.split("/").pop().toLowerCase();
    const fileB = b.split("/").pop().toLowerCase();

    const pa = prioridadeMap[fileA] ?? 9999;
    const pb = prioridadeMap[fileB] ?? 9999;

    if (pa !== pb) return pa - pb;
    return fileA.localeCompare(fileB);
  })
  .map(([path, mod]) => {
    const file = path.split("/").pop();
    const title = formatTitleFromFilename(file);
    const src = mod.default ?? mod;
    return { file, title, src };
  });

/* ==== THUMB RETANGULAR ==== */
/*  – sem borda quando NÃO está ativo
    – borda rosa #FF005C apenas no ativo
*/
function Thumb({ src, title, active = false, onClick }) {
  const width = 86;
  const height = 62;

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={onClick}
        className={`
          relative shrink-0 overflow-hidden bg-white
          rounded-[18px]
          transition-transform duration-200
          ${active ? "border border-[#FF005C] ring-2 ring-[#FF005C] scale-[1.02]" : "border border-transparent hover:scale-105"}
        `}
        style={{ width, height }}
      >
        <img
          src={src}
          alt={title}
          className="w-full h-full object-cover select-none"
          draggable="false"
        />
      </button>

      <p
        className={`text-[13px] md:text-[14px] font-medium text-center ${
          active ? "text-gray-900" : "text-gray-500"
        }`}
      >
        {title}
      </p>
    </div>
  );
}

export default function Equipamentos() {
  const items = useMemo(() => equipamentosItems, []);

  const [active, setActive] = useState(0);
  const timer = useRef(null);

  const startAuto = useCallback(() => {
    clearInterval(timer.current);
    if (!items.length) return;
    timer.current = setInterval(
      () => setActive((i) => (i + 1) % items.length),
      5000
    );
  }, [items.length]);

  useEffect(() => {
    startAuto();
    return () => clearInterval(timer.current);
  }, [startAuto]);

  const select = (idx) => {
    clearInterval(timer.current);
    setActive(idx);
    startAuto();
  };

  if (!items.length) return null;

  return (
    <section className="w-full bg-[#EEF0F6] py-16 overflow-hidden relative">
      <style>
        {`
          /* Scrollbar horizontal só desse carrossel */
          .scrollbar-equipamentos {
            scrollbar-width: thin;
            scrollbar-color: #C1C3D0 transparent;
          }

          .scrollbar-equipamentos::-webkit-scrollbar {
            height: 6px;
          }

          .scrollbar-equipamentos::-webkit-scrollbar-track {
            background: transparent;
          }

          .scrollbar-equipamentos::-webkit-scrollbar-thumb {
            background-color: #C1C3D0;
            border-radius: 9999px;
          }

          .scrollbar-equipamentos::-webkit-scrollbar-thumb:hover {
            background-color: #A6A9BC;
          }
        `}
      </style>

      {/* Cabeçalho */}
      <div className="max-w-7xl mx-auto px-4 text-[#1C1C1C]">
        <h2 className="text-2xl md:text-[28px] tracking-wide mb-6">
          EQUIPAMENTOS
        </h2>
      </div>

      {/* IMAGEM PRINCIPAL */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen flex justify-center mb-4">
        <img
          src={items[active].src}
          alt={items[active].title}
          className="w-screen h-auto select-none"
          draggable="false"
        />
      </div>

      {/* Texto + Thumbs */}
      <div className="max-w-7xl mx-auto px-4 mt-4 text-[#1C1C1C]">
        <div className="text-center md:text-left mb-6">
          <h3 className="text-xl font-medium">{items[active].title}</h3>
          <p className="mt-2 max-w-3xl mx-auto md:mx-0 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            faucibus pulvinar ut commodo amet. Imperdiet purus volutpat
            pharetra. Quis viverra leo. Lorem ipsum dolor sit amet.
          </p>

          <a
            href="#"
            className="inline-block mt-3 text-gray-700 underline underline-offset-4 hover:no-underline"
          >
            ver detalhes &gt;&gt;
          </a>
        </div>

        {/* Miniaturas */}
        <div className="mt-8 overflow-x-auto scrollbar-equipamentos pt-2 pl-4">
          <div className="inline-flex flex-nowrap gap-5 md:gap-6 pb-3 pr-4">
            {items.map((it, i) => (
              <Thumb
                key={it.file}
                src={it.src}
                title={it.title}
                active={i === active}
                onClick={() => select(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
