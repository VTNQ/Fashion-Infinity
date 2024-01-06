import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import axios from 'axios'
import Swal from "sweetalert2";
import { useLocation } from 'react-router-dom';

function VoucherSuperadmin(){

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [voucherCode, setVoucherCode] = useState('');
    const [voucherCodeError, setVoucherCodeError] = useState(false);   
    
    const handleVoucherCodeChange = (e) => {
      const value = e.target.value.toUpperCase(); 
      if (value.length <= 6) {
          setFormData({ ...formData, voucherCode: value }); 
          setVoucherCodeError(false); 
      } else {
         
          setVoucherCodeError(true);
          Swal.fire({
            title: 'Error!',
            text: 'Voucher code must be 6 characters long.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
      }
  };

  


    const [discountPercentage, setDiscountPercentage] = useState('');
    const [percentageError, setPercentageError] = useState(false);
    const handleDiscountPercentageChange = (e) => {
      const value = e.target.value;
    
      
      if (!isNaN(value) && (value <= 100 && value >= 0)) {
        setFormData({ ...formData, valuePercentage: value });
        setPercentageError(false);
      } else {
        setPercentageError(true); 
      }
    };
    

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        voucherCode: '',
        valuePercentage: '',
        startDate: formatDate(new Date()), 
        endDate: formatDate(new Date()),
        quantity: '',
       
        nameVoucher: ''
    });

    function formatDate(date) {
        return date.toISOString().split('T')[0];
      }
    // Cập nhật state khi có thay đổi trong form
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }
      const handleDateChange = (name, date) => {
        setFormData({ ...formData, [name]: formatDate(date) });
      };
    
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/createVoucher', formData);
            if (response.status === 200) {
                Swal.fire(
                    'Created!',
                    'Voucher has been created successfully.',
                    'success'
                );

               
            }
        } catch (error) {
           
            if (error.response && error.response.status === 409) {
                Swal.fire(
                    'Error!',
                    'Voucher code already exists.',
                    'error'
                );
            } else {
               
                Swal.fire(
                    'Error!',
                    'An error occurred. Please try again.',
                    'error'
                );
            }
        }
    };
    return(
        
             <div>
                 <div class="content-wrapper">
        
        <section class="content-header">
          <h1>
            Manage coupoun and sale event
            <small>superadmin</small>
          </h1>
          <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li><a href="#">Voucher</a></li>
            <li class="active">Manage Voucher</li>
          </ol>
        </section>

        
        <section class="content">
          <div class="row">
            
            <div class="">
              
              <div class="box box-primary">
                <div class="box-header">
                  <h3 class="box-title">Create Voucher</h3>
                </div>
               
                <form role="form" onSubmit={handleSubmit}>
                  <div class="box-body">
                    
                  <div class="form-group">
                      <label for="exampleInputEmail1">Description Voucher</label>
                      <input name="nameVoucher" onChange={handleInputChange} value={formData.nameVoucher} type="text" class="form-control" id="exampleInputEmail1" placeholder="Name voucher"/>
                    </div>

                    <div class="form-group">
                      <label for="exampleInputEmail1">Voucher Code</label>
                      <input
    type="text"
    name="voucherCode"
    className="form-control"
    id="voucherCode"
    placeholder="Voucher code"
    onChange={handleVoucherCodeChange}
    value={formData.voucherCode}
    maxLength={6}
/>
{voucherCodeError && <p className="text-danger">Voucher code must be 6 characters long.</p>}
                            
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Percentage on total bill (%)</label>
                      <input
    type="number"
    name="valuePercentage"
    className="form-control"
    id="discountPercentage"
    placeholder="Enter discount percentage"
    value={formData.valuePercentage}
    onChange={handleDiscountPercentageChange}
    required
  />
  {percentageError && (
    <p className="text-danger">
      Percentage must be a number less than or equal to 100 and greater than or equal to 0.
    </p>
  )}
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Quantity</label>
                      <input type="text" name="quantity" onChange={handleInputChange}
                          value={formData.quantity} class="form-control" id="exampleInputPassword1" placeholder="quantity"/>
                    </div>
                    <div class="form-group mt-4">
                <label for="startDate">Start Date</label>
                <DatePicker 
                   selected={new Date(formData.startDate)}
                    name="startDate"
                    onChange={(date) => handleDateChange('startDate', date)}
                    dateFormat="dd-MM-yyyy"
                    className="form-control"
                />
            </div>
            <div class="form-group">
                <label for="endDate">End Date</label>
                <DatePicker 
                    selected={new Date(formData.endDate)}
                    name="endDate"
                    onChange={(date) => handleDateChange('endDate', date)}
                    dateFormat="dd-MM-yyyy"
                    className="form-control"
                />
            </div>
                    
                  </div>

                  <div class="box-footer">
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </div>
                </form>
              </div>

             
            </div>
            
            
          </div>   
        </section>
      </div>
             </div>
        
    )

}
export default VoucherSuperadmin;