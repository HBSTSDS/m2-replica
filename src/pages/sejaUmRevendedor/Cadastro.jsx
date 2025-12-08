import "./revendedor.css";

export default function Cadastro() {
  return (
    <section className="section cadastro-section">
      <div className="container cadastro-wrapper">
        {/* Primeira linha: vantagens e funcionamento */}
        <div className="cadastro-grid-text">
          
          {/* ESQUERDA – VANTAGENS */}
          <div className="col vantagens">
            <h3 className="h2">
              VANTAGENS PARA <br />
              <span className="highlight">SUA REVENDA</span>
            </h3>

            <p>
              Ao se tornar revendedor M2, você passa a contar com produção
              certificada por tecnologia UV e processos sustentáveis, estrutura
              industrial preparada para grandes e pequenos lotes e logística nacional
              com envio para todo o Brasil.
            </p>

            <p>
              Além da operação produtiva, você conta com atendimento especializado
              focado em revenda, apoio comercial para formação de portfólio e
              condições diferenciadas, com política comercial pensada para quem
              revende e precisa de margem e previsibilidade.
            </p>
          </div>

          {/* DIREITA – COMO FUNCIONA */}
          <div className="col funcionamento">
            <h3 className="h2">COMO FUNCIONA</h3>

            <p>
              <strong>O processo é simples:</strong> você realiza o cadastro, recebe acesso
              ao catálogo completo com preços e condições exclusivas e passa a solicitar
              seus pedidos conforme a demanda do seu negócio.
            </p>

            <p>
              A M2 cuida da produção e da entrega; você cuida da relação com seu cliente,
              com tranquilidade para vender produtos de alta demanda e qualidade industrial.
            </p>
          </div>
        </div>

        {/* Segunda linha: para quem é */}
        <div className="cadastro-target">
          <h3 className="h2">PARA QUEM É</h3>

          <p>
            A parceria de revenda da M2 é ideal para gráficas rápidas, lojas de
            comunicação visual, revendedores de brindes, estúdios de design, agências,
            lojas de sublimação e empreendedores que desejam ampliar portfólio sem investir
            em parque produtivo próprio.
          </p>
        </div>
      </div>
    </section>
  );
}
