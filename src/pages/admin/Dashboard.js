import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';
import './admin.css';

const AdminDashboard = () => {
  const { user, logout } = useAuth(); // Adicionei o logout aqui
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingTradeIns: 0,
    totalRevenue: 0
  });

  // Função de logout
  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja sair do painel administrativo?')) {
      logout();
    }
  };

  // Dados mockados - depois vem da API
  useEffect(() => {
    setStats({
      totalProducts: 156,
      totalOrders: 89,
      pendingTradeIns: 12,
      totalRevenue: 125430
    });
  }, []);

  if (!user || user.role !== 'admin') {
    return (
      <div className="admin-access-denied-tech">
        <div className="access-denied-container-tech">
          <div className="access-denied-icon-tech">🚫</div>
          <h2 className="access-denied-title-tech">Acesso Restrito</h2>
          <p className="access-denied-text-tech">
            Você não tem permissão para acessar o painel administrativo.
          </p>
          <a href="/" className="access-denied-btn-tech">Voltar para Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-tech">
      {/* Header */}
      <div className="admin-header-tech">
        <div className="admin-header-content-tech">
          <div className="admin-welcome-tech">
            <h1 className="admin-title-tech">
              <span className="admin-title-accent-tech">ADMIN</span> DASHBOARD
            </h1>
            <p className="admin-subtitle-tech">
              Bem-vindo, <span className="admin-user-name-tech">{user.name}</span>
            </p>
          </div>
          <div className="admin-actions-tech">
            <button className="admin-action-btn-tech primary-tech">
              <span className="action-icon-tech">📊</span>
              Relatório
            </button>
            <button className="admin-action-btn-tech secondary-tech">
              <span className="action-icon-tech">⚙️</span>
              Configurações
            </button>
            {/* BOTÃO DE LOGOUT - VERSÃO COM TEXTO */}
            <button 
              className="admin-action-btn-tech logout-tech"
              onClick={handleLogout}
            >
              <span className="action-icon-tech">🚪</span>
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-stats-grid-tech">
        <div className="stat-card-tech">
          <div className="stat-icon-tech products-tech">🎮</div>
          <div className="stat-info-tech">
            <div className="stat-number-tech">{stats.totalProducts}</div>
            <div className="stat-label-tech">Produtos</div>
          </div>
          <div className="stat-trend-tech positive-tech">+12%</div>
        </div>

        <div className="stat-card-tech">
          <div className="stat-icon-tech orders-tech">📦</div>
          <div className="stat-info-tech">
            <div className="stat-number-tech">{stats.totalOrders}</div>
            <div className="stat-label-tech">Pedidos</div>
          </div>
          <div className="stat-trend-tech positive-tech">+8%</div>
        </div>

        <div className="stat-card-tech">
          <div className="stat-icon-tech tradeins-tech">🔄</div>
          <div className="stat-info-tech">
            <div className="stat-number-tech">{stats.pendingTradeIns}</div>
            <div className="stat-label-tech">Trade-Ins Pendentes</div>
          </div>
          <div className="stat-trend-tech warning-tech">⚠️</div>
        </div>

        <div className="stat-card-tech">
          <div className="stat-icon-tech revenue-tech">💰</div>
          <div className="stat-info-tech">
            <div className="stat-number-tech">R$ {stats.totalRevenue.toLocaleString()}</div>
            <div className="stat-label-tech">Receita Total</div>
          </div>
          <div className="stat-trend-tech positive-tech">+15%</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main-tech">
        {/* Navigation Tabs */}
        <div className="admin-tabs-tech">
          <button 
            className={`admin-tab-tech ${activeTab === 'overview' ? 'active-tech' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="tab-icon-tech">📊</span>
            Visão Geral
          </button>
          <button 
            className={`admin-tab-tech ${activeTab === 'products' ? 'active-tech' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <span className="tab-icon-tech">🎮</span>
            Produtos
          </button>
          <button 
            className={`admin-tab-tech ${activeTab === 'tradeins' ? 'active-tech' : ''}`}
            onClick={() => setActiveTab('tradeins')}
          >
            <span className="tab-icon-tech">🔄</span>
            Trade-Ins
          </button>
          <button 
            className={`admin-tab-tech ${activeTab === 'orders' ? 'active-tech' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <span className="tab-icon-tech">📦</span>
            Pedidos
          </button>
          <button 
            className={`admin-tab-tech ${activeTab === 'users' ? 'active-tech' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <span className="tab-icon-tech">👥</span>
            Usuários
          </button>
        </div>

        {/* Tab Content */}
        <div className="admin-content-tech">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'products' && <ProductsTab />}
          {activeTab === 'tradeins' && <TradeInsTab />}
          {activeTab === 'orders' && <OrdersTab />}
          {activeTab === 'users' && <UsersTab />}
        </div>
      </div>
    </div>
  );
};

// Componentes das Tabs (permanecem os mesmos)
const OverviewTab = () => {
  return (
    <div className="tab-content-tech">
      <div className="tab-header-tech">
        <h3 className="tab-title-tech">Visão Geral do Sistema</h3>
        <p className="tab-subtitle-tech">Resumo completo das atividades da loja</p>
      </div>
      
      <div className="overview-grid-tech">
        <div className="overview-card-tech large-tech">
          <h4 className="overview-card-title-tech">📈 Vendas Recentes</h4>
          <div className="sales-list-tech">
            <div className="sale-item-tech">
              <span className="sale-product-tech">RTX 4080 16GB</span>
              <span className="sale-amount-tech">R$ 8.499,00</span>
              <span className="sale-status-tech completed-tech">Concluído</span>
            </div>
            <div className="sale-item-tech">
              <span className="sale-product-tech">RX 7900 XTX</span>
              <span className="sale-amount-tech">R$ 6.999,00</span>
              <span className="sale-status-tech pending-tech">Pendente</span>
            </div>
            <div className="sale-item-tech">
              <span className="sale-product-tech">RTX 4070 Ti</span>
              <span className="sale-amount-tech">R$ 5.299,00</span>
              <span className="sale-status-tech completed-tech">Concluído</span>
            </div>
          </div>
        </div>

        <div className="overview-card-tech">
          <h4 className="overview-card-title-tech">⚠️ Alertas</h4>
          <div className="alerts-list-tech">
            <div className="alert-item-tech warning-tech">
              <span className="alert-icon-tech">🔄</span>
              <span>5 Trade-Ins aguardando avaliação</span>
            </div>
            <div className="alert-item-tech info-tech">
              <span className="alert-icon-tech">📦</span>
              <span>3 Pedidos com pagamento pendente</span>
            </div>
            <div className="alert-item-tech success-tech">
              <span className="alert-icon-tech">🎮</span>
              <span>Estoque de RTX 4090 baixo</span>
            </div>
          </div>
        </div>

        <div className="overview-card-tech">
          <h4 className="overview-card-title-tech">🚀 Ações Rápidas</h4>
          <div className="quick-actions-tech">
            <button className="quick-action-btn-tech">
              <span className="action-icon-tech">➕</span>
              Adicionar Produto
            </button>
            <button className="quick-action-btn-tech">
              <span className="action-icon-tech">🔄</span>
              Avaliar Trade-Ins
            </button>
            <button className="quick-action-btn-tech">
              <span className="action-icon-tech">📊</span>
              Gerar Relatório
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductsTab = () => {
  return (
    <div className="tab-content-tech">
      <div className="tab-header-tech">
        <h3 className="tab-title-tech">Gerenciar Produtos</h3>
        <p className="tab-subtitle-tech">Adicione, edite ou remova produtos do catálogo</p>
      </div>
      
      <div className="products-actions-tech">
        <button className="admin-primary-btn-tech">
          <span className="btn-icon-tech">➕</span>
          Adicionar Novo Produto
        </button>
        
        <div className="products-filters-tech">
          <input 
            type="text" 
            placeholder="🔍 Buscar produtos..." 
            className="admin-search-tech"
          />
          <select className="admin-filter-tech">
            <option value="">Todos os status</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
            <option value="outofstock">Sem estoque</option>
          </select>
        </div>
      </div>

      <div className="products-table-tech">
        <div className="table-header-tech">
          <div className="table-col-tech">Produto</div>
          <div className="table-col-tech">Preço</div>
          <div className="table-col-tech">Estoque</div>
          <div className="table-col-tech">Status</div>
          <div className="table-col-tech">Ações</div>
        </div>
        
        <div className="table-row-tech">
          <div className="table-col-tech">
            <div className="product-info-tech">
              <span className="product-emoji-tech">🎮</span>
              <div className="product-details-tech">
                <div className="product-name-tech">RTX 4090 24GB</div>
                <div className="product-sku-tech">SKU: GPU-NV-4090</div>
              </div>
            </div>
          </div>
          <div className="table-col-tech">
            <div className="product-price-tech">R$ 12.999,00</div>
          </div>
          <div className="table-col-tech">
            <div className="product-stock-tech">
              <span className="stock-low-tech">2 unidades</span>
            </div>
          </div>
          <div className="table-col-tech">
            <span className="status-badge-tech active-tech">Ativo</span>
          </div>
          <div className="table-col-tech">
            <div className="action-buttons-tech">
              <button className="action-btn-tech edit-tech">✏️</button>
              <button className="action-btn-tech delete-tech">🗑️</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TradeInsTab = () => {
  return (
    <div className="tab-content-tech">
      <div className="tab-header-tech">
        <h3 className="tab-title-tech">Trade-Ins Pendentes</h3>
        <p className="tab-subtitle-tech">Avalie e gerencie solicitações de trade-in</p>
      </div>
      
      <div className="tradeins-list-tech">
        <div className="tradein-card-tech">
          <div className="tradein-header-tech">
            <div className="tradein-user-tech">
              <span className="user-avatar-tech">👤</span>
              <span className="user-name-tech">João Silva</span>
            </div>
            <span className="tradein-date-tech">há 2 dias</span>
          </div>
          
          <div className="tradein-product-tech">
            <span className="product-emoji-tech">🎮</span>
            <span className="product-name-tech">RTX 3080 10GB - Excelente estado</span>
          </div>
          
          <div className="tradein-actions-tech">
            <button className="tradein-btn-tech approve-tech">✅ Aprovar</button>
            <button className="tradein-btn-tech reject-tech">❌ Recusar</button>
            <button className="tradein-btn-tech details-tech">🔍 Detalhes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrdersTab = () => {
  return (
    <div className="tab-content-tech">
      <div className="tab-header-tech">
        <h3 className="tab-title-tech">Gerenciar Pedidos</h3>
        <p className="tab-subtitle-tech">Acompanhe e atualize status dos pedidos</p>
      </div>
      <p className="coming-soon-tech">🚀 Em desenvolvimento...</p>
    </div>
  );
};

const UsersTab = () => {
  return (
    <div className="tab-content-tech">
      <div className="tab-header-tech">
        <h3 className="tab-title-tech">Gerenciar Usuários</h3>
        <p className="tab-subtitle-tech">Visualize e gerencie usuários do sistema</p>
      </div>
      <p className="coming-soon-tech">🚀 Em desenvolvimento...</p>
    </div>
  );
};

export default AdminDashboard;