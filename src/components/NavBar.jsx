import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/m2-logo.png";

export default function NavBar() {
  const [open, setOpen] = useState(null); // submenu desktop: "m2" | "servicos" | "solucoes" | "contato" | null
  const [menuOpen, setMenuOpen] = useState(false); // menu mobile
  const [activeSection, setActiveSection] = useState(null); // submenu mobile
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Refs para click-outside
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileToggleRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const closeAllMenus = () => {
    setOpen(null);
    setActiveSection(null);
    setMenuOpen(false);
  };

  const handleItemClick = () => {
    // Fecha dropdown no desktop e todo o menu no mobile
    if (isMobile) {
      setMenuOpen(false);
      setActiveSection(null);
    }
    setOpen(null);
  };

  const goToSection = (hash) => {
    closeAllMenus();
    navigate("/");
    requestAnimationFrame(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    });
  };

  const toggleMobileSubmenu = (name) => {
    setActiveSection((curr) => (curr === name ? null : name));
  };

  // === CLICK-OUTSIDE & ESC ===
  useEffect(() => {
    const onPointerDown = (e) => {
      // Se nada está aberto, ignora
      if (!menuOpen && !open) return;

      const target = e.target;

      // Ignora cliques no header (área “segura” do nav) quando é interação interna
      const clickedInsideHeader =
        headerRef.current && headerRef.current.contains(target);

      // Ignora o botão toggle do mobile
      const clickedToggle =
        mobileToggleRef.current && mobileToggleRef.current.contains(target);

      // Ignora cliques dentro do menu mobile quando ele está aberto
      const clickedInsideMobileMenu =
        mobileMenuRef.current && mobileMenuRef.current.contains(target);

      // Se for dentro do header (menus/itens) ou no toggle ou dentro do menu mobile, não fecha
      if (clickedInsideHeader || clickedToggle || clickedInsideMobileMenu) return;

      // Fora de tudo => fecha
      closeAllMenus();
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape" && (menuOpen || open)) {
        closeAllMenus();
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown, { passive: true });
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, open]);

  return (
    <header
      ref={headerRef}
      className="topbar fixed top-0 left-0 w-full bg-[#F5F7FB] z-50 shadow-sm"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between py-5 relative">
          <Link to="/" className="block" onClick={handleItemClick}>
            <img src={logo} alt="M2" className="h-10 w-auto" />
          </Link>

          {/* ===== MENU DESKTOP ===== */}
          {!isMobile && (
            <nav className="nav-pill">
              <ul className="nav-list flex items-center gap-6">
                <li>
                  <button className="nav-link" onClick={() => goToSection("#home")}>
                    home
                  </button>
                </li>

                <li className="relative">
                  <button
                    className="nav-link"
                    onClick={() => setOpen(open === "m2" ? null : "m2")}
                    aria-expanded={open === "m2"}
                    aria-haspopup="true"
                  >
                    m2
                  </button>
                  {open === "m2" && (
                    <div className="nav-dropdown" onMouseLeave={() => setOpen(null)}>
                      <div className="inner py-2">
                        <NavLink to="/quem-somos" className="nav-item" onClick={handleItemClick}>
                          quem somos
                        </NavLink>
                        <NavLink to="/nossa-historia" className="nav-item" onClick={handleItemClick}>
                          nossa história
                        </NavLink>
                        <NavLink to="/infraestrutura" className="nav-item" onClick={handleItemClick}>
                          infraestrutura
                        </NavLink>
                        <NavLink to="/sustentabilidade" className="nav-item" onClick={handleItemClick}>
                          sustentabilidade
                        </NavLink>
                      </div>
                    </div>
                  )}
                </li>

                <li className="relative">
                  <button
                    className="nav-link"
                    onClick={() => setOpen(open === "servicos" ? null : "servicos")}
                    aria-expanded={open === "servicos"}
                    aria-haspopup="true"
                  >
                    serviços
                  </button>
                  {open === "servicos" && (
                    <div className="nav-dropdown" onMouseLeave={() => setOpen(null)}>
                      <div className="inner py-2">
                        <NavLink
                          to="/servicos/comunicacao-visual"
                          className="nav-item"
                          onClick={handleItemClick}
                        >
                          comunicação visual
                        </NavLink>
                        <NavLink
                          to="/servicos/envelopamento"
                          className="nav-item"
                          onClick={handleItemClick}
                        >
                          envelopamento
                        </NavLink>
                        <NavLink to="/servicos/midia-ooh" className="nav-item" onClick={handleItemClick}>
                          mídia OOH
                        </NavLink>
                        <NavLink
                          to="/servicos/ponto-de-venda"
                          className="nav-item"
                          onClick={handleItemClick}
                        >
                          ponto de venda
                        </NavLink>
                        <NavLink
                          to="/servicos/projetos-especiais"
                          className="nav-item"
                          onClick={handleItemClick}
                        >
                          projetos especiais
                        </NavLink>
                        <NavLink to="/servicos/sinalizacao" className="nav-item" onClick={handleItemClick}>
                          sinalização
                        </NavLink>
                      </div>
                    </div>
                  )}
                </li>

                <li className="relative">
                  <button
                    className="nav-link"
                    onClick={() => setOpen(open === "solucoes" ? null : "solucoes")}
                    aria-expanded={open === "solucoes"}
                    aria-haspopup="true"
                  >
                    soluções
                  </button>
                  {open === "solucoes" && (
                    <div className="nav-dropdown" onMouseLeave={() => setOpen(null)}>
                      <div className="inner py-2">
                        <NavLink to="/solucoes/vitrinismos" className="nav-item" onClick={handleItemClick}>
                          vitrinismos
                        </NavLink>
                        <NavLink to="/solucoes/supermercados" className="nav-item" onClick={handleItemClick}>
                          supermercados
                        </NavLink>
                        <NavLink to="/solucoes/eventos" className="nav-item" onClick={handleItemClick}>
                          eventos
                        </NavLink>
                      </div>
                    </div>
                  )}
                </li>

                <li>
                  <NavLink to="/blog" className="nav-link" onClick={handleItemClick}>
                    blog
                  </NavLink>
                </li>

                <li className="relative">
                  <button
                    className="nav-link"
                    onClick={() => setOpen(open === "contato" ? null : "contato")}
                    aria-expanded={open === "contato"}
                    aria-haspopup="true"
                  >
                    contato
                  </button>
                  {open === "contato" && (
                    <div className="nav-dropdown" onMouseLeave={() => setOpen(null)}>
                      <div className="inner py-2">
                        <NavLink to="/fale-conosco" className="nav-item" onClick={handleItemClick}>
                          fale conosco
                        </NavLink>
                        <NavLink to="/trabalhe-conosco" className="nav-item" onClick={handleItemClick}>
                          trabalhe com a gente
                        </NavLink>
                        <NavLink to="/avalie-a-m2" className="nav-item" onClick={handleItemClick}>
                          avalie a M2
                        </NavLink>
                      </div>
                    </div>
                  )}
                </li>

                <li>
                  <NavLink to="/seja-um-revendedor" className="nav-link" onClick={handleItemClick}>
                    seja um revendedor
                  </NavLink>
                </li>
              </ul>
              <div className="nav-rail" aria-hidden />
            </nav>
          )}
        </div>
      </div>

      {/* ===== BOTÃO MOBILE ===== */}
      {isMobile && (
        <button
          ref={mobileToggleRef}
          className="nav-toggle fixed top-4 right-4 bg-[#E5258C] text-white px-4 py-2 rounded-md text-sm font-medium shadow-md z-50"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          ☰
        </button>
      )}

      {/* ===== MENU MOBILE ===== */}
      {menuOpen && (
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className="fixed top-[72px] left-0 right-0 bg-white z-40 flex flex-col items-center text-center px-6 py-5 border-t border-gray-200 animate-slideDown shadow-md max-h-[80vh] overflow-y-auto"
        >
          <button
            onClick={() => goToSection("#home")}
            className="w-full border border-gray-200 rounded-lg py-2 mb-2 hover:bg-gray-100 transition text-[#E5258C] font-semibold"
          >
            home
          </button>

          {/* M2 */}
          <div className="w-full">
            <button
              onClick={() => toggleMobileSubmenu("m2")}
              className="w-full border border-gray-200 rounded-lg py-2 mb-2 hover:bg-gray-100 transition text-[#E5258C] font-semibold"
              aria-expanded={activeSection === "m2"}
              aria-controls="submenu-m2"
            >
              m2
            </button>
            {activeSection === "m2" && (
              <div id="submenu-m2" className="flex flex-col gap-2 mt-1">
                <NavLink
                  to="/quem-somos"
                  className="border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition"
                  onClick={handleItemClick}
                >
                  quem somos
                </NavLink>
                <NavLink
                  to="/nossa-historia"
                  className="border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition"
                  onClick={handleItemClick}
                >
                  nossa história
                </NavLink>
                <NavLink
                  to="/infraestrutura"
                  className="border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition"
                  onClick={handleItemClick}
                >
                  infraestrutura
                </NavLink>
                <NavLink
                  to="/sustentabilidade"
                  className="border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition"
                  onClick={handleItemClick}
                >
                  sustentabilidade
                </NavLink>
              </div>
            )}
          </div>

          {/* SERVIÇOS */}
          <div className="w-full">
            <button
              onClick={() => toggleMobileSubmenu("servicos")}
              className="w-full border border-gray-200 rounded-lg py-2 mb-2 hover:bg-gray-100 transition text-[#E5258C] font-semibold"
              aria-expanded={activeSection === "servicos"}
              aria-controls="submenu-servicos"
            >
              serviços
            </button>
            {activeSection === "servicos" && (
              <div id="submenu-servicos" className="flex flex-col gap-2 mt-1">
                <NavLink
                  to="/servicos/comunicacao-visual"
                  className="border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition"
                  onClick={handleItemClick}
                >
                  comunicação visual
                </NavLink>
                <NavLink
                  to="/servicos/envelopamento"
                  className="border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition"
                  onClick={handleItemClick}
                >
                  envelopamento
                </NavLink>
                <NavLink
                  to="/servicos/midia-ooh"
                  className="border border-gray-200 rounded-lg py-2 hover-bg-gray-50 transition"
                  onClick={handleItemClick}
                >
                  mídia OOH
                </NavLink>
                <NavLink
                  to="/servicos/ponto-de-venda"
                  className="border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition"
                  onClick={handleItemClick}
                >
                  ponto de venda
                </NavLink>
                <NavLink
                  to="/servicos/projetos-especiais"
                  className="border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition"
                  onClick={handleItemClick}
                >
                  projetos especiais
                </NavLink>
                <NavLink
                  to="/servicos/sinalizacao"
                  className="border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition"
                  onClick={handleItemClick}
                >
                  sinalização
                </NavLink>
              </div>
            )}
          </div>

          {/* BLOG */}
          <NavLink
            to="/blog"
            className="w-full border border-gray-200 rounded-lg py-2 my-2 hover:bg-gray-100 transition text-[#E5258C] font-semibold"
            onClick={handleItemClick}
          >
            blog
          </NavLink>

          {/* CONTATO */}
          <div className="w-full">
            <button
              onClick={() => toggleMobileSubmenu("contato")}
              className="w-full border border-gray-200 rounded-lg py-2 mb-2 hover:bg-gray-100 transition text-[#E5258C] font-semibold"
              aria-expanded={activeSection === "contato"}
              aria-controls="submenu-contato"
            >
              contato
            </button>
            {activeSection === "contato" && (
              <div id="submenu-contato" className="flex flex-col gap-2 mt-1">
                <NavLink
                  to="/fale-conosco"
                  className="border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition"
                  onClick={handleItemClick}
                >
                  fale conosco
                </NavLink>
                <NavLink
                  to="/trabalhe-conosco"
                  className="border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition"
                  onClick={handleItemClick}
                >
                  trabalhe com a gente
                </NavLink>
                <NavLink
                  to="/avalie-a-m2"
                  className="border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition"
                  onClick={handleItemClick}
                >
                  avalie a M2
                </NavLink>
              </div>
            )}
          </div>

          {/* REVENDEDOR */}
          <NavLink
            to="/seja-um-revendedor"
            className="w-full border border-gray-200 rounded-lg py-2 mt-2 hover:bg-gray-100 transition text-[#E5258C] font-semibold"
            onClick={handleItemClick}
          >
            seja um revendedor
          </NavLink>
        </div>
      )}
    </header>
  );
}
