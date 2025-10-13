import React from 'react';
import './FeatureCarousel.css';

const FeatureCarousel = () => {
  return (
    <section className="carousel-section-tech">
      <div className="carousel-container-tech">
        <div className="carousel-content-tech">
          {/* Card 1 - Trade-In Tech */}
          <div className="carousel-card-tech">
            <div className="card-glow-tech"></div>
            <div className="carousel-icon-tech">🔄</div>
            <h3 className="card-title-tech">TECH TRADE-IN</h3>
            <p className="card-text-tech">
              Upgrade seu setup! Troque sua placa por desconto em produtos de última geração
            </p>
            <div className="tech-features-tech">
              <span className="tech-feature-tech">⚡ Avaliação Expressa</span>
              <span className="tech-feature-tech">🚀 Frete Grátis</span>
              <span className="tech-feature-tech">💎 Cupom Imediato</span>
            </div>
            <button className="carousel-button-tech">
              <span className="carousel-button-icon-tech">🚀</span>
              COMEÇAR AGORA
            </button>
          </div>

          {/* Card 2 - Performance Tech */}
          <div className="carousel-card-tech">
            <div className="card-glow-tech"></div>
            <div className="carousel-icon-tech">⚡</div>
            <h3 className="card-title-tech">PERFORMANCE EXTREMA</h3>
            <p className="card-text-tech">
              Placas testadas e validadas para gaming e criação em 4K/8K
            </p>
            <div className="performance-stats-tech">
              <div className="performance-stat-tech">
                <span className="stat-number-tech">240+</span>
                <span className="stat-label-tech">FPS</span>
              </div>
              <div className="performance-stat-tech">
                <span className="stat-number-tech">4K</span>
                <span className="stat-label-tech">Gaming</span>
              </div>
              <div className="performance-stat-tech">
                <span className="stat-number-tech">RTX</span>
                <span className="stat-label-tech">ON</span>
              </div>
            </div>
            <button className="carousel-button-tech">
              <span className="carousel-button-icon-tech">🎮</span>
              EXPLORAR
            </button>
          </div>

          {/* Card 3 - Garantia Tech */}
          <div className="carousel-card-tech">
            <div className="card-glow-tech"></div>
            <div className="carousel-icon-tech">🛡️</div>
            <h3 className="card-title-tech">GARANTIA TECH</h3>
            <p className="card-text-tech">
              Até 06 meses de garantia em todos os produtos. Suporte 24/7 especializado
            </p>
            <div className="warranty-features-tech">
              <div className="warranty-item-tech">
                <span className="warranty-icon-tech">✅</span>
                <span>06 Meses Garantia</span>
              </div>
              <div className="warranty-item-tech">
                <span className="warranty-icon-tech">🛠️</span>
                <span>Suporte Técnico</span>
              </div>
              <div className="warranty-item-tech">
                <span className="warranty-icon-tech">🚚</span>
                <span>Troca Rápida</span>
              </div>
            </div>
            <button className="carousel-button-tech">
              <span className="carousel-button-icon-tech">🛡️</span>
              CONHECER
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCarousel;