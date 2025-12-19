import React from "react";
import displaysImg from "../assets/Displays/displays.png";
import redBoxLogo from "../assets/Displays/redBox.png";
import raioBg from "../assets/Displays/raio_display.png";
import selosImg from "../assets/Displays/selos.png";

export default function RedBoxPage() {
  return (
    <div 
      className="w-full min-h-screen font-sans text-[#333] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${raioBg})` }}
    >
      {/* HERO SECTION */}
      <section className="relative w-full max-w-6xl mx-auto px-6 py-12 md:py-24 flex flex-col items-center text-center">
        
        {/* TITULO UNIFICADO */}
        <div className="flex flex-col items-center mb-8">
            <h1 className="text-4xl md:text-[5.5rem] uppercase tracking-tighter text-[#4B4B48] font-bricolage leading-[0.9]">
              <span className="font-bold">M2</span> <span className="font-normal">AGORA É</span>
            </h1>
            <h1 className="text-4xl md:text-[5.5rem] font-bold uppercase tracking-tighter text-[#4B4B48] font-bricolage leading-[0.9]">
              REDBOX BRASIL.
            </h1>
        </div>

        {/* BARRA DE CORES */}
        <div className="flex items-center gap-0 w-64 md:w-96 h-3 rounded-full overflow-hidden mb-12 mx-auto">
            <div className="flex-1 h-full bg-[#E5258C]"></div>
            <div className="flex-1 h-full bg-[#00B8F1]"></div>
            <div className="flex-1 h-full bg-[#FFD400]"></div>
            <div className="flex-1 h-full bg-[#1C1C1C]"></div>
        </div>

        {/* TEXTOS DE BENEFÍCIOS */}
        <div className="space-y-4 mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-[#4B4B48] uppercase tracking-wide font-bricolage">
                CONHEÇA NOSSOS DISPLAYS
            </h3>
            
            <div className="text-lg md:text-2xl text-[#666] uppercase leading-relaxed font-light tracking-wide space-y-1 font-poppins">
                <p>FÁCIL DE TRANSPORTAR</p>
                <p>MONTAGEM SIMPLES E ULTRA RÁPIDA</p>
                <p>EFICIÊNCIA NO PONTO DE VENDA</p>
            </div>
        </div>

        {/* IMAGEM PRINCIPAL */}
        <div className="w-full max-w-5xl mx-auto mb-16">
          <img
            src={displaysImg}
            alt="Displays RedBox"
            className="w-full h-auto object-contain p-4"
          />
        </div>

        {/* LISTA DE BENEFÍCIOS (inspirado nos textos da imagem) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-8 text-center text-[#4B4B48]">
          <div>
            <h3 className="font-bold text-2xl mb-2 font-bricolage uppercase">VOILÁ</h3>
            <p className="text-base text-gray-500 font-poppins">display de balcão automático</p>
          </div>
          <div>
            <h3 className="font-bold text-2xl mb-2 font-bricolage uppercase">FLASH DISPLAY</h3>
            <p className="text-base text-gray-500 font-poppins">montagem instantânea</p>
          </div>
          <div>
            <h3 className="font-bold text-2xl mb-2 font-bricolage uppercase">DISPLAY AUTOMÁTICO</h3>
            <p className="text-base text-gray-500 font-poppins">estrutura autoexpansível</p>
          </div>
        </div>

        {/* SEÇÃO INFERIOR */}
        <div className="mt-20 flex flex-col items-center text-center max-w-4xl mx-auto">
            
            {/* Logo RedBox e Subtítulo */}
            <div className="mb-8">
               <img 
                  src={redBoxLogo} 
                  alt="RedBox Brasil" 
                  className="h-10 md:h-14 object-contain mx-auto mb-4" 
                />
                <p className="text-xl md:text-3xl font-poppins text-gray-600 italic">
                  A maior fábrica <br className="hidden md:block" />
                  de displays automáticos da europa!
                </p>
            </div>

            {/* Lista de Características */}
            <div className="space-y-4 md:space-y-6 text-[#4B4B48] font-poppins uppercase tracking-wide text-lg md:text-2xl leading-relaxed mb-16">
                <p>
                  MODELOS QUE SUPORTAM <br className="md:hidden" />
                  ATÉ <span className="font-bold">65KG POR PRATELEIRA</span>
                </p>
                <p>
                   MONTAGEM EM <span className="font-bold">3 SEGUNDOS</span>
                </p>
                <p>
                  100% RECICLÁVEL
                </p>
                <p>
                   PRODUTO PATENTEADO!
                </p>
                <p>
                   TECNOLOGIA E DESIGN <span className="font-bold italic">ITALIANO.</span>
                </p>
            </div>

            {/* SELOS */}
            <div className="w-full max-w-sm md:max-w-md">
               <img 
                 src={selosImg} 
                 alt="Selos de Qualidade" 
                 className="w-full h-auto object-contain"
               />
            </div>

        </div>

      </section>
    </div>
  );
}
