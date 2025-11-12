// src/pages/sejaUmRevendedor/index.jsx
import { useEffect } from "react";

// Importação das seções da página
import Hero from "./hero";
import Destaques from "./destaques";
import FaixaRosa from "./FaixaRosa";
import Cadastro from "./Cadastro";
import SeloVerde from "./SeloVerde";
import WhatsCTA from "./WhatsCTA";
import FooterBanner from "./FooterBanner";

export default function SejaUmRevendedorPage() {
  useEffect(() => {
    // Adiciona a classe 'revendedor' ao body quando esta página é montada
    document.body.classList.add("revendedor");

    // Remove a classe ao sair da página para evitar interferência nas outras
    return () => document.body.classList.remove("revendedor");
  }, []);

  return (
    <main>
      <Hero />
      <Destaques />
      <FaixaRosa />
      <Cadastro />
      <SeloVerde />
      <WhatsCTA />
      <FooterBanner />
    </main>
  );
}
