import { useMemo, useState, useRef } from "react";
import WhatsAppButton from "../../components/WhatsAppButton";

// importa imagem do assets
import headerImg from "../../assets/avalieM2/header.png";
import Captcha from "../../components/Captcha";
import { useForm } from "../../hooks/useForm";
import { 
  validateName, 
  validateEmail, 
  validateRequired, 
  validateChecked 
} from "../../utils/validation";

export default function AvalieM2() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const captchaRef = useRef(null);

  const notas = useMemo(() => Array.from({ length: 11 }, (_, i) => i), []); // 0..10

  const initialValues = {
    nome: "",
    email: "",
    nota: "",
    ponto_positivo: "",
    melhorias: "",
    recomendaria: "",
    contato_posterior: "",
    comentarios: "",
    consent: false
  };

  const validationRules = {
    nome: validateName,
    email: validateEmail,
    nota: validateRequired,
    recomendaria: validateRequired,
    contato_posterior: validateRequired,
    consent: validateChecked,
    ponto_positivo: (v) => "", // Optional
    melhorias: (v) => "",      // Optional
    comentarios: (v) => ""     // Optional
  };

  const { values, errors, handleChange, handleBlur, validateAll, resetForm } = useForm(initialValues, validationRules);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) {
      alert("Por favor, corrija os erros no formulário (verifique todos os campos obrigatórios).");
      return;
    }

    setLoading(true);

    const data = { ...values, formType: "avalie_m2" };

    try {
        const response = await fetch("https://poster.flaviobrick.com.br/HB/api/submit-form.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        
        if (result.success) {
          setSent(true);
          resetForm();
          if(captchaRef.current) captchaRef.current.reset();
        } else {
          alert(result.message || "Erro ao enviar avaliação. Tente novamente.");
          if(captchaRef.current) captchaRef.current.reset();
        }
    } catch (error) {
        console.error(error);
        alert("Erro de conexão.");
    } finally {
        setLoading(false);
    }
  };

  const getInputClass = (fieldName) => {
    const base = "w-full rounded-md border bg-[#F6F7FB] px-3 py-2 outline-none focus:ring-2 focus:ring-[#E5258C]/30 transition-colors";
    const error = "border-red-500 focus:border-red-500";
    const normal = "border-[#D9DDE8]";
    return `${base} ${errors[fieldName] ? error : normal}`;
  };

  return (
    <main className="bg-[#F6F7FB] min-h-screen">
      {/* HEADER */}
      <div className="w-full h-[340px] overflow-hidden">
        <img
          src={headerImg}
          alt="Avalie a M2 - Header"
          className="w-full h-full object-cover object-right"
          onError={(e) => (e.currentTarget.src = headerImg)}
        />
      </div>

      {/* CONTEÚDO EMPILHADO */}
      <section className="py-10">
        <div className="max-w-4xl mx-auto px-6">
          {/* TEXTO INTRODUTÓRIO */}
          <div className="text-center md:text-left mb-10">
            {/* FAIXA COLORIDA */}
            <div className="max-w-6xl mx-auto px-6 mt-10 md:mt-14">
              <div className="flex w-full h-1.5 mb-5">
                <div className="flex-1 bg-[#E5258C]" />
                <div className="flex-1 bg-[#00B8F1]" />
                <div className="flex-1 bg-[#FFD400]" />
                <div className="flex-1 bg-[#1C1C1C]" />
              </div>
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-[#1C1C1C]">
              AVALIE <span className="inline-block">A M2</span>
            </h1>

            <p className="mt-4 text-lg text-[#4B4B48]">
              Sua opinião ajuda a construir uma M2 cada vez melhor
            </p>
            <p className="mt-2 text-[#4B4B48]">
              A M2 quer ouvir você — suas sugestões, elogios e ideias são
              essenciais para que possamos evoluir e oferecer experiências cada
              vez melhores.
            </p>
            <p className="mt-6 text-[#4B4B48]">
              Preencha o formulário abaixo e conte como foi sua experiência com
              a M2. Agradecemos por dedicar um momento do seu tempo para nos
              ajudar a crescer!
            </p>
          </div>

          {/* FORMULÁRIO */}
          <div>
            {sent ? (
              <div className="p-6 text-center">
                <p className="text-lg font-medium text-[#1C1C1C]">
                  Avaliação enviada com sucesso ✅
                </p>
                <p className="mt-2 text-[#4B4B48]">
                  Muito obrigado por compartilhar sua experiência com a M2.
                </p>
                <button
                  className="mt-6 inline-flex items-center justify-center px-5 py-2 rounded-md bg-[#E5258C] text-white"
                  onClick={() => setSent(false)}
                >
                  Enviar outra avaliação
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5" noValidate>
                {/* identificação */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                        name="nome"
                        placeholder="nome"
                        value={values.nome}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClass("nome")}
                    />
                    {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
                  </div>
                  <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="e-mail"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClass("email")}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* avaliação 0..10 */}
                <fieldset>
                  <legend className={`mb-2 block text-sm ${errors.nota ? "text-red-500 font-semibold" : "text-[#4B4B48]"}`}>
                    De 0 a 10, como você avalia sua experiência com a M2?
                  </legend>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {notas.map((n) => (
                      <label
                        key={n}
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-md border cursor-pointer hover:bg-white/40 transition-colors ${
                            String(values.nota) === String(n)
                              ? "bg-[#E5258C] text-white border-[#E5258C]"
                              : "bg-[#F6F7FB] border-[#D9DDE8]"
                          }`}
                        title={`Nota ${n}`}
                      >
                        <input
                          type="radio"
                          name="nota"
                          value={n}
                          checked={String(values.nota) === String(n)}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <span>{n}</span>
                      </label>
                    ))}
                  </div>
                  {errors.nota && <p className="text-red-500 text-xs mt-1">Selecione uma nota</p>}
                </fieldset>

                {/* perguntas abertas */}
                <div>
                    <textarea
                        name="ponto_positivo"
                        rows="2"
                        placeholder="O que você mais gostou em nosso atendimento/produto/serviço?"
                        value={values.ponto_positivo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClass("ponto_positivo") + " resize-y"}
                    />
                </div>
                
                <div>
                    <label className="block text-sm text-[#4B4B48] mb-1">Tem algo que você acha que poderíamos fazer melhor?</label>
                    <textarea
                        name="melhorias"
                        rows="2"
                        value={values.melhorias}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClass("melhorias") + " resize-y"}
                    />
                </div>

                {/* recomendaria */}
                <fieldset>
                  <legend className={`mb-2 block text-sm ${errors.recomendaria ? "text-red-500 font-semibold" : "text-[#4B4B48]"}`}>
                    Você recomendaria a M2 para outras pessoas?
                  </legend>
                  <div className="flex flex-wrap gap-3">
                    {["Sim", "Não", "Talvez"].map((opt) => (
                      <label
                        key={opt}
                        className="inline-flex items-center gap-2"
                      >
                        <input
                          type="radio"
                          name="recomendaria"
                          value={opt.toLowerCase()}
                          checked={values.recomendaria === opt.toLowerCase()}
                          onChange={handleChange}
                          className="h-4 w-4 accent-[#E5258C]"
                        />
                        <span className="text-[#4B4B48]">{opt}</span>
                      </label>
                    ))}
                  </div>
                  {errors.recomendaria && <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>}
                </fieldset>

                {/* contato posterior */}
                <fieldset>
                  <legend className={`mb-2 block text-sm ${errors.contato_posterior ? "text-red-500 font-semibold" : "text-[#4B4B48]"}`}>
                    Deseja que entremos em contato para falar sobre sua avaliação?
                  </legend>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { v: "email", label: "Sim, por e-mail" },
                      { v: "whatsapp", label: "Sim, por WhatsApp" },
                      { v: "nao", label: "Não é necessário" },
                    ].map((o) => (
                      <label
                        key={o.v}
                        className="inline-flex items-center gap-2"
                      >
                        <input
                          type="radio"
                          name="contato_posterior"
                          value={o.v}
                          checked={values.contato_posterior === o.v}
                          onChange={handleChange}
                          className="h-4 w-4 accent-[#E5258C]"
                        />
                        <span className="text-[#4B4B48]">{o.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.contato_posterior && <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>}
                </fieldset>

                {/* comentários extras */}
                <div>
                    <textarea
                        name="comentarios"
                        rows="3"
                        placeholder="Comentários adicionais (opcional)"
                        value={values.comentarios}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClass("comentarios") + " resize-y"}
                    />
                </div>

                {/* captcha */}
                <div>
                   <Captcha ref={captchaRef} />
                </div>

                {/* consentimento */}
                <div>
                    <label className="flex items-start gap-2 text-sm text-[#4B4B48]">
                        <input
                            type="checkbox"
                            name="consent"
                            checked={values.consent}
                            onChange={handleChange}
                            className="mt-1"
                        />
                        <span className={errors.consent ? "text-red-500" : ""}>
                            Li e dou consentimento para processar meus dados pessoais de
                            acordo com as finalidades comerciais e de marketing.
                        </span>
                    </label>
                    {errors.consent && <p className="text-red-500 text-xs mt-1">{errors.consent}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center px-6 py-2 rounded-md bg-[#E5258C] text-white disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Enviando..." : "enviar"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <WhatsAppButton />
    </main>
  );
}
