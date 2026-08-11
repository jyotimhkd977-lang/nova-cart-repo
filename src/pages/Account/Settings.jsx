import { FaBell, FaMoon, FaLock, FaSignOutAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';
import './Account.css';

export default function Settings() {
  const { dark, toggleDark } = useTheme();

  const handleLogout = () => toast.info('Logged out (demo only — no backend connected)');
  const handlePasswordChange = (e) => {
    e.preventDefault();
    toast.success('Password updated successfully');
    e.target.reset();
  };

  return (
    <div className="nc-acc-page">
      <h2>Settings</h2>
      <p className="nc-acc-page__sub">Manage preferences and account security</p>

      <div className="nc-settings__section">
        <h4><FaMoon /> Appearance</h4>
        <div className="nc-settings__toggle-row">
          <div><strong>Dark Mode</strong><p>Switch between light and dark themes</p></div>
          <button className={`nc-settings__switch ${dark ? 'is-on' : ''}`} onClick={toggleDark} aria-label="Toggle dark mode">
            <span />
          </button>
        </div>
      </div>

      <div className="nc-settings__section">
        <h4><FaBell /> Notifications</h4>
        <div className="nc-settings__toggle-row">
          <div><strong>Order Updates</strong><p>Get notified about order status changes</p></div>
          <button className="nc-settings__switch is-on" aria-label="Toggle order updates"><span /></button>
        </div>
        <div className="nc-settings__toggle-row">
          <div><strong>Promotions & Deals</strong><p>Receive emails about sales and offers</p></div>
          <button className="nc-settings__switch" aria-label="Toggle promotions"><span /></button>
        </div>
      </div>

      <div className="nc-settings__section">
        <h4><FaLock /> Change Password</h4>
        <form className="nc-acc-form" onSubmit={handlePasswordChange}>
          <label><span>Current Password</span><input type="password" required /></label>
          <div className="nc-acc-form__row">
            <label><span>New Password</span><input type="password" required /></label>
            <label><span>Confirm Password</span><input type="password" required /></label>
          </div>
          <button type="submit" className="fk-btn fk-btn--accent">Update Password</button>
        </form>
      </div>

      <button className="nc-settings__logout" onClick={handleLogout}><FaSignOutAlt /> Log Out</button>
    </div>
  );
}
