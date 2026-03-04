// src/components/Footer.jsx
import { useLocation, Link } from "react-router-dom";

import { remoteAsset } from "../utils/remoteAssets";

const bannerRevendedor = remoteAsset("bannerRevendedor.png");
const m2logo = remoteAsset("m2-logo.png");

export default function Footer({ isEmbed = false }) {
  const location = useLocation();

  const handleBannerClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resolvePath = (path) => {
    const base = "";
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `${base}/${cleanPath}`;
  };

  return (
    <>
      {location.pathname === "/" && (
        <div className="w-full mb-10">
          {isEmbed ? (
            <a href={resolvePath("/seja-um-revendedor")} target="_top" onClick={handleBannerClick}>
              <img
                src={bannerRevendedor}
                alt="A maior revenda UV da América Latina - Seja um revendedor!"
                className="w-full block object-cover cursor-pointer hover:opacity-90 transition"
                loading="lazy"
                draggable={false}
              />
            </a>
          ) : (
            <Link to="seja-um-revendedor" onClick={handleBannerClick}>
              <img
                src={bannerRevendedor}
                alt="A maior revenda UV da América Latina - Seja um revendedor!"
                className="w-full block object-cover cursor-pointer hover:opacity-90 transition"
                loading="lazy"
                draggable={false}
              />
            </Link>
          )}
        </div>
      )}

      <footer className="bg-[#E7E9F2] text-[#4B4B48] text-sm pt-0">
        {/* Faixas coloridas no topo */}
        <div className="flex w-full">
          <div className="flex-1 h-2 bg-[#E5258C]" />
          <div className="flex-1 h-2 bg-[#00B8F1]" />
          <div className="flex-1 h-2 bg-[#FFD400]" />
          <div className="flex-1 h-2 bg-[#1C1C1C]" />
        </div>

        {/* Conteúdo principal */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6 py-12">
          {/* Lado esquerdo */}
          <div>
            <img
              src={m2logo}
              alt="M2 Flex"
              className="w-28 mb-4"
              loading="lazy"
              draggable={false}
            />

            <div className="flex items-center gap-3 mb-5">
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram text-[#4B4B48] hover:text-[#156BB8]" />
              </a>
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook text-[#4B4B48] hover:text-[#156BB8]" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="fab fa-linkedin text-[#4B4B48] hover:text-[#156BB8]" />
              </a>
            </div>

            <p className="font-semibold tracking-wide">ENDEREÇOS</p>
            <p className="mt-1 flex items-start gap-2">
              <span>📍</span> Av. Brasil 12,025 – Penha, Rio de Janeiro
            </p>
            <p className="flex items-start gap-2">
              <span>📍</span> Av. das Nações Unidas, 17007 – 8º andar – Torre Sigma<br />
              &nbsp;&nbsp;&nbsp;&nbsp;Várzea de Baixo – São Paulo – SP
            </p>
          </div>

          {/* Lado direito */}
          <div className="md:text-right">
            <p className="font-semibold tracking-wide">PRECISA DE AJUDA?</p>
            <p className="mt-1">
              Entre em contato com nosso SAC.<br />
              Estamos prontos para atender você.
            </p>
            <p className="mt-3">Segunda a sexta, das 09h às 18h</p>

            <p className="mt-2 flex items-center justify-start md:justify-end gap-2 font-semibold">
              <span>📞</span> (21) 97105-0910
            </p>
            <p className="mt-1 flex items-center justify-start md:justify-end gap-2">
              <span>✉️</span>
              <a
                href="mailto:contato@m2flex.com.br"
                className="font-semibold underline decoration-[#4B4B48] underline-offset-4"
              >
                contato@m2flex.com.br
              </a>
            </p>
          </div>
        </div>

        {/* Linha inferior */}
        <div className="border-t border-[#cfcfcf]">
          <div className="max-w-6xl mx-auto px-6 py-8 text-[13px]">
            <nav className="footer-links flex flex-wrap justify-between gap-y-2 mb-6 leading-tight">
              <a 
                href="/docs/politica_de_privacidade.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline decoration-[#E5258C] underline-offset-4 font-medium decoration-1"
              >
                POLÍTICA DE PRIVACIDADE
              </a>
              <a 
                href="/docs/politica_ambiental.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline decoration-[#4B4B48] underline-offset-4 font-medium decoration-1"
              >
                POLÍTICA AMBIENTAL
              </a>
              <a href="#" className="underline decoration-[#4B4B48] underline-offset-4 font-medium decoration-1">
                TERMOS DE GARANTIA
              </a>
              <a 
                href="/docs/codigo_de_etica_m2.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline decoration-[#4B4B48] underline-offset-4 font-medium decoration-1"
              >
                CÓDIGO DE ÉTICA
              </a>
              <Link to="/canal-de-denuncias" className="underline decoration-[#4B4B48] underline-offset-4 font-medium decoration-1">
                CANAL DE DENÚNCIAS
              </Link>
            </nav>

            <p className="text-center leading-tight">
              © Copyright 2025 – M2 Flex · Todos os direitos reservados.<br />
              Desenvolvido por M2 Flex.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
