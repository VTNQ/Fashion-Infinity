import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../admin/admin.css';
import Swal from 'sweetalert2';
import image from '../../../src/images/user2-160x160.jpg';
import Pagination from 'react-paginate';
import 'react-paginate/theme/basic/react-paginate.css';

function ShowAdmin(){

    const location = useLocation();
    const username = location.state?.username || 'Default Username';
    const [perPage,setperPage] = useState(5);
    const navigate = useNavigate();
    const [currentPage,setCurrentPage] = useState(0);
    
   
    const [formData, setFormData] = useState({
      
      UpdatePasswordAdmin:'',
      setUpdatePasswordAdmin: '',
      ID:''
    });
    const [searchItem,setSearchItem] = useState('');
    const [admins,setAdmins] = useState([]);
    const [IsClosingPopup,setIsClosingPopup]=useState(false);

    useEffect(()=>{
        const fetchdata=async()=>{
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/getAdmins');
                setAdmins(response.data);
            } catch (error) {
                console.error('error fetching admins',error)
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
    const [errors, setErrors] = useState({});
    const validateInput = (fieldName, value) => {
      
    }

    const handleClosepopup=()=>{
    
        setIsClosingPopup(true);
        setTimeout(() => {
          setFormData({
            UpdateNameAdmin:'',
            ID:'',
          })
          setPopupVisibility(false);
          setIsClosingPopup(false);
        }, 500);
       
      }

    const filteredAdmins = admins.filter(admin =>
    
        admin.Username.toLowerCase().includes(searchItem.toLowerCase())
      );
      const handlePageclick=(data)=>{
        setCurrentPage(data.selected);
      };
      const indexOflastAdmins=(currentPage+1)*perPage;
        const indexOfFirtAdmins=indexOflastAdmins-perPage;
        const currentAdmins=filteredAdmins.slice(indexOfFirtAdmins,indexOflastAdmins)

        const [isPopupVisible, setPopupVisibility] = useState(false);

        const handleUpdateSubmit = async (e) => {
          e.preventDefault();
          
            try {
              const response = await axios.put(`http://127.0.0.1:8000/api/admins/${formData.ID}`, {
                
              UpdateAdminPassword: formData.UpdatePasswordAdmin
              });
              if (response.data.exists) {
                Swal.fire({
                  icon: "error",
                  title:"Admin is exists",
                  showConfirmButton: false,
                  timer: 1500,
                });
               
              }else if(response.data.message){
                Swal.fire({
                  icon: "success",
                  title: "update Admin successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setPopupVisibility(false);
                const response=await axios.get('http://127.0.0.1:8000/api/getAdmins');
                setAdmins(response.data);
              }
            
            } catch (error) {
              console.error('Update error:', error);
              if (error.response) {
              
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
              } else if (error.request) {
              
                console.error('Request data:', error.request);
              } else {
               
                console.error('Error message:', error.message);
              }
            
          }
          
        };

        const handleInputChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
        }
        
        const handleEditClick = (AdminId) => {
          
          const selectedAdmin=admins.find(admin=>admin.ID==AdminId)
          if(selectedAdmin){
            setFormData({
             
              UpdatePasswordAdmin:'123456789',
              ID:selectedAdmin.ID,
            })
          }
          // Here you can perform any logic before showing the popup
          setPopupVisibility(true);
      
         
        };
    return(

        <div class="content-wrapper">
        
        <section class="content-header">
          <h1>
            Simple Tables
            <small>preview of simple tables</small>
          </h1>
          <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li><a href="#">Tables</a></li>
            <li class="active">Admin Show</li>
          </ol>
        </section>

        
        <section class="content">
          
          <div class="row">
            <div class="col-xs-12">
              <div class="box">
                <div class="box-header">
                  <h3 class="box-title">Admin Show</h3>
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
                    
                    {currentAdmins.map((admin,index)=>(
                      <tr key={admin.id}>
                        <td>{index+1}</td>
                      <td>{admin.Username}</td>
                      <td>{admin.Email}</td>
                      <td>active</td>
                      <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  onClick={() => handleEditClick(admin.ID)}>Reset Password</button></td>
                    </tr>
                    ))}
                    </tbody>
                    
                    
                  </table>
                  <Pagination
         previousLabel={'previous'}
         nextLabel={'next'}
         breakLabel={'...'}
         pageCount={Math.ceil(filteredAdmins.length / perPage)}
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
        {isPopupVisible && (
 <div className="popup-container">
  
 <div className="popup-content" style={IsClosingPopup ? {...popupContentStyle,...closingAnimation}:popupContentStyle}>
  <div className='flex justify-end'>
  <button onClick={handleClosepopup} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
  </div>

 <div >
 
                <h3 className="box-title">Reset admin</h3>
                <h3 className="box-title">Are you sure ?</h3>
              </div>
              <form role="form" onSubmit={handleUpdateSubmit}>
                <div className="box-body">
                  {/* Form fields go here */}
                  <div className="form-group">
                    
                    <label className='float-left'>Password</label>
                    <input name='UpdatePasswordAdmin' className="form-control" value={formData.UpdatePasswordAdmin} onChange={handleInputChange} id="exampleInputEmail2" placeholder="Enter Password" onBlur={() => validateInput('UpdatePasswordAdmin', formData.UpdatePasswordAdmin)} />
                    {errors.UpdatePasswordAdmin && (
                      <p className="text-red-500 text-sm italic">{errors.UpdatePasswordAdmin}</p>
                    )}
                  </div>

                </div>

                <div className="box-footer">
                  <button type="submit" className="btn btn-primary">
                    Reset
                  </button>
                </div>
              </form>
   
  
 </div>
</div>
)}
      </div>

    )
}
export default ShowAdmin;