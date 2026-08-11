// Dummy REST-like API layer — frontend only.
// Simulates real network calls (with latency) on top of the local mock
// dataset in `src/data/products.js`, so the rest of the app is already
// written in an "async fetch" style and can be pointed at a real backend
// later just by swapping the internals of these functions.

import {
  products as allProducts,
  categories as allCategories,
  getProductById,
  getProductsByCategory,
  searchProducts,
  getFeatured,
  getNewArrivals,
  getDeals,
} from '../data/products';

const NETWORK_DELAY = 450;

function delay(data, ms = NETWORK_DELAY) {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

/** GET /api/products?category=&sort=&page=&pageSize= */
export async function apiGetProducts({ category, sort = 'popular', page = 1, pageSize = 8 } = {}) {
  let list = category ? getProductsByCategory(category) : [...allProducts];

  if (sort === 'price-low') list = [...list].sort((a, b) => a.price - b.price);
  else if (sort === 'price-high') list = [...list].sort((a, b) => b.price - a.price);
  else if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
  else if (sort === 'discount') list = [...list].sort((a, b) => b.discount - a.discount);

  const total = list.length;
  const start = (page - 1) * pageSize;
  const items = list.slice(start, start + pageSize);

  return delay({ items, total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)) });
}

/** GET /api/products/:id */
export async function apiGetProductById(id) {
  const product = getProductById(id);
  if (!product) return delay({ error: 'Product not found', status: 404 }, 250);
  return delay({ data: product, status: 200 });
}

/** GET /api/categories */
export async function apiGetCategories() {
  return delay({ data: allCategories, status: 200 }, 250);
}

/** GET /api/products/search?q= */
export async function apiSearchProducts(q) {
  const results = q ? searchProducts(q) : [];
  return delay({ data: results, status: 200 }, 350);
}

/** GET /api/products/featured|new|deals */
export async function apiGetFeatured(n = 10) { return delay(getFeatured(n)); }
export async function apiGetNewArrivals(n = 10) { return delay(getNewArrivals(n)); }
export async function apiGetDeals(n = 10) { return delay(getDeals(n)); }
