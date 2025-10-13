import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductsPage.css';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState('name');

  // Carregar produtos - CORREÇÃO AQUI
  useEffect(() => {
    // Mock data movido para dentro do useEffect
    const mockProducts = [
      {
        id: 1,
        name: "RTX 4090 24GB GDDR6X",
        brand: "NVIDIA",
        category: "gpu",
        price: 12999.00,
        originalPrice: 12999.00,
        stock: 5,
        image: "🎮",
        specs: ["24GB GDDR6X", "DLSS 3", "Ray Tracing", "4K Gaming"],
        isPromo: false,
        rating: 4.9,
        reviews: 47,
        isNew: true,
        sku: "GPU-NV-4090"
      },
      {
        id: 2,
        name: "RTX 4080 16GB SUPER",
        brand: "NVIDIA", 
        category: "gpu",
        price: 8499.00,
        originalPrice: 9499.00,
        stock: 12,
        image: "⚡",
        specs: ["16GB GDDR6X", "DLSS 3", "Ray Tracing", "1440p Ultra"],
        isPromo: true,
        rating: 4.7,
        reviews: 32,
        isNew: false,
        sku: "GPU-NV-4080S"
      },
      {
        id: 3,
        name: "RX 7900 XTX 24GB",
        brand: "AMD",
        category: "gpu",
        price: 6999.00,
        originalPrice: 7999.00,
        stock: 8,
        image: "🔥",
        specs: ["24GB GDDR6", "FSR 3", "Ray Accelerator", "4K Ready"],
        isPromo: true,
        rating: 4.6,
        reviews: 28,
        isNew: true,
        sku: "GPU-AMD-7900"
      },
      {
        id: 4,
        name: "RTX 4070 Ti 12GB",
        brand: "NVIDIA",
        category: "gpu",
        price: 5299.00,
        originalPrice: 5299.00,
        stock: 15,
        image: "💎",
        specs: ["12GB GDDR6X", "DLSS 3", "1440p Gaming", "Efficient"],
        isPromo: false,
        rating: 4.5,
        reviews: 41,
        isNew: false,
        sku: "GPU-NV-4070TI"
      },
      {
        id: 5,
        name: "RX 7800 XT 16GB",
        brand: "AMD",
        category: "gpu",
        price: 4299.00,
        originalPrice: 4799.00,
        stock: 10,
        image: "🚀",
        specs: ["16GB GDDR6", "FSR 3", "1440p Beast", "Cooling"],
        isPromo: true,
        rating: 4.4,
        reviews: 19,
        isNew: true,
        sku: "GPU-AMD-7800"
      },
      {
        id: 6,
        name: "RTX 4060 Ti 8GB",
        brand: "NVIDIA",
        category: "gpu",
        price: 3299.00,
        originalPrice: 3299.00,
        stock: 20,
        image: "🎯",
        specs: ["8GB GDDR6", "DLSS 3", "1080p Gaming", "Efficient"],
        isPromo: false,
        rating: 4.3,
        reviews: 56,
        isNew: false,
        sku: "GPU-NV-4060TI"
      }
    ];

    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
    setLoading(false);
  }, []); // ← Array vazio, sem warnings!

  // Aplicar filtros
  useEffect(() => {
    let filtered = products;

    // Filtro de busca
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.specs.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filtro de categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filtro de preço
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filtro de marcas
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }

    // Ordenação
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, priceRange, selectedBrands, sortBy]);

  // Handlers
  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleQuickView = (product) => {
    // Abrir modal de quick view
    console.log('Quick view:', product);
  };

  const handleAddToCart = (product) => {
    // Adicionar ao carrinho
    console.log('Add to cart:', product);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <div className="products-loading-tech">
        <div className="loading-spinner-tech"></div>
        <p>Carregando produtos...</p>
      </div>
    );
  }

  return (
    <div className="products-page-tech">
      {/* Header */}
      <div className="products-header-tech">
        <div className="products-hero-tech">
          <h1 className="products-title-tech">
            <span className="title-accent-tech">TECH</span> STORE
          </h1>
          <p className="products-subtitle-tech">
            As placas de vídeo mais potentes para gamers e creators
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="products-search-tech">
          <div className="search-container-tech">
            <input
              type="text"
              placeholder="🔍 Buscar por modelo, marca ou especificação..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-tech"
            />
            <div className="search-stats-tech">
              {filteredProducts.length} produtos encontrados
            </div>
          </div>
        </div>
      </div>

      <div className="products-layout-tech">
        {/* Sidebar Filters */}
        <div className="products-sidebar-tech">
          <div className="filter-section-tech">
            <h3 className="filter-title-tech">🎮 CATEGORIAS</h3>
            <div className="filter-options-tech">
              <button 
                className={`filter-option-tech ${selectedCategory === 'all' ? 'active-tech' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                Todas as Categorias
              </button>
              <button 
                className={`filter-option-tech ${selectedCategory === 'gpu' ? 'active-tech' : ''}`}
                onClick={() => setSelectedCategory('gpu')}
              >
                🎮 Placas de Vídeo
              </button>
              <button 
                className={`filter-option-tech ${selectedCategory === 'cpu' ? 'active-tech' : ''}`}
                onClick={() => setSelectedCategory('cpu')}
              >
                ⚡ Processadores
              </button>
              <button 
                className={`filter-option-tech ${selectedCategory === 'motherboard' ? 'active-tech' : ''}`}
                onClick={() => setSelectedCategory('motherboard')}
              >
                🔌 Placas-mãe
              </button>
            </div>
          </div>

          <div className="filter-section-tech">
            <h3 className="filter-title-tech">🏷️ MARCAS</h3>
            <div className="filter-options-tech">
              {['NVIDIA', 'AMD', 'ASUS', 'MSI', 'Gigabyte'].map(brand => (
                <label key={brand} className="checkbox-option-tech">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="checkbox-input-tech"
                  />
                  <span className="checkbox-custom-tech"></span>
                  {brand}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section-tech">
            <h3 className="filter-title-tech">💰 PREÇO</h3>
            <div className="price-filter-tech">
              <div className="price-inputs-tech">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="price-input-tech"
                  placeholder="Mín"
                />
                <span className="price-separator-tech">-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="price-input-tech"
                  placeholder="Máx"
                />
              </div>
              <div className="price-range-tech">
                R$ {priceRange[0].toLocaleString()} - R$ {priceRange[1].toLocaleString()}
              </div>
            </div>
          </div>

          <div className="filter-section-tech">
            <h3 className="filter-title-tech">⭐ AVALIAÇÃO</h3>
            <div className="rating-filter-tech">
              {[4.5, 4.0, 3.5, 3.0].map(rating => (
                <button key={rating} className="rating-option-tech">
                  ⭐ {rating}+
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="products-main-tech">
          {/* Toolbar */}
          <div className="products-toolbar-tech">
            <div className="toolbar-left-tech">
              <span className="results-count-tech">
                {filteredProducts.length} produtos
              </span>
            </div>
            <div className="toolbar-right-tech">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select-tech"
              >
                <option value="name">Ordenar por: Nome</option>
                <option value="price-low">Preço: Menor para Maior</option>
                <option value="price-high">Preço: Maior para Menor</option>
                <option value="rating">Melhor Avaliado</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="products-grid-tech">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card-tech">
                {/* Badges */}
                <div className="product-badges-tech">
                  {product.isNew && <span className="badge-new-tech">🆕 NOVO</span>}
                  {product.isPromo && <span className="badge-promo-tech">🔥 PROMO</span>}
                  {product.stock < 3 && <span className="badge-stock-tech">⚠️ ÚLTIMAS</span>}
                </div>

                {/* Product Image/Emoji */}
                <div 
                  className="product-image-tech"
                  onClick={() => handleProductClick(product.id)}
                >
                  <span className="product-emoji-tech">{product.image}</span>
                </div>

                {/* Product Info */}
                <div className="product-info-tech">
                  <div className="product-brand-tech">{product.brand}</div>
                  <h3 
                    className="product-name-tech"
                    onClick={() => handleProductClick(product.id)}
                  >
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="product-rating-tech">
                    <span className="rating-stars-tech">⭐ {product.rating}</span>
                    <span className="rating-count-tech">({product.reviews})</span>
                  </div>

                  {/* Specs */}
                  <div className="product-specs-tech">
                    {product.specs.slice(0, 2).map((spec, index) => (
                      <span key={index} className="spec-tag-tech">{spec}</span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="product-price-tech">
                    {product.isPromo ? (
                      <>
                        <span className="price-current-tech">
                          R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                        <span className="price-original-tech">
                          R$ {product.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                        <span className="price-discount-tech">
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                        </span>
                      </>
                    ) : (
                      <span className="price-normal-tech">
                        R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    )}
                  </div>

                  {/* Stock */}
                  <div className={`product-stock-tech ${product.stock < 3 ? 'low-stock-tech' : ''}`}>
                    {product.stock > 0 ? `${product.stock} em estoque` : 'Fora de estoque'}
                  </div>

                  {/* Actions */}
                  <div className="product-actions-tech">
                    <button 
                      className="btn-cart-tech"
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                    >
                      <span className="btn-icon-tech">🛒</span>
                      {product.stock > 0 ? 'Adicionar' : 'Indisponível'}
                    </button>
                    <button 
                      className="btn-quickview-tech"
                      onClick={() => handleQuickView(product)}
                    >
                      👁️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="products-empty-tech">
              <div className="empty-icon-tech">🔍</div>
              <h3 className="empty-title-tech">Nenhum produto encontrado</h3>
              <p className="empty-description-tech">
                Tente ajustar os filtros ou termos de busca
              </p>
              <button 
                className="btn-reset-tech"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedBrands([]);
                  setPriceRange([0, 50000]);
                }}
              >
                🔄 Limpar Filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;