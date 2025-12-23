import "./revendedor.css";
import footerImg from "../../assets/SejaUmRevendedor/footer.png";
import {
  FaInstagram,
  FaTiktok,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function FooterBanner() {
  return (
    <footer className="footer-section">
      <img
        src={footerImg}
        alt="Rodapé M2"
        className="footer-img"
        draggable="false"
      />
      <div className="footer-social-overlay">
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
    </footer>
  );
}
