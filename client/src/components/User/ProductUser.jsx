
import image from './images/user2-160x160.jpg';
import React, { useEffect, useState, useRef } from 'react';
import Slider from 'rc-slider';
import Swal from 'sweetalert2';
import logo2 from '../menu/image/logorespon.png';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'rc-slider/assets/index.css'
import 'react-toastify/dist/ReactToastify.css';
import MenuHomepage from '../menu/MenuHomepage';
import { useNavigate ,useLocation} from "react-router-dom";
import jewry from './images/jewry.png';
import us from '../menu/image/us.png';
import France from '../menu/image/France.png';
import logo from '../menu/image/logo.png';
import jw from './images/jw.png';
import jew2 from './images/jew2.png';

import axios from 'axios';
import TreeviewMenu from "../superadmin/TreeViewMenu";
const featureEnabled = window.location.pathname.includes("/HomeProduct");

if (featureEnabled) {
	require("./global.css");
	require("../User/list.css");
	require('./bootstrap.min.css');
	require('./index.css');
	require('./fontawesome.css');
	require('./menu.css');
}


function ProductUser() {
	const [IsExpaned, setIsExpanded] = useState(false);
    const [Issubmenu, setIsubmenu] = useState(false);
    const [isBlog, setisblod] = useState(false);
    const [cartPopup,setcartPopup]=useState(false);
    const [secondmenu, SetSecondmenu] = useState(false);
    const location = useLocation();
    const navigate=useNavigate();
    const ID=location.state?.ID||'';
    const [singleproduct, setsingleproduct] = useState(false);
    const [Listview, setListView] = useState(false);

    const username = location.state?.username || 'Default Username';
    const [Page, setPage] = useState(false);
    const [Blogdetail, setblogDetail] = useState(false);
    const [BlogFormat, setBlogFormat] = useState(false);
    const [Grid, setGrid] = useState(false);
    const [userSetting,setuserSetting]=useState(false);
    
    const [cartData,setCardData]=useState([]);
    const [currency,setcurrency]=useState(false);
    const[language,setlanguage]=useState(false);
    const[open,isopen]=useState(false);
    useEffect(()=>{
		const fetchCardData=async()=>{
			setLoading(true)
			try{
				const response=await fetch(`http://127.0.0.1:8000/api/getcart/${ID}`);
				if(response.ok){
					const data=await response.json();
					setCardData(data);
				}else{
					console.error("Failed to fetch cart data");
				}
			}catch(error){
				console.error('Error during fetch:', error);
			}finally{
				setLoading(false)
			}
			
		}
		fetchCardData();
	},[]);
    const popupopen={
        left: 'auto',
    right: '0',
    visibility: 'visible',
    opacity: '1',
    padding: '105px 29px 0px',
   
    }
    const closepopup={
        left: 'auto',
        right: '0',
        visibility: 'hidden',
        opacity: '0',
        padding: '105px 0 0',
        transition:'all ease 0.5s',
       
    }
    const handleLanguage=()=>{
        setlanguage(!language);
    }
    const handleCurrency=()=>{
        setcurrency(!currency);
    }
    const handleBlogFormat = () => {
        setBlogFormat(!BlogFormat);
    }
    const handleuserSetting=()=>{
        setuserSetting(!userSetting)
    }
    const popupCurrency={
        display:currency?'block':'none',
        animation: 'cloudAnimation 0.5s'
    }
    const popuplanguage={
        display:language?'block':'none',
        animation:'cloudAnimation 0.5s'
    }
    const handlePage = () => {
        setPage(!Page);
    }
    const popupUsersetting={
        display:userSetting?'block':'none',
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
    const popupContentStyle1 = {

        display: IsExpaned ? 'block' : 'none',
        animation: 'cloudAnimation 0.5s',// Default animation
    };
	const [selectedImage, setselectedImage] = useState(0);
	const [images, setImages] = useState([]);
	const slickSliderRef = useRef(null);
	const handleThumbnailClick = (selectedImage) => {
		// Set formData.Main to the selected image when clicking on a thumbnail
		setFormData({ ...formData, Main: selectedImage });
		console.log(formData)
		// Call any additional functions or logic if needed
	  };
	
	const [items, setitems] = useState([]);
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [newItem, setNewItem] = useState([]);
	const [Quality, setQuality] = useState(1);
	const [searchInput, setSearchInput] = useState('');

	const [isPopupVisible, setPopupVisibility] = useState(false);
	const [IsClosingPopup, setIsClosingPopup] = useState(false);
	const [categories, setCategories] = useState([]);
	const [Product, setProduct] = useState([]);
	const [latestProduct, setlatestProduct] = useState([]);

	const [minPrice, setMinPrice] = useState(0);
	

	const [formData, setFormData] = useState({
		NameProduct: '',
		PriceProduct: '',
		Main: '',
		IDProduct:'',
		Quality:1,
		WareHouseQuality:0
		
	});
	
	
	  const handleDecreaseQuality = () => {
		if (formData.Quality > 1) {
		  setFormData((prevData) => ({
			...prevData,
			Quality: prevData.Quality - 1,
		  }));
		}
	  };
	const API_ENDPOINT = 'http://127.0.0.1:8000/api/getHomeProduct';
	const fetchProducts = async () => {
		try {
			setLoading(true)
			const response = await axios.get(API_ENDPOINT);
			return response.data;
		} catch (error) {
			console.error('Error fetching products:', error);
			throw error; // Propagate the error for handling in the calling code
		}finally{
			setLoading(false)
		}
	};
	
	const popupContentStyle = {

		animation: 'fadeIn 0.5s', // Default animation
	};
	const closingAnimation = {
		animation: 'flipright 0.5s',
	};
	const handleAddCardetail=async()=>{
		try {
			const response = await fetch(`http://127.0.0.1:8000/api/AddCardDetail/${formData.IDProduct}`, {
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
				const response=await fetch(`http://127.0.0.1:8000/api/getcart/${ID}`);
				if(response.ok){
					const data=await response.json();
					setCardData(data);
				}
			} else {
				toast.success("Card added successfully", {
					position: 'top-right',
					autoClose: 3000,
				});
				
			}
		} catch (error) {
			toast.error("product is out of stock", {
				position: 'top-right',
				autoClose: 3000,
			});
		}
	}
	const handleDetailProduct = async (Productid) => {
		try {
			const selectedProduct = Product.find((product) => product.IDproduct === Productid);
			if (!selectedProduct) {
			  // Handle the case when the product is not found
			  return;
			}
		
			const response = await axios.get(`http://127.0.0.1:8000/api/detailProduct/${Productid}`);
			// Assuming response.data is an array of items
			const Images = [];
			const totalQuality = response.data.TotalQuantity;
			response.data.forEach((item) => {
			
				formData.WareHouseQuality=item.TotalQuantity
				// Access the 'link' property immediately after processing each item
			   
			  });	
			
			response.data.forEach((item) => {
			  const image = {
				...item,
				link: `http://127.0.0.1:8000/${item.link}`
			  };
			  Images.push(image.link);
		
			  // Access the 'link' property immediately after processing each item
			 
			});	
		
			// Update form data
			formData.NameProduct = selectedProduct.ProductName;
			formData.PriceProduct = selectedProduct.Price;
			formData.IDProduct=selectedProduct.IDproduct;
		
			formData.Main = `http://127.0.0.1:8000/${selectedProduct.link}`;
		
			// Assuming 'images' is a state variable, set the state
			setImages(Images);

			// Access the 'link' property after processing all items
			console.log(Images[Images.length - 1]?.link);
		
			setPopupVisibility(true);
		  } catch (error) {
			// Handle error
			console.error('Error fetching product details:', error);
		  }
	  };
	const handleCloseDetailProduct = () => {
		setIsClosingPopup(true);
		setTimeout(() => {
			setPopupVisibility(false);
			setIsClosingPopup(false);
			formData.Quality=1;
		}, 500);
	};
	const getInitialMaxPrice = async () => {
		try {
			// Assuming Product is fetched asynchronously
			const products = await fetchProducts(); // Replace fetchProducts with your actual asynchronous data fetching function

			// Use reduce to find the maximum price
			const maxPrice = products.reduce((max, product) => {
				return product.Price > max ? product.Price : max;
			}, 0);

			console.log(maxPrice);

			// Return a default value if the Product array is empty
			return maxPrice;
		} catch (error) {
			console.error('Error fetching products:', error);
			return 0; // Default value in case of an error
		}
	};

	// Use the getInitialMaxPrice function to set the initial state of maxPrice
	const [maxPrice, setMaxPrice] = useState(0);
	
	useEffect(() => {
		// Fetch and set maxPrice when the component mounts
		getInitialMaxPrice().then((initialMaxPrice) => {
			setMaxPrice(initialMaxPrice);
			setSliderValues([minPrice, initialMaxPrice]);
		});
	}, []);
	const [sliderValues, setSliderValues] = useState([minPrice, maxPrice]);

	const handleSliderChange = (values) => {
		setSliderValues(values);


	}
	
	
	useEffect(() => {
		const fetchCategories = async () => {
		  try {
			setLoading(true); // Set loading to true when starting to fetch categories
	  
			const response = await axios.get('http://127.0.0.1:8000/api/getTopcategory');
			setCategories(response.data.categories);
	  
		  } catch (error) {
			console.error('Error fetching categories:', error);
	  
		  } finally {
			setLoading(false); // Set loading to false when category fetching is complete
		  }
		};
	  
		fetchCategories(); // Call the fetchCategories function
	  
	  }, []);

	const handleCheckboxChange = (categoryName) => {
		// Toggle the category in the selectedCategories state
		setSelectedCategories((prevSelectedCategories) => {
			if (prevSelectedCategories.includes(categoryName)) {
				return prevSelectedCategories.filter((c) => c !== categoryName);
			} else {
				return [...prevSelectedCategories, categoryName];
			}
		});
	};

	const [searchTerm, setSearchTerm] = useState('');

	const [sortedProducts, setSortedProducts] = useState([]);

	const [selectedSortOption, setSelectedSortOption] = useState('latest product');

	const [currentPage, setCurrentPage] = useState(0);
	const [perPage, setperPage] = useState(12);
	const handleSearchButtonClick = () => {
		setSearchTerm(searchInput);
	}
	useEffect(() => {
		const fetchdata = async () => {
			setLoading(true)
			try {
				const response = await axios.get('http://127.0.0.1:8000/api/latestProduct');
				setlatestProduct(response.data);
			} catch (error) {
				console.log('Error fetching Product')
			}finally{
				setLoading(false);
			}
		};
		fetchdata();
	}, []);
	const uniqueProductIds = new Set();
	useEffect(() => {
		const fetchProduct = async () => {
			setLoading(true)
			try {
				const response = await axios.get('http://127.0.0.1:8000/api/getHomeProduct');

				// Create a Set to store unique product IDs
				const uniqueProductIds = new Set();

				// Filter out products with duplicate IDs
				const filteredProducts = response.data.filter((product) => {
					if (!uniqueProductIds.has(product.IDproduct)) {
						uniqueProductIds.add(product.IDproduct);
						return true;
					}
					return false;
				});

				setProduct(filteredProducts);
			} catch (error) {
				console.error('Error fetching providers:', error);
			}finally{
				setLoading(false);
			}
		};

		fetchProduct();
	}, []);
	useEffect(() => {
		const copyOfProducts = [...Product];

		if (selectedSortOption === 'Alphabetically, A-Z') {
			copyOfProducts.sort((a, b) => a.ProductName.localeCompare(b.ProductName));
		} else if (selectedSortOption === 'Alphabetically, Z-A') {
			copyOfProducts.sort((a, b) => b.ProductName.localeCompare(a.ProductName));
		} else if (selectedSortOption === 'Price, High To Low') {
			copyOfProducts.sort((a, b) => b.Price - a.Price);
		} else if (selectedSortOption === 'Price, Low To High') {
			copyOfProducts.sort((a, b) => a.Price - b.Price);
		} else if (selectedSortOption === 'Date, New To Old') {
			copyOfProducts.sort((a, b) => b.IDproduct - a.IDproduct);
		}

		setSortedProducts(copyOfProducts);
	}, [Product, selectedSortOption, searchTerm]);
	const filteredProducts = sortedProducts.filter((product) => {
		const incluesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.ID_category);
		const includesSearchTerm = product.ProductName.toLowerCase().includes(searchTerm.toLowerCase());
		const includeFilterPrice = product.Price >= sliderValues[0] && product.Price <= sliderValues[1];

		return incluesCategory && includesSearchTerm && includeFilterPrice;
	});
	const handleApplyfilter = () => {
		console.log("Filtering:", minPrice, maxPrice);
	}
	const indexOflastCategory = (currentPage + 1) * perPage;
	const indexOfFirtCategory = indexOflastCategory - perPage;
	const currentCategories = filteredProducts.slice(indexOfFirtCategory, indexOflastCategory)
	const handleAddCard = async (IDproduct) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/addCard/${IDproduct}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_Account: ID,
            }),
        });
