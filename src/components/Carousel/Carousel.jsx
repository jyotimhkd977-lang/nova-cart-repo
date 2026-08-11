import { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Carousel.css';

export default function Carousel({ children, title, subtitle, viewAllTo }) {
  const trackRef = useRef(null);

  const scroll = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <section className="nc-carousel">
      <div className="nc-carousel__head">
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <div className="nc-carousel__controls">
          {viewAllTo && <a href={viewAllTo} className="nc-carousel__viewall">View all</a>}
          <button onClick={() => scroll(-1)} aria-label="Scroll left"><FaChevronLeft /></button>
          <button onClick={() => scroll(1)} aria-label="Scroll right"><FaChevronRight /></button>
        </div>
      </div>
      <div className="nc-carousel__track scrollbar-hide" ref={trackRef}>
        {children}
      </div>
    </section>
  );
}
