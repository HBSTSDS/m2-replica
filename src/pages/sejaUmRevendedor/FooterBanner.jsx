import "./revendedor.css";
import footerImg from "../../assets/SejaUmRevendedor/footer.png";

export default function FooterBanner() {
  return (
    <footer className="footer-section">
      <img
        src={footerImg}
        alt="Rodapé M2"
        className="footer-img"
        draggable="false"
      />
    </footer>
  );
}
