import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AccountLayout from '../layouts/AccountLayout';
import Loader from '../components/Loader/Loader';

const Home = lazy(() => import('../pages/Home/Home'));
const Products = lazy(() => import('../pages/Products/Products'));
const ProductDetails = lazy(() => import('../pages/ProductDetails/ProductDetails'));
const Categories = lazy(() => import('../pages/Categories/Categories'));
const Cart = lazy(() => import('../pages/Cart/Cart'));
const Wishlist = lazy(() => import('../pages/Wishlist/Wishlist'));
const Checkout = lazy(() => import('../pages/Checkout/Checkout'));
const Payment = lazy(() => import('../pages/Payment/Payment'));
const Login = lazy(() => import('../pages/Login/Login'));
const Register = lazy(() => import('../pages/Register/Register'));
const Search = lazy(() => import('../pages/Search/Search'));
const Offers = lazy(() => import('../pages/Offers/Offers'));
const About = lazy(() => import('../pages/About/About'));
const Contact = lazy(() => import('../pages/Contact/Contact'));
const Help = lazy(() => import('../pages/Help/Help'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

const Profile = lazy(() => import('../pages/Account/Profile'));
const Orders = lazy(() => import('../pages/Account/Orders'));
const OrderTracking = lazy(() => import('../pages/Account/OrderTracking'));
const Addresses = lazy(() => import('../pages/Account/Addresses'));
const Settings = lazy(() => import('../pages/Account/Settings'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />

          <Route path="/account" element={<AccountLayout />}>
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<OrderTracking />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
