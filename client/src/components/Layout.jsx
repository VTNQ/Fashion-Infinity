import React, {useEffect, useState} from "react";
import image from '../images/user2-160x160.jpg';
import { useLocation, Outlet, Route,Routes, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CreateAdmin from "./superadmin/CreateAdminPage";
import footer from './footer/FooterHome'
import MenuHomepage from "./menu/MenuHomepage";
import TreeviewMenu from "./superadmin/TreeViewMenu";
import FooterHome from "./footer/FooterHome";
const featureEnabled = window.location.pathname.includes("/");
if(featureEnabled){
	require("../layoutFolder/global.css");
	require('../layoutFolder/bootstrap.min.css');
	require('../layoutFolder/index.css');
	require('../layoutFolder/fontawesome.css');
}



function Layout(){
	const location = useLocation();
    const ID=location.state?.ID||'';
    return(
        
     
<div>



	<MenuHomepage/>


	<Outlet/>

	
<FooterHome/>
	
</div>



    )
}
export default Layout;