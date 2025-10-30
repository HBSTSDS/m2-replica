// src/sections/Displays.jsx
import React, { useMemo, useState } from "react";
import intro from "../assets/Displays/intro.png";
import voila from "../assets/Displays/voila.png";


function Img({ src, alt, className = "" }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`block select-none ${className}`}
      draggable="false"
    />
  );
}

export default function Displays() {
  const items = useMemo(
    () => [
      { slug: "voila", title: "Voilá", img: voila, desc: "Lorem ipsum dolor sit amet consectetur." },
      { slug: "automatico", title: "Automático", img: voila, desc: "Lorem ipsum dolor sit amet consectetur." },
      { slug: "easygreen", title: "Easy Green", img: voila, desc: "Lorem ipsum dolor sit amet consectetur." },
      { slug: "evolution", title: "Evolution", img: voila, desc: "Lorem ipsum dolor sit amet consectetur." },
      { slug: "flash", title: "Flash", img: voila, desc: "Lorem ipsum dolor sit amet consectetur." },
      { slug: "easyshelf", title: "Easy Shelf", img: voila, desc: "Lorem ipsum dolor sit amet consectetur." },
      { slug: "smartclip", title: "Smart Clip", img: voila, desc: "Lorem ipsum dolor sit amet consectetur." },
      { slug: "magicpopup", title: "Magic Pop Up", img: voila, desc: "Lorem ipsum dolor sit amet consectetur." },
      { slug: "portico", title: "Pórtico", img: voila, desc: "Lorem ipsum dolor sit amet consectetur." },
    ],
    []
  );

  const [active, setActive] = useState(0);

  return (
    <section className="w-full bg-[#EEF0F6] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl tracking-wide text-gray-700 mb-4">DISPLAYS</h2>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Imperdiet purus volutpat pharetra sit tellus pellentesque.
            </p>
          </div>

          <div className="w-full max-w-[520px] mx-auto bg-[#E7E9F2] overflow-hidden">
            <Img src={intro} alt="Displays - vitrine" className="w-full h-auto object-contain" />
          </div>
        </div>

        <div className="my-10 h-px bg-black/5" />

        <div className="grid lg:grid-cols-[220px_520px_1fr] md:grid-cols-2 gap-8 items-start">
          <div className="relative w-[220px]">
            <ul className="list-rail w-full select-none">
              {items.map((it, i) => (
                <li key={it.slug}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className="appearance-none bg-transparent p-0 m-0 cursor-pointer"
                  >
                    <span className="text-base leading-none">{it.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-last md:order-none">
            <div className="w-full max-w-[520px] mx-auto bg-[#E7E9F2] overflow-hidden">
              <Img
                key={items[active].img}
                src={items[active].img}
                alt={`Display ${items[active].title}`}
                className="w-full h-auto object-contain opacity-0 animate-[fadeIn_250ms_ease-out_forwards]"
              />
            </div>
            <style>{`@keyframes fadeIn { to { opacity: 1 } }`}</style>
          </div>

          <div className="lg:pt-4">
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              DISPLAY {items[active].title.toUpperCase()}
            </h3>
            <p className="text-gray-600 leading-relaxed">{items[active].desc}</p>
            <a href="#" className="inline-block mt-4 text-gray-700 underline underline-offset-4 hover:no-underline">
              ver detalhes &gt;&gt;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
