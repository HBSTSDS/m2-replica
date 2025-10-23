import { useMemo, useState } from "react";
import WhatsAppButton from "../../components/WhatsAppButton";

export default function AvalieM2() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const headerSrc = `${import.meta.env.BASE_URL}avalieM2/header.png`;
  const notas = useMemo(() => Array.from({ length: 11 }, (_, i) => i), []); // 0..10

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    await new Promise((r) => setTimeout(r, 900)); // simula envio
    console.log("AvalieM2 payload:", payload);

    setLoading(false);
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <main className="bg-[#F6F7FB] min-h-screen">
      {/* HEADER */}
      <div className="w-full h-[340px] overflow-hidden">
        <img
          src={headerSrc}
          alt="Avalie a M2 - Header"
          className="w-full h-full object-cover object-right"
          onError={(e) => (e.currentTarget.src = "/avalieM2/header.png")}
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
              Sua opinião é muito importante para nós!
            </p>
            <p className="mt-2 text-[#4B4B48]">
              A M2 quer ouvir você — suas sugestões, dúvidas, reclamações e
              elogios nos ajudam a evoluir continuamente e oferecer um serviço
              cada vez melhor.
            </p>
            <p className="mt-6 text-[#4B4B48]">
              Preencha o formulário abaixo e compartilhe sua experiência conosco.
              Agradecemos por dedicar um momento do seu tempo para nos ajudar a
              melhorar!
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
              <form onSubmit={onSubmit} className="space-y-5">
                {/* identificação */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    required
                    name="nome"
                    placeholder="nome"
                    className="w-full rounded-md border border-[#D9DDE8] bg-[#F6F7FB] px-3 py-2 outline-none focus:ring-2 focus:ring-[#E5258C]/30"
                  />
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="e-mail"
                    className="w-full rounded-md border border-[#D9DDE8] bg-[#F6F7FB] px-3 py-2 outline-none focus:ring-2 focus:ring-[#E5258C]/30"
                  />
                </div>

                {/* avaliação 0..10 */}
                <fieldset>
                  <legend className="mb-2 block text-sm text-[#4B4B48]">
                    Como você avalia sua experiência com a M2?
                  </legend>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {notas.map((n) => (
                      <label
                        key={n}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-[#D9DDE8] bg-[#F6F7FB] cursor-pointer hover:bg-white/40"
                        title={`Nota ${n}`}
                      >
                        <input
                          type="radio"
                          name="nota"
                          value={n}
                          required
                          className="sr-only"
                        />
                        <span>{n}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* perguntas abertas */}
                <textarea
                  name="ponto_positivo"
                  rows="2"
                  placeholder="O que você mais gostou em nosso atendimento/produto/serviço?"
                  className="w-full rounded-md border border-[#D9DDE8] bg-[#F6F7FB] px-3 py-2 outline-none focus:ring-2 focus:ring-[#E5258C]/30 resize-y"
                />

                <textarea
                  name="melhorias"
                  rows="2"
                  placeholder="Há algo que poderíamos melhorar?"
                  className="w-full rounded-md border border-[#D9DDE8] bg-[#F6F7FB] px-3 py-2 outline-none focus:ring-2 focus:ring-[#E5258C]/30 resize-y"
                />

                {/* recomendaria */}
                <fieldset>
                  <legend className="mb-2 block text-sm text-[#4B4B48]">
                    Você recomendaria a M2 para outras pessoas?
                  </legend>
                  <div className="flex flex-wrap gap-3">
                    {["Sim", "Não", "Talvez"].map((opt) => (
                      <label key={opt} className="inline-flex items-center gap-2">
                        <input
                          type="radio"
                          name="recomendaria"
                          value={opt.toLowerCase()}
                          required
                          className="h-4 w-4 accent-[#E5258C]"
                        />
                        <span className="text-[#4B4B48]">{opt}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* contato posterior */}
                <fieldset>
                  <legend className="mb-2 block text-sm text-[#4B4B48]">
                    Deseja que entremos em contato para falar sobre sua avaliação?
                  </legend>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { v: "email", label: "Sim, por e-mail" },
                      { v: "whatsapp", label: "Sim, por WhatsApp" },
                      { v: "nao", label: "Não é necessário" },
                    ].map((o) => (
                      <label key={o.v} className="inline-flex items-center gap-2">
                        <input
                          type="radio"
                          name="contato_posterior"
                          value={o.v}
                          required
                          className="h-4 w-4 accent-[#E5258C]"
                        />
                        <span className="text-[#4B4B48]">{o.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* comentários extras */}
                <textarea
                  name="comentarios"
                  rows="3"
                  placeholder="Comentários adicionais (opcional)"
                  className="w-full rounded-md border border-[#D9DDE8] bg-[#F6F7FB] px-3 py-2 outline-none focus:ring-2 focus:ring-[#E5258C]/30 resize-y"
                />

                {/* captcha */}
                <div>
                  <label className="block text-sm text-[#4B4B48] mb-2">
                    captcha
                  </label>
                  <input
                    name="captcha"
                    placeholder="digite o texto da imagem"
                    className="w-full rounded-md border border-[#D9DDE8] bg-[#F6F7FB] px-3 py-2 outline-none focus:ring-2 focus:ring-[#E5258C]/30"
                  />
                </div>

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
      </section>

      
      <WhatsAppButton />
    </main>
  );
}
