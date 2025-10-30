import "./revendedor.css";
import atendimento from "../../assets/SejaUmRevendedor/atendimento.png";

export default function WhatsCTA() {
  return (
    <section className="section whats-cta">
      <div className="container whats-grid">
        <img
          src={atendimento}
          alt="Atendimento via WhatsApp"
          className="whats-img"
          draggable="false"
        />
      </div>
    </section>
  );
}
