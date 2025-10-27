import "./revendedor.css";

const base = import.meta.env.BASE_URL || "/";

export default function FooterBanner() {
  const srcPng  = `${base}SejaUmRevendedor/footer.png`;
  const srcJpg  = `${base}SejaUmRevendedor/footer.jpg`;
  const srcJpeg = `${base}SejaUmRevendedor/footer.jpeg`;

  return (
    <footer className="footer-section">
      <img
        src={srcPng}
        alt="Rodapé M2"
        className="footer-img"
        draggable="false"
        onError={(e) => {
          // fallback automático se não existir .png
          if (e.currentTarget.src !== srcJpg) {
            e.currentTarget.src = srcJpg;
          } else if (e.currentTarget.src !== srcJpeg) {
            e.currentTarget.src = srcJpeg;
          }
        }}
      />
    </footer>
  );
}
