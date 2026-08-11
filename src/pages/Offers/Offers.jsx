import { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { ProductGridSkeleton } from '../../components/Skeleton/Skeleton';
import { apiGetDeals } from '../../services/productsApi';
import { coupons } from '../../data/coupons';
import { FaCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Offers.css';

function useCountdown(hours = 8) {
  const [target] = useState(() => Date.now() + hours * 3600 * 1000);
  const [left, setLeft] = useState(target - Date.now());

  useEffect(() => {
    const t = setInterval(() => setLeft(Math.max(0, target - Date.now())), 1000);
    return () => clearInterval(t);
  }, [target]);

  const h = Math.floor(left / 3600000);
  const m = Math.floor((left % 3600000) / 60000);
  const s = Math.floor((left % 60000) / 1000);
  return { h, m, s };
}

export default function Offers() {
  const [loading, setLoading] = useState(true);
  const [deals, setDeals] = useState([]);
  const { h, m, s } = useCountdown();

  useEffect(() => {
    apiGetDeals(16).then((d) => {
      setDeals(d);
      setLoading(false);
    });
  }, []);

  const copyCode = (code) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    toast.success(`Coupon "${code}" copied!`);
  };

  return (
    <div className="container nc-offers">
      <Breadcrumb items={[{ label: 'Offers' }]} />

      <div className="nc-offers__hero neo-raised">
        <div>
          <span className="nc-offers__eyebrow">Flash Sale</span>
          <h1>Up to 60% off — today only</h1>
          <p>Grab your favorites before the clock runs out.</p>
        </div>
        <div className="nc-offers__timer">
          <div><strong>{String(h).padStart(2, '0')}</strong><span>Hrs</span></div>
          <div><strong>{String(m).padStart(2, '0')}</strong><span>Min</span></div>
          <div><strong>{String(s).padStart(2, '0')}</strong><span>Sec</span></div>
        </div>
      </div>

      <div className="nc-offers__coupons">
        {coupons.map((c) => (
          <div key={c.code} className="nc-offers__coupon neo-raised">
            <div className="nc-offers__coupon-left">
              <span className="nc-offers__coupon-code">{c.code}</span>
              <p>{c.description}</p>
              <span className="nc-offers__coupon-min">Min order ₹{c.minOrder.toLocaleString('en-IN')}</span>
            </div>
            <button onClick={() => copyCode(c.code)}><FaCopy /> Copy</button>
          </div>
        ))}
      </div>

      {loading ? <ProductGridSkeleton count={12} /> : (
        <div className="nc-products__grid" style={{ marginTop: 40 }}>
          {deals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
