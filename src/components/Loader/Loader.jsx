import { motion } from 'framer-motion';
import './Loader.css';

export default function Loader({ label = 'Loading NovaCart' }) {
  return (
    <div className="nc-loader">
      <div className="nc-loader__ring neo-raised">
        <motion.div
          className="nc-loader__dot"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        />
      </div>
      <p className="nc-loader__label">{label}</p>
    </div>
  );
}
