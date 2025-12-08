// hero.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./revendedor.css";
import Logo from "../../assets/SejaUmRevendedor/Vector.png";

import {
  FaInstagram,
  FaTiktok,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function Hero() {
  return (
    <section className="hero-section">
      {/* Cabeçalho */}
      <div className="hero-header">
        {/* NOVO WRAPPER DA LOGO */}
        <div className="hero-logo-box">
          <Link to="/">
            <img src={Logo} alt="Logo M2" className="revendedor-logo" />
          </Link>
        </div>

        {/* Redes sociais com ícones */}
        <div className="rede-sociais">
          <a
            href="https://www.instagram.com/m2midias/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram M2"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.tiktok.com/@m2midias?_r=1&_t=ZS-91Of1fq4tA8"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok M2"
          >
            <FaTiktok />
          </a>
          <a
            href="https://www.linkedin.com/company/m2flex/posts/?"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn M2"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://www.youtube.com/@M2Midias"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube M2"
          >
            <FaYoutube />
          </a>
        </div>
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
              LATINA
            </h1>
            <br />
            <p style={{ fontSize: "20px" }}>
              Distribuímos qualidade, tecnologia e variedade. Torne-se um
              afiliado M2 e revenda os produtos de Comunicação Visual e
              Gráfica Rápida.
            </p>

            <button className="cta-btn">SEJA UM REVENDEDOR</button>
          </div>

          {/* Vídeo */}
          <div className="hero-video max-w-[460px] rounded-2xl overflow-hidden">
            <div className="relative pt-[177.78%]">
              <iframe
                src="https://www.youtube.com/embed/uIQV3r7aijw"
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full border-none"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
