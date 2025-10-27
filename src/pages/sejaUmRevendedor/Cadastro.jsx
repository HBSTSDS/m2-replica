import "./revendedor.css";
import { Link } from "react-router-dom";

export default function Cadastro(){
  return (
    <section className="section cadastro" style={{ backgroundColor: "white" }}>
      <div className="container cadastro-grid">
        <div>
          <span className="tag">SEJA REVENDEDOR</span>
          <h2 className="h2" style={{margin: '6px 0 8px'}}>Cadastre-se agora para acessar o catálogo completo</h2>
          <p className="p" style={{marginBottom:16}}>Condições exclusivas e materiais de venda.</p>
          <Link to="/seja-um-revendedor" className="btn">Comece agora</Link>
        </div>
        <div className="video-mock" aria-hidden="true"/>
      </div>
    </section>
  );
}
