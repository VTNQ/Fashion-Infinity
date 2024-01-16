import React from "react";

import axios  from 'axios';

import image1 from "../../../images/homepage1.webp";
import image2 from "../../../images/homepage2.jpg";
import image3 from "../../../images/homepage3.jpg";

import imageArrowLeft from "../../../images/arrow-left.png";
import imageArrowRight from "../../../images/arrow-right.png";
import imageSymbol1 from "../../../images/homepage_symbol1.webp";
import imageSymbol2 from "../../../images/homepage_symbol2.webp";
import imageSymbol3 from "../../../images/homepage_symbol3.webp";
import imageSymbol4 from "../../../images/homepage_symbol4.webp";
import homepage_banner1 from "../../../images/homepage/homepage-banner1.webp";

import homepage_banner2 from "../../../images/homepage/ring3.png";
import homepage_banner3 from "../../../images/homepage/bracelet2.png";

import ring1 from "../../../images/ring1.webp";
import anklet1 from "../../../images/homepage/anklet1.webp";
import earring1 from "../../../images/homepage/earring1.webp";
import bracelet1 from "../../../images/homepage/bracelet1.webp";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { useState, useEffect, useRef } from 'react';


function Homepage() {
    const [Event,setEvent]=useState([]);
    const [slides, setSlides] = useState([
      
    ]);
    useEffect(()=>{
      const fetchData=async()=>{
        try{
          const response=await axios.get("http://127.0.0.1:8000/api/displayEvent");
          setEvent(response.data);
          const formattedData = response.data.map(event => ({
            img: `http://127.0.0.1:8000/${event.BannerUrl}`,
            text1: event.Title,
            text2: event.Description,
            title0: event.Description,
           title1:'Surface Studio 2023',
            
          }));
          setSlides(formattedData)
        }catch(error){
          console.error('Error during fetch:', error);
        }
      }
      fetchData();
    },[])
  
    
    // const [productNew, setproductNew] = useState([
    //     {img: ring1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'NECKLACES'},
    //     {img: ring1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'NECKLACES'},
    //     {img: ring1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'NECKLACES'},
    //     {img: ring1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'NECKLACES'},
    //     {img: ring1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'NECKLACES'},
    //     {img: earring1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'EARRINGS'},
    //     {img: earring1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'EARRINGS'},
    //     {img: earring1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'EARRINGS'},
    //     {img: earring1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'EARRINGS'},
    //     {img: earring1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'EARRINGS'},
    //     {img: earring1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'EARRINGS'},
    //     {img: anklet1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'ANKLET'},
    //     {img: anklet1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'ANKLET'},
    //     {img: anklet1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'ANKLET'},
    //     {img: anklet1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'ANKLET'},
    //     {img: anklet1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'ANKLET'},
    //     {img: anklet1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'ANKLET'},
    //     {img: bracelet1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'BRACELET'},
    //     {img: bracelet1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'BRACELET'},
    //     {img: bracelet1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'BRACELET'},
    //     {img: bracelet1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'BRACELET'},
    //     {img: bracelet1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'BRACELET'},
    //     {img: bracelet1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'BRACELET'},
        
        
    // ]);
    const [productTrend, setproductTrend] = useState([
        {img: ring1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'NECKLACES'},
        {img: ring1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'NECKLACES'},
        {img: ring1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'NECKLACES'},
        {img: ring1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'NECKLACES'},
        {img: ring1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'NECKLACES'},
        {img: earring1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'EARRINGS'},
        {img: earring1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'EARRINGS'},
        {img: earring1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'EARRINGS'},
        {img: earring1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'EARRINGS'},
        {img: earring1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'EARRINGS'},
        {img: earring1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'EARRINGS'},
        {img: anklet1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'ANKLET'},
        {img: anklet1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'ANKLET'},
        {img: anklet1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'ANKLET'},
        {img: anklet1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'ANKLET'},
        {img: anklet1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'ANKLET'},
        {img: anklet1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'ANKLET'},
        {img: bracelet1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'BRACELET'},
        {img: bracelet1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'BRACELET'},
        {img: bracelet1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'BRACELET'},
        {img: bracelet1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'BRACELET'},
        {img: bracelet1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'BRACELET'},
        {img: bracelet1,name: "Swirl 1 Medium Pendant La ...",price: "152.00",category: 'BRACELET'},
        
        
    ]);

    const [bannerData1, setBannerData] = useState({
        img: homepage_banner1,
        text1: "-25% Off",
        text2: "This Week",
        title1: "Featured Product",
        title2: "Meito Accessories 2023",
        
        price: "$900.00",
        
      });

    const [slideIndex, setSlideIndex] = useState(0);
  
    const settings = {
        
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 2,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 3,
                infinite: true,
                
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            }
          ]

    };

    const settings1 = {
        
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 2,
        responsive: [
            
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            }
          ]

    };



