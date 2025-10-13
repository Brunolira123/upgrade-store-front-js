import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Layout/Header';
import FeatureCarousel from './components/Home/FeatureCarousel';
import ProductGrid from './components/Products/ProductGrid';
import TradeInTabs from './components/TradeIn/TradeInTabs';
import Footer from './components/Layout/Footer';
import AdminDashboard from './pages/admin/Dashboard';
import { AuthProvider } from './auth/AuthContext';
import Login from './auth/Login';
import './App.css';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';
import { ProductProvider } from './context/ProductContext'; 

// Componente da Home
const HomePage = ({ onShowTradeIn, onShowLogin }) => {
   const navigate = useNavigate();

   const handleProductsClick = () => {
    navigate('/products'); // NAVEGAÇÃO PARA PRODUTOS
  };
  return (
    <>
            {/* Hero Section Tech */}
      <section className="hero-tech">
        <div className="tech-container">
          <div className="hero-content-tech">
            {/* Partículas de fundo */}
            <div className="particles">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="particle" style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`
                }}></div>
              ))}
            </div>
            
            <div className="hero-text-tech">
              <h1 className="hero-title-tech">
                <span className="tech-gradient">UPGRADE</span> YOUR 
                <span className="tech-accent"> SETUP</span>
              </h1>
              <p className="hero-subtitle-tech">
                As placas de vídeo mais potentes do mercado. 
                <span className="neon-text"> Performance extrema para gamers e creators.</span>
              </p>
              <div className="hero-buttons-tech">
                <button 
                  className="btn-primary-tech" 
                  onClick={handleProductsClick} // ADICIONE ESTE ONCLICK
                >
                  <span className="btn-icon">🎮</span>
                  NOSSOS PRODUTOS
                </button>
                <button 
                  className="btn-secondary-tech"
                  onClick={onShowTradeIn}
                >
                  <span className="btn-icon">🔄</span>
                  TRADE-IN TECH
                </button>
              </div>
            </div>

            {/* Hero Image Tech */}
            <div className="hero-image-tech">
              <div className="gpu-model">
                <div className="gpu-chip"></div>
                <div className="gpu-fans">
                  <div className="fan"></div>
                  <div className="fan"></div>
                  <div className="fan"></div>
                </div>
                <div className="gpu-lights">
                  <div className="light red"></div>
                  <div className="light green"></div>
                  <div className="light blue"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Tech */}
      <FeatureCarousel />

      {/* Products Section Tech */}
      <ProductGrid />
    </>
  );
};

// Componente principal
const AppContent = () => {
  const [showTradeIn, setShowTradeIn] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);

  return (
    <div className="tech-theme">
      <Header onLoginClick={() => setShowLogin(true)} />
      
      <Routes>
        <Route path="/" element={
          <>
            <HomePage 
              onShowTradeIn={() => setShowTradeIn(true)}
              onShowLogin={() => setShowLogin(true)}
            />
            <Footer />
          </>
        } />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetail />} /> {/* ADICIONE ESTA ROTA */}
        <Route path="/trade-in" element={<div>Página de Trade-In em desenvolvimento...</div>} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      {/* Trade-In Modal */}
      {showTradeIn && (
        <div className="modal-overlay-tech">
          <div className="modal-content-tech">
            <button 
              className="close-btn-tech"
              onClick={() => setShowTradeIn(false)}
            >
              <span>×</span>
            </button>
            <TradeInTabs />
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <Login 
          onClose={() => setShowLogin(false)}
          onSuccess={() => setShowLogin(false)}
        />
      )}
    </div>
  );
};

// App principal
function App() {
  return (
    <Router>
   <AuthProvider>
  <ProductProvider>
    <AppContent />
  </ProductProvider>
</AuthProvider>
    </Router>
  );
}

export default App;