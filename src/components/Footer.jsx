import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  return (
    <>
      {/* Banner só na Home */}
      {location.pathname === "/" && (
        <div className="w-full mb-10">
          <img
            src="/bannerRevendedor.png"
            alt="A maior revenda UV da América Latina - Seja um revendedor!"
            className="w-full block object-cover"
            loading="lazy"
          />
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
            <img src="/m2-logo.png" alt="M2 Flex" className="w-28 mb-4" />

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
              <span>📞</span> (21) 97322-2743
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

        {/* Linha inferior – políticas ocupando toda a largura do container */}
        <div className="border-t border-[#cfcfcf]">
          <div className="max-w-6xl mx-auto px-6 py-8 text-[13px]">
            {/* Políticas — alinhadas de ponta a ponta */}
            <nav className="footer-links flex flex-wrap justify-between gap-y-2 mb-6 leading-tight">
              <a
                href="#"
                className="underline decoration-[#4B4B48] underline-offset-4 font-medium decoration-1"
              >
                POLÍTICA DE PRIVACIDADE
              </a>
              <a
                href="#"
                className="underline decoration-[#4B4B48] underline-offset-4 font-medium decoration-1"
              >
                POLÍTICA AMBIENTAL
              </a>
              <a
                href="#"
                className="underline decoration-[#4B4B48] underline-offset-4 font-medium decoration-1"
              >
                TERMOS DE GARANTIA
              </a>
              <a
                href="#"
                className="underline decoration-[#4B4B48] underline-offset-4 font-medium decoration-1"
              >
                CÓDIGO DE ÉTICA
              </a>
              <a
                href="#"
                className="underline decoration-[#4B4B48] underline-offset-4 font-medium decoration-1"
              >
                CANAL DE DENÚNCIAS
              </a>
            </nav>

            {/* Copyright — centralizado e separado visualmente */}
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
