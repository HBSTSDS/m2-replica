import React from "react";
import WhatsAppButton from "../../components/WhatsAppButton";

// Imagens (mantive a mesma estrutura que você já usa)
import capaSustentabilidade from "../../assets/sustetabilidade/capa_sustentabilidade.png";
import selosVerdes from "../../assets/sustetabilidade/selos_verdes.png";

export default function Sustentabilidade() {
  const handleImgError = (e) => {
    const order = [".png", ".jpg", ".jpeg", ".webp"];
    const cur = e.currentTarget.src.toLowerCase();
    const idx = order.findIndex((x) => cur.endsWith(x));
    if (idx >= 0 && idx < order.length - 1) {
      e.currentTarget.src = e.currentTarget.src.replace(order[idx], order[idx + 1]);
    } else {
      console.warn("Imagem não encontrada:", e.currentTarget.src);
    }
  };

  return (
    <section className="bg-[#F3F4F6] text-[#1E1E1E] font-inter">
      {/* Capa (layout preservado) */}
      <div className="w-full overflow-hidden">
        <img
          src={capaSustentabilidade}
          alt="Equipe M2 trabalhando com práticas sustentáveis"
          className="w-full object-cover"
          onError={handleImgError}
        />
      </div>

      {/* Bloco 1 — Intro + Selos (layout preservado: texto à esquerda, imagem à direita) */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 flex flex-col md:flex-row items-start gap-10">
        <div className="flex-1">
          {/* Barras de cor (mantidas) */}
          <div className="flex items-center mb-4">
            <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
            <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
            <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
            <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" />
          </div>

          {/* H1 do PDF */}
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">
            Sustentabilidade: Inovação que reduz impacto, todos os dias
          </h1>

          {/* Subtítulo do PDF */}
          <p className="text-[15px] leading-relaxed mt-4">
            Na M2, responsabilidade ambiental não é projeto paralelo: orienta decisões,
            investimentos e parcerias ao longo de toda a cadeia — do insumo ao pós-uso.
          </p>
        </div>

        {/* Imagens de selos (mantido à direita) */}
        <div className="flex-shrink-0 flex justify-center md:justify-end w-full md:w-[35%] md:self-center md:mt-8 lg:mt-12">
          <img
            src={selosVerdes}
            alt="Selos ambientais (ex.: GREENGUARD e Indoor Air Quality)"
            className="w-72 md:w-80"
            onError={handleImgError}
          />
        </div>
      </div>

      {/* Bloco 2 — Nossos Pilares */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-6">
        <h2 className="text-lg font-semibold">Nossos pilares</h2>
        <ul className="mt-4 list-disc pl-5 space-y-2 text-[15px] leading-relaxed max-w-[72ch]">
          <li>
            <strong>Tecnologia limpa por padrão</strong> — priorizamos processos UV/LED e
            ecossolventes com menor emissão de compostos voláteis, maior eficiência energética
            e cura rápida.
          </li>
          <li>
            <strong>Gestão de resíduos e reciclagem</strong> — segregação na origem,
            armazenamento responsável e destinação com parceiros homologados.
          </li>
          <li>
            <strong>Parcerias e certificações</strong> — fornecedores e insumos com selos
            ambientais reconhecidos (ex.: <em>GREENGUARD</em> e <em>Indoor Air Quality</em>,
            desde 2020).
          </li>
          <li>
            <strong>Design para circularidade</strong> — materiais de campanha ganham nova vida
            em produtos de reuso, prolongando o ciclo e reduzindo descarte.
          </li>
          <li>
            <strong>Transparência e melhoria contínua</strong> — metas, monitoramento e
            auditorias internas para elevar o padrão a cada semestre.
          </li>
        </ul>
      </div>

      {/* Bloco 3 — Resultados recentes (2025) */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10">
        <h2 className="text-lg font-semibold">Resultados recentes (2025)</h2>
        <ul className="mt-4 list-disc pl-5 space-y-2 text-[15px] leading-relaxed max-w-[72ch]">
          <li>
            <strong>+110 toneladas</strong> de resíduos reciclados no 1º semestre/2025
            (papelão, papel branco/colorido e lona), em parceria com a <strong>EcoRio</strong>.
          </li>
          <li>
            <strong>+5.000 m²</strong> de lonas reaproveitadas (nov/2025), transformadas em novos
            itens por meio do nosso programa de reuso criativo.
          </li>
          <li>
            <strong>Operação 24/7</strong> com processos padronizados para controle de qualidade,
            redução de refugos e melhor aproveitamento de matéria-prima. <span className="text-[#6B7280]">(dados fornecidos pela M2)</span>
          </li>
        </ul>
      </div>

      {/* Bloco 4 — Como operamos de forma mais sustentável */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-10">
        <h2 className="text-lg font-semibold">Como operamos de forma mais sustentável</h2>

        <h3 className="mt-5 text-[15px] font-semibold">1) Materiais e tintas</h3>
        <ul className="mt-2 list-disc pl-5 space-y-2 text-[15px] leading-relaxed max-w-[72ch]">
          <li>UV/LED e ecossolventes de menor emissão, aliados a controle de cor e produtividade.</li>
          <li>Compras responsáveis: insumos com laudos e certificações; rastreabilidade por lote.</li>
        </ul>

        <h3 className="mt-5 text-[15px] font-semibold">2) Produção e eficiência</h3>
        <ul className="mt-2 list-disc pl-5 space-y-2 text-[15px] leading-relaxed max-w-[72ch]">
          <li>Padronização de setup para reduzir desperdícios.</li>
          <li>Planejamento de painéis e <em>nesting</em> para melhor aproveitamento de chapas e mídias flexíveis.</li>
          <li>Treinamento contínuo das equipes para manuseio e descarte corretos.</li>
        </ul>

        <h3 className="mt-5 text-[15px] font-semibold">3) Resíduos: redução, reciclagem e reuso</h3>
        <ul className="mt-2 list-disc pl-5 space-y-2 text-[15px] leading-relaxed max-w-[72ch]">
          <li>Segregação na origem (papel, papelão, plásticos, lonas e metais).</li>
          <li>Parceria com a <strong>EcoRio</strong> para coleta, tratamento e comprovação de destinação.</li>
          <li>Reuso criativo: transformação de campanhas em novos produtos — bolsas, capas e acessórios.</li>
        </ul>
      </div>

      {/* Bloco 5 — ReBolsas (programa de reuso) */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-10">
        <h2 className="text-lg font-semibold">ReBolsas — reuso criativo que vira utilidade</h2>
        <p className="mt-4 text-[15px] leading-relaxed max-w-[72ch]">
          Produtos que seriam descartados agora retornam ao uso diário, com design que respeita o material original.
        </p>
        <ul className="mt-3 list-disc pl-5 space-y-2 text-[15px] leading-relaxed max-w-[72ch]">
          <li><strong>Sem cola</strong> • <strong>Sem costura</strong> • Alça 100% algodão • 100% reutilizável</li>
          <li><strong>Origem:</strong> lonas de campanhas e projetos especiais</li>
          <li><strong>Escala:</strong> mais de 5.000 m² de lonas reaproveitadas até nov/2025</li>
          <li><strong>Aceitação do mercado:</strong> destaque em eventos do setor ao longo de 2025 <span className="text-[#6B7280]">(dados fornecidos pela M2)</span></li>
        </ul>
        <p className="mt-3 text-[15px] leading-relaxed max-w-[72ch]">
          Reuso com propósito: menos descarte, mais valor — e um lembrete visível do compromisso ambiental da M2.
        </p>
      </div>

      {/* Bloco 6 — Parcerias e reconhecimentos */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-10">
        <h2 className="text-lg font-semibold">Parcerias e reconhecimentos</h2>
        <ul className="mt-4 list-disc pl-5 space-y-2 text-[15px] leading-relaxed max-w-[72ch]">
          <li><strong>EcoRio</strong> — tratamento e destinação responsável dos resíduos do parque.</li>
          <li>Selos e certificações — uso de insumos e práticas reconhecidas pelo mercado, incluindo <em>GREENGUARD</em> e <em>Indoor Air Quality</em> (desde 2020).</li>
          <li>Fornecedores homologados — alinhados a padrões de sustentabilidade e conformidade. <span className="text-[#6B7280]">(dados fornecidos pela M2)</span></li>
        </ul>
      </div>

      {/* Bloco 7 — Metas e compromissos */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-10">
        <h2 className="text-lg font-semibold">Metas e compromissos</h2>
        <ul className="mt-4 list-disc pl-5 space-y-2 text-[15px] leading-relaxed max-w-[72ch]">
          <li>Aumentar o reuso de mídia: <strong>+50%</strong> no volume de materiais transformados até 2026.</li>
          <li>Reduzir refugos: <strong>-15%</strong> em desperdícios produtivos por unidade de saída até 2026.</li>
          <li>Ampliar rastreabilidade: <strong>100%</strong> dos resíduos com comprovante de destinação dos parceiros.</li>
        </ul>
      </div>

      {/* Bloco 8 — FAQ (opcional p/ SEO) */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-8">
        <h2 className="text-lg font-semibold">FAQ</h2>

        <div className="mt-4 space-y-4">
          <details className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <summary className="font-semibold cursor-pointer">
              Impressão UV/LED é mais sustentável?
            </summary>
            <p className="mt-2 text-[15px] leading-relaxed">
              Sim. A cura rápida e a menor emissão contribuem para reduzir impactos e agilizar a
              produção, mantendo alta qualidade.
            </p>
          </details>

          <details className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <summary className="font-semibold cursor-pointer">
              O que a M2 faz com as lonas após as campanhas?
            </summary>
            <p className="mt-2 text-[15px] leading-relaxed">
              Parte segue para reciclagem com a EcoRio; outra parte integra nosso programa de reuso
              criativo (como as ReBolsas).
            </p>
          </details>

          <details className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <summary className="font-semibold cursor-pointer">
              Vocês têm comprovação da destinação dos resíduos?
            </summary>
            <p className="mt-2 text-[15px] leading-relaxed">
              Sim, trabalhamos com parceiros homologados que emitem a documentação de coleta e
              tratamento.
            </p>
          </details>

          <details className="bg-white border border-[#E5E7EB] rounded-lg p-4">
            <summary className="font-semibold cursor-pointer">
              Posso solicitar produtos com reuso da minha campanha?
            </summary>
            <p className="mt-2 text-[15px] leading-relaxed">
              Sim — avaliamos o material e indicamos as melhores aplicações (bolsas, capas,
              acessórios etc.).
            </p>
          </details>
        </div>
      </div>

      {/* Bloco 9 — CTAs (mantendo o padrão de botões do seu site) */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-14">
        <div className="flex flex-wrap gap-3">
          <a
            href="#contato"
            className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-[#E5258C] text-white font-semibold hover:opacity-95 transition"
          >
            Fale com um especialista em sustentabilidade
          </a>
        </div>
      </div>

      {/* Botão flutuante (mantido) */}
      <WhatsAppButton />
    </section>
  );
}
