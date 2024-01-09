import { useState, useEffect  } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './components/register';
import Admin from  './components/AdminPage';
import Login from './components/Login';
import Forgot_Password from './components/Forgot_Password';
import Category from './components/CategoryFrom';
import ResetPassword123 from './components/resetPassword'; 
import Picture from './components/Picture';
import Provider from './components/Provider';
import Product from './components/Product';
import EditProfile from './components/EditProfile';
import { gapi } from 'gapi-script';
import Superadmin from './components/Superadmin';
import CreateAdmin from './components/superadmin/CreateAdminPage';
import DefaultDashboard from './components/superadmin/DefaultDashboard';
import ShowCustomer from './components/superadmin/ShowCustomer';
import ShowAdmin  from './components/superadmin/ShowAdmin';
import Layout from './components/Layout';
import Homepage from './components/layout/homepage/Homepage';
import MiniCart from './components/Minicart/MiniCart';
import ProductUser from './components/User/ProductUser';
import Menu from './components/menu/MenuHomepage';
import WareHouse from './components/WareHouse';
import WareHouseSuperadmin from './components/superadmin/WareHouse';
import ProviderSuperadmin from './components/superadmin/Provider';
import Footer from './components/footer/FooterHome';
import DetailProduct from './components/DetailProdutct/DetailProduct';
import CheckOut from './components/Checkout/CheckOut';
import Order from './components/Order';
import DetailOrder from './components/DetailOrder';
import Transport_fee from './components/Transport_fee';
import Category_Post from './components/Category_Post';
import Blog from './components/Blog/Blog';
import AdminBlog from './components/AdminBlog';
import Voucher from './components/Voucher/Voucher';
import VoucherSuperadmin from './components/superadmin/VoucherSuperadmin';
import DetailBlog from './components/Blog/DetailBlog';
import Myorder from './components/MyOrder/Myorder';
import OrderDetail from './components/MyOrderDetail/OrderDetail';
import Event from './components/Event';
import Contact from './components/Contact/Contact';
import About from './components/About/About';
function App() {
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    // Load the Google API client library
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '459264668372-o7aqna11uh89jqtbuc05o285tsphoopc.apps.googleusercontent.com',
      });
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/forgot' element={<Forgot_Password/>}/>
        <Route path='/reset' element={<ResetPassword123/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/category' element={<Category/>}/>
        <Route path='/Picture' element={<Picture/>}/>
        <Route path='/Provider' element={<Provider/>}/>
        
        <Route path='/superadmin/' element={<Superadmin/>}>
            <Route index element={<DefaultDashboard />} />
            <Route path='CreateAdmin' element={<CreateAdmin/>}/>
            <Route path='ShowCustomer' element={<ShowCustomer/>}/>
            <Route path='ShowAdmin' element={<ShowAdmin/>}/>
            <Route path='WareHouse' element={<WareHouseSuperadmin/>}/>
            <Route path='Provider' element={<ProviderSuperadmin/>}/>
            <Route path='VoucherSuperadmin' element={<VoucherSuperadmin/>}/>
        </Route>
        <Route path='/layout/' element={<Layout/>}>
            <Route index element={<Homepage/>}/>
           
        </Route>
        <Route path='/Product' element={<Product/>}/>
        <Route path='/Edit' element={<EditProfile/>}/>
        <Route path='/HomeProduct' element={<ProductUser/>}/>
        <Route path='/menu' element={<Menu />}/>
        <Route path='/WareHouse' element={<WareHouse/>}/>
        
        <Route path='/DetailProduct/:id' element={<DetailProduct/>}/>
        <Route path='/MiniCart' element={<MiniCart/>}/>
        <Route path='/footer' element={<Footer/>}/>
        <Route path='/Check' element={<CheckOut/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/DetailOrder' element={<DetailOrder/>}/>
        <Route path='/Transport_fee' element={<Transport_fee/>}/>
        <Route path='/Category_Post' element={<Category_Post/>}/>
        <Route path='/Blog' element={<Blog/>}/>
        <Route path='/AdminBlog' element={<AdminBlog/>}/>
        <Route path='/DetailBlog' element={<DetailBlog/>}/>
        <Route path='/Myorder' element={<Myorder/>}/>
        <Route path='/OrderDetail' element={<OrderDetail/>}/>
        <Route path='/Event' element={<Event/>}/>
        <Route path='/voucher' element={<Voucher/>}/>
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/About' element={<About/>}/>
      </Routes>
    </Router>
  );
}

export default App;
