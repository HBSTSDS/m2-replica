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
    .replace(/-/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/* ============================================================
   MATCH ROBUSTO
   ============================================================ */
function normalizeSlugFromFilename(filename) {
  const base = filename.replace(/\.[^/.]+$/, ""); // remove extensão
  return base
    .toLowerCase()
    .trim()
    .replace(/[\s-]+/g, "_")
    .replace(/[^a-z0-9_]+/g, "")
    .replace(/_+/g, "_");
}

/* ============================================================
   TEXTOS DAS MÁQUINAS
   ============================================================ */
const textosMaquinas = {
  /* ====== IMPRESSÃO / PRODUÇÃO ====== */
  nozomi_14000: {
    title: "Nozomi 14000",
    description:
      "Uma das tecnologias mais avançadas do mundo agora está em operação aqui. Impressão digital de alta performance com UV LED e tecnologia single-pass, permitindo rodar grandes volumes com menos paradas e setups do que processos tradicionais, além de facilitar a personalização e mudanças de arte com mais agilidade.",
  },

  efi_vutek_h5: {
    title: "Efi Vutek H5",
    description:
      "Mais impacto, velocidade e versatilidade na comunicação visual. Um equipamento híbrido tecnologia de LED UV para imprimir direto em placas e bobinas, combinando ritmo de produção com qualidade estável e recursos que valorizam o acabamento, abrindo espaço para efeitos premium e mais possibilidades criativas.",
  },

  vutek_fabrivu_340i1: {
    title: "Vutek Fabrivu 340i1",
    description:
      "Mais presença e cor para a comunicação visual em tecido, com padrão industrial. Equipamento de impressão têxtil por sublimação voltado para soft signage, produzindo banners, bandeiras e backlights. Integra fixação/sublimação em linha, acelerando o fluxo e entregando material pronto para acabamento com alta produtividade.",
  },

  vutek_q5r: {
    title: "Vutek Q5r",
    description:
      "Feita para produzir muito sem perder qualidade. Impressão com tecnologia de LED UV, roll-to-roll para mídias flexíveis, para acelerar o volume e foco em imagem de alto nível. Seu diferencial é unir produtividade com recursos que ampliam aplicações e opções de acabamento em linha.",
  },

  docan_fr3200: {
    title: "Docan Fr3200",
    description:
      "Grande formato com pegada industrial e foco em versatilidade, um equipamento UV roll-to-roll voltado a materiais flexíveis, entregando produção contínua e aplicações variadas. O destaque está na estabilidade para grandes volumes e em recursos como impressão em dupla camada, para ampliar o portfólio de produtos.",
  },

  kongsberg_c441: {
    title: "Kongsberg C441",
    description:
      "Onde a impressão vira peça pronta com precisão. Uma mesa digital multifuncional de corte e acabamento para sinalização e embalagens, trabalhando com ampla variedade de materiais rígidos e flexíveis. Com grande desempenho para produção contínua, com repetibilidade e controle para manter qualidade e produtividade no pós-impressão.",
  },

  massivit_1800_1: {
    title: "Massivit 1800 1",
    description:
      "Projetos em 3D em escala real. A Massivit 1800 é uma solução de impressão 3D de grande formato para criar peças volumétricas de marketing, cenografia e displays. Incrível velocidade e capacidade de produzir partes grandes e complexas, encurtando prazos e reduzindo a dependência de métodos tradicionais como moldes e usinagem.",
  },

  meevo_mx_event_seas1: {
    title: "Meevo Mx Event Seas1",
    description:
      "Acabamento têxtil automático para subir o nível do SEG. Um sistema para costurar keder/SEG em painéis de tecido e unir painéis com alinhamento preciso. Aumento de produtividade e consistência do acabamento, reduzindo tempo de fabricação e elevando o padrão final em aplicações de soft signage.",
  },

  /* ====== WUPPERTAL ====== */

  // ✅ (Nome “3201” existe no seu site — você pediu para trocar só a DESCRIÇÃO dele)
  // Mantive o title como “Wuppertal Mdpw-3201” (derivado do arquivo),
  // mas a descrição será a que você enviou.
  wuppertal_mdpw_3201: {
    title: "Wuppertal Mdpw-3201",
    description:
      "Qualidade e padronização no acabamento têxtil. Uma calandra voltada à colagem/laminação por calor e pressão em fluxos têxteis e de soft signage. Traz estabilidade e repetibilidade ao acabamento, sustentando produtividade e qualidade em produção contínua",
  },

  // Se você também usa “MDPW-320” (sem 1), deixo ele separado.
  wuppertal_mdpw_320: {
    title: "Wuppertal MDPW-320",
    description:
      "Acabamento têxtil com padrão e uniformidade para elevar a qualidade final: a Wuppertal MDPW-320 é uma calandra para colagem/laminação por calor e pressão em fluxos têxteis e de soft signage, trazendo estabilidade ao processo com cilindro aquecido por óleo térmico e controle eletrônico de temperatura (até 220°C), ajudando a manter repetibilidade e segurança operacional em produção contínua.",
  },

  wuppertal_mdpw_320i: {
    title: "Wuppertal MDPW-320i",
    description:
      "Acabamento têxtil com padrão e uniformidade para elevar a qualidade final: a Wuppertal MDPW-320i é uma calandra para colagem/laminação por calor e pressão em fluxos têxteis e de soft signage, trazendo estabilidade ao processo e ajudando a manter repetibilidade e segurança operacional em produção contínua.",
  },

  /* ====== CORTE & ACABAMENTO ====== */
  jwei_cut_sl1632: {
    title: "JWEI CUT SL1632",
    description:
      "Corte ultrarrápido e preciso para transformar chapas em peças prontas com ritmo industrial: a JWEI CUT SL1632 é uma mesa de corte digital plana para fluxos de produção e automação no “print & cut”, com recursos como movimento por levitação magnética (até 3 m/s) e posicionamento a laser, além de configuração prática de ferramentas para manter velocidade, repetibilidade e acabamento consistente.",
  },

  kongsberg_c64: {
    title: "Kongsberg C64",
    description:
      "Produtividade e precisão para transformar impressão em peça final no ritmo do wide format: a Kongsberg C64 é uma mesa de corte digital super-wide e multifuncional para sign & display e aplicações de embalagem/proteção, projetada para alto desempenho e operação contínua (24/7), trabalhando com ampla variedade de materiais rígidos e flexíveis e entregando controle e repetibilidade no pós-impressão.",
  },
};

/* ============================================================
   ALIASES / CORREÇÕES
   ============================================================ */
const aliasMap = {
  // Se alguma imagem vier como "Group 616771", vira o Wuppertal MDPW-320
  group_616771: "wuppertal_mdpw_320",

  // ✅ Aqui: se o arquivo/slug vier 3201, garantimos que use o item 3201
  // (antes você tinha jogado 3201 -> 320, mas agora você quer um texto específico para o 3201)
  wuppertal_mpdw_3201: "wuppertal_mdpw_3201", // MPDW -> MDPW
};

/* ============================================================
   Match inteligente
   ============================================================ */
function getTextoForFile(fileName) {
  const slug = normalizeSlugFromFilename(fileName);

  // 1) direto
  if (textosMaquinas[slug]) return textosMaquinas[slug];

  // 2) alias
  const aliased = aliasMap[slug];
  if (aliased && textosMaquinas[aliased]) return textosMaquinas[aliased];

  // 3) fallback por contains (prioriza chaves maiores primeiro)
  const candidates = Object.keys(textosMaquinas).sort((a, b) => b.length - a.length);
  const found = candidates.find((key) => slug.includes(key));
  if (found) return textosMaquinas[found];

  return null;
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
    const src = mod.default ?? mod;

    const textData = getTextoForFile(file);

    const title = textData?.title ?? formatTitleFromFilename(file);
    const description = textData?.description ?? "—";

    return { file, title, description, src };
  });

/* ==== THUMB RETANGULAR ==== */
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
          ${
            active
              ? "border border-[#FF005C] ring-2 ring-[#FF005C] scale-[1.02]"
              : "border border-transparent hover:scale-105"
          }
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
            {items[active].description}
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
