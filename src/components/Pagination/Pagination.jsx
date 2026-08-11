import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Pagination.css';

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="nc-pagination">
      <button disabled={page === 1} onClick={() => onChange(page - 1)} aria-label="Previous page">
        <FaChevronLeft />
      </button>
      {pages.map((p) => (
        <button key={p} className={p === page ? 'is-active' : ''} onClick={() => onChange(p)}>
          {p}
        </button>
      ))}
      <button disabled={page === totalPages} onClick={() => onChange(page + 1)} aria-label="Next page">
        <FaChevronRight />
      </button>
    </div>
  );
}
