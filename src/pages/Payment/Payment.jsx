import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCreditCard, FaMobileAlt, FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { useCart } from '../../context/CartContext';
import { useAddresses } from '../../context/AddressContext';
import { useOrders } from '../../context/OrdersContext';
import './Payment.css';

const COD_FEE = 19;
const GST_RATE = 0.18;

const methods = [
  { id: 'card', label: 'Credit / Debit Card', icon: <FaCreditCard /> },
  { id: 'upi', label: 'UPI', icon: <FaMobileAlt /> },
  { id: 'cod', label: 'Cash on Delivery', icon: <FaMoneyBillWave /> },
];

export default function Payment() {
  const { items, subtotal, clearCart } = useCart();
  const { selectedAddress } = useAddresses();
  const { placeOrder } = useOrders();
  const [method, setMethod] = useState('card');
  const [placedOrder, setPlacedOrder] = useState(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { discount = 0, couponCode = null, deliveryFee = 0 } = location.state || {};

  const codFee = method === 'cod' ? COD_FEE : 0;
  const taxable = Math.max(0, subtotal - discount);
  const gst = taxable * GST_RATE;
  const total = taxable + gst + deliveryFee + codFee;

  const handlePay = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      const order = placeOrder({
        items,
        address: selectedAddress,
        paymentMethod: method,
        subtotal,
        discount,
        delivery: deliveryFee,
        codFee,
        gst,
        total,
        couponCode,
      });
      setProcessing(false);
      setPlacedOrder(order);
      clearCart();
    }, 1200);
  };

  if (placedOrder) {
    return (
      <div className="container nc-payment__success">
        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', bounce: 0.5 }}>
          <FaCheckCircle className="nc-payment__successicon" />
        </motion.div>
        <h1>Order placed successfully!</h1>
        <p>Order <strong>{placedOrder.id}</strong> has been confirmed. A confirmation has been sent to your registered contact.</p>
        <div className="nc-payment__successactions">
          <button className="fk-btn fk-btn--accent" onClick={() => navigate(`/account/orders/${placedOrder.id}`)}>Track Order</button>
          <button className="fk-btn fk-btn--outline" onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container nc-payment">
      <Breadcrumb items={[{ to: '/cart', label: 'Cart' }, { to: '/checkout', label: 'Checkout' }, { label: 'Payment' }]} />
      <div className="nc-page-header"><h1>Payment</h1><p>Choose how you'd like to pay</p></div>

      <form className="nc-payment__grid" onSubmit={handlePay}>
        <div className="nc-payment__methods">
          {methods.map((m) => (
            <label key={m.id} className={`nc-payment__method neo-raised ${method === m.id ? 'is-active' : ''}`}>
              <input type="radio" name="method" checked={method === m.id} onChange={() => setMethod(m.id)} />
              <span className="nc-payment__method-icon">{m.icon}</span>
              <span>{m.label}</span>
              {m.id === 'cod' && <span className="nc-payment__codfee">+₹{COD_FEE} handling fee</span>}
            </label>
          ))}

          <AnimatePresence mode="wait">
            {method === 'card' && (
              <motion.div key="card" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="nc-payment__cardform neo-raised">
                <input placeholder="Card Number" required />
                <div className="nc-payment__row">
                  <input placeholder="MM/YY" required />
                  <input placeholder="CVV" required />
                </div>
                <input placeholder="Name on Card" required />
              </motion.div>
            )}
            {method === 'upi' && (
              <motion.div key="upi" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="nc-payment__cardform neo-raised">
                <input placeholder="yourname@upi" required />
              </motion.div>
            )}
            {method === 'cod' && (
              <motion.div key="cod" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="nc-payment__codnote neo-raised">
                A convenience fee of ₹{COD_FEE} is applicable on Cash on Delivery orders.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <aside className="nc-checkout__summary neo-raised">
          <h3>Amount Payable</h3>
          <div className="nc-cart__row"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
          {discount > 0 && <div className="nc-cart__row is-discount"><span>Coupon Discount</span><span>-₹{discount.toLocaleString('en-IN')}</span></div>}
          <div className="nc-cart__row"><span>Delivery</span><span>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span></div>
          {codFee > 0 && <div className="nc-cart__row"><span>COD Handling Fee</span><span>₹{codFee}</span></div>}
          <div className="nc-cart__row"><span>GST (18%)</span><span>₹{gst.toFixed(0)}</span></div>
          <div className="nc-cart__row nc-cart__row--total"><span>Total</span><span>₹{total.toFixed(0)}</span></div>
          <button type="submit" className="fk-btn fk-btn--accent fk-btn--full" disabled={processing}>
            {processing ? 'Processing…' : method === 'cod' ? 'Place Order' : 'Pay Now'}
          </button>
        </aside>
      </form>
    </div>
  );
}
