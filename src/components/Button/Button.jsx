import { motion } from 'framer-motion';
import './Button.css';

export default function Button({ children, variant = 'primary', size = 'md', icon, onClick, type = 'button', disabled, full, className = '' }) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.96 }}
      whileHover={{ y: -2 }}
      className={`nc-btn nc-btn--${variant} nc-btn--${size} ${full ? 'nc-btn--full' : ''} ${className}`}
    >
      {icon && <span className="nc-btn__icon">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
}
