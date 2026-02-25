import "./revendedor.css";
import { remoteAsset } from "../../utils/remoteAssets";
const bento = remoteAsset("SejaUmRevendedor/bento.png");

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
