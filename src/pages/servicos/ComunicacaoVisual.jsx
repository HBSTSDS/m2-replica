// src/pages/servicos/ComunicacaoVisual.jsx
import { useState, useRef } from "react";
import Captcha from "../../components/Captcha";
import headerImg from "../../assets/comunicacaoVisual/header.png";
import img2 from "../../assets/comunicacaoVisual/img2.png";
import { useForm } from "../../hooks/useForm";
import { 
  validateName, 
  validateEmail, 
  validatePhone, 
  validateCNPJ, 
  validateRequired,
  validateChecked
} from "../../utils/validation";

// Pega TODAS as imagens da pasta automaticamente (qualquer nome/extensão)
const allImages = import.meta.glob(
  "../../assets/comunicacaoVisual/*",
  {
    eager: true,
  }
);

// Monta array só com as imagens que NÃO são o header nem a img2
const gridImgs = Object.entries(allImages)
  .filter(([path]) => {
    // exclui header e img2
    return (
      !path.endsWith("/header.png") &&
      !path.endsWith("/img2.png")
    );
  })
  .map(([, mod]) => {
    // cada módulo vem como { default: 'url-da-imagem' }
    // então pegamos mod.default
    // se por algum motivo não tiver default, cai no fallback mod
    return mod.default ?? mod;
  });

