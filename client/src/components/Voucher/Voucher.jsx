// VoucherPage.js

import React from 'react';

import MenuHomepage from '../menu/MenuHomepage';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
const featureEnabled = window.location.pathname.includes("/voucher");

if (featureEnabled) {
	require("./VoucherPage.css");
	
}
const Voucher = () => {
 const[Voucher1,setVoucher1]=useState([]);
 const [voucherShip,setVoucherShip]=useState([]);
 useEffect(()=>{
    const fetchdelivery = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/VoucherFreeship');
            setVoucherShip(response.data);



        } catch (error) {
            console.error('Error fetching districts', error);
        }
    }
    fetchdelivery()
 },[])
 useEffect(() => {
    const fetchdelivery = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/VoucherCheck');
            setVoucher1(response.data);



        } catch (error) {
            console.error('Error fetching districts', error);
        }
    }
    fetchdelivery()
}, [])
const groupedVouchers = Voucher1.reduce((acc, voucher, index) => {
    const groupIndex = Math.floor(index / 2);
    acc[groupIndex] = [...(acc[groupIndex] || []), voucher];
    return acc;
  }, []);
const groupedVouchersFreeship = voucherShip.reduce((acc, voucher, index) => {
    const groupIndex = Math.floor(index / 2);
    acc[groupIndex] = [...(acc[groupIndex] || []), voucher];
    return acc;
  }, []);
  const handleCopy = (voucherCode) => {
    const textToCopy = voucherCode;
  
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        console.log('Text copied to clipboard');
        // You can show a success message using a library like SweetAlert or any other method
      })
      .catch((error) => {
        console.error('Error copying text to clipboard', error);
        // Handle the error, e.g., show an error message to the user
      });
  };
  return (
    <div>
        <MenuHomepage/>
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
            <section className="container">
        <h1 className='voucher-header'>Vouchers</h1>
        {groupedVouchers.map((pair, pairIndex) => (
          <div className="row" key={pairIndex}>
            {pair.map((voucher, index) => (
              <article className={`card fl-left ${index % 2 === 0 ? 'even' : 'odd'}`} key={index}>
                <button className="copy-button" onClick={() => handleCopy(voucher.voucherCode)}>
      Copy
    </button>
                <section className="date">
                  <time dateTime="23th feb">
                    <span>{voucher.voucherCode}</span>
                    
                  </time>
                </section>
                <section className="card-cont">
                  {/* Adjust the content based on your voucher properties */}
                  <small>{voucher.artist}</small>
                  <h3>{voucher.title}</h3>
                  <div className="even-date">
                   <strong>Quanlity:</strong>
                    <time>
                      <span>{voucher.quantity}</span>
                  
                    </time>
                  </div>
                  <div className="even-info">
                   <strong>Status:</strong>
                    <p>{voucher.status}</p>
                  </div>
                  <div className="even-date">
                    <i className="fa fa-calendar"></i>
                    <time>
                     <span>{new Date(voucher.startDate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </time>
                  </div>
                
                </section>
              </article>
            ))}
          </div>
        ))}
      </section>
            <section className="container">
            <h1 className="voucher-header">Vouchers Freeship</h1>
        {groupedVouchersFreeship.map((pair, pairIndex) => (
          <div className="row" key={pairIndex}>
            {pair.map((voucher, index) => (
              <article className={`card fl-left ${index % 2 === 0 ? 'even' : 'odd'}`} key={index}>
                <button className="copy-button" onClick={() => handleCopy(voucher.voucherCode)}>
      Copy
    </button>
                <section className="date">
                  <time dateTime="23th feb">
                    <span>{voucher.voucherCode}</span>
                    
                  </time>
                </section>
                <section className="card-cont">
                  {/* Adjust the content based on your voucher properties */}
                  <small>{voucher.artist}</small>
                  <h3>{voucher.title}</h3>
                  <div className="even-date">
                   <strong>Quanlity:</strong>
                    <time>
                      <span>{voucher.quantity}</span>
                  
                    </time>
                  </div>
                  <div className="even-info">
                   <strong>Status:</strong>
                    <p>{voucher.status}</p>
                  </div>
                  <div className="even-date">
                    <i className="fa fa-calendar"></i>
                    <time>
                     <span>{new Date(voucher.startDate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>
                    </time>
                  </div>
                
                </section>
              </article>
            ))}
          </div>
        ))}
      </section>
    </div>
    
  );
};

export default Voucher;
