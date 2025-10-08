import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import './Login.css';

const Login = ({ onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);
    
    if (result.success) {
      onSuccess?.();
      onClose?.();
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleDemoLogin = (role) => {
    if (role === 'customer') {
      setEmail('cliente@email.com');
      setPassword('123456');
    } else {
      setEmail('admin@upgradestore.com');
      setPassword('admin123');
    }
  };

  return (
    <div className="login-modal-tech">
      <div className="login-container-tech">
        <button className="login-close-btn-tech" onClick={onClose}>
          <span>×</span>
        </button>

        <div className="login-header-tech">
          <div className="login-logo-tech">
            <div className="login-logo-glow-tech"></div>
            <span className="login-logo-text-tech">UPGRADE</span>
            <span className="login-logo-subtext-tech">STORE</span>
          </div>
          <h2 className="login-title-tech">ACESSO DO CLIENTE</h2>
          <p className="login-subtitle-tech">Entre na sua conta para gerenciar pedidos e trade-ins</p>
        </div>

        <form className="login-form-tech" onSubmit={handleSubmit}>
          {error && (
            <div className="login-error-tech">
              <span className="error-icon-tech">⚠️</span>
              {error}
            </div>
          )}

          <div className="input-group-tech">
            <label className="input-label-tech">E-MAIL</label>
            <input
              type="email"
              className="login-input-tech"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="input-group-tech">
            <label className="input-label-tech">SENHA</label>
            <input
              type="password"
              className="login-input-tech"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            className="login-btn-tech"
            disabled={loading}
          >
            {loading ? (
              <div className="login-spinner-tech"></div>
            ) : (
              <>
                <span className="btn-icon-tech">🔐</span>
                ACESSAR CONTA
              </>
            )}
          </button>

          <div className="login-divider-tech">
            <span>OU</span>
          </div>

          <div className="demo-buttons-tech">
            <p className="demo-text-tech">Acesso rápido para teste:</p>
            <div className="demo-buttons-group-tech">
              <button 
                type="button"
                className="demo-btn-tech customer-tech"
                onClick={() => handleDemoLogin('customer')}
              >
                <span className="demo-icon-tech">👤</span>
                Cliente Demo
              </button>
              <button 
                type="button"
                className="demo-btn-tech admin-tech"
                onClick={() => handleDemoLogin('admin')}
              >
                <span className="demo-icon-tech">👨‍💼</span>
                Admin Demo
              </button>
            </div>
          </div>

          <div className="login-links-tech">
            <a href="/forgot-password" className="login-link-tech">Esqueci minha senha</a>
            <a href="/register" className="login-link-tech">Criar conta</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;