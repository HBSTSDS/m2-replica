import React from "react";
import voilaImg from "../assets/Displays/voila.png";
import autoImg from "../assets/Displays/displaysauto.png";
import redBoxLogo from "../assets/Displays/redBox.png";
import raioBg from "../assets/Displays/raio_display.png";
import selosImg from "../assets/Displays/selos.png";
import evoImg from "../assets/Displays/displaysevo.png";
import flashImg from "../assets/Displays/displaysflash.png";
import popupImg from "../assets/Displays/displayspopup.png";
import porticoImg from "../assets/Displays/displaysportico.png";
import RedBoxForm from "../components/RedBoxForm";

// Gallery Images
import gallery1 from "../assets/Displays/Maskgroup.png";
import gallery2 from "../assets/Displays/displayAovivo.png";
import gallery3 from "../assets/Displays/displayLivros.png";
import gallery4 from "../assets/Displays/displayCachorro.png";
import gallery5 from "../assets/Displays/displayMuie.png";
import gallery6 from "../assets/Displays/displayPorta.png";

import { useState, useEffect, useRef } from "react";

const PRODUCTS = [
  {
    id: "voila",
    title: "DISPLAY VOILÁ",
    image: voilaImg,
    desc: "Elegância e praticidade para comunicar com leveza e impacto: o Voilá é um display portátil de montagem rápida, ideal para eventos e pontos de venda, com visual limpo e área gráfica contínua. O diferencial está na facilidade de transporte e instalação, no acabamento mais premium e na troca simples de arte para campanhas diferentes.",
    variants: [
      {
        id: "P",
        label: "P",
        specs: {
          altura: "22,5cm",
          prateleiras: "5 - 3cm",
          profundidade: "14,8cm",
          largura: "15,8cm",
          peso: "5kg"
        }
      },
      {
        id: "M",
        label: "M",
        specs: {
          altura: "29,2cm",
          prateleiras: "6,5 - 4cm",
          profundidade: "19,2cm",
          largura: "20,4cm",
          peso: "5kg"
        }
      },
      {
        id: "G",
        label: "G",
        specs: {
          altura: "43,8cm",
          prateleiras: "10 e 7cm",
          profundidade: "28cm",
          largura: "30cm",
          peso: "5kg"
        }
      }
    ]
  },
  {
    id: "auto",
    title: "DISPLAY AUTOMÁTICO",
    image: autoImg,
    desc: "Abriu, montou, comunicou em segundos: o Automático é um display com estrutura autoexpansível, pensado para ações rápidas em eventos, lojas e ativações. Seu diferencial é a montagem ultrarrápida e a operação simples, reduzindo tempo de equipe e facilitando a repetição em várias praças.",
    variants: [
      {
        id: "FARM",
        label: "FARM",
        specs: {
          altura: "150cm",
          prateleiras: "30cm",
          profundidade: "40cm",
          largura: "50cm",
          peso: "12kg"
        }
      },
      {
        id: "PADRAO",
        label: "PADRÃO",
        specs: {
          altura: "190cm",
          prateleiras: "40cm",
          profundidade: "50cm",
          largura: "60cm",
          peso: "18kg"
        }
      },
      {
        id: "GRANDE",
        label: "GRANDE",
        specs: {
          altura: "210cm",
          prateleiras: "45cm",
          profundidade: "60cm",
          largura: "80cm",
          peso: "25kg"
        }
      },
      {
        id: "SLIM",
        label: "SLIM",
        specs: {
          altura: "160cm",
          prateleiras: "35cm",
          profundidade: "40cm",
          largura: "45cm",
          peso: "14kg"
        }
      }
    ]
  },
  {
    id: "evolution",
    title: "DISPLAY EVOLUTION",
    image: evoImg,
    desc: "Lorem ipsum dolor sit amet consectetur. Nibh scelerisque fames justo tristique tellus feugiat id ultricies gravida. Risus rhoncus nisi eget molestie integer morbi quis ac. Odio ac ultricies tempor consectetur sed.",
    variants: [
      {
        id: "UNICO",
        label: "ÚNICO",
        specs: {
          altura: "170cm",
          prateleiras: "28,5cm",
          profundidade: "39cm",
          largura: "48cm",
          peso: "14kg"
        }
      }
    ]
  },
  {
    id: "flash",
    title: "DISPLAY FLASH",
    image: flashImg,
    desc: "Lorem ipsum dolor sit amet consectetur. Nibh scelerisque fames justo tristique tellus feugiat id ultricies gravida. Risus rhoncus nisi eget molestie integer morbi quis ac. Odio ac ultricies tempor consectetur sed.",
    variants: [
      {
        id: "FARM",
        label: "FARM",
        specs: {
          altura: "125cm",
          prateleiras: "24,5cm",
          profundidade: "38,5cm",
          largura: "42,5cm",
          peso: "10kg"
        }
      },
      {
        id: "PADRAO",
        label: "PADRAO",
        specs: {
          altura: "170cm",
          prateleiras: "28,5cm",
          profundidade: "38,5cm",
          largura: "42,5cm",
          peso: "14kg"
        }
      }
    ]
  },
  {
    id: "magicpopup",
    title: "DISPLAY MAGIC POP UP",
    image: popupImg,
    desc: "Lorem ipsum dolor sit amet consectetur. Nibh scelerisque fames justo tristique tellus feugiat id ultricies gravida. Risus rhoncus nisi eget molestie integer morbi quis ac. Odio ac ultricies tempor consectetur sed.",
    variants: [
      {
        id: "UNICO",
        label: "ÚNICO",
        specs: {
          altura: "43,8cm",
          prateleiras: "10 e 7cm",
          profundidade: "28cm",
          largura: "30cm",
          peso: "5kg"
        }
      }
    ]
  },
  {
    id: "portico",
    title: "PÓRTICO",
    image: porticoImg,
    desc: "Lorem ipsum dolor sit amet consectetur. Nibh scelerisque fames justo tristique tellus feugiat id ultricies gravida. Risus rhoncus nisi eget molestie integer morbi quis ac. Odio ac ultricies tempor consectetur sed.",
    variants: [
      {
        id: "UNICO",
        label: "ÚNICO",
        specs: {
          altura: "43,8cm",
          prateleiras: "10 e 7cm",
          profundidade: "28cm",
          largura: "30cm",
          peso: "5kg"
        }
      }
    ]
  }
];

