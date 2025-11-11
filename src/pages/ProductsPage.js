import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductsPage.css';
import Footer from '../components/Layout/Footer';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  
  // Filtros simplificados
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState('name');

  // Carregar produtos
  useEffect(() => {
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
        name: "RTX 4080 SUPER 16GB",
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
        name: "RTX 4070 Ti SUPER 16GB",
        brand: "NVIDIA",
        category: "gpu",
        price: 5299.00,
        originalPrice: 5299.00,
        stock: 15,
        image: "💎",
        specs: ["16GB GDDR6X", "DLSS 3", "1440p Gaming", "Efficient"],
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
        specs: ["16GB GDDR6", "FSR 3", "1440p Beast", "Advanced Cooling"],
        isPromo: true,
        rating: 4.4,
        reviews: 19,
        isNew: true,
        sku: "GPU-AMD-7800"
      },
      {
        id: 6,
        name: "RTX 4060 Ti 16GB",
        brand: "NVIDIA",
        category: "gpu",
        price: 3299.00,
        originalPrice: 3299.00,
        stock: 20,
        image: "🎯",
        specs: ["16GB GDDR6", "DLSS 3", "1080p Gaming", "Power Efficient"],
        isPromo: false,
        rating: 4.3,
        reviews: 56,
        isNew: false,
        sku: "GPU-NV-4060TI"
      },
      {
        id: 7,
        name: "Ryzen 9 7950X3D",
        brand: "AMD",
        category: "cpu",
        price: 3899.00,
        originalPrice: 4299.00,
        stock: 7,
        image: "🚄",
        specs: ["16-Core", "4.2GHz", "3D V-Cache", "AM5 Socket"],
        isPromo: true,
        rating: 4.8,
        reviews: 23,
        isNew: true,
        sku: "CPU-AMD-7950X3D"
      },
      {
        id: 8,
        name: "Intel i9-14900K",
        brand: "Intel",
        category: "cpu",
        price: 3599.00,
        originalPrice: 3599.00,
        stock: 9,
        image: "⚙️",
        specs: ["24-Core", "6.0GHz", "DDR5", "LGA1700"],
        isPromo: false,
        rating: 4.7,
        reviews: 34,
        isNew: true,
        sku: "CPU-INT-14900K"
      }
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  // Aplicar filtros simplificados
  useEffect(() => {
    setIsFiltering(true);
    
    const timer = setTimeout(() => {
      let filtered = products;

      // Filtro de busca
      if (searchTerm) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.specs.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase())) ||
          product.sku.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Filtro de categoria
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }

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
          case 'reviews':
            return b.reviews - a.reviews;
          case 'name':
          default:
            return a.name.localeCompare(b.name);
        }
      });

      setFilteredProducts(filtered);
      setIsFiltering(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [products, searchTerm, selectedCategory, selectedBrands, sortBy]);

  // Handlers
  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleAddToCart = (product) => {
    console.log('🛒 Add to cart:', product);
    
    const button = document.querySelector(`[data-product-id="${product.id}"]`);
    if (button) {
      const originalText = button.innerHTML;
      button.innerHTML = '✅ Adicionado!';
      button.disabled = true;
      button.style.background = 'linear-gradient(135deg, #00ff88, #00cc66)';
      
      setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        button.style.background = 'linear-gradient(135deg, var(--accent-primary), #0099cc)';
      }, 2000);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleQuickView = (product) => {
    navigate('/trade-in', { state: { product } });
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedBrands([]);
    setSortBy('name');
  };

  // Função para formatar preço
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(price);
  };

  // Função para obter marcas únicas
  const getUniqueBrands = () => {
    const brands = products.map(product => product.brand);
    return [...new Set(brands)].sort();
  };

  // Contador de filtros ativos
  const getActiveFiltersCount = () => {
    let count = 0;
    
    if (searchTerm) count++;
    if (selectedCategory !== 'all') count++;
    if (selectedBrands.length > 0) count++;
    
    return count;
  };

  // Loading inicial
  if (loading) {
    return (
      <div className="products-loading-tech">
        <div className="loading-spinner-tech"></div>
        <p>Carregando produtos premium...</p>
      </div>
    );
  }

  // Loading durante filtro
  if (isFiltering) {
    return (
      <div className="products-loading-tech">
        <div className="loading-spinner-tech"></div>
        <p>Aplicando filtros...</p>
      </div>
    );
  }

  return (
    <div className="products-page-tech">
      {/* Header Premium */}
      <div className="products-header-tech">
        <div className="products-hero-tech">
          <h1 className="products-title-tech">
            <span className="title-accent-tech">TECH</span> STORE
          </h1>
          <p className="products-subtitle-tech">
            As melhores placas de vídeo e componentes para gamers e creators
          </p>
        </div>
        
        {/* Search Bar Premium */}
        <div className="products-search-tech">
          <div className="search-container-tech">
            <input
              type="text"
              placeholder="🔍 Buscar por modelo, marca, especificação..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-tech"
            />
            <div className="search-stats-tech">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'}
            </div>
          </div>
        </div>
      </div>

      {/* Layout Principal */}
      <div className="products-layout-tech">
        {/* Sidebar de Filtros Simplificados */}
        <div className="products-sidebar-tech">
          <div className="sidebar-header-tech">
            <h3 className="sidebar-title-tech">
              ⚙️ FILTROS
              {getActiveFiltersCount() > 0 && (
                <span className="filters-count-tech">
                  {getActiveFiltersCount()}
                </span>
              )}
            </h3>
            <button 
              className="clear-filters-tech"
              onClick={clearAllFilters}
              disabled={getActiveFiltersCount() === 0}
            >
              🔄 Limpar
            </button>
          </div>

          {/* Filtro de Categorias */}
          <div className="filter-section-tech">
            <h4 className="filter-title-tech">
              <span>🚀</span> CATEGORIAS
            </h4>
            <div className="filter-options-tech">
              <button 
                className={`filter-option-tech ${selectedCategory === 'all' ? 'active-tech' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                🗂️ Todas as Categorias
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

          {/* Filtro de Marcas */}
          <div className="filter-section-tech">
            <h4 className="filter-title-tech">
              <span>🏷️</span> MARCAS
            </h4>
            <div className="filter-options-tech">
              {getUniqueBrands().map(brand => (
                <label key={brand} className="checkbox-option-tech">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="checkbox-input-tech"
                  />
                  <span className="checkbox-custom-tech"></span>
                  <span className="checkbox-label-tech">{brand}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="products-main-tech">
          {/* Barra de Ferramentas */}
          <div className="products-toolbar-tech">
            <div className="toolbar-left-tech">
              <span className="results-count-tech">
                <span>{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
                {selectedCategory !== 'all' && ` em ${selectedCategory === 'gpu' ? 'Placas de Vídeo' : selectedCategory === 'cpu' ? 'Processadores' : 'Placas-mãe'}`}
              </span>
            </div>
            <div className="toolbar-right-tech">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select-tech"
              >
                <option value="name">Ordenar por: Nome A-Z</option>
                <option value="price-low">Preço: Menor para Maior</option>
                <option value="price-high">Preço: Maior para Menor</option>
                <option value="rating">Melhor Avaliado</option>
                <option value="reviews">Mais Avaliados</option>
              </select>
            </div>
          </div>

          {/* Grid de Produtos */}
          <div className="products-grid-tech">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card-tech">
                {/* Badges */}
                <div className="product-badges-tech">
                  {product.isNew && <span className="badge-new-tech">🆕 NOVO</span>}
                  {product.isPromo && <span className="badge-promo-tech">🔥 PROMO</span>}
                  {product.stock < 3 && <span className="badge-stock-tech">⚠️ ÚLTIMAS</span>}
                </div>

                {/* Imagem do Produto */}
                <div 
                  className="product-image-tech"
                  onClick={() => handleProductClick(product.id)}
                >
                  <span className="product-emoji-tech">{product.image}</span>
                </div>

                {/* Informações do Produto */}
                <div className="product-info-tech">
                  <div className="product-brand-tech">{product.brand}</div>
                  <h3 
                    className="product-name-tech"
                    onClick={() => handleProductClick(product.id)}
                  >
                    {product.name}
                  </h3>
                  
                  {/* Avaliação */}
                  <div className="product-rating-tech">
                    <span className="rating-stars-tech">⭐ {product.rating}</span>
                    <span className="rating-count-tech">({product.reviews} reviews)</span>
                  </div>

                  {/* Especificações */}
                  <div className="product-specs-tech">
                    {product.specs.slice(0, 3).map((spec, index) => (
                      <span key={index} className="spec-tag-tech">{spec}</span>
                    ))}
                  </div>

                  {/* Preço */}
                  <div className="product-price-tech">
                    {product.isPromo ? (
                      <>
                        <span className="price-current-tech">
                          {formatPrice(product.price)}
                        </span>
                        <span className="price-original-tech">
                          {formatPrice(product.originalPrice)}
                        </span>
                        <span className="price-discount-tech">
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                        </span>
                      </>
                    ) : (
                      <span className="price-normal-tech">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>

                  {/* Estoque */}
                  <div className={`product-stock-tech ${product.stock < 3 ? 'low-stock-tech' : ''}`}>
                    {product.stock > 0 
                      ? `📦 ${product.stock} unidade${product.stock !== 1 ? 's' : ''} em estoque` 
                      : '❌ Fora de estoque'
                    }
                  </div>

                  {/* Ações */}
                  <div className="product-actions-tech">
                    <button 
                      className="btn-cart-tech"
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      data-product-id={product.id}
                    >
                      <span className="btn-icon-tech">🛒</span>
                      {product.stock > 0 ? 'Adicionar ao Carrinho' : 'Indisponível'}
                    </button>
                    <button 
                      className="btn-tradein-tech"
                      onClick={() => handleQuickView(product)}
                    >
                      <span className="btn-icon-tech">🔄</span>
                      TRADE-IN
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Estado Vazio */}
          {filteredProducts.length === 0 && (
            <div className="products-empty-tech">
              <div className="empty-icon-tech">🔍</div>
              <h3 className="empty-title-tech">Nenhum produto encontrado</h3>
              <p className="empty-description-tech">
                Não encontramos produtos que correspondam aos seus critérios de busca.
                Tente ajustar os filtros ou usar termos de busca diferentes.
              </p>
              <button 
                className="btn-reset-tech"
                onClick={clearAllFilters}
              >
                🔄 Limpar Todos os Filtros
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;