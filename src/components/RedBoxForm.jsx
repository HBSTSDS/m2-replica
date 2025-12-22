import React, { useState } from 'react';

export default function RedBoxForm() {
  const [status, setStatus] = useState("idle"); // idle, sending, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Identificar origem do formulário
    data.formType = "redbox_landing";

    // Tratar checkboxes de "Como conheceu" manualmente para agrupar em array ou string
    const sources = [];
    if (e.target.source_redes?.checked) sources.push("Redes Sociais");
    if (e.target.source_google?.checked) sources.push("Google/Sites de Busca"); // Ajustado para bater com name abaixo se diferir
    if (e.target.source_indicacao?.checked) sources.push("Indicação");
    if (e.target.source_email?.checked) sources.push("E-mail Marketing");
    if (e.target.source_outros?.checked) sources.push("Outros");
    if (e.target.source_impressos?.checked) sources.push("Impressos");
    
    data.sources = sources.join(", ");

    try {
      // URL absoluta para o script PHP no servidor do usuário
      const response = await fetch("https://poster.flaviobrick.com.br/HB/api/submit-form.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        e.target.reset(); 
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Erro no envio:", error);
      setStatus("error");
    }
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
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div>
            <input 
              type="text" 
              name="nome"
              required
              placeholder="Nome:" 
              className="w-full bg-white rounded-lg px-4 py-3 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E5258C]"
            />
          </div>

          {/* Email + Whatsapp */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="email" 
              name="email"
              required
              placeholder="E-mail:" 
              className="w-full bg-white rounded-lg px-4 py-3 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E5258C]"
            />
            <input 
              type="tel" 
              name="whatsapp"
              required
              placeholder="Whatsapp:" 
              className="w-full bg-white rounded-lg px-4 py-3 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E5258C]"
            />
          </div>

          {/* Empresa + CNPJ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              name="empresa"
              placeholder="Empresa:" 
              className="w-full bg-white rounded-lg px-4 py-3 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E5258C]"
            />
            <input 
              type="text" 
              name="cnpj"
              placeholder="CNPJ:" 
              className="w-full bg-white rounded-lg px-4 py-3 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E5258C]"
            />
          </div>

          {/* Produto de interesse */}
          <div>
            <textarea 
              name="produto_interesse"
              rows="3"
              placeholder="Produto(s) de interesse:" 
              className="w-full bg-white rounded-lg px-4 py-3 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E5258C] resize-none"
            ></textarea>
          </div>

          {/* Formato */}
          <div>
            <input 
              type="text" 
              name="formato"
              placeholder="Formato:" 
              className="w-full bg-white rounded-lg px-4 py-3 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E5258C]"
            />
          </div>

          {/* Quantidade */}
          <div>
            <input 
              type="text" 
              name="quantidade"
              placeholder="Quantidade:" 
              className="w-full bg-white rounded-lg px-4 py-3 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E5258C]"
            />
          </div>

          {/* Observações */}
          <div>
            <textarea 
              name="obs"
              rows="3"
              placeholder="Observações:" 
              className="w-full bg-white rounded-lg px-4 py-3 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E5258C] resize-none"
            ></textarea>
          </div>

          {/* Arquivo - Visual apenas por enquanto, lógica de upload requereria multipart/form-data e mudança no PHP */}
          <div className="pt-4">
            <p className="text-white mb-2 font-poppins text-sm">Enviar arte e/ou arquivos de referência (Link ou WeTransfer recomendado nas obs):</p>
            <label className="inline-block bg-white text-gray-600 px-6 py-2 rounded cursor-pointer hover:bg-gray-100 transition-colors font-poppins text-sm opacity-50 cursor-not-allowed" title="Upload direto em breve">
              Escolher arquivos
              <input type="file" className="hidden" disabled />
            </label>
          </div>

          {/* Como conheceu */}
          <div className="pt-6">
             <p className="text-white mb-3 font-bold font-poppins">Como ficou conhecendo a M2?</p>
             <div className="space-y-2 text-white font-poppins text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                   <input type="checkbox" name="source_redes" className="w-4 h-4 rounded text-[#E5258C] focus:ring-[#E5258C]" />
                   Redes Sociais
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                   <input type="checkbox" name="source_impressos" className="w-4 h-4 rounded text-[#E5258C] focus:ring-[#E5258C]" />
                   Impressos
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                   <input type="checkbox" name="source_indicacao" className="w-4 h-4 rounded text-[#E5258C] focus:ring-[#E5258C]" />
                   Indicação
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                   <input type="checkbox" name="source_google" className="w-4 h-4 rounded text-[#E5258C] focus:ring-[#E5258C]" />
                   Sites de Busca
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                   <input type="checkbox" name="source_email" className="w-4 h-4 rounded text-[#E5258C] focus:ring-[#E5258C]" />
                   E-mail Marketing
                </label>
                 <label className="flex items-center gap-2 cursor-pointer">
                   <input type="checkbox" name="source_outros" className="w-4 h-4 rounded text-[#E5258C] focus:ring-[#E5258C]" />
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
                   <input type="radio" name="consent" value="sim" required className="w-4 h-4 text-[#E5258C] focus:ring-[#E5258C]" />
                   Sim
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                   <input type="radio" name="consent" value="nao" className="w-4 h-4 text-[#E5258C] focus:ring-[#E5258C]" />
                   Não
                </label>
             </div>
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
