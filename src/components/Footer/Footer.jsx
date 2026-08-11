import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Footer.css';

export default function Footer() {
  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success('Subscribed! Welcome to the NovaCart list.');
    e.target.reset();
  };

  return (
    <footer className="nc-footer">
      <div className="container nc-footer__grid">
        <div className="nc-footer__brand">
          <h3 className="nc-navbar__logo">Nova<span>Cart</span></h3>
          <p>Modern shopping, softly designed. Curated products with a smoother way to browse, save and buy.</p>
          <div className="nc-footer__social">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Youtube"><FaYoutube /></a>
          </div>
        </div>

        <div className="nc-footer__col">
          <h4>About</h4>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Careers</Link>
          <Link to="/help">Press</Link>
          <Link to="/about">Our Story</Link>
        </div>

        <div className="nc-footer__col">
          <h4>Support</h4>
          <Link to="/help">Help Center</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/account/orders">Track Order</Link>
          <Link to="/help">Returns</Link>
        </div>

        <div className="nc-footer__col">
          <h4>Legal</h4>
          <Link to="/help">Privacy Policy</Link>
          <Link to="/help">Terms of Service</Link>
          <Link to="/help">Shipping Policy</Link>
        </div>

        <div className="nc-footer__newsletter">
          <h4>Stay in the loop</h4>
          <p>Get early access to drops and deals.</p>
          <form onSubmit={handleSubscribe}>
            <input type="email" placeholder="Your email" required />
            <button type="submit" aria-label="Subscribe"><FaPaperPlane /></button>
          </form>
        </div>
      </div>

      <div className="nc-footer__bottom container">
        <p>© {new Date().getFullYear()} NovaCart. All rights reserved.</p>
      </div>
    </footer>
  );
}
