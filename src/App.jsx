// src/App.jsx
import { Routes, Route } from "react-router-dom";

// EMBEDS
import EmbedHeader from "./pages/embed/EmbedHeader";
import EmbedFooter from "./pages/embed/EmbedFooter";

// SHELL NORMAL
import Shell from "./Shell"; // vamos extrair o Shell

export default function App() {
  return (
    <Routes>
      {/* ROTAS DE EMBED (SEM SHELL) */}
      <Route path="/embed/header" element={<EmbedHeader />} />
      <Route path="/embed/footer" element={<EmbedFooter />} />

      {/* SITE NORMAL */}
      <Route path="/*" element={<Shell />} />
    </Routes>
  );
}
