import "./revendedor.css";

// ✅ caminhos das imagens
import comunicacaoVisual from "../../assets/SejaUmRevendedor/comunicacao_visual.jpg";
import graficaRapida from "../../assets/SejaUmRevendedor/grafica_rapida.jpg";

export default function FaixaRosa() {
  return (
    <section className="section faixa-rosa">
      {/* GRID PRINCIPAL */}
      <div className="faixa-rosa__fullgrid">
        {/* COLUNA ESQUERDA – NOSSOS PRODUTOS */}
        <div className="faixa-produtos faixa-produtos--left">
          <h2 className="faixa-produtos__title">NOSSOS PRODUTOS</h2>

          <p>
            A M2 é o maior fornecedor para revendas de Comunicação Visual do
            Brasil. Há mais de 20 anos no mercado, a M2 se consolidou como a
            maior revenda de impressão UV e Comunicação Visual da América
            Latina.
          </p>

          <p>
            Atendemos milhares de gráficas, agências e empreendedores em todo o
            Brasil com produtos de alta qualidade, pronta entrega e suporte
            técnico especializado.
          </p>

          <p>
            Se você busca uma revenda confiável e lucrativa, a M2 é o seu
            parceiro ideal.
          </p>
        </div>

        {/* COLUNA DIREITA – O QUE VOCÊ PODE REVENDER */}
        {/* ➕ adicionada classe "revenda-texto-mobile" para controlar o layout no mobile */}
        <div className="faixa-rosa__heading faixa-rosa__heading--right revenda-texto-mobile">
          <h2 className="faixa-rosa__title">O QUE VOCÊ PODE REVENDER?</h2>

          <p className="faixa-rosa__subtitle">
            Um portfólio completo para impulsionar suas vendas
          </p>

          <p className="faixa-rosa__desc">
            A M2 oferece um dos catálogos mais completos do setor, com soluções
            que atendem desde pequenas gráficas até grandes operações.
          </p>

          <span className="faixa-rosa__tag">
            LINHAS QUE VOCÊ PODE TRABALHAR
          </span>
        </div>
      </div>

      {/* CARDS */}
      <div className="faixa-rosa__cards">
        <div className="prod-grid">
          <div className="col">
            <article className="prod-card">
              <div
                className="prod-img"
                style={{ backgroundImage: `url(${comunicacaoVisual})` }}
              />
              <div className="prod-body">
                <h3 className="prod-title">COMUNICAÇÃO VISUAL</h3>
                <p className="prod-desc">
                  Adesivos, banners, painéis, backdrops, placas e muito mais.
                </p>
                <button className="prod-btn">Saiba mais</button>
              </div>
            </article>

            <article className="prod-card">
              <div
                className="prod-img"
                style={{ backgroundImage: `url(${graficaRapida})` }}
              />
              <div className="prod-body">
                <h3 className="prod-title">GRÁFICA RÁPIDA</h3>
                <p className="prod-desc">
                  Cartões, blocos, cadernos, agendas, folders e muito mais.
                </p>
                <button className="prod-btn">Saiba mais</button>
              </div>
            </article>

            <article className="prod-card">
              <div className="prod-img" />
              <div className="prod-body">
                <h3 className="prod-title">SUBLIMAÇÃO</h3>
                <p className="prod-desc">
                  Canecas, camisetas, e uma linha completa para revenda.
                </p>
                <button className="prod-btn">Saiba mais</button>
              </div>
            </article>
          </div>

          <div className="col">
            <article className="prod-card">
              <div className="prod-img" />
              <div className="prod-body">
                <h3 className="prod-title">IMPRESSÃO DTF</h3>
                <p className="prod-desc">
                  Tecnologia de ponta com alta durabilidade.
                </p>
                <button className="prod-btn">Saiba mais</button>
              </div>
            </article>

            <article className="prod-card">
              <div className="prod-img" />
              <div className="prod-body">
                <h3 className="prod-title">RÍGIDOS E DISPLAYS</h3>
                <p className="prod-desc">
                  Displays, totens, acrílicos e soluções para PDV.
                </p>
                <button className="prod-btn">Saiba mais</button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
