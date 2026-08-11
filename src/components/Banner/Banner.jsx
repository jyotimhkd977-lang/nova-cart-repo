import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Banner.css';

export default function Banner({ eyebrow, title, subtitle, cta, to, tone = 'primary', image }) {
  return (
    <motion.div
      className={`nc-banner nc-banner--${tone}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="nc-banner__text">
        {eyebrow && <span className="nc-banner__eyebrow">{eyebrow}</span>}
        <h3>{title}</h3>
        {subtitle && <p>{subtitle}</p>}
        {cta && <Link to={to} className="nc-banner__cta">{cta}</Link>}
      </div>
      {image && <img src={image} alt="" className="nc-banner__img" />}
    </motion.div>
  );
}
