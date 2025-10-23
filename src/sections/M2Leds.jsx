export default function M2Leds() {
  return (
    <section className="bg-[#EEF0F6] py-16 md:py-20">
      {/* 👇 mais espaço entre as colunas */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-x-24 lg:gap-x-28 px-6">
        
        {/* Texto (esquerda) */}
        <div className="text-[#4B4B48]">
          <h2 className="text-3xl md:text-[32px] font-semibold tracking-tight mb-6">M2 LEDS</h2>

          <p className="mb-4 leading-relaxed">
            A M2 Leds é o braço da M2 focado em comunicação visual de alta tecnologia, unindo
            automação, engenharia e arquitetura.
          </p>

          <p className="mb-6 leading-relaxed">
            Nesse núcleo, desenvolvemos soluções visuais inovadoras com foco em impacto, design e
            tecnologia de ponta, atendendo projetos personalizados e de grande escala.
          </p>

          <p className="font-semibold mb-2">Principais especialidades:</p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li>Tecnologia em LED para fachadas, totens e ambientes interativos</li>
            <li>Impressão 3D de grandes formatos</li>
            <li>Letras Caixa e fachadas especiais</li>
            <li>Cenografia personalizada e estrutural</li>
            <li>Projetos sob medida com automação e inteligência visual</li>
          </ul>

          <p className="leading-relaxed">
            A M2 Leds transforma espaços em experiências visuais marcantes, integrando
            estética, inovação e funcionalidade.
          </p>

          <div className="flex justify-center mt-8">
            <img src="/m2-leds-logo.svg" alt="M2" className="w-24" />
          </div>

        </div>

        {/* Vídeo (direita) — agora RETÂNGULO VERTICAL */}
        <div className="flex items-center md:justify-end">
          <a
            href="#"
            className="block w-full md:w-[420px] lg:w-[460px] aspect-[3/4] rounded-[32px] bg-[#3B3B3B]
                       border border-black/10 shadow-md overflow-hidden relative group"
          >
            {/* botão play */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/0 border-2 border-white/80
                              flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <svg viewBox="0 0 60 60" className="w-8 h-8">
                  <path d="M22 18 L44 30 L22 42 Z" fill="none" stroke="white" strokeWidth="3" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}
