import { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaFilter, FaTimes } from 'react-icons/fa';
import ProductCard from '../../components/ProductCard/ProductCard';
import { ProductGridSkeleton } from '../../components/Skeleton/Skeleton';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Pagination from '../../components/Pagination/Pagination';
import Modal from '../../components/Modal/Modal';
import Rating from '../../components/Rating/Rating';
import { categories } from '../../data/products';
import { apiGetProducts } from '../../services/productsApi';
import './Products.css';

const PAGE_SIZE = 8;

export default function Products() {
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('popular');
  const [priceMax, setPriceMax] = useState(7000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [quickView, setQuickView] = useState(null);
  const [baseList, setBaseList] = useState([]);

  const catInfo = categories.find((c) => c.id === category);
  const brands = useMemo(() => [...new Set(baseList.map((p) => p.brand))], [baseList]);

  useEffect(() => {
    setLoading(true);
    setPage(1);
    // Dummy API call — fetches the full category list (pageSize large enough
    // to grab everything so client-side filters/sort can run on top).
    apiGetProducts({ category, pageSize: 999 }).then((res) => {
      setBaseList(res.items);
      setLoading(false);
    });
  }, [category]);

  const filtered = useMemo(() => {
    let list = baseList.filter((p) => p.price <= priceMax && p.rating >= minRating);
    if (selectedBrands.length) list = list.filter((p) => selectedBrands.includes(p.brand));
    if (sort === 'price-low') list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === 'price-high') list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sort === 'discount') list = [...list].sort((a, b) => b.discount - a.discount);
    return list;
  }, [baseList, priceMax, minRating, selectedBrands, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleBrand = (b) => {
    setSelectedBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));
  };

  const clearFilters = () => {
    setPriceMax(7000);
    setSelectedBrands([]);
    setMinRating(0);
  };

  const FilterPanel = (
    <div className="nc-filters neo-raised">
      <div className="nc-filters__head">
        <h4>Filters</h4>
        <button onClick={clearFilters}>Clear all</button>
      </div>

      <div className="nc-filters__group">
        <h5>Price up to ₹{priceMax.toLocaleString('en-IN')}</h5>
        <input type="range" min="400" max="7000" step="100" value={priceMax} onChange={(e) => setPriceMax(+e.target.value)} />
      </div>

      <div className="nc-filters__group">
        <h5>Brand</h5>
        {brands.map((b) => (
          <label key={b} className="nc-filters__check">
            <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggleBrand(b)} />
            {b}
          </label>
        ))}
      </div>

      <div className="nc-filters__group">
        <h5>Minimum Rating</h5>
        {[4, 3, 2, 0].map((r) => (
          <label key={r} className="nc-filters__check">
            <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)} />
            {r === 0 ? 'Any rating' : <>{r}+ <Rating value={r} /></>}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container nc-products">
      <Breadcrumb items={category ? [{ to: '/products', label: 'Products' }, { label: catInfo?.name ?? category }] : [{ label: 'Products' }]} />

      <div className="nc-page-header">
        <h1>{catInfo ? catInfo.name : 'All Products'}</h1>
        <p>{filtered.length} products found</p>
      </div>

      <div className="nc-products__catbar scrollbar-hide">
        <Link to="/products" className={!category ? 'is-active' : ''}>All</Link>
        {categories.map((c) => (
          <Link key={c.id} to={`/products/${c.id}`} className={category === c.id ? 'is-active' : ''}>{c.name}</Link>
        ))}
      </div>

      <div className="nc-products__toolbar">
        <button className="nc-products__filterbtn" onClick={() => setFilterOpen(true)}>
          <FaFilter /> Filters
        </button>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="popular">Sort: Popular</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="discount">Best Discount</option>
        </select>
      </div>

      <div className="nc-products__layout">
        <div className="nc-products__sidebar">{FilterPanel}</div>

        <div className="nc-products__main">
          {loading ? (
            <ProductGridSkeleton count={8} />
          ) : pageItems.length ? (
            <div className="nc-products__grid">
              {pageItems.map((p) => <ProductCard key={p.id} product={p} onQuickView={setQuickView} />)}
            </div>
          ) : (
            <div className="nc-empty-state">
              <div className="nc-empty-state__icon"><FaFilter /></div>
              <h3>No products match your filters</h3>
              <p>Try adjusting the price range or clearing your filters.</p>
            </div>
          )}
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </div>

      <Modal open={filterOpen} onClose={() => setFilterOpen(false)} title="Filters">
        {FilterPanel}
      </Modal>

      <Modal open={!!quickView} onClose={() => setQuickView(null)} title={quickView?.name}>
        {quickView && (
          <div className="nc-quickview">
            <img src={quickView.image} alt={quickView.name} />
            <div>
              <Rating value={quickView.rating} reviews={quickView.reviews} />
              <p className="nc-quickview__price">₹{quickView.price.toLocaleString('en-IN')}</p>
              <p className="nc-quickview__desc">{quickView.description}</p>
              <Link to={`/product/${quickView.id}`} className="fk-btn fk-btn--accent" onClick={() => setQuickView(null)}>
                View Full Details
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
