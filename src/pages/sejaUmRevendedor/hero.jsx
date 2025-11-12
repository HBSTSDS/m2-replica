import React from "react";
import { Link } from "react-router-dom";
import "./revendedor.css";
import Logo from "../../assets/SejaUmRevendedor/Vector.png";
import RedeSociais from "../../assets/SejaUmRevendedor/redeSociais.png";

export default function Hero() {
  return (
    <section className="hero-section">
      {/* Cabeçalho */}
      <div className="hero-header">
        <Link to="/">
          <img src={Logo} alt="Logo M2" className="revendedor-logo" />
        </Link>
        <img src={RedeSociais} alt="Redes Sociais" className="rede-sociais" />
      </div>

      {/* Conteúdo principal */}
      <div className="hero-container">
        <div className="hero-content">
          {/* Texto */}
          <div className="hero-text">
            <h1>
              A <span>MAIOR</span>
              <br />
              REVENDA UV
              <br />
              DA AMÉRICA
              <br />
              LATINA.
            </h1>

            <button className="cta-btn">SEJA UM REVENDEDOR</button>
          </div>

          {/* Vídeo */}
          <div className="hero-video">
            <div className="video-placeholder">
              <span className="play-icon">▶</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
