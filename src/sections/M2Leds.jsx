// src/sections/M2Leds.jsx
import React from "react";
import m2logo from "../assets/m2 leds.svg";

export default function M2Leds() {
  return (
    <section className="bg-[#F6F7FB] text-[#1C1C1C] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        {/* Título */}
        <h2 className="text-[22px] md:text-3xl font-bold tracking-tight mb-4 text-center md:text-left">
          M2 LEDS
        </h2>

        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-center md:text-left">
          {/* Coluna esquerda */}
          <div className="text-sm md:text-[15px] leading-relaxed flex flex-col items-center md:items-start">
            <div>
              <p className="mb-4">
                A M2 Leds é o braço tecnológico da M2 focado em comunicação
                visual de alta tecnologia, onde design, engenharia e arquitetura
                trabalham juntos para transformar espaços em experiência.
              </p>

              <p className="mb-4">
                Atuamos do conceito à instalação, integrando design, escolha de
                materiais, testes e execução para entregar projetos
                personalizados e escaláveis com alto desempenho visual e
                confiabilidade técnica.
              </p>

              <h3 className="font-semibold mt-5 mb-3">O que fazemos:</h3>
              <ul className="space-y-2 list-disc pl-5 text-left inline-block md:block">
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

            {/* Logo centralizada abaixo do texto */}
            <img
              src={m2logo}
              alt="M2 Leds"
              className="w-[100px] md:w-[120px] h-auto select-none mt-8 mx-auto"
              draggable={false}
              loading="lazy"
            />
          </div>

          {/* Coluna direita (vídeo Instagram) */}
          <div className="flex justify-center md:justify-end mt-8 md:mt-0">
            <div className="relative w-[280px] sm:w-[340px] md:w-[380px] lg:w-[440px] aspect-[9/16] max-h-[580px] rounded-2xl shadow-lg overflow-hidden flex items-center justify-center bg-white">
              <iframe
                src="https://www.instagram.com/p/DN4OUvZDIri/embed"
                title="Instagram video"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                className="w-full h-full border-none rounded-2xl"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