function ProductRow({ product, id }) {
  const [activeVariant, setActiveVariant] = useState(product.variants[0]);

  return (
    <div id={id} className="w-full max-w-6xl mx-auto mb-24 px-4 scroll-mt-32">
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 md:gap-12 items-center">
        {/* IMAGEM */}
        <div className="flex justify-center">
           <img 
             src={product.image} 
             alt={product.title} 
             className="max-h-[300px] md:max-h-[400px] object-contain drop-shadow-2xl"
           />
        </div>

        {/* CONTEÚDO */}
        <div className="text-left font-sans">
            <h2 className="text-3xl md:text-5xl font-bricolage font-bold text-[#4B4B48] uppercase mb-4">
              {product.title}
            </h2>
            <p className="text-[#666] text-base md:text-lg leading-relaxed font-poppins mb-8">
              {product.desc}
            </p>

            {/* SELETOR DE TAMANHOS (Apenas se houver mais de 1 variante) */}
            {product.variants.length > 1 && (
            <div className="flex items-center gap-4 mb-4">
               <span className="font-bold text-[#4B4B48] font-bricolage text-lg">TAMANHOS:</span>
               <div className="flex gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setActiveVariant(v)}
                      className={`
                        w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center font-bold text-sm md:text-base transition-all
                        ${activeVariant.id === v.id 
                          ? 'bg-[#333] text-white border-[#333]' 
                          : 'bg-transparent text-[#999] border-[#DDD] hover:border-[#999]'}
                      `}
                    >
                      {v.label === "PADRÃO" || v.label === "PADRAO" ? "P" : v.label.charAt(0)}
                    </button>
                  ))}
               </div>
               
               {/* Link placeholder (play icon) */}
               {/* <a href="#" className="..." > ... </a> */}
            </div>
            )}
            
            <div className="flex gap-2 mb-10 text-xs text-gray-400 font-poppins">
               {product.variants.map(v => (
                 <span key={v.id} className={activeVariant.id === v.id ? "font-bold text-black" : ""}>
                   {v.label}
                 </span>
               ))}
            </div>

        </div>
      </div>
      
      {/* SPECS ROW (Full Width) */}
      <div className="mt-8 py-6 border-t border-b border-gray-200 flex flex-wrap justify-between gap-4 text-center md:text-left">
          <div className="min-w-[80px]">
             <span className="block text-[10px] md:text-xs font-bold uppercase text-gray-400 mb-1">ALTURA</span>
             <span className="block text-sm md:text-lg font-bold text-[#4B4B48]">{activeVariant.specs.altura}</span>
          </div>
          <div className="min-w-[80px]">
             <span className="block text-[10px] md:text-xs font-bold uppercase text-gray-400 mb-1">ALTURA DAS<br/>PRATELEIRAS</span>
             <span className="block text-sm md:text-lg font-bold text-[#4B4B48]">{activeVariant.specs.prateleiras}</span>
          </div>
          <div className="min-w-[80px]">
             <span className="block text-[10px] md:text-xs font-bold uppercase text-gray-400 mb-1">PROFUNDIDADE</span>
             <span className="block text-sm md:text-lg font-bold text-[#4B4B48]">{activeVariant.specs.profundidade}</span>
          </div>
          <div className="min-w-[80px]">
             <span className="block text-[10px] md:text-xs font-bold uppercase text-gray-400 mb-1">LARGURA</span>
             <span className="block text-sm md:text-lg font-bold text-[#4B4B48]">{activeVariant.specs.largura}</span>
          </div>
          <div className="min-w-[80px]">
             <span className="block text-[10px] md:text-xs font-bold uppercase text-gray-400 mb-1">PESO POR<br/>PRATELEIRA</span>
             <span className="block text-sm md:text-lg font-bold text-[#4B4B48]">{activeVariant.specs.peso}</span>
          </div>
      </div>
    </div>

  );
}

