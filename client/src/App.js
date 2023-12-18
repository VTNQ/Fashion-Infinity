import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './components/register';
import Admin from  './components/AdminPage';
import Login from './components/Login';
import Forgot_Password from './components/Forgot_Password';
import Category from './components/CategoryFrom';
import ResetPassword123 from './components/resetPassword'; 
import Picture from './components/Picture';

import { gapi } from 'gapi-script';

function App() {
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
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/forgot' element={<Forgot_Password/>}/>
        <Route path='/reset' element={<ResetPassword123/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/category' element={<Category/>}/>
        <Route path='/Picture' element={<Picture/>}/>
      </Routes>
    </Router>
  );
}

export default App;
