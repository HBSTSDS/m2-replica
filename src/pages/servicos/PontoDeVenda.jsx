// src/pages/servicos/PontoDeVenda.jsx
import headerImg from "../../assets/pontoDeVenda/header.png";
import img2 from "../../assets/pontoDeVenda/img-2.png";

export default function PontoDeVenda() {
  return (
    <main className="bg-[#E7E9F2] text-[#4B4B48]">
      <section className="w-full">
        <img src={headerImg} alt="Ponto de Venda - header" className="w-full h-40 md:h-56 object-cover" />
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="h-[6px] w-14 bg-[#E5258C] rounded-full" />
              <span className="h-[6px] w-14 bg-[#00B8F1] rounded-full" />
              <span className="h-[6px] w-14 bg-[#FFD400] rounded-full" />
              <span className="h-[6px] w-14 bg-[#1C1C1C] rounded-full" />
            </div>
            <h1 className="text-[28px] md:text-[36px] font-extrabold mb-6">PONTO DE VENDA</h1>

            <div className="space-y-5 text-[16px]">
              <p>
                Desenvolvemos materiais para PDV com foco em sell-out, experiência e padronização de marca.
              </p>
              <p>
                Do design à produção e instalação, integramos displays, wobblers e mobiliários especiais.
              </p>
              <p>
                Operação nacional 24/7, controle de cor e prazos competitivos para ações sazonais.
              </p>
            </div>
          </div>

          <aside>
            <figure className="rounded-xl overflow-hidden bg-white shadow-sm">
              <img src={img2} alt="Projeto de PDV" className="w-full h-[520px] object-cover" />
            </figure>
          </aside>
        </div>
      </section>
    </main>
  );
}
