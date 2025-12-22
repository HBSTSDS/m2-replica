import React, { useState, useRef } from 'react';
import Captcha from "./Captcha";
import { useForm } from "../hooks/useForm";
import { 
  validateName, 
  validateEmail, 
  validatePhone, 
  validateCNPJ, 
  validateRequired
} from "../utils/validation";

export default function RedBoxForm() {
  const [status, setStatus] = useState("idle"); // idle, sending, success, error
  const captchaRef = useRef(null);

  const initialValues = {
    nome: "",
    email: "",
    whatsapp: "",
    empresa: "",
    cnpj: "",
    produto_interesse: "",
    formato: "",
    quantidade: "",
    obs: "",
    source_redes: false,
    source_google: false,
    source_indicacao: false,
    source_email: false,
    source_outros: false,
    source_impressos: false,
    consent: "" // Radio sim/nao
  };

  const validationRules = {
    nome: validateName,
    email: validateEmail,
    whatsapp: validatePhone,
    consent: validateRequired, // Must select yes/no
    empresa: (v) => "", // Optional in this landing? Or required? Standardizing optional as per original unless specific request. Original didn't have required.
    cnpj: validateCNPJ,
    produto_interesse: (v) => "",
    formato: (v) => "",
    quantidade: (v) => "",
    obs: (v) => ""
  };

  const { values, errors, handleChange, handleBlur, validateAll, resetForm } = useForm(initialValues, validationRules);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) {
      alert("Por favor, corrija os erros no formulário (verifique todos os campos obrigatórios).");
      return;
    }

    if (values.consent !== "sim") {
        alert("É necessário dar o consentimento para prosseguir.");
        return;
    }

    setStatus("sending");

    // Prepare Data
    const data = { ...values, formType: "redbox_landing" };

    // Tratar checkboxes de "Como conheceu"
    const sources = [];
    if (values.source_redes) sources.push("Redes Sociais");
    if (values.source_google) sources.push("Google/Sites de Busca");
    if (values.source_indicacao) sources.push("Indicação");
    if (values.source_email) sources.push("E-mail Marketing");
    if (values.source_outros) sources.push("Outros");
    if (values.source_impressos) sources.push("Impressos");
    
    data.sources = sources.join(", ");

    try {
      const response = await fetch("https://poster.flaviobrick.com.br/HB/api/submit-form.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        resetForm();
        if(captchaRef.current) captchaRef.current.refresh();
      } else {
        alert(result.message || "Erro no envio. Tente novamente.");
        setStatus("error");
        if(captchaRef.current) captchaRef.current.refresh();
      }
    } catch (error) {
      console.error("Erro no envio:", error);
      setStatus("error");
    }
  };

  const getInputClass = (fieldName) => {
    const base = "w-full bg-white rounded-lg px-4 py-3 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E5258C] transition-colors border";
    const error = "border-red-500 focus:border-red-500";
    const normal = "border-transparent"; // Original didn't have border, just bg-white. But added one for consistency? Original was just input.
    return `${base} ${errors[fieldName] ? error : normal}`;
  };

  return (
    <section className="w-full bg-[#403F3D] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 uppercase font-bricolage">
          Faça um orçamento <br />
          com a gente!
        </h2>

        {status === "success" ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-center mb-8" role="alert">
                <strong className="font-bold block mb-1">Sucesso!</strong>
                <span className="block mb-2">Seus dados foram enviados. Entraremos em contato em breve.</span>
                <button onClick={() => setStatus("idle")} className="text-sm font-bold underline hover:text-green-900">Enviar novo</button>
            </div>
        ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Nome */}
          <div>
            <input 
              name="nome"
              placeholder="Nome:" 
              value={values.nome}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass("nome")}
            />
            {errors.nome && <p className="text-red-400 text-xs mt-1 font-semibold">{errors.nome}</p>}
          </div>

          {/* Email + Whatsapp */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <input 
                type="email" 
                name="email"
                placeholder="E-mail:" 
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClass("email")}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1 font-semibold">{errors.email}</p>}
            </div>
            <div>
                <input 
                name="whatsapp"
                placeholder="Whatsapp:" 
                value={values.whatsapp}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={15}
                className={getInputClass("whatsapp")}
                />
                {errors.whatsapp && <p className="text-red-400 text-xs mt-1 font-semibold">{errors.whatsapp}</p>}
            </div>
          </div>

          {/* Empresa + CNPJ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <input 
                name="empresa"
                placeholder="Empresa:" 
                value={values.empresa}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClass("empresa")}
                />
            </div>
            <div>
                <input 
                name="cnpj"
                placeholder="CNPJ:" 
                value={values.cnpj}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={18}
                className={getInputClass("cnpj")}
                />
                 {errors.cnpj && <p className="text-red-400 text-xs mt-1 font-semibold">{errors.cnpj}</p>}
            </div>
          </div>

          {/* Produto de interesse */}
          <div>
            <textarea 
              name="produto_interesse"
              rows="3"
              placeholder="Produto(s) de interesse:" 
              value={values.produto_interesse}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass("produto_interesse") + " resize-none"}
            ></textarea>
          </div>

          {/* Formato */}
          <div>
            <input 
              name="formato"
              placeholder="Formato:" 
              value={values.formato}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass("formato")}
            />
          </div>

          {/* Quantidade */}
          <div>
            <input 
              name="quantidade"
              placeholder="Quantidade:" 
              value={values.quantidade}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass("quantidade")}
            />
          </div>

          {/* Observações */}
          <div>
            <textarea 
              name="obs"
              rows="3"
              placeholder="Observações:" 
              value={values.obs}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass("obs") + " resize-none"}
            ></textarea>
          </div>

          {/* Arquivo - Visual apenas por enquanto */}
          <div className="pt-4">
            <p className="text-white mb-2 font-poppins text-sm">Enviar arte e/ou arquivos de referência (Link ou WeTransfer recomendado nas obs):</p>
            <label className="inline-block bg-white text-gray-600 px-6 py-2 rounded cursor-pointer hover:bg-gray-100 transition-colors font-poppins text-sm opacity-50 cursor-not-allowed" title="Upload direto em breve">
              Escolher arquivos
              <input type="file" className="hidden" disabled />
            </label>
          </div>

          <div className="text-white">
             <Captcha ref={captchaRef} />
          </div>

          {/* Como conheceu */}
          <div className="pt-6">
             <p className="text-white mb-3 font-bold font-poppins">Como ficou conhecendo a M2?</p>
             <div className="space-y-2 text-white font-poppins text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                   <input type="checkbox" name="source_redes" checked={values.source_redes} onChange={handleChange} className="w-4 h-4 rounded text-[#E5258C] focus:ring-[#E5258C]" />
                   Redes Sociais
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                   <input type="checkbox" name="source_impressos" checked={values.source_impressos} onChange={handleChange} className="w-4 h-4 rounded text-[#E5258C] focus:ring-[#E5258C]" />
                   Impressos
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                   <input type="checkbox" name="source_indicacao" checked={values.source_indicacao} onChange={handleChange} className="w-4 h-4 rounded text-[#E5258C] focus:ring-[#E5258C]" />
                   Indicação
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                   <input type="checkbox" name="source_google" checked={values.source_google} onChange={handleChange} className="w-4 h-4 rounded text-[#E5258C] focus:ring-[#E5258C]" />
                   Sites de Busca
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                   <input type="checkbox" name="source_email" checked={values.source_email} onChange={handleChange} className="w-4 h-4 rounded text-[#E5258C] focus:ring-[#E5258C]" />
                   E-mail Marketing
                </label>
                 <label className="flex items-center gap-2 cursor-pointer">
                   <input type="checkbox" name="source_outros" checked={values.source_outros} onChange={handleChange} className="w-4 h-4 rounded text-[#E5258C] focus:ring-[#E5258C]" />
                   Outros
                </label>
             </div>
          </div>

          {/* Consentimento */}
          <div className="pt-6">
             <p className="text-white text-sm mb-3 font-poppins leading-relaxed">
               Eu dou consentimento para processar meus dados pessoais e confidenciais e para futuras comunicações de marketing.
             </p>
             <div className="flex gap-6 text-white font-poppins text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                   <input type="radio" name="consent" value="sim" checked={values.consent === "sim"} onChange={handleChange} className="w-4 h-4 text-[#E5258C] focus:ring-[#E5258C]" />
                   Sim
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                   <input type="radio" name="consent" value="nao" checked={values.consent === "nao"} onChange={handleChange} className="w-4 h-4 text-[#E5258C] focus:ring-[#E5258C]" />
                   Não
                </label>
             </div>
             {errors.consent && <p className="text-red-400 text-xs mt-1 font-semibold">Campo obrigatório</p>}
          </div>

          {/* Botão Enviar */}
          <div className="pt-8">
             <button 
               type="submit" 
               disabled={status === "sending"}
               className="bg-[#E5258C] hover:bg-[#C41572] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-12 rounded-lg transition-all uppercase tracking-wide text-lg"
             >
               {status === "sending" ? "ENVIANDO..." : "ENVIAR"}
             </button>
          </div>

          {status === "error" && (
            <p className="text-red-400 text-center text-sm mt-2 font-bold">Erro ao enviar. Tente novamente ou entre em contato pelo Whatsapp.</p>
          )}

        </form>
        )}
      </div>
    </section>
  );
}
