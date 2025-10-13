import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminProducts.css';

const AdminProducts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "RTX 4090 24GB",
      category: "gpu",
      price: 12999.00,
      originalPrice: 12999.00,
      stock: 5,
      status: "active",
      image: "🎮",
      specs: ["24GB GDDR6X", "DLSS 3", "Ray Tracing"],
      isPromo: false,
      promoPrice: null,
      promoEnd: null,
      sku: "GPU-NV-4090"
    },
    {
      id: 2,
      name: "RTX 4080 16GB",
      category: "gpu", 
      price: 8499.00,
      originalPrice: 8499.00,
      stock: 12,
      status: "active",
      image: "⚡",
      specs: ["16GB GDDR6X", "DLSS 3", "4K Gaming"],
      isPromo: true,
      promoPrice: 7999.00,
      promoEnd: "2024-12-31",
      sku: "GPU-NV-4080"
    }
  ]);

  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!user || user.role !== 'admin') {
    return (
      <div className="admin-access-denied-tech">
        <div className="access-denied-container-tech">
          <div className="access-denied-icon-tech">🚫</div>
          <h2 className="access-denied-title-tech">Acesso Restrito</h2>
          <p className="access-denied-text-tech">Acesso permitido apenas para administradores.</p>
        </div>
      </div>
    );
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    navigate('/admin/products/create');
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      // Editar produto existente
      setProducts(products.map(p => 
        p.id === editingProduct.id ? { ...p, ...productData } : p
      ));
    } else {
      // Adicionar novo produto
      const newProduct = {
        ...productData,
        id: Math.max(...products.map(p => p.id)) + 1,
        sku: `GPU-${Date.now()}`
      };
      setProducts([...products, newProduct]);
    }
    setShowProductModal(false);
  };

  const toggleProductStatus = (productId) => {
    setProducts(products.map(p => 
      p.id === productId 
        ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
        : p
    ));
  };

  const togglePromo = (productId) => {
    setProducts(products.map(p => 
      p.id === productId 
        ? { 
            ...p, 
            isPromo: !p.isPromo,
            promoPrice: !p.isPromo ? p.price * 0.9 : null, // 10% off
            promoEnd: !p.isPromo ? '2024-12-31' : null
          }
        : p
    ));
  };

  return (
    <div className="admin-products-tech">
      {/* Header */}
      <div className="admin-page-header-tech">
        <div className="header-content-tech">
          <h1 className="page-title-tech">🎮 Gestão de Produtos</h1>
          <p className="page-subtitle-tech">Gerencie seu catálogo de produtos</p>
        </div>
        <button className="admin-primary-btn-tech" onClick={handleAddProduct}>
          <span className="btn-icon-tech">➕</span>
          Adicionar Produto
        </button>
      </div>

      {/* Stats */}
      <div className="products-stats-tech">
        <div className="stat-card-tech">
          <div className="stat-icon-tech">📦</div>
          <div className="stat-info-tech">
            <div className="stat-number-tech">{products.length}</div>
            <div className="stat-label-tech">Total de Produtos</div>
          </div>
        </div>
        <div className="stat-card-tech">
          <div className="stat-icon-tech">🔥</div>
          <div className="stat-info-tech">
            <div className="stat-number-tech">{products.filter(p => p.isPromo).length}</div>
            <div className="stat-label-tech">Em Promoção</div>
          </div>
        </div>
        <div className="stat-card-tech">
          <div className="stat-icon-tech">⚠️</div>
          <div className="stat-info-tech">
            <div className="stat-number-tech">{products.filter(p => p.stock < 3).length}</div>
            <div className="stat-label-tech">Estoque Baixo</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="products-filters-tech">
        <div className="search-box-tech">
          <input
            type="text"
            placeholder="🔍 Buscar por nome ou SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-search-tech"
          />
        </div>
        <div className="filter-group-tech">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="admin-filter-tech"
          >
            <option value="all">Todas as categorias</option>
            <option value="gpu">Placas de Vídeo</option>
            <option value="cpu">Processadores</option>
            <option value="motherboard">Placas-mãe</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="products-table-container-tech">
        <div className="table-header-tech">
          <div className="table-col-tech product-col-tech">Produto</div>
          <div className="table-col-tech">Preço</div>
          <div className="table-col-tech">Estoque</div>
          <div className="table-col-tech">Status</div>
          <div className="table-col-tech">Promoção</div>
          <div className="table-col-tech">Ações</div>
        </div>

        {filteredProducts.map(product => (
          <div key={product.id} className="table-row-tech">
            <div className="table-col-tech product-col-tech">
              <div className="product-info-tech">
                <span className="product-emoji-tech">{product.image}</span>
                <div className="product-details-tech">
                  <div className="product-name-tech">{product.name}</div>
                  <div className="product-sku-tech">SKU: {product.sku}</div>
                  <div className="product-specs-tech">
                    {product.specs.slice(0, 2).map((spec, index) => (
                      <span key={index} className="spec-tag-tech">{spec}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="table-col-tech">
              <div className="price-info-tech">
                {product.isPromo ? (
                  <>
                    <div className="promo-price-tech">R$ {product.promoPrice?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    <div className="original-price-tech">R$ {product.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                  </>
                ) : (
                  <div className="normal-price-tech">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                )}
              </div>
            </div>

            <div className="table-col-tech">
              <div className={`stock-info-tech ${product.stock < 3 ? 'low-stock-tech' : ''}`}>
                {product.stock} unidades
                {product.stock < 3 && <span className="stock-warning-tech"> ⚠️</span>}
              </div>
            </div>

            <div className="table-col-tech">
              <button 
                className={`status-toggle-tech ${product.status === 'active' ? 'active-tech' : 'inactive-tech'}`}
                onClick={() => toggleProductStatus(product.id)}
              >
                {product.status === 'active' ? 'Ativo' : 'Inativo'}
              </button>
            </div>

            <div className="table-col-tech">
              <button 
                className={`promo-toggle-tech ${product.isPromo ? 'promo-on-tech' : 'promo-off-tech'}`}
                onClick={() => togglePromo(product.id)}
              >
                {product.isPromo ? '🔴 Promoção' : '🟢 Normal'}
              </button>
            </div>

            <div className="table-col-tech">
              <div className="action-buttons-tech">
                <button 
                  className="action-btn-tech edit-tech"
                  onClick={() => handleEditProduct(product)}
                  title="Editar"
                >
                  ✏️
                </button>
                <button 
                  className="action-btn-tech stock-tech"
                  onClick={() => {/* Abrir modal de estoque */}}
                  title="Gerenciar Estoque"
                >
                  📦
                </button>
                <button 
                  className="action-btn-tech delete-tech"
                  onClick={() => handleDeleteProduct(product.id)}
                  title="Excluir"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <ProductModal
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => setShowProductModal(false)}
        />
      )}
    </div>
  );
};

// Modal de Produto
const ProductModal = ({ product, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || 'gpu',
    price: product?.price || '',
    stock: product?.stock || 0,
    image: product?.image || '🎮',
    specs: product?.specs?.join(', ') || '',
    isPromo: product?.isPromo || false,
    promoPrice: product?.promoPrice || '',
    promoEnd: product?.promoEnd || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      specs: formData.specs.split(',').map(spec => spec.trim()).filter(spec => spec),
      promoPrice: formData.promoPrice ? parseFloat(formData.promoPrice) : null
    };
    onSave(productData);
  };

  return (
    <div className="modal-overlay-tech">
      <div className="modal-content-tech large-tech">
        <div className="modal-header-tech">
          <h2 className="modal-title-tech">
            {product ? 'Editar Produto' : 'Adicionar Novo Produto'}
          </h2>
          <button className="modal-close-tech" onClick={onClose}>×</button>
        </div>

        <form className="modal-form-tech" onSubmit={handleSubmit}>
          <div className="form-grid-tech">
            <div className="form-group-tech">
              <label className="form-label-tech">Nome do Produto *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="form-input-tech"
                required
              />
            </div>

            <div className="form-group-tech">
              <label className="form-label-tech">Categoria *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="form-input-tech"
              >
                <option value="gpu">Placa de Vídeo</option>
                <option value="cpu">Processador</option>
                <option value="motherboard">Placa-mãe</option>
                <option value="memory">Memória RAM</option>
                <option value="storage">Armazenamento</option>
              </select>
            </div>

            <div className="form-group-tech">
              <label className="form-label-tech">Preço (R$) *</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="form-input-tech"
                required
              />
            </div>

            <div className="form-group-tech">
              <label className="form-label-tech">Estoque *</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                className="form-input-tech"
                required
              />
            </div>

            <div className="form-group-tech">
              <label className="form-label-tech">Emoji/Ícone</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="form-input-tech"
                placeholder="🎮, ⚡, 🔥, etc"
              />
            </div>

            <div className="form-group-tech full-width-tech">
              <label className="form-label-tech">Especificações (separadas por vírgula)</label>
              <input
                type="text"
                value={formData.specs}
                onChange={(e) => setFormData({...formData, specs: e.target.value})}
                className="form-input-tech"
                placeholder="24GB GDDR6X, DLSS 3, Ray Tracing"
              />
            </div>
          </div>

          <div className="form-actions-tech">
            <button type="button" className="btn-secondary-tech" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary-tech">
              {product ? 'Atualizar' : 'Adicionar'} Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProducts;