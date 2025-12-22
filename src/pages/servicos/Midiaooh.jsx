// src/pages/servicos/Midiaooh.jsx
import { useState, useRef } from "react";
import Captcha from "../../components/Captcha";
import headerImg from "../../assets/midiaooh/header.png";
import img2 from "../../assets/midiaooh/img-2.png";
import { useForm } from "../../hooks/useForm";
import { 
  validateName, 
  validateEmail, 
  validatePhone, 
  validateCNPJ, 
  validateRequired,
  validateChecked
} from "../../utils/validation";

// Importa automaticamente TODAS as imagens da pasta midiaooh
const allImages = import.meta.glob("../../assets/midiaooh/*", {
  eager: true,
});

// Filtra só as numeradas (1,2,3...) e ignora header/img-2
const gridImgs = Object.entries(allImages)
  .filter(([path]) => {
    const file = path.split("/").pop(); // ex: "1.png"
    const name = file.split(".")[0]; // ex: "1"

    if (file === "header.png") return false;
    if (file === "img-2.png") return false;

    // mantém só arquivos cujo nome é número (1,2,3...)
    return /^\d+$/.test(name);
  })
  // garante ordem 1,2,3...
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, mod]) => mod.default ?? mod);

export default function Midiaooh() {
  const [lightboxImg, setLightboxImg] = useState(null);
  const [status, setStatus] = useState("idle");
  const [sent, setSent] = useState(false);
  const captchaRef = useRef(null);

  const initialValues = {
    nome: "",
    email: "",
    whatsapp: "",
    empresa: "",
    cnpj: "",
    cargo: "",
    produto_interesse: "",
    mensagem: "",
    consent: false
  };

  const validationRules = {
    nome: validateName,
    email: validateEmail,
    whatsapp: validatePhone,
    empresa: validateRequired,
    cnpj: validateCNPJ,
    cargo: (v) => "",
    produto_interesse: (v) => "",
    mensagem: validateRequired,
    consent: validateChecked
  };

  const { values, errors, handleChange, handleBlur, validateAll, resetForm } = useForm(initialValues, validationRules);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) {
      alert("Por favor, corrija os erros no formulário.");
      return;
    }

    setStatus("sending");

    const data = { ...values, formType: "midiaooh" };

    try {
      const response = await fetch("https://poster.flaviobrick.com.br/HB/api/submit-form.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (result.success) {
        setSent(true);
        setStatus("success");
        resetForm();
        if(captchaRef.current) captchaRef.current.reset();
      } else {
        setStatus("error");
        alert(result.message || "Erro ao enviar. Tente novamente.");
        if(captchaRef.current) captchaRef.current.refresh();
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      alert("Erro de conexão.");
    }
  };

  const getInputClass = (fieldName) => {
    const base = "w-full border bg-white rounded-md px-3 py-2 text-sm outline-none focus:border-[#E5258C] transition-colors";
    const error = "border-red-500 focus:border-red-500";
    const normal = "border-[#D3D6E2]";
    return `${base} ${errors[fieldName] ? error : normal}`;
  };

  return (
    <main className="bg-[#E7E9F2] text-[#4B4B48]">
      {/* HEADER */}
      <section className="w-full">
        <img
          src={headerImg}
          alt="Mídia OOH - header"
          className="w-full h-40 md:h-56 object-cover"
        />
      </section>

      {/* CONTEÚDO */}
      <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-14 items-start">
          {/* COLUNA DE TEXTO */}
          <div className="md:col-span-2">
            {/* BARRAS */}
            <div className="flex items-center mb-4">
              <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
              <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
              <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
              <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" />
            </div>

            {/* TÍTULO PRINCIPAL */}
            <h1 className="text-[28px] md:text-[36px] font-extrabold tracking-wide mb-6">
              MÍDIA OOH
            </h1>

            {/* SEÇÕES */}
            <div className="space-y-10 leading-relaxed text-[16px] md:text-[17px]">
              {/* 1️⃣ O que é mídia OOH? */}
              <div>
                <div className="relative mb-2">
                  <span
                    className="
                      hidden md:block absolute right-full mr-5
                      top-1/2 -translate-y-1/2
                      h-5 w-24 bg-[#E5258C] rounded-r-md
                    "
                  />
                  <h2 className="font-bold text-[18px] md:text-[20px]">
                    O que é mídia OOH?
                  </h2>
                </div>

                <p className="mb-3">
                  Na M2, mídia OOH (Out of Home) é tudo aquilo que leva a sua
                  mensagem para as ruas: outdoors, painéis de grande formato,
                  frontlights, backlights, empenas, mobiliário urbano, metrô,
                  BRT, VLT, terminais e aeroportos.
                </p>

                <p className="mb-3">
                  Planejamos e produzimos peças para OOH com foco em impacto e
                  legibilidade, garantindo consistência na cor e durabilidade
                  mesmo em condições de alta exposição.
                </p>

                <p className="mb-3">
                  Do planejamento à instalação, nossa operação 24/7 assegura
                  prazos competitivos em todo o Brasil.
                </p>

                <p className="mb-3">
                  Na M2, não cuidamos apenas da arte final: entregamos a solução
                  completa em produção gráfica para OOH.
                </p>
              </div>

              {/* 2️⃣ Por que investir em mídia OOH? */}
              <div>
                <div className="relative mb-2">
                  <span
                    className="
                      hidden md:block absolute right-full mr-5
                      top-1/2 -translate-y-1/2
                      h-5 w-24 bg-[#FFD400] rounded-r-md
                    "
                  />
                  <h2 className="font-bold text-[18px] md:text-[20px]">
                    Por que investir em mídia OOH?
                  </h2>
                </div>

                <p className="mb-3">
                  Investir em mídia OOH é colocar sua marca em contato diário
                  com milhares de pessoas, em ambientes de grande fluxo:
                </p>

                <ul className="list-disc ml-5 space-y-1.5">
                  <li>
                    Aumenta a visibilidade da marca em rotas estratégicas e
                    pontos de alto tráfego;
                  </li>
                  <li>
                    Complementa campanhas online, reforçando a mensagem no mundo
                    físico;
                  </li>
                  <li>
                    Gera impacto em poucos segundos, com peças pensadas para
                    leitura rápida;
                  </li>
                  <li>
                    Fortalece posicionamento, destacando presença em pontos
                    premium da cidade;
                  </li>
                  <li>
                    Alcança públicos diversos, sem depender de algoritmos ou
                    segmentações digitais.;
                  </li>
                </ul>

                <p className="mt-3">
                  Quando bem planejada e bem produzida, a mídia OOH se torna um
                  ativo de marca, ajudando a construir lembrança, autoridade e
                  preferência na hora da compra.
                </p>
              </div>

              {/* 3️⃣ Por que escolher a M2 para sua mídia OOH? */}
              <div>
                <div className="relative mb-2">
                  <span
                    className="
                      hidden md:block absolute right-full mr-5
                      top-1/2 -translate-y-1/2
                      h-5 w-24 bg-[#00B8F1] rounded-r-md
                    "
                  />
                  <h2 className="font-bold text-[18px] md:text-[20px]">
                    Por que escolher a M2 para sua mídia OOH?
                  </h2>
                </div>

                <p className="mb-3">
                  Na M2, não cuidamos apenas da arte final: entregamos a solução
                  completa em produção gráfica para OOH.
                </p>

                <p className="mb-3">
                  Planejamos e produzimos peças para OOH com foco em impacto,
                  legibilidade, durabilidade e consistência na cor mesmo em
                  condições de alta exposição.
                </p>

                <p className="mb-3">
                  Do planejamento à instalação, nossa operação 24/7 assegura
                  prazos competitivos em todo o Brasil.
                </p>

                <p className="mb-3">
                  Prazos competitivos, preparados para grande volume e formatos
                  especiais.
                </p>

                <p className="mb-3">
                  Controle de cor e padrão visual, essencial em campanhas
                  nacionais.
                </p>

                <p className="mb-3">
                  Materiais adequados para área externa, com resistência a
                  intempéries e alta durabilidade.
                </p>

                <p className="mb-3">
                  Equipe de instalação especializada, com atuação em diferentes
                  cidades e estados.
                </p>

                <p className="mb-3">
                  Acompanhamento e controle de qualidade em cada etapa da
                  produção à aplicação.
                </p>

                <p className="mb-3">
                  Atendemos campanhas nacionais mantendo o mesmo padrão de
                  qualidade em todas as praças, garantindo que sua marca seja
                  vista com a mesma força e cuidado.
                </p>
              </div>
            </div>
          </div>

          {/* IMAGEM À DIREITA */}
          <aside>
            <figure className="rounded-xl overflow-hidden bg-white shadow-sm">
              <img
                src={img2}
                alt="Projeto OOH"
                className="w-full h-[520px] object-cover"
              />
            </figure>
          </aside>
        </div>

        {/* FORMULÁRIO */}
        <div className="mt-16 md:mt-20">
          <h2 className="text-[18px] md:text-[20px] font-bold leading-snug">
            Gostou do que viu?
          </h2>
          <h3 className="text-[18px] md:text-[20px] font-bold mb-4">
            Peça agora seu orçamento!
          </h3>

          {sent ? (
             <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-center">
                <strong className="font-bold block mb-1">Sucesso!</strong>
                <span className="block mb-2">Seus dados foram enviados. Entraremos em contato em breve.</span>
                <button onClick={() => { setSent(false); setStatus("idle"); }} className="text-sm font-bold underline hover:text-green-900">Enviar novo</button>
             </div>
          ) : (
          <form onSubmit={onSubmit} className="p-0 bg-[#E7E9F2] grid grid-cols-1 md:grid-cols-2 gap-4" noValidate>

            <div className="md:col-span-2">
              <label className="text-sm mb-1 block">Nome:</label>
              <input 
                name="nome" 
                type="text" 
                value={values.nome}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClass("nome")} 
              />
              {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
            </div>

            <div>
              <label className="text-sm mb-1 block">E-mail:</label>
              <input 
                name="email" 
                type="email" 
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClass("email")} 
              />
               {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-sm mb-1 block">Whatsapp:</label>
              <input 
                name="whatsapp" 
                type="tel"
                value={values.whatsapp}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={15}
                className={getInputClass("whatsapp")} 
              />
              {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
            </div>

            <div>
              <label className="text-sm mb-1 block">Empresa:</label>
              <input 
                name="empresa" 
                type="text" 
                value={values.empresa}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClass("empresa")} 
              />
               {errors.empresa && <p className="text-red-500 text-xs mt-1">{errors.empresa}</p>}
            </div>

            <div>
              <label className="text-sm mb-1 block">CNPJ:</label>
              <input 
                name="cnpj" 
                type="text" 
                value={values.cnpj}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={18}
                className={getInputClass("cnpj")} 
              />
               {errors.cnpj && <p className="text-red-500 text-xs mt-1">{errors.cnpj}</p>}
            </div>

            <div>
              <label className="text-sm mb-1 block">Cargo:</label>
              <input 
                name="cargo" 
                type="text" 
                value={values.cargo}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClass("cargo")} 
              />
            </div>

            <div>
              <label className="text-sm mb-1 block">
                Produto de interesse:
              </label>
              <input 
                name="produto_interesse" 
                type="text" 
                value={values.produto_interesse}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClass("produto_interesse")} 
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm mb-1 block">Mensagem:</label>
              <textarea 
                name="mensagem"
                rows={4}
                value={values.mensagem}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClass("mensagem") + " resize-none"}
              />
              {errors.mensagem && <p className="text-red-500 text-xs mt-1">{errors.mensagem}</p>}
            </div>

            <div className="md:col-span-2">
               <Captcha ref={captchaRef} />
            </div>

            <div className="md:col-span-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-1">
              <label className="flex items-start gap-2 text-xs leading-snug max-w-xl">
                <input 
                    name="consent" 
                    type="checkbox" 
                    checked={values.consent}
                    onChange={handleChange}
                    className="mt-0.5" 
                />
                <span className={errors.consent ? "text-red-500" : ""}>
                    Eu dou consentimento para processar meus dados pessoais e para
                    futuras comunicações de marketing.
                </span>
              </label>

              <button disabled={status === "sending"} className="self-start px-6 py-2 rounded-full text-sm font-semibold bg-[#E5258C] text-white disabled:opacity-50">
                {status === "sending" ? "ENVIANDO..." : "ENVIAR"}
              </button>
            </div>
            {errors.consent && <p className="text-red-500 text-xs md:col-span-2">{errors.consent}</p>}
          </form>
          )}
        </div>

        {/* GRID FINAL — IMAGENS AUTOMÁTICAS (AGORA CLICÁVEIS) */}
        <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {gridImgs.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setLightboxImg(src)}
              className="aspect-[4/3] rounded-xl overflow-hidden bg-[#D8DCE7] cursor-pointer focus:outline-none"
              aria-label={`Abrir imagem ${i + 1} em tela cheia`}
            >
              <img
                src={src}
                alt={`Projeto OOH ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </button>
          ))}
        </div>
      </section>

      {/* LIGHTBOX (TELA CHEIA) */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
          onClick={() => setLightboxImg(null)}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxImg(null)}
              className="absolute -top-10 right-0 text-white text-3xl font-light hover:opacity-70"
              aria-label="Fechar"
              title="Fechar"
            >
              ×
            </button>

            <img
              src={lightboxImg}
              alt="Imagem ampliada"
              className="w-full max-h-[85vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </main>
  );
}