console.log(ID)
        if (!response.ok) {
            throw new Error('Failed to add card');
        }

        const data = await response.json();
        if (data.message) {
            toast.success("Card added successfully", {
				position: 'top-right',
				autoClose: 3000,
			});
			const responsedata=await fetch(`http://127.0.0.1:8000/api/getcart/${ID}`);
				if(responsedata.ok){
					const data=await responsedata.json();
					setCardData(data);
				}
        } else {
			toast.success("Card added successfully", {
				position: 'top-right',
				autoClose: 3000,
			});
        
        }
    } catch (error) {
		toast.error("product is out of stock", {
			position: 'top-right',
			autoClose: 3000,
		});
    }
};
const handleIncreaseQuality = () => {
	const totalQuantity = formData.WareHouseQuality || 0;
	console.log(totalQuantity)
	if (totalQuantity > formData.Quality ) {
		setFormData((prevData) => ({
		  ...prevData,
		  Quality: prevData.Quality + 1,
		}));
	  }
  };
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
  const [loading, setLoading] = useState(true);
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


		<div style={{ fontFamily: "'Bree Serif', serif" }} >
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
			<section id="product">
				<div className="container">
					<div className="row">
						<div className="product_1 clearfix">
							<div className="col-sm-3">
								<div className="product_1l clearfix">
									<div className="center_shop_1li clearfix">
										<h5 className="mgt">Category</h5>
										<div >
											<div className="checkbox-container">
												{categories.map((category) => (
													<div key={category.ID} className="checkbox-item">
														<input
															type="checkbox"
															id={category.ID}
															value={category.ID}
															checked={selectedCategories.includes(category.ID)}
															onChange={() => handleCheckboxChange(category.ID)}
														/>
														<label htmlFor={category.ID} className="custom-checkbox-label text-[13px]">
															{category.Name}
														</label>
													</div>
												))}
											</div>
										</div>
									</div>
									<div className="center_shop_1li clearfix">
										<h5 className="mgt">CATEGORY</h5>
										<div >

											<div className='price-labels flex justify-between'>
												<label className='minprice' htmlFor="minPrice">{sliderValues[0]}</label>
												<label className='maxprice' htmlFor="maxPrice">{sliderValues[1]}</label>
											</div>
											<div className='filter-price-container'>

												<Slider
													min={minPrice}
													max={maxPrice}
													value={sliderValues[0]}
													onChange={(value) => handleSliderChange([value, sliderValues[1]])}
												/>
												<Slider
													min={minPrice}
													max={maxPrice}
													value={sliderValues[1]}
													onChange={(value) => handleSliderChange([sliderValues[0], value])}
												/>
											</div>
											<button onClick={handleApplyfilter}>Apply</button>
										</div>
									</div>
									<div className="product_1i clearfix">
										<h5 className="mgt">SEARCH</h5>
										<div className="input-group">
											<input type="text" className="form-control form_2" placeholder="Search Here..." value={searchInput}
												onChange={(e) => setSearchInput(e.target.value)} />
											<span className="input-group-btn">
												<button className="btn btn-primary" type="button" onClick={handleSearchButtonClick}>
													<i className="fa fa-search"></i></button>
											</span>
										</div>
									</div>
									<div className="blog_1li1 clearfix">
										<h5 className="mgt heading font-bold">Latest PRODUCTS</h5>
										{latestProduct && latestProduct.map((Product, index) => (
											<div key={index} className="blog_1li1i clearfix">
												<div className="col-sm-4 space_left">
													<img src={`http://127.0.0.1:8000/${Product.link}`} className="iw" alt="abc" />
												</div>
												<div className="col-sm-8 space_all">
													<h5 className="mgt"><a href="detail.html">{Product.ProductName}</a></h5>
													<h4>$ {Product.Price}</h4>
													<h6><a className="col_1" href="detail.html">Read More</a></h6>
												</div>
											</div>
										))}


									</div>
								</div>
							</div>
							<div className="col-sm-9" style={{ height: "auto" }}>
								<div className="product_1r clearfix" >
									<div className="center_product_1r2 clearfix">
										<div className="col-sm-6">
											<div className="center_product_1r2l clearfix">
												<p className="mgt">Showing 1–9 of 10 results</p>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="center_product_1r2r text-right clearfix ">
												<h5 className="mgt " >SORT BY</h5>
												<select className="form-control" id="subject" value={selectedSortOption} onChange={(e) => setSelectedSortOption(e.target.value)} name="subject">
													<option>latest product</option>
													<option>Price, Low To High</option>
													<option>Price, High To Low</option>
													<option>Alphabetically, A-Z</option>
													<option>Alphabetically, Z-A</option>
													<option>Date, New To Old</option>
												</select>
											</div>
										</div>
									</div>
									{currentCategories.map((product, index) => {
										// Display a new row for every 3rd product
										if (index % 3 === 0 && product.IDproduct) {
											return (
												<div className="row" key={`row-${index}`}>
													{currentCategories.slice(index, index + 3).map((productInRow, rowIndex) => {
														if (productInRow.IDproduct && !uniqueProductIds.has(productInRow.IDproduct)) {
															return (
																<div className="col-sm-4 mb-3" key={index + rowIndex}>
																	<div className="product_1r1 clearfix">
																		<div className="clearfix mgt-center">
																			<a href='' onClick={()=>navigate(`/DetailProduct/${productInRow.IDproduct}`,{state:{IDProduct:productInRow.IDproduct,ID:ID,username:username}})} className="product-link">
																				{/* Use the same image for each product */}
																				<img
																					src={`http://127.0.0.1:8000/${productInRow.link}`}
																					className="iw img-fluid product-image"
																					style={{ height: "200px", objectFit: "cover" }}
																					alt={productInRow.ProductName}
																				/>
																			</a>
																			<h3>
																				<i className="fa fa-rupee"></i> {productInRow.Price}
																			</h3>
																			<h4 className="product-name">
																				<a href="detail.html">
																					{/* Use the same product name for each product */}
																					{productInRow.ProductName}
																				</a>
																			</h4>
																			<h6>Product Code: {productInRow.ProductCode}</h6>
																			<div className="product-buttons">
																				<a className="btn btn-primary mr-2"  onClick={() => (handleDetailProduct(productInRow.IDproduct))}>
																					Detail
																				</a>
																				<button className="btn btn-success" onClick={() => handleAddCard(productInRow.IDproduct)} >
																					Add to Cart
																				</button>
																			</div>
																		</div>
																	</div>

																</div>
															);
														}

													})}
												</div>
											);
										}
										// Add product ID to the set outside JSX expression

									})}



									<div className="product_1_last text-center clearfix">
										<div className="col-sm-12">
											<ul>
												<li><a className='cursor-pointer' onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}><i className="fa fa-chevron-left"></i></a></li>
												{Array.from({ length: Math.ceil(filteredProducts.length / perPage) }, (_, index) => (
													<li key={index} className={currentPage === index ? 'act' : ''}>
														<a className='cursor-pointer' onClick={() => setCurrentPage(index)}>
															{index + 1}
														</a>
													</li>
												))}
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="footer">
				<div className="container">
					<div className="row">
						<div className="footer_1 mgt clearfix">
							<div className="col-sm-2">
								<div className="footer_1i clearfix">
									<h4 className="mgt col_3">Our Story</h4>
									<h5><a className="hvr-forward col" href="#">The Rd Jewellers</a></h5>
									<h5><a className="hvr-forward col" href="#">CSR Activities</a></h5>
									<h5><a className="hvr-forward col" href="#">Get In Touch</a></h5>
									<h5><a className="hvr-forward col" href="#">Career</a></h5>
								</div>
							</div>
							<div className="col-sm-2">
								<div className="footer_1i clearfix">
									<h4 className="mgt col_3">Our Collections</h4>
									<h5><a className="hvr-forward col" href="#">Wedding</a></h5>
									<h5><a className="hvr-forward col" href="#">Diamond</a></h5>
									<h5><a className="hvr-forward col" href="#">Kids</a></h5>
									<h5><a className="hvr-forward col" href="#">Semper</a></h5>
									<h5><a className="hvr-forward col" href="#">Porta</a></h5>
									<h5><a className="hvr-forward col" href="#">Popular</a></h5>
								</div>
							</div>
							<div className="col-sm-2">
								<div className="footer_1i clearfix">
									<h4 className="mgt col_3">Our Categories</h4>
									<h5><a className="hvr-forward col" href="#">Premium</a></h5>
									<h5><a className="hvr-forward col" href="#">Silver</a></h5>
									<h5><a className="hvr-forward col" href="#">Diamond</a></h5>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="footer_1i clearfix">
									<h4 className="mgt col_3">Join Our Newsletter</h4>
									<p className="col">Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitursodales ligula in libero.Sed dignissim lacinia nunc.</p>
									<div className="input-group">
										<input type="text" className="form-control" placeholder="Search" />
										<span className="input-group-btn">
											<button className="btn btn-primary" type="button">
												<i className="fa fa-long-arrow-right"></i></button>
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="footer_1 clearfix">
							<div className="col-sm-2">
								<div className="footer_1i clearfix">
									<h4 className="mgt col_3">Our Properties</h4>
									<h5><a className="hvr-forward col" href="#">Semper Porta</a></h5>
									<h5><a className="hvr-forward col" href="#">Nec Tellus</a></h5>
								</div>
							</div>
							<div className="col-sm-2">
								<div className="footer_1i clearfix">
									<h4 className="mgt col_3">Advertisement</h4>
									<h5><a className="hvr-forward col" href="#">Print Media</a></h5>
									<h5><a className="hvr-forward col" href="#">TV Commercials</a></h5>
									<h5><a className="hvr-forward col" href="#">Photo Gallery</a></h5>
									<h5><a className="hvr-forward col" href="#">Video Gallery</a></h5>
									<h5><a className="hvr-forward col" href="#">Press Room</a></h5>
								</div>
							</div>
							<div className="col-sm-2">
								<div className="footer_1i clearfix">
									<h4 className="mgt col_3">Follow Us</h4>
									<h5><a className="hvr-forward col" href="#">Facebook</a></h5>
									<h5><a className="hvr-forward col" href="#">Twitter</a></h5>
									<h5><a className="hvr-forward col" href="#">Instagram</a></h5>
									<h5><a className="hvr-forward col" href="#">Youtube</a></h5>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="footer_1i clearfix">
									<h4 className="mgt col_3">Social Links</h4>
									<ul className="social-network social-circle">
										<li><a href="#" className="icoRss" title="Rss"><i className="fa fa-rss"></i></a></li>
										<li><a href="#" className="icoFacebook" title="Facebook"><i className="fa fa-facebook"></i></a></li>
										<li><a href="#" className="icoTwitter" title="Twitter"><i className="fa fa-twitter"></i></a></li>
										<li><a href="#" className="icoGoogle" title="Google +"><i className="fa fa-google-plus"></i></a></li>
										<li><a href="#" className="icoLinkedin" title="Linkedin"><i className="fa fa-linkedin"></i></a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="footer_bottom">
				<div className="container">
					<div className="row">
						<div className="footer_b clearfix">
							<div className="col-sm-5 space_left">
								<div className="footer_br clearfix">
									<ul className="mgt">
										<li>
											<a href="#">Our Policy</a>
											<a href="#">Shipping</a>
											<a href="#">Terms & Conditions</a>
											<a className="border_none" href="#">Refund Policy</a>
										</li>
									</ul>
								</div>
							</div>
							<div className="col-sm-7 space_left">
								<div className="footer_bl  text-right clearfix">
									<p>© 2013 Your Website . All Rights Reserved | Design by <a className="col_1" href="http://www.templateonweb.com">TemplateOnWeb</a></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{isPopupVisible && (
				<div className="popup-container">

					<div className="modal-content" style={IsClosingPopup ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle} >

						<div className="modal-body">
							<button
								type="button"
								className="close"

								onClick={handleCloseDetailProduct}
							>
								<span aria-hidden="true">x</span>
							</button>
							<div className='modal-inner-area sp-area row'>
								<div className='col-lg-6 col-md-5'>
									<div className='sp-img_area'>
										<div className='sp-img_slider-nav slick-slider-nav hiraola-slick-slider arrow-type-two slick-carousel-1 slick-initialized slick-slider' style={{ border: '1px solid #e5e5e5' }} data-slick-options="{
					&quot;slidesToShow&quot;: 1,
					&quot;arrows&quot;: false,
					&quot;fade&quot;: true,
					&quot;draggable&quot;: false,
					&quot;swipe&quot;: false,
					&quot;asNavFor&quot;: &quot;.sp-img_slider-nav&quot;
				}">
											<div className='slick-list draggable' style={{ height: '486px' }}>
												<div className='slick-track' style={{ opacity: '1', width: '2064px' }} >
													<div className='red slick-slide slick-current slick-active first-active last-active' data-slick-index="0" aria-hidden="false" style={{ width: '486px', position: 'relative', left: '0px', top: '63px', zIndex: '999', opacity: '1' }} tabIndex="0">
														<img src={formData.Main} className='block w-full object-contain' alt="" />
													</div>

												</div>
											</div>
										</div>
										<div className='sp-img_slider-nav slick-slider-nav hiraola-slick-slider arrow-type-two slick-carousel-1 slick-initialized slick-slider' data-slick-options="{
				   &quot;slidesToShow&quot;: 4,
					&quot;asNavFor&quot;: &quot;.sp-img_slider-2&quot;,
				   &quot;focusOnSelect&quot;: true
				  }"data-slick-responsive="[
					{&quot;breakpoint&quot;:1201, &quot;settings&quot;: {&quot;slidesToShow&quot;: 2}},
					{&quot;breakpoint&quot;:768, &quot;settings&quot;: {&quot;slidesToShow&quot;: 3}},
					{&quot;breakpoint&quot;:577, &quot;settings&quot;: {&quot;slidesToShow&quot;: 3}},
					{&quot;breakpoint&quot;:481, &quot;settings&quot;: {&quot;slidesToShow&quot;: 2}},
					{&quot;breakpoint&quot;:321, &quot;settings&quot;: {&quot;slidesToShow&quot;: 2}}
				]">

											<div className='slick-list draggable'>
												<div className='slick-track' style={{ opacity: '1', width: '400px', transform: 'translate3d(0px, 0px, 0px)' }}>
	
													{images?.map((image, index) => (
														<div 
															aria-hidden="false"
															onClick={() => handleThumbnailClick(image)} className='single-slide red slick-slide slick-current slick-active first-active mt-[7px]' style={{ width: '70px', marginTop: '18px' }} >
															<img src={image} alt="" />

														</div>
													))}


												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='col-xl-7 col-lg-6 col-md-6'>
									<div className='sp-content'>
										<div className='sp-heading'>
											<h5 className='font-bold' style={{ marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif', color: '#333333', fontSize: '1.25rem' }}>
												<a href="" style={{ color: '#595959', fontSize: '20px', fontFamily: '"Lato", sans-serif' }}>{formData.NameProduct}</a>
											</h5>
										</div>
										<div className='rating-box pb-[15px]'>
											<ul>
												<li className='inline-block mr-[2px]'>
													<i className='fa fa-star-of-david' style={{ color: '#cda557', fontWeight: '900' }}></i>
												</li>
												<li className='inline-block mr-[2px]'>
													<i className='fa fa-star-of-david' style={{ color: '#cda557', fontWeight: '900' }}></i>
												</li>
												<li className='inline-block mr-[2px]'>
													<i className='fa fa-star-of-david' style={{ color: '#cda557', fontWeight: '900' }}></i>
												</li>
												<li className='inline-block mr-[2px]'>
													<i className='fa fa-star-of-david' style={{ color: '#cda557', fontWeight: '900' }}></i>
												</li>
												<li className='inline-block mr-[2px]'>
													<i className='fa fa-star-of-david' style={{ color: '#cda557', fontWeight: '900' }}></i>
												</li>
											</ul>
										</div>
										<div className='price-box pb-[10px]'>
											<span className='text-[24px]' style={{ fontFamily: '"Lato", sans-serif', color: '#595959', lineHeight: '24px' }}>${formData.PriceProduct}</span>
											<span className='' style={{ color: '#bababa', textDecoration: 'line-through', fontSize: '14px', marginLeft: '10px', fontFamily: '"Lato", sans-serif' }}>£93.68</span>
										</div>
										<div className='essential_stuff' style={{ borderBottom: '1px solid #e5e5e5', paddingBottom: '20px' }}>
											<ul>
												<li style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '16px' }}>EX Tax: <span>£453.35</span></li>
												<li style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '16px' }}>Price in reward points: <span>400</span></li>
											</ul>
										</div>
										<div className=" pt-[15px]">
											<ul>
												<li style={{ color: '#595959', fontSize: '16px', fontFamily: '"Lato", sans-serif' }}>10 or more £81.03</li>
												<li style={{ color: '#595959', fontSize: '16px', fontFamily: '"Lato", sans-serif' }}>20 or more £71.09</li>
												<li style={{ color: '#595959', fontSize: '16px', fontFamily: '"Lato", sans-serif' }}>30 or more £61.15</li>
											</ul>
										</div>
										<div className="last-child" style={{ padding: '10px 0 20px' }}>
											<ul>
												<li style={{ color: '#595959', fontSize: '16px', fontFamily: '"Lato", sans-serif' }}>
													Brand
													<a href="" style={{ color: '#595959', fontSize: '16px', fontFamily: '"Lato", sans-serif', textDecoration: 'none' }}>Buxton</a>
												</li>
												<li style={{ color: '#595959', fontSize: '16px', fontFamily: '"Lato", sans-serif' }}>Product Code: Product 15</li>
												<li style={{ color: '#595959', fontSize: '16px', fontFamily: '"Lato", sans-serif' }}>Reward Points: 100</li>
												<li style={{ color: '#595959', fontSize: '16px', fontFamily: '"Lato", sans-serif' }}>Availability: In Stock</li>
											</ul>
										</div>
										<div className='color-list_area' style={{ border: '1px solid #e5e5e5', padding: '25px' }}>
											<div className='color-list_heading pb-[15px]'>
												<h4 className='uppercase mb-0' style={{ fontFamily: '"Lato", sans-serif', color: '#333333', lineHeight: '1', fontWeight: '700' }}>Available Options</h4>
											</div>
											<span className='sub-title block pb-[20px]' style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '16px', lineHeight: '24px' }}>Color</span>
											<div className='color-list'>
												<a href="" style={{ borderColor: '#cda557', border: '1px solid #e5e5e5', display: 'inline-block', marginRight: '5px', padding: '2px', width: '25px', height: '25px' }} data-swatch-color="red">
													<span className='bg-red_color' style={{ background: '#ff0000', display: 'block', width: '100%', height: '100%' }}></span>
												</a>
												<a href="" style={{ borderColor: '#cda557', border: '1px solid #e5e5e5', display: 'inline-block', marginRight: '5px', padding: '2px', width: '25px', height: '25px' }} data-swatch-color="orange">
													<span className='bg-red_color' style={{ background: '#ff832b', display: 'block', width: '100%', height: '100%' }}></span>
												</a>
												<a href="" style={{ borderColor: '#cda557', border: '1px solid #e5e5e5', display: 'inline-block', marginRight: '5px', padding: '2px', width: '25px', height: '25px' }} data-swatch-color="brown">
													<span className='bg-red_color' style={{ background: '#a6311f', display: 'block', width: '100%', height: '100%' }}></span>
												</a>
												<a href="" style={{ borderColor: '#cda557', border: '1px solid #e5e5e5', display: 'inline-block', marginRight: '5px', padding: '2px', width: '25px', height: '25px' }} data-swatch-color="umber">
													<span className='bg-red_color' style={{ background: '#824900', display: 'block', width: '100%', height: '100%' }}></span>
												</a>
											</div>
										</div>
										<div className='quality pt-[15px]'>
											<label htmlFor="" className='mb-[0.5rem]'>Quality</label>
											<div className='cart-plus-minus relative' style={{ textAlign: 'left', width: '76px' }}>
												<input type="text" value={formData.Quality} style={{ border: '1px solid #e5e5e5', height: '46px', textAlign: 'center', width: '48px', background: '#fff' }} />
												<div className='dec qtybutton absolute text-center font-bold' onClick={handleDecreaseQuality} style={{ borderBottom: '1px solid #e5e5e5', borderRight: '1px solid #e5e5e5', borderTop: '1px solid #e5e5e5', cursor: 'pointer', height: '23px', width: '28px', lineHeight: '21px', bottom: '0', right: '0' }}>
													<i className='fa fa-angle-down font-bold' ></i>
												</div>
												<div className='dec qtybutton absolute text-center font-bold' style={{ borderBottom: '1px solid #e5e5e5', borderRight: '1px solid #e5e5e5', borderTop: '1px solid #e5e5e5', cursor: 'pointer', height: '23px', width: '28px', lineHeight: '21px', top: '0', right: '0', borderBottom: 'none' }} onClick={handleIncreaseQuality}>
													<i className='fa fa-angle-up font-bold' ></i>
												</div>
											</div>
										</div>
										<div className='pt-[22px]'>
											<ul>
												<li className='ml-0 inline-block'>
													<a  className='cart' onClick={handleAddCardetail} style={{ backgroundColor: '#333333', border: '2px solid #333333', color: '#ffffff', width: '140px', height: '50px', lineHeight: '47px', display: 'block', textAlign: 'center', textDecoration: 'none',cursor:'pointer' }} >Cart To Cart</a>
												</li>
												<li className='ml-[5px] inline-block '>
													<a href="" className='	' style={{ border: '2px solid #e5e5e5', width: '50px', height: '50px', lineHeight: '47px', display: 'block', textAlign: 'center' }}>
														<i class="fa-solid fa-heart" style={{ color: 'black', borderColor: 'black' }}></i>
													</a>
												</li>
												<li className='ml-[5px] inline-block '>
													<a href="" className='	' style={{ border: '2px solid #e5e5e5', width: '50px', height: '50px', lineHeight: '47px', display: 'block', textAlign: 'center' }}>
														<i class="fa-solid fa-shuffle" style={{ color: 'black', borderColor: 'black' }}></i>
													</a>
												</li>
											</ul>
										</div>
										<div className='flex pt-[20px] items-center'>
											<h6 className='mb-0 pr-[5px]' style={{ fontFamily: '"Lato", sans-serif', color: '#333333', fontWeight: 'bold', lineHeight: '1', fontSize: '16px' }}>Tags:</h6>
											<a href="" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', textDecoration: 'none', marginTop: '11px', fontSize: '16px' }}>Ring,</a>

											<a href="" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', textDecoration: 'none', marginTop: '11px', fontSize: '16px' }}>Necklaces,</a>

											<a href="" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', textDecoration: 'none', marginTop: '11px', fontSize: '16px' }}>Braid</a>
										</div>
										<div className='pt-[25px]'>
											<ul>
												<li className='inline-block pr-[10px]'>
													<a href="" data-bs-toggle="tooltip" style={{ border: '1px solid rgba(0, 0, 0, 0.07)', fontSize: '16px', display: 'block', width: '40px', height: '40px', lineHeight: '40px', textAlign: 'center' }} target="_blank" aria-label="Facebook">
														<i className='fab fa-facebook' style={{ color: 'black' }}></i>
													</a>
												</li>
												<li className='inline-block pr-[10px]'>
													<a href="" data-bs-toggle="tooltip" style={{ border: '1px solid rgba(0, 0, 0, 0.07)', fontSize: '16px', display: 'block', width: '40px', height: '40px', lineHeight: '40px', textAlign: 'center' }} target="_blank" aria-label="Facebook">
														<i className='fab fa-twitter-square' style={{ color: 'black' }}></i>
													</a>
												</li>
												<li className='inline-block pr-[10px]'>
													<a href="" data-bs-toggle="tooltip" style={{ border: '1px solid rgba(0, 0, 0, 0.07)', fontSize: '16px', display: 'block', width: '40px', height: '40px', lineHeight: '40px', textAlign: 'center' }} target="_blank" aria-label="Facebook">
														<i className='fab fa-youtube' style={{ color: 'black' }}></i>
													</a>
												</li>
												<li className='inline-block pr-[10px]'>
													<a href="" data-bs-toggle="tooltip" style={{ border: '1px solid rgba(0, 0, 0, 0.07)', fontSize: '16px', display: 'block', width: '40px', height: '40px', lineHeight: '40px', textAlign: 'center' }} target="_blank" aria-label="Facebook">
														<i className='fab fa-google-plus' style={{ color: 'black' }}></i>
													</a>
												</li>
												<li className='inline-block pr-[10px]'>
													<a href="" data-bs-toggle="tooltip" style={{ border: '1px solid rgba(0, 0, 0, 0.07)', fontSize: '16px', display: 'block', width: '40px', height: '40px', lineHeight: '40px', textAlign: 'center' }} target="_blank" aria-label="Facebook">
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

		</div>




	)
}
export default ProductUser;