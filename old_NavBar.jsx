// src/components/NavBar.jsx
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

// caminho certo a partir de /components
import logo from "../assets/m2-logo.png";

/** Constrói URLs com o BASE_URL (mantida como no seu código) */
function asset(path) {
  const clean = String(path).replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${clean}`;
}

export default function NavBar() {
  const [open, setOpen] = useState(null);
  const navRef = useRef(null);
  const navigate = useNavigate();

  /** Scroll suave para um id da Home, mantendo sua função */
  const goToSection = (hash) => {
    setOpen(null);
    navigate("/"); // garante que estamos na Home
    requestAnimationFrame(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(null);
    const onClickOutside = (e) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target)) setOpen(null);
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

  // usa asset() para não ficar “unused” (grava o base numa data-attr)
  const baseUrl = asset("/");

  return (
    <header
      className="topbar fixed top-0 left-0 w-full bg-[#F5F7FB] z-50"
      data-base={baseUrl}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between py-8">
          {/* LOGO */}
          <Link to="/" className="block logo-shift" onClick={() => setOpen(null)}>
            <img src={logo} alt="M2" className="h-12 w-auto" />
          </Link>

          {/* NAV */}
          <nav className="nav-pill" ref={navRef}>
            <ul className="nav-list flex items-center gap-6">
              {/* HOME: usa goToSection para não simplificar seu código */}
              <li>
                <button
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    goToSection("#home");
                  }}
                  title="Home"
                >
                  home
                </button>
              </li>

              {/* M2 */}
              <li className="relative">
                <button
                  className="nav-link"
                  aria-haspopup="true"
                  aria-expanded={open === "m2"}
                  onClick={toggle("m2")}
                >
                  m2
                </button>

                {open === "m2" && (
                  <div className="nav-dropdown">
                    <div className="inner py-2">
                      <NavLink to="/quem-somos" className="nav-item" onClick={() => setOpen(null)}>
                        quem somos
                      </NavLink>
                      <NavLink to="/nossa-historia" className="nav-item" onClick={() => setOpen(null)}>
                        nossa história
                      </NavLink>
                      <NavLink to="/infraestrutura" className="nav-item" onClick={() => setOpen(null)}>
                        infraestrutura
                      </NavLink>
                      <NavLink to="/sustentabilidade" className="nav-item" onClick={() => setOpen(null)}>
                        sustentabilidade
                      </NavLink>
                    </div>
                  </div>
                )}
              </li>

              {/* SERVIÇOS */}
              <li className="relative">
                <button
                  className="nav-link"
                  aria-haspopup="true"
                  aria-expanded={open === "servicos"}
                  onClick={toggle("servicos")}
                >
                  serviços
                </button>

                {open === "servicos" && (
                  <div className="nav-dropdown">
                    <div className="inner py-2">
                      <NavLink to="/servicos/comunicacao-visual" className="nav-item" onClick={() => setOpen(null)}>
                        comunicação visual
                      </NavLink>
                      <NavLink to="/servicos/envelopamento" className="nav-item" onClick={() => setOpen(null)}>
                        envelopamento
                      </NavLink>
                      <NavLink to="/servicos/midia-ooh" className="nav-item" onClick={() => setOpen(null)}>
                        mídia OOH
                      </NavLink>
                      <NavLink to="/servicos/ponto-de-venda" className="nav-item" onClick={() => setOpen(null)}>
                        ponto de venda
                      </NavLink>
                      <NavLink to="/servicos/projetos-especiais" className="nav-item" onClick={() => setOpen(null)}>
                        projetos especiais
                      </NavLink>
                      <NavLink to="/servicos/sinalizacao" className="nav-item" onClick={() => setOpen(null)}>
                        sinalização
                      </NavLink>
                    </div>
                  </div>
                )}
              </li>

              {/* SOLUÇÕES */}
              <li className="relative">
                <button
                  className="nav-link"
                  aria-haspopup="true"
                  aria-expanded={open === "solucoes"}
                  onClick={toggle("solucoes")}
                >
                  soluções
                </button>

                {open === "solucoes" && (
                  <div className="nav-dropdown">
                    <div className="inner py-2">
                      <NavLink to="/solucoes/vitrinismos" className="nav-item" onClick={() => setOpen(null)}>
                        vitrinismos
                      </NavLink>
                      <NavLink to="/solucoes/supermercados" className="nav-item" onClick={() => setOpen(null)}>
                        supermercados
                      </NavLink>
                      <NavLink to="/solucoes/eventos" className="nav-item" onClick={() => setOpen(null)}>
                        eventos
                      </NavLink>
                    </div>
                  </div>
                )}
              </li>

              {/* BLOG */}
              <li>
                <NavLink to="/blog" className="nav-link" onClick={() => setOpen(null)}>
                  blog
                </NavLink>
              </li>

              {/* CONTATO */}
              <li className="relative">
                <button
                  className="nav-link"
                  aria-haspopup="true"
                  aria-expanded={open === "contato"}
                  onClick={toggle("contato")}
                >
                  contato
                </button>

                {open === "contato" && (
                  <div className="nav-dropdown">
                    <div className="inner py-2">
                      <NavLink to="/fale-conosco" className="nav-item" onClick={() => setOpen(null)}>
                        fale conosco
                      </NavLink>
                      <NavLink to="/trabalhe-conosco" className="nav-item" onClick={() => setOpen(null)}>
                        trabalhe com a gente
                      </NavLink>
                      <NavLink to="/avalie-a-m2" className="nav-item" onClick={() => setOpen(null)}>
                        avalie a M2
                      </NavLink>
                    </div>
                  </div>
                )}
              </li>

              {/* REVENDEDOR (corrigido: sem <li> aninhado) */}
              <li>
                <NavLink to="/seja-um-revendedor" className="nav-link" onClick={() => setOpen(null)}>
                  seja um revendedor
                </NavLink>
              </li>

              {/* ÍCONE DE BUSCA */}
              <li>
                <button className="nav-search" aria-label="buscar" title="buscar">
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
    </header>
  );
}
