import { useState } from "react";
import WhatsAppButton from "../../components/WhatsAppButton";
import headerImg from "../../assets/trabalheComAgente/header.png";

export default function TrabalheComAgente() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [fileName, setFileName] = useState("");

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return setFileName("");
    const okTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!okTypes.includes(f.type)) {
      alert("Formato inválido. Envie PDF, DOC ou DOCX.");
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
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    await new Promise((r) => setTimeout(r, 900));
    console.log("TrabalheComAgente payload:", payload);
    setLoading(false);
    setSent(true);
    e.currentTarget.reset();
    setFileName("");
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
                      required
                      type="email"
                      name="email"
                      placeholder="e-mail:"
                      className="w-full rounded-md border border-[#D9DDE8] bg-[#F6F7FB] px-3 py-2 outline-none focus:ring-2 focus:ring-[#E5258C]/30"
                    />
                  </div>

                  {/* linha 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      name="whatsapp"
                      placeholder="whatsapp:"
                      className="w-full rounded-md border border-[#D9DDE8] bg-[#F6F7FB] px-3 py-2 outline-none focus:ring-2 focus:ring-[#E5258C]/30"
                    />
                    <div className="hidden sm:block" />
                  </div>

                  {/* resumo */}
                  <textarea
                    name="resumo"
                    rows="5"
                    placeholder="resumo profissional:"
                    className="w-full rounded-md border border-[#D9DDE8] bg-[#F6F7FB] px-3 py-2 outline-none focus:ring-2 focus:ring-[#E5258C]/30 resize-y"
                  />

                  {/* upload currículo */}
                  <div>
                    <label className="block text-sm text-[#4B4B48] mb-2">
                      Anexe seu currículo (DOC, DOCX ou PDF)
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="inline-flex items-center px-4 py-2 rounded-md border border-[#D9DDE8] bg-[#F6F7FB] cursor-pointer hover:bg-[#f1f1f1]">
                        <input
                          type="file"
                          name="curriculo"
                          accept=".pdf,.doc,.docx"
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
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      className="mt-1"
                    />
                    <span>
                      Autorizo o uso dos meus dados para contato relacionado à
                      minha candidatura.
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
