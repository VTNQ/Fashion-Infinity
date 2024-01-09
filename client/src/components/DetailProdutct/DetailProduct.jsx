import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Magnifier } from 'react-image-magnify';
import { format } from 'date-fns';
import { Slide, ToastContainer, toast } from 'react-toastify';
import '../menu/menu.css';
import Swal from 'sweetalert2';

import Slider from 'react-slick';
import us from '../menu/image/us.png';
import France from '../menu/image/France.png';
import 'slick-carousel/slick/slick.css';
import logo from '../menu/image/logo.png';
import s from '../menu/image/s.png';
import product from '../menu/image/product.png';
import './Detail.css';
import product2 from '../menu/image/product2.png';
import product3 from '../menu/image/product3.png';
import logo2 from '../menu/image/logorespon.png';
import jewry from '../User/images/jewry.png';
import axios from "axios";


function DetailProduct() {
    
    const [Picture, setPicture] = useState([]);
    const [current,setcurrent]=useState(0);
    const location = useLocation();
    const [newProduct,setnewProduct]=useState([]);
    const [Product,setProduct]=useState([]);
    const ID = location.state?.ID || '';
    const IDProduct = location.state?.IDProduct || '';
    const [currentSlide, setCurrentSlide] = useState(0);
    const [Email,setEmail]=useState(null);
    const [Feedback,setFeedback]=useState([]);
    const [formData, setFormData] = useState({
        Quality:1,
        Comment:'',
    });
    const [rating,setrating]=useState(0);
    const handleStartClick=(value)=>{
setrating(value)
    }
   
    useEffect(()=>{
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/Email/${ID}`);
                setEmail(response.data.Email.Email);
               
            } catch (error) {
                console.error('Error fetching providers:', error);
            }
        };
        fetchProduct();
    },[])
    useEffect(()=>{
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/ListFeedback`);
                setFeedback(response.data);
               
            } catch (error) {
                console.error('Error fetching providers:', error);
            }
        };
        fetchProduct();
    },[])
    useEffect(()=>{
        const fetchProduct = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/getNewProduct");
                setnewProduct(response.data);
            } catch (error) {
                console.error('Error fetching providers:', error);
            }
        };
        fetchProduct();
    },[])
    const NewProduct =newProduct.map((item)=>({
        id:item.id,
        name:item.ProductName,
        price:item.Price,
        image:`http://127.0.0.1:8000/${item.link}`,
    })) 
    const handleIncreaseQuality = () => {
        const totalQuantity = detail?.TotalQuantity || 0; // Replace this with the actual property name

        setFormData((prevData) => ({
            ...prevData,
            Quality: prevData.Quality + 1 <= totalQuantity ? prevData.Quality + 1 : prevData.Quality,
        }));
	  };
	
	  const handleDecreaseQuality = () => {
		if (formData.Quality > 1) {
		  setFormData((prevData) => ({
			...prevData,
			Quality: prevData.Quality - 1,
		  }));
		}
	  };
      const handleAddToCard = async (ProductID) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/addCard/${ProductID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_Account: ID,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to add card');
            }
    
            const data = await response.json();
            if (data.message) {
                toast.success("Card added successfully", {
                    position: 'top-right',
                    autoClose: 3000,
                });
                const response = await fetch(`http://127.0.0.1:8000/api/getcart/${ID}`);
                if (response.ok) {
                    const data = await response.json();
                    setCardData(data);
                }
            } else {
                toast.success("Card added successfully", {
                    position: 'top-right',
                    autoClose: 3000,
                });
                const response = await fetch(`http://127.0.0.1:8000/api/getcart/${ID}`);
                if (response.ok) {
                    const data = await response.json();
                    setCardData(data);
                }
            
            }
        } catch (error) {
            toast.error("product is out of stock", {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };
    const handleAddFeedback=async()=>{
        if(formData.Comment==='' || rating===0 ){
            Swal.fire({
                icon: 'error',
                title: 'Comment and rating is required',
                showConfirmButton: false,
                timer: 1500,
            });
        }else{
            try{
                const response = await fetch(`http://127.0.0.1:8000/api/AddFeedback/${ID}/${IDProduct}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        content:formData.Comment,
                        start:rating
                    }),
                });
                if(response.ok){
                    setFormData({
                        Comment:''
                    })
                    setrating(0);
                    Swal.fire({
                        icon: 'success',
                        title: 'Add Feedback sucessfully',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    const response = await axios.get(`http://127.0.0.1:8000/api/ListFeedback`);
                    setFeedback(response.data);
                   
                }
            }catch (error) {
                console.error('Error adding Feedback:', error);
            }
        }
     
    }
    const handleAddCard = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/AddCardDetail/${IDProduct}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_Account: ID,
                    Quality:formData.Quality
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to add card');
            }
    
            const data = await response.json();
            if (data.message) {
                toast.success("Card added successfully", {
                    position: 'top-right',
                    autoClose: 3000,
                });
                const response = await fetch(`http://127.0.0.1:8000/api/getcart/${ID}`);
                if (response.ok) {
                    const data = await response.json();
                    setCardData(data);
                }
            } else {
                toast.success("Card added successfully", {
                    position: 'top-right',
                    autoClose: 3000,
                });
                const response = await fetch(`http://127.0.0.1:8000/api/getcart/${ID}`);
                if (response.ok) {
                    const data = await response.json();
                    setCardData(data);
                }
            
            }
        } catch (error) {
            console.error('Error adding card:', error);
        }
    };
    useEffect(()=>{
        const fetchProduct = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/detailProduct/");
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching providers:', error);
            }
        };
        fetchProduct();
    },[])
   
    const products =Product.map((item)=>({
        id:item.id,
        name:item.ProductName,
        price:item.Price,
        image:`http://127.0.0.1:8000/${item.link}`,
    })) 

     
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true, // Enable autoplay
        autoplaySpeed: 2000, // Set autoplay speed in milliseconds (e.g., 2000ms or 2 seconds)
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };
    
   const [ActiveTab,setActiveTab]=useState('description');
   const handleTabChange=(tabID)=>{
    setActiveTab(tabID);
   }
   const renderTabContent = () => {
    switch (ActiveTab) {
      case 'description':
        return (
          <div className="product-description">
            <ul>
              {/* Nội dung của tab Description */}
              {detail && (
                <li>
                  <strong style={{ display: 'block', fontSize: '18px', paddingBottom: '10px', color: '#595959' }}>Content</strong>
                  <span style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '16px' }}>{detail.content}</span>
                </li>
              )}
            </ul>
          </div>
        );

      case 'specification':
        return (
            <table className="table table-bordered specification-inner_stuff" style={{verticalAlign:'inherit'}}>
            <tbody style={{verticalAlign:'inherit'}}>
                <tr style={{borderWidth:'1px 0'}}>
                <td colSpan={2} style={{borderWidth:'0 1px'}}>
                <strong style={{fontFamily:'"Lato", sans-serif',fontSize:'16px'}}>Memory</strong>
                </td>
                </tr>
            </tbody>
            <tbody style={{verticalAlign:'inherit'}}>
                <tr style={{borderWidth:'1px 0'}}>
               <td>test 1</td>
               <td>8gb</td>
                </tr>
            </tbody>
            <tbody>
                <tr>
                    <td colSpan={2}>
                    <strong style={{fontFamily:'"Lato", sans-serif',fontSize:'16px'}}>Processor</strong>
                    </td>
                </tr>
            </tbody>
            <tbody style={{verticalAlign:'inherit'}}>
            <tr style={{borderWidth:'1px 0'}}>
            <td>No. of Cores</td>
            <td>1</td>
            </tr>
            </tbody>
        </table>
        );

      case 'reviews':
        return (
          <div>
           <form action="" className="form-horizontal" id="form-review">
            <div id="review">
                <table className="table table-striped table-bordered">
                    {Feedback.map((Product, index) => (
                        <tbody style={{verticalAlign:'inherit'}}>
                            <tr style={{borderWidth:'1px 0'}}>
                                <td style={{width:'50%',padding:'20px'}}>
                                    <strong style={{fontFamily:'"Lato", sans-serif',fontSize:'16px',color:"#212529"}}>{Product.Username}</strong>
                                </td>
                                <td className="text-right" style={{width:'50%',padding:'20px',fontFamily:'"Lato", sans-serif',fontSize:'16px',color:"#212529"}}>
                                    {format(new Date(Product.Create_time), 'yyyy-MM-dd HH:mm')}
                            
                                </td>
                            </tr>
                            <tr colSpan={2} >
                                <td>
                                <p style={{marginBottom:'0',paddingBottom:'20px',fontFamily:'"Lato", sans-serif',fontSize:"16px",color:"#595959"}}>{Product.Content}</p>
                                <div className="rating-box">
                                    <ul>
                                    {[1, 2, 3, 4, 5].map((value) => (
                    <li key={value} style={{ display: 'inline-block' }}>
                      <i
                        className="fa fa-star-of-david"
                        style={{
                          color: value <= Product.start? '#cda557' : '#ccc',
                          fontWeight: '900',
                        }}
                      ></i>
                    </li>
                  ))}
                                    </ul>
                                </div>
                                </td>
                                
                            </tr>
                        </tbody>
                        ))}

                </table>
                <h2 style={{marginBottom:'0',marginBottom:'15px',fontFamily:'"Lato", sans-serif',color:'#333333',fontWeight:'700',fontSize:'32px'}}>Write a review</h2>
                <div className="form-group required" style={{marginBottom:'0',paddingBottom:'15px'}}>
                    <div className="col-sm-12 p-0">
                        <label htmlFor="" style={{marginBottom:'0',paddingBottom:'18px'}}>
                        Your Email 
                        <span className="required">*</span>
                        </label>
                        <input type="email" value={Email} className="review-input" name="con_email" id="con_email" />
                    </div>
                </div>
                <div className="form-group required second-child" style={{paddingBottom:'10px',marginBottom:'0'}}>
                <div className="col-sm-12 p-0">
                    <label htmlFor="" className="control-label" style={{marginBottom:'0',paddingBottom:'18px'}}>
                   Comment
                    </label>
            <textarea className="review-textarea" value={formData.Comment} onChange={(e)=>setFormData({...formData,Comment:e.target.value})} id="con_message" name="con_message" ></textarea>
                </div>
                </div>
                <div className="form-group last-child required" style={{paddingBottom:'10px',marginBottom:'0'}}>
                    <div className="col-sm-12 p-0">
                    <div className="your-opinion">
                        <label htmlFor="" style={{paddingBottom:'10px',marginBottom:'0',fontFamily:'"Lato", sans-serif',color:'#595959'}}>Your Rating</label>
                        <span>
                            <div className="br-wrapper br-theme-fontawesome-stars">
                                <div className="br-widget">
                                {[1, 2, 3, 4, 5].map((value) => (
        <a
          key={value}
          
          className={`br-rating-link ${value <= rating ? 'br-selected br-current' : ''}`}
          onClick={() => handleStartClick(value)}
        ></a>
      ))}
                                </div>
                            </div>
                        </span>
                    </div>
                    </div>
                    <div className="hiraola-btn-ps_right">
                        <a id="drop" className="hiraola-btn hiraola-btn_dark" style={{cursor:'pointer'}} onClick={()=>handleAddFeedback()}>Send</a>
                    </div>
                </div>
            </div>
           </form>
          </div>
        );

      default:
        return null;
    }
  };

    const goToPrev = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };
    
    const handleThumbnailClick = (index, thumbnailSrc) => {
        setCurrentSlide(index);
        setMainImageSrc(thumbnailSrc);
        setShowMainImage(true);
    };

    const goToNext = () => {
        if (currentSlide < images.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {

            setCurrentSlide(0);
        }
        console.log(IDProduct)
    };
    const goToNextsecond = () => {
       setcurrency((prevSlide) => (prevSlide < products.length - 1 ? prevSlide + 1 : 0));
      };
    const goToNextsecond2 = () => {
        setcurent((prevSlide) => (prevSlide < newProduct.length - 1 ? prevSlide + 1 : 0));
      };
      const goToPrevSecond=()=>{
        setcurrency((prevSlide) => (prevSlide > 0 ? prevSlide - 1 : products.length - 1));
      }
      const goToPrevSecond2=()=>{
        setcurent((prevSlide) => (prevSlide > 0 ? prevSlide - 1 : newProduct.length - 1));
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
    
    useEffect(()=>{
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/getextra/${IDProduct}`);
                setPicture(response.data);
            } catch (error) {
                console.error('Error fetching providers:', error);
            }
        };
        fetchProduct();
    },[IDProduct])
    const images = Picture.map((item) => ({
        id: item.id,
        src: `http://127.0.0.1:8000/${item.link}`,
      }));
    const handleMouseEnter = () => {
        setisHovered(true);
    }
    const handleMouseLeave = () => {
        setisHovered(false);
    }
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/getDetail/${IDProduct}`);
                setDetail(response.data);
            } catch (error) {
                console.log("error fetching data", error);
            }
        }
        fetchdata();
    }, [IDProduct])
    const [mainImageSrc, setMainImageSrc] = useState(`http://127.0.0.1:8000/${detail?.link || ''}`);
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

    const [loading, setLoading] = useState(false);
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
      const someAsyncTask = () => {
        return new Promise((resolve) => {
          // Simulate an asynchronous task
          setTimeout(() => {
            console.log('Async task completed');
            resolve();
          }, 2000); // Simulate a delay of 2 seconds
        });
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
    const popupContentStyle = {

        display: IsExpaned ? 'block' : 'none',
        animation: 'cloudAnimation 0.5s',// Default animation
    };
    return (
        
        <div>
           	<ToastContainer />
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
                                                {username==='Default Username' && (
                                                    <li className="bg-white" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '16px', lineHeight: '24px' }}>
                                                        <a href="/login"  className="pt-0 block" style={{ borderBottom: '1px solid #e5e5e5', padding: '10px 5px', lineHeight: '25px', fontSize: '12px', fontFamily: '"Lato", sans-serif', color: '#666666', textDecoration: 'none' }}  >Login</a>
                                                    </li>
                                                )}
                                                {username==='Default Username' && (
                                                    <li className="bg-white" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '16px', lineHeight: '24px' }}>
                                                        <a href="/register" className="pt-0 block" style={{ marginTop: '5px', padding: '10px 5px', lineHeight: '37px', fontSize: '12px', fontFamily: '"Lato", sans-serif', color: '#666666', textDecoration: 'none' }} onClick={()=>navigate('/register')}>Register</a>
                                                    </li>
                                                )}

                                                    {username!=='Default Username' &&(
                                                         <li className="bg-white" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '16px', lineHeight: '24px' }}>
                                                         <a href="" className="pt-0 block" style={{ marginTop: '5px', padding: '10px 5px', lineHeight: '37px', fontSize: '12px', fontFamily: '"Lato", sans-serif', color: '#666666', textDecoration: 'none' }}>{username}</a>
                                                     </li>
                                                    )}
                                                    {username!=='Default Username' && (
                                                          <li className="bg-white" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '16px', lineHeight: '24px' }}>
                                                          <a href="/layout" className="pt-0 block" style={{ marginTop: '5px', padding: '10px 5px', lineHeight: '37px', fontSize: '12px', fontFamily: '"Lato", sans-serif', color: '#666666', textDecoration: 'none' }} onClick={()=>navigate('/layout')}>log out</a>
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
                                            <a  id="menu" className="font-bold text-white block uppercase relative" style={{ padding: '18px 0', fontSize: '16px' }} onClick={()=>handleClick('/HomeProduct')}>Product</a>
                                        </li>
                                        <li className="inline-block pr-[30px]">
                                            <a  id="menu" className="font-bold text-white block uppercase relative" style={{ padding: '18px 0' }} onClick={()=>handleClick('/blog')} >Blog</a>

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
                    <div className="minicart-btn_area  pb-[15px]" onClick={() => navigate('/MiniCart', { state: { username: username, ID: ID } })}>
                        <a href='/MiniCart' style={{ textDecoration: 'none' }} className="hiraola-btn hiraola-btn_dark hiraola-btn_fullwidth" >Minicart</a>
                    </div>
                </div>
            </div>
        </header>
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <h2 className="font-bold" style={{ color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontSize: '36px', marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif' }}>Single Product Type</h2>
                        <ul>
                            <li>
                                <a href="" style={{ textDecoration: 'none' }}>Home</a>
                            </li>
                            <li className="active">Single Product</li>
                        </ul>
                    </div>
                </div>
            </div>
            {detail && (
                <div className="sp-area" style={{ padding: '60px 0 0' }}>
                    <div className="container">
                        <div className="sp-nav">
                            <div className="row">
                                <div className="col-lg-5 col-md-5">
                                    <div className="sp-img_area">
                                        <div className="zoompro-border" style={{ border: '1px solid #e5e5e5' }}>
                                            
                                            {showMainImage ? (
                    <img src={mainImageSrc}  alt="" />
                ) : (
                    <img src={`http://127.0.0.1:8000/${detail?.link}`}  alt="" />
                )}
                                        </div>
                                        <div id="gallery" className="sp-img_slider slick-initialized slick-slider">
                                            <button className="fa-solid fa-arrow-left" onClick={goToPrev}></button>
                                            <div className="slick-list draggable">
                                                <div
                                                    className="slick-track"
                                                    style={{
                                                        opacity: '1',
                                                        width: '1696px',
                                                        transform: `translate3d(-${currentSlide * 76}px, 0px, 0px)`, // Thay đổi giá trị của transform
                                                        transition: 'transform 0.5s ease', // Thêm transition để làm mượt chuyển động
                                                    }}
                                                >
                                                    {images.map((image, index) => (
                                                        <a
                                                            key={image.id}
                                                        
                                                            className={`slick-slide ${index === currentSlide ? 'slick-current slick-active' : ''}`}
                                                            style={{ width: '76px' }}
                                                            onClick={() => handleThumbnailClick(index, image.src)}
                                                        >
                                                            <img src={image.src} style={{ width: '100%' }} alt="" />
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                            <button className="fa-solid fa-arrow-right" onClick={goToNext}>
                                                <i className="ion-ios-arrow-forward"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7 col-md-7">
                                    <div className="sp-content">
                                        <div className="sp-heading">
                                            <h5 style={{ marginBottom: '0', paddingBottom: '20px', color: '#333333', fontWeight: 'bold' }}>
                                                <a href="" style={{ color: '#595959', textDecoration: 'none', fontSize: '2.25rem', fontFamily: '"Lato", sans-serif' }}>{detail.ProductName}</a>
                                            </h5>
                                        </div>
                                        <span className="reference" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '15px' }}>Reference: demo_1</span>
                                        <div className="rating-box" style={{ padding: '15px 0 20px' }}>
                                            <ul>
                                                <li style={{ display: 'inline-block', paddingRight: '1px' }}>
                                                    <i className="fa fa-star-of-david" style={{ fontSize: '15px', color: '#cda557', fontWeight: '900', fontFamily: '"Font Awesome 5 Free"' }}></i>
                                                </li>
                                                <li style={{ display: 'inline-block', paddingRight: '1px' }}>
                                                    <i className="fa fa-star-of-david" style={{ fontSize: '15px', color: '#cda557', fontWeight: '900', fontFamily: '"Font Awesome 5 Free"' }}></i>
                                                </li>
                                                <li style={{ display: 'inline-block', paddingRight: '1px' }}>
                                                    <i className="fa fa-star-of-david" style={{ fontSize: '15px', color: '#cda557', fontWeight: '900', fontFamily: '"Font Awesome 5 Free"' }}></i>
                                                </li>
                                                <li style={{ display: 'inline-block', paddingRight: '1px' }}>
                                                    <i className="fa fa-star-of-david" style={{ fontSize: '15px', color: '#cda557', fontWeight: '900', fontFamily: '"Font Awesome 5 Free"' }}></i>
                                                </li>
                                                <li style={{ display: 'inline-block', paddingRight: '1px' }}>
                                                    <i className="fa fa-star-of-david" style={{ fontSize: '15px', color: '#bababa', fontWeight: '900', fontFamily: '"Font Awesome 5 Free"' }}></i>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="sp-essential_stuff font-bold" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '15px' }}>
                                            <ul>
                                                <li>EX Tax:
                                                    <a href="" style={{ color: '#cda557', fontWeight: '400', paddingLeft: '5px', fontFamily: '"Lato", sans-serif', fontSize: '15px' }}>
                                                        <span style={{ color: '#595959', fontFamily: '"Lato", sans-serif', fontSize: '15px' }}>£{detail.Price}</span>
                                                    </a>
                                                </li>
                                                <li>Brands:
                                                    <a href="" style={{ color: '#cda557', fontWeight: '400', paddingLeft: '5px', fontFamily: '"Lato", sans-serif', fontSize: '15px' }}>
                                                        Buxton
                                                    </a>
                                                </li>
                                                <li>Product Code:
                                                    <a href="" style={{ color: '#cda557', fontWeight: '400', paddingLeft: '5px', fontFamily: '"Lato", sans-serif', fontSize: '15px' }}>
                                                        Product 16
                                                    </a>
                                                </li>
                                                <li>Reward Points:
                                                    <a href="" style={{ color: '#cda557', fontWeight: '400', paddingLeft: '5px', fontFamily: '"Lato", sans-serif', fontSize: '15px' }}>
                                                        600
                                                    </a>
                                                </li>
                                                <li>Availability:
                                                    {detail.TotalQuantity > 0 ? (
                                                        <a
                                                            href=""
                                                            style={{
                                                                color: '#cda557',
                                                                fontWeight: '400',
                                                                paddingLeft: '5px',
                                                                fontFamily: '"Lato", sans-serif',
                                                                fontSize: '15px',
                                                            }}
                                                        >
                                                            In Stock
                                                        </a>
                                                    ) : (
                                                        <span
                                                            style={{
                                                                color: 'red',
                                                                fontWeight: '400',
                                                                paddingLeft: '5px',
                                                                fontFamily: '"Lato", sans-serif',
                                                                fontSize: '15px',
                                                            }}
                                                        >
                                                            Out of Stock
                                                        </span>
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="product-size_box" >
                                            <span style={{ paddingRight: '15px', fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '15px' }}>Size</span>
                                            <select name="" className="myniceselect nice-select" id="" style={{ display: 'none' }}>
                                                <option value="1">S</option>
                                                <option value="2">M</option>
                                                <option value="2">L</option>
                                                <option value="2">XL</option>
                                            </select>
                                            <div className="nice-select myniceselect" tabindex="0">
                                                <span className="current">S</span>
                                                <ul className="list">
                                                    <li data-value="1" className="option selected focus">
                                                        S
                                                    </li>
                                                    <li data-value="2" className="option ">
                                                        M
                                                    </li>
                                                    <li data-value="2" className="option ">
                                                        L
                                                    </li>
                                                    <li data-value="2" className="option ">
                                                        XL
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="quantity" style={{ paddingTop: '30px' }}>
                                            <label htmlFor="" className="" style={{ marginBottom: '0.5rem', display: 'inline-block', fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '15px' }}>Quantity</label>
                                            <div className="cart-plus-minus">
                                                <input type="text" className="cart-plus-minus-box" value={formData.Quality} />
                                                <div className="dec qtybutton"  >
                                                    <i className="fa fa-angle-down"></i>
                                                </div>
                                                <div className="inc qtybutton" >
                                                    <i className="fa fa-angle-up"></i>
                                                </div>
                                                <div className="dec qtybutton" onClick={handleDecreaseQuality}>
                                                    <i className="fa fa-angle-down"></i>
                                                </div>
                                                <div className="inc qtybutton" onClick={handleIncreaseQuality}>
                                                    <i className="fa fa-angle-up"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="qty-btn_area" style={{ paddingTop: '30px' }}>
                                            <ul>
                                                <li>
                                                    <a  className="qty-cart_btn" onClick={()=>handleAddCard()}>Add To Cart</a>
                                                </li>
                                                <li>

                                                    <a href="" className="qty-wishlist_btn" data-bs-toggle="tooltip " id="btn" aria-label="Add To Wishlist" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>


                                                        <i className="fa-solid fa-heart" style={{ color: 'black', borderColor: 'black' }}></i>

                                                    </a>
                                                </li>
                                                <li>

                                                    <a href="" className="qty-wishlist_btn" id="btn" data-bs-toggle="tooltip" aria-label="Add To Wishlist" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>


                                                        <i class="fa-solid fa-shuffle" style={{ color: 'black', borderColor: 'black' }}></i>

                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="hiraola-tag-line">
                                            <h6 style={{ fontSize: '18px', marginBottom: '0', fontFamily: '"Lato", sans-serif', color: '#333333', fontWeight: 'bold' }}>Tags:</h6>
                                            <a href="" className="pl-[10px] block">Ring,</a>
                                            <a href="" className="pl-[10px] block">Necklaces,</a>
                                            <a href="" className="pl-[10px] block">Braid,</a>
                                        </div>
                                        <div className="hiraola-social_link flex items-center pt-[25px]">
                                            <ul>
                                                <li className='inline-block pr-[10px]'>
                                                    <a href="" data-bs-toggle="tooltip" id="btn" style={{ border: '1px solid rgba(0, 0, 0, 0.07)', fontSize: '15px', display: 'block', width: '40px', height: '40px', lineHeight: '40px', textAlign: 'center' }} target="_blank" aria-label="Facebook">
                                                        <i className='fab fa-facebook' style={{ color: 'black' }}></i>
                                                    </a>
                                                </li>
                                                <li className='inline-block pr-[10px]'>
                                                    <a href="" data-bs-toggle="tooltip" id="btn" style={{ border: '1px solid rgba(0, 0, 0, 0.07)', fontSize: '15px', display: 'block', width: '40px', height: '40px', lineHeight: '40px', textAlign: 'center' }} target="_blank" aria-label="Facebook">
                                                        <i className='fab fa-twitter-square' style={{ color: 'black' }}></i>
                                                    </a>
                                                </li>
                                                <li className='inline-block pr-[10px]'>
                                                    <a href="" data-bs-toggle="tooltip" id="btn" style={{ border: '1px solid rgba(0, 0, 0, 0.07)', fontSize: '15px', display: 'block', width: '40px', height: '40px', lineHeight: '40px', textAlign: 'center' }} target="_blank" aria-label="Facebook">
                                                        <i className='fab fa-youtube' style={{ color: 'black' }}></i>
                                                    </a>
                                                </li>
                                                <li className='inline-block pr-[10px]'>
                                                    <a href="" data-bs-toggle="tooltip" id="btn" style={{ border: '1px solid rgba(0, 0, 0, 0.07)', fontSize: '15px', display: 'block', width: '40px', height: '40px', lineHeight: '40px', textAlign: 'center' }} target="_blank" aria-label="Facebook">
                                                        <i className='fab fa-google-plus' style={{ color: 'black' }}></i>
                                                    </a>
                                                </li>
                                                <li className='inline-block pr-[10px]'>
                                                    <a href="" data-bs-toggle="tooltip" id="btn" style={{ border: '1px solid rgba(0, 0, 0, 0.07)', fontSize: '15px', display: 'block', width: '40px', height: '40px', lineHeight: '40px', textAlign: 'center' }} target="_blank" aria-label="Facebook">
                                                        <i className='fab fa-instagram' style={{ color: 'black' }}></i>
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

            )}
            <div className="hiraola-product-tab_area-2 sp-product-tab_area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="sp-product-tab_nav">
                                <div className="product-tab">
                                    <ul className="nav product-menu">
                                    <li>
                                        <a id="tab"  style={{ color: ActiveTab === 'description' ? "#cda557" : '#595959',cursor:'pointer' }}>
                                            <span style={{fontFamily:'"Lato", sans-serif',fontSize:'16px',fontWeight:'bold',cursor:'pointer'}} onClick={()=>handleTabChange("description")}>Description</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a id="tab"  style={{ color: ActiveTab === 'specification' ? "#cda557" : '#595959' }} >
                                            <span style={{fontFamily:'"Lato", sans-serif',fontSize:'16px',fontWeight:'bold',cursor:'pointer'}} onClick={()=>handleTabChange("specification")}>Specification</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a id="tab"  style={{ color: ActiveTab === 'reviews' ? "#cda557" : '#595959' }} >
                                            <span style={{fontFamily:'"Lato", sans-serif',fontSize:'16px',fontWeight:'bold',cursor:'pointer'}} onClick={()=>handleTabChange("reviews")}>Reviews</span>
                                        </a>
                                    </li>
                                    </ul>
                                </div>
                                <div className="tab-content hiraola-tab_content">
                                    <div id="description" className={`tab-pane ${ActiveTab === 'description' ? 'active show' : ''}`}>
                                    {renderTabContent()}
                                        {/* 
                                        <div id="reviews" className="tab-pane" ></div> */}
                                    </div>
                                    <div id="specification" className={`tab-pane ${ActiveTab === 'specification' ? 'active show' : ''}`}>
                                    {renderTabContent()}
</div>
<div id="reviews" className={`tab-pane ${ActiveTab === 'reviews' ? 'active show' : ''}`}>
  {/* Nội dung của tab Reviews */}
  {renderTabContent()}
</div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hiraola-product_area hiraola-product_area-2 ">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="hiraola-section_title">
                                <h4 style={{fontFamily:'"Lato", sans-serif',color:"#333333",fontWeight:"700",fontSize:'24px'}}>Special Offer</h4>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="hiraola-product_slider-3 slick-initialized slick-slider">
                            <button className="fa-solid fa-arrow-right" onClick={goToNextsecond} id="next">
                                                <i className="ion-ios-arrow-forward"></i>
                                            </button>
                                <div className="slick-list draggable">
                                    <div className="slick-track" style={{opacity:"1",width:"4624px", transform: `translate3d(-${currency * 76}px, 0px, 0px)`,transition:"all ease 0.5s"}}>
                                    {products.map((product) => (
                                        <div key={product.id} className="slide-item slick-slide slick-cloned" style={{width:'259px'}}>
                                            <div className="single_product" style={{border:"1px solid #e5e5e5"}}>
                                                <div className="product-img" style={{position:"relative",overflow:"visible"}}>
                                                    <a href="" style={{display:"block"}}>
                                                   
                                                        <img src={product.image} style={{width:"100%"}} alt="" />
                                                    </a>
                                                    <span className="sticker-2">
                                                        Sale
                                                    </span>
                                                    <div className="add-actions">
                                                        <ul>
                                                            <li>
                                                                <a href="" className="hiraola-add_cart">
                                                                    <i className="ion-bag"></i>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="" className="hiraola-add_compare">
                                                                    <i className="ion-ios-shuffle-strong"></i>
                                                                    </a></li>
                                                                    <li className="quick-view-btn">
                                                                        <a href="">
                                                                            <i className="ion-eye"></i>
                                                                        </a>
                                                                    </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="hiraola-product_content">
                                                    <div className="product-desc_info">
                                                        <h6 style={{fontFamily:"Lato, sans-serif",color:"#333333",fontWeight:"700"}}>
                                                            <a href="" style={{fontFamily:"Lato, sans-serif",color:"#333333",fontWeight:"700"}} className="product-name">{product.name}</a>
                                                        </h6>
                                                        <div className="price-box">
                                                            <span className="new-price">£{product.price}</span>
                                                        </div>
                                                        <div className="additional-add_action">
                                                            <ul>
                                                                <li>
                                                                    <a href="" className="hiraola-add_compare" style={{color:"#595959",textDecoration:"none"}}>
                                                                        <i className="ion-android-favorite-outline"></i>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="rating-box">
                                <ul>
                                    <li style={{display:'inline-block'}}>
                                        <i className="fa fa-star-of-david" style={{color:"#cda557",fontWeight:"900"}}></i>
                                    </li>
                                    <li style={{display:'inline-block'}}>
                                        <i className="fa fa-star-of-david" style={{color:"#cda557",fontWeight:"900"}}></i>
                                    </li>
                                    <li style={{display:'inline-block'}}>
                                        <i className="fa fa-star-of-david" style={{color:"#cda557",fontWeight:"900"}}></i>
                                    </li>
                                    <li style={{display:'inline-block'}}>
                                        <i className="fa fa-star-of-david" style={{color:"#cda557",fontWeight:"900"}}></i>
                                    </li>
                                    <li style={{display:'inline-block'}}>
                                        <i className="fa fa-star-of-david" style={{color:"#cda557",fontWeight:"900"}}></i>
                                    </li>
                                </ul>
                            </div>
                            <div className="product-buttons" style={{paddingTop:'12px'}}>
																				<a className="btn btn-primary mr-2"  >
																					Detail
																				</a>
																				<button className="btn btn-success" onClick={()=>handleAddToCard(product.id)}     >
																					Add to Cart
																				</button>
																			</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                       ))}
                                     
                                      
                                       
                                    </div>
                                </div>
                                <button className="fa-solid fa-arrow-left" onClick={goToPrevSecond} id="prev" >
                                                <i className="ion-ios-arrow-forward"></i>
                                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hiraola-product_area hiraola-product_area-2 ">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="hiraola-section_title">
                                <h4 style={{fontFamily:'"Lato", sans-serif',color:"#333333",fontWeight:"700",fontSize:'24px'}}>New Product</h4>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="hiraola-product_slider-3 slick-initialized slick-slider">
                            <button className="fa-solid fa-arrow-right" onClick={goToNextsecond2} id="next">
                                                <i className="ion-ios-arrow-forward"></i>
                                            </button>
                                <div className="slick-list draggable">
                                    <div className="slick-track" style={{opacity:"1",width:"4624px", transform: `translate3d(-${curent * 76}px, 0px, 0px)`,transition:"all ease 0.5s"}}>
                                    {NewProduct.map((product) => (
                                        <div key={product.id} className="slide-item slick-slide slick-cloned" style={{width:'259px'}}>
                                            <div className="single_product" style={{border:"1px solid #e5e5e5"}}>
                                                <div className="product-img" style={{position:"relative",overflow:"visible"}}>
                                                    <a href="" style={{display:"block"}}>
                                                   
                                                        <img src={product.image} style={{width:"100%"}} alt="" />
                                                    </a>
                                                    <span className="sticker-2">
                                                        Sale
                                                    </span>
                                                    <div className="add-actions">
                                                        <ul>
                                                            <li>
                                                                <a href="" className="hiraola-add_cart">
                                                                    <i className="ion-bag"></i>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="" className="hiraola-add_compare">
                                                                    <i className="ion-ios-shuffle-strong"></i>
                                                                    </a></li>
                                                                    <li className="quick-view-btn">
                                                                        <a href="">
                                                                            <i className="ion-eye"></i>
                                                                        </a>
                                                                    </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="hiraola-product_content">
                                                    <div className="product-desc_info">
                                                        <h6 style={{fontFamily:"Lato, sans-serif",color:"#333333",fontWeight:"700"}}>
                                                            <a href="" style={{fontFamily:"Lato, sans-serif",color:"#333333",fontWeight:"700"}} className="product-name">{product.name}</a>
                                                        </h6>
                                                        <div className="price-box">
                                                            <span className="new-price">£{product.price}</span>
                                                        </div>
                                                        <div className="additional-add_action">
                                                            <ul>
                                                                <li>
                                                                    <a href="" className="hiraola-add_compare" style={{color:"#595959",textDecoration:"none"}}>
                                                                        <i className="ion-android-favorite-outline"></i>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="rating-box">
                                <ul>
                                    <li style={{display:'inline-block'}}>
                                        <i className="fa fa-star-of-david" style={{color:"#cda557",fontWeight:"900"}}></i>
                                    </li>
                                    <li style={{display:'inline-block'}}>
                                        <i className="fa fa-star-of-david" style={{color:"#cda557",fontWeight:"900"}}></i>
                                    </li>
                                    <li style={{display:'inline-block'}}>
                                        <i className="fa fa-star-of-david" style={{color:"#cda557",fontWeight:"900"}}></i>
                                    </li>
                                    <li style={{display:'inline-block'}}>
                                        <i className="fa fa-star-of-david" style={{color:"#cda557",fontWeight:"900"}}></i>
                                    </li>
                                    <li style={{display:'inline-block'}}>
                                        <i className="fa fa-star-of-david" style={{color:"#cda557",fontWeight:"900"}}></i>
                                    </li>
                                </ul>
                            </div>
                            <div className="product-buttons" style={{paddingTop:'12px'}}>
																				<a className="btn btn-primary mr-2"  >
																					Detail
																				</a>
																				<button className="btn btn-success" onClick={()=>handleAddToCard(product.id)}     >
																					Add to Cart
																				</button>
																			</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                       ))}
                                     
                                      
                                       
                                    </div>
                                </div>
                                <button className="fa-solid fa-arrow-left" onClick={goToPrevSecond2} id="prev" >
                                                <i className="ion-ios-arrow-forward"></i>
                                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}
export default DetailProduct;