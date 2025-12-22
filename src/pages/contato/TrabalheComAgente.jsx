import { useState, useRef } from "react";
import WhatsAppButton from "../../components/WhatsAppButton";
import headerImg from "../../assets/trabalheComAgente/header.png";
import Captcha from "../../components/Captcha";
import { useForm } from "../../hooks/useForm";
import { 
  validateName, 
  validateEmail, 
  validatePhone, 
  validateChecked,
  validateRequired
} from "../../utils/validation";

export default function TrabalheComAgente() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [fileName, setFileName] = useState("");
  const captchaRef = useRef(null);

  const initialValues = {
    nome: "",
    email: "",
    whatsapp: "",
    resumo: "",
    consent: false
  };

  const validationRules = {
    nome: validateName,
    email: validateEmail,
    whatsapp: validatePhone,
    consent: validateChecked,
    resumo: (val) => "" // Optional
  };

  const { values, errors, handleChange, handleBlur, validateAll, resetForm } = useForm(initialValues, validationRules);

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return setFileName("");
    
    // Validar apenas PDF
    if (f.type !== "application/pdf") {
      alert("Apenas arquivos PDF são permitidos.");
      e.target.value = "";
      return setFileName("");
    }
    
    if (f.size > 5 * 1024 * 1024) {
      alert("Arquivo muito grande. Máximo 5MB.");
      e.target.value = "";
      return setFileName("");
    }
    setFileName(f.name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) {
      alert("Por favor, corrija os erros no formulário.");
      return;
    }

    // Check file manually
    if (!fileName) {
        alert("Por favor, anexe seu currículo.");
        return;
    }

    setLoading(true);
    
    // Usar FormData diretamente para envio de arquivo
    const form = new FormData(e.currentTarget);
    
    // Adiciona type se não estiver no form (embora já deva estar pelos inputs)
    if (!form.has("formType")) {
        form.append("formType", "trabalhe_conosco");
    }

    try {
      const response = await fetch("https://poster.flaviobrick.com.br/HB/api/submit-form.php", {
        method: "POST",
        body: form
      });
      const result = await response.json();
      
      if (result.success) {
        setSent(true);
        resetForm();
        setFileName("");
        if(captchaRef.current) captchaRef.current.reset();
      } else {
        alert(result.message || "Erro ao enviar. Tente novamente.");
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
          alt="Trabalhe com a gente - Header"
          className="w-full h-full object-cover object-right"
          onError={(e) => (e.currentTarget.src = headerImg)}
        />
      </div>

      {/* CONTEÚDO */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-6xl mx-auto px-6 mt-10 md:mt-14"></div>
          <div className="flex  mb-5 h-1.5">
            <span className="w-16 bg-[#E5258C]" />
            <span className="w-16 bg-[#00B8F1]" />
            <span className="w-16 bg-[#FFD400]" />
            <span className="w-16 bg-[#1C1C1C]" />
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* texto */}
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-[#1C1C1C]">
                TRABALHE COM A GENTE
              </h1>
              <p className="mt-4 text-lg text-[#4B4B48]">
                A M2 cresce com pessoas que acreditam no poder da inovação!
                Aqui, cada projeto é uma oportunidade de criar algo novo,
                superar desafios e transformar ideias em resultados reais.
              </p>
              <br />
              <p className="mt-2 text-[#4B4B48]">
                Quer fazer parte de uma equipe que respira tecnologia,
                criatividade e compromisso com o futuro sustentável? Envie seu
                currículo e venha construir com a gente o próximo capítulo da
                M2!
              </p>
            </div>

            {/* formulário com bordas nos inputs */}
            <div>
              {sent ? (
                <div className="p-6 text-center">
                  <p className="text-lg font-medium text-[#1C1C1C]">
                    Envio realizado com sucesso ✅
                  </p>
                  <p className="mt-2 text-[#4B4B48]">
                    Nosso time vai analisar seu perfil e retornará em breve.
                  </p>
                  <button
                    className="mt-6 inline-flex items-center justify-center px-5 py-2 rounded-md bg-[#E5258C] text-white"
                    onClick={() => setSent(false)}
                  >
                    Enviar outro currículo
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4" noValidate>
                  {/* linha 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        name="nome"
                        placeholder="nome:"
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
                        placeholder="e-mail:"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClass("email")}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* linha 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <input
                            name="whatsapp"
                            placeholder="whatsapp (DDD + número):"
                            value={values.whatsapp}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={15}
                            className={getInputClass("whatsapp")}
                        />
                        {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
                    </div>
                    <div className="hidden sm:block" />
                  </div>

                  {/* resumo */}
                  <div>
                    <textarea
                        name="resumo"
                        rows="5"
                        placeholder="resumo profissional:"
                        value={values.resumo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClass("resumo") + " resize-y"}
                    />
                    {/* Optional, no error msg unless we make it required */}
                  </div>

                  {/* upload currículo */}
                  <div>
                    <label className="block text-sm text-[#4B4B48] mb-2">
                      Anexe seu currículo (PDF) <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="inline-flex items-center px-4 py-2 rounded-md border border-[#D9DDE8] bg-[#F6F7FB] cursor-pointer hover:bg-[#f1f1f1]">
                        <input
                          type="file"
                          name="curriculo"
                          accept=".pdf"
                          className="hidden"
                          onChange={onFileChange}
                        />
                        <span>selecionar arquivo</span>
                      </label>
                      <span className="text-sm text-[#4B4B48] truncate">
                        {fileName || "nenhum arquivo selecionado"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#8B8E99]">
                      Tamanho máximo: 5MB.
                    </p>
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
                        Autorizo o uso dos meus dados para contato relacionado à
                        minha candidatura.
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
        </div>
      </section>

      <WhatsAppButton />
    </main>
  );
}
