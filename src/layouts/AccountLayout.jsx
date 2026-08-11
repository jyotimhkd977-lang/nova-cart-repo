import { Outlet } from 'react-router-dom';
import { FaUserCircle, FaBoxOpen, FaMapMarkerAlt, FaHeart, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Sidebar from '../components/Sidebar/Sidebar';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import './AccountLayout.css';

const links = [
  { to: '/account/profile', label: 'Profile', icon: <FaUserCircle /> },
  { to: '/account/orders', label: 'Orders', icon: <FaBoxOpen /> },
  { to: '/account/addresses', label: 'Addresses', icon: <FaMapMarkerAlt /> },
  { to: '/account/wishlist', label: 'Wishlist', icon: <FaHeart /> },
  { to: '/account/settings', label: 'Settings', icon: <FaCog /> },
];

export default function AccountLayout() {
  return (
    <div className="container nc-account">
      <Breadcrumb items={[{ label: 'Account' }]} />
      <div className="nc-account__grid">
        <Sidebar title="My Account" links={links} />
        <div className="nc-account__content neo-raised">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
