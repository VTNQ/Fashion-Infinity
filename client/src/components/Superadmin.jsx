import React, {useState} from "react";
import image from '../images/user2-160x160.jpg';
import { useLocation, Outlet, Route,Routes, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CreateAdmin from "./superadmin/CreateAdminPage";

import TreeviewMenu from "./superadmin/TreeViewMenu";


function Superadmin(){
    const location = useLocation();
    const navigate = useNavigate();
    const username = location.state?.username || 'Default Username';
    return(
        <div className="wrapper">
        
        <header className="main-header">
  
          <a href="index2.html" className="logo"><b>Admin</b>LTE</a>
        
          <nav className="navbar navbar-static-top" role="navigation">
    <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
      <span className="sr-only">Toggle navigation</span>
    </a>
    
    {/* Logo */}
    <a  className="navbar-brand">
    <img src={image} className="user-image" alt="Logo" />
    {/* You can also add text or other elements alongside the logo */}
   {username}
  </a>
    
  </nav>
        </header>
        
        <aside className="main-sidebar ">
         
          <section className="sidebar h-auto">
          
            <div className="user-panel">
              <div className="pull-left image">
                <img src={image} className="img-circle" alt="User Image" />
              </div>
              <div className="pull-left info">
                <p className='text-white'>Alexander Pierce</p>
  
                <a href="#" className='text-white'><i className="fa fa-circle text-green-500"></i> Online</a>
              </div>
            </div>
       
           
        
            <ul className="sidebar-menu">
              <li className="header">MAIN NAVIGATION</li>
              <li className="active treeview">
                <a href="" onClick={() => navigate('/superadmin', { state: { username: username } })}>
                  <i className="fa fa-dashboard" ></i> <span>Dashboard</span> 
                </a>
                
              </li>
             
              <li className="treeview text-white">
                <a className='cursor-pointer' onClick={() => navigate('/category', { state: { username: username } })}>
                  <i className="fa fa-th"></i> <span>category</span> 
                </a>
              </li>
              <li className="treeview text-white">
                <a className='cursor-pointer' onClick={() => navigate('/Picture', { state: { username: username } })}>
                  <i className="fa fa-th"></i> <span>Picture</span> 
                </a>
              </li>
              <li className="treeview text-white">
                <a className='cursor-pointer' onClick={() => navigate('/Provider', { state: { username: username } })}>
                  <i className="fa fa-th"></i> <span>Provider</span> 
                </a>
              </li>
              <li className="treeview">
                <a href="#">
                  <i className="fa fa-pie-chart"></i>
                  <span>Charts</span>
                  <i className="fa fa-angle-left pull-right"></i>
                </a>
                <ul className="treeview-menu">
                  <li><a href="pages/charts/morris.html"><i className="fa fa-circle-o"></i> Morris</a></li>
                  <li><a href="pages/charts/flot.html"><i className="fa fa-circle-o"></i> Flot</a></li>
                  <li><a href="pages/charts/inline.html"><i className="fa fa-circle-o"></i> Inline charts</a></li>
                </ul>
              </li>
              <li className="treeview">
                <a href="#">
                  <i className="fa fa-laptop"></i>
                  <span>UI Elements</span>
                  <i className="fa fa-angle-left pull-right"></i>
                </a>
                <ul className="treeview-menu">
                  <li><a href="pages/UI/general.html"><i className="fa fa-circle-o"></i> General</a></li>
                  <li><a href="pages/UI/icons.html"><i className="fa fa-circle-o"></i> Icons</a></li>
                  <li><a href="pages/UI/buttons.html"><i className="fa fa-circle-o"></i> Buttons</a></li>
                  <li><a href="pages/UI/sliders.html"><i className="fa fa-circle-o"></i> Sliders</a></li>
                  <li><a href="pages/UI/timeline.html"><i className="fa fa-circle-o"></i> Timeline</a></li>
                  <li><a href="pages/UI/modals.html"><i className="fa fa-circle-o"></i> Modals</a></li>
                </ul>
              </li>
              <li className="treeview">
                <a href="#">
                  <i className="fa fa-edit"></i> <span>Forms</span>
                  <i className="fa fa-angle-left pull-right"></i>
                </a>
                <ul className="treeview-menu">
                  <li><a href="pages/forms/general.html"><i className="fa fa-circle-o"></i> General Elements</a></li>
                  <li><a href="pages/forms/advanced.html"><i className="fa fa-circle-o"></i> Advanced Elements</a></li>
                  <li><a href="pages/forms/editors.html"><i className="fa fa-circle-o"></i> Editors</a></li>
                </ul>
              </li>
              
              <TreeviewMenu title="Tables">
              <li><a href="#" onClick={()=> navigate('/superadmin/ShowCustomer',{state: {username:username}})}><i className="fa fa-circle-o text-info"></i> All Customer</a></li>
                  <li><a href="#" onClick={()=>navigate('/superadmin/ShowAdmin',{state: {username:username}})}><i className="fa fa-circle-o"></i> All Admin</a></li>
               </TreeviewMenu>
              
              <li>
                <a href="pages/calendar.html">
                  <i className="fa fa-calendar"></i> <span>Calendar</span>
                  <small className="label pull-right bg-red">3</small>
                </a>
              </li>
              <li>
                <a href="pages/mailbox/mailbox.html">
                  <i className="fa fa-envelope"></i> <span>Mailbox</span>
                  <small className="label pull-right bg-yellow">12</small>
                </a>
              </li>
              <li className="treeview">
                <a href="#">
                  <i className="fa fa-folder"></i> <span>Examples</span>
                  <i className="fa fa-angle-left pull-right"></i>
                </a>
                <ul className="treeview-menu">
                  <li><a href="pages/examples/invoice.html"><i className="fa fa-circle-o"></i> Invoice</a></li>
                  <li><a href="pages/examples/login.html"><i className="fa fa-circle-o"></i> Login</a></li>
                  <li><a href="pages/examples/register.html"><i className="fa fa-circle-o"></i> Register</a></li>
                  <li><a href="pages/examples/lockscreen.html"><i className="fa fa-circle-o"></i> Lockscreen</a></li>
                  <li><a href="pages/examples/404.html"><i className="fa fa-circle-o"></i> 404 Error</a></li>
                  <li><a href="pages/examples/500.html"><i className="fa fa-circle-o"></i> 500 Error</a></li>
                  <li><a href="pages/examples/blank.html"><i className="fa fa-circle-o"></i> Blank Page</a></li>
                </ul>
              </li>
              <li className="treeview">
                <a href="#">
                  <i className="fa fa-share"></i> <span>Multilevel</span>
                  <i className="fa fa-angle-left pull-right"></i>
                </a>
                <ul className="treeview-menu">
                  <li><a href="#"><i className="fa fa-circle-o"></i> Level One</a></li>
                  <li>
                    <a href="#"><i className="fa fa-circle-o"></i> Level One <i className="fa fa-angle-left pull-right"></i></a>
                    <ul className="treeview-menu">
                      <li><a href="#"><i className="fa fa-circle-o"></i> Level Two</a></li>
                      <li>
                        <a href="#"><i className="fa fa-circle-o"></i> Level Two <i className="fa fa-angle-left pull-right"></i></a>
                        <ul className="treeview-menu">
                          <li><a href="#"><i className="fa fa-circle-o"></i> Level Three</a></li>
                          <li><a href="#"><i className="fa fa-circle-o"></i> Level Three</a></li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li><a href="#"><i className="fa fa-circle-o"></i> Level One</a></li>
                </ul>
              </li>
              <li><a href="documentation/index.html"><i className="fa fa-book"></i> Documentation</a></li>
              <li className="header">LABELS</li>
              <li><a href="#"><i className="fa fa-circle-o text-danger"></i> Important</a></li>
              <li><a href="#"><i className="fa fa-circle-o text-warning"></i> Warning</a></li>
              <li><a href="#"><i className="fa fa-circle-o text-info"></i> Information</a></li>
              <li><a href="#" onClick={()=> navigate('/superadmin/CreateAdmin',{state: {username:username}})}><i className="fa fa-circle-o text-info"></i> Create Admin</a></li>
              
            </ul>
          </section>
          
        </aside>
  
       
        <Outlet/>


        <footer className="main-footer">
          <div className="pull-right hidden-xs">
            <b>Version</b> 2.0
          </div>
          <strong>Copyright &copy; 2014-2015 <a href="http://almsaeedstudio.com">Almsaeed Studio</a>.</strong> All rights reserved.
        </footer>
      </div>
  
      )


}
export default Superadmin;