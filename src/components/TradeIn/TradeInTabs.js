import React, { useState } from 'react';
import './TradeInTabs.css';

const TradeInTabs = () => {
  const [activeTab, setActiveTab] = useState('tradein');

  return (
    <div className="tradein-container-tech">
      {/* Header Tech */}
      <div className="tradein-header-tech">
        <h2 className="tradein-title-tech">
          <span className="tradein-title-accent-tech">TECH</span> TRADE-IN SYSTEM
        </h2>
        <p className="tradein-subtitle-tech">
          Atualize seu setup com nosso programa exclusivo de troca
        </p>
        <div className="tradein-title-line-tech"></div>
      </div>

      {/* Tech Tabs */}
      <div className="tradein-tabs-container-tech">
        <button 
          className={`tradein-tab-tech ${activeTab === 'tradein' ? 'tradein-tab-active-tech' : ''}`}
          onClick={() => setActiveTab('tradein')}
        >
          <span className="tradein-tab-icon-tech">💰</span>
          TRADE-IN DESCONTO
        </button>
        <button 
          className={`tradein-tab-tech ${activeTab === 'sell' ? 'tradein-tab-active-tech' : ''}`}
          onClick={() => setActiveTab('sell')}
        >
          <span className="tradein-tab-icon-tech">💵</span>
          VENDA DIRETA
        </button>
      </div>

      {/* Content */}
      <div className="tradein-content-tech">
        {activeTab === 'tradein' ? (
          <TradeInForm />
        ) : (
          <SellForm />
        )}
      </div>

      {/* Tech Features */}
      <div className="tradein-features-tech">
        <div className="tradein-feature-item-tech">
          <div className="tradein-feature-icon-tech">⚡</div>
          <div className="tradein-feature-text-tech">
            <div className="tradein-feature-title-tech">Avaliação Expressa</div>
            <div className="tradein-feature-desc-tech">48h após recebimento</div>
          </div>
        </div>
        <div className="tradein-feature-item-tech">
          <div className="tradein-feature-icon-tech">🚀</div>
          <div className="tradein-feature-text-tech">
            <div className="tradein-feature-title-tech">Frete Grátis</div>
            <div className="tradein-feature-desc-tech">Para todo Brasil</div>
          </div>
        </div>
        <div className="tradein-feature-item-tech">
          <div className="tradein-feature-icon-tech">💎</div>
          <div className="tradein-feature-text-tech">
            <div className="tradein-feature-title-tech">Pagamento Rápido</div>
            <div className="tradein-feature-desc-tech">Até 24h após aprovação</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Trade-In Form Component
const TradeInForm = () => {
  const [formData, setFormData] = useState({
    model: '',
    usage: '',
    condition: '',
    invoice: '',
    notes: ''
  });

  return (
    <div className="tradein-form-tech">
      <div className="tradein-form-header-tech">
        <h3 className="tradein-form-title-tech">
          <span className="tradein-form-icon-tech">🔄</span>
          TRADE-IN PARA DESCONTO
        </h3>
        <p className="tradein-form-description-tech">
          Troque sua placa usada por cupom de desconto em produtos novos
        </p>
      </div>

      <div className="tradein-form-grid-tech">
        <div className="tradein-input-group-tech">
          <label className="tradein-label-tech">MODELO DA PLACA *</label>
          <select 
            className="tradein-select-tech"
            value={formData.model}
            onChange={(e) => setFormData({...formData, model: e.target.value})}
          >
            <option value="">SELECIONE O MODELO</option>
            <option value="rtx4090">NVIDIA RTX 4090</option>
            <option value="rtx4080">NVIDIA RTX 4080</option>
            <option value="rtx4070">NVIDIA RTX 4070</option>
            <option value="rtx3090">NVIDIA RTX 3090</option>
            <option value="rtx3080">NVIDIA RTX 3080</option>
            <option value="rx7900">AMD Radeon RX 7900 XTX</option>
            <option value="rx7800">AMD Radeon RX 7800 XT</option>
          </select>
        </div>

        <div className="tradein-input-group-tech">
          <label className="tradein-label-tech">TEMPO DE USO *</label>
          <select 
            className="tradein-select-tech"
            value={formData.usage}
            onChange={(e) => setFormData({...formData, usage: e.target.value})}
          >
            <option value="">SELECIONE O TEMPO</option>
            <option value="less6">Menos de 6 meses</option>
            <option value="6-12">6 a 12 meses</option>
            <option value="1-2">1 a 2 anos</option>
            <option value="2plus">Mais de 2 anos</option>
          </select>
        </div>

        <div className="tradein-input-group-tech">
          <label className="tradein-label-tech">CONDIÇÃO *</label>
          <select 
            className="tradein-select-tech"
            value={formData.condition}
            onChange={(e) => setFormData({...formData, condition: e.target.value})}
          >
            <option value="">SELECIONE A CONDIÇÃO</option>
            <option value="excellent">Excelente (como nova)</option>
            <option value="good">Boa (pequenos sinais)</option>
            <option value="regular">Regular (marcas visíveis)</option>
          </select>
        </div>

        <div className="tradein-input-group-tech">
          <label className="tradein-label-tech">NOTA FISCAL *</label>
          <select 
            className="tradein-select-tech"
            value={formData.invoice}
            onChange={(e) => setFormData({...formData, invoice: e.target.value})}
          >
            <option value="">POSSUI NOTA FISCAL?</option>
            <option value="yes">Sim, tenho nota</option>
            <option value="no">Não tenho nota</option>
          </select>
        </div>
      </div>

      <div className="tradein-input-group-tech">
        <label className="tradein-label-tech">OBSERVAÇÕES</label>
        <textarea 
          className="tradein-textarea-tech"
          placeholder="Descreva qualquer detalhe importante sobre a placa..."
          rows="4"
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
        />
      </div>

      <div className="tradein-benefits-tech">
        <h4 className="tradein-benefits-title-tech">🎯 VANTAGENS DO TRADE-IN</h4>
        <div className="tradein-benefits-grid-tech">
          <div className="tradein-benefit-item-tech">
            <span className="tradein-benefit-icon-tech">💸</span>
            <span>Desconto imediato</span>
          </div>
          <div className="tradein-benefit-item-tech">
            <span className="tradein-benefit-icon-tech">📦</span>
            <span>Frete grátis</span>
          </div>
          <div className="tradein-benefit-item-tech">
            <span className="tradein-benefit-icon-tech">⏱️</span>
            <span>Avaliação em 48h</span>
          </div>
          <div className="tradein-benefit-item-tech">
            <span className="tradein-benefit-icon-tech">🎁</span>
            <span>Cupom 90 dias</span>
          </div>
        </div>
      </div>

      <button className="tradein-submit-btn-tech">
        <span className="tradein-button-icon-tech">🚀</span>
        SOLICITAR TRADE-IN
      </button>
    </div>
  );
};

// Sell Form Component
const SellForm = () => {
  const [formData, setFormData] = useState({
    model: '',
    price: '',
    payment: '',
    description: ''
  });

  return (
    <div className="tradein-form-tech">
      <div className="tradein-form-header-tech">
        <h3 className="tradein-form-title-tech">
          <span className="tradein-form-icon-tech">💵</span>
          VENDA DIRETA
        </h3>
        <p className="tradein-form-description-tech">
          Venda sua placa diretamente para nós e receba em dinheiro
        </p>
      </div>

      <div className="tradein-form-grid-tech">
        <div className="tradein-input-group-tech">
          <label className="tradein-label-tech">MODELO DA PLACA *</label>
          <select 
            className="tradein-select-tech"
            value={formData.model}
            onChange={(e) => setFormData({...formData, model: e.target.value})}
          >
            <option value="">SELECIONE O MODELO</option>
            <option value="rtx4090">NVIDIA RTX 4090</option>
            <option value="rtx4080">NVIDIA RTX 4080</option>
            <option value="rtx4070">NVIDIA RTX 4070</option>
            <option value="rtx3090">NVIDIA RTX 3090</option>
            <option value="rtx3080">NVIDIA RTX 3080</option>
          </select>
        </div>

        <div className="tradein-input-group-tech">
          <label className="tradein-label-tech">PREÇO ESPERADO (R$) *</label>
          <input 
            type="number" 
            className="tradein-input-tech"
            placeholder="Ex: 2500"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
          />
        </div>

        <div className="tradein-input-group-tech">
          <label className="tradein-label-tech">MÉTODO DE PAGAMENTO *</label>
          <select 
            className="tradein-select-tech"
            value={formData.payment}
            onChange={(e) => setFormData({...formData, payment: e.target.value})}
          >
            <option value="">SELECIONE O MÉTODO</option>
            <option value="pix">PIX</option>
            <option value="transferencia">Transferência Bancária</option>
            <option value="cartao">Cartão de Crédito</option>
          </select>
        </div>
      </div>

      <div className="tradein-input-group-tech">
        <label className="tradein-label-tech">DESCRIÇÃO DETALHADA</label>
        <textarea 
          className="tradein-textarea-tech"
          placeholder="Descreva o estado da placa, se fez overclock, se tem caixa original, etc..."
          rows="4"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
      </div>

      <div className="tradein-benefits-tech">
        <h4 className="tradein-benefits-title-tech">🎯 VANTAGENS DA VENDA DIRETA</h4>
        <div className="tradein-benefits-grid-tech">
          <div className="tradein-benefit-item-tech">
            <span className="tradein-benefit-icon-tech">💸</span>
            <span>Pagamento rápido</span>
          </div>
          <div className="tradein-benefit-item-tech">
            <span className="tradein-benefit-icon-tech">🔄</span>
            <span>Sem compra obrigatória</span>
          </div>
          <div className="tradein-benefit-item-tech">
            <span className="tradein-benefit-icon-tech">📦</span>
            <span>Frete grátis</span>
          </div>
          <div className="tradein-benefit-item-tech">
            <span className="tradein-benefit-icon-tech">🔧</span>
            <span>Avaliação profissional</span>
          </div>
        </div>
      </div>

      <button className="tradein-sell-btn-tech">
        <span className="tradein-button-icon-tech">💰</span>
        SOLICITAR VENDA
      </button>
    </div>
  );
};

export default TradeInTabs;