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

import ProductUser from './components/User/ProductUser';
import Menu from './components/menu/MenuHomepage';
import WareHouse from './components/WareHouse';
import DetailProduct from './components/DetailProdutct/DetailProduct';
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
        </Route>
        <Route path='/layout' element={<Layout/>}>
            <Route index element={<Homepage/>}/>
        </Route>
        <Route path='/Product' element={<Product/>}/>
        <Route path='/Edit' element={<EditProfile/>}/>
        <Route path='/HomeProduct' element={<ProductUser/>}/>
        <Route path='/menu' element={<Menu />}/>
        <Route path='/WareHouse' element={<WareHouse/>}/>
        <Route path='/DetailProduct' element={<DetailProduct/>}/>
      </Routes>
    </Router>
  );
}

export default App;
