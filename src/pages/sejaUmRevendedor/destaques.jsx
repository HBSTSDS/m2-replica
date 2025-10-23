import "./revendedor.css";
export default function Destaques(){
  return (
    <section className="section destaques">
      <div className="container">
        <div className="destaques-grid">
          <article className="dstk-card dstk-card--lg" style={{['--bg-url']: 'var(--dstk1)'}}>
            <div className="dstk-content">
              <span className="tag">NOSSAS MÁQUINAS</span>
              <h3 className="h3">Produção industrial UV</h3>
            </div>
          </article>

          <article className="dstk-card" style={{['--bg-url']: 'var(--dstk2)'}}>
            <div className="dstk-content"><span className="tag">SUPORTE</span><h3 className="h3">Treinamento</h3></div>
          </article>

          <article className="dstk-card" style={{['--bg-url']: 'var(--dstk3)'}}>
            <div className="dstk-content"><span className="tag">ENTREGA</span><h3 className="h3">Brasil inteiro</h3></div>
          </article>
        </div>
      </div>
    </section>
  );
}
