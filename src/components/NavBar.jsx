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
      {/* ===== TOPO: LOGO + HAMBURGUER (visível apenas no mobile) ===== */}
      <div 
        className="mobile-topbar" 
        style={{
          display: isEmbed ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          height: '72px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9991
        }}
      >
        {!isEmbed && (
          <Link to="/" className="block" onClick={handleSimpleLinkClick} style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="M2 Flex Logo" style={{ height: '44px', width: 'auto', display: 'block' }} />
          </Link>
        )}
        <button
          className="mobile-menu-btn hamburger-btn"
          onClick={toggleMobileMenu}
          aria-label={isMobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMobileOpen}
          style={{
            background: 'none', border: 'none', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
          }}
        >
          {isMobileOpen ? (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E5258C" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* ===== DESKTOP: layout original ===== */}
      <div className="desktop-nav-wrapper">
        <div className="flex items-center justify-between py-8">
          {!isEmbed && (
            <Link to="/" className="block logo-shift relative z-40" onClick={handleSimpleLinkClick}>
            <img src={logo} alt="M2" className="h-12 w-auto" width="180" height="48" decoding="async" fetchpriority="high" />
            </Link>
          )}

          {/* NAV ENCAPSULADA (Desktop) */}
          <nav 
            className={`nav-pill ${isEmbed ? "w-full" : ""}`}
            ref={navRef}
          >
            <ul className={`nav-list flex items-center ${isEmbed ? "justify-between w-full gap-6" : "gap-6"}`}>
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

                <div className={`nav-dropdown mobile-dropdown transition-all duration-200 ${open === "m2" ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
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

                <div className={`nav-dropdown mobile-dropdown transition-all duration-200 ${open === "servicos" ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
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

                <div className={`nav-dropdown mobile-dropdown transition-all duration-200 ${open === "solucoes" ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
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

                <div className={`nav-dropdown mobile-dropdown transition-all duration-200 ${open === "contato" ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
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

            {/* Trilho decorativo */}
            <div className="nav-rail" aria-hidden />
          </nav>
        </div>
      </div>

      {/* ===== MENU MOBILE OVERLAY ===== */}
      {isMobileOpen && (
        <div
          className="mobile-menu-overlay animate-fadeIn"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}
      <nav
        className={`mobile-nav-drawer ${isMobileOpen ? "mobile-nav-drawer--open" : ""}`}
        ref={isMobileOpen ? navRef : undefined}
        aria-label="Menu mobile"
      >
        <ul className="mobile-nav-list">
          <li>
            <button className="mobile-nav-link" onClick={(e) => { e.preventDefault(); goToSection("#home"); }}>home</button>
          </li>
          <li>
            <button className="mobile-nav-link mobile-nav-link--has-sub" onClick={toggle("m2-mob")}>
              m2
              <svg className={`mobile-nav-arrow ${open === "m2-mob" ? "rotated" : ""}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <ul className={`mobile-nav-sub ${open === "m2-mob" ? "block" : "hidden"}`}>
              <li><NavLink to="/quem-somos" className="mobile-nav-sub-link" onClick={handleSimpleLinkClick}>quem somos</NavLink></li>
              <li><NavLink to="/nossa-historia" className="mobile-nav-sub-link" onClick={handleSimpleLinkClick}>nossa história</NavLink></li>
              <li><NavLink to="/infraestrutura" className="mobile-nav-sub-link" onClick={handleSimpleLinkClick}>infraestrutura</NavLink></li>
              <li><NavLink to="/sustentabilidade" className="mobile-nav-sub-link" onClick={handleSimpleLinkClick}>sustentabilidade</NavLink></li>
            </ul>
          </li>
          <li>
            <button className="mobile-nav-link mobile-nav-link--has-sub" onClick={toggle("servicos-mob")}>
              serviços
              <svg className={`mobile-nav-arrow ${open === "servicos-mob" ? "rotated" : ""}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <ul className={`mobile-nav-sub ${open === "servicos-mob" ? "block" : "hidden"}`}>
              <li><NavLink to="/servicos/comunicacao-visual" className="mobile-nav-sub-link" onClick={handleSimpleLinkClick}>comunicação visual</NavLink></li>
              <li><NavLink to="/servicos/envelopamento" className="mobile-nav-sub-link" onClick={handleSimpleLinkClick}>envelopamento</NavLink></li>
              <li><NavLink to="/servicos/midia-ooh" className="mobile-nav-sub-link" onClick={handleSimpleLinkClick}>mídia OOH</NavLink></li>
              <li><NavLink to="/servicos/ponto-de-venda" className="mobile-nav-sub-link" onClick={handleSimpleLinkClick}>ponto de venda</NavLink></li>
              <li><NavLink to="/servicos/projetos-especiais" className="mobile-nav-sub-link" onClick={handleSimpleLinkClick}>projetos especiais</NavLink></li>
              <li><NavLink to="/servicos/sinalizacao" className="mobile-nav-sub-link" onClick={handleSimpleLinkClick}>sinalização</NavLink></li>
            </ul>
          </li>
          <li>
            <button className="mobile-nav-link mobile-nav-link--has-sub" onClick={toggle("solucoes-mob")}>
              soluções
              <svg className={`mobile-nav-arrow ${open === "solucoes-mob" ? "rotated" : ""}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <ul className={`mobile-nav-sub ${open === "solucoes-mob" ? "block" : "hidden"}`}>
              <li><NavLink to="/solucoes/vitrinismos" className="mobile-nav-sub-link" onClick={handleSimpleLinkClick}>vitrinismos</NavLink></li>
              <li><NavLink to="/solucoes/supermercados" className="mobile-nav-sub-link" onClick={handleSimpleLinkClick}>supermercados</NavLink></li>
              <li><NavLink to="/solucoes/eventos" className="mobile-nav-sub-link" onClick={handleSimpleLinkClick}>eventos</NavLink></li>
            </ul>
          </li>
          <li><NavLink to="/blog" className="mobile-nav-link" onClick={handleSimpleLinkClick}>blog</NavLink></li>
          <li>
            <button className="mobile-nav-link mobile-nav-link--has-sub" onClick={toggle("contato-mob")}>
              contato
              <svg className={`mobile-nav-arrow ${open === "contato-mob" ? "rotated" : ""}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <ul className={`mobile-nav-sub ${open === "contato-mob" ? "block" : "hidden"}`}>
              <li><NavLink to="/fale-conosco" className="mobile-nav-sub-link" onClick={handleSimpleLinkClick}>fale conosco</NavLink></li>
              <li><NavLink to="/trabalhe-conosco" className="mobile-nav-sub-link" onClick={handleSimpleLinkClick}>trabalhe com a gente</NavLink></li>
              <li><NavLink to="/avalie-a-m2" className="mobile-nav-sub-link" onClick={handleSimpleLinkClick}>avalie a M2</NavLink></li>
            </ul>
          </li>
          <li><NavLink to="/seja-um-revendedor" className="mobile-nav-link mobile-nav-link--highlight" onClick={handleSimpleLinkClick}>seja um revendedor</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}