//slider0
    const sliderRef = useRef(null);

     const next = () => {
    sliderRef.current.slickNext();
  };

  // Go to the previous slide
  const previous = () => {
    sliderRef.current.slickPrev();
  };

  //slider1
  const productSliderRef = useRef(null);
  const nextProduct = () => {
    productSliderRef.current.slickNext();
  };
  
  const previousProduct = () => {
    productSliderRef.current.slickPrev();
  };
  //slider2
  const productSlider1Ref = useRef(null);
  const nextProduct1 = () => {
    productSlider1Ref.current.slickNext();
  };
  
  const previousProduct1 = () => {
    productSlider1Ref.current.slickPrev();
  };

    useEffect(() => {
      const interval = setInterval(() => {
        nextSlide();
      }, 10000); // Chuyển slide sau mỗi 100000ms
      return () => clearInterval(interval);
    }, [slideIndex]);
  
    const nextSlide = () => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };
    
    const renderPaginationDots = () => {
        return slides.map((_, idx) => (
            <button
                key={idx}
                className={`h-4 w-4 mx-1 rounded-full ${
                    slideIndex === idx ? 'bg-[#CDA557]' : 'bg-white'
                } focus:outline-none`}
                onClick={() => setSlideIndex(idx)}
                aria-label={`Slide ${idx}`}
            />
        ));
    };

    const prevSlide = () => {
      setSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };
    const [showButtons, setShowButtons] = useState(false);

    
        const [hoveredItem, setHoveredItem] = useState(null);

  

  // Hover effect handlers
  const handleMouseEnter = (id) => {
    setHoveredItem(id);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const [products, setProducts] = useState([]);

const [activeCategory, setActiveCategory] = useState();


  const [categoriesFirst,setCategoriesFirst] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/getcategoriestohomepage');
        console.log(response.data);
        setCategoriesFirst(response.data);
      } catch (error) {
        console.error('Error fetching categoriesFirst:', error);
      }
    };
    fetchData();
  }, []);
  
  
  
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/getProductToHomePage');
      const activeProducts = response.data.filter(product => product.Picture_status === 1);
      setProducts(activeProducts);
      
      const filtered = activeProducts.filter(product => product.NameCategory === "Necklace");
      setFilterProducts(filtered);
      setActiveCategory('Necklace');
    } catch (error) {
      // Handle errors here
      console.error('Error fetching products:', error);
    }
  };

  fetchProducts();
}, []);
  
const [filterProducts, setFilterProducts] = useState([]);

const handleCategorySelection = (categoryName) => {
  setActiveCategory(categoryName); 
  const filtered = products.filter((product) => product.NameCategory === categoryName);
  setFilterProducts(filtered); // Update the state with filtered products
};

  

//categories 4 cai con lai

const [products1, setProducts1] = useState([]);

const [activeCategory1, setActiveCategory1] = useState();


  const [categoriesFirst1,setCategoriesFirst1] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/getcategoriestohomepage1');
        console.log(response.data);
        setCategoriesFirst1(response.data);
      } catch (error) {
        console.error('Error fetching categoriesFirst:', error);
      }
    };
    fetchData();
  }, []);
  
  
  
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/getProductToHomePage');
      const activeProducts = response.data.filter(product => product.Picture_status === 1);
      setProducts1(activeProducts);
      
      const filtered = activeProducts.filter(product => product.NameCategory === "Shake");
      setFilterProducts1(filtered);
      setActiveCategory1('Shake');
    } catch (error) {
      // Handle errors here
      console.error('Error fetching products:', error);
    }
  };

  fetchProducts();
}, []);
  
