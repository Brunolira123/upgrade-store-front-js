import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import './ProductDetail.css';


const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, getRelatedProducts, addToCart, getProductReviews, addReview } = useProducts();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [productReviews, setProductReviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);
  
  // Estado para novo review
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    user: ''
  });

  useEffect(() => {
    // Simular carregamento
    setTimeout(() => {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        setRelatedProducts(getRelatedProducts(foundProduct));
        setProductReviews(getProductReviews(id));
      }
      setLoading(false);
    }, 500);
  }, [id, getProductById, getRelatedProducts, getProductReviews]);

  // Handlers
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert(`${quantity}x ${product.name} adicionado ao carrinho!`);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/cart');
    }
  };

  const handleTradeIn = () => {
    navigate('/trade-in', { state: { product } });
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.user && newReview.comment) {
      addReview(product.id, newReview);
      setNewReview({ rating: 5, comment: '', user: '' });
      setProductReviews(getProductReviews(id));
      alert('Avaliação enviada com sucesso!');
    }
  };

  if (loading) {
    return (
      <div className="product-detail-loading-tech">
        <div className="loading-spinner-tech"></div>
        <p>Carregando produto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found-tech">
        <div className="not-found-icon-tech">🔍</div>
        <h2>Produto não encontrado</h2>
        <button onClick={() => navigate('/products')} className="btn-back-tech">
          ← Voltar para produtos
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-tech">
      {/* Breadcrumb */}
      <div className="breadcrumb-tech">
        <button onClick={() => navigate('/')} className="breadcrumb-link-tech">Home</button>
        <span className="breadcrumb-separator-tech">/</span>
        <button onClick={() => navigate('/products')} className="breadcrumb-link-tech">Produtos</button>
        <span className="breadcrumb-separator-tech">/</span>
        <span className="breadcrumb-current-tech">{product.name}</span>
      </div>

      <div className="product-detail-layout-tech">
        {/* Left Column - Images */}
        <div className="product-images-tech">
          <div className="product-main-image-tech">
            <div className="image-container-tech">
              <span className="product-emoji-large-tech">{product.images[selectedImage]}</span>
            </div>
            
            <div className="product-badges-tech">
              {product.isNew && <span className="badge-new-tech">🆕 NOVO</span>}
              {product.isPromo && <span className="badge-promo-tech">🔥 PROMOÇÃO</span>}
              <span className="badge-stock-tech">{product.stock} em estoque</span>
            </div>
          </div>

          <div className="product-thumbnails-tech">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`thumbnail-tech ${selectedImage === index ? 'active-tech' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <span className="thumbnail-emoji-tech">{image}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Middle Column - Product Info */}
        <div className="product-info-tech">
          <div className="product-header-tech">
            <div className="product-brand-tech">{product.brand}</div>
            <h1 className="product-title-tech">{product.name}</h1>
            
            <div className="product-rating-tech">
              <div className="rating-stars-tech">
                {"⭐".repeat(5)}
                <span className="rating-value-tech">{product.rating}</span>
              </div>
              <span className="rating-count-tech">({product.reviews} avaliações)</span>
              <span className="rating-verified-tech">✓ Verificado</span>
            </div>
          </div>

          {/* Price */}
          <div className="product-price-section-tech">
            {product.isPromo ? (
              <>
                <div className="price-current-tech">
                  R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="price-original-tech">
                  R$ {product.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="price-discount-tech">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </div>
              </>
            ) : (
              <div className="price-normal-tech">
                R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            )}
            
            
          </div>

          {/* Short Description */}
          <div className="product-short-desc-tech">
            {product.description}
          </div>

          {/* Key Specs */}
          <div className="product-key-specs-tech">
            <h3 className="specs-title-tech">🎯 PRINCIPAIS CARACTERÍSTICAS</h3>
            <div className="specs-grid-tech">
              {product.specs.slice(0, 4).map((spec, index) => (
                <div key={index} className="spec-item-tech">
                  <span className="spec-icon-tech">✓</span>
                  {spec}
                </div>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="quantity-selector-tech">
            <label className="quantity-label-tech">Quantidade:</label>
            <div className="quantity-controls-tech">
              <button 
                className="quantity-btn-tech"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="quantity-value-tech">{quantity}</span>
              <button 
                className="quantity-btn-tech"
                onClick={incrementQuantity}
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
            <span className="stock-info-tech">{product.stock} disponíveis</span>
          </div>

          {/* Action Buttons */}
          <div className="product-actions-tech">
            <button 
              className="btn-buy-now-tech"
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              <span className="btn-icon-tech">🚀</span>
              COMPRAR AGORA
            </button>
            <button 
              className="btn-add-cart-tech"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <span className="btn-icon-tech">🛒</span>
              ADICIONAR AO CARRINHO
            </button>
            <button 
              className="btn-tradein-tech"
              onClick={handleTradeIn}
            >
              <span className="btn-icon-tech">🔄</span>
              TRADE-IN
            </button>
          </div>

          {/* Delivery Info */}
          <div className="delivery-info-tech">
            <div className="delivery-item-tech">
              <span className="delivery-icon-tech">🚚</span>
              <div className="delivery-text-tech">
                <strong>Frete Seguro</strong>
                <span>Enviamos para todo o Brasil!</span>
              </div>
            </div>
            <div className="delivery-item-tech">
              <span className="delivery-icon-tech">⚡</span>
              <div className="delivery-text-tech">
                <strong>Entrega Expressa</strong>
                <span>Postagem em 2 à 5 dias úteis</span>
              </div>
            </div>
            <div className="delivery-item-tech">
              <span className="delivery-icon-tech">🛡️</span>
              <div className="delivery-text-tech">
                <strong>Garantia</strong>
                <span>6 meses de garantia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Tech Specs */}
        <div className="product-tech-specs-tech">
          <div className="specs-card-tech">
            <h3 className="specs-card-title-tech">📊 ESPECIFICAÇÕES TÉCNICAS</h3>
            
            <div className="specs-list-tech">
              <div className="spec-row-tech">
                <span className="spec-label-tech">SKU:</span>
                <span className="spec-value-tech">{product.sku}</span>
              </div>
              <div className="spec-row-tech">
                <span className="spec-label-tech">Memória:</span>
                <span className="spec-value-tech">24GB GDDR6X</span>
              </div>
              <div className="spec-row-tech">
                <span className="spec-label-tech">Arquitetura:</span>
                <span className="spec-value-tech">Ada Lovelace</span>
              </div>
              <div className="spec-row-tech">
                <span className="spec-label-tech">Clock Boost:</span>
                <span className="spec-value-tech">2.52 GHz</span>
              </div>
              <div className="spec-row-tech">
                <span className="spec-label-tech">Consumo:</span>
                <span className="spec-value-tech">450W</span>
              </div>
              <div className="spec-row-tech">
                <span className="spec-label-tech">Recomendação Fonte:</span>
                <span className="spec-value-tech">{product.powerRequirement}</span>
              </div>
              <div className="spec-row-tech">
                <span className="spec-label-tech">Portas:</span>
                <span className="spec-value-tech">{product.ports.join(', ')}</span>
              </div>
              <div className="spec-row-tech">
                <span className="spec-label-tech">Dimensões:</span>
                <span className="spec-value-tech">{product.dimensions}</span>
              </div>
              <div className="spec-row-tech">
                <span className="spec-label-tech">Peso:</span>
                <span className="spec-value-tech">{product.weight}</span>
              </div>
            </div>

            {/* Features */}
            <div className="features-section-tech">
              <h4 className="features-title-tech">⭐ RECURSOS</h4>
              <div className="features-grid-tech">
                {product.features.map((feature, index) => (
                  <div key={index} className="feature-item-tech">
                    <span className="feature-icon-tech">🎯</span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="product-tabs-tech">
        <div className="tabs-header-tech">
          <button 
            className={`tab-btn-tech ${activeTab === 'description' ? 'active-tech' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            📖 DESCRIÇÃO COMPLETA
          </button>
          <button 
            className={`tab-btn-tech ${activeTab === 'specs' ? 'active-tech' : ''}`}
            onClick={() => setActiveTab('specs')}
          >
            🔧 ESPECIFICAÇÕES
          </button>
          <button 
            className={`tab-btn-tech ${activeTab === 'reviews' ? 'active-tech' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            ⭐ AVALIAÇÕES ({product.reviews})
          </button>
        </div>

        <div className="tabs-content-tech">
          {activeTab === 'description' && (
            <div className="tab-panel-tech">
              <div className="description-content-tech">
                {product.fullDescription.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="tab-panel-tech">
              <div className="full-specs-tech">
                <h3>Especificações Técnicas Completas</h3>
                <div className="specs-table-tech">
                  {product.specs.map((spec, index) => (
                    <div key={index} className="spec-table-row-tech">
                      <span className="spec-table-label-tech">•</span>
                      <span className="spec-table-value-tech">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="tab-panel-tech">
              <div className="reviews-section-tech">
                <div className="reviews-summary-tech">
                  <div className="overall-rating-tech">
                    <div className="rating-large-tech">{product.rating}</div>
                    <div className="rating-stars-large-tech">{"⭐".repeat(5)}</div>
                    <div className="rating-count-large-tech">{product.reviews} avaliações</div>
                  </div>
                  
                  {/* Add Review Form */}
                  <div className="add-review-form-tech">
                    <h4>Deixe sua avaliação</h4>
                    <form onSubmit={handleReviewSubmit}>
                      <div className="form-group-tech">
                        <label>Seu nome:</label>
                        <input
                          type="text"
                          value={newReview.user}
                          onChange={(e) => setNewReview({...newReview, user: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group-tech">
                        <label>Avaliação:</label>
                        <div className="rating-selector-tech">
                          {[1, 2, 3, 4, 5].map(star => (
                            <button
                              key={star}
                              type="button"
                              className={`star-btn-tech ${newReview.rating >= star ? 'active-tech' : ''}`}
                              onClick={() => setNewReview({...newReview, rating: star})}
                            >
                              ⭐
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="form-group-tech">
                        <label>Comentário:</label>
                        <textarea
                          value={newReview.comment}
                          onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                          rows="4"
                          required
                        />
                      </div>
                      <button type="submit" className="btn-submit-review-tech">
                        Enviar Avaliação
                      </button>
                    </form>
                  </div>
                </div>

                <div className="reviews-list-tech">
                  {productReviews.map(review => (
                    <div key={review.id} className="review-card-tech">
                      <div className="review-header-tech">
                        <div className="reviewer-info-tech">
                          <span className="reviewer-name-tech">{review.user}</span>
                          {review.verified && <span className="verified-badge-tech">✓ Verificado</span>}
                        </div>
                        <div className="review-rating-tech">{"⭐".repeat(review.rating)}</div>
                      </div>
                      <p className="review-comment-tech">{review.comment}</p>
                      <div className="review-date-tech">{review.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-products-tech">
          <h3 className="related-title-tech">🔗 PRODUTOS RELACIONADOS</h3>
          <div className="related-grid-tech">
            {relatedProducts.map(relatedProduct => (
              <div 
                key={relatedProduct.id} 
                className="related-card-tech"
                onClick={() => navigate(`/product/${relatedProduct.id}`)}
              >
                <div className="related-image-tech">
                  <span className="related-emoji-tech">{relatedProduct.images[0]}</span>
                </div>
                <div className="related-info-tech">
                  <h4 className="related-name-tech">{relatedProduct.name}</h4>
                  <div className="related-price-tech">
                    R$ {relatedProduct.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;