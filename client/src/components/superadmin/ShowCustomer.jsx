import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../admin/admin.css'
import Swal from 'sweetalert2';
import image from '../../../src/images/user2-160x160.jpg';
import Pagination from 'react-paginate';
import 'react-paginate/theme/basic/react-paginate.css';

function ShowCustomer(){

    const location = useLocation();
    const username = location.state?.username || 'Default Username';
    const [perPage,setperPage] = useState(5);
    const navigate = useNavigate();
    const [currentPage,setCurrentPage] = useState(0);
    
    const [Act,setAct]=useState(true);
    useEffect(() => {
      if ( Act) {
       navigate(-1); 
      }
    }, [ navigate]);
    const [formData,setFormData] = useState({

    })
    const [searchItem,setSearchItem] = useState('');
    const [customers,setCustomers] = useState([]);
    const [IsClosingPopup,setIsClosingPopup]=useState(false);

    useEffect(()=>{
        const fetchdata=async()=>{
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/getCustomers');
                setCustomers(response.data);
            } catch (error) {
                console.error('error fetching customers',error)
            }
        }
        fetchdata();
    },[])
    const popupContentStyle = {
        background: 'white',
        padding: '20px',
        maxWidth: '400px',
        textAlign: 'center',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        animation: 'flipleft 0.5s', // Default animation
      };

    const closingAnimation = {
        animation: 'flipright 0.5s',
    };
    // const [errors, setErrors] = useState({});
    // const validateInput = (fieldName, value) => {
    //   const newErors = { ...errors };
    //   if (fieldName === "NameCategory") {
    //     newErors[fieldName] = value.trim() === '' ? 'Name Category is required' : '';
    //   }else if(fieldName==="UpdateNameCategory"){
    //     newErors[fieldName] = value.trim() === '' ? 'Name Category is required' : '';
    //   }
    //   setErrors(newErors);
    // }
    const [isPopupVisible, setPopupVisibility] = useState(false);
    // const handleClosepopup=()=>{
    
    //     setIsClosingPopup(true);
    //     setTimeout(() => {
    //       setFormData({
    //         UpdateNameCategory:'',
    //         ID:'',
    //       })
    //       setPopupVisibility(false);
    //       setIsClosingPopup(false);
    //     }, 500);
       
    //   }
    const filteredCustomers = customers.filter(customer =>
    
        customer.Username.toLowerCase().includes(searchItem.toLowerCase())
      );
      const handlePageclick=(data)=>{
        setCurrentPage(data.selected);
      };
      const indexOflastCustomers=(currentPage+1)*perPage;
        const indexOfFirtCustomers=indexOflastCustomers-perPage;
        const currentCustomers=filteredCustomers.slice(indexOfFirtCustomers,indexOflastCustomers)

    const[totalCustomer,SetTotalCustomer] = useState();
    useEffect(()=>{
      const fetchdata=async()=>{
          try {
              const response = await axios.get('http://127.0.0.1:8000/api/getCustomers');
              const countCustomer = response.data.filter(customer => customer.Accounttype === 1).length;
             SetTotalCustomer(countCustomer);
              
          } catch (error) {
              console.error('error fetching customers',error)
          }
      }
      fetchdata();
  },[])
    // useEffect = (()=> {
    //   const fetchData = async()=>{
    //       try {
    //         const response = await axios.get('http://127.0.0.1:8000/api/getCustomers');
    //         const countCustomer = response.data.filter(customer => customer.status===1).length;
    //         SetTotalCustomer(countCustomer);
    //       } catch (error) {
    //         console.error('error fetching data from total customer',error);
    //       }
    //   }
    //   fetchData();
    // },[]);

    
    return(

        <div class="content-wrapper">

<section class="content">
          
          <div class="row">
            <div class="col-lg-3 col-xs-6">
              
              <div class="small-box bg-aqua">
                <div class="inner">
                  <h3>{totalCustomer}</h3>
                  <p>Total Customer</p>
                </div>
                <div class="icon">
                  <i class="ion ion-bag"></i>
                </div>
                <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
              </div>
            </div>
            <div class="col-lg-3 col-xs-6">
              
              <div class="small-box bg-green">
                <div class="inner">
                  <h3>53<sup style={{ fontSize: '20px' }}>%</sup></h3>
                  <p>Bounce Rate</p>
                </div>
                <div class="icon">
                  <i class="ion ion-stats-bars"></i>
                </div>
                <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
              </div>
            </div>
            <div class="col-lg-3 col-xs-6">
             
              <div class="small-box bg-yellow">
                <div class="inner">
                  <h3>44</h3>
                  <p>User Registrations</p>
                </div>
                <div class="icon">
                  <i class="ion ion-person-add"></i>
                </div>
                <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
              </div>
            </div>
            <div class="col-lg-3 col-xs-6">
              
              <div class="small-box bg-red">
                <div class="inner">
                  <h3>65</h3>
                  <p>Unique Visitors</p>
                </div>
                <div class="icon">
                  <i class="ion ion-pie-graph"></i>
                </div>
                <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
              </div>
            </div>
          </div>
          

        </section>
        
        <section class="content-header">



          <h1>
            Simple Tables
            <small>preview of simple tables</small>
          </h1>
          <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li><a href="#">Tables</a></li>
            <li class="active">Customer Show</li>
          </ol>
        </section>

        
        <section class="content">
          
          <div class="row">
            <div class="col-xs-12">
              <div class="box">
                <div class="box-header">
                  <h3 class="box-title">Customer Show</h3>
                  <div class="box-tools">
                    <div class="input-group">
                      <input type="text" name="table_search"  value={searchItem} onChange={(e)=>setSearchItem(e.target.value)} class="form-control input-sm pull-right w-[150px]"  placeholder="Search"/>
                      <div class="input-group-btn">
                        <button class="btn btn-sm btn-default"><i class="fa fa-search"></i></button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="box-body table-responsive no-padding">
                  <table class="table table-hover">
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                    <tbody>
                    
                    {currentCustomers.map((customer,index)=>(
                      <tr key={customer.id}>
                        <td>{index+1}</td>
                      <td>{customer.Username}</td>
                      <td>{customer.Email}</td>
                      <td>active</td>
                      <td>action</td>
                    </tr>
                    ))}
                    </tbody>
                    
                    
                  </table>
                  <Pagination
         previousLabel={'previous'}
         nextLabel={'next'}
         breakLabel={'...'}
         pageCount={Math.ceil(filteredCustomers.length / perPage)}
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
        </section>
      </div>

    )
}
export default ShowCustomer;