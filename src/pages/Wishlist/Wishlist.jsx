import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaTrash, FaShoppingCart } from 'react-icons/fa';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { getProductById } from '../../data/products';
import './Wishlist.css';

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container nc-empty-state">
        <div className="nc-empty-state__icon"><FaHeart /></div>
        <h3>Your wishlist is empty</h3>
        <p>Save items you love so you can find them easily later.</p>
        <Link to="/products" className="fk-btn fk-btn--accent">Discover Products</Link>
      </div>
    );
  }

  return (
    <div className="container nc-wishlist">
      <Breadcrumb items={[{ label: 'Wishlist' }]} />
      <div className="nc-page-header"><h1>Your Wishlist</h1><p>{items.length} saved item{items.length > 1 ? 's' : ''}</p></div>

      <div className="nc-wishlist__grid">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div key={item.id} className="nc-wishlist__card neo-raised" exit={{ opacity: 0, scale: 0.9 }} layout>
              <Link to={`/product/${item.id}`}><img src={item.image} alt={item.name} /></Link>
              <div className="nc-wishlist__info">
                <Link to={`/product/${item.id}`}><h4>{item.name}</h4></Link>
                <p>₹{item.price.toLocaleString('en-IN')}</p>
              </div>
              <div className="nc-wishlist__actions">
                <button className="nc-wishlist__movebtn" onClick={() => { const p = getProductById(item.id); if (p) addToCart(p); }}>
                  <FaShoppingCart /> Move to Cart
                </button>
                <button className="nc-wishlist__delbtn" onClick={() => removeFromWishlist(item.id)} aria-label="Remove">
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
