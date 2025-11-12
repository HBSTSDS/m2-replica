import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/m2-logo.png";

export default function NavBar() {
  const [open, setOpen] = useState(null); // submenu desktop
  const [menuOpen, setMenuOpen] = useState(false); // menu mobile
  const [activeSection, setActiveSection] = useState(null); // submenu mobile
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const goToSection = (hash) => {
    setMenuOpen(false);
    navigate("/");
    requestAnimationFrame(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    });
  };

  const toggleMobileSubmenu = (name) => {
    setActiveSection((curr) => (curr === name ? null : name));
  };

  return (
    <header className="topbar fixed top-0 left-0 w-full bg-[#F5F7FB] z-50 shadow-sm">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between py-5 relative">
          <Link to="/" className="block">
            <img src={logo} alt="M2" className="h-10 w-auto" />
          </Link>

          {/* ===== MENU DESKTOP ===== */}
          {!isMobile && (
            <nav className="nav-pill">
              <ul className="nav-list flex items-center gap-6">
                <li>
                  <button
                    className="nav-link"
                    onClick={() => goToSection("#home")}
                  >
                    home
                  </button>
                </li>

                <li className="relative">
                  <button
                    className="nav-link"
                    onClick={() => setOpen(open === "m2" ? null : "m2")}
                  >
                    m2
                  </button>
                  {open === "m2" && (
                    <div className="nav-dropdown">
                      <div className="inner py-2">
                        <NavLink to="/quem-somos" className="nav-item">
                          quem somos
                        </NavLink>
                        <NavLink to="/nossa-historia" className="nav-item">
                          nossa história
                        </NavLink>
                        <NavLink to="/infraestrutura" className="nav-item">
                          infraestrutura
                        </NavLink>
                        <NavLink to="/sustentabilidade" className="nav-item">
                          sustentabilidade
                        </NavLink>
                      </div>
                    </div>
                  )}
                </li>

                <li className="relative">
                  <button
                    className="nav-link"
                    onClick={() =>
                      setOpen(open === "servicos" ? null : "servicos")
                    }
                  >
                    serviços
                  </button>
                  {open === "servicos" && (
                    <div className="nav-dropdown">
                      <div className="inner py-2">
                        <NavLink
                          to="/servicos/comunicacao-visual"
                          className="nav-item"
                        >
                          comunicação visual
                        </NavLink>
                        <NavLink
                          to="/servicos/envelopamento"
                          className="nav-item"
                        >
                          envelopamento
                        </NavLink>
                        <NavLink to="/servicos/midia-ooh" className="nav-item">
                          mídia OOH
                        </NavLink>
                        <NavLink
                          to="/servicos/ponto-de-venda"
                          className="nav-item"
                        >
                          ponto de venda
                        </NavLink>
                        <NavLink
                          to="/servicos/projetos-especiais"
                          className="nav-item"
                        >
                          projetos especiais
                        </NavLink>
                        <NavLink
                          to="/servicos/sinalizacao"
                          className="nav-item"
                        >
                          sinalização
                        </NavLink>
                      </div>
                    </div>
                  )}
                </li>

                <li className="relative">
                  <button
                    className="nav-link"
                    onClick={() =>
                      setOpen(open === "solucoes" ? null : "solucoes")
                    }
                  >
                    soluções
                  </button>
                  {open === "solucoes" && (
                    <div className="nav-dropdown">
                      <div className="inner py-2">
                        <NavLink
                          to="/solucoes/vitrinismos"
                          className="nav-item"
                        >
                          vitrinismos
                        </NavLink>
                        <NavLink
                          to="/solucoes/supermercados"
                          className="nav-item"
                        >
                          supermercados
                        </NavLink>
                        <NavLink to="/solucoes/eventos" className="nav-item">
                          eventos
                        </NavLink>
                      </div>
                    </div>
                  )}
                </li>

                <li>
                  <NavLink to="/blog" className="nav-link">
                    blog
                  </NavLink>
                </li>

                <li className="relative">
                  <button
                    className="nav-link"
                    onClick={() =>
                      setOpen(open === "contato" ? null : "contato")
                    }
                  >
                    contato
                  </button>
                  {open === "contato" && (
                    <div className="nav-dropdown">
                      <div className="inner py-2">
                        <NavLink to="/fale-conosco" className="nav-item">
                          fale conosco
                        </NavLink>
                        <NavLink to="/trabalhe-conosco" className="nav-item">
                          trabalhe com a gente
                        </NavLink>
                        <NavLink to="/avalie-a-m2" className="nav-item">
                          avalie a M2
                        </NavLink>
                      </div>
                    </div>
                  )}
                </li>

                <li>
                  <NavLink to="/seja-um-revendedor" className="nav-link">
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
          className="nav-toggle fixed top-4 right-4 bg-[#E5258C] text-white px-4 py-2 rounded-md text-sm font-medium shadow-md z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      )}

      {/* ===== MENU MOBILE ===== */}
      {menuOpen && (
        <div className="fixed top-[72px] left-0 right-0 bg-white z-40 flex flex-col items-center text-center px-6 py-5 border-t border-gray-200 animate-slideDown shadow-md max-h-[80vh] overflow-y-auto">
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
            >
              m2
            </button>
            {activeSection === "m2" && (
              <div className="flex flex-col gap-2 mt-1">
                <NavLink
                  to="/quem-somos"
                  className="border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition"
                >
                  quem somos
                </NavLink>
                <NavLink
                  to="/nossa-historia"
                  className="border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition"
                >
                  nossa história
                </NavLink>
                <NavLink
                  to="/infraestrutura"
                  className="border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition"
                >
                  infraestrutura
                </NavLink>
                <NavLink
                  to="/sustentabilidade"
                  className="border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition"
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
            >
              serviços
            </button>
            {activeSection === "servicos" && (
              <div className="flex flex-col gap-2 mt-1">
                <NavLink
                  to="/servicos/comunicacao-visual"
                  className="border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition"
                >
                  comunicação visual
                </NavLink>
                <NavLink
                  to="/servicos/envelopamento"
                  className="border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition"
                >
                  envelopamento
                </NavLink>
                <NavLink
                  to="/servicos/midia-ooh"
                  className="border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition"
                >
                  mídia OOH
                </NavLink>
                <NavLink
                  to="/servicos/ponto-de-venda"
                  className="border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition"
                >
                  ponto de venda
                </NavLink>
                <NavLink
                  to="/servicos/projetos-especiais"
                  className="border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition"
                >
                  projetos especiais
                </NavLink>
                <NavLink
                  to="/servicos/sinalizacao"
                  className="border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition"
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
          >
            blog
          </NavLink>

          {/* CONTATO */}
          <div className="w-full">
            <button
              onClick={() => toggleMobileSubmenu("contato")}
              className="w-full border border-gray-200 rounded-lg py-2 mb-2 hover:bg-gray-100 transition text-[#E5258C] font-semibold"
            >
              contato
            </button>
            {activeSection === "contato" && (
              <div className="flex flex-col gap-2 mt-1">
                <NavLink
                  to="/fale-conosco"
                  className="border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition"
                >
                  fale conosco
                </NavLink>
                <NavLink
                  to="/trabalhe-conosco"
                  className="border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition"
                >
                  trabalhe com a gente
                </NavLink>
                <NavLink
                  to="/avalie-a-m2"
                  className="border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition"
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
          >
            seja um revendedor
          </NavLink>
        </div>
      )}
    </header>
  );
}
