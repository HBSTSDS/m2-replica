// src/pages/solucoes/Supermercados.jsx
import { useState, useRef } from "react";
import Captcha from "../../components/Captcha";
import headerImg from "../../assets/supermercados/header.png";
import img2 from "../../assets/supermercados/img-2.png";
import { useForm } from "../../hooks/useForm";
import { 
  validateName, 
  validateEmail, 
  validatePhone, 
  validateCNPJ, 
  validateRequired,
  validateChecked
} from "../../utils/validation";

export default function Supermercados() {
  const [status, setStatus] = useState("idle");
  const [sent, setSent] = useState(false);
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
    empresa: validateRequired,
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

    const data = { ...values, formType: "supermercados" };

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
      {/* HEADER */}
      <section className="w-full">
        <img
          src={headerImg}
          alt="Supermercados - header"
          className="w-full h-40 md:h-56 object-cover"
        />
      </section>

      {/* CONTEÚDO PRINCIPAL */}
      <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <div className="grid md:grid-cols-3 gap-10 md:gap-14 items-start">
          {/* COLUNA DE TEXTO */}
          <div className="md:col-span-2">
            {/* Barras coloridas do topo */}
            <div className="flex items-center mb-4">
              <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
              <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
              <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
              <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" />
            </div>

            {/* TÍTULO PRINCIPAL */}
            <h1 className="text-[28px] md:text-[36px] font-extrabold tracking-wide mb-6">
              SUPERMERCADOS
            </h1>

            <div className="space-y-10 leading-relaxed text-[16px] md:text-[17px]">
              {/* 1️⃣ O que a M2 faz para supermercados? */}
              <div>
                <div className="relative mb-2">
                  {/* etiqueta rosa, fora do container */}
                  <span
                    className="
                      hidden md:block absolute right-full mr-5
                      top-1/2 -translate-y-1/2
                      h-5 w-24 bg-[#E5258C] rounded-r-md
                    "
                  />
                  <h2 className="font-bold text-[18px] md:text-[20px] leading-tight">
                    O que a M2 faz para supermercados?
                  </h2>
                </div>

                <div className="space-y-3">
                  <p>
                    A M2 atua no segmento de <b>varejo alimentício</b> com
                    soluções que potencializam a comunicação visual em{" "}
                    <b>pontos de venda, da fachada à gôndola.</b>
                  </p>

                  <p>
                    Desenvolvemos projetos de{" "}
                    <b>
                      sinalização, ambientação, fachadas, comunicação de
                      setores, displays e materiais promocionais
                    </b>
                    , garantindo integração estética e eficiência operacional em
                    toda a loja:{" "}
                    <b>
                      entrada, hortifrúti, açougue, padaria, mercearia, bebidas,
                      checkout e áreas de apoio.
                    </b>
                  </p>

                  <p>
                    Nossa <b>estrutura produtiva 24/7</b> assegura escala
                    nacional, alto padrão de qualidade e consistência de cores
                    em todas as unidades da rede.
                  </p>
                </div>
              </div>

              {/* 2️⃣ Principais materiais de PDV */}
              <div>
                <div className="relative mb-2">
                  {/* etiqueta amarela */}
                  <span
                    className="
                      hidden md:block absolute right-full mr-5
                      top-1/2 -translate-y-1/2
                      h-5 w-24 bg-[#FFD400] rounded-r-md
                    "
                  />
                  <h2 className="font-bold text-[18px] md:text-[20px] leading-tight">
                    Principais materiais de PDV para supermercados
                  </h2>
                </div>

                <div className="space-y-3">
                  <p>
                    Além dos grandes elementos de loja, a M2 também desenvolve e
                    produz os <b>materiais táticos de PDV</b> que fazem
                    diferença na gôndola e nas campanhas:
                  </p>

                  <p>
                    <b>Wobbler</b>
                    <br />
                    Elemento aplicado na frente da prateleira, com haste
                    flexível, que “balança” levemente e chama atenção para um
                    produto específico.
                  </p>

                  <p>
                    <b>Stopper</b>
                    <br />
                    Peça que “interrompe” visualmente a gôndola, projetando-se
                    para fora da linha de prateleiras para destacar ofertas,
                    lançamentos ou uma marca.
                  </p>

                  <p>
                    <b>Faixa de gôndola</b>
                    <br />
                    Comunicação aplicada na frente da gôndola, ideal para
                    reforçar marca, categoria, preço e campanhas de forma
                    contínua ao longo da prateleira.
                  </p>

                  <p>
                    <b>Clip strip / Fita cross</b>
                    <br />
                    Suporte para expor produtos em pequenos ganchos,
                    normalmente em cross merchandising (por exemplo, snacks
                    perto de bebidas), ótimo para destacar itens impulso.
                  </p>

                  <p>
                    <b>Réplicas e gigantografias de produto</b>
                    <br />
                    Versões ampliadas ou tridimensionais de produtos, usadas
                    para criar pontos de destaque em áreas estratégicas da loja.
                  </p>

                  <p>
                    <b>Displays e totens promocionais</b>
                    <br />
                    Expositores de chão ou balcão para montar ilhas, pontas de
                    gôndola e áreas especiais de ativação de marca.
                  </p>

                  {/* TÓPICO: Por que investir em comunicação visual (DENTRO desta sessão) */}
                  <div className="mt-6 space-y-3">
                    <p className="font-bold">
                      Por que investir em comunicação visual para supermercados?
                    </p>

                    <p>
                      No supermercado, a comunicação visual está diretamente
                      ligada à <b>venda, fluidez e experiência de compra</b>:
                    </p>

                    <p>
                      <b>Organiza o fluxo</b>, ajudando o cliente a se localizar
                      por setores e categorias;
                    </p>

                    <p>
                      <b>Dá destaque a ofertas e campanhas</b>, impulsionando o
                      sell-out e o ticket médio;
                    </p>

                    <p>
                      <b>Valoriza áreas estratégicas</b> (hortifrúti, açougue,
                      padaria, perecíveis), reforçando frescor e qualidade;
                    </p>

                    <p>
                      <b>Reduz ruídos e dúvidas</b>, com preços, informações e
                      sinalização bem resolvidos;
                    </p>

                    <p>
                      <b>Padroniza a rede</b>, mantendo a mesma leitura de marca
                      em todas as lojas.
                    </p>

                    <p>
                      Uma boa comunicação visual em supermercados não é só
                      “bonita”: ela vende mais, torna a operação mais eficiente
                      e melhora a percepção de qualidade da loja e da marca.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3️⃣ Por que escolher a M2 (etiqueta azul) */}
              <div>
                <div className="relative mb-2">
                  {/* etiqueta azul */}
                  <span
                    className="
                      hidden md:block absolute right-full mr-5
                      top-1/2 -translate-y-1/2
                      h-5 w-24 bg-[#00B8F1] rounded-r-md
                    "
                  />
                  <h2 className="font-bold text-[18px] md:text-[20px] leading-tight">
                    Por que escolher a M2 para projetos em supermercados?
                  </h2>
                </div>

                <div className="space-y-3">
                  <p>
                    A M2 conhece a rotina do varejo alimentício e entrega
                    soluções pensadas para o dia a dia de operação, manutenção e
                    expansão de redes.
                  </p>

                  <p>
                    Projetos completos de comunicação visual de loja:
                    sinalização, setorização, fachadas, ambientação e PDV;
                  </p>

                  <p>
                    Desenvolvimento de kits de materiais promocionais (wobbler,
                    stopper, faixa de gôndola, clip strip, displays, totens e
                    réplicas);
                  </p>

                  <p>
                    Integração com vitrinismo, PDV, sinalização e fachadas,
                    garantindo leitura única de marca;
                  </p>

                  <p>
                    Estrutura produtiva 24/7, preparada para grandes volumes,
                    trocas rápidas e janelas curtas de implantação;
                  </p>

                  <p>
                    Cobertura nacional, com consistência de cores e acabamento
                    em todas as unidades da rede;
                  </p>

                  <p>
                    Controle de qualidade em cada etapa, da criação à instalação
                    em loja.
                  </p>

                  <p>
                    Com a M2, a comunicação visual do supermercado deixa de ser
                    um conjunto de peças isoladas e se torna um sistema
                    integrado de marca, venda e operação, pronto para acompanhar
                    a evolução da rede.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* IMAGEM DA DIREITA */}
          <aside>
            <figure className="rounded-xl overflow-hidden bg-white shadow-sm">
              <img
                src={img2}
                alt="Loja de supermercado atendida pela M2"
                className="w-full h-[520px] object-cover"
              />
            </figure>
          </aside>
        </div>

        {/* FORMULÁRIO */}
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
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Nome:</label>
              <input 
                name="nome"
                value={values.nome}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClass("nome")} 
              />
              {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
            </div>

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
              <label className="block text-sm mb-1">
                Produto de Interesse:
              </label>
              <input 
                 name="produto_interesse" 
                 type="text" 
                 value={values.produto_interesse}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 className={getInputClass("produto_interesse")} 
              />
            </div>

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

            <div className="md:col-span-2">
               <Captcha ref={captchaRef} />
            </div>

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
                  Eu dou consentimento para processar meus dados pessoais e para
                  futuras comunicações de marketing.
                </span>
              </label>

              <button disabled={status === "sending"} className="self-start px-6 py-2 rounded-full text-sm font-semibold bg-[#E5258C] text-white disabled:opacity-50">
                {status === "sending" ? "ENVIANDO..." : "ENVIAR"}
              </button>
            </div>
            {errors.consent && <p className="text-red-500 text-xs md:col-span-2">{errors.consent}</p>}
          </form>
          )}
        </div>

        {/* GRID FINAL */}
        <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-xl bg-[#D8DCE7] hover:bg-[#cfd3df] transition-colors"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
