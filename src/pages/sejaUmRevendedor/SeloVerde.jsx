import "./revendedor.css";
const asset = (p) => `${import.meta.env.BASE_URL}${String(p).replace(/^\/+/, "")}`;

export default function SeloVerde() {
  return (
    <section className="section eco-strip">
      <div className="eco-wrap">
        <img
          src={asset("SejaUmRevendedor/eco.png")}
          alt="Produção certificada, sustentabilidade e logística nacional. Atendimento especializado para o seu negócio."
          className="eco-img"
        />
      </div>
    </section>
  );
}
