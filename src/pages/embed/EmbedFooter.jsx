import { useEffect, useRef } from "react";
import Footer from "../../components/Footer";

export default function EmbedFooter() {
  const ref = useRef(null);

  useEffect(() => {
    // Garantir fundo transparente
    document.documentElement.style.background = "transparent";
    document.body.style.background = "transparent";

    const sendHeight = () => {
      const h =
        ref.current?.scrollHeight ||
        document.documentElement.scrollHeight;

      window.parent.postMessage(
        { __M2_EMBED__: true, type: "resize", target: "footer", height: h },
        "*"
      );
    };

    sendHeight();

    const ro = new ResizeObserver(sendHeight);
    if (ref.current) ro.observe(ref.current);

    window.addEventListener("load", sendHeight);
    window.addEventListener("resize", sendHeight);

    return () => {
      ro.disconnect();
      window.removeEventListener("load", sendHeight);
      window.removeEventListener("resize", sendHeight);
      document.documentElement.style.background = "";
      document.body.style.background = "";
    };
  }, []);

  return (
    <div ref={ref} style={{ background: "transparent" }}>
      <Footer isEmbed={true} />
    </div>
  );
}
