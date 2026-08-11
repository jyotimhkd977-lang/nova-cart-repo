import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AddressProvider } from './context/AddressContext';
import { OrdersProvider } from './context/OrdersContext';
import AppRoutes from './routes/AppRoutes';
import './styles/theme.css';

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <AddressProvider>
            <OrdersProvider>
              <BrowserRouter>
                <AppRoutes />
                <ToastContainer
                  position="top-right"
                  autoClose={2500}
                  hideProgressBar
                  theme="colored"
                  toastClassName="nc-toast"
                />
              </BrowserRouter>
            </OrdersProvider>
          </AddressProvider>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
