import Hero from "./hero";
import Destaques from "./destaques";
import FaixaRosa from "./FaixaRosa";
import Cadastro from "./Cadastro";
import SeloVerde from "./SeloVerde";
import WhatsCTA from "./WhatsCTA";
import FooterBanner from "./FooterBanner";

export default function SejaUmRevendedorPage(){
  return (
    <main>
      <Hero/>
      <Destaques/>
      <FaixaRosa/>
      <Cadastro/> 
      <SeloVerde/>
      <WhatsCTA/>
      <FooterBanner/>
    </main>
  );
}
