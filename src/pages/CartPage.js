import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const navigate = useNavigate();
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    coupon,
    applyCoupon,
    removeCoupon,
    getCartTotal,
    getCartDiscount,
    getFinalTotal,
    getItemsCount
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [showCouponInput, setShowCouponInput] = useState(false);

  // Cupons mockados
  const availableCoupons = [
    { code: 'UPGRADE10', value: 10, type: 'percentage', description: '10% de desconto' },
    { code: 'TECH50', value: 50, type: 'fixed', description: 'R$ 50,00 de desconto' },
    { code: 'FREEGPU', value: 100, type: 'fixed', description: 'R$ 100,00 de desconto (Trade-In)' }
  ];

  const handleApplyCoupon = () => {
    const foundCoupon = availableCoupons.find(c => c.code === couponCode.toUpperCase());
    if (foundCoupon) {
      applyCoupon(foundCoupon);
      setCouponCode('');
      setShowCouponInput(false);
    } else {
      alert('Cupom inválido!');
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (items.length === 0) {
    return (
      <div className="cart-empty-tech">
        <div className="empty-cart-icon-tech">🛒</div>
        <h2 className="empty-cart-title-tech">Seu carrinho está vazio</h2>
        <p className="empty-cart-text-tech">
          Explore nossos produtos e encontre as melhores placas de vídeo!
        </p>
        <button 
          className="btn-continue-shopping-tech"
          onClick={handleContinueShopping}
        >
          🎮 Continuar Comprando
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page-tech">
      <div className="cart-header-tech">
        <h1 className="cart-title-tech">
          🛒 MEU CARRINHO
        </h1>
        <div className="cart-summary-tech">
          <span className="items-count-tech">{getItemsCount()} itens</span>
          <button 
            className="btn-clear-cart-tech"
            onClick={clearCart}
          >
            🗑️ Limpar Carrinho
          </button>
        </div>
      </div>

      <div className="cart-layout-tech">
        {/* Lista de Itens */}
        <div className="cart-items-tech">
          {items.map(item => (
            <div key={item.id} className="cart-item-tech">
              <div className="item-image-tech">
                <span className="item-emoji-tech">{item.image}</span>
              </div>

              <div className="item-info-tech">
                <h3 className="item-name-tech">{item.name}</h3>
                <div className="item-brand-tech">{item.brand}</div>
                <div className="item-specs-tech">
                  {item.specs && item.specs.slice(0, 2).map((spec, index) => (
                    <span key={index} className="spec-tag-tech">{spec}</span>
                  ))}
                </div>
              </div>

              <div className="item-quantity-tech">
                <button 
                  className="quantity-btn-tech"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-value-tech">{item.quantity}</span>
                <button 
                  className="quantity-btn-tech"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <div className="item-price-tech">
                <div className="price-total-tech">
                  R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="price-unit-tech">
                  R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} cada
                </div>
              </div>

              <button 
                className="item-remove-tech"
                onClick={() => removeFromCart(item.id)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        {/* Resumo do Pedido */}
        <div className="cart-summary-sidebar-tech">
          <div className="summary-card-tech">
            <h3 className="summary-title-tech">📋 RESUMO DO PEDIDO</h3>

            <div className="summary-row-tech">
              <span>Subtotal ({getItemsCount()} itens):</span>
              <span>R$ {getCartTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>

            {/* Cupom de Desconto */}
            <div className="summary-row-tech">
              <div className="coupon-section-tech">
                {coupon ? (
                  <div className="coupon-applied-tech">
                    <span>Cupom {coupon.code}:</span>
                    <span className="discount-value-tech">
                      -R$ {getCartDiscount().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    <button 
                      className="remove-coupon-tech"
                      onClick={removeCoupon}
                    >
                      ❌
                    </button>
                  </div>
                ) : (
                  <div className="coupon-input-section-tech">
                    {!showCouponInput ? (
                      <button 
                        className="btn-add-coupon-tech"
                        onClick={() => setShowCouponInput(true)}
                      >
                        🎫 Adicionar Cupom
                      </button>
                    ) : (
                      <div className="coupon-input-tech">
                        <input
                          type="text"
                          placeholder="Digite o código do cupom"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="coupon-input-field-tech"
                        />
                        <button 
                          className="btn-apply-coupon-tech"
                          onClick={handleApplyCoupon}
                        >
                          Aplicar
                        </button>
                        <button 
                          className="btn-cancel-coupon-tech"
                          onClick={() => setShowCouponInput(false)}
                        >
                          Cancelar
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="summary-divider-tech"></div>

            <div className="summary-total-tech">
              <span className="total-label-tech">TOTAL:</span>
              <span className="total-value-tech">
                R$ {getFinalTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="summary-savings-tech">
              {getCartDiscount() > 0 && (
                <span className="savings-text-tech">
                  🎉 Você economizou R$ {getCartDiscount().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              )}
            </div>

            <button 
              className="btn-checkout-tech"
              onClick={handleCheckout}
            >
              🚀 FINALIZAR COMPRA
            </button>

            <button 
              className="btn-continue-tech"
              onClick={handleContinueShopping}
            >
              ← Continuar Comprando
            </button>
          </div>

          {/* Cupons Disponíveis */}
          <div className="available-coupons-tech">
            <h4 className="coupons-title-tech">🎫 CUPONS DISPONÍVEIS</h4>
            <div className="coupons-list-tech">
              {availableCoupons.map(coupon => (
                <div key={coupon.code} className="coupon-item-tech">
                  <span className="coupon-code-tech">{coupon.code}</span>
                  <span className="coupon-desc-tech">{coupon.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;