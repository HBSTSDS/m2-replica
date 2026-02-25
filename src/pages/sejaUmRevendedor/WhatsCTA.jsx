import "./revendedor.css";
import { remoteAsset } from "../../utils/remoteAssets";
const ctaBg = remoteAsset("SejaUmRevendedor/cta.png");

export default function WhatsCTA() {
  return (
    <section className="section whats-cta">
      <div
        className="container whats-grid yellow-container cta-bg"
        style={{
          backgroundImage: `url(${ctaBg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
          backgroundSize: "auto 100%", // mantém a mulher perfeita
          minHeight: "480px", // 🔥 card maior
        }}
      >
        <div className="cta-content">
          <h2 className="cta-title">SEJA UM REVENDEDOR M2</h2>

          <p className="cta-subtitle">
            Transforme seu negócio com a força da maior operação UV da
            <br />
            América Latina aplicada à revenda.
          </p>

          <p className="cta-description">
            Cadastre-se para receber o catálogo completo, conhecer as
            <br />
            condições para parceiros
            <br />
            e falar com nosso time comercial.
          </p>

          <div className="cta-buttons">
            <a href="https://store.m2flex.com.br/" className="btn btn-pink" target="_blank" rel="noopener noreferrer">
              SEJA UM REVENDEDOR M2
            </a>

            <a
              href="https://wa.me/5521971050910"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-green"
            >
              FALE COM NOSSO TIME NO WHATSAPP
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
