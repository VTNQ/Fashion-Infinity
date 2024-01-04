import React, {useState} from "react";
import image from './images/user2-160x160.jpg';
import { useLocation, Outlet, Route,Routes, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CreateAdmin from "../superadmin/CreateAdminPage";

import TreeviewMenu from "../superadmin/TreeViewMenu";



function Layout(){
    return(
        
     
<div style={{ fontFamily: "'Bree Serif', serif" }}>

{/* <header className="block">
            <div id="contact" style={{ border: '1px solid #e5e5e5' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="ht-left-area">
                                <div className="header-shipping_area">
                                    <ul>
                                        <li style={{ height: '40px', lineHeight: '35px' }}>
                                            <span style={{ color: '#595959', fontFamily: 'Lato", sans-serif', fontSize: '16px' }}>Telephone Enquiry:</span>
                                            <a href="" style={{ transition: 'all 0.3s ease-in', color: '#595959', textDecoration: 'none', fontFamily: 'Lato", sans-serif', fontSize: '16px' }}>(+123) 123 321 345</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="flex justify-end" >
                                <div className="ht-menu">
                                    <ul className="flex justify-start">
                                        <li className="inline-block relative" style={{ borderRight: '1px solid #e5e5e5', fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '16px', lineHeight: '24px' }}>
                                            <a href="" className="block uppercase text-[12px]" style={{ paddingTop: '0', padding: '8px 15px', color: '#666666' }}>Currency
                                                <i className="fa fa-chevron-down" style={{ paddingLeft: '5px', fontSize: '11px' }}></i>
                                            </a>
                                            <ul className="ht-dropdown ht-currency">
                                                <li className="bg-white" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '16px', lineHeight: '24px' }}>
                                                    <a href="" className="pt-0 block" style={{ borderBottom: '1px solid #e5e5e5', padding: '10px 5px', lineHeight: '25px', fontSize: '12px', fontFamily: '"Lato", sans-serif', color: '#666666', textDecoration: 'none' }}>€ EUR</a>
                                                </li>
                                                <li className="bg-white" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '16px', lineHeight: '24px' }}>
                                                    <a href="" className="pt-0 block" style={{ borderBottom: '1px solid #e5e5e5', padding: '10px 5px', lineHeight: '37px', fontSize: '12px', fontFamily: '"Lato", sans-serif', color: '#666666', textDecoration: 'none' }}>£ Pound Sterling</a>
                                                </li>
                                                <li className="bg-white" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '16px', lineHeight: '24px' }}>
                                                    <a href="" className="pt-0 block" style={{ padding: '10px 5px', lineHeight: '37px', fontSize: '12px', fontFamily: '"Lato", sans-serif', color: '#666666', textDecoration: 'none' }}>$ Us Dollar</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="inline-block relative" style={{ borderRight: '1px solid #e5e5e5', fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '16px', lineHeight: '24px' }}>
                                            <a href="" className="block uppercase text-[12px]" style={{ padding: '8px 15px', color: '#666666' }}>LANGUAGE
                                                <i className="fa fa-chevron-down" style={{ paddingLeft: '5px', fontSize: '11px' }}></i>
                                            </a>
                                            <ul className="ht-dropdown">
                                                <li className="bg-white" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '16px', lineHeight: '24px' }}>
                                                    <a href="" className="pt-0 block" style={{ borderBottom: '1px solid #e5e5e5', padding: '10px 5px', display: 'flex', alignItems: 'center', fontSize: '12px', fontFamily: '"Lato", sans-serif', color: '#666666', textDecoration: 'none', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                                        <img src={us} alt="" style={{ marginRight: '5px' }} />
                                                        English

                                                    </a>
                                                </li>
                                                <li className="bg-white" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '16px', lineHeight: '24px' }}>
                                                    <a href="" className="pt-0 block" style={{ padding: '10px 5px', display: 'flex', alignItems: 'center', fontSize: '12px', fontFamily: '"Lato", sans-serif', color: '#666666', textDecoration: 'none', whiteSpace: 'nowrap', overflow: 'hidden', marginTop: '7px' }}>
                                                        <img src={France} alt="" style={{ marginRight: '5px' }} />
                                                        Français

                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="inline-block relative" style={{ borderRight: '1px solid #e5e5e5', fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '16px', lineHeight: '24px' }}>
                                            <a href="" className="block uppercase text-[12px]" style={{ padding: '8px 15px', color: '#666666' }}>My Account
                                                <i className="fa fa-chevron-down" style={{ paddingLeft: '5px', fontSize: '11px' }}></i>
                                            </a>
                                            <ul className="ht-dropdown ht-currency">
                                                <li className="bg-white" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '16px', lineHeight: '24px' }}>
                                                    <a href="" className="pt-0 block" style={{ borderBottom: '1px solid #e5e5e5', padding: '10px 5px', lineHeight: '25px', fontSize: '12px', fontFamily: '"Lato", sans-serif', color: '#666666', textDecoration: 'none' }}>Login</a>
                                                </li>
                                                <li className="bg-white" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '16px', lineHeight: '24px' }}>
                                                    <a href="" className="pt-0 block" style={{ marginTop: '5px', padding: '10px 5px', lineHeight: '37px', fontSize: '12px', fontFamily: '"Lato", sans-serif', color: '#666666', textDecoration: 'none' }}>Register</a>
                                                </li>

                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="block" id="logo" style={{ padding: '30px' }}>
                <div className="container" id="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="header-logo">
                                <a href="">
                                    <img src={logo} />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="flex justify-end" >
                                <form action="" className="bg-white flex relative" style={{ border: '1px solid #e5e5e5', borderRadius: '5px', minWidth: '680px', height: '45px' }}>
                                    <select name="" id="" className="relative nice-select " style={{ width: 'auto', lineHeight: '43px', height: '43px', margin: '0', border: '0', padding: '0 28px 0 25px', fontSize: '13px', borderRadius: '15px 0 0 15px', display: 'none' }}>
                                        <option value="">All</option>
                                    </select>
                                    <div className="nice-select select-search-category">
                                        <span className="current" style={{ color: '#595959', fontFamily: 'inherit', fontWeight: '400', fontSize: '13px' }}>
                                            All
                                        </span>
                                        <ul className="list">
                                            <li className="option selected">All</li>
                                        </ul>
                                    </div>
                                    <input type="text" className="text-[13px] h-[45px] bg-transparent" style={{ border: 'none', width: '100%', padding: '0 60px 0 33px', outline: 'none' }} placeholder="Enter your search key ..." />
                                    <button className="li-btn" type="submit">
                                        <i className="fa fa-search"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: '#cda557', width: '102%' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 block static">
                            <div className="flex justify-start">
                                <nav>
                                    <ul id="menu"  >
                                        <li className="inline-block pr-[30px]">
                                            <a href="" id="menu" className="font-bold text-white block uppercase relative" style={{ padding: '18px 0', fontSize: '16px' }}>Home</a>
                                        </li>
                                        <li className="inline-block pr-[30px]">
                                            <a href="" id="menu" className="font-bold text-white block uppercase relative" style={{ padding: '18px 0', fontSize: '16px' }}>Product</a>
                                            <ul className="hm-dropdown">
                                                <li className="relative"><a href="" className="block" style={{ padding: '0px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }} onClick={() => navigate('/HomeProduct', { state: { username: username,ID:ID } })} >Product</a>
                                                  
                                                </li>
                                                <li className="relative"><a href="" className="block" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Detail Product</a>
                                                    
                                                </li>
                                               
                                               

                                            </ul>
                                        </li>
                                        <li className="inline-block pr-[30px]">
                                            <a href="" id="menu" className="font-bold text-white block uppercase relative" style={{ padding: '18px 0' }}>Blog</a>
                                            <ul className="hm-dropdown">
                                                <li className="relative"><a href="" className="block" style={{ padding: '0px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Grid View</a>
                                                    <ul className="hm-dropdown hm-sub_dropdown">
                                                        <li><a href="" className="block" style={{ padding: '0px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Column Two</a></li>
                                                        <li><a href="" className="block" style={{ padding: '0px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Column Three</a></li>
                                                        <li><a href="" className="block" style={{ padding: '0px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Left Sidebar</a></li>
                                                        <li><a href="" className="block" style={{ padding: '0px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Right Sidebar</a></li>
                                                    </ul>
                                                </li>
                                                <li className="relative"><a href="" className="block" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>List View</a>
                                                    <ul className="hm-dropdown hm-sub_dropdown">
                                                        <li><a href="" className="block" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>List Fullwidth</a></li>
                                                        <li><a href="" className="block" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>List Left Sidebar</a></li>
                                                        <li><a href="" className="block" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>List Right Sidebar</a></li>
                                                    </ul>
                                                </li>
                                                <li className="relative"><a href="" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Blog Details</a>
                                                    <ul className="hm-dropdown hm-sub_dropdown">
                                                        <li><a href="" className="block" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Left Sidebar</a></li>
                                                        <li><a href="" className="block" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Right Sidebar</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="" className="block" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Blog Format</a>
                                                    <ul className="hm-dropdown hm-sub_last">
                                                        <li className="relative"><a href="" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Gallery Format</a></li>
                                                        <li className="relative"><a href="" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Audio Format</a></li>
                                                        <li className="relative"><a href="" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Video Format</a></li>
                                                    </ul>
                                                </li>

                                            </ul>
                                        </li>
                                        <li className="inline-block pr-[30px]">
                                            <a href="" id="menu" className="font-bold text-white block uppercase relative" style={{ padding: '18px 0' }}>Pages

                                            </a>
                                            <ul className="hm-dropdown">
                                                <li className="relative"><a href="" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>{username}</a></li>
                                                <li className="relative"><a href="" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Login|Register</a></li>
                                                <li className="relative"><a href="" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Wishlist</a></li>
                                                <li className="relative"><a href="" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Cart</a></li>
                                                <li className="relative"><a href="" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Checkout</a></li>
                                                <li className="relative"><a href="" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Compare</a></li>
                                                <li className="relative"><a href="" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>FAQ</a></li>
                                                <li className="relative"><a href="" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>404 Error</a></li>
                                                <li className="relative"><a href="" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Comming soon</a></li>
                                            </ul>
                                        </li>
                                        <li className="inline-block pr-[30px]">
                                            <a href="" id="menu" className="font-bold text-white block uppercase relative" style={{ padding: '18px 0' }}>About US

                                            </a>
                                        </li>
                                        <li className="inline-block pr-[30px]">

                                            <a href="" id="menu" className="font-bold text-white block uppercase relative" style={{ padding: '18px 0' }}>Contact

                                            </a>
                                        </li>
                                        <li className="inline-block pr-[30px]">

                                            <a href="" id="menu" className="font-bold text-white block uppercase relative" style={{ padding: '18px 0' }}>JeweLLery

                                            </a>
                                        </li>


                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4 hidden" id="logo2">
                            <div className="header-logo">
                                <a href="">
                                    <img src={logo2} />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-8 col-sm-8">
                            <div className="flex justify-end" id="reponmenu">
                                <ul style={{ display: 'inline-flex' }}>
                                    <li className="inline-block limenu" >
                                        <a href="" className="block" style={{ width: '60px', height: '60px', lineHeight: '60px', textAlign: 'center', color: '#fff', fontSize: '20px' }}>
                                            <i class="fa-solid fa-heart" style={{ borderColor: 'white' }}></i>
                                        </a>
                                    </li>
                                    <li className="inline-block   limenu" id='navcon' >
                                        <a onClick={()=>isopen(true)} className="block" style={{ width: '60px', height: '60px', lineHeight: '60px', textAlign: 'center', color: '#fff', fontSize: '20px' }}>
                                            <i class="fa fa-navicon" style={{ borderColor: 'white' }}></i>
                                        </a>
                                    </li>
                                    <li className="inline-block limenu" >
                                        <a  className="block" style={{ width: '60px', height: '60px', lineHeight: '60px', textAlign: 'center', color: '#fff', fontSize: '20px' }}>
                                            <i class="fa-solid fa-bag-shopping" onClick={()=>setcartPopup(true)} style={{ color: 'white' }}></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="left-auto right-0 mobile-menu_wrapper" >
                <div className="offcanvas-menu-inner" style={open ? {...closepopup,...popupopen}:closepopup}>
                    <div className="container">
                        <a  className="btnclose" onClick={()=>isopen(false)}>
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </a>
                        <div className="offcanvas-inner_search">
                            <form action="#" className="relative">
                                <input type="text" placeholder="Search for item..." style={{ background: '#e5e5e5', border: '0', height: '40px', lineHeight: '40px', width: '100%', padding: '0 52px 0 15px', outline: 'none', color: '#888888' }} />
                                <button style={{ backgroundColor: 'transparent', color: '#595959', position: 'absolute', top: '10px', right: '20px', border: '0', fontSize: '24px', cursor: 'pointer' }}>
                                    <i className="ion-ios-search-strong"></i>
                                </button>
                            </form>
                        </div>
                        <nav>
                            <ul >
                                <li className="relative h-[100%] " style={{ borderBottom: '1px solid #e5e5e5' }}>

                                    <a style={{ fontSize: '14px', fontWeight: '400', textTransform: 'uppercase', display: 'block', padding: '10px 0' }}>
                                        <span style={{ position: 'relative', fontWeight: '600', color: '#595959', textDecoration: 'none', fontSize: '14px', textTransform: 'uppercase', display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Home</span>
                                    </a>
                                </li>
                                <li className="relative h-[100%] " style={{ borderBottom: '1px solid #e5e5e5' }}>
                                    <span className="menu-expand"  >

                                        {IsExpaned ? (
                                            <i className="fa-solid fa-minus" style={{ transition: 'all ease 2.5s' }}></i>
                                        ) : (
                                            <i class="fa-solid fa-plus" style={{ transition: 'all ease 2.5s' }}></i>
                                        )}

                                    </span>
                                    <a style={{ fontSize: '14px', fontWeight: '400', textTransform: 'uppercase', display: 'block', padding: '10px 0' }}>
                                        <span style={{ position: 'relative', fontWeight: '600', color: '#595959', textDecoration: 'none', fontSize: '14px', textTransform: 'uppercase', display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif', cursor: 'pointer' }} onClick={handleToggle}>Shop</span>
                                    </a>
                                    <ul style={{ paddingLeft: '10px', maxHeight: '100px', overflowY: 'auto', ...popupContentStyle1 }} >
                                        <li className="relative menu-item-has-children">
                                            <span className="menu-expand-submenu">
                                                {Issubmenu ? (
                                                    <i className="fa-solid fa-minus" style={{ transition: 'all ease 2.5s' }}></i>
                                                ) : (
                                                    <i class="fa-solid fa-plus" style={{ transition: 'all ease 2.5s' }}></i>
                                                )}
                                            </span>
                                            <a style={{ textTransform: 'capitalize', fontSize: '13px' }}>
                                                <span style={{ position: 'relative', fontWeight: '600', color: '#595959', textDecoration: 'none', fontSize: '14px', textTransform: 'uppercase', display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif', cursor: 'pointer' }} onClick={handleSubmenu}>Grip view</span>
                                            </a>
                                            <ul style={{ paddingLeft: '10px', maxHeight: '100px', overflowY: 'auto', ...popupsubmenustyle }}>
                                                <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Column Threee</span></a></li>
                                                <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Column Four</span></a></li>
                                                <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Left SideBar</span></a></li>
                                            </ul>
                                        </li>
                                        <li className="relative menu-item-has-children">
                                            <span className="menu-expand-submenu" >
                                                {secondmenu ? (
                                                    <i className="fa-solid fa-minus" style={{ transition: 'all ease 2.5s' }}></i>
                                                ) : (
                                                    <i class="fa-solid fa-plus" style={{ transition: 'all ease 2.5s' }}></i>
                                                )}
                                            </span>
                                            <a style={{ textTransform: 'capitalize', fontSize: '13px' }}>
                                                <span style={{ position: 'relative', fontWeight: '600', color: '#595959', textDecoration: 'none', fontSize: '14px', textTransform: 'uppercase', display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif', cursor: 'pointer' }} onClick={handleSecondMenu}>Shop list</span>
                                            </a>
                                            <ul style={{ paddingLeft: '10px', maxHeight: '100px', overflowY: 'auto', ...popupsecondMenu }}>
                                                <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Full Width</span></a></li>
                                                <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Left Sidebar</span></a></li>
                                            </ul>
                                        </li>
                                        <li className="relative menu-item-has-children">
                                            <span className="menu-expand-submenu">
                                                {singleproduct ? (
                                                    <i className="fa-solid fa-minus" style={{ transition: 'all ease 2.5s' }}></i>
                                                ) : (
                                                    <i class="fa-solid fa-plus" style={{ transition: 'all ease 2.5s' }}></i>
                                                )}
                                            </span>
                                            <a style={{ textTransform: 'capitalize', fontSize: '13px' }}>
                                                <span style={{ position: 'relative', fontWeight: '600', color: '#595959', textDecoration: 'none', fontSize: '14px', textTransform: 'uppercase', display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif', cursor: 'pointer' }} onClick={handlesingleProduct}>Single Product Style</span>
                                            </a>
                                            <ul style={{ paddingLeft: '10px', maxHeight: '100px', overflowY: 'auto', ...singleproductstyle }}>
                                                <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Gallery left</span></a></li>
                                                <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Gallery Right</span></a></li>
                                                <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Tab Style left</span></a></li>
                                                <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Tab Style right</span></a></li>
                                                <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Sticky left</span></a></li>
                                                <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Sticky right</span></a></li>
                                            </ul>
                                        </li>
                                        <li className="relative menu-item-has-children">
                                            <span className="menu-expand-submenu">
                                                {singleproducttype ? (
                                                    <i className="fa-solid fa-minus" style={{ transition: 'all ease 2.5s' }}></i>
                                                ) : (
                                                    <i class="fa-solid fa-plus" style={{ transition: 'all ease 2.5s' }}></i>
                                                )}
                                            </span>
                                            <a style={{ textTransform: 'capitalize', fontSize: '13px' }}>
                                                <span style={{ position: 'relative', fontWeight: '600', color: '#595959', textDecoration: 'none', fontSize: '14px', textTransform: 'uppercase', display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif', cursor: 'pointer' }} onClick={handlesingleProducttype}>Single Product Type</span>
                                            </a>
                                            <ul style={{ paddingLeft: '10px', maxHeight: '100px', overflowY: 'auto', ...popupsingleproducttype }}>
                                                <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Single Product</span></a></li>
                                                <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Single Product Sale</span></a></li>
                                                <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Single Product Group</span></a></li>
                                                <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Single Product Variable</span></a></li>
                                                <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Single Product Affiliate</span></a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li className="relative h-[100%]" style={{ borderBottom: '1px solid #e5e5e5' }}>
                                    <span className="menu-expand"  >
                                        {isBlog ? (
                                            <i className="fa-solid fa-minus" style={{ transition: 'all ease 2.5s' }}></i>
                                        ) : (
                                            <i class="fa-solid fa-plus" style={{ transition: 'all ease 2.5s' }}></i>
                                        )}
                                    </span>
                                    <a style={{ fontSize: '14px', fontWeight: '400', textTransform: 'uppercase', display: 'block', padding: '10px 0' }}>
                                        <span style={{ position: 'relative', fontWeight: '600', color: '#595959', textDecoration: 'none', fontSize: '14px', textTransform: 'uppercase', display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif', cursor: 'pointer' }} onClick={handleBlog}>Blog</span>
                                    </a>
                                    <ul style={{ paddingLeft: '10px', maxHeight: '100px', overflowY: 'auto', ...popupblog }} >
                                        <li className="relative menu-item-has-children">
                                            <span className="menu-expand-submenu">
                                                {Grid ? (
                                                    <i className="fa-solid fa-minus" style={{ transition: 'all ease 2.5s' }}></i>
                                                ) : (
                                                    <i class="fa-solid fa-plus" style={{ transition: 'all ease 2.5s' }}></i>
                                                )}
                                            </span>
                                            <a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} ><span style={{ position: 'relative', fontWeight: '600', color: '#595959', textDecoration: 'none', fontSize: '14px', textTransform: 'uppercase', display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif', cursor: 'pointer' }} onClick={handleGrid}>Grid View</span></a>
                                            <ul style={{ paddingLeft: '10px', maxHeight: '100px', overflowY: 'auto', ...popupgrid }}>
                                                <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Column Two</span></a></li>
                                                <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Column Three</span></a></li>
                                            </ul>
                                        </li>
                                        <li className="relative menu-item-has-children">
                                            <span className="menu-expand-submenu">
                                                {Listview ? (
                                                    <i className="fa-solid fa-minus" style={{ transition: 'all ease 2.5s' }}></i>
                                                ) : (
                                                    <i class="fa-solid fa-plus" style={{ transition: 'all ease 2.5s' }}></i>
                                                )}
                                            </span>
                                            <a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} ><span style={{ position: 'relative', fontWeight: '600', color: '#595959', textDecoration: 'none', fontSize: '14px', textTransform: 'uppercase', display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif', cursor: 'pointer' }} onClick={handleListview}>List View</span></a>
                                            <ul style={{ paddingLeft: '10px', maxHeight: '100px', overflowY: 'auto', ...poppupLisview }}>
                                                <li className="relative "><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }}><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>List FullWidth</span> </a></li>
                                                <li className="relative "><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }}><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>List Left Sidebar</span> </a></li>
                                            </ul>
                                        </li>
                                        <li className="relative menu-item-has-children">
                                            <span className="menu-expand-submenu">
                                                {Blogdetail ? (
                                                    <i className="fa-solid fa-minus" style={{ transition: 'all ease 2.5s' }}></i>
                                                ) : (
                                                    <i class="fa-solid fa-plus" style={{ transition: 'all ease 2.5s' }}></i>
                                                )}
                                            </span>
                                            <a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} ><span style={{ position: 'relative', fontWeight: '600', color: '#595959', textDecoration: 'none', fontSize: '14px', textTransform: 'uppercase', display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif', cursor: 'pointer' }} onClick={handleBlogDetail}>Blog Details</span></a>
                                            <ul style={{ paddingLeft: '10px', maxHeight: '100px', overflowY: 'auto', ...popupBlogDetail }}>
                                                <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Left Sidebar</span></a></li>
                                                <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Right Sidebar</span></a></li>
                                            </ul>
                                        </li>
                                        <li className="relative menu-item-has-children">
                                            <span className="menu-expand-submenu">
                                                {BlogFormat ? (
                                                    <i className="fa-solid fa-minus" style={{ transition: 'all ease 2.5s' }}></i>
                                                ) : (
                                                    <i class="fa-solid fa-plus" style={{ transition: 'all ease 2.5s' }}></i>
                                                )}
                                            </span>
                                            <a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }}><span style={{ position: 'relative', fontWeight: '600', color: '#595959', textDecoration: 'none', fontSize: '14px', textTransform: 'uppercase', display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif', cursor: 'pointer' }} onClick={handleBlogFormat}>Blog Format</span></a>
                                            <ul style={{ paddingLeft: '10px', maxHeight: '100px', overflowY: 'auto', ...popupBlogFormat }}>
                                                <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Gallery Format</span></a></li>
                                                <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Audio Format</span></a></li>
                                                <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Video Format</span></a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li className="relative h-[100%] " style={{ borderBottom: '1px solid #e5e5e5' }}>
                                    <span className="menu-expand"  >
                                        {Page ? (
                                            <i className="fa-solid fa-minus" style={{ transition: 'all ease 2.5s' }}></i>
                                        ) : (
                                            <i class="fa-solid fa-plus" style={{ transition: 'all ease 2.5s' }}></i>
                                        )}
                                    </span>
                                    <a style={{ fontSize: '14px', fontWeight: '400', textTransform: 'uppercase', display: 'block', padding: '10px 0' }}>
                                        <span style={{ position: 'relative', fontWeight: '600', color: '#595959', textDecoration: 'none', fontSize: '14px', textTransform: 'uppercase', display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }} onClick={handlePage}>Pages</span>
                                    </a>
                                    <ul style={{ paddingLeft: '10px', maxHeight: '100px', overflowY: 'auto', ...popupPage }}>
                                    <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>My Account</span></a></li>
                                    <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Login|Register</span></a></li>
                                    <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Wishlist</span></a></li>
                                    <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Cart</span></a></li>
                                    <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>CheckOut</span></a></li>
                                    <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Compare</span></a></li>
                                    <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>FAQ</span></a></li>
                                    <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Error 404</span></a></li>
                                    <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Comming Soon</span></a></li>
                                    </ul>
                                </li>
                                <li className="relative h-[100%] " style={{ borderBottom: '1px solid #e5e5e5' }}>
                                    <span className="menu-expand"  >
                                        {userSetting ? (
                                            <i className="fa-solid fa-minus" style={{ transition: 'all ease 2.5s' }}></i>
                                        ) : (
                                            <i class="fa-solid fa-plus" style={{ transition: 'all ease 2.5s' }}></i>
                                        )}
                                    </span>
                                    <a style={{ fontSize: '14px', fontWeight: '400', textTransform: 'uppercase', display: 'block', padding: '10px 0' }}>
                                        <span style={{ position: 'relative', fontWeight: '600', color: '#595959', textDecoration: 'none', fontSize: '14px', textTransform: 'uppercase', display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif',cursor:'pointer' }} onClick={handleuserSetting}>User Setting</span>
                                    </a>
                                    <ul style={{ paddingLeft: '10px', maxHeight: '100px', overflowY: 'auto', ...popupUsersetting }}>
                                    <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>My Account</span></a></li>
                                    <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Login|Register</span></a></li>
                                    </ul>
                                </li>
                                <li className="relative h-[100%] " style={{ borderBottom: '1px solid #e5e5e5' }}>
                                    <span className="menu-expand"  >
                                        {currency ? (
                                            <i className="fa-solid fa-minus" style={{ transition: 'all ease 2.5s' }}></i>
                                        ) : (
                                            <i class="fa-solid fa-plus" style={{ transition: 'all ease 2.5s' }}></i>
                                        )}
                                    </span>
                                    <a style={{ fontSize: '14px', fontWeight: '400', textTransform: 'uppercase', display: 'block', padding: '10px 0' }}>
                                        <span style={{ position: 'relative', fontWeight: '600', color: '#595959', textDecoration: 'none', fontSize: '14px', textTransform: 'uppercase', display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif',cursor:'pointer' }} onClick={handleCurrency}>Currency</span>
                                    </a>
                                    <ul style={{ paddingLeft: '10px', maxHeight: '100px', overflowY: 'auto', ...popupCurrency }}>
                                    <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>EUR €</span></a></li>
                                    <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>USD $</span></a></li>
                                    </ul>
                                </li>
                                <li className="relative h-[100%] " style={{ borderBottom: '1px solid #e5e5e5' }}>
                                    <span className="menu-expand"  >
                                        {language ? (
                                            <i className="fa-solid fa-minus" style={{ transition: 'all ease 2.5s' }}></i>
                                        ) : (
                                            <i class="fa-solid fa-plus" style={{ transition: 'all ease 2.5s' }}></i>
                                        )}
                                    </span>
                                    <a style={{ fontSize: '14px', fontWeight: '400', textTransform: 'uppercase', display: 'block', padding: '10px 0' }}>
                                        <span style={{ position: 'relative', fontWeight: '600', color: '#595959', textDecoration: 'none', fontSize: '14px', textTransform: 'uppercase', display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif',cursor:'pointer' }} onClick={handleLanguage}>language</span>
                                    </a>
                                    <ul style={{ paddingLeft: '10px', maxHeight: '100px', overflowY: 'auto', ...popuplanguage}}>
                                    <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>English</span></a></li>
                                    <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Français</span></a></li>
                                    <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Romanian</span></a></li>
                                    <li className="relative"><a className="capitalize text-[13px]" style={{ color: '#595959', textDecoration: 'none', fontWeight: '400' }} href=""><span style={{ display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }}>Japanese</span></a></li>
                                    </ul>
                                </li>

                            </ul>
                        </nav>
                    </div>
                </div>

            </div>
            <div id="miniCart">
                <div className="offcanvas-menu-inner" style={cartPopup ? {...closepopup,...popupopen}:closepopup} >
                    <a  className="btn-close"  onClick={()=>setcartPopup(false)} style={{background:'transparent',color:'#595959',top:'0',right:'0',left:'auto'}}>
                    <i class="fa fa-times" aria-hidden="true"></i>
                    </a>
                    <div className="minicart-content">
                        <div className="minicart-heading">
                            <h4 style={{marginBottom:'0',paddingBottom:'25px',fontFamily:'"Lato", sans-serif',color:'#333333',lineHeight:'1',fontWeight:'bold',fontSize:'24px'}}>Shopping Cart</h4>
                        </div>
                        <ul className="minicart-list" style={{maxHeight:'310px',position:'relative',overflow:'auto'}}>
                        {cartData.map((card,index)=>(
                                       <li className="minicart-product flex pb-[30px]">
                                       <a href="" className="product-item_remove absolute " style={{right:'15px',color:'#595959',textDecoration:'none'}}>
                                          
                                       <i class="fa fa-times" aria-hidden="true"></i>
                                       </a>
                                                   <div className="product-item_img" style={{flexBasis:'65px',maxWidth:'65px'}}>
                                                   <img src={`http://127.0.0.1:8000/${card.link}`} alt="" />
                                                   </div>
                                                   <div className="product-item_content">
                                           <a href="" style={{color:'#595959',textDecoration:'none',fontFamily:'"Lato", sans-serif',fontSize:'16px'}}>{card.Name}</a>
                                           <span className="product-item_quantity" style={{display:'block',paddingTop:'10px',fontFamily:'"Lato", sans-serif',color:'#595959',fontSize:'16px'}}>{card.Quality} x {card.Price}</span>
                                                   </div>
                                   </li>
                                   
                                        ))}
                           
                          
                        </ul>
                    </div>
                    <div className="minicart-item_total">
                        <span style={{fontFamily:'"Lato", sans-serif',color:'#595959',fontSize:'16px'}}>Subtotal</span>
                        <span style={{fontFamily:'"Lato", sans-serif',color:'#595959',fontSize:'16px'}} className="ammount"> ${cartData.reduce((total, card) => total + card.Quality * card.Price, 0).toFixed(2)}</span>
                    </div>
                    <div className="minicart-btn_area  pb-[15px]">
                        <a href="" style={{textDecoration:'none'}} className="hiraola-btn hiraola-btn_dark hiraola-btn_fullwidth">Minicart</a>
                    </div>
                    <div className="minicart-btn_area pb-[15px]">
                        <a href="" style={{textDecoration:'none'}} className="hiraola-btn hiraola-btn_dark hiraola-btn_fullwidth">Checkout</a>
                    </div>
                </div>
            </div>
        </header> */}

<section id="header">
 <div class="container">
  <div class="row">
   <div class="header_1 clearfix">
    <div class="col-sm-2">
	 <div class="header_1l text-center clearfix">
	   <h2 class="mgt"><a class="col_1" href="index.html">RD <span class="span_1">JEWELLERS</span>  <span class="span_2">JEWELRY WORLD</span></a></h2>
	 </div>
	</div>
	<div class="col-sm-10">
	 <div class="header_1r clearfix">
	   <div class="header_1ri border_none clearfix">
	     <div class="input-group">
					<input type="text" class="form-control" placeholder="Search"/>
					<span class="input-group-btn">
						<button class="btn btn-primary" type="button">
							<i class="fa fa-search"></i></button>
					</span>
				 </div>
	   </div>
	   <div class="header_1ri clearfix">
	     <span class="span_1"><a class="col_1" href="#"><i class="fa fa-map-marker"></i></a></span>
		 <h5 class="mgt"><a href="#">Store <br/> Locator</a></h5>
	   </div>
	   <div class="header_1ri clearfix">
	     <span class="span_1"><a class="col_1" href="login.html"><i class="fa fa-user"></i></a></span>
		 <h5 class="mgt"><a href="login.html">Account <br/> Login / Sign Up</a></h5>
	   </div>
	   
	   <div class="header_1ri border_none clearfix">
	     <span class="span_1"><a class="col_1" href="#"><i class="fa fa-heart-o"></i></a></span>
		 <h5 class="mgt"><a href="#">My <br/> Wishlist (0)</a></h5>
	   </div>
	 </div>
	</div>
   </div>
  </div>
 </div>
</section>

<section id="menu" class="clearfix cd-secondary-nav">
	<nav class="navbar nav_t">
		<div class="container">
		    <div class="navbar-header page-scroll">
				
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="col_1 navbar-brand" href="index.html">RD <span class="span_1">JEWELLERS</span>  <span class="span_2">JEWELRY WORLD</span></a>
			</div>
			
			<div class="navbar-collapse  " id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav flex flex-row lg:flex sm:hidden">
				
				<li><a class="m_tag active_tab" href="index.html">Home</a></li>
				<li class="dropdown">
					  <a class="m_tag" href="#" data-toggle="dropdown" role="button" aria-expanded="false">Product<span class="caret"></span></a>
					  <ul class="dropdown-menu drop_3" role="menu">
						<li><a href="product.html">Product</a></li>
						<li><a class="border_none" href="detail.html">Product Detail</a></li>
					  </ul>
                    </li>
				<li class="dropdown">
					  <a class="m_tag" href="#" data-toggle="dropdown" role="button" aria-expanded="false">Blog<span class="caret"></span></a>
					  <ul class="dropdown-menu drop_3" role="menu">
						<li><a href="blog.html">Blog</a></li>
						<li><a class="border_none" href="blog_detail.html">Blog Detail</a></li>
					  </ul>
                    </li>
				
				<li><a class="m_tag" href="about.html">About Us</a></li>
				<li><a class="m_tag" href="contact.html">Contact</a></li>
				<li class="dropdown">
					  <a class="m_tag" href="#" data-toggle="dropdown" role="button" aria-expanded="false">Pages<span class="caret"></span></a>
					  <ul class="dropdown-menu drop_3" role="menu">
					    <li><a href="login.html">My Account</a></li>
						<li><a href="cart.html">Shopping Cart</a></li>
						<li><a class="border_none" href="checkout.html">Checkout</a></li>
					  </ul>
                    </li>
				<li class="dropdown dropdown-large">
				<a href="#" class="dropdown-toggle m_tag" data-toggle="dropdown">Dropdown<b class="caret"></b></a>
				
				<ul class="dropdown-menu dropdown-menu-large row">
					<li class="col-sm-2">
						<ul>
							<li class="dropdown-header">BRACELETS</li>
							<li><a href="#">Available</a></li>
							<li><a href="#">Examples</a></li>
							<li><a href="#">Jewelry</a></li>
							<li><a href="#">Aligninment</a></li>
							<li><a href="#">Headers</a></li>
						</ul><br/>
						<ul>
							<li class="dropdown-header">BY METAL</li>
							<li><a href="#">Available</a></li>
							<li><a href="#">Examples</a></li>
							<li><a href="#">Jewelry</a></li>
						</ul>
					</li>
					<li class="col-sm-2">
						<ul>
							<li class="dropdown-header">EARRINGS</li>
							<li><a href="#">Available</a></li>
							<li><a href="#">Examples</a></li>
							<li><a href="#">Jewelry</a></li>
							<li><a href="#">Aligninment</a></li>
							<li><a href="#">Headers</a></li>
						</ul><br/>
						<ul>
							<li class="dropdown-header">BY METAL</li>
							<li><a href="#"> Glyphs</a></li>
							<li><a href="#">Examples</a></li>
							<li><a href="#">Jewelry</a></li>
						</ul>
					</li>
					<li class="col-sm-2">
						<ul>
							<li class="dropdown-header">PENDANTS</li>
							<li><a href="#">Available</a></li>
							<li><a href="#">Examples</a></li>
							<li><a href="#">Jewelry</a></li>
							<li><a href="#">Aligninment</a></li>
							<li><a href="#">Headers</a></li>
						</ul><br/>
						<ul>
							<li class="dropdown-header">BY METAL</li>
							<li><a href="#"> Glyphs</a></li>
							<li><a href="#">Examples</a></li>
							<li><a href="#">Jewelry</a></li>
						</ul>
					</li>
					<li class="col-sm-2">
						<ul>
							<li class="dropdown-header">PENDANTS</li>
							<li><a href="#">Available</a></li>
							<li><a href="#">Examples</a></li>
							<li><a href="#">Jewelry</a></li>
							<li><a href="#">Aligninment</a></li>
							<li><a href="#">Headers</a></li>
						</ul><br/>
						<ul>
							<li class="dropdown-header">BY METAL</li>
							<li><a href="#"> Glyphs</a></li>
							<li><a href="#">Examples</a></li>
							<li><a href="#">Jewelry</a></li>
						</ul>
					</li>
					<li class="col-sm-4">
						<ul>
							<li><a href="#"><img src="img/1.jpg" alt="abc" class="iw"/></a></li>
						</ul><br/>
						<ul>
							<li><a href="#"><img src="img/2.png" alt="abc" class="iw"/></a></li>
						</ul>
					</li>
				</ul>
				
			</li>
			     <li class="dropdown drop_cart">
					  <a class="m_tag" href="#" data-toggle="dropdown" role="button" aria-expanded="false"><i class="glyphicon glyphicon-shopping-cart"></i></a>
					  <ul class="dropdown-menu drop_1" role="menu">
						<li>
						 <div class="drop_1i clearfix">
						  <div class="col-sm-6">
						   <div class="drop_1il clearfix"><h5 class="mgt">2 ITEMS</h5></div>
						  </div>
						  <div class="col-sm-6">
						   <div class="drop_1il text-right clearfix"><h5 class="mgt"><a href="#">VIEW CART</a></h5></div>
						  </div>
						 </div>
						 <div class="drop_1i1 clearfix">
						  <div class="col-sm-6">
						   <div class="drop_1i1l clearfix"><h6 class="mgt bold"><a href="#">Nulla Quis</a> <br/> <span class="normal col_2">1x - $89.00</span></h6></div>
						  </div>
						  <div class="col-sm-4">
						   <div class="drop_1i1r clearfix"><a href="#"><img src="img/22.jpg" class="iw" alt="abc"/></a></div>
						  </div>
						  <div class="col-sm-2">
						   <div class="drop_1i1l text-right clearfix"><h6 class="mgt bold"> <span><i class="fa fa-remove"></i></span></h6></div>
						  </div>
						 </div>
						 <div class="drop_1i1 clearfix">
						  <div class="col-sm-6">
						   <div class="drop_1i1l clearfix"><h6 class="mgt bold"><a href="#">Eget Nulla</a> <br/> <span class="normal col_2">1x - $89.00</span></h6></div>
						  </div>
						  <div class="col-sm-4">
						   <div class="drop_1i1r clearfix"><a href="#"><img src="img/24.png" class="iw" alt="abc"/></a></div>
						  </div>
						  <div class="col-sm-2">
						   <div class="drop_1i1l text-right clearfix"><h6 class="mgt bold"> <span><i class="fa fa-remove"></i></span></h6></div>
						  </div>
						 </div>
						 <div class="drop_1i2 clearfix">
						  <div class="col-sm-6">
						   <div class="drop_1il clearfix"><h5 class="mgt">TOTAL</h5></div>
						  </div>
						  <div class="col-sm-6">
						   <div class="drop_1il text-right clearfix"><h5 class="mgt">$138.00</h5></div>
						  </div>
						 </div>
						 <div class="drop_1i3 text-center clearfix">
						  <div class="col-sm-12">
						   <h5><a class="button_1 block" href="#">CHECKOUT</a></h5>
						   <h5><a class="button block" href="#">VIEW CART</a></h5>
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
	
<section id="center" class="center_home"> 
 <div class="carousel fade-carousel slide" data-ride="carousel" data-interval="4000" id="bs-carousel">

	  <div class="overlay"></div>
	

	  <ol class="carousel-indicators">
		<li data-target="#bs-carousel" data-slide-to="0" class="active"></li>
		<li data-target="#bs-carousel" data-slide-to="1" class=""></li>
		<li data-target="#bs-carousel" data-slide-to="2" class=""></li>
	  </ol>

	  <div class="carousel-inner">
		<div class="item slides active">
		  <div class="slide-1"></div>
		  <div class="hero">
			<h1 class="mgt">Rd Jewellers</h1>
			<hr/>
			<p>Nulla quis sem at nibh elementum imperdiet <br/> lacinia arcu eget nulla!</p>
			<h4><a class="button col" href="#">View More</a></h4>
			<h4><a class="button_1 col" href="#"> Shop Now</a></h4>
		  </div>
		</div>
		<div class="item slides">
		  <div class="slide-2"></div>
		  <div class="hero hero_1">
			<h1 class="mgt">Dolore Magna</h1>
			<hr/>
			<p>Nulla quis sem at nibh elementum imperdiet <br/> lacinia arcu eget nulla!</p>
			<h4><a class="button col" href="#">View More</a></h4>
			<h4><a class="button_1 col" href="#"> Shop Now</a></h4>
		  </div>
		</div>
		<div class="item slides">
		  <div class="slide-3"></div>
		  <div class="hero">
			<h1 class="mgt">Fusce  Tellus </h1>
			<hr/>
			<p>Nulla quis sem at nibh elementum imperdiet <br/> lacinia arcu eget nulla!</p>
			<h4><a class="button col" href="#">View More</a></h4>
			<h4><a class="button_1 col" href="#"> Shop Now</a></h4>
		  </div>
		</div>
	  </div> 
	</div>
</section>

<section id="list">
 <div class="container">
  <div class="row">
   <div class="list_1 clearfix">
     <div class="col-sm-9">
	  <div class="list_1l clearfix">
	    <h3 class="mgt"><span class="col_1">Best Selling</span> Collections</h3>
		<p>We craft exceptionally fashionable & trendy designs to make you look beautiful every day.</p>
	  </div>
	 </div>
	 <div class="col-sm-3">
	  <div class="list_1r text-right clearfix">
	    <h5 class="mgt"><a class="button mgt" href="#">VIEW ALL</a></h5>
	  </div>
	 </div>
   </div>
   <div class="list_2 clearfix">
     <div id="carousel-example" class="carousel slide" data-ride="carousel">
            
            <div class="carousel-inner">
                <div class="item active">
					<div class="col-sm-3">
					  <div class="list_2i clearfix mgt-center">
					    <a href="#"><img src="img/6.jpg" class="iw" alt="abc"/></a>
						<h3><i class="fa fa-rupee"></i> 4566</h3>
						<h4><a class="col_1" href="#">Nibh Elementum</a></h4>
						<h6>Product Code: 12LDSJECR03</h6>
					  </div>
					</div>
					<div class="col-sm-3">
					  <div class="list_2i clearfix mgt-center">
					    <a href="#"><img src="img/7.jpg" class="iw" alt="abc"/></a>
						<h3><i class="fa fa-rupee"></i> 4986</h3>
						<h4><a class="col_1" href="#">Fusce Nec Tellus</a></h4>
						<h6>Product Code: 12LDSJECR03</h6>
					  </div>
					</div>
					<div class="col-sm-3">
					  <div class="list_2i clearfix mgt-center">
					    <a href="#"><img src="img/8.jpg" class="iw" alt="abc"/></a>
						<h3><i class="fa fa-rupee"></i> 5696</h3>
						<h4><a class="col_1" href="#">Nulla Quis Sem</a></h4>
						<h6>Product Code: 12LDSJECR03</h6>
					  </div>
					</div>
					<div class="col-sm-3">
					  <div class="list_2i clearfix mgt-center">
					    <a href="#"><img src="img/9.jpg" class="iw" alt="abc"/></a>
						<h3><i class="fa fa-rupee"></i> 5836</h3>
						<h4><a class="col_1" href="#">Vestibulum Lacinia</a></h4>
						<h6>Product Code: 12LDSJECR03</h6>
					  </div>
					</div>
                </div>
                <div class="item">
					<div class="col-sm-3">
					  <div class="list_2i clearfix mgt-center">
					    <a href="#"><img src="img/10.jpg" class="iw" alt="abc"/></a>
						<h3><i class="fa fa-rupee"></i> 4566</h3>
						<h4><a class="col_1" href="#">Nibh Elementum</a></h4>
						<h6>Product Code: 12LDSJECR03</h6>
					  </div>
					</div>
					<div class="col-sm-3">
					  <div class="list_2i clearfix mgt-center">
					    <a href="#"><img src="img/11.jpg" class="iw" alt="abc"/></a>
						<h3><i class="fa fa-rupee"></i> 4986</h3>
						<h4><a class="col_1" href="#">Fusce Nec Tellus</a></h4>
						<h6>Product Code: 12LDSJECR03</h6>
					  </div>
					</div>
					<div class="col-sm-3">
					  <div class="list_2i clearfix mgt-center">
					    <a href="#"><img src="img/12.jpg" class="iw" alt="abc"/></a>
						<h3><i class="fa fa-rupee"></i> 5696</h3>
						<h4><a class="col_1" href="#">Nulla Quis Sem</a></h4>
						<h6>Product Code: 12LDSJECR03</h6>
					  </div>
					</div>
					<div class="col-sm-3">
					  <div class="list_2i clearfix mgt-center">
					    <a href="#"><img src="img/13.png" class="iw" alt="abc"/></a>
						<h3><i class="fa fa-rupee"></i> 5836</h3>
						<h4><a class="col_1" href="#">Vestibulum Lacinia</a></h4>
						<h6>Product Code: 12LDSJECR03</h6>
					  </div>
					</div>
                </div>
            </div>
        </div>
	 <div class="feature_2_last text-center clearfix">
            <div class="col-sm-12">
        
                <div class="controls">
                    <a class="left fa fa-chevron-left btn btn-success" href="#carousel-example" data-slide="prev"></a><a class="right fa fa-chevron-right btn btn-success" href="#carousel-example" data-slide="next"></a>
                </div>
            </div>
        </div>
   </div>
  </div>
 </div>
</section>

<section id="price">
 <div class="container">
  <div class="row">
   <div class="price_1 text-center clearfix">
       <div class="col-sm-12">
	     <h3 class="mgt"> Stylish Jewellery  <span class="col_1">Affordable Price </span></h3>
		<p>Discover our exclusive jewellery in versatile designs that fits every budget with poise and glamour.</p>
	   </div>
   </div>
   <div class="price_2 clearfix">
       <div class="col-sm-3">
        <div class="price_2i clearfix">
		 <div class="col-sm-8">
		  <h5>Shop Under <br/> <span class="bold"><i class="fa fa-rupee"></i> 5,000</span></h5>
		 </div>
		 <div class="col-sm-4 space_all">
		  <img src="img/6.jpg" class="iw" height="80" alt="abc"/>
		 </div>
		</div>
	   </div>
	   <div class="col-sm-3">
        <div class="price_2i clearfix">
		 <div class="col-sm-8">
		  <h5>Shop Under <br/> <span class="bold"><i class="fa fa-rupee"></i> 7,000 -12,000</span></h5>
		 </div>
		 <div class="col-sm-4 space_all">
		  <img src="img/11.jpg" class="iw" height="80" alt="abc"/>
		 </div>
		</div>
	   </div>
	   <div class="col-sm-3">
        <div class="price_2i clearfix">
		 <div class="col-sm-8">
		  <h5>Shop Under <br/> <span class="bold"><i class="fa fa-rupee"></i> 12,000 -15,000</span></h5>
		 </div>
		 <div class="col-sm-4 space_all">
		  <img src="img/8.jpg" class="iw" height="80" alt="abc"/>
		 </div>
		</div>
	   </div>
	   <div class="col-sm-3">
        <div class="price_2i clearfix">
		 <div class="col-sm-8">
		  <h5>Shop Above <br/> <span class="bold"><i class="fa fa-rupee"></i> 30,000</span></h5>
		 </div>
		 <div class="col-sm-4 space_all">
		  <img src="img/9.jpg" class="iw" height="80" alt="abc"/>
		 </div>
		</div>
	   </div>
   </div>
  </div>
 </div>
</section>

<section id="list_o">
 <div class="container">
  <div class="row">
   <div class="price_1 text-center clearfix">
       <div class="col-sm-12">
	     <h3 class="mgt">Shop by  <span class="col_1">Your Preference</span></h3>
		<p>Explore our unique daily wear jewellery designs that reflect elegance and exclusivity.</p>
	   </div>
   </div>
   <div class="list_2 clearfix">
     <div id="carousel-example_1" class="carousel slide" data-ride="carousel">

            <div class="carousel-inner">
                <div class="item active">
					<div class="col-sm-3">
					  <div class="list_2i text-center clearfix">
					    <a href="#"><img src="img/6.jpg" class="iw" alt="abc"/></a>
						<h5><a class="button_1" href="#">SHOP NOW</a></h5>
					  </div>
					</div>
					<div class="col-sm-3">
					  <div class="list_2i text-center clearfix">
					    <a href="#"><img src="img/7.jpg" class="iw" alt="abc"/></a>
				       <h5><a class="button" href="#">SHOP NOW</a></h5>
					  </div>
					</div>
					<div class="col-sm-3">
					  <div class="list_2i text-center clearfix">
					    <a href="#"><img src="img/8.jpg" class="iw" alt="abc"/></a>
				        <h5><a class="button_1" href="#">SHOP NOW</a></h5>
					  </div>
					</div>
					<div class="col-sm-3">
					  <div class="list_2i text-center clearfix">
					    <a href="#"><img src="img/9.jpg" class="iw" alt="abc"/></a>
				        <h5><a class="button" href="#">SHOP NOW</a></h5>
					  </div>
					</div>
                </div>
                <div class="item">
					<div class="col-sm-3">
					  <div class="list_2i text-center clearfix">
					    <a href="#"><img src="img/10.jpg" class="iw" alt="abc"/></a>
				        <h5><a class="button_1" href="#">SHOP NOW</a></h5>
					  </div>
					</div>
					<div class="col-sm-3">
					  <div class="list_2i text-center clearfix">
					    <a href="#"><img src="img/11.jpg" class="iw" alt="abc"/></a>
				        <h5><a class="button" href="#">SHOP NOW</a></h5>
					  </div>
					</div>
					<div class="col-sm-3">
					  <div class="list_2i text-center clearfix">
					    <a href="#"><img src="img/12.jpg" class="iw" alt="abc"/></a>
					    <h5><a class="button_1" href="#">SHOP NOW</a></h5>
					  </div>
					</div>
					<div class="col-sm-3">
					  <div class="list_2i text-center clearfix">
					    <a href="#"><img src="img/13.png" class="iw" alt="abc"/></a>
					    <h5><a class="button" href="#">SHOP NOW</a></h5>
					  </div>
					</div>
                </div>
            </div>
        </div>
	 <div class="feature_2_last text-center clearfix">
            <div class="col-sm-12">
         
                <div class="controls">
                    <a class="left fa fa-chevron-left btn btn-success" href="#carousel-example_1" data-slide="prev"></a><a class="right fa fa-chevron-right btn btn-success" href="#carousel-example_1" data-slide="next"></a>
                </div>
            </div>
        </div>
   </div>
  </div>
 </div>
</section>

<section id="popular">
 <div class="container">
  <div class="row">
   <div class="price_1 text-center clearfix">
       <div class="col-sm-12">
	     <h3 class="mgt">Jewellery That  <span class="col_1">You May Love</span></h3>
		<p>Explore our unique daily wear jewellery designs that reflect elegance and exclusivity.</p>
	   </div>
   </div>
   <div class="popular_1 clearfix">
    <div class="col-sm-4">
	 <div class="popular_1i clearfix">
	  <h4 class="mgt text-center">Online Exclusive </h4>
	  <h6 class="mgt-center">14 KT Lorem Jewellery </h6>
	  <img src="img/14.jpg" class="iw" alt="abc"/>
	  <div class="popular_1ii clearfix">
	   <div class="col-sm-6 space_left">
	    <h5><i class="fa fa-rupee"></i> 2266 Onwards</h5>
	   </div>
	   <div class="col-sm-6 space_all">
	    <h5 class="text-right"><a class="button_1 mgt" href="#">SHOP NOW</a></h5>
	   </div>
	  </div>
	 </div>
	</div>
	<div class="col-sm-4">
	 <div class="popular_1i bg_1 clearfix">
	  <h4 class="mgt text-center">Latest Collection </h4>
	  <h6 class="mgt-center">14 KT Lorem Jewellery </h6>
	  <img src="img/15.jpg" class="iw" alt="abc"/>
	  <div class="popular_1ii clearfix">
	   <div class="col-sm-6 space_left">
	    <h5><i class="fa fa-rupee"></i> 2746 Onwards</h5>
	   </div>
	   <div class="col-sm-6 space_all">
	    <h5 class="text-right"><a class="button_1 mgt" href="#">SHOP NOW</a></h5>
	   </div>
	  </div>
	 </div>
	</div>
	<div class="col-sm-4">
	 <div class="popular_1i clearfix">
	  <h4 class="mgt text-center">Trending Jewellery </h4>
	  <h6 class="mgt-center">14 KT Lorem Jewellery </h6>
	  <img src="img/16.jpg" class="iw" alt="abc"/>
	  <div class="popular_1ii clearfix">
	   <div class="col-sm-6 space_left">
	    <h5><i class="fa fa-rupee"></i> 2986 Onwards</h5>
	   </div>
	   <div class="col-sm-6 space_all">
	    <h5 class="text-right"><a class="button_1 mgt" href="#">SHOP NOW</a></h5>
	   </div>
	  </div>
	 </div>
	</div>
   </div>
   <div class="popular_1 clearfix">
    <div class="col-sm-4">
	 <div class="popular_1i clearfix">
	  <h4 class="mgt text-center">Online Exclusive </h4>
	  <h6 class="mgt-center">14 KT Lorem Jewellery </h6>
	  <img src="img/17.jpg" class="iw" alt="abc"/>
	  <div class="popular_1ii clearfix">
	   <div class="col-sm-6 space_left">
	    <h5><i class="fa fa-rupee"></i> 2266 Onwards</h5>
	   </div>
	   <div class="col-sm-6 space_all">
	    <h5 class="text-right"><a class="button_1 mgt" href="#">SHOP NOW</a></h5>
	   </div>
	  </div>
	 </div>
	</div>
	<div class="col-sm-4">
	 <div class="popular_1i bg_1 clearfix">
	  <h4 class="mgt text-center">Latest Collection </h4>
	  <h6 class="mgt-center">14 KT Lorem Jewellery </h6>
	  <img src="img/18.jpg" class="iw" alt="abc"/>
	  <div class="popular_1ii clearfix">
	   <div class="col-sm-6 space_left">
	    <h5><i class="fa fa-rupee"></i> 2746 Onwards</h5>
	   </div>
	   <div class="col-sm-6 space_all">
	    <h5 class="text-right"><a class="button_1 mgt" href="#">SHOP NOW</a></h5>
	   </div>
	  </div>
	 </div>
	</div>
	<div class="col-sm-4">
	 <div class="popular_1i clearfix">
	  <h4 class="mgt text-center">Trending Jewellery </h4>
	  <h6 class="mgt-center">14 KT Lorem Jewellery </h6>
	  <img src="img/19.jpg" class="iw" alt="abc"/>
	  <div class="popular_1ii clearfix">
	   <div class="col-sm-6 space_left">
	    <h5><i class="fa fa-rupee"></i> 2986 Onwards</h5>
	   </div>
	   <div class="col-sm-6 space_all">
	    <h5 class="text-right"><a class="button_1 mgt" href="#">SHOP NOW</a></h5>
	   </div>
	  </div>
	 </div>
	</div>
   </div>
  </div>
 </div>
</section>

<section id="list_o_1">
 <div class="container">
  <div class="row">
   <div class="list_1 clearfix">
     <div class="col-sm-9">
	  <div class="list_1l clearfix">
	    <h3 class="mgt">Explore  <span class="col_1">The New Arrivals </span></h3>
		<p>We craft exceptionally fashionable &amp; trendy designs to make you look beautiful every day.</p>
	  </div>
	 </div>
	 <div class="col-sm-3">
	  <div class="list_1r text-right clearfix">
	    <h5 class="mgt"><a class="button mgt" href="#">VIEW ALL</a></h5>
	  </div>
	 </div>
   </div>
   <div class="list_2 clearfix">
     <div id="carousel-example_2" class="carousel slide" data-ride="carousel">

            <div class="carousel-inner">
                <div class="item active">
					<div class="col-sm-3">
					  <div class="list_2i clearfix mgt-center">
					    <a href="#"><img src="img/6.jpg" class="iw" alt="abc"/></a>
						<h3><i class="fa fa-rupee"></i> 4566</h3>
						<h4><a class="col_1" href="#">Nibh Elementum</a></h4>
						<h6>Product Code: 12LDSJECR03</h6>
					  </div>
					</div>
					<div class="col-sm-3">
					  <div class="list_2i clearfix mgt-center">
					    <a href="#"><img src="img/7.jpg" class="iw" alt="abc"/></a>
						<h3><i class="fa fa-rupee"></i> 4986</h3>
						<h4><a class="col_1" href="#">Fusce Nec Tellus</a></h4>
						<h6>Product Code: 12LDSJECR03</h6>
					  </div>
					</div>
					<div class="col-sm-3">
					  <div class="list_2i clearfix mgt-center">
					    <a href="#"><img src="img/8.jpg" class="iw" alt="abc"/></a>
						<h3><i class="fa fa-rupee"></i> 5696</h3>
						<h4><a class="col_1" href="#">Nulla Quis Sem</a></h4>
						<h6>Product Code: 12LDSJECR03</h6>
					  </div>
					</div>
					<div class="col-sm-3">
					  <div class="list_2i clearfix mgt-center">
					    <a href="#"><img src="img/9.jpg" class="iw" alt="abc"/></a>
						<h3><i class="fa fa-rupee"></i> 5836</h3>
						<h4><a class="col_1" href="#">Vestibulum Lacinia</a></h4>
						<h6>Product Code: 12LDSJECR03</h6>
					  </div>
					</div>
                </div>
                <div class="item">
					<div class="col-sm-3">
					  <div class="list_2i clearfix mgt-center">
					    <a href="#"><img src="img/10.jpg" class="iw" alt="abc"/></a>
						<h3><i class="fa fa-rupee"></i> 4566</h3>
						<h4><a class="col_1" href="#">Nibh Elementum</a></h4>
						<h6>Product Code: 12LDSJECR03</h6>
					  </div>
					</div>
					<div class="col-sm-3">
					  <div class="list_2i clearfix mgt-center">
					    <a href="#"><img src="img/11.jpg" class="iw" alt="abc"/></a>
						<h3><i class="fa fa-rupee"></i> 4986</h3>
						<h4><a class="col_1" href="#">Fusce Nec Tellus</a></h4>
						<h6>Product Code: 12LDSJECR03</h6>
					  </div>
					</div>
					<div class="col-sm-3">
					  <div class="list_2i clearfix mgt-center">
					    <a href="#"><img src="img/12.jpg" class="iw" alt="abc"/></a>
						<h3><i class="fa fa-rupee"></i> 5696</h3>
						<h4><a class="col_1" href="#">Nulla Quis Sem</a></h4>
						<h6>Product Code: 12LDSJECR03</h6>
					  </div>
					</div>
					<div class="col-sm-3">
					  <div class="list_2i clearfix mgt-center">
					    <a href="#"><img src="img/13.png" class="iw" alt="abc"/></a>
						<h3><i class="fa fa-rupee"></i> 5836</h3>
						<h4><a class="col_1" href="#">Vestibulum Lacinia</a></h4>
						<h6>Product Code: 12LDSJECR03</h6>
					  </div>
					</div>
                </div>
            </div>
        </div>
	 <div class="feature_2_last text-center clearfix">
            <div class="col-sm-12">
              
                <div class="controls">
                    <a class="left fa fa-chevron-left btn btn-success" href="#carousel-example_2" data-slide="prev"></a><a class="right fa fa-chevron-right btn btn-success" href="#carousel-example_2" data-slide="next"></a>
                </div>
            </div>
        </div>
   </div>
  </div>
 </div>
</section>

<section id="collection_o">
 <div class="container">
  <div class="row">
   <div class="collect_1 clearfix">
    <div class="col-sm-8">
	 <div class="collect_1l clearfix">
	  <div class="col-sm-5 space_all">
	   <div class="collect_1ll clearfix">
	    <h4 class="mgt col_1">Trending Product</h4>
		<h3>Maybe You’ve Earned it</h3>
		<h5><a class="button_1 mgt" href="#"> Shop Now</a></h5>
	   </div>
	  </div>
	  <div class="col-sm-7 space_right">
	   <div class="collect_1lr clearfix">
	    <a href="#"><img src="img/20.jpg" alt="abc" class="iw"/>/</a>
	   </div>
	  </div>
	 </div>
	</div>
    <div class="col-sm-4">
	 <div class="collect_1ln clearfix">
	  <img src="img/21.jpg" class="iw" alt="abc"/>
	 </div>
	</div>
   </div>
  </div>
 </div>
</section>

<section id="explore">
 <div class="explore_m clearfix">
  <div class="container">
   <div class="row">
    <div class="explore_1 clearfix">
	 <div class="col-sm-6">
	  <div class="explore_1l text-center clearfix">
	   <h1 class="mgt col_1">Wedding Collection</h1>
	   <p class="col">We craft exceptionally fashionable & trendy designs to make you look beautiful every day.</p>
	   <h3 class="col_3">Starting at <i class="fa fa-rupee"></i> 49342 Only</h3>
	   <h4><a class="button_1" href="#">EXPLORE OUR COLLECTIONS</a></h4>
	  </div>
	 </div>
	 <div class="col-sm-6">
	  <div class="explore_1r clearfix"></div>
	 </div>
	</div>
   </div>
  </div>
 </div>
</section>

<section id="list_last">
 <div class="container">
  <div class="row">
   <div class="price_1 text-center clearfix">
       <div class="col-sm-12">
	     <h3 class="mgt">The Rd Jewellers  <span class="col_1">Advantage</span></h3>
		<p>Explore our unique daily wear jewellery designs that reflect elegance and exclusivity.</p>
	   </div>
   </div>
   <div class="list_last_1 clearfix">
    <div class="col-sm-3 space_all">
	 <div class="list_last_1i text-center clearfix">
	  <span><i class="fa fa-thumbs-o-up"></i></span>
	  <h4><a href="#">Quality Jewelry</a></h4>
	  <hr/>
	  <p>We are proud to realease the best products for our beloved customers.</p>
	  <h5 class="normal"><a class="button_1" href="#">READ MORE</a></h5>
	 </div>
	</div>
	<div class="col-sm-3 space_all">
	 <div class="list_last_1i text-center clearfix">
	  <span><i class="fa fa-rocket"></i></span>
	  <h4><a href="#">Delivery</a></h4>
	  <hr/>
	  <p>We are proud to realease the best products for our beloved customers.</p>
	  <h5 class="normal"><a class="button_1" href="#">READ MORE</a></h5>
	 </div>
	</div>
	<div class="col-sm-3 space_all">
	 <div class="list_last_1i text-center clearfix">
	  <span><i class="fa fa-leaf"></i></span>
	  <h4><a href="#">Best Service</a></h4>
	  <hr/>
	  <p>We are proud to realease the best products for our beloved customers.</p>
	  <h5 class="normal"><a class="button_1" href="#">READ MORE</a></h5>
	 </div>
	</div>
	<div class="col-sm-3 space_all">
	 <div class="list_last_1i text-center clearfix">
	  <span><i class="fa fa-money"></i></span>
	  <h4><a href="#">Guarantee</a></h4>
	  <hr/>
	  <p>We are proud to realease the best products for our beloved customers.</p>
	  <h5 class="normal"><a class="button_1" href="#">READ MORE</a></h5>
	 </div>
	</div>
   </div>
  </div>
 </div>
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

<section id="footer_bottom">
 <div class="container">
  <div class="row">
   <div class="footer_b clearfix">
	 <div class="col-sm-5 space_left">
	  <div class="footer_br clearfix">
	  <ul class="mgt">
	   <li>
		<a href="#">Our Policy</a>
		<a href="#">Shipping</a>
		<a href="#">Terms & Conditions</a>
		<a class="border_none" href="#">Refund Policy</a>
	   </li>
	  </ul>
	 </div>
	 </div>
	 <div class="col-sm-7 space_left">
	  <div class="footer_bl  text-right clearfix">
	   <p>© 2013 Your Website Name. All Rights Reserved | Design by <a class="col_1" href="http://www.templateonweb.com">TemplateOnWeb</a></p>
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