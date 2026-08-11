import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaTruck, FaBolt, FaPlus } from 'react-icons/fa';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { useCart } from '../../context/CartContext';
import { useAddresses } from '../../context/AddressContext';
import { FREE_DELIVERY_THRESHOLD, DELIVERY_FEE } from '../Cart/Cart';
import './Checkout.css';

export default function Checkout() {
  const { items, subtotal } = useCart();
  const { addresses, addAddress, selectedId, setSelectedId, selectedAddress } = useAddresses();
  const [delivery, setDelivery] = useState('standard');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ label: 'Home', name: '', phone: '', line1: '', city: '', state: '', pincode: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const { discount = 0, couponCode = null } = location.state || {};

  if (items.length === 0) {
    return (
      <div className="container nc-empty-state">
        <div className="nc-empty-state__icon"><FaTruck /></div>
        <h3>Nothing to checkout</h3>
        <p>Your cart is empty. Add products before proceeding to checkout.</p>
        <Link to="/products" className="fk-btn fk-btn--accent">Shop Now</Link>
      </div>
    );
  }

  const taxable = Math.max(0, subtotal - discount);
  const deliveryFee = delivery === 'express' ? 149 : subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = taxable + deliveryFee;

  const submitAddress = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.line1 || !form.city || !form.state || !form.pincode) return;
    addAddress(form);
    setForm({ label: 'Home', name: '', phone: '', line1: '', city: '', state: '', pincode: '' });
    setShowForm(false);
  };

  const goToPayment = () => {
    navigate('/payment', { state: { discount, couponCode, delivery, deliveryFee } });
  };

  return (
    <div className="container nc-checkout">
      <Breadcrumb items={[{ to: '/cart', label: 'Cart' }, { label: 'Checkout' }]} />
      <div className="nc-page-header"><h1>Checkout</h1><p>Confirm your address and delivery preferences</p></div>

      <div className="nc-checkout__grid">
        <div className="nc-checkout__main">
          <section className="nc-checkout__section neo-raised">
            <h3><FaMapMarkerAlt /> Delivery Address</h3>
            {addresses.map((a) => (
              <label key={a.id} className={`nc-checkout__addr ${selectedId === a.id ? 'is-active' : ''}`}>
                <input type="radio" name="addr" checked={selectedId === a.id} onChange={() => setSelectedId(a.id)} />
                <div>
                  <strong>{a.label} — {a.name} {a.isDefault && <span className="nc-checkout__default">Default</span>}</strong>
                  <p>{a.line1}, {a.city}, {a.state} {a.pincode}</p>
                  <p className="nc-checkout__phone">{a.phone}</p>
                </div>
              </label>
            ))}

            {!showForm ? (
              <button type="button" className="nc-checkout__addlink" onClick={() => setShowForm(true)}>
                <FaPlus size={11} /> Add a new address
              </button>
            ) : (
              <form className="nc-checkout__addrform" onSubmit={submitAddress}>
                <div className="nc-checkout__addrform-row">
                  <input placeholder="Label (Home / Office)" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
                  <input placeholder="Full Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="nc-checkout__addrform-row">
                  <input placeholder="Phone Number" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  <input placeholder="Pincode" required value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} />
                </div>
                <input placeholder="Address Line" required value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} />
                <div className="nc-checkout__addrform-row">
                  <input placeholder="City" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                  <input placeholder="State" required value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
                </div>
                <div className="nc-checkout__addrform-actions">
                  <button type="submit" className="fk-btn fk-btn--primary">Save Address</button>
                  <button type="button" className="fk-btn fk-btn--outline" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </form>
            )}
          </section>

          <section className="nc-checkout__section neo-raised">
            <h3><FaTruck /> Delivery Options</h3>
            <label className={`nc-checkout__addr ${delivery === 'standard' ? 'is-active' : ''}`}>
              <input type="radio" name="delivery" checked={delivery === 'standard'} onChange={() => setDelivery('standard')} />
              <div><strong>Standard Delivery</strong><p>3-5 business days · {subtotal >= FREE_DELIVERY_THRESHOLD ? 'Free' : `₹${DELIVERY_FEE}`}</p></div>
            </label>
            <label className={`nc-checkout__addr ${delivery === 'express' ? 'is-active' : ''}`}>
              <input type="radio" name="delivery" checked={delivery === 'express'} onChange={() => setDelivery('express')} />
              <div><strong><FaBolt style={{ verticalAlign: '-2px' }} /> Express Delivery</strong><p>1-2 business days · ₹149</p></div>
            </label>
          </section>
        </div>

        <aside className="nc-checkout__summary neo-raised">
          <h3>Order Summary</h3>
          {items.map((i) => (
            <div key={i.key} className="nc-checkout__line">
              <span>{i.name} × {i.qty}</span>
              <span>₹{(i.price * i.qty).toLocaleString('en-IN')}</span>
            </div>
          ))}
          <div className="nc-cart__row"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
          {discount > 0 && <div className="nc-cart__row is-discount"><span>Coupon ({couponCode})</span><span>-₹{discount.toLocaleString('en-IN')}</span></div>}
          <div className="nc-cart__row"><span>Delivery</span><span>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span></div>
          <div className="nc-cart__row nc-cart__row--total"><span>Payable at Payment</span><span>₹{total.toFixed(0)}</span></div>
          <button className="fk-btn fk-btn--accent fk-btn--full" onClick={goToPayment} disabled={!selectedAddress}>
            Continue to Payment
          </button>
        </aside>
      </div>
    </div>
  );
}
