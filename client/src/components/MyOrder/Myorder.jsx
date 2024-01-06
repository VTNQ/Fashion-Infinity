import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Magnifier } from 'react-image-magnify';
import { Slide, ToastContainer, toast } from 'react-toastify';
import '../menu/menu.css';
import './Myorder.css';
import Swal from 'sweetalert2';
import us from '../menu/image/us.png';
import France from '../menu/image/France.png';
import 'slick-carousel/slick/slick.css';
import logo from '../menu/image/logo.png';
import s from '../menu/image/s.png';
import product from '../menu/image/product.png';
import product2 from '../menu/image/product2.png';
import product3 from '../menu/image/product3.png';
import logo2 from '../menu/image/logorespon.png';
import MenuHomepage from "../menu/MenuHomepage";

import axios from "axios";
function Myorder() {
    const location = useLocation();
    const [singleproduct, setsingleproduct] = useState(false);
    const [Listview, setListView] = useState(false);
    const [orderData, setorderData] = useState([]);
    const [waitorder, setwaitorder] = useState([]);
    const [delivery, setdelivery] = useState([]);
    const [deliveried,setdeliveried]=useState([]);
    const username = location.state?.username || 'Default Username';
    const [ActiveTab, setActiveTab] = useState('All');
    const handleTabChange = (tabID) => {
        setActiveTab(tabID);
    }
    
    const navigate = useNavigate();
    const renderTabContent = () => {
        switch (ActiveTab) {
            case 'All':
                return (
                    <>
                        {orderData.map((product, index) => (
                            <div key={index} className="product-item">
                                <div className="product-image">
                                    <img src={`http://127.0.0.1:8000/${product.link}`} alt={product.name} />
                                </div>
                                <div className="product-details">
                                    <p className="product-name" style={{color:'#595959',fontFamily:'"Lato", sans-serif'}} onClick={() => navigate('/OrderDetail', { state: { username: username, ID: ID,IDproduct:product.idproduct,IDorder:product.idorder } })}>{product.Name}</p>
                                    <p className="product-quantity">Quantity: {product.Quality}</p>
                                    <p className="product-price">Total Price: ${product.Price}</p>
                                    {product.status === 0 && (
                                        <p className="order-status" style={{ color: 'rgb(33, 37, 41)' }}>

                                            Status: Pending Confirmation | <span style={{ fontSize: '1.0rem', color: 'rgba(0,0,0,.26)' }}>Order Date:{new Date(product.Start_Order).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>

                                        </p>
                                    )}
                                    {product.status === 1 && (
                                        <p className="order-status" style={{ color: 'rgb(33, 37, 41)' }}>

                                            Status: Ready for Pickup | <span style={{ fontSize: '1.0rem', color: 'rgba(0,0,0,.26)' }}>Order Date:{new Date(product.Start_Order).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>

                                        </p>
                                    )}
                                    {product.status === 2 && (
                                        <p className="order-status" style={{ color: 'rgb(33, 37, 41)' }}>

                                            Status: Out for Delivery | <span style={{ fontSize: '1.0rem', color: 'rgba(0,0,0,.26)' }}>Order Date:{new Date(product.Start_Order).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>

                                        </p>
                                    )}
                                    {product.status === 2 && (
                                        <p className="order-status" style={{ color: 'green' }}>

                                            Status: Delivered | <span style={{ fontSize: '1.0rem', color: 'rgba(0,0,0,.26)' }}>Date:25-05-2005</span>

                                        </p>
                                    )}

                                    <p className="order-status">

                                    </p>
                                </div>
                            </div>
                        ))}
                    </>

                );
            case 'wait':
                return (

                    <>
                        {waitorder.map((product, index) => (
                            <div key={index} className="product-item">
                                <div className="product-image">
                                    <img src={`http://127.0.0.1:8000/${product.link}`} alt={product.name} />
                                </div>
                                <div className="product-details">
                                    <p className="product-name">{product.name}</p>
                                    <p className="product-quantity">Quantity: {product.Quality}</p>
                                    <p className="product-price">Total Price: ${product.Price}</p>
                                    {product.status === 0 && (
                                        <p className="order-status" style={{ color: 'rgb(33, 37, 41)' }}>

                                            Status: Pending Confirmation | <span style={{ fontSize: '1.0rem', color: 'rgba(0,0,0,.26)' }}>Order Date:{new Date(product.Start_Order).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>

                                        </p>
                                    )}
                                    {product.status === 1 && (
                                        <p className="order-status" style={{ color: 'rgb(33, 37, 41)' }}>

                                            Status: Ready for Pickup | <span style={{ fontSize: '1.0rem', color: 'rgba(0,0,0,.26)' }}>Order Date:{new Date(product.Start_Order).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>

                                        </p>
                                    )}
                                    {product.status === 2 && (
                                        <p className="order-status" style={{ color: 'rgb(33, 37, 41)' }}>

                                            Status: Out for Delivery | <span style={{ fontSize: '1.0rem', color: 'rgba(0,0,0,.26)' }}>Order Date:{new Date(product.Start_Order).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>

                                        </p>
                                    )}
                                    {product.status === 2 && (
                                        <p className="order-status" style={{ color: 'green' }}>

                                            Status: Delivered | <span style={{ fontSize: '1.0rem', color: 'rgba(0,0,0,.26)' }}>Date:25-05-2005</span>

                                        </p>
                                    )}

                                    <p className="order-status">

                                    </p>
                                </div>
                            </div>
                        ))}
                    </>


                );
            case 'delivery':
                return (
                    <>
                        {delivery.map((product, index) => (
                            <div key={index} className="product-item">
                                <div className="product-image">
                                    <img src={`http://127.0.0.1:8000/${product.link}`} alt={product.name} />
                                </div>
                                <div className="product-details">
                                    <p className="product-name">{product.name}</p>
                                    <p className="product-quantity">Quantity: {product.Quality}</p>
                                    <p className="product-price">Total Price: ${product.Price}</p>
                                    {product.status === 0 && (
                                        <p className="order-status" style={{ color: 'rgb(33, 37, 41)' }}>

                                            Status: Pending Confirmation | <span style={{ fontSize: '1.0rem', color: 'rgba(0,0,0,.26)' }}>Order Date:{new Date(product.Start_Order).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>

                                        </p>
                                    )}
                                    {product.status === 1 && (
                                        <p className="order-status" style={{ color: 'rgb(33, 37, 41)' }}>

                                            Status: Ready for Pickup | <span style={{ fontSize: '1.0rem', color: 'rgba(0,0,0,.26)' }}>Order Date:{new Date(product.Start_Order).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>

                                        </p>
                                    )}
                                    {product.status === 2 && (
                                        <p className="order-status" style={{ color: 'rgb(33, 37, 41)' }}>

                                            Status: Out for Delivery | <span style={{ fontSize: '1.0rem', color: 'rgba(0,0,0,.26)' }}>Order Date:{new Date(product.Start_Order).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>

                                        </p>
                                    )}
                                    {product.status === 2 && (
                                        <p className="order-status" style={{ color: 'green' }}>

                                            Status: Delivered | <span style={{ fontSize: '1.0rem', color: 'rgba(0,0,0,.26)' }}>Date:25-05-2005</span>

                                        </p>
                                    )}

                                    <p className="order-status">

                                    </p>
                                </div>
                            </div>
                        ))}
                    </>
                )
                case'deliveried':
                return(
                    <>
                    {deliveried.map((product, index) => (
                        <div key={index} className="product-item">
                            <div className="product-image">
                                <img src={`http://127.0.0.1:8000/${product.link}`} alt={product.name} />
                            </div>
                            <div className="product-details">
                                <p className="product-name">{product.name}</p>
                                <p className="product-quantity">Quantity: {product.Quality}</p>
                                <p className="product-price">Total Price: ${product.Price}</p>
                                {product.status === 0 && (
                                    <p className="order-status" style={{ color: 'rgb(33, 37, 41)' }}>

                                        Status: Pending Confirmation | <span style={{ fontSize: '1.0rem', color: 'rgba(0,0,0,.26)' }}>Order Date:{new Date(product.Start_Order).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>

                                    </p>
                                )}
                                {product.status === 1 && (
                                    <p className="order-status" style={{ color: 'rgb(33, 37, 41)' }}>

                                        Status: Ready for Pickup | <span style={{ fontSize: '1.0rem', color: 'rgba(0,0,0,.26)' }}>Order Date:{new Date(product.Start_Order).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>

                                    </p>
                                )}
                                {product.status === 2 && (
                                    <p className="order-status" style={{ color: 'rgb(33, 37, 41)' }}>

                                        Status: Out for Delivery | <span style={{ fontSize: '1.0rem', color: 'rgba(0,0,0,.26)' }}>Order Date:{new Date(product.Start_Order).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>

                                    </p>
                                )}
                                {product.status === 2 && (
                                    <p className="order-status" style={{ color: 'green' }}>

                                        Status: Delivered | <span style={{ fontSize: '1.0rem', color: 'rgba(0,0,0,.26)' }}>Date:25-05-2005</span>

                                    </p>
                                )}

                                <p className="order-status">

                                </p>
                            </div>
                        </div>
                    ))}
                </>

                )
           
                default:
                return null;
        }

    }

    const ID = location.state?.ID || '';
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/AllMyorder/${ID}`);
                setorderData(response.data);
            } catch (error) {
                console.error("fetch data", error);
            }
        }
        fetchdata();
    }, [])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/WaitingConfirmation/${ID}`);
                setwaitorder(response.data);
            } catch (error) {
                console.error("fetch data", error);
            }
        }
        fetchdata();
    }, [])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/delivery/${ID}`);
                setdelivery(response.data);
            } catch (error) {
                console.error("fetch data", error);
            }
        }
        fetchdata();
    }, [])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/deliveried/${ID}`);
                setdeliveried(response.data);
            } catch (error) {
                console.error("fetch data", error);
            }
        }
        fetchdata();
    }, [])
    return (

        <div>

            <MenuHomepage />
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <h2 className="font-bold" style={{ color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontSize: '36px', marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif' }}>My Order</h2>
                        <ul>
                            <li>
                                <a href="" style={{ textDecoration: 'none' }}>Home</a>
                            </li>
                            <li className="active">Single Product</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="hiraola-product-tab_area-2 sp-product-tab_area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">

                            <div className="sp-product-tab_nav">
                                <div className="product-tab">
                                    <ul className="nav product-menu">
                                        <li>
                                            <a id="tab" style={{ color: ActiveTab === 'All' ? "#cda557" : '#595959', cursor: 'pointer' }}>
                                                <span style={{ fontFamily: '"Lato", sans-serif', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => handleTabChange("All")} >All</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a id="tab" style={{ color: ActiveTab === 'wait' ? "#cda557" : '#595959', cursor: 'pointer' }} >
                                                <span style={{ fontFamily: '"Lato", sans-serif', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => handleTabChange("wait")}>wait for confirmation</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a id="tab" style={{ color: ActiveTab === 'delivery' ? "#cda557" : '#595959', cursor: 'pointer' }}>
                                                <span style={{ fontFamily: '"Lato", sans-serif', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }} onClick={()=>handleTabChange("delivery")}>waiting for delivery</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a id="tab" style={{ color: ActiveTab === 'deliveried' ? "#cda557" : '#595959', cursor: 'pointer' }}>
                                                <span style={{ fontFamily: '"Lato", sans-serif', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }} onClick={()=>handleTabChange("deliveried")} >delivered</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="tab-content hiraola-tab_content">
                                    <div id="All" className={`tab-pane ${ActiveTab === 'All' ? 'active show' : ''}`}>
                                        {renderTabContent()}
                                    </div>
                                    <div id="wait" className={`tab-pane ${ActiveTab === 'wait' ? 'active show' : ''}`}>
                                        {renderTabContent()}
                                    </div>
                                    <div id="delivery" className={`tab-pane ${ActiveTab === 'delivery' ? 'active show' : ''}`}>
                                        {renderTabContent()}
                                    </div>
                                    <div id="deliveried" className={`tab-pane ${ActiveTab === 'deliveried' ? 'active show' : ''}`}>
                                        {renderTabContent()}
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
export default Myorder;