const [filterProducts1, setFilterProducts1] = useState([]);

const handleCategorySelection1 = (categoryName) => {
  setActiveCategory1(categoryName); 
  const filtered = products.filter((product) => product.NameCategory === categoryName);
  setFilterProducts1(filtered); // Update the state with filtered products
};

const [productArrival,setProductArrival] = useState([]); 
useEffect(()=>{
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/getProductToNewArrival');
      console.log('Full data:', response.data); // Check the full dataset

      const activeProducts = response.data.filter(product => product.Picture_status === 1);
      

      // Assuming the data is sorted by ID in ascending order from the backend:
     

      setProductArrival(activeProducts);
    } catch (error) {
      console.error('Error fetching productArrival', error);
    }
  };
  fetchData();
},[]);
  

//lay truy cap
// const [visitCount, setVisitCount] = useState(0);

// useEffect(() => {
//   const fetchVisitCount = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/visits-count');
//       setVisitCount(response.data.visitsCount);
//     } catch (error) {
//       console.error('Lỗi khi tải số lượt truy cập:', error);
//     }
//   };
  
//   fetchVisitCount();
// }, []);

// // Sử dụng useEffect hook để gọi API một lần khi component được mount
// useEffect(() => {
//   axios.post('http://127.0.0.1:8000/api/record-visit', { path: window.location.pathname })
//     .then(response => {
//       console.log('Visit recorded:', response.data);
//     })
//     .catch(error => {
//       console.error('Error recording visit:', error);
//     });
// }, []); // Rỗng dependencies array để đảm bảo chỉ chạy một lần



