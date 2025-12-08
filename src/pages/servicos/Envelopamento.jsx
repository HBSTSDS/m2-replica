// src/pages/servicos/Envelopamento.jsx
import headerImg from "../../assets/envelopamento/header.png";
import img2 from "../../assets/envelopamento/img-2.png";

// Importa automaticamente TODAS as imagens da pasta envelopamento
// e filtra para manter somente 1.png até 8.png (ou qualquer nome numérico).
const allImages = import.meta.glob(
  "../../assets/envelopamento/*",
  { eager: true }
);

// Filtra apenas imagens numeradas (1.png, 2.jpg, 3.webp, etc.)
const gridImgs = Object.entries(allImages)
  .filter(([path]) => {
    const file = path.split("/").pop();
    const name = file.split(".")[0];

    // Ignorar header e img2
    if (file === "header.png") return false;
    if (file === "img-2.png") return false;

    // Manter apenas arquivos cujo nome é número
    return /^\d+$/.test(name);
  })
  .sort(([a], [b]) => a.localeCompare(b)) // ordena pela numeração
  .map(([, mod]) => mod.default ?? mod);

export default function Envelopamento() {
  return (
    <main className="bg-[#E7E9F2] text-[#4B4B48]">

      {/* HEADER */}
      <section className="w-full">
        <img
          src={headerImg}
          alt="Envelopamento - header"
          className="w-full h-40 md:h-56 object-cover"
        />
      </section>

      {/* CONTEÚDO */}
      <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">

        <div className="grid md:grid-cols-3 gap-10 md:gap-14 items-start">

          {/* COLUNA DE TEXTO */}
          <div className="md:col-span-2">

            {/* BARRAS COLORIDAS */}
            <div className="flex items-center mb-4">
              <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
              <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
              <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
              <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" />
            </div>

            <h1 className="text-[28px] md:text-[36px] font-extrabold tracking-wide mb-6">
              ENVELOPAMENTO
            </h1>

            {/* TEXTO ORIGINAL (mantido como estava) */}
            <div className="space-y-10 leading-relaxed text-[16px] md:text-[17px]">

              {/* 1️⃣ O que é envelopamento */}
              <div>
                <div className="relative mb-2">
                  <span className="hidden md:block absolute right-full mr-5 top-1/2 -translate-y-1/2 h-5 w-24 bg-[#E5258C] rounded-r-md" />
                  <h2 className="font-bold text-[18px] md:text-[20px] leading-tight">
                    O que é envelopamento?
                  </h2>
                </div>

                <p className="mb-3">
                  Na M2, envelopamento é o processo de revestir superfícies com películas...
                </p>
                <p className="mb-3">
                  Falamos de transformar veículos, fachadas, equipamentos...
                </p>
                <p className="mb-3">
                  Com tecnologia de impressão e materiais de alta performance...
                </p>
                <p>
                  A M2 oferece soluções de envelopamento que transformam superfícies e ambientes...
                </p>
              </div>

              {/* 2️⃣ Por que investir */}
              <div>
                <div className="relative mb-2">
                  <span className="hidden md:block absolute right-full mr-5 top-1/2 -translate-y-1/2 h-5 w-24 bg-[#FFD400] rounded-r-md" />
                  <h2 className="font-bold text-[18px] md:text-[20px] leading-tight">
                    Por que investir em envelopamento?
                  </h2>
                </div>

                <p className="mb-3">
                  Investir em envelopamento é uma forma inteligente de potencializar a marca...
                </p>

                <ul className="list-disc ml-5 space-y-1.5">
                  <li><strong>Renova sem reforma:</strong> muda a cara de ambientes...</li>
                  <li><strong>Transfoma frota em mídia:</strong> carros, ônibus, metrô...</li>
                  <li><strong>Padroniza pontos de venda:</strong> ideal para redes...</li>
                  <li><strong>Protege superfícies:</strong> películas preservam a pintura...</li>
                  <li><strong>Flexibilidade e agilidade:</strong> campanhas rápidas...</li>
                </ul>

                <p className="mt-3">
                  Com um bom projeto e aplicação profissional, o envelopamento...
                </p>
              </div>

              {/* 3️⃣ Por que M2 */}
              <div>
                <div className="relative mb-2">
                  <span className="hidden md:block absolute right-full mr-5 top-1/2 -translate-y-1/2 h-5 w-24 bg-[#00B8F1] rounded-r-md" />
                  <h2 className="font-bold text-[18px] md:text-[20px] leading-tight">
                    Por que escolher a M2 para seu envelopamento?
                  </h2>
                </div>

                <p className="mb-3">A M2 une estrutura industrial, materiais certificados...</p>
                <p className="mb-3">Somos especialistas em envelopamento de transporte...</p>

                <ul className="ml-5 mb-3 space-y-0.5">
                  <li>Metrô</li>
                  <li>BRT</li>
                  <li>VLT</li>
                  <li>Carros</li>
                  <li>Ônibus</li>
                  <li>Caminhões</li>
                </ul>

                <p className="mb-3">Nossos processos garantem aderência perfeita...</p>
                <p className="mb-3">Materiais certificados e adequados a transporte...</p>
                <p className="mb-3"><strong>Projeto completo:</strong> medição, arte, produção...</p>
                <p className="mb-3">Atuação em todo o Brasil...</p>
                <p>Com a M2, envelopamento vira solução estratégica...</p>
              </div>
            </div>
          </div>

          {/* IMAGEM À DIREITA */}
          <aside className="md:pl-2">
            <figure className="rounded-xl overflow-hidden shadow-sm bg-white">
              <img
                src={img2}
                alt="Projeto de envelopamento"
                className="w-full h-[520px] object-cover"
              />
            </figure>
          </aside>
        </div>

        {/* FORMULÁRIO (mantido como estava) */}
        <div className="mt-16 md:mt-20">
          <h2 className="text-[18px] md:text-[20px] font-bold leading-snug">Gostou do que viu?</h2>
          <h3 className="text-[18px] md:text-[20px] font-bold mb-4">Peça agora seu orçamento!</h3>

          <form className="p-0 bg-[#E7E9F2] grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Campos do formulário */}
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Nome:</label>
              <input type="text" className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm" />
            </div>

            <div>
              <label className="block text-sm mb-1">E-mail:</label>
              <input type="email" className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm" />
            </div>

            <div>
              <label className="block text-sm mb-1">Whatsapp:</label>
              <input type="text" className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm" />
            </div>

            <div>
              <label className="block text-sm mb-1">Empresa:</label>
              <input type="text" className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm" />
            </div>

            <div>
              <label className="block text-sm mb-1">CNPJ:</label>
              <input type="text" className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm" />
            </div>

            <div>
              <label className="block text-sm mb-1">Cargo:</label>
              <input type="text" className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm" />
            </div>

            <div>
              <label className="block text-sm mb-1">Produto de interesse:</label>
              <input type="text" className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Mensagem:</label>
              <textarea rows={4} className="w-full border border-[#D3D6E2] bg-white rounded-md px-3 py-2 text-sm resize-none" />
            </div>

            <div className="md:col-span-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-1">
              <label className="flex items-start gap-2 text-xs leading-snug max-w-xl">
                <input type="checkbox" className="mt-0.5" />
                <span>Eu dou consentimento para processar meus dados pessoais e para futuras comunicações de marketing.</span>
              </label>

              <button className="self-start px-6 py-2 rounded-full text-sm font-semibold bg-[#E5258C] text-white">
                enviar
              </button>
            </div>

          </form>
        </div>

        {/* GRID FINAL AUTOMÁTICO COM AS IMAGENS 1–8 */}
        <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {gridImgs.map((src, i) => (
            <figure
              key={i}
              className="aspect-[4/3] rounded-xl overflow-hidden bg-[#D8DCE7]"
            >
              <img
                src={src}
                alt={`Projeto de envelopamento ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </figure>
          ))}
        </div>

      </section>
    </main>
  );
}
