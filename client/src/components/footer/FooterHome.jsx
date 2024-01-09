import image from './logo.png';
import React from "react";
import payment from './payment.png';
import '../footer/footer.css';
function FooterHome(){
    return(
        <div className="hiraola-footer_area" style={{borderTop: '1px solid rgba(0, 0, 0, 0.07)',marginTop:'18px'}}>
            <div className="footer-top_area" >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="footer-widgets_info" >
                                <div className="footer-widgets_logo">
                                    <a href="">
                                        <img src={image} alt="" />
                                    </a>
                                </div>
                                <div className='widget-short_desc'>
                                    <p style={{fontFamily:'"Lato", sans-serif',color:'#595959',fontSize:'16px'}}>We are a team of designers and developers that create high quality HTML Template &
                                        Woocommerce, Shopify Theme.
                                    </p>
                                </div>
                                <div className='hiraola-social_link'>
                                    <ul>
                                        <li className='facebook'>
                                            <a href="" id='icon'>
                                                <i className='fab fa-facebook' style={{color:'black'}}></i>
                                            </a>
                                        </li>
                                        <li className='twitter' >
                                            <a href="" id='icon'>
                                                <i className='fab fa-twitter-square' style={{color:'black'}}></i>
                                            </a>
                                        </li>
                                        <li className='google-plus'>
                                            <a href="" id='icon'>
                                                <i className='fab fa-google-plus' style={{color:'black'}}></i>
                                            </a>
                                        </li>
                                        <li className='instagram'>
                                            <a href="" id='icon'>
                                                <i className='fab fa-instagram' style={{color:'black'}}></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-8'>
                            <div className='footer-widgets_area'>
                                <div className="row">
                                    <div className="col-lg-3">
                                        <div className='footer-widgets_title'>
                                            <h6 style={{fontFamily:'"Lato", sans-serif',color:'#333333',fontWeight:'bold'}}>Product</h6>
                                        </div>
                                        <div className='footer-widgets'>
                                            <ul>
                                                <li>
                                                    <a href="" style={{fontFamily:'"Lato", sans-serif',fontSize:'16px',color:'#595959'}}>Prices drop</a>
                                                </li>
                                                <li>
                                                    <a href="" style={{fontFamily:'"Lato", sans-serif',fontSize:'16px',color:'#595959'}}>New products</a>
                                                </li>
                                                <li>
                                                    <a href="" style={{fontFamily:'"Lato", sans-serif',fontSize:'16px',color:'#595959'}}>Best sales</a>
                                                </li>
                                                <li>
                                                    <a href="" style={{fontFamily:'"Lato", sans-serif',fontSize:'16px',color:'#595959'}}>Contact US</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='col-lg-5'>
                                        <div className='footer-widgets_info'>
                                            <div className='footer-widgets_title'>
                                            <h6 style={{fontFamily:'"Lato", sans-serif',color:'#333333',fontWeight:'bold'}}>About Us</h6>
                                            </div>
                                            <div className='widgets-essential_stuff'>
                                                <ul>
                                                    <li className='hiraola-address'>
                                                    <i class="fa-solid fa-location-dot" style={{color:'#cda557'}}></i>
                                                    <span style={{fontFamily:'"Lato", sans-serif',color:'#595959'}}>Address:</span>
                                                    The Barn,Ullenhall, Henley in Arden B578 5CC, England
                                                    
                                                    </li>
                                                    <li className='hiraola-phone'>
                                                    <i class="fa-solid fa-phone" style={{color:'#cda557'}}></i>
                                                        <span style={{fontFamily:'"Lato", sans-serif',color:'#595959'}}>Call Us:</span>
                                                        <a href="" style={{fontFamily:'"Lato", sans-serif',fontSize:'16px',color:'#595959'}}> +123 321 345</a>
                                                    </li>
                                                    <li className='hiraola-Email'>
                                                    <i class="fa fa-envelope" style={{color:'#cda557'}}></i>
                                                        <span style={{fontFamily:'"Lato", sans-serif',color:'#595959'}}>Email:</span>
                                                        <a href="" style={{fontFamily:'"Lato", sans-serif',fontSize:'16px',color:'#595959'}}> info@yourdomain.com</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4'>
                                        <div className='instagram-container footer-widgets_area'>
                                            <div className='footer-widgets_title'>
                                                <h6 style={{fontFamily:'"Lato", sans-serif',color:'#333333',fontWeight:'bold'}}>Sign Up For Newslatter</h6>
                                            </div>
                                            <div className='widget-short_desc'>
                                                <p style={{fontFamily:'"Lato", sans-serif',color:'#595959',fontSize:'16px'}}>Subscribe to our newsletters now and stay up-to-date with new collections</p>
                                            </div>
                                            <div className='newsletter-form_wrap' style={{paddingTop:'8px'}}>
                                                <form action="" className='subscribe-form' id='mc-form'>
                                                    <input type="email" className='newsletter-input' id='mc-email' placeholder='Enter Your Email' style={{color:'#888888'}} />
                                                    <button className='newsletter-btn' id='mc-submit'>
                                                        <i className='fa fa-envelope' ></i>
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='footer-bottom_area'>
                <div className='container'>
                    <div className='footer-bottom_nav'>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="footer-links">
                                    <ul>
                                        <li>
                                            <a href="">Online Shopping</a>
                                        </li>
                                        <li>
                                            <a href="">Promotions</a>
                                        </li>
                                        <li>
                                            <a href="">My Orders</a>
                                        </li>
                                        <li>
                                            <a href="">Help</a>
                                        </li>
                                        <li>
                                            <a href="">Customer Service</a>
                                        </li>
                                        <li>
                                            <a href="">Support</a>
                                        </li>
                                        <li>
                                            <a href="">Support</a>
                                        </li>
                                        <li>
                                            <a href="">Most Populars</a>
                                        </li>
                                        <li>
                                            <a href="">New Arrivals</a>
                                        </li>
                                        <li>
                                            <a href="">Special Products</a>
                                        </li>
                                        <li>
                                            <a href="">Manufacturers</a>
                                        </li>
                                        <li>
                                            <a href="">Manufacturers</a>
                                        </li>
                                        <li>
                                            <a href="">Our Stores</a>
                                        </li>
                                        <li>
                                            <a href="">Shipping</a>
                                        </li>
                                            <li>
                                                <a href="">Shipping</a>
                                            </li>
                                            <li>
                                                <a href="">Payments</a>
                                            </li>
                                            <li>
                                                <a href="">Payments</a>
                                            </li>
                                            <li>
                                                <a href="">Warantee</a>
                                            </li>
                                            <li>
                                                <a href="">Refunds</a>
                                            </li>
                                            <li>
                                                <a href="">Checkout</a>
                                            </li>
                                            <li>
                                                <a href="">Discount</a>
                                            </li>
                                            <li>
                                                <a href="">Refunds</a>
                                            </li>
                                            <li>
                                                <a href="">Policy Shipping</a>
                                            </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="payment">
                                    <a href="">
                                    <img src={payment} alt="" />
                                    </a>
                                </div>
                            </div>
                            <div className='col-lg-12'>
                                <div className="copyright">
                                    <span style={{fontFamily:'"Lato", sans-serif',color:'#595959',fontSize:'16px'}}>
                                    Copyright © 2022 
                                    <a href="" style={{fontFamily:'"Lato", sans-serif',color:'#cda557',fontSize:'16px'}}> Hiraola.</a>
                                    All rights reserved.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FooterHome;