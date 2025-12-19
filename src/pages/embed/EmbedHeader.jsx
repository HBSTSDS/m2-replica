import { useEffect, useRef } from "react";
import NavBar from "../../components/NavBar";

export default function EmbedHeader() {
  const ref = useRef(null);

  useEffect(() => {
    // 1. Garantir fundo transparente para não brigar com o PHP
    document.documentElement.style.background = "transparent";
    document.body.style.background = "transparent";

    const sendHeight = () => {
      if (!ref.current) return;
      
      // Agora que o fundo é transparente, podemos confiar no scrollHeight
      // Ele vai refletir exatamente o tamanho do conteúdo (Header + Dropdown)
      const h = document.documentElement.scrollHeight;

      window.parent.postMessage(
        { __M2_EMBED__: true, type: "resize", target: "header", height: h },
        "*"
      );
    };

    // Forçar envio em loop por um curto período para pegar animações CSS
    const animLoop = () => {
      let count = 0;
      const interval = setInterval(() => {
        sendHeight();
        count++;
        // Executa por ~60ms * 20 = 1.2s para garantir a animação completa
        if (count > 20) clearInterval(interval);
      }, 60);
    };

    // Disparar loop inicial
    animLoop();
    sendHeight();

    const ro = new ResizeObserver(sendHeight);
    if (ref.current) ro.observe(ref.current);

    // MutationObserver agora dispara o loop de animação também
    const mo = new MutationObserver(() => {
      sendHeight();
      animLoop();
    });
    if (ref.current) {
      mo.observe(ref.current, { 
        childList: true, 
        subtree: true,
        attributes: true 
      });
    }

    window.addEventListener("load", sendHeight);
    window.addEventListener("resize", sendHeight);
    
    return () => {
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("load", sendHeight);
      window.removeEventListener("resize", sendHeight);
      document.documentElement.style.background = "";
      document.body.style.background = "";
    };
  }, []);




  return (
    <div ref={ref} style={{ background: "transparent" }}>
      <NavBar isEmbed={true} />
    </div>
  );
}
