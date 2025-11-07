// context/CartContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { 
                  ...item, 
                  quantity: item.quantity + (action.payload.quantity || 1) 
                }
              : item
          )
        };
      }
      
      return {
        ...state,
        items: [...state.items, { 
          ...action.payload, 
          quantity: action.payload.quantity || 1 
        }]
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    case 'APPLY_COUPON':
      return {
        ...state,
        coupon: action.payload
      };

    case 'REMOVE_COUPON':
      return {
        ...state,
        coupon: null
      };

    case 'SET_SHIPPING':
      return {
        ...state,
        shipping: action.payload
      };

    default:
      return state;
  }
};

const initialState = {
  items: [],
  coupon: null,
  shipping: null
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    const savedCart = localStorage.getItem('upgradestore_cart');
    return savedCart ? JSON.parse(savedCart) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('upgradestore_cart', JSON.stringify(state));
  }, [state]);

  const addToCart = (product, quantity = 1) => {
    console.log('Adding to cart:', product, quantity); // Debug
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity }
    });
  };

  const removeFromCart = (productId) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: productId
    });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: productId, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const applyCoupon = (coupon) => {
    dispatch({
      type: 'APPLY_COUPON',
      payload: coupon
    });
  };

  const removeCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' });
  };

  const setShipping = (shipping) => {
    dispatch({
      type: 'SET_SHIPPING',
      payload: shipping
    });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartDiscount = () => {
    if (!state.coupon) return 0;
    
    const subtotal = getCartTotal();
    if (state.coupon.type === 'percentage') {
      return subtotal * (state.coupon.value / 100);
    }
    return state.coupon.value;
  };

  const getShippingCost = () => {
    return state.shipping ? state.shipping.price : 0;
  };

  const getFinalTotal = () => {
    const subtotal = getCartTotal();
    const discount = getCartDiscount();
    const shipping = getShippingCost();
    return Math.max(0, subtotal - discount + shipping);
  };

  const getItemsCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    setShipping,
    getCartTotal,
    getCartDiscount,
    getShippingCost,
    getFinalTotal,
    getItemsCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};