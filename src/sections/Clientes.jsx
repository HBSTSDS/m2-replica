// src/sections/Clientes.jsx
import React from "react";
import { remoteAsset } from "../utils/remoteAssets";

export default function Clients() {
  // Lista dos nomes dos arquivos originais na pasta assets/clientes
  const logos = [
    remoteAsset("Clientes/be180.svg"),
    remoteAsset("Clientes/betano.svg"),
    remoteAsset("Clientes/disney.svg"),
    remoteAsset("Clientes/GP.svg"),
    remoteAsset("Clientes/hortifruti.svg"),
    remoteAsset("Clientes/jcdecaux.svg"),
    remoteAsset("Clientes/lolla.svg"),
    remoteAsset("Clientes/NETFLIX.svg"),
    remoteAsset("Clientes/primo.svg"),
    remoteAsset("Clientes/RiR.svg"),
    remoteAsset("Clientes/samsung.svg"),
    remoteAsset("Clientes/sesc.svg"),
    remoteAsset("Clientes/SHELL.svg"),
    remoteAsset("Clientes/the_town.svg"),
    remoteAsset("Clientes/tim.svg"),
  ];

  const loop = [...logos, ...logos];

  return (
    <section className="w-full bg-[#EEF0F6] py-14">
      <style>{`
        @keyframes marquee {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }

        .clients-wrapper {
          display: flex;
          white-space: nowrap;
          width: max-content;
        }

        .clients-row {
          display: flex;
          white-space: nowrap;
          width: max-content;
          animation: marquee 13s linear infinite;
          transform: translateZ(0);
          will-change: transform;
        }

        @media (min-width: 769px) {
          .clients-row {
            animation-duration: 25s;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">CLIENTES</h2>

        <div
          className="relative overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          {/* wrapper necessário para o loop suave */}
          <div className="clients-wrapper">
            <div className="clients-row">
              {loop.map((src, i) => (
                <div key={i} className="shrink-0 flex items-center mx-6">
                  <img
                    src={src}
                    alt=""
                    className="h-14 w-auto opacity-80 hover:opacity-100 transition-opacity duration-200"
                    draggable="false"
                    loading={i < logos.length ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
