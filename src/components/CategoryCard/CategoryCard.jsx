import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaLaptop, FaTshirt, FaCouch, FaCarrot, FaMobileAlt,
  FaLaptopCode, FaSpa, FaFutbol, FaTag,
} from 'react-icons/fa';
import './CategoryCard.css';

const ICON_MAP = {
  FaLaptop, FaTshirt, FaCouch, FaCarrot, FaMobileAlt,
  FaLaptopCode, FaSpa, FaFutbol,
};

export default function CategoryCard({ category }) {
  const Icon = ICON_MAP[category.icon] || FaTag;
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
      <Link to={`/products/${category.id}`} className="nc-catcard neo-raised">
        {category.badge && <span className="nc-catcard__badge">{category.badge}</span>}
        <div className="nc-catcard__icon"><Icon /></div>
        <span className="nc-catcard__name">{category.name}</span>
      </Link>
    </motion.div>
  );
}
