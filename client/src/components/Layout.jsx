import React, {useState} from "react";
import image from '../images/user2-160x160.jpg';
import { useLocation, Outlet, Route,Routes, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CreateAdmin from "./superadmin/CreateAdminPage";

import TreeviewMenu from "./superadmin/TreeViewMenu";
import  "../layoutFolder/global.css";
import  "../layoutFolder/index.css";
import '../layoutFolder/bootstrap.min.css';
import '../layoutFolder/fontawesome.css';


function Layout(){
    return(
        
     
<div>
	
<section id="header">
 <div className="container">
  <div className="row">
   <div className="header_1 clearfix">
    <div className="col-sm-2">
	 <div className="header_1l text-center clearfix">
	   <h2 className="mgt"><a className="col_1" href="index.html">RD <span className="span_1">JEWELLERS</span>  <span className="span_2">JEWELRY WORLD</span></a></h2>
	 </div>
	</div>
	<div className="col-sm-10">
	 <div className="header_1r clearfix">
	   <div className="header_1ri border_none clearfix">
	     <div className="input-group">
					<input type="text" className="form-control" placeholder="Search"/>
					<span className="input-group-btn">
						<button className="btn btn-primary" type="button">
							<i className="fa fa-search"></i></button>
					</span>
				 </div>
	   </div>
	   <div className="header_1ri clearfix">
	     <span className="span_1"><a className="col_1" href="#"><i className="fa fa-map-marker"></i></a></span>
		 <h5 className="mgt"><a href="#">Store <br /> Locator</a></h5>
	   </div>
	   <div className="header_1ri clearfix">
	     <span className="span_1"><a className="col_1" href="login.html"><i className="fa fa-user"></i></a></span>
		 <h5 className="mgt"><a href="login.html">Account <br/> Login / Sign Up</a></h5>
	   </div>
	   
	   <div className="header_1ri border_none clearfix">
	     <span className="span_1"><a className="col_1" href="#"><i className="fa fa-heart-o"></i></a></span>
		 <h5 className="mgt"><a href="#">My <br/> Wishlist (0)</a></h5>
	   </div>
	 </div>
	</div>
   </div>
  </div>
 </div>
</section>

<section id="menu" className="clearfix cd-secondary-nav">
	<nav className="navbar nav_t">
		<div className="container">
		    <div className="navbar-header page-scroll">
				<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span className="sr-only">Toggle navigation</span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
				</button>
				<a className="col_1 navbar-brand" href="index.html">RD <span className="span_1">JEWELLERS</span>  <span className="span_2">JEWELRY WORLD</span></a>
			</div>
		
			<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul className="nav navbar-nav">
				
				<li><a className="m_tag active_tab" href="index.html">Home</a></li>
				<li className="dropdown">
					  <a className="m_tag" href="#" data-toggle="dropdown" role="button" aria-expanded="false">Product<span className="caret"></span></a>
					  <ul className="dropdown-menu drop_3" role="menu">
						<li><a href="product.html">Product</a></li>
						<li><a className="border_none" href="detail.html">Product Detail</a></li>
					  </ul>
                    </li>
				<li className="dropdown">
					  <a className="m_tag" href="#" data-toggle="dropdown" role="button" aria-expanded="false">Blog<span className="caret"></span></a>
					  <ul className="dropdown-menu drop_3" role="menu">
						<li><a href="blog.html">Blog</a></li>
						<li><a className="border_none" href="blog_detail.html">Blog Detail</a></li>
					  </ul>
                    </li>
				
				<li><a className="m_tag" href="about.html">About Us</a></li>
				<li><a className="m_tag" href="contact.html">Contact</a></li>
				<li className="dropdown">
					  <a className="m_tag" href="#" data-toggle="dropdown" role="button" aria-expanded="false">Pages<span className="caret"></span></a>
					  <ul className="dropdown-menu drop_3" role="menu">
					    <li><a href="login.html">My Account</a></li>
						<li><a href="cart.html">Shopping Cart</a></li>
						<li><a className="border_none" href="checkout.html">Checkout</a></li>
					  </ul>
                    </li>
				<li className="dropdown dropdown-large">
				<a href="#" className="dropdown-toggle m_tag" data-toggle="dropdown">Dropdown<b className="caret"></b></a>
				
				<ul className="dropdown-menu dropdown-menu-large row">
					<li className="col-sm-2">
						<ul>
							<li className="dropdown-header">BRACELETS</li>
							<li><a href="#">Available</a></li>
							<li><a href="#">Examples</a></li>
							<li><a href="#">Jewelry</a></li>
							<li><a href="#">Aligninment</a></li>
							<li><a href="#">Headers</a></li>
						</ul><br/>
						<ul>
							<li className="dropdown-header">BY METAL</li>
							<li><a href="#">Available</a></li>
							<li><a href="#">Examples</a></li>
							<li><a href="#">Jewelry</a></li>
						</ul>
					</li>
					<li className="col-sm-2">
						<ul>
							<li className="dropdown-header">EARRINGS</li>
							<li><a href="#">Available</a></li>
							<li><a href="#">Examples</a></li>
							<li><a href="#">Jewelry</a></li>
							<li><a href="#">Aligninment</a></li>
							<li><a href="#">Headers</a></li>
						</ul><br/>
						<ul>
							<li className="dropdown-header">BY METAL</li>
							<li><a href="#"> Glyphs</a></li>
							<li><a href="#">Examples</a></li>
							<li><a href="#">Jewelry</a></li>
						</ul>
					</li>
					<li className="col-sm-2">
						<ul>
							<li className="dropdown-header">PENDANTS</li>
							<li><a href="#">Available</a></li>
							<li><a href="#">Examples</a></li>
							<li><a href="#">Jewelry</a></li>
							<li><a href="#">Aligninment</a></li>
							<li><a href="#">Headers</a></li>
						</ul><br/>
						<ul>
							<li className="dropdown-header">BY METAL</li>
							<li><a href="#"> Glyphs</a></li>
							<li><a href="#">Examples</a></li>
							<li><a href="#">Jewelry</a></li>
						</ul>
					</li>
					<li className="col-sm-2">
						<ul>
							<li className="dropdown-header">PENDANTS</li>
							<li><a href="#">Available</a></li>
							<li><a href="#">Examples</a></li>
							<li><a href="#">Jewelry</a></li>
							<li><a href="#">Aligninment</a></li>
							<li><a href="#">Headers</a></li>
						</ul><br/>
						<ul>
							<li className="dropdown-header">BY METAL</li>
							<li><a href="#"> Glyphs</a></li>
							<li><a href="#">Examples</a></li>
							<li><a href="#">Jewelry</a></li>
						</ul>
					</li>
					<li className="col-sm-4">
						<ul>
							<li><a href="#"><img src="img/1.jpg" alt="abc" className="iw"/></a></li>
						</ul><br/>/
						<ul>
							<li><a href="#"><img src="img/2.png" alt="abc" className="iw"/></a></li>
						</ul>
					</li>
				</ul>
				
			</li>
			     <li className="dropdown drop_cart">
					  <a className="m_tag" href="#" data-toggle="dropdown" role="button" aria-expanded="false"><i className="glyphicon glyphicon-shopping-cart"></i></a>
					  <ul className="dropdown-menu drop_1" role="menu">
						<li>
						 <div className="drop_1i clearfix">
						  <div className="col-sm-6">
						   <div className="drop_1il clearfix"><h5 className="mgt">2 ITEMS</h5></div>
						  </div>
						  <div className="col-sm-6">
						   <div className="drop_1il text-right clearfix"><h5 className="mgt"><a href="#">VIEW CART</a></h5></div>
						  </div>
						 </div>
						 <div className="drop_1i1 clearfix">
						  <div className="col-sm-6">
						   <div className="drop_1i1l clearfix"><h6 className="mgt bold"><a href="#">Nulla Quis</a> <br/> <span className="normal col_2">1x - $89.00</span></h6></div>
						  </div>
						  <div className="col-sm-4">
						   <div className="drop_1i1r clearfix"><a href="#"><img src="img/22.jpg" className="iw" alt="abc"/></a></div>
						  </div>
						  <div className="col-sm-2">
						   <div className="drop_1i1l text-right clearfix"><h6 className="mgt bold"> <span><i className="fa fa-remove"></i></span></h6></div>
						  </div>
						 </div>
						 <div className="drop_1i1 clearfix">
						  <div className="col-sm-6">
						   <div className="drop_1i1l clearfix"><h6 className="mgt bold"><a href="#">Eget Nulla</a> <br/> <span className="normal col_2">1x - $89.00</span></h6></div>
						  </div>
						  <div className="col-sm-4">
						   <div className="drop_1i1r clearfix"><a href="#"><img src="img/24.png" className="iw" alt="abc"/></a></div>
						  </div>
						  <div className="col-sm-2">
						   <div className="drop_1i1l text-right clearfix"><h6 className="mgt bold"> <span><i className="fa fa-remove"></i></span></h6></div>
						  </div>
						 </div>
						 <div className="drop_1i2 clearfix">
						  <div className="col-sm-6">
						   <div className="drop_1il clearfix"><h5 className="mgt">TOTAL</h5></div>
						  </div>
						  <div className="col-sm-6">
						   <div className="drop_1il text-right clearfix"><h5 className="mgt">$138.00</h5></div>
						  </div>
						 </div>
						 <div className="drop_1i3 text-center clearfix">
						  <div className="col-sm-12">
						   <h5><a className="button_1 block" href="#">CHECKOUT</a></h5>
						   <h5><a className="button block" href="#">VIEW CART</a></h5>
						  </div>
						 </div>
						</li>
					  </ul>
                    </li>
			</ul>
		    	

			</div>
			
		</div>
		
	</nav>
	
	</section>
	



	<section id="footer">
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
              <li className="text-black ">
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