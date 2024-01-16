import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState,useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { useLocation } from 'react-router-dom';

function VoucherSuperadmin(){

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [voucherCode, setVoucherCode] = useState('');
    const [voucherCodeError, setVoucherCodeError] = useState(false);   
    const navigate = useNavigate();
 
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
    const handleInputChange1 = (e) => {
        setFormData1({ ...formData1, [e.target.name]: e.target.value });
      }
      const handleDateChange1 = (name, date) => {
        setFormData1({ ...formData1, [name]: formatDate(date) });
      };
      function formatDate1(date) {
        return date.toISOString().split('T')[0];
      }
    
    
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
    const [formData1, setFormData1] = useState({
      voucherCode: 'FSH', // The initial value should match the initial state of your input
  startDate1: formatDate(new Date()), 
  endDate1: formatDate(new Date()),
  quantity: '',  
  minPrice: '',
  });

  const [startDate1, setStartDate1] = useState(new Date());
    const [endDate1, setEndDate1] = useState(new Date());
      const handleSubmitFreeShip = async (e) => {
        e.preventDefault();
        const formattedStartDate = startDate1 instanceof Date ? startDate1.toISOString().split('T')[0] : '';
  const formattedEndDate = endDate1 instanceof Date ? endDate1.toISOString().split('T')[0] : '';

  // Check if dates have been set correctly
  if (!formattedStartDate || !formattedEndDate) {
    Swal.fire('Error!', 'Invalid dates. Please make sure you have selected valid start and end dates.', 'error');
    return;
  }

  const dataToSend = {
    voucherCode: freeShipVoucherCode,
    startDate: formattedStartDate,
    endDate: formattedEndDate,
    quantity: formData1.quantity,
    minPrice: formData1.minPrice,
  };
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/createVoucherFreeship', dataToSend);
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
    
    const [error, setError] = useState('');
    const [vouchers,setVouchers] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/getVoucher');
          if (response.data.success) {
            const filteredVouchers = response.data.data.filter(voucher => 
              voucher.voucherCode && !voucher.voucherCode.includes('FSH')
            );
            setVouchers(filteredVouchers); // Đảm bảo bạn đang cập nhật state với dữ liệu chính xác
          } else {
            console.error('No vouchers found');
          }
        } catch (error) {
          console.error('Error fetching vouchers:', error);
        }
      };
      fetchData();
    }, []);
    

    //KIEM TRA TRANG THAI VOUCHER
    const getVoucherStatus = (voucher) => {
      const currentDate = new Date();
      const startDate = new Date(voucher.startDate);
      const endDate = new Date(voucher.endDate);
    
      if (currentDate < startDate) {
        return 'Unused';
      } else if (currentDate <= endDate) {
        return 'Active';
      } else {
        return 'Expired';
      }
    };
    //format lai dinh dang nha
    const formatDatee = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN"); // Định dạng ngày theo địa phương Việt Nam
    };


    //delete
    const deletesubmit = async (voucherCode) => {

      const confirmation = await Swal.fire({
          title: 'Are you sure you want to delete?',
          text: 'You won\'t be able to revert this!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
      });
      if (confirmation.isConfirmed) {
          try {
              const response = await axios.delete(`http://127.0.0.1:8000/api/deleteVoucher/${voucherCode}`);
              if (response.data.success) {
                  Swal.fire({
                      icon: 'success',
                      title: 'Deletion successful',
                      showConfirmButton: false,
                      timer: 1500,
                  });
                  fetchVouchers();
              }
          } catch (error) {
              console.error('Error deleting voucher:', error);
              Swal.fire('Error!', 'Failed to delete the voucher.', 'error');
          }
      }
  }
  //tai lai danh sach voucher
  const fetchVouchers = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/getVoucher');
        if (response.data.success) {
            // Exclude vouchers that start with 'FSH'
            const nonFreeshipVouchers = response.data.data.filter(voucher => 
                !voucher.voucherCode.includes('FSH')
            );
            setVouchers(nonFreeshipVouchers);
        } else {
            setError('No vouchers found');
        }
    } catch (error) {
        console.error('Error fetching vouchers:', error);
        setError('Error fetching vouchers');
    }
}


