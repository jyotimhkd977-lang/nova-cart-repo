import { useParams, Link } from 'react-router-dom';
import { FaCheckCircle, FaBoxOpen, FaTruck, FaHome, FaBoxes } from 'react-icons/fa';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { useOrders, ORDER_STAGES } from '../../context/OrdersContext';
import './Account.css';
import './OrderTracking.css';

const stageIcons = [FaCheckCircle, FaBoxes, FaTruck, FaTruck, FaHome];

export default function OrderTracking() {
  const { id } = useParams();
  const { orders, getOrderStage } = useOrders();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="nc-acc-page">
        <div className="nc-empty-state">
          <div className="nc-empty-state__icon"><FaBoxOpen /></div>
          <h3>Order not found</h3>
          <p>We couldn't find that order in your history.</p>
          <Link to="/account/orders" className="fk-btn fk-btn--accent">Back to Orders</Link>
        </div>
      </div>
    );
  }

  const stage = getOrderStage(order);
  const itemsTotal = order.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="nc-acc-page">
      <Breadcrumb items={[{ to: '/account/orders', label: 'Orders' }, { label: order.id }]} />
      <h2>Track Order {order.id}</h2>
      <p className="nc-acc-page__sub">Placed on {new Date(order.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</p>

      <div className="nc-track__timeline">
        {ORDER_STAGES.map((label, i) => {
          const Icon = stageIcons[i];
          const done = i <= stage;
          return (
            <div key={label} className={`nc-track__step ${done ? 'is-done' : ''}`}>
              <div className="nc-track__dot"><Icon /></div>
              <span>{label}</span>
              {i < ORDER_STAGES.length - 1 && <div className={`nc-track__line ${i < stage ? 'is-done' : ''}`} />}
            </div>
          );
        })}
      </div>

      <div className="nc-track__grid">
        <div className="nc-track__items neo-raised">
          <h4>Items ({itemsTotal})</h4>
          {order.items.map((i) => (
            <div key={i.key} className="nc-track__item">
              <img src={i.image} alt={i.name} />
              <div>
                <strong>{i.name}</strong>
                <span>Qty {i.qty} · ₹{i.price.toLocaleString('en-IN')}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="nc-track__side">
          <div className="nc-track__card neo-raised">
            <h4>Delivery Address</h4>
            {order.address ? (
              <>
                <strong>{order.address.name}</strong>
                <p>{order.address.line1}, {order.address.city}, {order.address.state} {order.address.pincode}</p>
                <p>{order.address.phone}</p>
              </>
            ) : <p>No address on file</p>}
          </div>

          <div className="nc-track__card neo-raised">
            <h4>Payment Summary</h4>
            <div className="nc-cart__row"><span>Subtotal</span><span>₹{order.subtotal.toLocaleString('en-IN')}</span></div>
            {order.discount > 0 && <div className="nc-cart__row is-discount"><span>Coupon {order.couponCode ? `(${order.couponCode})` : ''}</span><span>-₹{order.discount.toLocaleString('en-IN')}</span></div>}
            <div className="nc-cart__row"><span>Delivery</span><span>{order.delivery === 0 ? 'Free' : `₹${order.delivery}`}</span></div>
            {order.codFee > 0 && <div className="nc-cart__row"><span>COD Fee</span><span>₹{order.codFee}</span></div>}
            <div className="nc-cart__row"><span>GST</span><span>₹{order.gst.toFixed(0)}</span></div>
            <div className="nc-cart__row nc-cart__row--total"><span>Total</span><span>₹{order.total.toFixed(0)}</span></div>
            <p className="nc-track__method">Paid via {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod.toUpperCase()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
