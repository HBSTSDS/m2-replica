// src/pages/sejaUmRevendedor/Hero.jsx
import { Link } from "react-router-dom";
import "./revendedor.css";

// ✅ Caminhos corretos das imagens
import bgYellow from "../../assets/SejaUmRevendedor/Subtract-amarelo.svg";
import socials from "../../assets/SejaUmRevendedor/redeSociais.png";
import logo from "../../assets/SejaUmRevendedor/Vector.png";

export default function Hero() {
  return (
    <section
      className="section revendedor-hero"
      style={{
        // ✅ aplica o fundo amarelo via variável CSS (usada no ::after)
         background: "transparent",
        "--hero-bg-url": `url(${bgYellow})`,
        "--hero-bg-opacity": 1,
      }}
    >
      {/* ===== Fundo amarelo controlado pelo CSS ===== */}
      <div className="hero-bg" />

      {/* ===== HEADER (logo e redes) ===== */}
      <header className="revendedor-header">
        <Link to="/" className="revendedor-logo-btn" aria-label="Voltar à Home">
          <img
            src={logo}
            alt="M2"
            className="revendedor-logo"
            draggable="false"
            loading="lazy"
          />
        </Link>

        <a
          href="https://www.instagram.com/m2flex"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={socials}
            alt="Redes Sociais"
            className="revendedor-social"
            draggable="false"
            loading="lazy"
          />
        </a>
      </header>

      {/* ===== CONTEÚDO PRINCIPAL ===== */}
      <div className="revendedor-container">
        <div>
          <h1 className="h1" style={{ marginBottom: 16, color: "black" }}>
            <span className="hero-title-strong">A MAIOR</span>
            <span className="hero-title-rest">
              REVENDA UV <br /> DA AMÉRICA <br /> LATINA.
            </span>
          </h1>

          <Link to="/seja-um-revendedor" className="btn">
            Seja um revendedor
          </Link>
        </div>

        <div>
          <div className="revendedor-phone">
            <button className="play" aria-label="Play" />
          </div>
        </div>
      </div>
    </section>
  );
}
