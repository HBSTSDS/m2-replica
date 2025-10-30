// src/sections/Clientes.jsx
import React from "react";
import be180 from "../assets/clientes/be180.svg";
import betano from "../assets/clientes/betano.svg";
import disney from "../assets/clientes/disney.svg";
import gp from "../assets/clientes/GP.svg";
import hortifruti from "../assets/clientes/hortifruti.svg";
import jcdecaux from "../assets/clientes/jcdecaux.svg";
import lolla from "../assets/clientes/lolla.svg";
import netflix from "../assets/clientes/NETFLIX.svg";
import prime from "../assets/clientes/prime.svg";
import rir from "../assets/clientes/RIR.svg";
import samsung from "../assets/clientes/samsung.svg";
import sesc from "../assets/clientes/sesc.svg";
import shell from "../assets/clientes/SHELL.svg";
import thetown from "../assets/clientes/the_town.svg";
import tim from "../assets/clientes/tim.svg";

export default function Clients() {
  const logos = [
    be180, betano, disney, gp, hortifruti, jcdecaux, lolla,
    netflix, prime, rir, samsung, sesc, shell, thetown, tim
  ];

  const loop = [...logos, ...logos];

  return (
    <section className="w-full bg-[#EEF0F6] py-14">
      <style>{`
        @keyframes clients-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
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
          <div
            className="
              flex flex-nowrap gap-14 will-change-transform
              animate-[clients-marquee_25s_linear_infinite]
              hover:[animation-play-state:paused]
            "
          >
            {loop.map((src, i) => (
              <div key={i} className="shrink-0 flex items-center">
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
    </section>
  );
}
