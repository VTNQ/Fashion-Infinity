import React, {useState} from "react";
import image from '../images/user2-160x160.jpg';
import { useLocation, Outlet, Route,Routes, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CreateAdmin from "./superadmin/CreateAdminPage";
import MenuHomepage from "./menu/MenuHomepage";
import TreeviewMenu from "./superadmin/TreeViewMenu";
const featureEnabled = window.location.pathname.includes("/layout");
if(featureEnabled){
	require("../layoutFolder/global.css");
	require('../layoutFolder/bootstrap.min.css');
	require('../layoutFolder/index.css');
	require('../layoutFolder/fontawesome.css');
}



function Layout(){
    return(
        
     
<div>



	<MenuHomepage/>


	<Outlet/>

	<section id="footer" className="mt-[8%]">
 <div class="container">
  <div class="row">
   <div class="footer_1 mgt clearfix">
    <div class="col-sm-2">
	 <div class="footer_1i clearfix">
	  <h4 class="mgt col_3">Our Story</h4>
	  <h5><a class="hvr-forward col" href="#">The Rd Jewellers</a></h5>
	  <h5><a class="hvr-forward col" href="#">CSR Activities</a></h5>
	  <h5><a class="hvr-forward col" href="#">Get In Touch</a></h5>
	  <h5><a class="hvr-forward col" href="#">Career</a></h5>
	 </div>
	</div>
	<div class="col-sm-2">
	 <div class="footer_1i clearfix">
	  <h4 class="mgt col_3">Our Collections</h4>
	  <h5><a class="hvr-forward col" href="#">Wedding</a></h5>
	  <h5><a class="hvr-forward col" href="#">Diamond</a></h5>
	  <h5><a class="hvr-forward col" href="#">Kids</a></h5>
	  <h5><a class="hvr-forward col" href="#">Semper</a></h5>
	  <h5><a class="hvr-forward col" href="#">Porta</a></h5>
	  <h5><a class="hvr-forward col" href="#">Popular</a></h5>
	 </div>
	</div>
	<div class="col-sm-2">
	 <div class="footer_1i clearfix">
	  <h4 class="mgt col_3">Our Categories</h4>
	  <h5><a class="hvr-forward col" href="#">Premium</a></h5>
	  <h5><a class="hvr-forward col" href="#">Silver</a></h5>
	  <h5><a class="hvr-forward col" href="#">Diamond</a></h5>
	 </div>
	</div>
	<div class="col-sm-6">
	 <div class="footer_1i clearfix">
	  <h4 class="mgt col_3">Join Our Newsletter</h4>
	  <p class="col">Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitursodales ligula in libero.Sed dignissim lacinia nunc.</p>
	  <div class="input-group">
					<input type="text" class="form-control" placeholder="Search"/>
					<span class="input-group-btn">
						<button class="btn btn-primary" type="button">
							<i class="fa fa-long-arrow-right"></i></button>
					</span>
	  </div>
	 </div>
	</div>
   </div>
   <div class="footer_1 clearfix">
    <div class="col-sm-2">
	 <div class="footer_1i clearfix">
	  <h4 class="mgt col_3">Our Properties</h4>
	  <h5><a class="hvr-forward col" href="#">Semper Porta</a></h5>
	  <h5><a class="hvr-forward col" href="#">Nec Tellus</a></h5>
	 </div>
	</div>
	<div class="col-sm-2">
	 <div class="footer_1i clearfix">
	  <h4 class="mgt col_3">Advertisement</h4>
	  <h5><a class="hvr-forward col" href="#">Print Media</a></h5>
	  <h5><a class="hvr-forward col" href="#">TV Commercials</a></h5>
	  <h5><a class="hvr-forward col" href="#">Photo Gallery</a></h5>
	  <h5><a class="hvr-forward col" href="#">Video Gallery</a></h5>
	  <h5><a class="hvr-forward col" href="#">Press Room</a></h5>
	 </div>
	</div>
	<div class="col-sm-2">
	 <div class="footer_1i clearfix">
	  <h4 class="mgt col_3">Follow Us</h4>
	  <h5><a class="hvr-forward col" href="#">Facebook</a></h5>
	  <h5><a class="hvr-forward col" href="#">Twitter</a></h5>
	  <h5><a class="hvr-forward col" href="#">Instagram</a></h5>
	  <h5><a class="hvr-forward col" href="#">Youtube</a></h5>
	 </div>
	</div>
	<div class="col-sm-6">
	 <div class="footer_1i clearfix">
	  <h4 class="mgt col_3">Social Links</h4>
		 <ul class="social-network social-circle">
							<li><a href="#" class="icoRss" title="Rss"><i class="fa fa-rss"></i></a></li>
							<li><a href="#" class="icoFacebook" title="Facebook"><i class="fa fa-facebook"></i></a></li>
							<li><a href="#" class="icoTwitter" title="Twitter"><i class="fa fa-twitter"></i></a></li>
							<li><a href="#" class="icoGoogle" title="Google +"><i class="fa fa-google-plus"></i></a></li>
							<li><a href="#" class="icoLinkedin" title="Linkedin"><i class="fa fa-linkedin"></i></a></li>
		 </ul>
	 </div>
	</div>
   </div>
  </div>
 </div>
</section>

<section id="footer_bottom" className="bg-white text-light ">
  <div className="container">
    <div className="row">
      <div className="footer_b clearfix flex">
        <div className="col-sm-5">
          <div className="footer_br">
            <ul className="list-unstyled mgt flex ">
              <li className="text-black">
                <a href="#" >Our Policy</a>
              </li>
              <li >
                <a href="#" >Shipping</a>
              </li>
              <li>
                <a href="#" >Terms & Conditions</a>
              </li>
              <li>
                <a href="#" >Refund Policy</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm-7">
          <div className="footer_bl text-right">
            <p className="mb-0">© 2013 Your Website Name. All Rights Reserved | Design by <a className="col_1" href="http://www.templateonweb.com">TemplateOnWeb</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

	
</div>



    )
}
export default Layout;