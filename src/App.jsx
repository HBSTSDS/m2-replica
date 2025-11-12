// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";

// COMPONENTES GLOBAIS
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

// SEÇÕES DA HOME
import HeroVideo from "./sections/HeroVideo";
import ScrollVideo from "./sections/ScrollVideo";
import Hub360 from "./sections/Hub360";
import M2Leds from "./sections/M2Leds";
import Cases from "./sections/Cases_.jsx";
import Clientes from "./sections/Clientes.jsx";
import Equipamentos from "./sections/Equipamentos";
import Displays from "./sections/Displays";

// PÁGINAS M2
import QuemSomos from "./pages/m2/QuemSomos.jsx";
import NossaHistoria from "./pages/m2/nossaHistoria.jsx";
import Infraestrutura from "./pages/m2/infraestrutura.jsx";
import Sustentabilidade from "./pages/m2/sustentabilidade.jsx";

// PÁGINAS CONTATO
import FaleConosco from "./pages/contato/FaleConosco.jsx";
import TrabalheComAgente from "./pages/contato/TrabalheComAgente.jsx";
import AvalieM2 from "./pages/contato/AvalieM2.jsx";

// PÁGINAS SERVIÇOS
import ComunicacaoVisual from "./pages/servicos/ComunicacaoVisual.jsx";
import Envelopamento from "./pages/servicos/Envelopamento.jsx";
import Midiaooh from "./pages/servicos/Midiaooh.jsx";
import PontoDeVenda from "./pages/servicos/PontoDeVenda.jsx";
import ProjetosEspeciais from "./pages/servicos/ProjetosEspeciais.jsx";
import Sinalizacao from "./pages/servicos/Sinalizacao.jsx";

// PÁGINAS SOLUÇÕES
import Vitrinismos from "./pages/solucoes/Vitrinismos.jsx";
import Supermercados from "./pages/solucoes/Supermercados.jsx";
import Eventos from "./pages/solucoes/Eventos.jsx";

// BLOG
import Blog from "./pages/blog/Blog.jsx";

// PÁGINA DO REVENDEDOR
import SejaUmRevendedorPage from "./pages/sejaUmRevendedor";

function Home() {
  return (
    <>
      <HeroVideo />
      <ScrollVideo />
      <Hub360 />
      <M2Leds />
      <Cases />
      <Clientes />
      <Equipamentos />
      <Displays />
    </>
  );
}

function Shell() {
  const location = useLocation();
  const isRevendedorLP = location.pathname === "/seja-um-revendedor";

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FB]" style={{ overflow: "visible" }}>
      {!isRevendedorLP && <NavBar />}

      <main className={!isRevendedorLP ? "flex-1 pt-0" : "flex-1"}>
        <Routes>
          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* M2 */}
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/nossa-historia" element={<NossaHistoria />} />
          <Route path="/infraestrutura" element={<Infraestrutura />} />
          <Route path="/sustentabilidade" element={<Sustentabilidade />} />

          {/* CONTATO */}
          <Route path="/fale-conosco" element={<FaleConosco />} />
          <Route path="/trabalhe-conosco" element={<TrabalheComAgente />} />
          <Route path="/avalie-a-m2" element={<AvalieM2 />} />

          {/* SERVIÇOS */}
          <Route path="/servicos/comunicacao-visual" element={<ComunicacaoVisual />} />
          <Route path="/servicos/envelopamento" element={<Envelopamento />} />
          <Route path="/servicos/midia-ooh" element={<Midiaooh />} />
          <Route path="/servicos/ponto-de-venda" element={<PontoDeVenda />} />
          <Route path="/servicos/projetos-especiais" element={<ProjetosEspeciais />} />
          <Route path="/servicos/sinalizacao" element={<Sinalizacao />} />

          {/* SOLUÇÕES */}
          <Route path="/solucoes/vitrinismos" element={<Vitrinismos />} />
          <Route path="/solucoes/supermercados" element={<Supermercados />} />
          <Route path="/solucoes/eventos" element={<Eventos />} />

          {/* BLOG */}
          <Route path="/blog" element={<Blog />} />

          {/* REVENDEDOR - LANDING SEM NAVBAR/FOOTER */}
          <Route path="/seja-um-revendedor" element={<SejaUmRevendedorPage />} />
        </Routes>
      </main>

      {!isRevendedorLP && (
        <>
          <Footer />
          <WhatsAppButton />
        </>
      )}
    </div>
  );
}

export default function App() {
  return <Shell />;
}