const [activeVoucherCount,setActiveVoucherCount] = useState(0);
useEffect(()=>{
  const countActiveVouchers = () =>{
    const count = vouchers.filter(voucher => {
      const currentDate = new Date();
      const startDate = new Date(voucher.startDate);
      const endDate = new Date(voucher.endDate);
      return currentDate >= startDate && currentDate <= endDate;
    }).length;
    setActiveVoucherCount(count);
  };
  countActiveVouchers();
},[vouchers]);
const[freeshipvouchers,setFreeshipvouchers] = useState([]);
const [unusedVoucherCount,setUnusedVoucherCount] = useState(0);
const [unusedFreeshipVoucherCount, setUnusedFreeshipVoucherCount] = useState(0);
const [totalUnusedVoucherCount, setTotalUnusedVoucherCount] = useState(0);
useEffect(() => {
  const countUnusedVouchers = () => {
    const count = vouchers.filter(voucher => {
      const currentDate = new Date();
      const startDate = new Date(voucher.startDate);
      return currentDate <= startDate;
    }).length;

    const count1 = freeshipvouchers.filter(voucher => {
      const currentDate = new Date();
      const startDate = new Date(voucher.startDate);
      return currentDate <= startDate;
    }).length;

    setUnusedVoucherCount(count); // If you want to keep track of them separately
    setUnusedFreeshipVoucherCount(count1); // If you want to keep track of them separately
    setTotalUnusedVoucherCount(count + count1); // This sets the total count
  };

  countUnusedVouchers(); // You need to call the function
}, [vouchers, freeshipvouchers]); // Dependencies are correct


//XU LY FSH
const [freeShipVoucherCode, setFreeShipVoucherCode] = useState('FSH');


