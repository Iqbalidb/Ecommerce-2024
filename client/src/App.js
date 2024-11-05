import { Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from "./components/layout/ScrollTop";
import AdminRoute from "./components/Routes/AdminRoute";
import PrivateRoute from "./components/Routes/PrivateRoute";
import About from "./pages/About";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminOrders from "./pages/Admin/AdminOrders";
import AllUsers from "./pages/Admin/AllUsers";
import ContactMessage from "./pages/Admin/ContactMessage";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import CartPage from "./pages/CartPage";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import Contact from "./pages/Contact";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import Payment from "./pages/Payment";
import Policy from "./pages/Policy";
import ProductDetails from "./pages/ProductDetails";
import ProductsList from "./pages/ProductsList";
import Search from "./pages/Search";
import Dashboard from "./pages/user/Dashboard";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/product/:slug' element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/payment-checkout" element={<Payment />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path='/search' element={<Search />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/dashboard' element={<PrivateRoute />} >
          <Route path='user' element={<Dashboard />} />
          <Route path='user/profile' element={<Profile />} />
          <Route path='user/orders' element={<Orders />} />
        </Route>
        <Route path='/dashboard' element={<AdminRoute />} >
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/create-category' element={<CreateCategory />} />
          <Route path='admin/create-product' element={<CreateProduct />} />
          <Route path='admin/update-product/:slug' element={<UpdateProduct />} />
          <Route path='admin/products' element={<Products />} />
          <Route path='admin/users' element={<AllUsers />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/contact-messages" element={<ContactMessage />} />
        </Route>

        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
