import { useState } from "react";
import WhatsAppButton from "../../components/WhatsAppButton";
import headerImg from "../../assets/faleConosco/header.png"; // ✅ importa do assets

export default function FaleConosco() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    await new Promise((r) => setTimeout(r, 800));
    console.log("FaleConosco payload:", payload);
    setLoading(false);
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <main className="bg-[#F6F7FB] min-h-screen">
      {/* HEADER */}
      <div className="w-full h-[340px] overflow-hidden">
        <img
          src={headerImg}
          alt="Fale Conosco - Header"
          className="w-full h-full object-cover object-right"
          onError={(e) => { e.currentTarget.src = headerImg; }} // ✅ usa a MESMA variável
        />
      </div>

      

      {/* CONTEÚDO */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-6">
          {/* faixinha colorida */}
          <div className="max-w-6xl mx-auto px-6 mt-10 md:mt-14">
          </div>
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
                Envie suas dúvidas, críticas ou sugestões preenchendo o formulário ao lado.
                Nossa equipe analisará sua mensagem e retornará o contato o quanto antes.
              </p>

              <ul className="mt-8 space-y-2 text-[#4B4B48]">
                <li>📍 Av. Brasil 12.025 – Penha, Rio de Janeiro.</li>
                <li>📍 Rua Augusto Corrêa, 6 – Capela do Socorro, São Paulo</li>
                <li>☎️ (21) 97322-2743</li>
                <li>✉️ contato@m2flex.com.br</li>
              </ul>
            </div>

            {/* Formulário com bordas nos campos */}
            <div>
              {sent ? (
                <div className="p-6 text-center">
                  <p className="text-lg font-medium text-[#1C1C1C]">
                    Mensagem enviada com sucesso ✅
                  </p>
                  <p className="mt-2 text-[#4B4B48]">
                    Obrigado por entrar em contato. Em breve retornaremos.
                  </p>
                  <button
                    className="mt-6 inline-flex items-center justify-center px-5 py-2 rounded-md bg-[#E5258C] text-white"
                    onClick={() => setSent(false)}
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  {/* linha 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      required
                      name="nome"
                      placeholder="nome:"
                      className="w-full rounded-md border border-[#D9DDE8] bg-[#F6F7FB] px-3 py-2 outline-none focus:ring-2 focus:ring-[#E5258C]/30"
                    />
                    <input
                      name="empresa"
                      placeholder="empresa:"
                      className="w-full rounded-md border border-[#D9DDE8] bg-[#F6F7FB] px-3 py-2 outline-none focus:ring-2 focus:ring-[#E5258C]/30"
                    />
                  </div>

                  {/* linha 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      name="cnpj"
                      placeholder="cnpj:"
                      className="w-full rounded-md border border-[#D9DDE8] bg-[#F6F7FB] px-3 py-2 outline-none focus:ring-2 focus:ring-[#E5258C]/30"
                    />
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="e-mail:"
                      className="w-full rounded-md border border-[#D9DDE8] bg-[#F6F7FB] px-3 py-2 outline-none focus:ring-2 focus:ring-[#E5258C]/30"
                    />
                  </div>

                  {/* linha 3 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      name="whatsapp"
                      placeholder="whatsapp:"
                      className="w-full rounded-md border border-[#D9DDE8] bg-[#F6F7FB] px-3 py-2 outline-none focus:ring-2 focus:ring-[#E5258C]/30"
                    />
                    <div className="hidden sm:block" />
                  </div>

                  {/* mensagem */}
                  <textarea
                    required
                    name="mensagem"
                    rows="5"
                    placeholder="mensagem"
                    className="w-full rounded-md border border-[#D9DDE8] bg-[#F6F7FB] px-3 py-2 outline-none focus:ring-2 focus:ring-[#E5258C]/30 resize-y"
                  />

                  {/* consentimento */}
                  <label className="flex items-start gap-2 text-sm text-[#4B4B48]">
                    <input type="checkbox" name="consent" required className="mt-1" />
                    <span>
                      Li e dou consentimento para processar meus dados pessoais
                      de acordo com as finalidades comerciais e de marketing.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center px-6 py-2 rounded-md bg-[#E5258C] text-white disabled:opacity-60"
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