const handleFreeShipVoucherCodeChange = (e) => {
  const prefix = "FSH";
  let value = e.target.value.toUpperCase();

  // Đảm bảo rằng giá trị luôn bắt đầu bằng "FSH"
  if (!value.startsWith(prefix)) {
      value = prefix + value.replace(prefix, '');
  }

  // Giới hạn độ dài tối đa là 6 ký tự
  if (value.length <= 6) {
      setFreeShipVoucherCode(value);
  }
};


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/getVoucher');
      if (response.data.success) {
        // Filter the vouchers that start with "FSH"
        const filteredVouchers = response.data.data.filter(voucher => 
          voucher.voucherCode && voucher.voucherCode.startsWith('FSH')
        );
        setFreeshipvouchers(filteredVouchers); // Update state with filtered data
      } else {
        console.error('No vouchers found');
      }
    } catch (error) {
      console.error('Error fetching vouchers:', error);
    }
  };
  fetchData();
}, []);

    return(
        
             <div className="">
              
          
          
            
              
              <section class="content">
          
          <div class="row">
            
            <div class="col-lg-3 col-xs-6 ml-[240px]">
              
              <div class="small-box bg-green ">
                <div class="inner">
                  <h3>{activeVoucherCount}<sup style={{ fontSize: '20px' }}>voucher</sup></h3>
                  <p>Active Voucher</p>
                </div>
                <div class="icon">
                  <i class="ion ion-stats-bars"></i>
                </div>
                <a href="#" class="small-box-footer">voucher Management <i class="fa fa-arrow-circle-right"></i></a>
              </div>
            </div>
            <div class="col-lg-3 col-xs-6">
              
              <div class="small-box bg-green ">
                <div class="inner">
                  <h3>{totalUnusedVoucherCount}<sup style={{ fontSize: '20px' }}>voucher</sup></h3>
                  <p>Pending Voucher</p>
                </div>
                <div class="icon">
                  <i class="ion ion-stats-bars"></i>
                </div>
                <a href="#" class="small-box-footer">voucher Management <i class="fa fa-arrow-circle-right"></i></a>
              </div>
            </div>
            
          </div>
          

        </section>
            
            
          
          

        
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
          <div class="">
            
            <div class="grid grid-cols-2">
              
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
              <div class="box box-primary">
                <div class="box-header">
                  <h3 class="box-title">Create Fresship Voucher</h3>
                </div>
               
                <form role="form" onSubmit={handleSubmitFreeShip}>
                  <div class="box-body">
                    
                  <div class="form-group">
                      <label for="exampleInputEmail1">Min Price Condition</label>
                      <input name="minPrice" onChange={handleInputChange1} value={formData1.minPrice} type="number" class="form-control" id="exampleInputEmail1" placeholder="Min Price"/>
                    </div>

                    <div class="form-group">
                      <label for="exampleInputEmail1">Voucher Code</label>
                      <input
                      type="text"
                      name="voucherCode1"
                      className="form-control"
                      id="voucherCode"
                      placeholder="Voucher code"
                      onChange={handleFreeShipVoucherCodeChange}
                      value={freeShipVoucherCode}
                      maxLength={6}
/>
{voucherCodeError && <p className="text-danger">Voucher code must be 6 characters long.</p>}
                            
                    </div>
                    
                    <div class="form-group">
                      <label for="exampleInputPassword1">Quantity</label>
                      <input type="text" name="quantity" onChange={handleInputChange1}
                          value={formData1.quantity} class="form-control" id="exampleInputPassword1" placeholder="quantity"/>
                    </div>
                    <div class="form-group mt-4">
                <label for="startDate">Start Date</label>
                <DatePicker 
                   selected={startDate1}
                    name="startDate1"
                    onChange={(date) => setStartDate1(date)}
                    dateFormat="dd-MM-yyyy"
                    className="form-control"
                />
            </div>
            <div class="form-group">
                <label for="endDate">End Date</label>
                <DatePicker 
                    selected={endDate1}
                    name="endDate1"
                    onChange={(date) => setEndDate1(date)}
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
                 <div class="content-wrapper">
        
        
        
      </div>

      <div class="content-wrapper">
        
        <section class="content-header">
          <h1>
            Voucher Management
            <small>superadmin</small>
          </h1>
          <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li><a href="#">Currently Voucher</a></li>
            <li class="active">Voucher</li>
          </ol>
        </section>

        
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
             

              <div class="box">
                <div class="box-header">
                  <h3 class="box-title">Data Voucher</h3>
                </div>
                <div class="box-body">
                  <table id="example1" class="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>VoucherCode</th>
                        <th>Percentage value</th>
                        <th>StartDate</th>
                        <th>EndDate</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>

                      </tr>
                    </thead>
                    <tbody>
  {vouchers.length > 0 ? (
    vouchers.map((voucher) => (
      <tr key={voucher.id}> {/* Sử dụng id hoặc một key duy nhất */}
        <td>{voucher.voucherCode}</td>
        <td>{voucher.value}</td>
        <td>{formatDatee(voucher.startDate)}</td>
        <td>{formatDatee(voucher.endDate)}</td>
        <td>{voucher.quantity}</td>
        <td>{voucher.nameVoucher}</td>
        {/* các cell khác */}
        <td>{getVoucherStatus(voucher)}</td>
        <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deletesubmit(voucher.voucherCode)} >Remove</button></td>

      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7">No vouchers available.</td>
    </tr>
  )}
</tbody>

                    
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="content-wrapper">
        
        <section class="content-header">
          <h1>
            Freeship Voucher Management
            <small>superadmin</small>
          </h1>
          <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li><a href="#">Currently Voucher</a></li>
            <li class="active">Voucher</li>
          </ol>
        </section>

        
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
             

              <div class="box">
                <div class="box-header">
                  <h3 class="box-title">Data Freeship Voucher</h3>
                </div>
                <div class="box-body">
                  <table id="example1" class="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>VoucherCode</th>
                        <th>Min Price</th>
                        <th>StartDate</th>
                        <th>EndDate</th>
                        <th>Quantity</th>
                        
                        <th>Status</th>
                        <th>Action</th>

                      </tr>
                    </thead>
                    <tbody>
  {freeshipvouchers.length > 0 ? (
    freeshipvouchers.map((voucher) => (
      <tr key={voucher.id}> {/* Sử dụng id hoặc một key duy nhất */}
        <td>{voucher.voucherCode}</td>
        <td>{voucher.minPrice}</td>
        <td>{formatDatee(voucher.startDate)}</td>
        <td>{formatDatee(voucher.endDate)}</td>
        <td>{voucher.quantity}</td>
        
        {/* các cell khác */}
        <td>{getVoucherStatus(voucher)}</td>
        <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deletesubmit(voucher.voucherCode)} >Remove</button></td>

      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7">No vouchers available.</td>
    </tr>
  )}
</tbody>

                    
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>


             </div>
        
    )

}
export default VoucherSuperadmin;