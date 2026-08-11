import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import SearchBar from '../../components/SearchBar/SearchBar';
import ProductCard from '../../components/ProductCard/ProductCard';
import { ProductGridSkeleton } from '../../components/Skeleton/Skeleton';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { searchProducts } from '../../data/products';
import './Search.css';

const recentDefaults = ['Wireless Headphones', 'Running Shoes', 'Smartwatch'];
const popularSearches = ['Mobiles', 'Laptops', 'Sneakers', 'Perfume', 'Yoga Mat', 'Office Chair'];

export default function Search() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const [loading, setLoading] = useState(false);
  const [recent, setRecent] = useState(recentDefaults);

  useEffect(() => {
    if (!q) return;
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    setRecent((prev) => [q, ...prev.filter((r) => r.toLowerCase() !== q.toLowerCase())].slice(0, 5));
    return () => clearTimeout(t);
  }, [q]);

  const results = q ? searchProducts(q) : [];

  const runSearch = (term) => {
    if (term) setParams({ q: term });
  };

  return (
    <div className="container nc-search">
      <Breadcrumb items={[{ label: 'Search' }]} />
      <div className="nc-page-header"><h1>Search Products</h1></div>

      <div className="nc-search__bar">
        <SearchBar initialValue={q} onSearch={runSearch} />
      </div>

      {!q && (
        <div className="nc-search__hints">
          <div>
            <h4>Recent Searches</h4>
            <div className="nc-search__chips">
              {recent.map((r) => <button key={r} onClick={() => runSearch(r)}>{r}</button>)}
            </div>
          </div>
          <div>
            <h4>Popular Searches</h4>
            <div className="nc-search__chips">
              {popularSearches.map((r) => <button key={r} onClick={() => runSearch(r)}>{r}</button>)}
            </div>
          </div>
        </div>
      )}

      {q && (
        loading ? <ProductGridSkeleton count={8} /> : results.length ? (
          <>
            <p className="nc-search__count">{results.length} results for "{q}"</p>
            <div className="nc-products__grid">
              {results.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </>
        ) : (
          <div className="nc-empty-state">
            <div className="nc-empty-state__icon"><FaSearch /></div>
            <h3>No results for "{q}"</h3>
            <p>Try a different search term or browse our categories.</p>
          </div>
        )
      )}
    </div>
  );
}
