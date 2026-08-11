import { Link } from 'react-router-dom';
import { FaBoxOpen } from 'react-icons/fa';
import { useOrders, ORDER_STAGES } from '../../context/OrdersContext';
import './Account.css';

export default function Orders() {
  const { orders, getOrderStage } = useOrders();

  if (orders.length === 0) {
    return (
      <div className="nc-acc-page">
        <h2>Orders</h2>
        <p className="nc-acc-page__sub">Track and manage your recent orders</p>
        <div className="nc-empty-state">
          <div className="nc-empty-state__icon"><FaBoxOpen /></div>
          <h3>No orders yet</h3>
          <p>Your order history will appear here once you make a purchase.</p>
          <Link to="/products" className="fk-btn fk-btn--accent">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="nc-acc-page">
      <h2>Orders</h2>
      <p className="nc-acc-page__sub">Track and manage your recent orders</p>

      <div className="nc-orders">
        {orders.map((o) => {
          const stage = getOrderStage(o);
          return (
            <div key={o.id} className="nc-orders__row neo-raised">
              <div>
                <strong>{o.id}</strong>
                <span>{new Date(o.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })} · {o.items.reduce((s, i) => s + i.qty, 0)} item{o.items.length > 1 ? 's' : ''}</span>
              </div>
              <span className="nc-orders__status" style={{ color: stage === 4 ? 'var(--color-success)' : 'var(--color-primary)' }}>
                {ORDER_STAGES[stage]}
              </span>
              <span className="nc-orders__total">₹{o.total.toFixed(0)}</span>
              <Link to={`/account/orders/${o.id}`}>Track Order</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
