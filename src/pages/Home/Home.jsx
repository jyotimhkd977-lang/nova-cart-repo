import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTruck, FaUndo, FaShieldAlt, FaHeadset } from 'react-icons/fa';
import Hero from '../../components/Hero/Hero';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import ProductCard from '../../components/ProductCard/ProductCard';
import Carousel from '../../components/Carousel/Carousel';
import Banner from '../../components/Banner/Banner';
import Modal from '../../components/Modal/Modal';
import Rating from '../../components/Rating/Rating';
import { ProductGridSkeleton } from '../../components/Skeleton/Skeleton';
import { categories } from '../../data/products';
import { apiGetFeatured, apiGetNewArrivals, apiGetDeals } from '../../services/productsApi';
import './Home.css';

const perks = [
  { icon: <FaTruck />, title: 'Free Shipping', text: 'On orders over ₹999' },
  { icon: <FaUndo />, title: 'Easy Returns', text: '7-day return window' },
  { icon: <FaShieldAlt />, title: 'Secure Payments', text: '100% protected checkout' },
  { icon: <FaHeadset />, title: '24/7 Support', text: 'Always here to help' },
];

const testimonials = [
  { name: 'Aarav Mehta', text: 'The checkout feels effortless and the product quality has been consistently great.', rating: 5 },
  { name: 'Sofia Ruiz', text: 'Love the design — it actually makes browsing enjoyable instead of a chore.', rating: 4.5 },
  { name: 'Kenji Watanabe', text: 'Fast delivery and the wishlist feature keeps my shopping organized.', rating: 5 },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [quickView, setQuickView] = useState(null);
  const [featured, setFeatured] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    Promise.all([apiGetFeatured(10), apiGetNewArrivals(10), apiGetDeals(10)]).then(
      ([f, n, d]) => {
        setFeatured(f);
        setNewArrivals(n);
        setDeals(d);
        setLoading(false);
      }
    );
  }, []);

  return (
    <>
      <Hero />

      <section className="container nc-perks">
        {perks.map((p) => (
          <div key={p.title} className="nc-perks__item neo-raised">
            <div className="nc-perks__icon">{p.icon}</div>
            <div>
              <h4>{p.title}</h4>
              <p>{p.text}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="container">
        <div className="nc-section-head">
          <h2>Featured Categories</h2>
          <p>Jump straight into what you're looking for</p>
        </div>
        <div className="nc-cat-grid">
          {categories.map((c) => <CategoryCard key={c.id} category={c} />)}
        </div>
      </section>

      <section className="container">
        <Banner
          eyebrow="Flash Sale"
          title="Today's Deals — up to 60% off"
          subtitle="Limited-time prices on top-rated electronics and fashion."
          cta="Grab the Deal"
          to="/offers"
          tone="primary"
          image="https://picsum.photos/seed/novacart-deal/320/320"
        />
      </section>

      <div className="container">
        {loading ? <ProductGridSkeleton count={4} /> : (
          <Carousel title="Popular Products" subtitle="Loved by NovaCart shoppers" viewAllTo="/products">
            {featured.map((p) => <ProductCard key={p.id} product={p} onQuickView={setQuickView} />)}
          </Carousel>
        )}
      </div>

      <div className="container">
        <Banner
          eyebrow="Just Dropped"
          title="New Arrivals Weekly"
          subtitle="Fresh styles and gadgets added every Friday."
          cta="Explore New In"
          to="/products"
          tone="accent"
          image="https://picsum.photos/seed/novacart-new/320/320"
        />
      </div>

      <div className="container">
        {loading ? <ProductGridSkeleton count={4} /> : (
          <Carousel title="New Arrivals" subtitle="Just landed in the store" viewAllTo="/products">
            {newArrivals.map((p) => <ProductCard key={p.id} product={p} onQuickView={setQuickView} />)}
          </Carousel>
        )}
      </div>

      <div className="container">
        {loading ? <ProductGridSkeleton count={4} /> : (
          <Carousel title="Today's Deals" subtitle="Best discounts right now" viewAllTo="/offers">
            {deals.map((p) => <ProductCard key={p.id} product={p} onQuickView={setQuickView} />)}
          </Carousel>
        )}
      </div>

      <section className="container nc-brands">
        <div className="nc-section-head">
          <h2>Trending Brands</h2>
        </div>
        <div className="nc-brands__row">
          {['Nova', 'Zenith', 'Orbit', 'Lumen', 'Drift', 'Solace', 'Vertex', 'Halcyon'].map((b) => (
            <div key={b} className="nc-brands__pill neo-raised">{b}</div>
          ))}
        </div>
      </section>

      <section className="container">
        <div className="nc-section-head">
          <h2>What Customers Say</h2>
        </div>
        <div className="nc-testimonials">
          {testimonials.map((t) => (
            <div key={t.name} className="nc-testimonial neo-raised">
              <Rating value={t.rating} />
              <p>"{t.text}"</p>
              <strong>{t.name}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="container">
        <div className="nc-newsletter neo-raised">
          <div>
            <h3>Join the NovaCart list</h3>
            <p>Weekly deals, new arrivals, and members-only offers — straight to your inbox.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="you@example.com" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>

      <Modal open={!!quickView} onClose={() => setQuickView(null)} title={quickView?.name}>
        {quickView && (
          <div className="nc-quickview">
            <img src={quickView.image} alt={quickView.name} />
            <div>
              <Rating value={quickView.rating} reviews={quickView.reviews} />
              <p className="nc-quickview__price">₹{quickView.price.toLocaleString('en-IN')}</p>
              <p className="nc-quickview__desc">{quickView.description}</p>
              <Link to={`/product/${quickView.id}`} className="fk-btn fk-btn--accent" onClick={() => setQuickView(null)}>
                View Full Details
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