const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlidehaha = () => { 
    setCurrentSlide((prevSlide) => 
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    ); 
  }; 

  const prevSlidehaha = () => { 
    setCurrentSlide((prevSlide) => 
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1 
    ); 
  }; 
  useEffect(() => {
    const slideInterval = setInterval(() => { 
      nextSlide();
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 600, min: 400 },
      items: 2
    },
    tinymobile: {
      breakpoint: { max: 400, min: 0 },
      items: 1
    }
  };


  const responsiveArrival = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 737 },
      items: 4
    },
    mobile: {
      breakpoint: { max: 737, min: 554 },
      items: 3
    },
    supermobile: {
      breakpoint: { max: 554, min: 334 },
      items: 2
    },
    tinymobile: {
      breakpoint: { max: 334, min: 0 },
      items: 1
    }
  };
  


    //===============================================================================================================================
    return (
      <div>
        
        
        <div className="slider-container h-[80vh] relative max-w-full overflow-hidden" onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}>
        <div
          className="slider w-full flex transition-transform duration-500 ease-out h-full"
          style={{ transform: `translateX(-${slideIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              className="slide w-full flex-shrink-0 items-center justify-center relative "
              key={index}
            >
              <img src={slide.img} className="h-full w-full object-cover z-[1]" alt="Museum Image" />
              {/* <div className="overlay absolute inset-0 bg-black opacity-50 z-[2]"></div> */}
              <div class="hero w-full flex flex-col gap-0 ">           
              
            <div className="flex gap-2 px-[10%]">
            <p className="text-[2rem] m-0 " style={{color: "#CDA557",fontFamily: 'lato',animation: 'focusIn 1s ease forwards'}}>{slide.text1}</p>
            <p className="text-[2rem] m-0" style={{color: "#333333",fontFamily: 'lato', animation: 'focusIn 1s ease forwards'}}>{slide.text2}</p>
            </div>
			<div className="px-[10%] ">
            <h5 class="text-[5.5rem] m-0 font-semibold"  style={{color: "#333333",fontFamily: 'lato',animation: 'focusIn 1s ease forwards'}}>{slide.title0} </h5>
			<p class=" text-[5rem] m-0 font-medium"  style={{color: "#333333",fontFamily: 'lato',animation: 'focusIn 1s ease forwards'}}>{slide.title1}</p>
			
			

            <div className="flex gap-2 mt-4">
            <p className="text-[2.5rem] font-bold" style={{color: "#CDA557",fontFamily: 'lato',animation: 'focusIn 1s ease forwards'}}>Staring at </p>
            <p className="text-[2.5rem] font-bold" style={{color: "#333333",fontFamily: 'lato',animation: 'focusIn 1s ease forwards'}}>{slide.price}</p>
            
            </div>
			<h4 className="hover:text-black"><a id="button" class=" col " href="#">Shopping Now</a></h4>
            </div>
			
		  </div>
              {/* Nội dung của mỗi slide */}
              {/* ... */}
            </div>
          ))}
        </div>
        <div className="absolute bottom-5 w-full flex justify-center z-20">
                {renderPaginationDots()}
            </div>
        {showButtons && (
                <>
        <button
          onClick={prevSlide} 
          className={`absolute left-10 top-1/2 transform -translate-y-1/2 z-30 rounded-full bg-none hover:bg-gray-100 cursor-pointer transition-all duration-900 shadow-lg ${showButtons ? 'opacity-100' : 'opacity-0'}`}
          aria-label="Previous slide" style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)' }}         
        >
          <img src={imageArrowLeft} className="w-[45px] h-auto" alt="Previous slide" />
        </button>
        <button
          onClick={nextSlide}
          className={`absolute right-10 top-1/2 transform -translate-y-1/2 z-30 rounded-[50%] bg-none hover:bg-gray-100 cursor-pointer transition-all duration-500 shadow-lg ${showButtons ? 'opacity-100' : 'opacity-0'}`}
          aria-label="Next slide" style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)' }}
        >
          <img src={imageArrowRight} className="w-[45px] h-auto" alt="Next slide" />
        </button>
        </>
            )}
      </div>
      <div className="w-full    grid grid-cols-1 gap-1 px-[8%] mt-[5%]  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div className=" text-center flex flex-col items-center">
                <img className="w-[65px] h-auto m-1" src={imageSymbol1} alt="" />
                <h1 className="text-[1.7rem] font-semibold" style={{fontFamily: 'lato'}}>Free UK Standard Delivery</h1>
                <p className="text-[1.7rem]" style={{fontFamily: 'lato'}}>Designated day delivery</p>
            </div>
            <div className=" text-center flex flex-col items-center">
                <img className="w-[65px] h-auto m-1" src={imageSymbol2} alt="" />
                <h1 className="text-[1.7rem] font-semibold" style={{fontFamily: 'lato'}}>Freshly Prepared Ingredients</h1>
                <p className="text-[1.7rem]" style={{fontFamily: 'lato'}}>Made for your delivery date</p>
            </div>
            <div className=" text-center flex flex-col items-center">
                <img className="w-[65px] h-auto m-1" src={imageSymbol3} alt="" />
                <h1 className="text-[1.7rem] font-semibold" style={{fontFamily: 'lato'}}>98% Of Anta Clients</h1>
                <p className="text-[1.7rem]" style={{fontFamily: 'lato'}}>Reach their personal goals set</p>
            </div>
            <div className=" text-center flex flex-col items-center">
                <img className="w-[65px] h-auto m-1" src={imageSymbol4} alt="" />
                <h1 className="text-[1.7rem] font-semibold" style={{fontFamily: 'lato'}}>Winner Of 15 Awards</h1>
                <p className="text-[1.7rem]" style={{fontFamily: 'lato'}}>Healthy food and drink 2022</p>
            </div>
            
      </div>
      <div className="border-[1px] mt-16 border-[#E5E5E5] mx-[5%]" ></div>
      

          <div className="mt-14 w-full ">
                <div className="flex justify-between px-[5%]">
                    <h1>NEW ARRIVAL</h1>
                    <div className="flex">
                    <button onClick={previous}><img className="h-[40px]" src={imageArrowLeft} alt="" /></button>
                    <button onClick={next}><img className="h-[40px]" src={imageArrowRight} alt="" /></button>
                    </div>
                </div>
                <div className="border-[1px] mt-3  border-[#E5E5E5] mx-[5%]"></div>


                <div className="px-[4%]">
<Carousel
        swipeable
        draggable
        
        responsive={responsiveArrival}
        ssr // Server-side rendering
        infinite
        autoPlay={false} // Set to true if you want the carousel to autoplay
        autoPlaySpeed={3000}
        keyBoardControl
        customTransition="transform 300ms ease-in-out"
        transitionDuration={300}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="carousel-item-padding-40-px px-3 pb-3 pt-8" 
        
      >
        {productArrival.map((product, index) => (
            <div className=" carousel-item border space-x-5 rounded-[5px] px-2 m-2 bg-white flex flex-col items-center justify-center h-full" key={product.IDproduct} style={{ width: '100%', display: 'inline-block' }}>
               <img className="w-full h-[250px] object-cover lg-max:h-[200px] md-max:h-[150px]" src={`http://127.0.0.1:8000/${product.link}`} alt="" />
                    
                    
                    
                   
                    <div class="tag-container absolute  left-0">
                     <div class="tag">
                             <span style={{fontFamily: 'lato'}} class="tag-text">NEW</span>
                                    </div>
                    </div>
                    <div className="px-[8%] mt-10">
                    <h1 style={{fontFamily: 'lato',}} className="text-[1.7rem] m-0 font-semibold product-name">{product.ProductName}</h1>
                    

                    <div className="flex justify-between items-center">
                    <h1 style={{fontFamily: 'lato'}} className="text-[1.7rem] mt-3">${product.Price}.00</h1>
                    <i class='bx bx-heart'  ></i>
                    </div>

                    <ul className="flex">
                        
                        <li><i class='bx bx-star' style={{color:'#cda557'}}  ></i></li>
                        <li><i class='bx bx-star' style={{color:'#cda557'}}  ></i></li>
                        <li><i class='bx bx-star' style={{color:'#cda557'}}  ></i></li>
                        <li><i class='bx bx-star' style={{color:'#cda557'}}  ></i></li>
                        <li><i class='bx bx-star' style={{color:'#ababab'}}  ></i></li>
                        
                    </ul>
                    </div>
            </div>
          ))}
      </Carousel>
