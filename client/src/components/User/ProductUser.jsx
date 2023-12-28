
import image from './images/user2-160x160.jpg';
import React, { useEffect, useState, useRef } from 'react';
import Slider from 'rc-slider';

import { Slide, ToastContainer, toast } from 'react-toastify';
import 'rc-slider/assets/index.css'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import jewry from './images/jewry.png';
import jw from './images/jw.png';
import jew2 from './images/jew2.png';
import axios from 'axios';
import TreeviewMenu from "../superadmin/TreeViewMenu";
const featureEnabled = window.location.pathname.includes("/HomeProduct");

if (featureEnabled) {
	require("./global.css");
	require("./list.css");
	require('./bootstrap.min.css');
	require('./index.css');
	require('./fontawesome.css');
}


function ProductUser() {
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
	const [cardItemCount, setCardItemCount] = useState(0);
	const [cartItems, setcartItems] = useState([]);
	const [minPrice, setMinPrice] = useState(0);
	const handleIncreaseQuality = () => {
		setQuality(Quality + 1);
	}
	const [formData, setFormData] = useState({
		NameProduct: '',
		PriceProduct: '',
		Main: ''
	});
	const handleDecreaseQuality = () => {
		if (Quality > 1) {
			setQuality(Quality - 1);
		}
	}
	const caculatetotal = () => {
		const total = newItem.reduce((accumator, item) => {
			return accumator + item.quality * item.price;
		}, 0);
		return total;
	}
	const API_ENDPOINT = 'http://127.0.0.1:8000/api/getHomeProduct';
	const fetchProducts = async () => {
		try {
			const response = await axios.get(API_ENDPOINT);
			return response.data;
		} catch (error) {
			console.error('Error fetching products:', error);
			throw error; // Propagate the error for handling in the calling code
		}
	};
	const popupContentStyle = {

		animation: 'fadeIn 0.5s', // Default animation
	};
	const closingAnimation = {
		animation: 'flipright 0.5s',
	};
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
	const handleRemoveItem = (item) => {
		const updateItems = newItem.filter((cartItem) => cartItem.IDproduct !== item.IDproduct);
		const updatedCartItems = cartItems.filter((cartItem) => cartItem.IDproduct !== item.IDproduct);
		setcartItems(updatedCartItems);
		setNewItem(updateItems);
		setCardItemCount((prevCount) => prevCount - 1);


	}
	const handleRemoveOne = (item) => {

		const updateItems = newItem.map((cartItem) =>
			cartItem.IDproduct === item.IDproduct ? { ...cartItem, quality: cartItem.quality - 1 } : cartItem
		);

		setNewItem(updateItems)

	}
	const handleAddTocard = (itemsToAdd) => {
		// Convert single item to an array
		let itemsarray = Array.isArray(itemsToAdd) ? itemsToAdd : [itemsToAdd];

		itemsarray.forEach((itemToAdd) => {
			// Increase the quality by 1
			const newQuality = 1;

			// Check if the item is already in the cart
			const itemInCartIndex = cartItems.findIndex((item) => item.IDproduct === itemToAdd.IDproduct);

			if (itemInCartIndex === -1) {
				// If the item is not in the cart, add it as a new item with the specified quality
				const newItem = {
					IDproduct: itemToAdd.IDproduct,
					NameProduct: itemToAdd.ProductName,
					picture: itemToAdd.link,
					quality: newQuality,
					price: itemToAdd.Price,
				};

				// Update the cartItems state with the new item
				setcartItems((prevItems) => [...prevItems, newItem]);

				// Increment the card item count
				setCardItemCount((prevCount) => prevCount + newQuality);

				// Add the new item to the array of added items
				setNewItem((prevItems) => [...prevItems, { ...newItem }]);

				// Display a success toast
				toast.success("Item added to cart successfully", {
					position: 'top-right',
					autoClose: 3000,
				});
			} else {
				// If the item is already in the cart, update its quantity by the specified value


				// Update the newItem array with the modified quantity for the specified IDproduct
				setNewItem((prevItems) =>
					prevItems.map((item) =>
						item.IDproduct === itemToAdd.IDproduct
							? { ...item, quality: item.quality + newQuality }
							: item
					)
				);
				// Increment the card item count

			}
		});
	};
	useEffect(() => {
		// Fetch categories when the component mounts
		axios.get('http://127.0.0.1:8000/api/getTopcategory')
			.then(response => {
				setCategories(response.data.categories);
			})
			.catch(error => {
				console.error(error);
			});
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
			try {
				const response = await axios.get('http://127.0.0.1:8000/api/latestProduct');
				setlatestProduct(response.data);
			} catch (error) {
				console.log('Error fetching Product')
			}
		};
		fetchdata();
	}, []);
	const uniqueProductIds = new Set();
	useEffect(() => {
		const fetchProduct = async () => {
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
		} else if (selectedSortOption === 'latest product') {
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
	return (


		<div style={{ fontFamily: "'Bree Serif', serif" }} >
			<ToastContainer />
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
											<input type="text" className="form-control" placeholder="Search" />
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
										<h5 className="mgt"><a href="login.html">Account <br /> Login / Sign Up</a></h5>
									</div>

									<div className="header_1ri border_none clearfix">
										<span className="span_1"><a className="col_1" href="#"><i className="fa fa-heart-o"></i></a></span>
										<h5 className="mgt"><a href="#">My <br /> Wishlist (0)</a></h5>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="menu" className="clearfix cd-secondary-nav">
				<nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top justify-content-center">
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

						<div className="navbar-collapse  " id="bs-example-navbar-collapse-1">
							<ul className="nav navbar-nav inline-block m" style={{ whiteSpace: 'nowrap' }}>

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
									<a className="m_tag" href="#" data-toggle="dropdown" role="button" aria-expanded="false">Pages<span className="caret"></span> </a>
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
											</ul><br />
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
											</ul><br />
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
											</ul><br />
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
											</ul><br />
											<ul>
												<li className="dropdown-header">BY METAL</li>
												<li><a href="#"> Glyphs</a></li>
												<li><a href="#">Examples</a></li>
												<li><a href="#">Jewelry</a></li>
											</ul>
										</li>
										<li className="col-sm-4">
											<ul>
												<li><a href="#"><img src="img/1.jpg" alt="abc" className="iw" /></a></li>
											</ul><br />
											<ul>
												<li><a href="#"><img src="img/2.png" alt="abc" className="iw" /></a></li>
											</ul>
										</li>
									</ul>

								</li>
								<li className="dropdown drop_cart" style={{ whiteSpace: 'nowrap' }}>
									<a className="m_tag" href="#" data-toggle="dropdown" role="button" aria-expanded="false">
										<i className="glyphicon glyphicon-shopping-cart">
											{cardItemCount >= 0 && (
												<span className="badge badge-pill badge-danger position-absolute top-0 start-100 translate-middle p-2">{cardItemCount}</span>
											)}
										</i>
									</a>
									<ul class=" absolute dropdown-menu drop_1" role="menu" >
										<li>
											<div class="drop_1i clearfix">
												<div class="col-sm-6">
													<div class="drop_1il clearfix"><h5 class="mgt">{cardItemCount} ITEMS</h5></div>
												</div>
												<div class="col-sm-6">
													<div class="drop_1il text-right clearfix"><h5 class="mgt"><a href="#">VIEW CART</a></h5></div>
												</div>
											</div>
											{newItem && newItem.map((item, index) => (
												<div key={index} className="drop_1i1 clearfix">
													<div className="col-sm-6">
														<div className="drop_1i1l clearfix">
															<h6 className="mgt bold Product"><a href="#">{item.NameProduct}</a>
																<br /><span className="normal col_2">{item.quality}x - ${item.price}</span></h6>
														</div>
													</div>
													<div className="col-sm-4">
														<div className="drop_1i1r clearfix"><a href="#"><img src={`http://127.0.0.1:8000/${item.picture}`} className="iw" alt={item.NameProduct} /></a></div>
													</div>
													<div className="col-sm-2">
														<div className="drop_1i1l text-right clearfix"><h6 className="mgt bold">
															{item.quality > 1 ? (
																<span onClick={() => handleRemoveOne(item)}><i className="fa fa-remove"></i></span>
															) : (
																<span onClick={() => handleRemoveItem(item)}><i className="fa fa-remove"></i></span>
															)}

														</h6></div>
													</div>

												</div>
											))}

											<div class="drop_1i2 clearfix">
												<div class="col-sm-6">
													<div class="drop_1il clearfix"><h5 class="mgt">TOTAL</h5></div>
												</div>
												<div class="col-sm-6">
													<div class="drop_1il text-right clearfix"><h5 class="mgt">$ {caculatetotal()}</h5></div>
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
			<section id="product">
				<div className="container">
					<div className="row">
						<div className="product_1 clearfix">
							<div className="col-sm-3">
								<div className="product_1l clearfix">
									<div className="center_shop_1li clearfix">
										<h5 className="mgt">CATEGORY</h5>
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
																			<a href="detail.html" className="product-link">
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
																				<button className="btn btn-success" onClick={() => handleAddTocard(productInRow)} >
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
												{Array.from({ length: Math.ceil(Product.length / perPage) }, (_, index) => (
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
													<div className='red slick-slide slick-current slick-active first-active last-active' data-slick-index="0" aria-hidden="false" style={{ width: '486px', position: 'relative', left: '0px', top: '0px', zIndex: '999', opacity: '1' }} tabIndex="0">
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
												<input type="text" value={Quality} style={{ border: '1px solid #e5e5e5', height: '46px', textAlign: 'center', width: '48px', background: '#fff' }} />
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
													<a href="" className='cart' style={{ backgroundColor: '#333333', border: '2px solid #333333', color: '#ffffff', width: '140px', height: '50px', lineHeight: '47px', display: 'block', textAlign: 'center', textDecoration: 'none' }}>Cart To Cart</a>
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