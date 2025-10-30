// src/sections/M2Leds.jsx
import React from "react";
import m2logo from "../assets/m2-leds-logo.svg";

export default function M2Leds() {
  return (
    <section className="bg-[#F6F7FB] text-[#1C1C1C] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        {/* Título */}
        <h2 className="text-[22px] md:text-3xl font-bold tracking-tight mb-4">
          M2 LEDS
        </h2>

        {/* Grid principal */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-12 items-start">
          {/* Coluna esquerda */}
          <div className="text-sm md:text-[15px] leading-relaxed">
            <p className="mb-4">
              A M2 Leds é o braço tecnológico da M2 focado em comunicação
              visual de alta tecnologia, onde design, engenharia e arquitetura
              trabalham juntos para transformar espaços em experiência.
            </p>

            <p className="mb-4">
              Atuamos do conceito à instalação, integrando design, escolha de
              materiais, testes e execução para entregar projetos personalizados
              e escaláveis com alto desempenho visual e confiabilidade técnica.
            </p>

            <h3 className="font-semibold mt-5 mb-3">O que fazemos:</h3>
            <ul className="space-y-2 list-disc pl-5">
              <li>
                Tecnologia em LED para fachadas, totens e ambientes imersivos;
                desenvolvimento, controle e calibração de brilho/cor para
                diferentes condições de luz.
              </li>
              <li>
                Impressão 3D de grandes formatos; prototipagem funcional e
                corte a laser de peças com precisão dimensional.
              </li>
              <li>
                Letras caixa e fachadas especiais; engenharia de comunicação
                personalizada com acabamento e durabilidade para aplicações
                internas e externas.
              </li>
              <li>
                Integração com sensores, controladores e softwares para
                conteúdos dinâmicos e experiências interativas.
              </li>
              <li>
                Estruturas sob medida com automação e segurança, pensando no
                fluxo de pessoas e na operação do cliente.
              </li>
            </ul>
          </div>

          {/* Coluna direita */}
          <div className="md:justify-self-end flex flex-col items-end gap-3">
            {/* Vídeo mock com altura ajustada */}
            <div className="relative w-[280px] sm:w-[340px] md:w-[380px] lg:w-[440px] aspect-[9/16] max-h-[580px] rounded-2xl bg-[#E5E5E5] shadow-lg overflow-hidden flex items-center justify-center">
              <button
                aria-label="Reproduzir vídeo"
                className="z-10 w-24 h-24 md:w-28 md:h-28 rounded-full bg-white/85 backdrop-blur-sm shadow flex items-center justify-center hover:scale-105 transition"
              >
                <svg width="36" height="36" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" fill="#9A9A9A" />
                </svg>
              </button>

              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/10 to-black/5" />
            </div>

            {/* Logo abaixo da caixa */}
            <img
              src={m2logo}
              alt="M2 Leds"
              className="w-[90px] md:w-[110px] h-auto select-none mt-2"
              draggable={false}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