</div>
            </div>

        <div className="relative w-full mt-[8%] px-[5%] overflow-hidden">
            <img  className="w-full h-[410px] object-cover " src={bannerData1.img} alt="" />
            <div className="absolute top-[20%] pl-[8%] xs-max:pl-[4%] ">
                <div className="flex gap-4">
                    <h1 className="text-[2rem] m-0 md-max:text-[1.7rem]" style={{color: "#EA4755",fontFamily: 'lato'}}>{bannerData1.text1}</h1>
                    <h1 className="text-[2rem] m-0 md-max:text-[1.7rem]"  style={{color: "#333333",fontFamily: 'lato'}}>{bannerData1.text2}</h1>
                </div>
                <h1 class="text-[2.5rem] m-0 font-semibold md-max:text-[4.5rem] xs-max:text-[3rem]"  style={{color: "#333333",fontFamily: 'lato'}}>{bannerData1.title1}</h1>
                <h1 class=" text-[5rem] m-0 font-medium md-max:text-[4.5rem] xs-max:text-[3rem]"  style={{color: "#333333",fontFamily: 'lato'}}>{bannerData1.title2}</h1>
                <div className="flex gap-3 mt-7 xs-max:mt-3">
                    <p className="text-[2.5rem] font-bold md-max:text-[2rem]" style={{color: "#333333",fontFamily: 'lato'}}>Staring at</p>
                    <p className="text-[2.5rem] font-bold md-max:text-[2rem]" style={{color: "#EA4755",fontFamily: 'lato'}}>{bannerData1.price}</p>
                </div>
                <h4 className="hover:text-black"><a id="button" class=" col " href="#">Shopping Now</a></h4>


            </div>
        </div>


        {/* ================================================================================ */}
        <div className=" mt-14 w-full ">
                
                <div className="flex justify-between px-[5%] md-max:flex-col">
                    <h1>NEW PRODUCTS</h1>

                    <div className="flex items-center gap-16 xs-max:gap-6 xs-max:mt-4">
                    {categoriesFirst.map((category) => (
  <button
    className={`font-semibold xs-max:text-[1.5rem] ${activeCategory === category.Name && category.Name === 'Necklace' ? 'active-class-or-style' : 'inactive-class-or-style'}`}
    key={category.ID} style={{fontFamily: 'lato'}}
    onClick={() => handleCategorySelection(category.Name)}
  >
    {category.Name}
  </button>
))}

      </div>
      
                </div>
                <div className="border-[1px] mt-3 border-[#E5E5E5] mx-[5%]"></div>

