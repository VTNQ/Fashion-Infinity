import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import MenuHomepage from "../menu/MenuHomepage";
import './About.css';
import image from './1.png';
import beck from './beck.png';
import FooterHome from "../footer/FooterHome";
function About(){
return(
    <div>
         <MenuHomepage/>
         <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <h2 className="font-bold" style={{ color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontSize: '36px', marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif' }}>Other</h2>
                        <ul>
                            <li>
                                <a href="" style={{ textDecoration: 'none' }}>Home</a>
                            </li>
                            <li className="active">About US</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="about-us-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-7 d-flex align-items-center">
                            <div className="overview-content">
                                <h2>Welcome To <span>Hiraola's</span> Store!</h2>
                                <p className="short_desc">We Provide Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Repudiandae nisi fuga facilis, consequuntur, maiores eveniet voluptatum, omnis possimus
                                temporibus aspernatur nobis animi in exercitationem vitae nulla! Adipisci ullam illum quisquam.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, nulla veniam? Magni aliquid
                                asperiores magnam. Veniam ex tenetur.</p>
                                <div className="hiraola-about-us_btn-area">
                                    <a href="" className="about-us_btn">Shop Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-5">
                            <div className="overview-img text-center img-hover_effect">
                                <a href="">
                                    <img src={image} className="img-full"  alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="team-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section_title-2">
                                <h4 style={{fontFamily:'"Lato", sans-serif',color:'#333333',fontWeight:'700',fontSize:'24px'}}>Our Team</h4>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="team-member">
                                <div className="team-thumb img-hover_effect">
                                    <a href="">
                                        <img src={beck} alt="" />
                                    </a>
                                </div>
                                <div className="team-content text-center">
                                    <h3>Timothy Beck</h3>
                                    <p>IT Expert</p>
                                    <a href="" style={{color:"#595959",textDecoration:'none'}}>info@example.com</a>
                                    <div className="hiraola-social_link">
                                        <ul>
                                            <li className="facebook">
                                                <a href="" target="_blank">
                                                    <i className="fab fa-facebook" style={{color:'#595959'}}></i>
                                                </a>
                                            </li>
                                            <li className="twitter">
                                                <a href="" target="_blank">
                                                    <i className="fab fa-twitter-square" style={{color:'#595959'}}></i>
                                                </a>
                                            </li>
                                            <li className="youtube">
                                                <a href="" target="_blank">
                                                    <i className="fab fa-youtube" style={{color:'#595959'}}></i>
                                                </a>
                                            </li>
                                            <li className="google-plus">
                                                <a href="" target="_blank">
                                                    <i className="fab fa-google-plus" style={{color:'#595959'}}></i>
                                                </a>
                                            </li>
                                            <li className="instagram">
                                                <a href="" target="_blank">
                                                    <i className="fab fa-instagram" style={{color:'#595959'}}></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="team-member">
                                <div className="team-thumb img-hover_effect">
                                    <a href="">
                                        <img src={beck} alt="" />
                                    </a>
                                </div>
                                <div className="team-content text-center">
                                    <h3>Timothy Beck</h3>
                                    <p>IT Expert</p>
                                    <a href="" style={{color:"#595959",textDecoration:'none'}}>info@example.com</a>
                                    <div className="hiraola-social_link">
                                        <ul>
                                            <li className="facebook">
                                                <a href="" target="_blank">
                                                    <i className="fab fa-facebook" style={{color:'#595959'}}></i>
                                                </a>
                                            </li>
                                            <li className="twitter">
                                                <a href="" target="_blank">
                                                    <i className="fab fa-twitter-square" style={{color:'#595959'}}></i>
                                                </a>
                                            </li>
                                            <li className="youtube">
                                                <a href="" target="_blank">
                                                    <i className="fab fa-youtube" style={{color:'#595959'}}></i>
                                                </a>
                                            </li>
                                            <li className="google-plus">
                                                <a href="" target="_blank">
                                                    <i className="fab fa-google-plus" style={{color:'#595959'}}></i>
                                                </a>
                                            </li>
                                            <li className="instagram">
                                                <a href="" target="_blank">
                                                    <i className="fab fa-instagram" style={{color:'#595959'}}></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="team-member">
                                <div className="team-thumb img-hover_effect">
                                    <a href="">
                                        <img src={beck} alt="" />
                                    </a>
                                </div>
                                <div className="team-content text-center">
                                    <h3>Timothy Beck</h3>
                                    <p>IT Expert</p>
                                    <a href="" style={{color:"#595959",textDecoration:'none'}}>info@example.com</a>
                                    <div className="hiraola-social_link">
                                        <ul>
                                            <li className="facebook">
                                                <a href="" target="_blank">
                                                    <i className="fab fa-facebook" style={{color:'#595959'}}></i>
                                                </a>
                                            </li>
                                            <li className="twitter">
                                                <a href="" target="_blank">
                                                    <i className="fab fa-twitter-square" style={{color:'#595959'}}></i>
                                                </a>
                                            </li>
                                            <li className="youtube">
                                                <a href="" target="_blank">
                                                    <i className="fab fa-youtube" style={{color:'#595959'}}></i>
                                                </a>
                                            </li>
                                            <li className="google-plus">
                                                <a href="" target="_blank">
                                                    <i className="fab fa-google-plus" style={{color:'#595959'}}></i>
                                                </a>
                                            </li>
                                            <li className="instagram">
                                                <a href="" target="_blank">
                                                    <i className="fab fa-instagram" style={{color:'#595959'}}></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="team-member">
                                <div className="team-thumb img-hover_effect">
                                    <a href="">
                                        <img src={beck} alt="" />
                                    </a>
                                </div>
                                <div className="team-content text-center">
                                    <h3>Timothy Beck</h3>
                                    <p>IT Expert</p>
                                    <a href="" style={{color:"#595959",textDecoration:'none'}}>info@example.com</a>
                                    <div className="hiraola-social_link">
                                        <ul>
                                            <li className="facebook">
                                                <a href="" target="_blank">
                                                    <i className="fab fa-facebook" style={{color:'#595959'}}></i>
                                                </a>
                                            </li>
                                            <li className="twitter">
                                                <a href="" target="_blank">
                                                    <i className="fab fa-twitter-square" style={{color:'#595959'}}></i>
                                                </a>
                                            </li>
                                            <li className="youtube">
                                                <a href="" target="_blank">
                                                    <i className="fab fa-youtube" style={{color:'#595959'}}></i>
                                                </a>
                                            </li>
                                            <li className="google-plus">
                                                <a href="" target="_blank">
                                                    <i className="fab fa-google-plus" style={{color:'#595959'}}></i>
                                                </a>
                                            </li>
                                            <li className="instagram">
                                                <a href="" target="_blank">
                                                    <i className="fab fa-instagram" style={{color:'#595959'}}></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterHome/>
    </div>
)
}
export default About