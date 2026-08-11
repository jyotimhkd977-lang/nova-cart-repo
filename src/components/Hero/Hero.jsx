import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Hero.css';

const slides = [
  { tag: 'Big Billion Days', title: 'Electronics Sale', sub: 'Up to 70% off on top brands', cta: 'Shop Electronics', to: '/products/electronics', bg: 'linear-gradient(120deg,#1c2b52,#2874F0)', img: 'https://picsum.photos/seed/novacart-slide-1/460/320' },
  { tag: 'Fashion Fest', title: 'Style Refresh', sub: 'Min 40% off on clothing & footwear', cta: 'Shop Fashion', to: '/products/fashion', bg: 'linear-gradient(120deg,#7b1fa2,#fb641b)', img: 'https://picsum.photos/seed/novacart-slide-2/460/320' },
  { tag: 'Home Essentials', title: 'Furnish Your Space', sub: 'Up to 55% off furniture & decor', cta: 'Shop Furniture', to: '/products/furniture', bg: 'linear-gradient(120deg,#00695c,#2874F0)', img: 'https://picsum.photos/seed/novacart-slide-3/460/320' },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, []);

  const s = slides[active];

  return (
    <section className="nc-hero">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="nc-hero__slide"
          style={{ background: s.bg }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="container nc-hero__inner">
            <div className="nc-hero__text">
              <span className="nc-hero__tag">{s.tag}</span>
              <h1>{s.title}</h1>
              <p>{s.sub}</p>
              <Link to={s.to} className="fk-btn fk-btn--accent">{s.cta}</Link>
            </div>
            <img src={s.img} alt={s.title} className="nc-hero__img" />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="nc-hero__dots">
        {slides.map((_, i) => (
          <button key={i} className={i === active ? 'is-active' : ''} onClick={() => setActive(i)} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </section>
  );
}
