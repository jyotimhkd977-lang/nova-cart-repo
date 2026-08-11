import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch, FaHeart, FaShoppingCart, FaUser, FaMoon, FaSun,
  FaBars, FaTimes, FaChevronDown, FaMapMarkerAlt,
} from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import { categories, searchProducts } from '../../data/products';
import './Navbar.css';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const { count } = useCart();
  const { items: wishItems } = useWishlist();
  const { dark, toggleDark } = useTheme();

  useEffect(() => {
    const onClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSuggestions([]);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setSuggestions(val.trim() ? searchProducts(val).slice(0, 5) : []);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSuggestions([]);
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <header className="nc-navbar">
      <div className="nc-navbar__top">
        <div className="nc-navbar__inner container">
          <button className="nc-navbar__burger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <FaBars />
          </button>

          <Link to="/" className="nc-navbar__logo">
            Nova<span>Cart</span>
            <em>Explore <span className="nc-navbar__plus">Plus</span></em>
          </Link>

          <form className="nc-navbar__search" onSubmit={submitSearch} ref={searchRef}>
            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={query}
              onChange={handleSearchChange}
            />
            <button type="submit" aria-label="Search"><FaSearch /></button>
            <AnimatePresence>
              {suggestions.length > 0 && (
                <motion.ul
                  className="nc-navbar__suggestions"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                >
                  {suggestions.map((p) => (
                    <li key={p.id}>
                      <Link to={`/product/${p.id}`} onClick={() => setSuggestions([])}>
                        <img src={p.image} alt="" /> <span>{p.name}</span>
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </form>

          <div className="nc-navbar__actions">
            <Link to="/login" className="nc-navbar__login">Login</Link>

            <div className="nc-navbar__dropdown" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
              <button className="nc-navbar__morebtn">
                More <FaChevronDown size={10} />
              </button>
              <AnimatePresence>
                {catOpen && (
                  <motion.div
                    className="nc-navbar__megamenu"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                  >
                    <span className="nc-navbar__megaheading">Shop by Category</span>
                    {categories.map((c) => (
                      <Link key={c.id} to={`/products/${c.id}`} className="nc-navbar__megaitem">{c.name}</Link>
                    ))}
                    <div className="nc-navbar__megadivider" />
                    <button className="nc-navbar__megaitem" onClick={toggleDark}>
                      {dark ? <FaSun /> : <FaMoon />} {dark ? 'Light Mode' : 'Dark Mode'}
                    </button>
                    <Link to="/account/orders" className="nc-navbar__megaitem">Track Order</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/wishlist" className="nc-navbar__iconlink">
              <FaHeart />
              {wishItems.length > 0 && <span className="nc-navbar__badge">{wishItems.length}</span>}
              <span className="nc-navbar__iconlabel">Wishlist</span>
            </Link>

            <Link to="/cart" className="nc-navbar__cart">
              <FaShoppingCart />
              {count > 0 && <span className="nc-navbar__badge">{count}</span>}
              <span className="nc-navbar__iconlabel">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="nc-navbar__strip container scrollbar-hide">
        <Link to="/" className="nc-navbar__strip-loc"><FaMapMarkerAlt /> Deliver to Bhubaneswar, 751001</Link>
        <span className="nc-navbar__strip-sep" />
        {categories.map((c) => (
          <Link key={c.id} to={`/products/${c.id}`}>{c.name}</Link>
        ))}
        <Link to="/offers" className="nc-navbar__strip-offer">Offer Zone</Link>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div className="nc-navbar__scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} />
            <motion.div
              className="nc-navbar__drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
            >
              <div className="nc-navbar__drawer-head">
                <span>Nova<b>Cart</b></span>
                <button className="nc-navbar__drawer-close" onClick={() => setMobileOpen(false)}><FaTimes /></button>
              </div>
              <nav>
                <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
                <Link to="/products" onClick={() => setMobileOpen(false)}>Products</Link>
                <Link to="/categories" onClick={() => setMobileOpen(false)}>Categories</Link>
                <Link to="/offers" onClick={() => setMobileOpen(false)}>Offers</Link>
                <Link to="/wishlist" onClick={() => setMobileOpen(false)}>Wishlist</Link>
                <Link to="/cart" onClick={() => setMobileOpen(false)}>Cart</Link>
                <Link to="/account/profile" onClick={() => setMobileOpen(false)}>Account</Link>
                <Link to="/account/orders" onClick={() => setMobileOpen(false)}>Track Order</Link>
                <Link to="/login" onClick={() => setMobileOpen(false)}>Login</Link>
                <Link to="/about" onClick={() => setMobileOpen(false)}>About</Link>
                <Link to="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
                <Link to="/help" onClick={() => setMobileOpen(false)}>Help</Link>
                <button onClick={toggleDark}>{dark ? <FaSun /> : <FaMoon />} {dark ? 'Light Mode' : 'Dark Mode'}</button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
