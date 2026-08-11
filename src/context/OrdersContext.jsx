import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const OrdersContext = createContext(null);

export const ORDER_STAGES = ['Order Placed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];

// Deterministically pick a "current stage" based on how long ago the order
// was placed, so tracking feels alive without a real backend.
function computeStage(createdAt) {
  const hoursSince = (Date.now() - createdAt) / 3600000;
  if (hoursSince < 1) return 0;
  if (hoursSince < 6) return 1;
  if (hoursSince < 24) return 2;
  if (hoursSince < 48) return 3;
  return 4;
}

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useLocalStorage('novacart_orders', []);

  const placeOrder = ({ items, address, paymentMethod, subtotal, discount, delivery, codFee, gst, total, couponCode }) => {
    const order = {
      id: `NC-${Math.floor(10000 + Math.random() * 89999)}`,
      createdAt: Date.now(),
      items,
      address,
      paymentMethod,
      subtotal,
      discount,
      delivery,
      codFee,
      gst,
      total,
      couponCode,
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  };

  const getOrderStage = (order) => computeStage(order.createdAt);

  return (
    <OrdersContext.Provider value={{ orders, placeOrder, getOrderStage }}>
      {children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => useContext(OrdersContext);
