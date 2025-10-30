import "./revendedor.css";
import eco from "../../assets/SejaUmRevendedor/eco.png";

export default function SeloVerde() {
  return (
    <section className="section eco-strip">
      <div className="eco-wrap">
        <img
          src={eco}
          alt="Produção certificada, sustentabilidade e logística nacional. Atendimento especializado para o seu negócio."
          className="eco-img"
        />
      </div>
    </section>
  );
}
