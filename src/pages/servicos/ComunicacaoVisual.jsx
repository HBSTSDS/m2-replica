// src/pages/servicos/ComunicacaoVisual.jsx
import { Link } from "react-router-dom";

export default function ComunicacaoVisual() {
  return (
    <main className="bg-[#E7E9F2] text-[#4B4B48]">
      {/* HEADER – faixa de imagens */}
      <section className="w-full">
        <img
          src="/comunicacaoVisual/header.png"
          alt="Comunicação Visual - header"
          className="w-full h-40 md:h-56 object-cover"
        />
      </section>

      {/* CONTEÚDO PRINCIPAL */}
      <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">
  <div className="grid md:grid-cols-3 gap-10 md:gap-14 items-start">
    {/* Texto (2/3) */}
    <div className="md:col-span-2">
       <div className="flex items-center mb-4">
                    <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
                    <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
                    <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
                    <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" /> {/* branco/cinza final */}
                </div>
      <h1 className="text-[28px] md:text-[36px] font-extrabold tracking-wide mb-6">
        <span className="inline-block w-3 h-3 rounded-sm bg-[#E5258C] mr-2 align-middle" />
        COMUNICAÇÃO VISUAL
      </h1>

      <div className="space-y-5 leading-relaxed text-[16px] md:text-[17px]">
        <p>
          A M2 integra estratégia, design e produção para entregar soluções
          completas em comunicação visual, com alto padrão de qualidade e
          escala nacional. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Officiis reiciendis nemo aut ab atque? Doloribus dicta eveniet
          numquam, laboriosam veritatis nihil accusantium consectetur explicabo
          expedita fugiat, velit maxime harum officia!
        </p>

        <p>
          Nossa estrutura 24/7 e o maior parque gráfico UV da América Latina
          garantem prazos competitivos, consistência de cores e acabamento
          premium em rígidos, flexíveis e sublimação. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Soluta, sed molestiae. Eius
          expedita laudantium quaerat amet reiciendis ea atque deserunt,
          voluptatum architecto saepe facilis hic sint! Eligendi repellendus
          voluptates temporibus.
        </p>

        <p>
          Do planejamento à instalação, conectamos todas as etapas em um
          ecossistema criativo que reduz custos, acelera entregas e eleva a
          performance das marcas nos pontos de contato. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Repellendus id saepe, ducimus
          laboriosam maiores blanditiis laborum, consequuntur fugiat aut
          accusamus ipsam. Vero eaque cum quisquam nemo placeat sit in
          deleniti.
        </p>
      </div>
    </div>

    {/* Imagem lateral (1/3) */}
    <aside className="md:pl-2">
      <figure className="rounded-xl overflow-hidden shadow-sm bg-white">
        <img
          src="/comunicacaoVisual/img2.png"
          alt="Projeto de comunicação visual"
          className="w-full h-[450px] md:h-[520px] object-cover"
        />
      </figure>
    </aside>
  </div>

  {/* GRID DE CASES / BLOQUINHOS */}
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
