import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { toast } from 'react-toastify';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage('novacart_cart', []);

  const addToCart = (product, qty = 1, color) => {
    setItems((prev) => {
      const key = `${product.id}-${color ?? product.colors?.[0]}`;
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { key, id: product.id, name: product.name, price: product.price, image: product.image, color: color ?? product.colors?.[0], qty }];
    });
    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (key) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  };

  const updateQty = (key, qty) => {
    if (qty < 1) return;
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, qty } : i)));
  };

  const clearCart = () => setItems([]);

  const { subtotal, count } = useMemo(() => {
    return items.reduce(
      (acc, i) => ({ subtotal: acc.subtotal + i.price * i.qty, count: acc.count + i.qty }),
      { subtotal: 0, count: 0 }
    );
  }, [items]);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, subtotal, count }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
