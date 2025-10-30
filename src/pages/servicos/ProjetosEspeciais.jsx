// src/pages/servicos/ProjetosEspeciais.jsx
import headerImg from "../../assets/projetosEspeciais/header.png";
import img2      from "../../assets/projetosEspeciais/img-2.png";


export default function ProjetosEspeciais() {
  return (
    <main className="bg-[#E7E9F2] text-[#4B4B48]">
      <section className="w-full">
        <img src={headerImg} alt="Projetos Especiais - header" className="w-full h-40 md:h-56 object-cover" />
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
            <h1 className="text-[28px] md:text-[36px] font-extrabold mb-6">PROJETOS ESPECIAIS</h1>

            <div className="space-y-5 text-[16px]">
              <p>
                Criamos ativações e estruturas personalizadas, unindo engenharia, design e produção para experiências únicas.
              </p>
              <p>
                Do conceito ao pós-instalação, nossa operação 360º garante viabilidade técnica e acabamento premium.
              </p>
              <p>
                Atendemos projetos de grande escala em todo o Brasil com controle de qualidade.
              </p>
            </div>
          </div>

          <aside>
            <figure className="rounded-xl overflow-hidden bg-white shadow-sm">
              <img src={img2} alt="Projeto especial" className="w-full h-[520px] object-cover" />
            </figure>
          </aside>
        </div>
      </section>
    </main>
  );
}