<div className="px-[4%]">
<Carousel
        swipeable
        draggable
        
        responsive={responsive}
        ssr
        infinite
        autoPlay={false}
        autoPlaySpeed={3000}
        keyBoardControl
        customTransition="transform 300ms ease-in-out"
        transitionDuration={300}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="carousel-item-padding-40-px px-3 pb-3 pt-8"  
      >
      
        {filterProducts.map((product, index) => (
            <div className=" carousel-item border space-x-5 rounded-[5px] px-2 m-2 bg-white flex flex-col items-center justify-center h-full" key={product.IDproduct} style={{ width: '100%', display: 'inline-block' }}>
               <img className="w-full h-[250px] object-cover lg-max:h-[200px] md-max:h-[150px]" src={`http://127.0.0.1:8000/${product.link}`} alt="" />
                    <div class="tag-container absolute  left-0">
                     <div class="tag">
                             <span style={{fontFamily: 'lato'}} class="tag-text">NEW</span></div>
                    </div>
                    <div className="px-[8%] mt-10">
                    <h1 style={{fontFamily: 'lato',}} className="text-[1.7rem] m-0 font-semibold product-name">{product.ProductName}</h1>

                    <div className="flex justify-between items-center">
                    <h1 style={{fontFamily: 'lato'}} className="text-[1.7rem] mt-3">${product.Price}.00</h1>
                    <i class='bx bx-heart'  ></i>


                    </div>

                    <ul className="flex">
                    
                      
                        <li> <i class='bx bx-star' style={ {color:'#cda557'} }  ></i> </li>
                        <li> <i class='bx bx-star' style={ {color:'#cda557'} }  ></i> </li>
                        <li> <i class='bx bx-star' style={ {color:'#cda557'} }  ></i> </li>
                        <li> <i class='bx bx-star' style={ {color:'#cda557'} }  ></i> </li>
                        <li> <i class='bx bx-star' style={ {color:'#ababab'} }  ></i> </li>
                      
                    </ul>

                    </div>
            </div>
          ))}
      </Carousel>
</div>
                
        </div>
        
       
        <div className="bg-none w-full mt-[8%] px-[5%] flex gap-14 lg-max:flex-col">
                <div className="relative w-full min-h-[220px] sm-max:min-h-[190px] flex gap-[10%] bg-[#F3F5F7] justify-center items-center">
                    <img className="w-auto h-[220px] sm-max:h-[160px]" src={homepage_banner2} alt="" />
                    <div className="">
                        <h1 style={{fontFamily: 'lato',}} className="text-[2rem] m-0 text-right">Hot Sale</h1>
                        <h1 style={{fontFamily: 'lato',}} className="text-[2.9rem] m-0 font-semibold text-right">Diamond</h1>
                    </div>
                </div>
                <div className="w-full min-h-[220px] flex gap-[10%] bg-[#F3F5F7] justify-center items-center">
                <div>
                        <h1 style={{fontFamily: 'lato',}} className="text-[1.7rem] m-0 text-left">Hot Sale</h1>
                        <h1 style={{fontFamily: 'lato',}} className="text-[2.5rem] m-0 font-semibold text-left"> Bracelet</h1>
                    </div>
                    <img className="w-auto h-[220px] sm-max:h-[160px]" src={homepage_banner3} alt="" />
                    
                </div>
                
        </div>
        <div className=" mt-14 w-full ">
                
                <div className="flex justify-between px-[5%] md-max:flex-col">
                    <h1>TRENDING PRODUCTS</h1>

                    <div className="flex items-center gap-16 xs-max:gap-6 xs-max:mt-4">
                    {categoriesFirst1.map((category) => (
  <button
  className={`font-semibold xs-max:text-[1.5rem] ${activeCategory1 === category.Name && category.Name === 'Shake' ? 'active-class-or-style' : 'inactive-class-or-style'}`}
  key={category.ID} style={{fontFamily: 'lato'}}
  onClick={() => handleCategorySelection1(category.Name)}
>
  {category.Name}
</button>
))}

      </div>
      
                </div>
                <div className="border-[1px] mt-3 border-[#E5E5E5] mx-[5%]"></div>


                



                <div className="px-[4%]">
