import "./revendedor.css";
import bento from "../../assets/SejaUmRevendedor/bento.png";

export default function Destaques() {
  return (
    <section className="section destaques">
      <div
        className="destaques-banner"
        style={{ "--dstk-img": `url(${bento})` }}
      />
    </section>
  );
}
