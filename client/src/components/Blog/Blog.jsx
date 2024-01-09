import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Magnifier } from 'react-image-magnify';
import { Slide, ToastContainer, toast } from 'react-toastify';
import '../menu/menu.css';
import Pagination from 'react-paginate';
import Swal from 'sweetalert2';
import us from '../menu/image/us.png';
import France from '../menu/image/France.png';
import '../Blog/Blog.css';
import logo from '../menu/image/logo.png';
import s from '../menu/image/s.png';
import product from '../menu/image/product.png';
import product2 from '../menu/image/product2.png';
import product3 from '../menu/image/product3.png';
import logo2 from '../menu/image/logorespon.png';


import axios from "axios";
function MiniCart() {
   
    const [perPage, setperPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const location = useLocation();
    const ID = location.state?.ID || '';
    const [currentSlide, setCurrentSlide] = useState(0);
    const [IsExpaned, setIsExpanded] = useState(false);
    const [Issubmenu, setIsubmenu] = useState(false);
    const [isBlog, setisblod] = useState(false);
    const [cartPopup, setcartPopup] = useState(false);
    const [secondmenu, SetSecondmenu] = useState(false);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [singleproduct, setsingleproduct] = useState(false);
    const [Listview, setListView] = useState(false);
	const [searchInput, setSearchInput] = useState('');
    const username = location.state?.username || 'Default Username';
    const [Page, setPage] = useState(false);
    const [BlogPage,setBlogPage]=useState([]);
    const [Blogdetail, setblogDetail] = useState(false);
    const [BlogFormat, setBlogFormat] = useState(false);

    const [Grid, setGrid] = useState(false);
    const [userSetting, setuserSetting] = useState(false);
    const [detail, setDetail] = useState(null);
    const [cartData, setCardData] = useState([]);
    const [currency, setcurrency] = useState(false);
    const [language, setlanguage] = useState(false);
    const [open, isopen] = useState(false);
    const [Minicart,setMiniCart]=useState([]);
    const [Blog,setBlog]=useState([]);
    const IDProduct = location.state?.IDProduct || '';
    const [recent,setrecent]=useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchButtonClick = () => {
		setSearchTerm(searchInput);
	}
    useEffect(()=>{
        const fetchrecent=async()=>{
            try{
                const response=await fetch(`http://127.0.0.1:8000/api/recentPost`);
                if(response.ok){
                    const data=await response.json();
                    setrecent(data);
                }else {
                    console.error("Failed to fetch cart data");
                }
            }catch(error){
                console.error('Error during fetch:', error);
            }
        }
        fetchrecent();
    },[])
    useEffect(()=>{
        const fetchBlog=async()=>{
           
            try{
                const response=await fetch(`http://127.0.0.1:8000/api/diplayBlog`);
                if(response.ok){
                    const data=await response.json();
                    setBlogPage(data);
                }else {
                    console.error("Failed to fetch cart data");
                }
            }catch(error){
                console.error('Error during fetch:', error);
            }
        }
        fetchBlog();
    },[])
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    useEffect(()=>{
        const fetchMinicart=async()=>{
            try{
                const response=await fetch(`http://127.0.0.1:8000/api/ShowMiniCart/${ID}`);
                if(response.ok){
                    const data=await response.json();
                    setMiniCart(data);
                }else {
                    console.error("Failed to fetch cart data");
                }
            }catch(error){
                console.error('Error during fetch:', error);
            }
        }
        fetchMinicart();
    },[])
    
    useEffect(() => {
        const fetchCardData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/getcart/${ID}`);
                if (response.ok) {
                    const data = await response.json();
                    setCardData(data);
                } else {
                    console.error("Failed to fetch cart data");
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }

        }
        fetchCardData();
    }, []);
   
    const popupopen = {
        left: 'auto',
        right: '0',
        visibility: 'visible',
        opacity: '1',
        padding: '105px 29px 0px',
        zIndex: '1'

    }
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogResponse = await fetch(`http://127.0.0.1:8000/api/diplayBlog`);
        const miniCartResponse = await fetch(`http://127.0.0.1:8000/api/ShowMiniCart/${ID}`);
        const cardDataResponse = await fetch(`http://127.0.0.1:8000/api/getcart/${ID}`);

        if (blogResponse.ok && miniCartResponse.ok && cardDataResponse.ok) {
          const blogData = await blogResponse.json();
          const miniCartData = await miniCartResponse.json();
          const cardData = await cardDataResponse.json();

          setBlogPage(blogData);
          setMiniCart(miniCartData);
          setCardData(cardData);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      } finally {
        // Đặt loading thành false sau khi thực hiện xong tất cả các yêu cầu API
        setLoading(false);
      }
    };

    fetchData();
  }, [ID]);
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



    const popupContentStyle = {

        display: IsExpaned ? 'block' : 'none',
        animation: 'cloudAnimation 0.5s',// Default animation
    };
    useEffect(()=>{
        const fetchdata=async()=>{
          
          try{
            //gửi yêu cầu http để lấy dữ liệu từ api 
            const response=await axios.get('http://127.0.0.1:8000/api/getTopBlogcategory');
            setBlog(response.data);
       
          }catch(error){
            console.error('error fetchinh categories:',error)
          }
        }
        fetchdata();
      },[]);
      const filteredCategories = BlogPage.filter(category =>

        category.Blog_tittle.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const indexOflastCategory = (currentPage + 1) * perPage;
	const indexOfFirtCategory = indexOflastCategory - perPage;
	const currentCategories = filteredCategories.slice(indexOfFirtCategory, indexOflastCategory)
    const handleClick = async (routeString) => {
        try {
            setLoading(true);

            // Simulate an asynchronous task, like data fetching
            await someAsyncTask();

            // After the task is completed, navigate to the dynamic route
            navigate(routeString, { state: { username, ID } });
        } catch (error) {
            console.error('Error during async operation:', error);
        } finally {
            setLoading(false);
        }
    };
    const deleteCard = async (IDProduct) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/DeleteCard/${IDProduct}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_Account: ID,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to Delete card');
            }
            const data = await response.json();
            if (data.message) {
                Swal.fire({
                    icon: "success",
                    title: "Delete Successfull",
                    showConfirmButton: false,
                    timer: 1500
                });
                const response = await fetch(`http://127.0.0.1:8000/api/getcart/${ID}`);
                if (response.ok) {
                    const data = await response.json();
                    setCardData(data);
                }
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Delete Successfull",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Error adding card:', error);
        }
    }
    const someAsyncTask = () => {
        return new Promise((resolve) => {
            // Simulate an asynchronous task
            setTimeout(() => {
                console.log('Async task completed');
                resolve();
            }, 2000); // Simulate a delay of 2 seconds
        });
    };
    return (

        <div>

<header className="block">
            {loading && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
                </div>
            )}
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
                                                {username === 'Default Username' && (
                                                    <li className="bg-white" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '16px', lineHeight: '24px' }}>
                                                        <a href="/login" className="pt-0 block" style={{ borderBottom: '1px solid #e5e5e5', padding: '10px 5px', lineHeight: '25px', fontSize: '12px', fontFamily: '"Lato", sans-serif', color: '#666666', textDecoration: 'none' }}  >Login</a>
                                                    </li>
                                                )}
                                                {username === 'Default Username' && (
                                                    <li className="bg-white" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '16px', lineHeight: '24px' }}>
                                                        <a href="/register" className="pt-0 block" style={{ marginTop: '5px', padding: '10px 5px', lineHeight: '37px', fontSize: '12px', fontFamily: '"Lato", sans-serif', color: '#666666', textDecoration: 'none' }} onClick={() => navigate('/register')}>Register</a>
                                                    </li>
                                                )}

                                                {username !== 'Default Username' && (
                                                    <li className="bg-white" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '16px', lineHeight: '24px' }}>
                                                        <a href="" className="pt-0 block" style={{ marginTop: '5px', padding: '10px 5px', lineHeight: '37px', fontSize: '12px', fontFamily: '"Lato", sans-serif', color: '#666666', textDecoration: 'none' }}>{username}</a>
                                                    </li>
                                                )}
                                                {username !== 'Default Username' && (
                                                    <li className="bg-white" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '16px', lineHeight: '24px' }}>
                                                        <a href="/layout" className="pt-0 block" style={{ marginTop: '5px', padding: '10px 5px', lineHeight: '37px', fontSize: '12px', fontFamily: '"Lato", sans-serif', color: '#666666', textDecoration: 'none' }} onClick={() => navigate('/layout')}>log out</a>
                                                    </li>
                                                )}

                                                {username !== 'Default Username' ? (
                                                    <li className="bg-white" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '16px', lineHeight: '24px' }}>
                                                        <a href="" className="pt-0 block" style={{ marginTop: '5px', padding: '10px 5px', lineHeight: '37px', fontSize: '12px', fontFamily: '"Lato", sans-serif', color: '#666666', textDecoration: 'none' }} onClick={() => navigate('/Myorder', { state: { username: username, ID: ID } })}>My order</a>
                                                    </li>
                                                ) : null}

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
                                <a href="" onClick={() => navigate('/layout', { state: { username: username, ID: ID } })}>
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
                                            <a href="" id="menu" className="font-bold text-white block uppercase relative" style={{ padding: '18px 0', fontSize: '16px' }} onClick={() => navigate('/layout', { state: { username: username, ID: ID } })}>Home</a>
                                        </li>
                                        <li className="inline-block pr-[30px]">
                                            <a href="" id="menu" className="font-bold text-white block uppercase relative" style={{ padding: '18px 0' }} onClick={() => navigate('/HomeProduct', { state: { username: username, ID: ID } })} >Product</a>

                                        </li>
                                        <li className="inline-block pr-[30px]">
                                            <a id="menu" className="font-bold text-white block uppercase relative" style={{ padding: '18px 0' }} onClick={() => handleClick('/blog')} >Blog</a>

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
                                        <span style={{ position: 'relative', fontWeight: '600', color: '#595959', textDecoration: 'none', fontSize: '14px', textTransform: 'uppercase', display: 'block', padding: '10px 0', fontFamily: '"Lato", sans-serif' }} onClick={() => navigate('/layout', { state: { username: username, ID: ID } })}>Home</span>
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
                                    <a className="product-item_remove absolute " style={{ right: '15px', color: '#595959', textDecoration: 'none' }} onClick={() => deleteCard(card.ID)}>

                                        <i class="fa fa-times" aria-hidden="true"></i>
                                    </a>
                                    <div className="product-item_img" style={{ flexBasis: '65px', maxWidth: '65px' }}>
                                        <img src={`http://127.0.0.1:8000/${card.link}`} alt="" />
                                    </div>
                                    <div className="product-item_content">
                                        <a href="" style={{ color: '#595959', textDecoration: 'none', fontFamily: '"Lato", sans-serif', fontSize: '16px' }} onClick={() => navigate(`/DetailProduct/${card.ID}`, { state: { IDProduct: card.ID, ID: ID } })}>{card.Name}</a>
                                        <span className="product-item_quantity" style={{ display: 'block', paddingTop: '10px', fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '16px' }}>{card.Quality} x {card.Price}</span>
                                    </div>
                                </li>

                            ))}


                        </ul>
                    </div>
                    <div className="minicart-item_total">
                        <span style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '16px' }}>Subtotal</span>
                        <span style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '16px' }} className="ammount"> ${cartData.reduce((total, card) => total + card.Quality * card.Price, 0).toFixed(2)}</span>
                    </div>
                    <div className="minicart-btn_area  pb-[15px]" >
                        <a style={{ textDecoration: 'none' }} className="hiraola-btn hiraola-btn_dark hiraola-btn_fullwidth" onClick={() => handleClick('/Minicart', { state: { username: username, ID: ID } })}>Minicart</a>
                    </div>
                </div>
            </div>
        </header>
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <h2 className="font-bold" style={{ color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontSize: '36px', marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif' }}>Other</h2>
                        <ul>
                            <li>
                                <a href="" style={{ textDecoration: 'none' }}>Home</a>
                            </li>
                            <li className="active">Single Product</li>
                        </ul>
                    </div>
                </div>
            </div>
        <div className="hiraola-blog_area hiraola-blog_area-2 blog-grid-view_area">
<div className="container">
    <div className="row">
        <div className="col-lg-3 order-lg-1 order-2">
            <div className="hiraola-blog-sidebar-wrapper">
                <div className="hiraola-blog-sidebar">
                    <div className="hiraola-sidebar-search-form">
                        <form action="">
                            <input type="text" className="hiraola-search-field" placeholder="search here" onChange={(e) => setSearchInput(e.target.value)}  value={searchInput}/>
                            <button type="button" className="hiraola-search-btn" onClick={handleSearchButtonClick}>
                                <i className="fa fa-search" style={{color:'#fff'}}></i>
                            </button>
                        </form>
                    </div>
                </div>
                <div className="hiraola-blog-sidebar">
                <div className="hiraola-blog-sidebar" id="tittle" >
                    <h4 className="hiraola-blog-sidebar-title" style={{fontFamily:'"Lato", sans-serif',color:'#333333'}}>            Categories</h4>
                    <ul className="hiraola-blog-archive">
                    { Blog.map((category, index) => (
    <li >
        <a style={{ color: '#595959', textDecoration: 'none', outline: 'none', fontFamily: '"Lato", sans-serif', color: '#595959' }} href="">{category.Name} ({category.TotalProduct})</a>
    </li>
))}
                    </ul>
                </div>
                </div>
                <div className="hiraola-blog-sidebar">
                <div className="hiraola-blog-sidebar" id="tittle" >
                    <h4 className="hiraola-blog-sidebar-title" style={{fontFamily:'"Lato", sans-serif',color:'#333333'}}>Recent Post</h4>
                    <div className="hiraola-recent-post">
                    {BlogPage.map((order, index) => (
                        <div className="hiraola-recent-post-thumb " >
                            <div className="hiraola-recent-post-thumb flex" >
                               
                                <div className="hiraola-recent-post-des flex">
                                <span>
                                    <a id="hover" style={{fontFamily:'"Lato", sans-serif',color:'#595959',fontSize:'20px',fontWeight:'700',overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}} onClick={() => navigate('/DetailBlog', { state: { IDBlog:order.ID } })}  >{order.Blog_tittle}</a>
                                </span>
                            </div>
                            </div>
                         
                        </div>
                         ))}
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div className="col-lg-9 order-lg-2 order-1">
            <div className="row blog-item_wrap">
            {currentCategories.map((order, index) => (
                <div className="col-lg-6">
                    <div className="blog-item">
                        <div className="blog-img img-hover_effect">
                            <a  onClick={() => navigate('/DetailBlog', { state: { IDBlog:order.ID } })} >
                            <img src={`http://127.0.0.1:8000/${order.Blog_image}`} alt="" />
                            </a>
                        </div>
                        <div className="blog-content">
                            <div className="blog-heading">
                                <h5>
                                    <a id="hover"  style={{fontFamily:'"Lato", sans-serif',color:'#595959',fontSize:'20px',fontWeight:'700'}} onClick={() => navigate('/DetailBlog', { state: { IDBlog:order.ID } })} >{order.Blog_tittle}</a>
                                </h5>
                            </div>
                            <div style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}} className="blog-short_desc">
                                <p style={{fontFamily:'"Lato", sans-serif',color:'#595959',fontSize:'16px'}} dangerouslySetInnerHTML={{ __html: order.Blog_desc }}/>
                            </div>
                            <div className="hiraola-read-more_area">
                                <a href="" id="hover" style={{fontFamily:'"Lato", sans-serif',color:'#595959',fontSize:'20px',fontWeight:'700'}} onClick={() => navigate('/DetailBlog', { state: { IDBlog:order.ID } })} className="hiraola-read_more">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
                
                ))}
            </div>
            <Pagination
  previousLabel={'previous'}
  nextLabel={'next'}
  breakLabel={'...'}
  pageCount={Math.ceil(filteredCategories.length / perPage)}
  marginPagesDisplayed={2}
  pageRangeDisplayed={5}
  onPageChange={handlePageclick}
  containerClassName={'pagination'}
  activeClassName={'active'}
  previousClassName={'page-item'}
  previousLinkClassName={'page-link'}
  nextClassName={'page-item'}
  nextLinkClassName={'page-link'}
  breakClassName={'page-item'}
  breakLinkClassName={'page-link'}
  pageClassName={'page-item'}
  pageLinkClassName={'page-link'}
  
 
/>
        </div>
    </div>
</div>
        </div>
    
        </div>



    )
}
export default MiniCart;