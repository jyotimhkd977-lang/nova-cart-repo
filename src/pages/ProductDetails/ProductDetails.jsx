import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaShoppingCart, FaMinus, FaPlus, FaCheckCircle, FaStore } from 'react-icons/fa';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Rating from '../../components/Rating/Rating';
import ProductCard from '../../components/ProductCard/ProductCard';
import Carousel from '../../components/Carousel/Carousel';
import { getProductById, getProductsByCategory, categories } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import './ProductDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(product?.colors?.[0]);

  useEffect(() => {
    setActiveImg(0);
    setQty(1);
    setColor(product?.colors?.[0]);
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="container nc-empty-state">
        <div className="nc-empty-state__icon"><FaStore /></div>
        <h3>Product not found</h3>
        <p>The product you're looking for may have been removed.</p>
        <button className="fk-btn fk-btn--accent" onClick={() => navigate('/products')}>Browse Products</button>
      </div>
    );
  }

  const wished = isWishlisted(product.id);
  const catInfo = categories.find((c) => c.id === product.category);
  const related = getProductsByCategory(product.category).filter((p) => p.id !== product.id).slice(0, 8);

  return (
    <div className="container nc-pdetails">
      <Breadcrumb
        items={[
          { to: '/products', label: 'Products' },
          { to: `/products/${product.category}`, label: catInfo?.name ?? product.category },
          { label: product.name },
        ]}
      />

      <div className="nc-pdetails__grid">
        <div className="nc-pdetails__gallery">
          <motion.div className="nc-pdetails__mainimg neo-raised" key={activeImg}>
            <motion.img
              src={product.gallery[activeImg]}
              alt={product.name}
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
          <div className="nc-pdetails__thumbs">
            {product.gallery.map((img, i) => (
              <button key={i} className={i === activeImg ? 'is-active' : ''} onClick={() => setActiveImg(i)}>
                <img src={img} alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="nc-pdetails__info">
          <span className="nc-pdetails__brand">{product.brand}</span>
          <h1>{product.name}</h1>
          <Rating value={product.rating} reviews={product.reviews} size={16} />

          <div className="nc-pdetails__price">
            <span className="now">₹{product.price.toLocaleString('en-IN')}</span>
            {product.oldPrice > product.price && <span className="old">₹{product.oldPrice.toLocaleString('en-IN')}</span>}
            {product.discount > 0 && <span className="pct">{product.discount}% off</span>}
          </div>

          <p className="nc-pdetails__desc">{product.description}</p>

          {product.colors?.length > 0 && (
            <div className="nc-pdetails__colors">
              <h5>Color</h5>
              <div className="nc-pdetails__swatches">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    className={c === color ? 'is-active' : ''}
                    style={{ background: c }}
                    onClick={() => setColor(c)}
                    aria-label={`Select color ${c}`}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="nc-pdetails__qty">
            <h5>Quantity</h5>
            <div className="nc-pdetails__qtybox">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}><FaMinus /></button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}><FaPlus /></button>
            </div>
          </div>

          <div className="nc-pdetails__actions">
            <button className="fk-btn fk-btn--accent" disabled={!product.inStock} onClick={() => addToCart(product, qty, color)}>
              <FaShoppingCart /> {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button className="nc-pdetails__wishbtn neo-raised" onClick={() => toggleWishlist(product)}>
              {wished ? <FaHeart color="var(--color-accent)" /> : <FaRegHeart />}
            </button>
          </div>

          <div className="nc-pdetails__trust">
            <span><FaCheckCircle /> {product.inStock ? 'In Stock' : 'Out of Stock'}</span>
            <span><FaStore /> Sold by NovaCart Official</span>
          </div>

          <div className="nc-pdetails__specs neo-raised">
            <h5>Specifications</h5>
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k} className="nc-pdetails__spec-row">
                <span>{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <Carousel title="Related Products" subtitle="You might also like these">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </Carousel>
      )}
    </div>
  );
}
