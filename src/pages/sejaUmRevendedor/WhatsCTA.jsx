import "./revendedor.css";

function asset(path) {
  const clean = String(path).replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${clean}`;
}

export default function WhatsCTA() {
  return (
    <section className="section whats-cta">
      <div className="container whats-grid">
        <img
          src={asset("SejaUmRevendedor/atendimento.png")}
          alt="Atendimento via WhatsApp"
          className="whats-img"
          draggable="false"
        />
      </div>
    </section>
  );
}
