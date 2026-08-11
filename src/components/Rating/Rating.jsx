import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import './Rating.css';

export default function Rating({ value = 0, reviews, size = 14 }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="nc-rating">
      <span className="nc-rating__stars" style={{ fontSize: size }}>
        {Array.from({ length: full }).map((_, i) => <FaStar key={`f${i}`} />)}
        {half && <FaStarHalfAlt />}
        {Array.from({ length: empty }).map((_, i) => <FaRegStar key={`e${i}`} />)}
      </span>
      {reviews !== undefined && <span className="nc-rating__count">({reviews})</span>}
    </div>
  );
}
