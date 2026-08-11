// Deterministic placeholder images via picsum with seeded ids so they stay stable
const img = (seed, w = 600, h = 600) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const categories = [
  { id: 'electronics', name: 'Electronics', icon: 'FaLaptop', badge: 'Popular' },
  { id: 'fashion', name: 'Fashion', icon: 'FaTshirt', badge: 'Popular' },
  { id: 'furniture', name: 'Furniture', icon: 'FaCouch' },
  { id: 'grocery', name: 'Grocery', icon: 'FaCarrot' },
  { id: 'mobiles', name: 'Mobiles', icon: 'FaMobileAlt', badge: 'Popular' },
  { id: 'laptops', name: 'Laptops', icon: 'FaLaptopCode' },
  { id: 'beauty', name: 'Beauty', icon: 'FaSpa' },
  { id: 'sports', name: 'Sports', icon: 'FaFutbol' },
];

const brands = ['Nova', 'Zenith', 'Orbit', 'Lumen', 'Drift', 'Solace', 'Vertex', 'Halcyon'];

function makeProduct(id, category, name, price, opts = {}) {
  const oldPrice = opts.oldPrice ?? Math.round(price * (1 + (Math.random() * 0.3 + 0.1)));
  const discount = Math.round(((oldPrice - price) / oldPrice) * 100);
  return {
    id,
    category,
    name,
    brand: brands[id % brands.length],
    price,
    oldPrice,
    discount,
    rating: +(3.5 + ((id * 7) % 15) / 10).toFixed(1),
    reviews: (id * 37) % 900 + 12,
    image: img(`novacart-${category}-${id}`),
    gallery: [img(`novacart-${category}-${id}`), img(`novacart-${category}-${id}-b`), img(`novacart-${category}-${id}-c`)],
    colors: opts.colors ?? ['#333333', '#6C63FF', '#FF6584'],
    inStock: id % 11 !== 0,
    description: `The ${name} blends thoughtful design with everyday reliability. Crafted for people who notice details, it pairs premium materials with a finish that stays looking new.`,
    specs: opts.specs ?? { Material: 'Premium composite', Warranty: '1 Year', Origin: 'Imported' },
    tags: opts.tags ?? [],
  };
}

const catalog = {
  electronics: ['Wireless Noise-Cancelling Headphones', 'Smart Home Hub', '4K Streaming Box', 'Bluetooth Speaker', 'Smartwatch Pro', 'Portable Power Bank', 'Mechanical Keyboard', 'Gaming Mouse', 'Action Camera', 'Home Security Camera'],
  fashion: ['Oversized Cotton Hoodie', 'Slim Fit Denim Jacket', 'Linen Summer Shirt', 'Classic Trench Coat', 'Everyday Sneakers', 'Leather Crossbody Bag', 'Wool Blend Scarf', 'Chino Trousers', 'Graphic Tee', 'Ankle Boots'],
  furniture: ['Ergonomic Office Chair', 'Minimalist Coffee Table', 'Modular Sofa', 'Wooden Bookshelf', 'Bedside Lamp Table', 'Velvet Accent Chair', 'Extendable Dining Table', 'Floating Wall Shelf', 'Storage Ottoman', 'Standing Desk'],
  grocery: ['Organic Avocado Pack', 'Cold Pressed Olive Oil', 'Artisan Sourdough Bread', 'Free Range Eggs (12)', 'Himalayan Pink Salt', 'Roasted Almonds 500g', 'Green Tea Bags', 'Organic Honey Jar', 'Basmati Rice 5kg', 'Dark Chocolate Bar'],
  mobiles: ['NovaPhone 14 Pro', 'Zenith X Lite', 'Orbit Fold 3', 'Lumen S Edge', 'Drift Mini 5G', 'Solace Ultra', 'Vertex Note 12', 'Halcyon Flip', 'NovaPhone SE', 'Zenith Vision'],
  laptops: ['UltraBook Air 14"', 'ProStudio 16" Creator', 'GameForce RTX Laptop', 'Chromelite 2-in-1', 'BusinessPro X1', 'Featherlight 13"', 'Workstation Elite', 'StudentBook Basic', 'CreatorPad OLED', 'DevMachine Linux Edition'],
  beauty: ['Vitamin C Serum', 'Hydrating Face Cream', 'Matte Lipstick Set', 'Argan Hair Oil', 'SPF 50 Sunscreen', 'Charcoal Face Mask', 'Rose Water Toner', 'Micellar Cleansing Water', 'Retinol Night Cream', 'Perfume Discovery Set'],
  sports: ['Yoga Mat Premium', 'Adjustable Dumbbell Set', 'Running Shoes Pro', 'Resistance Bands Kit', 'Insulated Water Bottle', 'Cycling Helmet', 'Football Match Ball', 'Fitness Tracker Band', 'Foam Roller', 'Camping Tent 2-Person'],
};

let uid = 1;
export const products = Object.entries(catalog).flatMap(([cat, names]) =>
  names.map((name, i) => makeProduct(uid++, cat, name, [499, 799, 1299, 1999, 2499, 3499, 4999, 6999][i % 8]))
);

export const getProductsByCategory = (cat) => products.filter((p) => p.category === cat);
export const getProductById = (id) => products.find((p) => String(p.id) === String(id));
export const getFeatured = (n = 8) => products.filter((_, i) => i % 3 === 0).slice(0, n);
export const getNewArrivals = (n = 8) => [...products].slice(-n).reverse();
export const getDeals = (n = 8) => [...products].sort((a, b) => b.discount - a.discount).slice(0, n);
export const searchProducts = (q) =>
  products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.brand.toLowerCase().includes(q.toLowerCase()));
