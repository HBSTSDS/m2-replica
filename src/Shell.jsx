import { useEffect, useState, createContext, useContext, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

// HOME (SEÇÕES LEVES NO INÍCIO)
import HeroVideo from "./sections/HeroVideo";
import ScrollVideo from "./sections/ScrollVideo";

// SEÇÕES PESADAS (LAZY LOADED)
const Hub360 = lazy(() => import("./sections/Hub360"));
const M2Leds = lazy(() => import("./sections/M2Leds"));
const Cases = lazy(() => import("./sections/Cases_.jsx"));
const Clientes = lazy(() => import("./sections/Clientes.jsx"));
const Equipamentos = lazy(() => import("./sections/Equipamentos"));
const Displays = lazy(() => import("./sections/Displays"));

// PÁGINAS
import QuemSomos from "./pages/m2/QuemSomos.jsx";
import NossaHistoria from "./pages/m2/nossaHistoria.jsx";
import Infraestrutura from "./pages/m2/infraestrutura.jsx";
import Sustentabilidade from "./pages/m2/sustentabilidade.jsx";
import FaleConosco from "./pages/contato/FaleConosco.jsx";
import TrabalheComAgente from "./pages/contato/TrabalheComAgente.jsx";
import AvalieM2 from "./pages/contato/AvalieM2.jsx";
import ComunicacaoVisual from "./pages/servicos/ComunicacaoVisual.jsx";
import Envelopamento from "./pages/servicos/Envelopamento.jsx";
import Midiaooh from "./pages/servicos/Midiaooh.jsx";
import PontoDeVenda from "./pages/servicos/PontoDeVenda.jsx";
import ProjetosEspeciais from "./pages/servicos/ProjetosEspeciais.jsx";
import Sinalizacao from "./pages/servicos/Sinalizacao.jsx";
import Vitrinismos from "./pages/solucoes/Vitrinismos.jsx";
import Supermercados from "./pages/solucoes/Supermercados.jsx";
import Eventos from "./pages/solucoes/Eventos.jsx";
import Blog from "./pages/blog/Blog.jsx";
import PostDetail from "./pages/blog/PostDetail.jsx";
import SejaUmRevendedorPage from "./pages/sejaUmRevendedor";
import RedBoxPage from "./pages/RedBoxPage";
import CanalDeDenuncias from "./pages/contato/CanalDeDenuncias.jsx";
import NotFound from "./pages/NotFound.jsx";

// Criar Contexto para as Configurações do Painel
export const ConfigContext = createContext(null);
export const useConfig = () => useContext(ConfigContext);

function Home() {
  return (
    <>
      <HeroVideo />
      <ScrollVideo />
      <Suspense fallback={<div className="h-40 bg-gray-100 animate-pulse m-4 rounded" />}>
        <Hub360 />
        <M2Leds />
        <Cases />
        <Clientes />
        <Equipamentos />
        <Displays />
      </Suspense>
    </>
  );
}

export default function Shell() {
  const location = useLocation();
  const isRevendedorLP = location.pathname === "/seja-um-revendedor";
  const [config, setConfig] = useState(null);

  // BUSCAR CONFIGURAÇÕES DO PAINEL
  useEffect(() => {
    fetch("/php/api/get_config.php")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setConfig(data.config);
        }
      })
      .catch(err => console.error("Erro ao carregar configurações:", err));
  }, []);

  // LOGICA DE SEO DINÂMICO
  useEffect(() => {
    // Normalizar a rota para busca no metaMap (remover barra final se houver)
    const rawRoute = location.pathname;
    const route = rawRoute === "/" ? "/" : rawRoute.replace(/\/$/, "");
    
    // Títulos e descrições vindos do painel ou fallback
    let title = config?.heroTitle || "M2 Flex";
    let description = config?.heroSubtitle || "M2 Flex — O maior parque gráfico UV da América Latina. Soluções em comunicação visual e muito mais.";

    const metaMap = {
      "/": {
        t: "M2 Flex",
        d: "O maior parque gráfico UV da América Latina. Soluções industriais em comunicação visual no Rio de Janeiro."
      },
      "/quem-somos": {
        t: "Quem Somos | M2 Flex",
        d: "Conheça a M2 Flex, referência em impressão digital e soluções industriais de comunicação visual."
      },
      "/nossa-historia": {
        t: "Nossa História | M2 Flex",
        d: "Descubra a trajetória da M2 Flex e como nos tornamos o maior parque gráfico UV da América Latina."
      },
      "/infraestrutura": {
        t: "Infraestrutura | M2 Flex",
        d: "Conheça nosso parque tecnológico com equipamentos de ponta para impressão digital e PDV."
      },
      "/sustentabilidade": {
        t: "Sustentabilidade | M2 Flex",
        d: "O compromisso da M2 Flex com o meio ambiente: soluções sustentáveis e materiais recicláveis."
      },
      "/fale-conosco": {
        t: "Fale Conosco | M2 Flex",
        d: "Entre em contato com a equipe da M2 Flex. Tire suas dúvidas, solicite orçamentos e mais."
      },
      "/trabalhe-conosco": {
        t: "Trabalhe Conosco | M2 Flex",
        d: "Faça parte da equipe M2 Flex. Confira nossas vagas e junte-se ao maior parque gráfico UV do Brasil."
      },
      "/avalie-a-m2": {
        t: "Avalie a M2 Flex | Sua Opinião Importa",
        d: "Deixe sua avaliação sobre nossos serviços de comunicação visual e nos ajude a melhorar sempre.",
        robots: "noindex, follow"
      },
      "/servicos/comunicacao-visual": {
        t: "Comunicação Visual | M2 Flex",
        d: "Soluções completas em comunicação visual: adesivos, banners, placas e sinalização de alto impacto."
      },
      "/servicos/envelopamento": {
        t: "Envelopamento de Frotas e Ambientes | M2 Flex",
        d: "Especialistas em envelopamento profissional para frotas e personalização de ambientes corporativos."
      },
      "/servicos/midia-ooh": {
        t: "Mídia OOH (Out of Home) | M2 Flex",
        d: "Produção de painéis, outdoors e empenas em lona e adesivos de alta resistência para Mídia OOH."
      },
      "/servicos/ponto-de-venda": {
        t: "Ponto de Venda (PDV) | M2 Flex",
        d: "Projetos para alavancar seu Ponto de Venda: displays, balcões, wobblers e materiais expressivos."
      },
      "/servicos/projetos-especiais": {
        t: "Projetos Especiais | M2 Flex",
        d: "Soluções personalizadas em acrílico, MDF, iluminação LED e projetos cenográficos sob medida."
      },
      "/servicos/sinalizacao": {
        t: "Sinalização Corporativa, Viária e Braille | M2 Flex",
        d: "Sinalização técnica e de segurança seguindo as normas adequadas, com impressão tátil (Braille) disponível."
      },
      "/solucoes/vitrinismos": {
        t: "Vitrinismo e Cenografia | M2 Flex",
        d: "Transforme sua vitrine em um imã de vendas com a cenografia promocional e técnica da M2 Flex."
      },
      "/solucoes/supermercados": {
        t: "Soluções para Supermercados | M2 Flex",
        d: "Régua de gôndola, precificadores, ilhas promocionais e materiais dedicados ao varejo supermercadista."
      },
      "/solucoes/eventos": {
        t: "Soluções para Eventos e Estandes | M2 Flex",
        d: "Produção ágil de cenografias, estruturas modulares e fundos de palco para o seu evento."
      },
      "/seja-um-revendedor": {
        t: "Seja um Revendedor | M2 Flex",
        d: "Torne-se parceiro oficial da M2 Flex. Condições especiais para revendedores de comunicação visual."
      },
      "/redbox": {
        t: "RedBox Brasil | Displays Automáticos e Ecológicos",
        d: "Conheça a RedBox Brasil: displays patenteados, montagem em 3 segundos e 100% recicláveis."
      },
      "/canal-de-denuncias": {
        t: "Canal de Denúncias | M2 Flex",
        d: "Canal oficial para relatar condutas antiéticas, problemas de compliance e violações de regras corporativas.",
        robots: "noindex, follow"
      },
      "/blog": {
        t: "Blog M2 Flex | Notícias e Tendências",
        d: "Fique por dentro das novidades, cases de sucesso e tendências do mercado."
      }
    };

    const isDynamicBlogRoute = route.startsWith('/blog/') && route.length > 6;
    const is404 = !metaMap[route] && !isDynamicBlogRoute;

    // Caso a rota não exista no mapa, definir o padrão solicitado para todas as páginas indexáveis
    let metaRobotsValue = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

    if (is404) {
      title = "Página não encontrada (404) | M2 Flex";
      description = "A página que você procura não foi encontrada. Explore nossos serviços de comunicação visual.";
      metaRobotsValue = "noindex, follow"; // 404 - exigência de SEO
    } else if (metaMap[route]) {
      title = metaMap[route].t;
      description = metaMap[route].d;
      if (metaMap[route].robots) {
        metaRobotsValue = metaMap[route].robots;
      }
    } else if (isDynamicBlogRoute) {
      // Deixar títulos e descrições temporários apropriados para blog; 
      // o componente de blog (PostDetail) as sobrescreverá quando carregar as infos.
      title = "Carregando post... | Blog M2 Flex";
      description = "Leia este artigo no blog da M2 Flex.";
      metaRobotsValue = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
    }

    // 1) Aplicar title, description e robots
    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }
    const metaRobotsInfo = document.querySelector('meta[name="robots"]');
    if (metaRobotsInfo) {
      metaRobotsInfo.setAttribute("content", metaRobotsValue);
    }
    
    // 2) Gerenciar tag Canonical dinâmica
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    
    if (is404) {
      // Se for página 404, não deve ter a tag canonical
      if (canonicalLink) {
        canonicalLink.remove();
      }
    } else {
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      const cleanRoute = route.endsWith('/') ? route : `${route}/`;
      canonicalLink.setAttribute('href', `https://m2flex.com.br${cleanRoute}`);
    }

  }, [location, config]);

  return (
    <ConfigContext.Provider value={config}>
      <div className="min-h-screen flex flex-col bg-[#F5F7FB]">
        {!isRevendedorLP && <NavBar />}

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/nossa-historia" element={<NossaHistoria />} />
            <Route path="/infraestrutura" element={<Infraestrutura />} />
            <Route path="/sustentabilidade" element={<Sustentabilidade />} />
            <Route path="/fale-conosco" element={<FaleConosco />} />
            <Route path="/trabalhe-conosco" element={<TrabalheComAgente />} />
            <Route path="/avalie-a-m2" element={<AvalieM2 />} />
            <Route path="/servicos/comunicacao-visual" element={<ComunicacaoVisual />} />
            <Route path="/servicos/envelopamento" element={<Envelopamento />} />
            <Route path="/servicos/midia-ooh" element={<Midiaooh />} />
            <Route path="/servicos/ponto-de-venda" element={<PontoDeVenda />} />
            <Route path="/servicos/projetos-especiais" element={<ProjetosEspeciais />} />
            <Route path="/servicos/sinalizacao" element={<Sinalizacao />} />
            <Route path="/solucoes/vitrinismos" element={<Vitrinismos />} />
            <Route path="/solucoes/supermercados" element={<Supermercados />} />
            <Route path="/solucoes/eventos" element={<Eventos />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<PostDetail />} />
            <Route path="/seja-um-revendedor" element={<SejaUmRevendedorPage />} />
            <Route path="/redbox" element={<RedBoxPage />} />
            <Route path="/canal-de-denuncias" element={<CanalDeDenuncias />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {!isRevendedorLP && (
          <>
            <Footer />
            <WhatsAppButton />
          </>
        )}
      </div>
    </ConfigContext.Provider>
  );
}
