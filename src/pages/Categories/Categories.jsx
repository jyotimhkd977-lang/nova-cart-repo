import CategoryCard from '../../components/CategoryCard/CategoryCard';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { categories } from '../../data/products';
import './Categories.css';

export default function Categories() {
  return (
    <div className="container nc-categories">
      <Breadcrumb items={[{ label: 'Categories' }]} />
      <div className="nc-page-header">
        <h1>Shop by Category</h1>
        <p>Explore our full range across {categories.length} categories</p>
      </div>
      <div className="nc-categories__grid">
        {categories.map((c) => <CategoryCard key={c.id} category={c} />)}
      </div>
    </div>
  );
}
