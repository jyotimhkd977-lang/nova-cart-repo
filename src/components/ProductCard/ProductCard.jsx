import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import './ProductCard.css';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wished = isWishlisted(product.id);

  return (
    <motion.div
      className="nc-pcard neo-raised"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
    >
      <div className="nc-pcard__media">
        {product.discount > 0 && <span className="nc-pcard__badge">-{product.discount}%</span>}
        <button
          className={`nc-pcard__wish ${wished ? 'is-active' : ''}`}
          onClick={() => toggleWishlist(product)}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {wished ? <FaHeart /> : <FaRegHeart />}
        </button>
        <Link to={`/product/${product.id}`}>
          <motion.img
            src={product.image}
            alt={product.name}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
            loading="lazy"
          />
        </Link>
        <button className="nc-pcard__quickview" onClick={() => onQuickView?.(product)}>
          <FaEye /> Quick View
        </button>
      </div>

      <div className="nc-pcard__body">
        <span className="nc-pcard__brand">{product.brand}</span>
        <Link to={`/product/${product.id}`} className="nc-pcard__name">{product.name}</Link>
        <span className="nc-pcard__rating-pill">{product.rating} <FaStar size={9} /></span>
        <div className="nc-pcard__price">
          <span className="nc-pcard__price-now">₹{product.price.toLocaleString('en-IN')}</span>
          {product.oldPrice > product.price && (
            <span className="nc-pcard__price-old">₹{product.oldPrice.toLocaleString('en-IN')}</span>
          )}
          {product.discount > 0 && <span className="nc-pcard__price-pct">{product.discount}% off</span>}
        </div>
        <button
          className="nc-pcard__add"
          disabled={!product.inStock}
          onClick={() => addToCart(product)}
        >
          <FaShoppingCart /> {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </motion.div>
  );
}
