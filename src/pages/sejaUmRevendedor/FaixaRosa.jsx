import { remoteAsset } from "../../utils/remoteAssets";
import "./revendedor.css";

// ✅ Novos caminhos das imagens (pasta revendedor no assets_externos)
const imgComunicacao = remoteAsset("revendedor/ComunicaçãoVisual.png");
const imgRedbox = remoteAsset("revendedor/Displaystag.png");
const imgOffset = remoteAsset("revendedor/Offset.png");
const imgGrafica = remoteAsset("revendedor/GráficaRápida.png");
const imgLetra = remoteAsset("revendedor/LetraCaixa.png");

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
          {/* COLUNA 1 */}
          <div className="col">
            {/* 1- Comunicação Visual */}
            <article className="prod-card">
              <div
                className="prod-img"
                style={{ backgroundImage: `url(${imgComunicacao})` }}
              />
              <div className="prod-body">
                <h2 className="prod-title">Comunicação Visual</h2>
                <p className="prod-desc">
                  Materiais flexíveis e rígidos com produção e instalação completas.
                </p>
                <button className="prod-btn">Saiba mais</button>
              </div>
            </article>

            {/* 2- Displays Redbox */}
            <article className="prod-card">
              <div
                className="prod-img"
                style={{ backgroundImage: `url(${imgRedbox})` }}
              />
              <div className="prod-body">
                <h2 className="prod-title">Displays Redbox</h2>
                <p className="prod-desc">
                  Soluções modulares premium para PDV e varejo, com montagem rápida, Design Italiano e Exclusividade M2.
                </p>
                <button className="prod-btn">Saiba mais</button>
              </div>
            </article>

            {/* 3- Offset */}
            <article className="prod-card">
              <div
                className="prod-img"
                style={{ backgroundImage: `url(${imgOffset})` }}
              />
              <div className="prod-body">
                <h2 className="prod-title">Offset</h2>
                <p className="prod-desc">
                  Impressão em alta escala com padronização de cor e acabamento profissional.
                </p>
                <button className="prod-btn">Saiba mais</button>
              </div>
            </article>
          </div>

          {/* COLUNA 2 */}
          <div className="col">
            {/* 4- Gráfica Rápida */}
            <article className="prod-card">
              <div
                className="prod-img"
                style={{ backgroundImage: `url(${imgGrafica})` }}
              />
              <div className="prod-body">
                <h2 className="prod-title">Gráfica Rápida</h2>
                <p className="prod-desc">
                  Adesivos, rótulos, cadernos e materiais do dia a dia com agilidade e qualidade.
                </p>
                <button className="prod-btn">Saiba mais</button>
              </div>
            </article>

            {/* 5- Letra Caixa */}
            <article className="prod-card">
              <div
                className="prod-img"
                style={{ backgroundImage: `url(${imgLetra})` }}
              />
              <div className="prod-body">
                <h2 className="prod-title">Letra Caixa</h2>
                <p className="prod-desc">
                  Diversos tipo de letra caixa para ambientes internos e externos.
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
