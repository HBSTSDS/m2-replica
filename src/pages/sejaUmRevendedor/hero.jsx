import { Link } from "react-router-dom";
import "./revendedor.css";
const asset = p => `${import.meta.env.BASE_URL}${String(p).replace(/^\/+/,"")}`;

export default function Hero(){
  return (
    <section
      className="section revendedor-hero"
      style={{
    ['--hero-bg-url']: `url(${asset('SejaUmRevendedor/Subtract-amarelo.svg')})`,
    ['--hero-bg-opacity']: 1
  }}
    >
      <div className="hero-bg" />

      <header className="revendedor-header">
        <Link to="/" className="revendedor-logo-btn" aria-label="Voltar à Home">
          <img src={asset("SejaUmRevendedor/Vector.png")} alt="M2" className="revendedor-logo" draggable="false"/>
        </Link>
        <a href="https://www.instagram.com/m2flex" target="_blank" rel="noreferrer">
          <img src={asset("SejaUmRevendedor/redeSociais.png")} alt="Redes" className="revendedor-social" draggable="false"/>
        </a>
      </header>

      <div className="revendedor-container">
        <div>
          <h1 className="h1" style={{marginBottom:16, color: "black"}}>
            <span className="hero-title-strong">A MAIOR</span>
            <span className="hero-title-rest">REVENDA UV <br/> DA AMÉRICA <br/> LATINA.</span>
          </h1>
          <Link to="/seja-um-revendedor" className="btn">Seja um revendedor</Link>
        </div>

        <div>
          <div className="revendedor-phone">
            <button className="play" aria-label="Play"/>
          </div>
        </div>
      </div>
    </section>
  );
}
