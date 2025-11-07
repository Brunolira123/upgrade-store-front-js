import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../auth/AuthContext';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    items,
    coupon,
    shipping,
    setShipping,
    getCartTotal,
    getCartDiscount,
    getShippingCost,
    getFinalTotal,
    getItemsCount,
    clearCart
  } = useCart();

  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Estados do formulário
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    cep: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    installments: 1
  });

  // Opções de frete
  const shippingOptions = [
    { id: 'standard', name: 'Entrega Standard', price: 15.90, days: '5-8 dias' },
    { id: 'express', name: 'Entrega Expressa', price: 29.90, days: '2-3 dias' },
    { id: 'priority', name: 'Entrega Priority', price: 49.90, days: '1 dia' }
  ];

  // Métodos de pagamento
  const paymentMethods = [
    { id: 'credit', name: 'Cartão de Crédito', icon: '💳' },
    { id: 'debit', name: 'Cartão de Débito', icon: '🏦' },
    { id: 'pix', name: 'PIX', icon: '📱' },
    { id: 'boleto', name: 'Boleto', icon: '📄' }
  ];

  const handleShippingInfoChange = (field, value) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentInfoChange = (field, value) => {
    setPaymentInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !shippingInfo.fullName) {
      alert('Por favor, preencha seu nome completo');
      return;
    }
    if (currentStep === 2 && !shipping) {
      alert('Por favor, selecione uma opção de frete');
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handlePlaceOrder = async () => {
    // Simular processamento do pedido
    const newOrderNumber = `UPG${Date.now()}`;
    setOrderNumber(newOrderNumber);
    setOrderCompleted(true);
    
    // Limpar carrinho após sucesso
    setTimeout(() => {
      clearCart();
    }, 5000);
  };

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  if (orderCompleted) {
    return (
      <div className="order-complete-tech">
        <div className="order-success-tech">
          <div className="success-icon-tech">🎉</div>
          <h1 className="success-title-tech">Pedido Confirmado!</h1>
          <p className="success-subtitle-tech">
            Seu pedido foi processado com sucesso
          </p>
          
          <div className="order-details-tech">
            <div className="order-number-tech">
              <strong>Número do Pedido:</strong> {orderNumber}
            </div>
            <div className="order-total-tech">
              <strong>Valor Total:</strong> R$ {getFinalTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="order-method-tech">
              <strong>Método de Pagamento:</strong> {paymentMethods.find(p => p.id === paymentMethod)?.name}
            </div>
          </div>

          <div className="success-actions-tech">
            <button 
              className="btn-track-order-tech"
              onClick={() => navigate('/orders')}
            >
              📦 Acompanhar Pedido
            </button>
            <button 
              className="btn-continue-shopping-tech"
              onClick={() => navigate('/products')}
            >
              🎮 Continuar Comprando
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page-tech">
      {/* Progress Steps */}
      <div className="checkout-steps-tech">
        <div className={`step-tech ${currentStep >= 1 ? 'active-tech' : ''}`}>
          <span className="step-number-tech">1</span>
          <span className="step-label-tech">Informações</span>
        </div>
        <div className={`step-tech ${currentStep >= 2 ? 'active-tech' : ''}`}>
          <span className="step-number-tech">2</span>
          <span className="step-label-tech">Frete</span>
        </div>
        <div className={`step-tech ${currentStep >= 3 ? 'active-tech' : ''}`}>
          <span className="step-number-tech">3</span>
          <span className="step-label-tech">Pagamento</span>
        </div>
        <div className={`step-tech ${currentStep >= 4 ? 'active-tech' : ''}`}>
          <span className="step-number-tech">4</span>
          <span className="step-label-tech">Confirmação</span>
        </div>
      </div>

      <div className="checkout-layout-tech">
        {/* Formulário Principal */}
        <div className="checkout-form-tech">
          {/* Step 1: Informações de Entrega */}
          {currentStep === 1 && (
            <div className="checkout-step-tech">
              <h2 className="step-title-tech">📝 Informações de Entrega</h2>
              
              <div className="form-grid-tech">
                <div className="form-group-tech">
                  <label>Nome Completo *</label>
                  <input
                    type="text"
                    value={shippingInfo.fullName}
                    onChange={(e) => handleShippingInfoChange('fullName', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group-tech">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) => handleShippingInfoChange('email', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group-tech">
                  <label>Telefone *</label>
                  <input
                    type="tel"
                    value={shippingInfo.phone}
                    onChange={(e) => handleShippingInfoChange('phone', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group-tech">
                  <label>CEP *</label>
                  <input
                    type="text"
                    value={shippingInfo.cep}
                    onChange={(e) => handleShippingInfoChange('cep', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group-tech full-width-tech">
                  <label>Endereço *</label>
                  <input
                    type="text"
                    value={shippingInfo.address}
                    onChange={(e) => handleShippingInfoChange('address', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group-tech">
                  <label>Número *</label>
                  <input
                    type="text"
                    value={shippingInfo.number}
                    onChange={(e) => handleShippingInfoChange('number', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group-tech">
                  <label>Complemento</label>
                  <input
                    type="text"
                    value={shippingInfo.complement}
                    onChange={(e) => handleShippingInfoChange('complement', e.target.value)}
                  />
                </div>

                <div className="form-group-tech">
                  <label>Bairro *</label>
                  <input
                    type="text"
                    value={shippingInfo.neighborhood}
                    onChange={(e) => handleShippingInfoChange('neighborhood', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group-tech">
                  <label>Cidade *</label>
                  <input
                    type="text"
                    value={shippingInfo.city}
                    onChange={(e) => handleShippingInfoChange('city', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group-tech">
                  <label>Estado *</label>
                  <select
                    value={shippingInfo.state}
                    onChange={(e) => handleShippingInfoChange('state', e.target.value)}
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="SP">São Paulo</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="MG">Minas Gerais</option>
                  </select>
                </div>
              </div>

              <div className="step-actions-tech">
                <button 
                  className="btn-next-tech"
                  onClick={handleNextStep}
                >
                  Continuar para Frete →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Opções de Frete */}
          {currentStep === 2 && (
            <div className="checkout-step-tech">
              <h2 className="step-title-tech">🚚 Opções de Frete</h2>
              
              <div className="shipping-options-tech">
                {shippingOptions.map(option => (
                  <div 
                    key={option.id}
                    className={`shipping-option-tech ${shipping?.id === option.id ? 'selected-tech' : ''}`}
                    onClick={() => setShipping(option)}
                  >
                    <div className="shipping-radio-tech">
                      <div className="radio-dot-tech"></div>
                    </div>
                    <div className="shipping-info-tech">
                      <div className="shipping-name-tech">{option.name}</div>
                      <div className="shipping-days-tech">{option.days}</div>
                    </div>
                    <div className="shipping-price-tech">
                      R$ {option.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="step-actions-tech">
                <button 
                  className="btn-prev-tech"
                  onClick={handlePrevStep}
                >
                  ← Voltar
                </button>
                <button 
                  className="btn-next-tech"
                  onClick={handleNextStep}
                  disabled={!shipping}
                >
                  Continuar para Pagamento →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Método de Pagamento */}
          {currentStep === 3 && (
            <div className="checkout-step-tech">
              <h2 className="step-title-tech">💳 Método de Pagamento</h2>
              
              <div className="payment-methods-tech">
                {paymentMethods.map(method => (
                  <div 
                    key={method.id}
                    className={`payment-method-tech ${paymentMethod === method.id ? 'selected-tech' : ''}`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <span className="method-icon-tech">{method.icon}</span>
                    <span className="method-name-tech">{method.name}</span>
                  </div>
                ))}
              </div>

              {/* Formulário do Cartão */}
              {paymentMethod === 'credit' && (
                <div className="card-form-tech">
                  <div className="form-grid-tech">
                    <div className="form-group-tech full-width-tech">
                      <label>Número do Cartão *</label>
                      <input
                        type="text"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => handlePaymentInfoChange('cardNumber', formatCardNumber(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        required
                      />
                    </div>

                    <div className="form-group-tech full-width-tech">
                      <label>Nome no Cartão *</label>
                      <input
                        type="text"
                        value={paymentInfo.cardName}
                        onChange={(e) => handlePaymentInfoChange('cardName', e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group-tech">
                      <label>Validade *</label>
                      <input
                        type="text"
                        value={paymentInfo.expiry}
                        onChange={(e) => handlePaymentInfoChange('expiry', e.target.value)}
                        placeholder="MM/AA"
                        maxLength="5"
                        required
                      />
                    </div>

                    <div className="form-group-tech">
                      <label>CVV *</label>
                      <input
                        type="text"
                        value={paymentInfo.cvv}
                        onChange={(e) => handlePaymentInfoChange('cvv', e.target.value)}
                        placeholder="123"
                        maxLength="3"
                        required
                      />
                    </div>

                    <div className="form-group-tech">
                      <label>Parcelas *</label>
                      <select
                        value={paymentInfo.installments}
                        onChange={(e) => handlePaymentInfoChange('installments', parseInt(e.target.value))}
                        required
                      >
                        {[1,2,3,4,5,6,7,8,9,10,11,12].map(num => (
                          <option key={num} value={num}>
                            {num}x de R$ {(getFinalTotal() / num).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* PIX */}
              {paymentMethod === 'pix' && (
                <div className="pix-info-tech">
                  <div className="pix-icon-tech">📱</div>
                  <h3>Pagamento via PIX</h3>
                  <p>Após confirmar o pedido, você receberá o QR Code para pagamento</p>
                </div>
              )}

              <div className="step-actions-tech">
                <button 
                  className="btn-prev-tech"
                  onClick={handlePrevStep}
                >
                  ← Voltar
                </button>
                <button 
                  className="btn-next-tech"
                  onClick={handleNextStep}
                >
                  Revisar Pedido →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Revisão do Pedido */}
          {currentStep === 4 && (
            <div className="checkout-step-tech">
              <h2 className="step-title-tech">📋 Revisão do Pedido</h2>
              
              <div className="order-review-tech">
                <div className="review-section-tech">
                  <h4>📦 Itens do Pedido</h4>
                  {items.map(item => (
                    <div key={item.id} className="review-item-tech">
                      <span className="item-emoji-tech">{item.image}</span>
                      <div className="item-details-tech">
                        <div className="item-name-tech">{item.name}</div>
                        <div className="item-quantity-tech">Qtd: {item.quantity}</div>
                      </div>
                      <div className="item-price-tech">
                        R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="review-section-tech">
                  <h4>🚚 Entrega</h4>
                  <div className="shipping-review-tech">
                    <div><strong>{shippingInfo.fullName}</strong></div>
                    <div>{shippingInfo.address}, {shippingInfo.number}</div>
                    <div>{shippingInfo.neighborhood}, {shippingInfo.city} - {shippingInfo.state}</div>
                    <div>CEP: {shippingInfo.cep}</div>
                    <div className="shipping-method-review-tech">
                      <strong>Método:</strong> {shipping?.name}
                    </div>
                  </div>
                </div>

                <div className="review-section-tech">
                  <h4>💳 Pagamento</h4>
                  <div className="payment-review-tech">
                    <div>
                      <strong>Método:</strong> {paymentMethods.find(p => p.id === paymentMethod)?.name}
                    </div>
                    {paymentMethod === 'credit' && (
                      <div>
                        <strong>Parcelas:</strong> {paymentInfo.installments}x
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="step-actions-tech">
                <button 
                  className="btn-prev-tech"
                  onClick={handlePrevStep}
                >
                  ← Voltar
                </button>
                <button 
                  className="btn-place-order-tech"
                  onClick={handlePlaceOrder}
                >
                  🚀 Confirmar Pedido
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Resumo do Pedido */}
        <div className="checkout-summary-tech">
          <div className="summary-card-tech">
            <h3 className="summary-title-tech">Resumo do Pedido</h3>
            
            <div className="summary-items-tech">
              {items.map(item => (
                <div key={item.id} className="summary-item-tech">
                  <span className="item-emoji-tech">{item.image}</span>
                  <div className="item-info-tech">
                    <div className="item-name-tech">{item.name}</div>
                    <div className="item-quantity-tech">Qtd: {item.quantity}</div>
                  </div>
                  <div className="item-price-tech">
                    R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-totals-tech">
              <div className="total-row-tech">
                <span>Subtotal:</span>
                <span>R$ {getCartTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              
              {coupon && (
                <div className="total-row-tech discount-tech">
                  <span>Desconto ({coupon.code}):</span>
                  <span>-R$ {getCartDiscount().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              )}

              {shipping && (
                <div className="total-row-tech">
                  <span>Frete:</span>
                  <span>R$ {shipping.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              )}

              <div className="total-row-tech final-tech">
                <span><strong>Total:</strong></span>
                <span><strong>R$ {getFinalTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;