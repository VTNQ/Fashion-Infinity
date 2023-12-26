import React from "react";
import './menu.css';
import us from './image/us.png';
import France from './image/France.png';
import logo from './image/logo.png';
import s from './image/s.png';
function menu() {
    return (
        <header className="block">
            <div style={{ border: '1px solid #e5e5e5' }}>
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
                            <div className="flex justify-end">
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
            <div className="block" style={{ padding: '30px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="header-logo">
                                <a href="">
                                    <img src={logo} />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="flex justify-end">
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
            <div style={{ backgroundColor: '#cda557' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 block static">
                            <div className="flex justify-start">
                                <nav>
                                    <ul className="inline-block pr-[30px]"  >
                                        <li className="inline-block pr-[30px]">
                                            <a href="" id="menu" className="font-bold text-white block uppercase relative" style={{ padding: '18px 0',fontSize:'16px'}}>Home</a>
                                        </li>
                                        <li className="inline-block pr-[30px]">
                                            <a href="" id="menu" className="font-bold text-white block uppercase relative" style={{ padding: '18px 0',fontSize:'16px' }}>Shop</a>
                                            <ul className="hm-megamenu">
                                                <li className="relative" style={{ width: '33.33%' }}>
                                                    <span className="megamenu-title">Shop Page Layout</span>
                                                    <ul>
                                                        <li>
                                                            <a href="" className="block " style={{ lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Grid Fullwidth</a>
                                                        </li>
                                                        <li>
                                                            <a href="" className="block " style={{ lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Left Sidebar</a>
                                                        </li>
                                                        <li>
                                                            <a href="" className="block " style={{ lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Right Sidebar</a>
                                                        </li>
                                                        <li>
                                                            <a href="" className="block " style={{ lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>List Fullwidth</a>
                                                        </li>
                                                        <li>
                                                            <a href="" className="block " style={{ lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>List Left Sidebar</a>
                                                        </li>
                                                        <li>
                                                            <a href="" className="block " style={{ lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>List Right Sidebar</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="relative" style={{ width: '33.33%' }}>
                                                    <span className="megamenu-title">Single Product Style</span>
                                                    <ul>
                                                        <li><a href="" style={{ lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Gallery Left</a></li>
                                                        <li><a href="" style={{ lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Gallery Right</a></li>
                                                        <li><a href="" style={{ lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Tab Style Left</a></li>
                                                        <li><a href="" style={{ lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Tab Style
                                                            Right</a></li>
                                                        <li><a href="" style={{ lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Sticky Left</a></li>
                                                        <li><a href="" style={{ lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Sticky Right</a></li>

                                                    </ul>
                                                </li>
                                                <li className="relative" style={{ width: '33.33%' }}><span className="megamenu-title">Single Product Type</span>
                                                    <ul>
                                                        <li>
                                                            <a href="" style={{ lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Single Product</a>
                                                        </li>
                                                        <li>
                                                            <a href="" style={{ lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Single Product Sale</a>
                                                        </li>
                                                        <li>
                                                            <a href="" style={{ lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Single Product Group</a>
                                                        </li>
                                                        <li>
                                                            <a href="" style={{ lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Single Product Variable</a>
                                                        </li>
                                                        <li>
                                                            <a href="" style={{ lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Single Product Affiliate</a>
                                                        </li>
                                                        <li>
                                                            <a href="" style={{ lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Single Product Slider</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="menu-item_img relative w-[-30px]">

                                                </li>
                                            </ul>
                                        </li>
                                        <li className="inline-block pr-[30px]">
                                            <a href="" id="menu" className="font-bold text-white block uppercase relative" style={{ padding: '18px 0' }}>Blog</a>
                                            <ul className="hm-dropdown">
                                            <li className="relative"><a href="" className="block" style={{padding:'0px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Grid View</a>
                                            <ul className="hm-dropdown hm-sub_dropdown">
                                                <li><a href="" className="block" style={{padding:'0px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Column Two</a></li>
                                                <li><a href="" className="block" style={{padding:'0px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Column Three</a></li>
                                                <li><a href="" className="block" style={{padding:'0px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Left Sidebar</a></li>
                                                <li><a href="" className="block" style={{padding:'0px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Right Sidebar</a></li>
                                            </ul>
                                            </li>
                                            <li className="relative"><a href="" className="block" style={{padding:'10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>List View</a>
                                            <ul className="hm-dropdown hm-sub_dropdown">
                                            <li><a href="" className="block" style={{padding:'10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>List Fullwidth</a></li>
                                            <li><a href="" className="block" style={{padding:'10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>List Left Sidebar</a></li>
                                            <li><a href="" className="block" style={{padding:'10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>List Right Sidebar</a></li>
                                            </ul>
                                            </li>
                                            <li className="relative"><a href="" style={{padding:'10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Blog Details</a>
                                            <ul className="hm-dropdown hm-sub_dropdown">
                                            <li><a href="" className="block" style={{padding:'10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Left Sidebar</a></li>
                                            <li><a href="" className="block" style={{padding:'10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Right Sidebar</a></li>
                                            </ul>
                                            </li>
                                            <li><a href="" className="block" style={{padding:'10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Blog Format</a>
                                            <ul className="hm-dropdown hm-sub_dropdown">
                                            <li className="relative"><a href="" style={{padding:'10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Gallery Format</a></li>
                                            <li className="relative"><a href="" style={{padding:'10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Audio Format</a></li>
                                            <li className="relative"><a href="" style={{padding:'10px 20px', lineHeight: '35px', fontSize: '16px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Video Format</a></li>
                                            </ul>
                                            </li>
                                           
                                            </ul>
                                        </li>

                                        
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default menu;