// ... inside main component ...
        {/* LISTA DE PRODUTOS DETALHADOS */}
        <section className="w-full bg-[#FAFAFA] py-16 md:py-24">
            {PRODUCTS.map(p => <ProductRow key={p.id} product={p} />)}
        </section>

const observerOptions = {
  root: null,
  rootMargin: "-20% 0px -50% 0px", // Adjusts the "active" area
  threshold: 0.1
};

export default function RedBoxPage() {
  const [activeId, setActiveId] = useState("voila");
  const observer = useRef(null);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
            setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    PRODUCTS.forEach((p) => {
        const el = document.getElementById(p.id);
        if(el) observer.current.observe(el);
    });

    return () => {
        if(observer.current) observer.current.disconnect();
    }
  }, []);

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

        {/* LISTA DE PRODUTOS DETALHADOS */}
        {/* LISTA DE PRODUTOS COM SIDEBAR */}
        {/* LISTA DE PRODUTOS COM SIDEBAR */}
        <div className="w-full mt-32 mb-16 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12">
            
            {/* SIDEBAR DE NAVEGAÇÃO STICKY */}
            <aside className="hidden lg:block relative">
                <div className="sticky top-32 space-y-0 relative border-l-2 border-[#E0E0E0] ml-2">
                    {PRODUCTS.map((p) => {
                        const isActive = activeId === p.id;
                        return (
                            <button 
                                key={p.id}
                                onClick={() => {
                                    setActiveId(p.id);
                                    const el = document.getElementById(p.id);
                                    if(el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className={`
                                    relative block text-left text-lg font-poppins transition-all duration-300 uppercase tracking-wide pl-6 py-2
                                    ${isActive ? "text-[#333] font-bold" : "text-gray-400 font-normal hover:text-gray-600"}
                                `}
                            >
                                {/* Pink Indicator Line */}
                                {isActive && (
                                    <span className="absolute left-[-2px] top-0 h-full w-[2px] bg-[#E5258C] transition-all duration-300"></span>
                                )}
                                {p.title.replace('DISPLAY ', '')}
                            </button>
                        );
                    })}
                </div>
            </aside>

            {/* LISTA DE PRODUTOS */}
            <div className="w-full">
                {PRODUCTS.map(p => <ProductRow key={p.id} product={p} id={p.id} />)}
            </div>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <RedBoxForm />

      {/* GALERIA DE MODELOS */}
      <section className="w-full bg-[#FAFAFA] py-16 px-4">
         <h2 className="text-2xl md:text-3xl font-bold text-center text-[#333] mb-12 uppercase font-bricolage tracking-wide">
            Veja alguns modelos de display
         </h2>
         <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4">
             <div className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                <img src={gallery1} alt="Exemplo Display 1" className="w-full h-auto" />
             </div>
             <div className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                <img src={gallery2} alt="Exemplo Display 2" className="w-full h-auto" />
             </div>
             <div className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                <img src={gallery3} alt="Exemplo Display 3" className="w-full h-auto" />
             </div>
             <div className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                <img src={gallery4} alt="Exemplo Display 4" className="w-full h-auto" />
             </div>
             <div className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                <img src={gallery5} alt="Exemplo Display 5" className="w-full h-auto" />
             </div>
             <div className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                <img src={gallery6} alt="Exemplo Display 6" className="w-full h-auto" />
             </div>
         </div>
      </section>

    </div>
  );
}
