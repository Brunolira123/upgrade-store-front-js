import React from 'react';
import './ProductGrid.css';

const ProductGrid = () => {
  const products = [
    {
      id: 1,
      name: "RTX 4090 24GB",
      brand: "NVIDIA",
      condition: "Novo",
      price: "R$ 12.999,00",
      installments: "12x R$ 1.083,25",
      image: "🚀",
      badge: "new",
      specs: ["24GB GDDR6X", "DLSS 3", "Ray Tracing"],
      performance: "98%",
      power: "450W"
    },
    {
      id: 2,
      name: "RTX 4080 16GB", 
      brand: "NVIDIA",
      condition: "Novo",
      price: "R$ 8.499,00",
      installments: "12x R$ 708,25",
      image: "⚡",
      badge: "new",
      specs: ["16GB GDDR6X", "DLSS 3", "4K Gaming"],
      performance: "92%",
      power: "320W"
    },
    {
      id: 3,
      name: "RTX 3080 10GB",
      brand: "NVIDIA", 
      condition: "Usado - Excelente",
      price: "R$ 3.499,00",
      installments: "10x R$ 349,90",
      image: "🔥",
      badge: "used",
      tradeIn: true,
      specs: ["10GB GDDR6X", "DLSS", "1440p Ultra"],
      performance: "85%",
      power: "320W"
    },
    {
      id: 4,
      name: "RX 7900 XTX",
      brand: "AMD",
      condition: "Novo",
      price: "R$ 6.999,00", 
      installments: "12x R$ 583,25",
      image: "🎯",
      badge: "new",
      specs: ["24GB GDDR6", "FSR 3", "4K Ready"],
      performance: "95%",
      power: "355W"
    },
    {
      id: 5,
      name: "RTX 4070 Ti",
      brand: "NVIDIA",
      condition: "Novo", 
      price: "R$ 5.299,00",
      installments: "12x R$ 441,58",
      image: "💫",
      badge: "new",
      specs: ["12GB GDDR6X", "DLSS 3", "1440p Elite"],
      performance: "88%",
      power: "285W"
    },
    {
      id: 6, 
      name: "RTX 3070 8GB",
      brand: "NVIDIA",
      condition: "Usado - Bom",
      price: "R$ 2.199,00",
      installments: "8x R$ 274,88",
      image: "🎮",
      badge: "used",
      tradeIn: true,
      specs: ["8GB GDDR6", "DLSS", "1080p Ultra"],
      performance: "78%",
      power: "220W"
    }
  ];

  return (
    <section className="products-section-tech">
      <div className="products-container-tech">
        {/* Cabeçalho Tech */}
        <div className="products-header-tech">
          <div className="products-title-container-tech">
            <h2 className="products-title-tech">
              <span className="products-title-accent-tech">TECH</span> GALLERY
            </h2>
            <div className="products-title-line-tech"></div>
          </div>
          <p className="products-subtitle-tech">
            Explore nossa seleção premium de placas de vídeo. 
            <span className="products-neon-text-tech"> Performance extrema garantida.</span>
          </p>
        </div>

        {/* Stats Bar */}
        <div className="stats-bar-tech">
          <div className="stat-item-tech">
            <span className="stat-number-tech">50+</span>
            <span className="stat-label-tech">Modelos</span>
          </div>
          <div className="stat-divider-tech"></div>
          <div className="stat-item-tech">
            <span className="stat-number-tech">24h</span>
            <span className="stat-label-tech">Suporte</span>
          </div>
          <div className="stat-divider-tech"></div>
          <div className="stat-item-tech">
            <span className="stat-number-tech">2y</span>
            <span className="stat-label-tech">Garantia</span>
          </div>
          <div className="stat-divider-tech"></div>
          <div className="stat-item-tech">
            <span className="stat-number-tech">💯</span>
            <span className="stat-label-tech">Testadas</span>
          </div>
        </div>

        {/* Grade de Produtos Tech */}
        <div className="products-grid-tech">
          {products.map(product => (
            <div key={product.id} className="product-card-tech">
              {/* Header do Card */}
              <div className="card-header-tech">
                <div className="badges-tech">
                  <span className={product.badge === 'new' ? 'badge-new-tech' : 'badge-used-tech'}>
                    {product.badge === 'new' ? 'NEW' : 'REFURBISHED'}
                  </span>
                  {product.tradeIn && (
                    <span className="badge-tradein-tech">
                      🔄 TRADE-IN
                    </span>
                  )}
                </div>
                <div className="brand-tech">{product.brand}</div>
              </div>

              {/* Imagem Tech */}
              <div className="image-container-tech">
                <div className="product-image-tech">
                  {product.image}
                </div>
                <div className="image-glow-tech"></div>
              </div>

              {/* Especificações */}
              <div className="product-specs-tech">
                <h3 className="product-name-tech">{product.name}</h3>
                <p className="product-condition-tech">{product.condition}</p>
                
                <div className="specs-grid-tech">
                  {product.specs.map((spec, index) => (
                    <span key={index} className="spec-item-tech">• {spec}</span>
                  ))}
                </div>

                {/* Performance Bar */}
                <div className="performance-tech">
                  <div className="performance-header-tech">
                    <span>Performance</span>
                    <span className="performance-value-tech">{product.performance}</span>
                  </div>
                  <div className="performance-bar-tech">
                    <div 
                      className="performance-fill-tech"
                      style={{
                        width: product.performance,
                        background: product.performance > '90%' 
                          ? 'linear-gradient(90deg, #00ff88, #00d4ff)'
                          : 'linear-gradient(90deg, #00d4ff, #ff0080)'
                      }}
                    ></div>
                  </div>
                </div>

                {/* Power Consumption */}
                <div className="power-tech">
                  <span className="power-label-tech">Power: </span>
                  <span className="power-value-tech">{product.power}</span>
                </div>
              </div>

              {/* Preço e Ações */}
              <div className="price-container-tech">
                <div className="price-info-tech">
                  <span className="price-tech">{product.price}</span>
                  <span className="installments-tech">{product.installments}</span>
                </div>

                <div className="product-actions-tech">
                  <button className="buy-btn-tech">
                    <span className="button-icon-tech">⚡</span>
                    BUY NOW
                  </button>
                  <button className="details-btn-tech">
                    <span className="button-icon-tech">🔍</span>
                    DETAILS
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Seção Trade-In Tech */}
        <div className="tradein-section-tech">
          <div className="tradein-card-tech">
            <div className="tradein-glow-tech"></div>
            <div className="tradein-content-tech">
              <h3 className="tradein-title-tech">
                <span className="tradein-icon-tech">🔄</span>
                TECH TRADE-IN PROGRAM
              </h3>
              <p className="tradein-text-tech">
                Atualize seu setup! Troque sua placa atual por desconto em produtos de última geração.
              </p>
              <div className="tradein-features-tech">
                <div className="tradein-feature-item-tech">
                  <span className="tradein-feature-icon-tech">🎯</span>
                  Avaliação Expressa
                </div>
                <div className="tradein-feature-item-tech">
                  <span className="tradein-feature-icon-tech">🚀</span>
                  Frete Grátis
                </div>
                <div className="tradein-feature-item-tech">
                  <span className="tradein-feature-icon-tech">💎</span>
                  Cupom Imediato
                </div>
              </div>
              <button className="tradein-btn-tech">
                <span className="button-icon-tech">🚀</span>
                START TRADE-IN
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;