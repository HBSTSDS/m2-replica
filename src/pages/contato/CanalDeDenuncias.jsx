import { useState, useRef, useEffect } from "react";
import WhatsAppButton from "../../components/WhatsAppButton";
import Captcha from "../../components/Captcha";
import { useForm } from "../../hooks/useForm";
import { 
  validateRequired, 
  validateChecked 
} from "../../utils/validation";
import { FaLock, FaUpload } from "react-icons/fa";

export default function CanalDeDenuncias() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const captchaRef = useRef(null);
  const fileInputRef = useRef(null);

  const initialValues = {
    nome: "",
    tipo_ocorrencia: "",
    data_ocorrido: "",
    local_ocorrido: "",
    descricao: "",
    consent: false
  };

  const validationRules = {
    nome: (v) => "", // Opcional
    tipo_ocorrencia: validateRequired,
    data_ocorrido: validateRequired,
    local_ocorrido: validateRequired,
    descricao: validateRequired,
    consent: validateChecked
  };

  const { values, errors, handleChange, handleBlur, validateAll, resetForm } = useForm(initialValues, validationRules);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);

    const recaptchaToken = captchaRef.current?.getToken();
    if (!recaptchaToken) {
      alert("Por favor, marque a caixa \"Não sou um robô\".");
      setLoading(false);
      return;
    }

    const form = new FormData(e.currentTarget);
    form.append("g-recaptcha-response", recaptchaToken);
    form.append("formType", "canal_denuncia");

    Object.keys(values).forEach(key => {
        if (key !== 'consent') {
            form.set(key, values[key]);
        }
    });

    try {
      const response = await fetch("/api/submit-form.php", {
        method: "POST",
        body: form
      });
      const result = await response.json();
      
      if (result.success) {
        setSent(true);
        resetForm();
        if(captchaRef.current) captchaRef.current.reset();
      } else {
        alert(result.message || "Erro ao enviar denúncia. Tente novamente.");
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
    const base = "w-full rounded-lg border bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#00B8F1]/20 transition-all placeholder:text-gray-300 text-gray-700";
    const error = "border-red-500 focus:border-red-500";
    const normal = "border-[#D9DDE8]";
    return `${base} ${errors[fieldName] ? error : normal}`;
  };

  return (
    <main className="bg-white min-h-screen pb-20 pt-16">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* TEXTO SUPERIOR */}
        <div className="text-center mb-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Formulário de Denúncia Interna
            </h1>
            <p className="text-[13px] text-gray-500 leading-relaxed max-w-3xl mx-auto">
              Este formulário foi criado para que você possa reportar, de forma anônima e segura, qualquer situação irregular, 
              assédio, discriminação ou conduta inadequada dentro da empresa. Todas as informações fornecidas serão tratadas 
              com sigilo absoluto, garantindo um ambiente de trabalho mais seguro e ético para todos.
            </p>
        </div>

        {/* CONTAINER COM BORDA AZUL */}
        <div className="border-[1.5px] border-[#00B8F1] rounded-sm p-6 md:p-10">
          
          {sent ? (
            <div className="py-12 text-center">
               <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
               </div>
               <h2 className="text-xl font-bold text-gray-800 mb-2">Denúncia Enviada</h2>
               <p className="text-gray-500 mb-8">Sua manifestação foi recebida com sucesso e será analisada com total sigilo.</p>
               <button
                  className="px-8 py-2 rounded-full bg-[#E5258C] text-white font-semibold hover:opacity-90 transition-opacity"
                  onClick={() => setSent(false)}
               >
                  Enviar outra denúncia
               </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-8" noValidate>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Nome Opcional */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700 block">Nome (Opcional)</label>
                  <p className="text-[11px] text-gray-400">Informe seu nome apenas se desejar. Sua identidade será preservada.</p>
                  <input
                    name="nome"
                    placeholder="Digite seu nome"
                    value={values.nome}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClass("nome")}
                  />
                </div>

                {/* Tipo de Ocorrência */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700 block">Tipo de ocorrência</label>
                  <p className="text-[11px] text-gray-400">Selecione a categoria que melhor descreve a situação relatada.</p>
                  <select
                    name="tipo_ocorrencia"
                    value={values.tipo_ocorrencia}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClass("tipo_ocorrencia")}
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="assédio">Assédio (Moral ou Sexual)</option>
                    <option value="discriminação">Discriminação</option>
                    <option value="conduta_inadequada">Conduta Inadequada</option>
                    <option value="irregularidade_financeira">Irregularidade Financeira</option>
                    <option value="uso_indevido_recursos">Uso Indevido de Recursos</option>
                    <option value="outros">Outros</option>
                  </select>
                  {errors.tipo_ocorrencia && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.tipo_ocorrencia}</p>}
                </div>

                {/* Data */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700 block">Data do Ocorrido</label>
                  <p className="text-[11px] text-gray-400">Informe quando o incidente aconteceu, se souber.</p>
                  <input
                    type="date"
                    name="data_ocorrido"
                    placeholder="DD/MM/AA"
                    value={values.data_ocorrido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClass("data_ocorrido")}
                  />
                  {errors.data_ocorrido && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.data_ocorrido}</p>}
                </div>

                {/* Local */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700 block">Local do Ocorrido</label>
                  <p className="text-[11px] text-gray-400">Especifique o setor ou local exato dentro da empresa.</p>
                  <input
                    name="local_ocorrido"
                    placeholder="Descreva o local do ocorrido"
                    value={values.local_ocorrido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClass("local_ocorrido")}
                  />
                  {errors.local_ocorrido && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.local_ocorrido}</p>}
                </div>
              </div>

              {/* Descrição */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 block">Descreva o Ocorrido</label>
                <p className="text-[11px] text-gray-400">Relate os detalhes com o máximo de informações possíveis.</p>
                <textarea
                  name="descricao"
                  rows="4"
                  placeholder="Descreva o ocorrido"
                  value={values.descricao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass("descricao") + " resize-none"}
                />
                {errors.descricao && <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.descricao}</p>}
              </div>

              {/* Anexo Opcional */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 block text-center md:text-left">Registro da Ocorrência (Opcional)</label>
                <p className="text-[11px] text-gray-400 text-center md:text-left">Anexe imagens ou qualquer prova que ajude na apuração.</p>
                <div className="mt-2">
                    <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-[#FFF3F8] text-[#E5258C] font-bold text-xs uppercase tracking-wider rounded-lg border border-transparent hover:border-[#E5258C]/20 transition-all"
                    >
                        ANEXAR ARQUIVO <FaUpload />
                    </button>
                    <p className="text-[9px] text-gray-400 text-center mt-2">ARQUIVOS ACEITOS: PDF, PNG, JPG, MP4, MP3</p>
                    <input 
                        ref={fileInputRef}
                        name="anexo" 
                        type="file" 
                        className="hidden" 
                        accept=".pdf,.png,.jpg,.jpeg,.mp4,.mp3" 
                    />
                </div>
              </div>

              {/* Captcha e Consentimento - mantendo lógica mas ajustando visual */}
              <div className="flex flex-col gap-6">
                <div className="flex justify-center">
                    <Captcha ref={captchaRef} />
                </div>

                <div className="flex justify-center text-center">
                    <label className="flex items-start gap-2 text-[11px] text-gray-500 cursor-pointer">
                    <input
                        type="checkbox"
                        name="consent"
                        checked={values.consent}
                        onChange={handleChange}
                        className="mt-0.5 w-3 h-3 accent-[#E5258C]"
                    />
                    <span className={errors.consent ? "text-red-500" : ""}>
                        Li e dou minha ciência de que as informações aqui relatadas são confidenciais.
                    </span>
                    </label>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-[#E5258C] text-white font-bold text-lg hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Enviando..." : "Enviar"}
                </button>
                <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-gray-500">
                   <FaLock className="text-[10px]" /> 
                   <span>Sua resposta é anônima e confidencial</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      <WhatsAppButton />
    </main>
  );
}
