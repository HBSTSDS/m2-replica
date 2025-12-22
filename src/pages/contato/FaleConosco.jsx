import { useState, useRef } from "react";
import WhatsAppButton from "../../components/WhatsAppButton";
import headerImg from "../../assets/faleConosco/header.png";
import Captcha from "../../components/Captcha";
import { useForm } from "../../hooks/useForm";
import { 
  validateName, 
  validateEmail, 
  validatePhone, 
  validateCNPJ, 
  validateRequired, 
  validateChecked 
} from "../../utils/validation";

export default function FaleConosco() {
  const [status, setStatus] = useState("idle"); 
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const captchaRef = useRef(null);

  // 1. Initial Values
  const initialValues = {
    nome: "",
    empresa: "",
    cnpj: "",
    email: "",
    whatsapp: "",
    mensagem: "",
    consent: false
  };

  // 2. Validation Rules
  const validationRules = {
    nome: validateName,
    empresa: validateRequired,
    cnpj: validateCNPJ,   // Optional but if filled must be valid
    email: validateEmail,
    whatsapp: validatePhone,
    mensagem: validateRequired,
    consent: validateChecked
  };

  // 3. Setup Hook
  const { values, errors, handleChange, handleBlur, validateAll, resetForm } = useForm(initialValues, validationRules);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // 4. Validate All on Submit
    if (!validateAll()) {
      alert("Por favor, corrija os erros no formulário.");
      return;
    }

    setLoading(true);
    setStatus("sending");
    
    // Build Data
    const data = { ...values, formType: "fale_conosco" };

    try {
      const response = await fetch("https://poster.flaviobrick.com.br/HB/api/submit-form.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();

      if (result.success) {
        setSent(true);
        setStatus("success");
        resetForm();
        if(captchaRef.current) captchaRef.current.reset();
      } else {
        setStatus("error");
        alert(result.message || "Erro ao enviar mensagem. Tente novamente.");
        if(captchaRef.current) captchaRef.current.reset();
      }
    } catch (error) {
      console.error("Erro no envio:", error);
      setStatus("error");
      alert("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  // Helper for Input Classes
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
          alt="Fale Conosco - Header"
          className="w-full h-full object-cover object-right"
          onError={(e) => { e.currentTarget.src = headerImg; }}
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
            {/* Texto */}
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-[#1C1C1C]">
                FALE CONOSCO
              </h1>
              <p className="mt-4 text-lg text-[#4B4B48]">
                Sua opinião é muito importante para a M2!
              </p>
              <p className="mt-2 text-[#4B4B48]">
                Envie suas dúvidas, críticas ou sugestões preenchendo o
                formulário ao lado. Nossa equipe analisará sua mensagem e
                retornará o contato o quanto antes.
              </p>
              <br />
              <h3>📞 Telefones</h3>
              <ul>
                <li><a href="https://wa.me/5521973222743" target="_blank">(21) 97322-2743 (Rio)</a></li>
                <li><a href="https://wa.me/5511972451120" target="_blank">(11) 97245-1120 (São Paulo)</a></li>
              </ul>
              <br />
              <h3>📧 E-mail</h3>
              <ul>
                <li><a href="mailto:contato@m2flex.com.br">contato@m2flex.com.br</a></li>
                <li><a href="mailto:comercial@m2flex.com.br">comercial@m2flex.com.br</a></li>
              </ul>
              <br />
              <h3>📍 Unidades</h3>
              <ul>
                <li><a href="https://www.google.com/maps?q=Av.+Brasil,+12025,+Penha,+Rio+de+Janeiro" target="_blank">RJ – Av. Brasil, 12.025 – Penha</a></li>
                <li><a href="https://www.google.com/maps?q=Rua+Augusto+Corrêa,+6,+Capela+do+Socorro,+São+Paulo" target="_blank">SP – Rua Augusto Corrêa, 6 – Capela do Socorro</a></li>
              </ul>
            </div>

            {/* Formulário */}
            <div>
              {sent ? (
                <div className="p-6 text-center">
                  <p className="text-lg font-medium text-[#1C1C1C]">Mensagem enviada com sucesso ✅</p>
                  <p className="mt-2 text-[#4B4B48]">Obrigado por entrar em contato. Em breve retornaremos.</p>
                  <button
                    className="mt-6 inline-flex items-center justify-center px-5 py-2 rounded-md bg-[#E5258C] text-white"
                    onClick={() => setSent(false)}
                  >
                    Enviar outra mensagem
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
                        name="empresa"
                        placeholder="empresa:"
                        value={values.empresa}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClass("empresa")}
                      />
                      {errors.empresa && <p className="text-red-500 text-xs mt-1">{errors.empresa}</p>}
                    </div>
                  </div>

                  {/* linha 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        name="cnpj"
                        placeholder="cnpj:"
                        value={values.cnpj}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={18} // Basic limit
                        className={getInputClass("cnpj")}
                      />
                      {errors.cnpj && <p className="text-red-500 text-xs mt-1">{errors.cnpj}</p>}
                    </div>
                    <div>
                      <input
                        name="email"
                        placeholder="e-mail:"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClass("email")}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* linha 3 */}
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

                  {/* mensagem */}
                  <div>
                    <textarea
                      name="mensagem"
                      rows="5"
                      placeholder="mensagem"
                      value={values.mensagem}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClass("mensagem") + " resize-y"}
                    />
                    {errors.mensagem && <p className="text-red-500 text-xs mt-1">{errors.mensagem}</p>}
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
                        Li e dou consentimento para processar meus dados pessoais
                        de acordo com as finalidades comerciais e de marketing.
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
