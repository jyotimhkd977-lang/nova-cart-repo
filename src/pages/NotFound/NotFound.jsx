import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaShoppingBag, FaSearch } from 'react-icons/fa';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="nc-404">
      <div className="nc-404__blob nc-404__blob--1" />
      <div className="nc-404__blob nc-404__blob--2" />

      <motion.div
        className="nc-404__cart neo-raised"
        animate={{ y: [0, -18, 0], rotate: [0, -3, 3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FaShoppingBag />
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        404
      </motion.h1>
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        Oops!
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        The page you're looking for doesn't exist. It might have been moved, deleted, or never existed at all.
      </motion.p>

      <motion.div className="nc-404__actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Link to="/" className="fk-btn fk-btn--accent"><FaHome /> Home</Link>
        <Link to="/products" className="fk-btn fk-btn--outline"><FaShoppingBag /> Continue Shopping</Link>
        <Link to="/search" className="fk-btn fk-btn--outline"><FaSearch /> Search Products</Link>
      </motion.div>
    </div>
  );
}
