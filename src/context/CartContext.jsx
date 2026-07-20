import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

const CART_KEY = 'fitstitch_cart';
const WISHLIST_KEY = 'fitstitch_wishlist';

function readStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage(CART_KEY));
  const [wishlist, setWishlist] = useState(() => readStorage(WISHLIST_KEY));
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  function showToast(message) {
    setToast(message);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(null), 2600);
  }

  function addToCart(product, size, quantity = 1) {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.id === product.id && i.size === size
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + quantity,
        };
        return next;
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          discount: product.discount || 0,
          image: product.images?.[0],
          size,
          quantity,
        },
      ];
    });
    showToast(`Added "${product.title}" (${size}) to cart`);
  }

  function updateQuantity(id, size, delta) {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id && i.size === size
            ? { ...i, quantity: Math.max(1, i.quantity + delta) }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  }

  function removeFromCart(id, size) {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
    showToast('Removed from cart');
  }

  function toggleWishlist(product) {
    setWishlist((prev) => {
      const exists = prev.includes(product.id);
      showToast(exists ? 'Removed from wishlist' : 'Added to wishlist');
      return exists ? prev.filter((id) => id !== product.id) : [...prev, product.id];
    });
  }

  const subtotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const unit = item.price - (item.price * item.discount) / 100;
        return sum + unit * item.quantity;
      }, 0),
    [cart]
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const value = {
    cart,
    wishlist,
    subtotal,
    cartCount,
    toast,
    addToCart,
    updateQuantity,
    removeFromCart,
    toggleWishlist,
    showToast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
