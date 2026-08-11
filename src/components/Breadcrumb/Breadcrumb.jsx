import { Link } from 'react-router-dom';
import { FaChevronRight, FaHome } from 'react-icons/fa';
import './Breadcrumb.css';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="nc-breadcrumb" aria-label="Breadcrumb">
      <Link to="/"><FaHome /></Link>
      {items.map((item, i) => (
        <span key={i} className="nc-breadcrumb__item">
          <FaChevronRight size={9} />
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span className="is-current">{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}