<Carousel
        swipeable
        draggable
        
        responsive={responsive}
        ssr // Server-side rendering
        infinite
        autoPlay={false} // Set to true if you want the carousel to autoplay
        autoPlaySpeed={3000}
        keyBoardControl
        customTransition="transform 300ms ease-in-out"
        transitionDuration={300}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="carousel-item-padding-40-px px-3 pb-3 pt-8" 
        
      >
        {filterProducts1.map((product, index) => (
            <div className=" carousel-item border space-x-5 rounded-[5px] px-2 m-2 bg-white flex flex-col items-center justify-center h-full" key={product.IDproduct} style={{ width: '100%', display: 'inline-block' }}>
               <img className="w-full h-[250px] object-cover lg-max:h-[200px] md-max:h-[150px]" src={`http://127.0.0.1:8000/${product.link}`} alt="" />
                    
                    
                    
                   
                    <div class="tag-container absolute  left-0">
                     <div class="tag">
                             <span style={{fontFamily: 'lato'}} class="tag-text">NEW</span>
                                    </div>
                    </div>
                    <div className="px-[8%] mt-10">
                    <h1 style={{fontFamily: 'lato',}} className="text-[1.7rem] m-0 font-semibold product-name">{product.ProductName}</h1>
                    

                    <div className="flex justify-between items-center">
                    <h1 style={{fontFamily: 'lato'}} className="text-[1.7rem] mt-3">${product.Price}.00</h1>
                    <i class='bx bx-heart'  ></i>
                    </div>

                    <ul className="flex">
                        
                        <li><i class='bx bx-star' style={{color:'#cda557'}}  ></i></li>
                        <li><i class='bx bx-star' style={{color:'#cda557'}}  ></i></li>
                        <li><i class='bx bx-star' style={{color:'#cda557'}}  ></i></li>
                        <li><i class='bx bx-star' style={{color:'#cda557'}}  ></i></li>
                        <li><i class='bx bx-star' style={{color:'#ababab'}}  ></i></li>
                        
                    </ul>
                    </div>
            </div>
          ))}
      </Carousel>
</div>
                
        </div>
        <div className="bg-none w-full mt-[8%] px-[5%] flex gap-14 lg-max:flex-col">
                <div className="relative w-full min-h-[220px] sm-max:min-h-[190px] flex gap-[10%] bg-[#F3F5F7] justify-center items-center">
                    <img className="w-auto h-[150px] sm-max:h-[160px]" src={homepage_banner2} alt="" />
                    <div className="">
                        <h1 style={{fontFamily: 'lato',}} className="text-[2rem] m-0 text-right">Hot Sale</h1>
                        <h1 style={{fontFamily: 'lato',}} className="text-[2.9rem] m-0 font-semibold text-right">Diamond</h1>
                    </div>
                </div>
                <div className="w-full min-h-[220px] flex gap-[10%] bg-[#F3F5F7] justify-center items-center">
                <div>
                        <h1 style={{fontFamily: 'lato',}} className="text-[1.7rem] m-0 text-left">Hot Sale</h1>
                        <h1 style={{fontFamily: 'lato',}} className="text-[2.5rem] m-0 font-semibold text-left"> Bracelet</h1>
                    </div>
                    <img className="w-auto h-[150PX] sm-max:h-[160px]" src={homepage_banner3} alt="" />
                    
                </div>
                <div className="relative w-full min-h-[220px] sm-max:min-h-[190px] flex gap-[10%] bg-[#F3F5F7] justify-center items-center">
                    <img className="w-auto h-[150px] sm-max:h-[160px]" src={homepage_banner2} alt="" />
                    <div className="">
                        <h1 style={{fontFamily: 'lato',}} className="text-[2rem] m-0 text-right">Hot Sale</h1>
                        <h1 style={{fontFamily: 'lato',}} className="text-[2.9rem] m-0 font-semibold text-right">Diamond</h1>
                    </div>
                </div>
                
        </div>
            
        
      </div>

      
    );
  }
export default Homepage;