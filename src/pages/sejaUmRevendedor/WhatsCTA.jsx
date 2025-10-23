import "./revendedor.css";
import { Link } from "react-router-dom";

export default function WhatsCTA(){
  return (
    <section className="section whats-cta">
      <div className="container whats-grid">
        <div>
          <span className="tag">TENHA ACESSO EXCLUSIVO</span>
          <h2 className="h2" style={{margin:'6px 0 8px'}}>Atendimento personalizado via WhatsApp</h2>
          <p className="p" style={{marginBottom:16}}>Fale com um especialista M2 agora mesmo.</p>
          <Link to="/seja-um-revendedor" className="btn">Quero falar no Whats</Link>
        </div>
        <div className="pessoa" aria-hidden="true"/>
      </div>
    </section>
  );
}
