import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ onLoginClick }) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  // ← FUNÇÃO PARA IR PARA HOME
  const handleLogoClick = () => {
    navigate('/');
  };

  // ← FUNÇÃO PARA VENDA
  const handleSellClick = () => {
    navigate('/sell');
  };

  return (
    <header className="header-tech">
      <div className="header-container">
        {/* Logo - AGORA CLICÁVEL */}
        <div className="logo-tech" onClick={handleLogoClick}>
          <div className="logo-icon-tech">
            <div className="logo-glow-tech"></div>
            <span className="logo-text-tech">UPGRADE</span>
          </div>
          <span className="logo-subtext-tech">STORE</span>
        </div>

        {/* Navigation - COM BOTÃO VENDA */}
        <nav className="nav-tech">
          <a href="/products" className="nav-link-tech">
            <span className="nav-icon-tech">🎮</span>
            PRODUTOS
          </a>
          
          {/* BOTÃO VENDA NOVO */}
          <button className="nav-link-tech sell-btn-tech" onClick={handleSellClick}>
            <span className="nav-icon-tech">💰</span>
            VENDA
          </button>
          
          <a href="/trade-in" className="nav-link-tech">
            <span className="nav-icon-tech">🔄</span>
            TRADE-IN
          </a>
          
          {user?.role === 'admin' && (
            <a href="/admin" className="nav-link-tech">
              <span className="nav-icon-tech">👨‍💼</span>
              ADMIN
            </a>
          )}
        </nav>

        {/* Actions */}
        <div className="actions-tech">
          <button className="cart-btn-tech">
            <span className="cart-icon-tech">🛒</span>
            <span className="badge-tech">3</span>
          </button>

          {user ? (
            <div className="user-menu-tech">
              <button 
                className="user-btn-tech"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <span className="user-avatar-tech">{user.avatar}</span>
                <span className="user-name-tech">{user.name.split(' ')[0]}</span>
                <span className="user-arrow-tech">▼</span>
              </button>
              
              {showUserMenu && (
                <div className="user-dropdown-tech">
                  {/* User Info */}
                  <div className="user-info-tech">
                    <span className="user-avatar-dropdown-tech">{user.avatar}</span>
                    <div className="user-details-tech">
                      <span className="user-fullname-tech">{user.name}</span>
                      <span className="user-role-tech">
                        {user.role === 'admin' ? 'Administrador' : 'Cliente'}
                      </span>
                      <span className="user-email-tech">{user.email}</span>
                    </div>
                  </div>
                  
                  <div className="dropdown-divider-tech"></div>

                  {/* Menu Items */}
                  <a href="/profile" className="dropdown-item-tech">
                    <span className="dropdown-icon-tech">👤</span>
                    Meu Perfil
                  </a>
                  
                  {user.role === 'customer' && (
                    <a href="/my-orders" className="dropdown-item-tech">
                      <span className="dropdown-icon-tech">📦</span>
                      Meus Pedidos
                    </a>
                  )}
                  
                  {user.role === 'customer' && (
                    <a href="/tradein-history" className="dropdown-item-tech">
                      <span className="dropdown-icon-tech">🔄</span>
                      Meus Trade-Ins
                    </a>
                  )}
                  
                  {user.role === 'admin' && (
                    <a href="/admin" className="dropdown-item-tech">
                      <span className="dropdown-icon-tech">📊</span>
                      Painel Admin
                    </a>
                  )}
                  
                  <div className="dropdown-divider-tech"></div>

                  {/* Configurações */}
                  <button 
                    className="dropdown-item-tech"
                    disabled
                    style={{ opacity: 0.5, cursor: 'not-allowed' }}
                    title="Em breve - Aguardando backend"
                  >
                    <span className="dropdown-icon-tech">⚙️</span>
                    Configurações
                    <span className="coming-soon-badge-tech">🔜</span>
                  </button>

                  <button 
                    className="dropdown-item-tech"
                    disabled
                    style={{ opacity: 0.5, cursor: 'not-allowed' }}
                    title="Em breve - Aguardando backend"
                  >
                    <span className="dropdown-icon-tech">🔒</span>
                    Alterar Senha
                    <span className="coming-soon-badge-tech">🔜</span>
                  </button>

                  <div className="dropdown-divider-tech"></div>

                  {/* Logout */}
                  <button 
                    className="dropdown-item-tech logout-item-tech"
                    onClick={handleLogout}
                  >
                    <span className="dropdown-icon-tech">🚪</span>
                    Sair da Conta
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              className="login-btn-tech"
              onClick={onLoginClick}
            >
              <span className="login-icon-tech">👤</span>
              LOGIN
            </button>
          )}
        </div>
      </div>
      
      {/* Scan Line Effect */}
      <div className="scan-line-tech"></div>
    </header>
  );
};

export default Header;