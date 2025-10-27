import "./revendedor.css";
const asset = (p) => `${import.meta.env.BASE_URL}${String(p).replace(/^\/+/, "")}`;

export default function FaixaRosa() {
  return (
    <section
      className="section faixa-rosa"
      style={{
        ["--faixa-bg-url"]: `url(${asset("SejaUmRevendedor/Subtract-rosa.svg")})`,
        ["--faixa-bg-opacity"]: 1,
        ["--rosa-bg-size"]: "contain",
        ["--rosa-bg-pos-x"]: "right",
        ["--rosa-bg-pos-y"]: "top",
        ["--faixa-min-h"]: "860px", // altura mínima para o SVG caber inteiro
      }}
    >
      {/* ===== CONTEÚDO PRINCIPAL DA FAIXA ROSA ===== */}
      <div className="faixa-rosa__wrap">
        {/* Título e descrição */}
        <header className="faixa-rosa__heading">
          <span className="faixa-rosa__tag" style={{ color: "yellow" }}>
            NOSSOS PRODUTOS
          </span>
          <h2 className="faixa-rosa__title">
            O QUE VOCÊ PODE <br /> REVENDER?
          </h2>
          <p className="faixa-rosa__desc">
            Revenda produtos de Comunicação Visual, Gráfica Rápida, DTF, Offset,
            Rígidos e Sublimação. Um catálogo completo com qualidade, variedade
            e pronta entrega para todo o Brasil. Tudo o que você precisa para vender mais.
          </p>
        </header>

        {/* ===== GRADE DE PRODUTOS (2 colunas) ===== */}
        <div className="prod-grid">
          {/* Coluna esquerda */}
          <div className="col col--left">
            {[
              ["COMUNICAÇÃO VISUAL", "Adesivos, Banners, Lona, Canvas"],
              [
                "GRÁFICA RÁPIDA",
                "Cartões, Blocos, Cadernos, Agendas, Adesivos, Folders, Crachás, Sacolas e mais!",
              ],
              [
                "SUBLIMAÇÃO",
                "Personalize tudo com qualidade: camisas, almofadas, sacolas, tapetes, bandanas e muito mais!",
              ],
            ].map(([t, d], i) => (
              <article className="prod-card" key={`L${i}`}>
                <div className="prod-media" aria-hidden="true" />
                <div className="prod-body">
                  <h3 className="prod-title">{t}</h3>
                  <p className="prod-desc">{d}</p>
                  <button className="prod-btn">SAIBA MAIS</button>
                </div>
              </article>
            ))}
          </div>

          {/* Coluna direita */}
          <div className="col col--right">
            {[
              ["IMPRESSÃO DTF", "DTF Têxtil e DTF UV"],
              [
                "SOLUÇÕES EM RÍGIDOS",
                "Soluções em rígidos para comunicação visual: displays, totens, acrílicos, PVC, IPS, XPS e mais!",
              ],
            ].map(([t, d], i) => (
              <article className="prod-card card--right" key={`R${i}`}>
                <div className="prod-media" aria-hidden="true" />
                <div className="prod-body">
                  <h3 className="prod-title">{t}</h3>
                  <p className="prod-desc">{d}</p>
                  <button className="prod-btn">SAIBA MAIS</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* ===== IMAGEM DE CONTINUAÇÃO ABAIXO DA FAIXA ROSA ===== */}
      <div
        className="faixa-rosa-bottom"
        style={{
          backgroundImage: `url(${asset("SejaUmRevendedor/rodape-rosa.png")})`,
        }}
      />
    </section>
  );
}
