import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Magnifier } from 'react-image-magnify';
import { Slide, ToastContainer, toast } from 'react-toastify';
import '../menu/menu.css';
import './OrderDetail.css';
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
function OrderDetail() {
  const location = useLocation();
  const [singleproduct, setsingleproduct] = useState(false);
  const [Listview, setListView] = useState(false);

  const username = location.state?.username || 'Default Username';
  const ID = location.state?.ID || '';
  const IDproduct = location.state?.IDproduct || '';
  const IDorder = location.state?.IDorder || '';
  const [orderAddress, setorderAddress] = useState([]);
  const [customer, setcustomer] = useState([]);
  const [order, setorder] = useState([]);
  const [ActiveTab, setActiveTab] = useState('Address');
  const handleTabChange = (tabID) => {
    setActiveTab(tabID);
  }
  const renderTabContent = () => {
    switch (ActiveTab) {
      case 'Address':
        return (
          <div id="deliveryAddressTab" className="tab-pane fade show active text-center">
            <h3 className="mb-4" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '22px', fontWeight: 'bold' }}>Delivery Address</h3>
            <div className="row justify-content-center">
              {orderAddress && (
                <div className="col-md-6 mb-3">
                  <label className="mb-0" style={{ fontSize: '22px' }}><strong>District</strong></label>
                  <p className="mb-2">{orderAddress.Namedistrict}</p>
                </div>
              )}
              {orderAddress && (
                <div className="col-md-6 mb-3">
                  <label className="mb-0" style={{ fontSize: '22px' }}><strong>Ward</strong></label>
                  <p className="mb-2">{orderAddress.NameWard}</p>
                </div>
              )}
              {orderAddress && (
                <div className="col-md-6 mb-3">
                  <label className="mb-0" style={{ fontSize: '22px' }}><strong>Address</strong></label>
                  <p className="mb-2">{orderAddress.Address}</p>
                </div>
              )}
              {orderAddress && (
                <div className="col-md-6 mb-3">
                  <label className="mb-0" style={{ fontSize: '22px' }}><strong>City</strong></label>
                  <p className="mb-2">{orderAddress.NameCity}</p>
                </div>
              )}
            </div>
          </div>

        )
      case "Customer":
        return (
          <>
            <h3 className="mb-4" style={{ fontFamily: '"Lato", sans-serif', color: '#595959', fontSize: '18px', fontWeight: 'bold' }}>Customer Information</h3>
            <div className="row ">
              <div className="col-md-6 mb-3">
                <p>Name: <strong>{customer.FullName}</strong></p>

              </div>
              <div className="col-md-6 mb-3">
                <p>Phone: <strong>{customer.Phone}</strong></p>

              </div>
              <div className="col-md-6 mb-3">
                <p>Username: <strong>{customer.Username}</strong></p>

              </div>
              <div className="col-md-6 mb-3">
                <p>Email: <strong>{customer.Email}</strong></p>

              </div>
            </div>
          </>
        )
      case "Product":
        return (
          <>
            <h2 style={{fontSize:'20px',fontFamily:'"Lato", sans-serif'}}>Detail Order:<strong>{order.order_code}</strong></h2>
            <div className="row">
              <div className="product-item">
                <div className="product-image">
                  <img src={`http://127.0.0.1:8000/${order.link}`} alt={order.Name} />
                </div>
                <div className="product-details">
                  <p className="product-name" style={{ color: '#595959', fontFamily: '"Lato", sans-serif' }} >{order.Name}</p>
                  <p className="product-quantity">Quantity:{order.Quality}</p>
                  <p className="product-price">Price: ${order.Price}</p>




                  <p className="order-status">

                  </p>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <p>Total Price: <strong>{order.TotalPrice}$</strong></p>
              </div>

            </div>
          </>
        )


      default:
        return null;
    }
  }
  useEffect(() => {
    const fetchcustomer = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/AddressOrder/${ID}`);
        if (response.ok) {
          const data = await response.json();
          setorderAddress(data);
        }
      } catch (error) {
        console.error("Failed to fetch Order data");
      }
    }
    fetchcustomer();
  }, [])
  useEffect(() => {
    const fetchcustomer = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/InformationCustomer/${ID}`);
        if (response.ok) {
          const data = await response.json();
          setcustomer(data);
        }
      } catch (error) {
        console.error("Failed to fetch Order data");
      }
    }
    fetchcustomer();
  }, [])
  useEffect(() => {
    const fetchcustomer = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/orderDetail/${IDorder}/${IDproduct}`);
        if (response.ok) {
          const data = await response.json();
          setorder(data);
        }
      } catch (error) {
        console.error("Failed to fetch Order data");
      }
    }
    fetchcustomer();
  }, [])
  return (

    <div>

      <MenuHomepage />
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <h2 className="font-bold" style={{ color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontSize: '36px', marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif' }}>Detail Order</h2>
            <ul>
              <li>
                <a href="" style={{ textDecoration: 'none' }}>Home</a>
              </li>
              <li className="active">DetailOrder</li>
              
            </ul>
          </div>
        </div>
      </div>
      <div className="hiraola-product-tab_area-2 sp-product-tab_area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="sp-product-tab_nav">
                {/* Your tab navigation components go here */}
                <div className="product-tab">
                  <ul className="nav product-menu">
                    <li>
                      <a id="tab" style={{ color: ActiveTab === 'Address' ? "#cda557" : '#595959', cursor: 'pointer' }}>
                        <span style={{ fontFamily: '"Lato", sans-serif', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => handleTabChange("Address")}>Address</span>
                      </a>
                    </li>
                    <li>
                      <a id="tab" style={{ color: ActiveTab === 'Customer' ? "#cda557" : '#595959', cursor: 'pointer' }} >
                        <span style={{ fontFamily: '"Lato", sans-serif', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => handleTabChange("Customer")}>Information Customer</span>
                      </a>
                    </li>
                    <li>
                      <a id="tab" style={{ color: ActiveTab === 'Product' ? "#cda557" : '#595959', cursor: 'pointer' }}>
                        <span style={{ fontFamily: '"Lato", sans-serif', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => handleTabChange("Product")} >Detail Product Order </span>
                      </a>
                    </li>

                  </ul>
                </div>
                <div className="tab-content hiraola-tab_content">
                  {/* Tab content for Delivery Address */}
                  <div id="Address" className={`tab-pane ${ActiveTab === 'Address' ? 'active show' : ''}`}>
                    {renderTabContent()}
                  </div>

                  <div id="Customer" className={`tab-pane ${ActiveTab === 'Customer' ? 'active show' : ''}`}>
                    {renderTabContent()}

                  </div>

                  <div id="Product" className={`tab-pane ${ActiveTab === 'Product' ? 'active show' : ''}`}>
                    {renderTabContent()}
                  </div>

                  {/* Add more tab contents if needed */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>






    </div>
  )
}
export default OrderDetail;