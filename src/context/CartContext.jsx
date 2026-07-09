import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { SHIPPING_CONFIG } from '../utils/constants';

const CartContext = createContext(null);

const CART_KEY = 'balaji_cart';

function loadCart() {
  try {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch { /* quota exceeded, ignore */ }
}

const cartReducer = (state, action) => {
  let newState;

  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity = 1, selectedSize } = action.payload;
      const existingIndex = state.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );

      if (existingIndex >= 0) {
        newState = state.map((item, i) =>
          i === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newState = [...state, { product, quantity, selectedSize }];
      }
      break;
    }

    case 'REMOVE_ITEM': {
      const { productId, selectedSize } = action.payload;
      newState = state.filter(
        (item) =>
          !(item.product.id === productId && item.selectedSize === selectedSize)
      );
      break;
    }

    case 'UPDATE_QUANTITY': {
      const { productId, selectedSize, quantity } = action.payload;
      if (quantity <= 0) {
        newState = state.filter(
          (item) =>
            !(item.product.id === productId && item.selectedSize === selectedSize)
        );
      } else {
        newState = state.map((item) =>
          item.product.id === productId && item.selectedSize === selectedSize
            ? { ...item, quantity: Math.min(99, quantity) }
            : item
        );
      }
      break;
    }

    case 'CLEAR_CART':
      newState = [];
      break;

    default:
      return state;
  }

  saveCart(newState);
  return newState;
};

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], loadCart);

  // Sync on mount (in case localStorage was updated in another tab)
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === CART_KEY) {
        const newItems = e.newValue ? JSON.parse(e.newValue) : [];
        dispatch({ type: 'CLEAR_CART' });
        newItems.forEach((item) =>
          dispatch({ type: 'ADD_ITEM', payload: item })
        );
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const addToCart = useCallback((product, quantity = 1, selectedSize = null) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity, selectedSize } });
  }, []);

  const removeFromCart = useCallback((productId, selectedSize = null) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, selectedSize } });
  }, []);

  const updateQuantity = useCallback((productId, selectedSize, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, selectedSize, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const getCartCount = useCallback(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const getSubtotal = useCallback(() => {
    return items.reduce((sum, item) => {
      const price = item.product.price || 0;
      return sum + price * item.quantity;
    }, 0);
  }, [items]);

  const getShipping = useCallback(() => {
    const subtotal = getSubtotal();
    if (subtotal === 0) return 0;
    if (subtotal >= SHIPPING_CONFIG.freeAbove) return 0;
    return SHIPPING_CONFIG.flatRate;
  }, [getSubtotal]);

  const getCartTotal = useCallback(() => {
    return getSubtotal() + getShipping();
  }, [getSubtotal, getShipping]);

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartCount,
    getSubtotal,
    getShipping,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;
