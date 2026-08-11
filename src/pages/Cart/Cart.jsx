import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaMinus, FaPlus, FaShoppingBag, FaTicketAlt, FaTruck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { useCart } from '../../context/CartContext';
import { validateCoupon } from '../../data/coupons';
import './Cart.css';

export const FREE_DELIVERY_THRESHOLD = 2000;
export const DELIVERY_FEE = 79;
const GST_RATE = 0.18;

export default function Cart() {
  const { items, removeFromCart, updateQty, subtotal } = useCart();
  const [coupon, setCoupon] = useState('');
  const [applied, setApplied] = useState(null);
  const navigate = useNavigate();

  const applyCoupon = (e) => {
    e.preventDefault();
    const result = validateCoupon(coupon, subtotal);
    if (result.valid) {
      setApplied({ code: result.coupon.code, discount: result.discount });
      toast.success(`Coupon applied — you saved ₹${result.discount}!`);
    } else {
      toast.error(result.message);
    }
  };

  const removeCoupon = () => {
    setApplied(null);
    setCoupon('');
  };

  const discount = applied?.discount ?? 0;
  const taxableAmount = Math.max(0, subtotal - discount);
  const gst = taxableAmount * GST_RATE;
  const delivery = items.length === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = taxableAmount + gst + delivery;

  if (items.length === 0) {
    return (
      <div className="container nc-empty-state">
        <div className="nc-empty-state__icon"><FaShoppingBag /></div>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything yet. Let's fix that.</p>
        <Link to="/products" className="fk-btn fk-btn--accent">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container nc-cart">
      <Breadcrumb items={[{ label: 'Cart' }]} />
      <div className="nc-page-header"><h1>Your Cart</h1><p>{items.length} item{items.length > 1 ? 's' : ''} in your cart</p></div>

      {subtotal < FREE_DELIVERY_THRESHOLD && (
        <div className="nc-cart__delivery-hint">
          <FaTruck /> Add items worth <strong>₹{(FREE_DELIVERY_THRESHOLD - subtotal).toLocaleString('en-IN')}</strong> more to get FREE delivery
        </div>
      )}

      <div className="nc-cart__grid">
        <div className="nc-cart__items">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.key}
                className="nc-cart__item neo-raised"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, x: -40, height: 0, marginBottom: 0, padding: 0 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <img src={item.image} alt={item.name} />
                <div className="nc-cart__item-info">
                  <h4>{item.name}</h4>
                  {item.color && <span className="nc-cart__swatch" style={{ background: item.color }} />}
                  <p>₹{item.price.toLocaleString('en-IN')}</p>
                </div>
                <div className="nc-cart__qtybox">
                  <button onClick={() => updateQty(item.key, item.qty - 1)}><FaMinus /></button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.key, item.qty + 1)}><FaPlus /></button>
                </div>
                <div className="nc-cart__item-total">₹{(item.price * item.qty).toLocaleString('en-IN')}</div>
                <button className="nc-cart__remove" onClick={() => removeFromCart(item.key)} aria-label="Remove item">
                  <FaTrash />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="nc-cart__summary neo-raised">
          <h3>Order Summary</h3>

          {applied ? (
            <div className="nc-cart__coupon-applied">
              <span><FaTicketAlt /> {applied.code} applied</span>
              <button onClick={removeCoupon}>Remove</button>
            </div>
          ) : (
            <form className="nc-cart__coupon" onSubmit={applyCoupon}>
              <FaTicketAlt />
              <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code (e.g. NOVA10)" />
              <button type="submit">Apply</button>
            </form>
          )}

          <div className="nc-cart__row"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
          {applied && <div className="nc-cart__row is-discount"><span>Coupon Discount ({applied.code})</span><span>-₹{discount.toLocaleString('en-IN')}</span></div>}
          <div className="nc-cart__row">
            <span>Delivery Charges</span>
            <span>{delivery === 0 ? <span className="is-discount">FREE</span> : `₹${delivery}`}</span>
          </div>
          <div className="nc-cart__row"><span>GST (18%)</span><span>₹{gst.toFixed(0)}</span></div>
          <div className="nc-cart__row nc-cart__row--total"><span>Total Payable</span><span>₹{total.toFixed(0)}</span></div>

          <button className="fk-btn fk-btn--accent fk-btn--full" onClick={() => navigate('/checkout', { state: { discount, couponCode: applied?.code } })}>
            Proceed to Checkout
          </button>
          <Link to="/products" className="nc-cart__continue">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
