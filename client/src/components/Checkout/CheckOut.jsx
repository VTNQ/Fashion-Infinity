import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import { Magnifier } from 'react-image-magnify';
import { Slide, ToastContainer, toast } from 'react-toastify';
import '../menu/menu.css';
import Slider from 'react-slick';
import Swal from 'sweetalert2';
import us from '../menu/image/us.png';
import France from '../menu/image/France.png';
import 'slick-carousel/slick/slick.css';
import logo from '../menu/image/logo.png';
import s from '../menu/image/s.png';
import './Check.css';
import product from '../menu/image/product.png';
import product2 from '../menu/image/product2.png';
import product3 from '../menu/image/product3.png';
import logo2 from '../menu/image/logorespon.png';

import axios from "axios";

function CheckOut() {
    const [Account,setAccount]=useState([]);
    const location = useLocation();
    const ID = location.state?.ID || '';
    const [formData, setFormData] = useState({
        Address:'',
        FullName:'',
        City:'',
        PostCode:'',
        Phone:'',
        Email:''
    });
    useEffect(() => {
        const fetchMinicart = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/DefaultOrder/${ID}`);
                if (response.ok) {
                    const data = await response.json();
                    setAccount(data);
    
                    // Set formData based on Account values
                    setFormData({
                        Address: data.Address || '', // Set to empty string if null
                        FullName: data.FullName || '',
                        City: data.City || '',
                        PostCode: data.PostCode || '',
                        Phone: data.Phone || ''
                    });
                    setselectedItem(data.Country || 'Bangladesh')
                } else {
                    console.error("Failed to fetch cart data");
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        };
        fetchMinicart();
    }, [ID]);
    const [selectedItem,setselectedItem]=useState("Bangladesh");
    const [shipItem,setshipItem]=useState("Bangladesh");
    const [checkout,setcheckout]=useState([]);
    useEffect(()=>{
        const fetchMinicart=async()=>{
            try{
                const response=await fetch(`http://127.0.0.1:8000/api/ShowMiniCart/${ID}`);
                if(response.ok){
                    const data=await response.json();
                    setcheckout(data);
                }else {
                    console.error("Failed to fetch cart data");
                }
            }catch(error){
                console.error('Error during fetch:', error);
            }
        }
        fetchMinicart();
    },[])
    
    const IDProduct = location.state?.IDProduct || '';
    const [isCouponVisible,setIsCouponVisible]=useState(false);
    const [combo,setcombo]=useState(false);
    const [ship,setship]=useState(false);
    const caculateTotalPrice=(quanlity,Price)=>{
        return (quanlity*Price).toFixed(2);
    }
    const [paypal,setpaypal]=useState(false);
    const [delivery,setdelivery]=useState(true);
    const buttondelivery=()=>{
        setdelivery(!delivery);
        setpaypal(false)
    }
    const buttonpaypal=()=>{
        setdelivery(false);
        setpaypal(!paypal);
        
    }
    const [ischeckbox,setischeckbox]=useState(false);
    const [Direct,setDirect]=useState(false);
     const [Payment,setPayment]=useState(false);
     const AddCard = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/Addorder", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                
                body: JSON.stringify(
                    paypal
                      ? {
                          id_Account: ID,
                          Country: selectedItem,
                          FullName: formData.FullName,
                          City: formData.City,
                          PostCode: formData.PostCode,
                          Phone: formData.Phone,
                          Address: formData.Address,
                          TotalPrice: checkout.reduce((total, card) => total + card.TotalQuantity * card.Price, 0).toFixed(2),
                          id_product: checkout.map(card => card.ID),
                          Quality: checkout.map(card => card.TotalQuantity),
                          payments:'Paypal'
                        }
                      : {
                          id_Account: ID,
                          Country: selectedItem,
                          FullName: formData.FullName,
                          City: formData.City,
                          PostCode: formData.PostCode,
                          Phone: formData.Phone,
                          Address: formData.Address,
                          TotalPrice: checkout.reduce((total, card) => total + card.TotalQuantity * card.Price, 0).toFixed(2),
                          id_product: checkout.map(card => card.ID),
                          Quality: checkout.map(card => card.TotalQuantity),
                          payments:'Payment on delivery'
                        }
                  ),
            });
            console.log(checkout.map(card => card.ID))
            const responseData=await response.json();
            if(response.ok){
                Swal.fire({
                    icon: "success",
                    title: "Add category successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  const response = await fetch(`http://127.0.0.1:8000/api/DefaultOrder/${ID}`);
                  
                  if (response.ok) {
                      const data = await response.json();
                      setAccount(data);
      
                      // Set formData based on Account values
                      setFormData({
                          Address: data.Address || '', // Set to empty string if null
                          FullName: data.FullName || '',
                          City: data.City || '',
                          PostCode: data.PostCode || '',
                          Phone: data.Phone || ''
                      });
                      setselectedItem(data.Country || 'Bangladesh')
                      const responsedata=await fetch(`http://127.0.0.1:8000/api/ShowMiniCart/${ID}`);
                if(response.ok){
                    const data=await responsedata.json();
                    setcheckout(data);
                }
            }
        }
           
        } catch (error) {
            console.error('Error adding card:', error);
        }
    };
    
    // Helper function to show success message using SweetAlert
    const showSuccessMessage = () => {
        Swal.fire({
            icon: 'success',
            title: 'Add Successful',
            showConfirmButton: false,
            timer: 1500,
        });
    };
    
    // Helper function to reset the form fields and selected item after success
    const resetFormAndSelectedItem = () => {
        setFormData({
            id_Account: ID,
            Country: selectedItem,
            FullName: formData.FullName,
            City: formData.City,
            PostCode: formData.PostCode,
            Phone: formData.Phone,
            Address: formData.Address,
            TotalPrice: checkout.reduce((total, card) => total + card.TotalQuantity * card.Price, 0).toFixed(2),
            id_product: checkout.map(card => card.ID),
            Quality: checkout.map(card => card.TotalQuantity),
        });
    
        // Assuming selectedItem is a state variable that needs to be reset
        selectedItem = '';
    };
    
    
     const tooglePayment=()=>{
        setPayment(!Payment);
     }
    const toogleDirect=()=>{
        setDirect(!Direct);
    }
    const toggleCouponVisible=()=>{
        setIsCouponVisible(!isCouponVisible);
    }
    const tooglecheckbox=()=>{
        setischeckbox(!ischeckbox);
    }
    const showship=()=>{
        setship(!ship);
    }
    const comboshow=()=>{
        setcombo(!combo);
    }
  
    const [IsExpaned, setIsExpanded] = useState(false);
    const [Issubmenu, setIsubmenu] = useState(false);
    const [isBlog, setisblod] = useState(false);
    const [cartPopup, setcartPopup] = useState(false);
    const [secondmenu, SetSecondmenu] = useState(false);
  
    const navigate = useNavigate();
   
    const [singleproduct, setsingleproduct] = useState(false);
    const [Listview, setListView] = useState(false);

    const username = location.state?.username || 'Default Username';
    const [Page, setPage] = useState(false);
    const [Blogdetail, setblogDetail] = useState(false);
    const [BlogFormat, setBlogFormat] = useState(false);
    const [Grid, setGrid] = useState(false);
    const [userSetting, setuserSetting] = useState(false);
    const [detail, setDetail] = useState(null);
    const [cartData, setCardData] = useState([]);
    const [currency, setcurrency] = useState(false);
    const[curent,setcurent]=useState(false);
    const [language, setlanguage] = useState(false);
    const [open, isopen] = useState(false);
    const [isHovered, setisHovered] = useState(false);
    const [showMainImage, setShowMainImage] = useState(false);
    const handleItemHistory=(value)=>{
        setshipItem(value);
        setship(false);
    }
    const handleItemClick=(value)=>{
        setselectedItem(value);
        setcombo(false)
    }
    const popupopen = {
        left: 'auto',
        right: '0',
        visibility: 'visible',
        opacity: '1',
        padding: '105px 29px 0px',
        zIndex:'1'

    }
    const closepopup = {
        left: 'auto',
        right: '0',
        visibility: 'hidden',
        opacity: '0',
        padding: '105px 0 0',
        transition: 'all ease 0.5s',

    }
    const handleLanguage = () => {
        setlanguage(!language);
    }
    const handleCurrency = () => {
        setcurrency(!currency);
    }
    const handleBlogFormat = () => {
        setBlogFormat(!BlogFormat);
    }
    const handleuserSetting = () => {
        setuserSetting(!userSetting)
    }
    const popupCurrency = {
        display: currency ? 'block' : 'none',
        animation: 'cloudAnimation 0.5s'
    }
    const popuplanguage = {
        display: language ? 'block' : 'none',
        animation: 'cloudAnimation 0.5s'
    }
    const handlePage = () => {
        setPage(!Page);
    }
    const popupUsersetting = {
        display: userSetting ? 'block' : 'none',
        animation: 'cloudAnimation 0.5s'
    }
    const popupPage = {
        display: Page ? 'block' : 'none',
        animation: 'cloudAnimation 0.5s'
    }
    const handleBlogDetail = () => {
        setblogDetail(!Blogdetail);
    }
    const popupBlogFormat = {
        display: BlogFormat ? 'block' : 'none',
        animation: 'cloudAnimation 0.5s'
    }
    const popupBlogDetail = {
        display: Blogdetail ? 'block' : 'none',
        animation: 'cloudAnimation 0.5s'
    }
    const handleListview = () => {
        setListView(!Listview);
    }
    const poppupLisview = {
        display: Listview ? 'block' : 'none',
        animation: 'cloudAnimation 0.5s'
    }
    const handleGrid = () => {
        setGrid(!Grid);
    }

    const popupgrid = {
        display: Grid ? 'block' : 'none',
        animation: 'cloudAnimation 0.5s'
    }
    const [singleproducttype, setsingleproducttype] = useState(false);
    const handlesingleProducttype = () => {
        setsingleproducttype(!singleproducttype)
    }
    const handleBlog = () => {
        setisblod(!isBlog);
    }
    const popupblog = {
        display: isBlog ? 'block' : 'none',
        animation: 'cloudAnimation 0.5s'
    }
    const handlesingleProduct = () => {
        setsingleproduct(!singleproduct);
    }
    const handleSecondMenu = () => {
        SetSecondmenu(!secondmenu);
    }
    const handleSubmenu = () => {
        setIsubmenu(!Issubmenu);
    }
    const popupsingleproducttype = {
        display: singleproducttype ? 'block' : 'none',
        animation: 'cloudAnimation 0.5s',
    }
    const singleproductstyle = {
        display: singleproduct ? 'block' : 'none',
        animation: 'cloudAnimation 0.5s',
    }
    const popupsecondMenu = {
        display: secondmenu ? 'block' : 'none',
        animation: 'cloudAnimation 0.5s',
    }
    const popupsubmenustyle = {
        display: Issubmenu ? 'block' : 'none',
        animation: 'cloudAnimation 0.5s',
    }
    const handleToggle = () => {
        setIsExpanded(!IsExpaned);

    }
    const sliderRef = useRef(null);


    const popupContentStyle = {

        display: IsExpaned ? 'block' : 'none',
        animation: 'cloudAnimation 0.5s',// Default animation
    };
    return (
        
        <div>
           
            <header className="block">

                <div id="contact" style={{ border: '1px solid #e5e5e5' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5">
                                <div className="ht-left-area">
                                    <div className="header-shipping_area">
                                        <ul>
                                            <li style={{ height: '40px', lineHeight: '35px' }}>
                                                <span style={{ color: '#595959', fontFamily: 'Lato", sans-serif', fontSize: '15px' }}>Telephone Enquiry:</span>
                                                <a href="" style={{ transition: 'all 0.3s ease-in', color: '#595959', textDecoration: 'none', fontFamily: 'Lato", sans-serif', fontSize: '15px' }}>(+123) 123 321 345</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="flex justify-end" >
                                    <div className="ht-menu">
                                        <ul className="flex justify-start">
                                            <li className="inline-block relative" style={{ borderRight: '1px solid #e5e5e5', fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '15px', lineHeight: '24px' }}>
                                                <a href="" className="block uppercase text-[12px]" style={{ paddingTop: '0', padding: '8px 15px', color: '#666666' }}>Currency
                                                    <i className="fa fa-chevron-down" style={{ paddingLeft: '5px', fontSize: '11px' }}></i>
                                                </a>
                                                <ul className="ht-dropdown ht-currency">
                                                    <li className="bg-white" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '15px', lineHeight: '24px' }}>
                                                        <a href="" className="pt-0 block" style={{ borderBottom: '1px solid #e5e5e5', padding: '10px 5px', lineHeight: '25px', fontSize: '12px', fontFamily: '"Lato", sans-serif', color: '#666666', textDecoration: 'none' }}>€ EUR</a>
                                                    </li>
                                                    <li className="bg-white" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '15px', lineHeight: '24px' }}>
                                                        <a href="" className="pt-0 block" style={{ borderBottom: '1px solid #e5e5e5', padding: '10px 5px', lineHeight: '37px', fontSize: '12px', fontFamily: '"Lato", sans-serif', color: '#666666', textDecoration: 'none' }}>£ Pound Sterling</a>
                                                    </li>
                                                    <li className="bg-white" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '15px', lineHeight: '24px' }}>
                                                        <a href="" className="pt-0 block" style={{ padding: '10px 5px', lineHeight: '37px', fontSize: '12px', fontFamily: '"Lato", sans-serif', color: '#666666', textDecoration: 'none' }}>$ Us Dollar</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="inline-block relative" style={{ borderRight: '1px solid #e5e5e5', fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '15px', lineHeight: '24px' }}>
                                                <a href="" className="block uppercase text-[12px]" style={{ padding: '8px 15px', color: '#666666' }}>LANGUAGE
                                                    <i className="fa fa-chevron-down" style={{ paddingLeft: '5px', fontSize: '11px' }}></i>
                                                </a>
                                                <ul className="ht-dropdown">
                                                    <li className="bg-white" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '15px', lineHeight: '24px' }}>
                                                        <a href="" className="pt-0 block" style={{ borderBottom: '1px solid #e5e5e5', padding: '10px 5px', display: 'flex', alignItems: 'center', fontSize: '12px', fontFamily: '"Lato", sans-serif', color: '#666666', textDecoration: 'none', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                                            <img src={us} alt="" style={{ marginRight: '5px' }} />
                                                            English

                                                        </a>
                                                    </li>
                                                    <li className="bg-white" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '15px', lineHeight: '24px' }}>
                                                        <a href="" className="pt-0 block" style={{ padding: '10px 5px', display: 'flex', alignItems: 'center', fontSize: '12px', fontFamily: '"Lato", sans-serif', color: '#666666', textDecoration: 'none', whiteSpace: 'nowrap', overflow: 'hidden', marginTop: '7px' }}>
                                                            <img src={France} alt="" style={{ marginRight: '5px' }} />
                                                            Français

                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="inline-block relative" style={{ borderRight: '1px solid #e5e5e5', fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '15px', lineHeight: '24px' }}>
                                                <a href="" className="block uppercase text-[12px]" style={{ padding: '8px 15px', color: '#666666' }}>My Account
                                                    <i className="fa fa-chevron-down" style={{ paddingLeft: '5px', fontSize: '11px' }}></i>
                                                </a>
                                                <ul className="ht-dropdown ht-currency">
                                                    <li className="bg-white" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '15px', lineHeight: '24px' }}>
                                                        <a href="" className="pt-0 block" style={{ borderBottom: '1px solid #e5e5e5', padding: '10px 5px', lineHeight: '25px', fontSize: '12px', fontFamily: '"Lato", sans-serif', color: '#666666', textDecoration: 'none' }}>Login</a>
                                                    </li>
                                                    <li className="bg-white" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '15px', lineHeight: '24px' }}>
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
                                                <a href="" id="menu" className="font-bold text-white block uppercase relative" style={{ padding: '18px 0', fontSize: '15px', textDecoration: 'none' }}>Home</a>
                                            </li>
                                            <li className="inline-block pr-[30px]">
                                                <a href="" id="menu" className="font-bold text-white block uppercase relative" style={{ padding: '18px 0', fontSize: '15px', textDecoration: 'none' }}>Product</a>
                                                <ul className="hm-dropdown">
                                                    <li className="relative"><a href="" className="block" style={{ padding: '0px 20px', lineHeight: '35px', fontSize: '15px', fontFamily: '"Lato", sans-serif', color: '#595959', textDecoration: 'none' }} onClick={() => navigate('/HomeProduct', { state: { username: username, ID: ID } })} >Product</a>

                                                    </li>
                                                    <li className="relative"><a href="" className="block" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '15px', fontFamily: '"Lato", sans-serif', color: '#595959', textDecoration: 'none' }}>Detail Product</a>

                                                    </li>



                                                </ul>
                                            </li>
                                            <li className="inline-block pr-[30px]">
                                                <a href="" id="menu" className="font-bold text-white block uppercase relative " style={{ padding: '18px 0', textDecoration: 'none', fontSize: '15px' }}>Blog</a>
                                                <ul className="hm-dropdown">
                                                    <li className="relative"><a href="" className="block" style={{ padding: '0px 20px', lineHeight: '35px', fontSize: '15px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Grid View</a>
                                                        <ul className="hm-dropdown hm-sub_dropdown">
                                                            <li><a href="" className="block" style={{ padding: '0px 20px', lineHeight: '35px', fontSize: '15px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Column Two</a></li>
                                                            <li><a href="" className="block" style={{ padding: '0px 20px', lineHeight: '35px', fontSize: '15px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Column Three</a></li>
                                                            <li><a href="" className="block" style={{ padding: '0px 20px', lineHeight: '35px', fontSize: '15px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Left Sidebar</a></li>
                                                            <li><a href="" className="block" style={{ padding: '0px 20px', lineHeight: '35px', fontSize: '15px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Right Sidebar</a></li>
                                                        </ul>
                                                    </li>
                                                    <li className="relative"><a href="" className="block" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '15px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>List View</a>
                                                        <ul className="hm-dropdown hm-sub_dropdown">
                                                            <li><a href="" className="block" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '15px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>List Fullwidth</a></li>
                                                            <li><a href="" className="block" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '15px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>List Left Sidebar</a></li>
                                                            <li><a href="" className="block" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '15px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>List Right Sidebar</a></li>
                                                        </ul>
                                                    </li>
                                                    <li className="relative"><a href="" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '15px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Blog Details</a>
                                                        <ul className="hm-dropdown hm-sub_dropdown">
                                                            <li><a href="" className="block" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '15px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Left Sidebar</a></li>
                                                            <li><a href="" className="block" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '15px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Right Sidebar</a></li>
                                                        </ul>
                                                    </li>
                                                    <li><a href="" className="block" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '15px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Blog Format</a>
                                                        <ul className="hm-dropdown hm-sub_last">
                                                            <li className="relative"><a href="" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '15px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Gallery Format</a></li>
                                                            <li className="relative"><a href="" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '15px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Audio Format</a></li>
                                                            <li className="relative"><a href="" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '15px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Video Format</a></li>
                                                        </ul>
                                                    </li>

                                                </ul>
                                            </li>
                                            <li className="inline-block pr-[30px]">
                                                <a href="" id="menu" className="font-bold text-white block uppercase relative" style={{ padding: '18px 0', textDecoration: 'none', fontSize: '15px' }}>Pages

                                                </a>
                                                <ul className="hm-dropdown">
                                                    <li className="relative"><a href="" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '15px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>{username}</a></li>
                                                    <li className="relative"><a href="" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '15px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Login|Register</a></li>
                                                    <li className="relative"><a href="" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '15px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Wishlist</a></li>
                                                    <li className="relative"><a href="" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '15px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Cart</a></li>
                                                    <li className="relative"><a href="" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '15px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Checkout</a></li>
                                                    <li className="relative"><a href="" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '15px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Compare</a></li>
                                                    <li className="relative"><a href="" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '15px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>FAQ</a></li>
                                                    <li className="relative"><a href="" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '15px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>404 Error</a></li>
                                                    <li className="relative"><a href="" style={{ padding: '10px 20px', lineHeight: '35px', fontSize: '15px', fontFamily: '"Lato", sans-serif', color: '#595959' }}>Comming soon</a></li>
                                                </ul>
                                            </li>
                                            <li className="inline-block pr-[30px]">
                                                <a href="" id="menu" className="font-bold text-white block uppercase relative" style={{ padding: '18px 0', fontSize: '15px' }}>About US

                                                </a>
                                            </li>
                                            <li className="inline-block pr-[30px]">

                                                <a href="" id="menu" className="font-bold text-white block uppercase relative" style={{ padding: '18px 0', fontSize: '15px' }}>Contact

                                                </a>
                                            </li>
                                            <li className="inline-block pr-[30px]">

                                                <a href="" id="menu" className="font-bold text-white block uppercase relative" style={{ padding: '18px 0', fontSize: '15px' }}>JeweLLery

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
                                        <li className="inline-block hidden navcon limenu" >
                                            <a onClick={() => isopen(true)} className="block" style={{ width: '60px', height: '60px', lineHeight: '60px', textAlign: 'center', color: '#fff', fontSize: '20px' }}>
                                                <i class="fa fa-navicon" style={{ borderColor: 'white' }}></i>
                                            </a>
                                        </li>
                                        <li className="inline-block limenu" >
                                            <a className="block" style={{ width: '60px', height: '60px', lineHeight: '60px', textAlign: 'center', color: '#fff', fontSize: '20px' }}>
                                                <i class="fa-solid fa-bag-shopping" onClick={() => setcartPopup(true)} style={{ color: 'white' }}></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="left-auto right-0 mobile-menu_wrapper" >
                    <div className="offcanvas-menu-inner" style={open ? { ...closepopup, ...popupopen } : closepopup}>
                        <div className="container">
                            <a className="btnclose" onClick={() => isopen(false)}>
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
                                        <ul style={{ paddingLeft: '10px', maxHeight: '100px', overflowY: 'auto', ...popupContentStyle }} >
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
                                            <span style={{ position: 'relative', fontWeight: '600', color: '#595959', textDecoration: 'none', fontSize: '14px', textTransform: 'uppercase', display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif', cursor: 'pointer' }} onClick={handleuserSetting}>User Setting</span>
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
                                            <span style={{ position: 'relative', fontWeight: '600', color: '#595959', textDecoration: 'none', fontSize: '14px', textTransform: 'uppercase', display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif', cursor: 'pointer' }} onClick={handleCurrency}>Currency</span>
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
                                            <span style={{ position: 'relative', fontWeight: '600', color: '#595959', textDecoration: 'none', fontSize: '14px', textTransform: 'uppercase', display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif', cursor: 'pointer' }} onClick={handleLanguage}>language</span>
                                        </a>
                                        <ul style={{ paddingLeft: '10px', maxHeight: '100px', overflowY: 'auto', ...popuplanguage }}>
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
                    <div className="offcanvas-menu-inner" style={cartPopup ? { ...closepopup, ...popupopen } : closepopup} >
                        <a className="btn-close" onClick={() => setcartPopup(false)} style={{ background: 'transparent', color: '#595959', top: '0', right: '0', left: 'auto' }}>
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </a>
                        <div className="minicart-content">
                            <div className="minicart-heading">
                                <h4 style={{ marginBottom: '0', paddingBottom: '25px', fontFamily: '"Lato", sans-serif', color: '#333333', lineHeight: '1', fontWeight: 'bold', fontSize: '24px' }}>Shopping Cart</h4>
                            </div>
                            <ul className="minicart-list" style={{ maxHeight: '310px', position: 'relative', overflow: 'auto' }}>
                                {cartData.map((card, index) => (
                                    <li className="minicart-product flex pb-[30px]">
                                        <a href="" className="product-item_remove absolute " style={{ right: '15px', color: '#595959', textDecoration: 'none' }}>

                                            <i class="fa fa-times" aria-hidden="true"></i>
                                        </a>
                                        <div className="product-item_img" style={{ flexBasis: '65px', maxWidth: '65px' }}>
                                            <img src={`http://127.0.0.1:8000/${card.link}`} alt="" />
                                        </div>
                                        <div className="product-item_content">
                                            <a href="" style={{ color: '#595959', textDecoration: 'none', fontFamily: '"Lato", sans-serif', fontSize: '15px' }}>{card.Name}</a>
                                            <span className="product-item_quantity" style={{ display: 'block', paddingTop: '10px', fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '15px' }}>{card.Quality} x {card.Price}</span>
                                        </div>
                                    </li>

                                ))}


                            </ul>
                        </div>
                        <div className="minicart-item_total">
                            <span style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '15px' }}>Subtotal</span>
                            <span style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '15px' }} className="ammount"> ${cartData.reduce((total, card) => total + card.Quality * card.Price, 0).toFixed(2)}</span>
                        </div>
                        <div className="minicart-btn_area  pb-[15px]">
                            <a  style={{ textDecoration: 'none' }} className="hiraola-btn hiraola-btn_dark hiraola-btn_fullwidth" onClick={() => navigate('/MiniCart', { state: { username: username, ID: ID } })}>Minicart</a>
                        </div>
                        <div className="minicart-btn_area pb-[15px]">
                            <a href="" style={{ textDecoration: 'none' }} className="hiraola-btn hiraola-btn_dark hiraola-btn_fullwidth">Checkout</a>
                        </div>
                    </div>
                </div>
            </header>
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <h2 className="font-bold" style={{ color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontSize: '36px', marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif' }}>OTHER</h2>
                        <ul>
                            <li>
                                <a href="" style={{ textDecoration: 'none' }}>Home</a>
                            </li>
                            <li className="active">Checkout</li>
                        </ul>
                    </div>
                </div>
            </div>
         <div className="checkout-area">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="coupon-accordion">
                            <h3 style={{fontFamily:'"Lato", sans-serif',color:"#333333"}}>
                            Returning customer? 
                            <span id="showlogin"> Click here to login</span>
                            </h3>
                            <h3 style={{fontFamily:'"Lato", sans-serif',color:"#333333"}}>
                            Have a coupon? 
                            <span id="showcoupon" onClick={toggleCouponVisible}>Click here to enter your code</span>
                            </h3>
                            <div id="checkout_coupon" className={`coupon-checkout-content ${isCouponVisible ? 'visible' : 'hidden'}`}>
                                <div className="coupon-info">
                                    <form action="">
                                        <p className="checkout-coupon" style={{fontFamily:'"Lato", sans-serif',color:'#595959',fontSize:'16px',lineHeight:'24px'}}>
                                            <input type="text" placeholder="Coupon code" style={{outline:'none',color:"#888888"}} />
                                            <input type="submit" value={'Apply Coupon'} className="coupon-inner_btn" />
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>-
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <form action="">
                                <div className="checkbox-form">
                                    <h3 style={{fontFamily:'"Lato", sans-serif',color:'#333333',fontWeight:'bold'}}>Billing Details</h3>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="country-select clearfix">
                                                <label htmlFor="" style={{fontFamily:'"Lato", sans-serif',color:'#595959',fontSize:'16px'}}>Country 
                                                <span className="required">*</span>
                                                </label>
                                                <div className={`nice-select myniceselect wide  ${combo ? 'open' :''}`}>
                                                    <span className="current"  onClick={comboshow}>{selectedItem}</span>
                                                    <ul className="list">
                                                        <li key="Bangladesh" data-value="Bangladesh" data-display="Bangladesh" className={`option ${selectedItem === 'Bangladesh' ? 'selected focus' : ''}`} onClick={()=>handleItemClick('Bangladesh')}>Bangladesh</li>
                                                        <li key="uk" data-value="uk"  className={`option ${selectedItem === 'London' ? 'selected focus' : ''}`} onClick={()=>handleItemClick('London')}>London</li>
                                                        <li key="rou" data-value="rou"  className={`option ${selectedItem === 'Romania' ? 'selected focus' : ''}`} onClick={()=>handleItemClick('Romania')}>Romania</li>
                                                        <li key="fr" data-value="fr"  className={`option ${selectedItem === 'French' ? 'selected focus' : ''}`} onClick={()=>handleItemClick('French')}>French</li> 
                                                        <li key="de" data-value="de"  className={`option ${selectedItem === 'Germany' ? 'selected focus' : ''}`} onClick={()=>handleItemClick('Germany')}>Germany</li> 
                                                        <li key="aus" data-value="aus"  className={`option ${selectedItem === 'Australia' ? 'selected focus' : ''}`} onClick={()=>handleItemClick('Australia')}>Australia</li> 
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="checkout-form-list">
                                                <label htmlFor="" style={{marginBottom:'0.5rem',display:'inline-block',fontFamily:'"Lato", sans-serif',color:'#595959',fontSize:'16px'}}>Full Name
                                                <span className="required">*</span>
                                                </label>
                                                <input type="text" value={formData.FullName} onChange={(e) => setFormData({ ...formData, FullName: e.target.value })} />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="checkout-form-list">
                                                <label htmlFor=""  style={{marginBottom:'0.5rem',display:'inline-block',fontFamily:'"Lato", sans-serif',color:'#595959',fontSize:'16px'}}>Address 
                                                <span className="required">*</span>
                                                </label>
                                                <input type="text" value={formData.Address} onChange={(e)=>setFormData({...formData,Address:e.target.value})} placeholder="Street address" />
                                            </div>
                                        </div>
  
                                        <div className="col-md-12">
                                            <div className="checkout-form-list">
                                                <label htmlFor="" style={{marginBottom:'0.5rem',display:'inline-block',fontFamily:'"Lato", sans-serif',color:'#595959',fontSize:'16px'}}>Town / City 
                                                <span className="required">*</span>
                                                </label>
                                                <input type="text" value={formData.City} onChange={(e) => setFormData({ ...formData, City: e.target.value })} />
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-12">
                                            <div className="checkout-form-list">
                                                <label htmlFor="" style={{marginBottom:'0.5rem',display:'inline-block',fontFamily:'"Lato", sans-serif',color:'#595959',fontSize:'16px'}}>Postcode / Zip 
                                                <span className="required">*</span>
                                                </label>
                                                <input type="text" value={formData.PostCode} onChange={(e) => setFormData({ ...formData, PostCode: e.target.value })} />
                                            </div>
                                        </div>
                                       
                                        <div className="col-md-12">
                                            <div className="checkout-form-list">
                                                <label htmlFor="" style={{marginBottom:'0.5rem',display:'inline-block',fontFamily:'"Lato", sans-serif',color:'#595959',fontSize:'16px'}}>Phone
                                                <span className="required">*</span>
                                                </label>
                                                <input type="text" value={formData.Phone} onChange={(e) => setFormData({ ...formData, Phone: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className="your-order">
                                <h3 style={{fontFamily:'"Lato", sans-serif',color:'#333333',fontWeight:'bold'}}>Your order</h3>
                                <div className="your-order-table table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th className="cart-product-name" style={{background:'#f4f4f4',fontFamily:'"Lato", sans-serif',fontWeight:'normal'}}>Product</th>
                                                <th className="cart-product-total" style={{background:'#f4f4f4',fontFamily:'"Lato", sans-serif',fontWeight:'normal'}}>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {checkout.map((card, index) => (
                                            <tr className="cart_item">
                                                <td className="cart-product-name" style={{background:'#f4f4f4',fontFamily:'"Lato", sans-serif',fontWeight:'normal',fontSize:'16px'}}>
                                               {card.Name}
                                                    <strong className="product-quantity" style={{marginLeft:'3px'}}>
                                                        × {card.TotalQuantity}</strong>
                                                </td>
                                                <td className="cart-product-total" style={{background:'#f4f4f4'}}>
                                                    <span className="amount" style={{fontFamily:'"Lato", sans-serif',fontSize:'16px',color:'#212529'}}>£{caculateTotalPrice(card.TotalQuantity,card.Price)}</span>
                                                </td>
                                            </tr>
                                               ))}
                                        </tbody>
                                        <tfoot>
                                            <tr className="cart-subtotal">
                                                <th style={{fontFamily:'"Lato", sans-serif',fontSize:'16px',color:'#212529',background:'#f4f4f4'}}>Cart Subtotal</th>
                                                <td className="cart-product-total" style={{background:'#f4f4f4'}}>
                                                    <span className="amount" style={{fontFamily:'"Lato", sans-serif',fontSize:'16px',color:'#212529'}}>£{checkout.reduce((total, card) => total + card.TotalQuantity * card.Price, 0).toFixed(2)}</span>
                                                </td>
                                            </tr>
                                            <tr className="order-total">
                                                <th style={{fontFamily:'"Lato", sans-serif',fontSize:'16px',color:'#212529',background:'#f4f4f4',borderBottom:'medium none'}}>Order Total</th>
                                                <td className="cart-product-total" style={{background:'#f4f4f4',borderBottom:'medium none'}}>
                                                    <strong>
                                                    <span className="amount" style={{fontFamily:'"Lato", sans-serif',fontSize:'20px',color:'#212529'}}>£{checkout.reduce((total, card) => total + card.TotalQuantity * card.Price, 0).toFixed(2)}</span>
                                                    </strong>
                                                   
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                <div className="payment-method">
                                    <div className="payment-accordion">
                                        <div id="accordion">
                                            <div className="card actives">
                                                <div className="card-header" id="payment-1">
                                                    <h5 className="panel-title">
                                                        <a  className="collapsed" style={{color:'#595959',textDecoration:'none'}}  onClick={toogleDirect}>
                                                        Direct Bank Transfer.
                                                    </a>
                                                    </h5>
                                                </div>
                                                <div className={`coupon-checkout-content ${Direct ? 'visible' : 'hidden'}`}>
                                                    <div className="card-body">
                                                        <p style={{fontFamily:'"Lato", sans-serif',color:'#595959',fontSize:'16px',marginTop:'0',marginBottom:'1rem'}}>
                                                        Make your payment directly into our bank account. Please use your Order
                                                        ID as the payment
                                                        reference. Your order won’t be shipped until the funds have cleared in
                                                        our account.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                            <div className="card-header" id="payment-1">
                                                    <h5 className="panel-title">
                                                        <a  className="collapsed" style={{color:'#595959',textDecoration:'none'}}  onClick={tooglePayment}>
                                                       
                                                        Cheque Payment
                                                    
                                                    </a>
                                                    </h5>
                                                </div>
                                                <div className={`coupon-checkout-content ${Payment ? 'visible' : 'hidden'}`}>
                                                    <div className="card-body">
                                                        <p style={{fontFamily:'"Lato", sans-serif',color:'#595959',fontSize:'16px',marginTop:'0',marginBottom:'1rem'}}>
                                                        Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="card">
                                            <div className="card-header" id="payment-1">
                                                    <h5 className="panel-title">
                                                        <a  className="collapsed" style={{color:'#595959',textDecoration:'none'}}  >
                                                       
                                                   Phuong thuc thanh toan
                                                    
                                                    </a>
                                                    </h5>
                                                </div>
                                                <div >
                                                    <div className="card-body">
                                                        <p style={{fontFamily:'"Lato", sans-serif',color:'#595959',fontSize:'16px',marginTop:'0',marginBottom:'1rem'}}>
                                                        Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.
                                                        </p>
                                                        <button className={`paypal-button ${paypal ?'col-paypal':''}`} onClick={buttonpaypal}  style={{ background: '#fff', color: '#000000CC',border:'1px solid rgba(0,0,0,.09)', padding: '10px', borderRadius: '5px', marginRight: '10px',outline:'none' }}>
                                                        <i class="fa-brands fa-paypal"></i>
            Pay with PayPal
          </button>
          <button className={`cod-button ${delivery ?'col-delivery':''}`}  style={{ background: '#fff', color: '#000000CC',border:'1px solid rgba(0,0,0,.09)', padding: '10px', borderRadius: '5px' }} onClick={buttondelivery}>
          Payment on delivery
          </button>
                                                    </div>
                                                </div>
                                               
                                               
                                            </div>
                                                <div className="order-button-payment">
                                                    <input type="button" value="Place order" onClick={()=>AddCard()} />
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
        </div>



    )
}
export default CheckOut;