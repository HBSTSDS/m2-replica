import React from "react";

export default function Clients() {
  const logos = [
    "/Clientes/be180.svg",
    "/Clientes/betano.svg",
    "/Clientes/disney.svg",
    "/Clientes/GP.svg",
    "/Clientes/hortifruti.svg",
    "/Clientes/jcdecaux.svg",
    "/Clientes/lolla.svg",
    "/Clientes/NETFLIX.svg",
    "/Clientes/prime.svg",
    "/Clientes/RIR.svg",
    "/Clientes/samsung.svg",
    "/Clientes/sesc.svg",
    "/Clientes/SHELL.svg",
    "/Clientes/the town.svg",
    "/Clientes/tim.svg",
  ];

  const loop = [...logos, ...logos];

  return (
    <section className="w-full bg-[#EEF0F6] py-14">
      {/* animação local */}
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