export default function ComunicacaoVisual() {
  const [status, setStatus] = useState("idle");
  const [sent, setSent] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);
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
    empresa: validateRequired, // Required per user request
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

    const data = { ...values, formType: "comunicacao_visual" };

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
      {/* HEADER (MANTIDO) */}
      <section className="w-full">
        <img
          src={headerImg}
          alt="Comunicação Visual - header"
          className="w-full h-40 md:h-56 object-cover"
        />
      </section>

      {/* CONTEÚDO */}
      <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        {/* GRID TEXTO + IMAGEM */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-14 items-start">
          {/* COLUNA DE TEXTO */}
          <div className="md:col-span-2">
            {/* Faixas coloridas + título principal (MANTIDOS) */}
            <div className="flex items-center mb-4">
              <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
              <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
              <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
              <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" />
            </div>

            <h1 className="text-[28px] md:text-[36px] font-extrabold tracking-wide mb-6">
              COMUNICAÇÃO VISUAL
            </h1>

            {/* ------ MIÓLO ------ */}
            <div className="space-y-8 leading-relaxed text-[16px] md:text-[17px]">
              {/* 1️⃣ O QUE É COMUNICAÇÃO VISUAL */}
              <div>
                {/* Etiqueta 100% fora do container */}
                <div className="relative mb-2">
                  <span
                    className="
                      hidden md:block
                      absolute right-full mr-5
                      top-1/2 -translate-y-1/2
                      h-5 w-24
                      bg-[#E5258C]
                      rounded-r-md
                    "
                  />
                  <h2 className="font-bold text-[18px] md:text-[20px] leading-tight">
                    O que é comunicação visual?
                  </h2>
                </div>

                <p className="mb-3">
                  Comunicação visual é o conjunto de elementos que levam a
                  identidade da sua marca para o mundo real com impacto, clareza e
                  propósito, seja em loja, na rua, em eventos ou feiras.
                </p>
                <p>
                  Na M2, quando falamos em comunicação visual, falamos em
                  transformar ideias em presença física: impressos em geral,
                  acabamento, montagem e instalação. É o encontro entre criação e
                  indústria gráfica, materializando campanhas em produtos físicos,
                  displays, sinalização, adesivos e materiais de ponto de venda.
                </p>
              </div>

              {/* 2️⃣ POR QUE INVESTIR */}
              <div>
                <div className="relative mb-2">
                  <span
                    className="
                      hidden md:block
                      absolute right-full mr-5
                      top-1/2 -translate-y-1/2
                      h-5 w-24
                      bg-[#FFD400]
                      rounded-r-md
                    "
                  />
                  <h2 className="font-bold text-[18px] md:text-[20px] leading-tight">
                    Por que investir em comunicação visual?
                  </h2>
                </div>

                <ul className="list-disc ml-5 space-y-1.5">
                  <li>
                    Chamar a atenção do cliente em meio a tantos estímulos
                    visuais;
                  </li>
                  <li>
                    Reforçar a identidade da marca, criando memória afetiva e
                    reconhecimento;
                  </li>
                  <li>
                    Comunicar campanhas, preços e ofertas de forma rápida e
                    objetiva;
                  </li>
                  <li>
                    Transmitir organização, profissionalismo e confiança,
                    impactando diretamente a decisão de compra.
                  </li>
                </ul>

                <p className="mt-3">
                  Uma imagem bem planejada e bem impressa transmite a mensagem
                  em segundos. Ela informa, orienta e convence o cliente que
                  circula pelo seu espaço, colocando sua marca um passo à frente
                  no ponto de venda.
                </p>
              </div>

              {/* 3️⃣ POR QUE ESCOLHER A M2 */}
              <div>
                <div className="relative mb-2">
                  <span
                    className="
                      hidden md:block
                      absolute right-full mr-5
                      top-1/2 -translate-y-1/2
                      h-5 w-24
                      bg-[#00B8F1]
                      rounded-r-md
                    "
                  />
                  <h2 className="font-bold text-[18px] md:text-[20px] leading-tight">
                    Por que escolher a M2 para sua comunicação visual?
                  </h2>
                </div>

                <p className="mb-3">
                  Na M2, unimos estratégia, design e um parque gráfico de alta
                  performance para entregar soluções completas em comunicação
                  visual, ou seja, do planejamento à instalação.
                </p>

                <ul className="list-disc ml-5 space-y-1.5">
                  <li>
                    Escala e agilidade para campanhas de varejo e grandes redes;
                  </li>
                  <li>
                    Consistência de cores e padrões entre os materiais, mesmo em
                    diferentes formatos;
                  </li>
                  <li>
                    Acabamento premium, com foco em durabilidade e apresentação
                    impecável;
                  </li>
                  <li>
                    Processos competitivos, inclusive em produções de alto volume;
                  </li>
                  <li>
                    Equipe especializada em instalação, garantindo que o projeto
                    saia do papel exatamente como foi criado.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* IMAGEM À DIREITA (MANTIDA) */}
          <aside className="md:pl-2">
            <figure className="rounded-xl overflow-hidden shadow-sm bg-white">
              <img
                src={img2}
                alt="Projeto de comunicação visual"
                className="w-full h-[450px] md:h-[520px] object-cover"
              />
            </figure>
          </aside>
        </div>

        {/* FORMULÁRIO (sem borda externa, fundo igual ao site) */}
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
            {/* Nome */}
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Nome:</label>
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

            {/* E-mail | Whatsapp */}
            <div>
              <label className="block text-sm mb-1">E-mail:</label>
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
              <label className="block text-sm mb-1">Whatsapp:</label>
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

            {/* Empresa | CNPJ */}
            <div>
              <label className="block text-sm mb-1">Empresa:</label>
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
              <label className="block text-sm mb-1">CNPJ:</label>
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

            {/* Cargo | Produto de interesse */}
            <div>
              <label className="block text-sm mb-1">Cargo:</label>
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
              <label className="block text-sm mb-1">Produto de interesse:</label>
              <input
                name="produto_interesse"
                type="text"
                value={values.produto_interesse}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClass("produto_interesse")}
              />
            </div>

            {/* Mensagem */}
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Mensagem:</label>
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
            
            {/* Captcha */}
            <div className="md:col-span-2">
              <Captcha ref={captchaRef} />
            </div>

            {/* Checkbox + botão */}
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
                  Eu dou consentimento para processar meus dados pessoais e
                  confidenciais e para futuras comunicações de marketing.
                </span>
              </label>

              <button
                disabled={status === "sending"}
                type="submit"
                className="self-start px-6 py-2 rounded-full text-sm font-semibold bg-[#E5258C] text-white hover:bg-[#c91f77] transition-colors disabled:opacity-50"
              >
                {status === "sending" ? "ENVIANDO..." : "enviar"}
              </button>
            </div>
            {errors.consent && <p className="text-red-500 text-xs md:col-span-2">{errors.consent}</p>}
          </form>
          )}
        </div>

        {/* GRID FINAL (AGORA COM AS IMAGENS) */}
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
                alt={`Projeto de comunicação visual ${i + 1}`}
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
            {/* Botão fechar */}
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
