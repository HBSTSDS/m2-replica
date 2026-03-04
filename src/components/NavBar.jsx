// src/components/NavBar.jsx
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { remoteAsset } from "../utils/remoteAssets";
const logo = remoteAsset("m2-logo.png");

/** Constrói URLs com o BASE_URL (mantida como no seu código) */
function asset(path) {
  const clean = String(path).replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${clean}`;
}

export default function NavBar({ isEmbed }) {
  const [open, setOpen] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();

  /** Scroll suave para um id da Home, mantendo sua função */
  const goToSection = (hash) => {
    setOpen(null);
    setIsMobileOpen(false);
    navigate("/"); // garante que estamos na Home
    requestAnimationFrame(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(null) && setIsMobileOpen(false);
    const onClickOutside = (e) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target) && !e.target.closest('.mobile-menu-btn')) {
        setOpen(null);
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClickOutside);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClickOutside);
    };
  }, []);

  const toggle = (id) => (e) => {
    e.stopPropagation();
    setOpen((curr) => (curr === id ? null : id));
  };

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setIsMobileOpen(!isMobileOpen);
    if(isMobileOpen) {
      setOpen(null);
    }
  };

  // Click on a simple link (clears menu states)
  const handleSimpleLinkClick = () => {
    setOpen(null);
    setIsMobileOpen(false);
  };

  // usa asset() para não ficar “unused” (grava o base numa data-attr)
  const baseUrl = asset("/");

  return (
    <header
      className="topbar fixed top-0 left-0 w-full z-50"
      data-base={baseUrl}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between py-8">
          {/* LOGO (Apenas se NÃO for embed) */}
          {!isEmbed && (
            <Link to="/" className="block logo-shift relative z-40" onClick={handleSimpleLinkClick}>
              <img src={logo} alt="M2" className="h-12 w-auto" />
            </Link>
          )}

          {/* HAMBURGER BTN (Móbile) */}
          <button
            className={`mobile-menu-btn md:hidden relative z-60 p-2 text-gray-800 ml-auto`}
            onClick={toggleMobileMenu}
            aria-label="Abrir menu"
          >
            {isMobileOpen ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>

          {/* BACKDROP (Mobile) */}
          {isMobileOpen && (
            <div 
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden animate-fadeIn" 
              onClick={() => setIsMobileOpen(false)}
              aria-hidden="true"
            />
          )}

          {/* NAV ENCAPSULADA / DRAWER NO MOBILE */}
          <nav 
            className={`nav-pill ${isEmbed ? "w-full" : ""} 
              md:block fixed top-0 right-0 h-full w-[280px] bg-white z-50 
              transition-transform duration-300 ease-in-out transform 
              ${isMobileOpen ? "translate-x-0" : "translate-x-full"}
              md:relative md:inset-auto md:h-auto md:w-auto md:bg-[#EEF0F6] 
              md:translate-x-0 m-0 !rounded-none md:!rounded-full 
              flex flex-col md:flex-row pt-24 md:pt-0 pb-8 md:pb-0 
              overflow-y-auto md:overflow-visible`} 
            ref={navRef}
          >
            <ul className={`nav-list flex items-center ${isEmbed ? "justify-between w-full gap-6" : "gap-6"} flex-col md:flex-row w-full md:w-auto`}>
              {/* HOME: usa goToSection para não simplificar seu código */}
              <li>
                <button
                  className={`nav-link ${isEmbed ? "!p-0" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    goToSection("#home");
                  }}
                  title="Home"
                >
                  {isEmbed ? <img src={logo} alt="M2" className="h-10 w-auto" /> : "home"}
                </button>
              </li>

              {/* M2 */}
              <li className="relative w-full md:w-auto text-center md:text-left">
                <button
                  className="nav-link w-full md:w-auto justify-center md:justify-start"
                  aria-haspopup="true"
                  aria-expanded={open === "m2"}
                  onClick={toggle("m2")}
                >
                  m2
                </button>

                {open === "m2" && (
                  <div className="nav-dropdown mobile-dropdown">
                    <div className="inner py-2">
                      <NavLink to="/quem-somos" className="nav-item" onClick={handleSimpleLinkClick}>
                        quem somos
                      </NavLink>
                      <NavLink to="/nossa-historia" className="nav-item" onClick={handleSimpleLinkClick}>
                        nossa história
                      </NavLink>
                      <NavLink to="/infraestrutura" className="nav-item" onClick={handleSimpleLinkClick}>
                        infraestrutura
                      </NavLink>
                      <NavLink to="/sustentabilidade" className="nav-item" onClick={handleSimpleLinkClick}>
                        sustentabilidade
                      </NavLink>
                    </div>
                  </div>
                )}
              </li>

              {/* SERVIÇOS */}
              <li className="relative w-full md:w-auto text-center md:text-left">
                <button
                  className="nav-link w-full md:w-auto justify-center md:justify-start"
                  aria-haspopup="true"
                  aria-expanded={open === "servicos"}
                  onClick={toggle("servicos")}
                >
                  serviços
                </button>

                {open === "servicos" && (
                  <div className="nav-dropdown mobile-dropdown">
                    <div className="inner py-2">
                      <NavLink to="/servicos/comunicacao-visual" className="nav-item" onClick={handleSimpleLinkClick}>
                        comunicação visual
                      </NavLink>
                      <NavLink to="/servicos/envelopamento" className="nav-item" onClick={handleSimpleLinkClick}>
                        envelopamento
                      </NavLink>
                      <NavLink to="/servicos/midia-ooh" className="nav-item" onClick={handleSimpleLinkClick}>
                        mídia OOH
                      </NavLink>
                      <NavLink to="/servicos/ponto-de-venda" className="nav-item" onClick={handleSimpleLinkClick}>
                        ponto de venda
                      </NavLink>
                      <NavLink to="/servicos/projetos-especiais" className="nav-item" onClick={handleSimpleLinkClick}>
                        projetos especiais
                      </NavLink>
                      <NavLink to="/servicos/sinalizacao" className="nav-item" onClick={handleSimpleLinkClick}>
                        sinalização
                      </NavLink>
                    </div>
                  </div>
                )}
              </li>

              {/* SOLUÇÕES */}
              <li className="relative w-full md:w-auto text-center md:text-left">
                <button
                  className="nav-link w-full md:w-auto justify-center md:justify-start"
                  aria-haspopup="true"
                  aria-expanded={open === "solucoes"}
                  onClick={toggle("solucoes")}
                >
                  soluções
                </button>

                {open === "solucoes" && (
                  <div className="nav-dropdown mobile-dropdown">
                    <div className="inner py-2">
                      <NavLink to="/solucoes/vitrinismos" className="nav-item" onClick={handleSimpleLinkClick}>
                        vitrinismos
                      </NavLink>
                      <NavLink to="/solucoes/supermercados" className="nav-item" onClick={handleSimpleLinkClick}>
                        supermercados
                      </NavLink>
                      <NavLink to="/solucoes/eventos" className="nav-item" onClick={handleSimpleLinkClick}>
                        eventos
                      </NavLink>
                    </div>
                  </div>
                )}
              </li>

              {/* BLOG */}
              <li className="w-full md:w-auto text-center md:text-left">
                <NavLink to="/blog" className="nav-link w-full justify-center md:justify-start" onClick={handleSimpleLinkClick}>
                  blog
                </NavLink>
              </li>

              {/* CONTATO */}
              <li className="relative w-full md:w-auto text-center md:text-left">
                <button
                  className="nav-link w-full md:w-auto justify-center md:justify-start"
                  aria-haspopup="true"
                  aria-expanded={open === "contato"}
                  onClick={toggle("contato")}
                >
                  contato
                </button>

                {open === "contato" && (
                  <div className="nav-dropdown mobile-dropdown">
                    <div className="inner py-2">
                      <NavLink to="/fale-conosco" className="nav-item" onClick={handleSimpleLinkClick}>
                        fale conosco
                      </NavLink>
                      <NavLink to="/trabalhe-conosco" className="nav-item" onClick={handleSimpleLinkClick}>
                        trabalhe com a gente
                      </NavLink>
                      <NavLink to="/avalie-a-m2" className="nav-item" onClick={handleSimpleLinkClick}>
                        avalie a M2
                      </NavLink>
                    </div>
                  </div>
                )}
              </li>

              {/* REVENDEDOR */}
              <li className="w-full md:w-auto text-center md:text-left">
                <NavLink to="/seja-um-revendedor" className="nav-link w-full justify-center md:justify-start" onClick={handleSimpleLinkClick}>
                  seja um revendedor
                </NavLink>
              </li>

              {/* ÍCONE DE BUSCA */}
              <li className="w-full md:w-auto flex justify-center mt-4 md:mt-0">
                <button className="nav-search" aria-label="buscar" title="buscar" onClick={handleSimpleLinkClick}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                    <path d="M20 20L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </li>
            </ul>

            {/* Trilho decorativo (apenas no desktop) */}
            <div className="nav-rail hidden md:block" aria-hidden />
          </nav>
        </div>
      </div>
    </header>
  );
}
