import "./revendedor.css";
const asset = (p) => `${import.meta.env.BASE_URL}${String(p).replace(/^\/+/, "")}`;

export default function Destaques() {
  return (
    <section className="section destaques">
      <div
        className="destaques-banner"
        style={{ "--dstk-img": `url(${asset("SejaUmRevendedor/bento.png")})` }}
      />
    </section>
  );
}
