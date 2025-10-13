import React, { createContext, useState, useContext } from 'react';

// Cria o Context
const ProductContext = createContext();

// Hook personalizado para usar o Context
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

// Provider component
export const ProductProvider = ({ children }) => {
  const [products] = useState([
    {
      id: 1,
      name: "RTX 4090 24GB GDDR6X Founders Edition",
      brand: "NVIDIA",
      category: "gpu",
      price: 12999.00,
      originalPrice: 12999.00,
      stock: 5,
      images: ["🎮", "⚡", "🔥", "💎"],
      specs: [
        "24GB GDDR6X Memory",
        "DLSS 3 Technology", 
        "Ray Tracing Cores",
        "4K Gaming Ready",
        "Ada Lovelace Architecture",
        "3rd Gen RT Cores",
        "4th Gen Tensor Cores"
      ],
      features: [
        "Ray Tracing",
        "DLSS 3", 
        "AV1 Encoding",
        "NVIDIA Reflex",
        "NVIDIA Broadcast"
      ],
      description: "A GeForce RTX 4090 é a GPU definitiva para gamers e creators.",
      fullDescription: `A NVIDIA GeForce RTX® 4090 é a GPU ultimate para gamers e creators. Performance extrema em 4K com ray tracing.`,
      isPromo: false,
      rating: 4.9,
      reviews: 47,
      isNew: true,
      sku: "GPU-NV-4090-FE",
      warranty: "36 meses",
      weight: "2.5 kg",
      dimensions: "304 x 137 x 61 mm",
      powerRequirement: "850W",
      ports: ["3x DisplayPort 1.4a", "1x HDMI 2.1"],
      relatedProducts: [2, 3]
    },
    {
      id: 2,
      name: "RTX 4080 16GB SUPER",
      brand: "NVIDIA", 
      category: "gpu",
      price: 8499.00,
      originalPrice: 9499.00,
      stock: 12,
      images: ["⚡", "🎮", "💎", "🚀"],
      specs: ["16GB GDDR6X", "DLSS 3", "Ray Tracing", "1440p Ultra"],
      features: ["Ray Tracing", "DLSS 3", "AV1 Encoding"],
      description: "Performance de elite para gaming em 1440p e 4K com DLSS 3.",
      fullDescription: "A RTX 4080 SUPER oferece performance excepcional para gaming.",
      isPromo: true,
      rating: 4.7,
      reviews: 32,
      isNew: false,
      sku: "GPU-NV-4080S",
      warranty: "36 meses",
      powerRequirement: "750W",
      dimensions: "304 x 137 x 61 mm",
      weight: "2.3 kg",
      ports: ["3x DisplayPort 1.4a", "1x HDMI 2.1"],
      relatedProducts: [1, 3]
    },
    {
      id: 3,
      name: "RX 7900 XTX 24GB",
      brand: "AMD",
      category: "gpu",
      price: 6999.00,
      originalPrice: 7999.00,
      stock: 8,
      images: ["🔥", "⚡", "🎮", "💎"],
      specs: ["24GB GDDR6", "FSR 3", "Ray Accelerator", "4K Ready"],
      features: ["Ray Tracing", "FSR 3", "AV1 Encoding"],
      description: "Placa AMD de alta performance com arquitetura RDNA 3.",
      fullDescription: "A RX 7900 XTX é a flagship da AMD com arquitetura RDNA 3.",
      isPromo: true,
      rating: 4.6,
      reviews: 28,
      isNew: true,
      sku: "GPU-AMD-7900",
      warranty: "36 meses",
      powerRequirement: "800W",
      dimensions: "287 x 135 x 72 mm",
      weight: "2.1 kg", 
      ports: ["2x DisplayPort 2.1", "1x HDMI 2.1", "1x USB-C"],
      relatedProducts: [1, 2]
    }
  ]);

  const [cart, setCart] = useState([]);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      productId: 1,
      user: "Carlos Silva",
      rating: 5,
      date: "2024-01-15",
      comment: "Placa monstro! Consegui jogar tudo no ultra em 4K sem problemas.",
      verified: true
    },
    {
      id: 2, 
      productId: 1,
      user: "Ana Rodrigues",
      rating: 5,
      date: "2024-01-10",
      comment: "Perfeita para edição de vídeo. Renderiza 4x mais rápido.",
      verified: true
    }
  ]);

  const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
  };

  const getRelatedProducts = (product) => {
    if (!product.relatedProducts) return [];
    return products.filter(p => product.relatedProducts.includes(p.id));
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const addReview = (productId, review) => {
    const newReview = {
      id: Date.now(),
      productId: parseInt(productId),
      ...review,
      date: new Date().toISOString().split('T')[0],
      verified: false
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const getProductReviews = (productId) => {
    return reviews.filter(review => review.productId === parseInt(productId));
  };

  const value = {
    products,
    cart,
    reviews,
    getProductById,
    getRelatedProducts,
    addToCart,
    addReview,
    getProductReviews
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};