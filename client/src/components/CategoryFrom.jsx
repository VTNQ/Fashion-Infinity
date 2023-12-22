import image from '../images/user2-160x160.jpg';
import { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import Swal from 'sweetalert2';
import axios  from 'axios';
import { useLocation } from 'react-router-dom';
import Pagination from 'react-paginate';
import 'react-paginate/theme/basic/react-paginate.css';
import '../components/admin.css'
function CategoryFrom() {

  const location = useLocation();
  const username = location.state?.username || 'Default Username';
  const [perPage,setperPage]=useState(5);
  const navigate=useNavigate();
  const [currentPage,setCurrentPage]=useState(0);
  const [formData, setFormData] = useState({
    NameCategory: '',
    UpdateNameCategory:'',
  });
  const [searchTerm,setSearchtem]=useState('');
  const [categories, setCategories] = useState([]);
  const [IsClosingPopup,setIsClosingPopup]=useState(false);
  useEffect(()=>{
    const fetchdata=async()=>{
      try{
        const response=await axios.get('http://127.0.0.1:8000/api/getcategories');
        setCategories(response.data);
      }catch(error){
        console.error('error fetchinh categories:',error)
      }
    }
    fetchdata();
  },[]);
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
    const newErors = { ...errors };
    if (fieldName === "NameCategory") {
      newErors[fieldName] = value.trim() === '' ? 'Name Category is required' : '';
    }else if(fieldName==="UpdateNameCategory"){
      newErors[fieldName] = value.trim() === '' ? 'Name Category is required' : '';
    }
    setErrors(newErors);
  }
  const [isPopupVisible, setPopupVisibility] = useState(false);

  // Step 2: Function to handle "Edit" button click and show popup
  const handleClosepopup=()=>{
    
    setIsClosingPopup(true);
    setTimeout(() => {
      setFormData({
        UpdateNameCategory:'',
        ID:'',
      })
      setPopupVisibility(false);
      setIsClosingPopup(false);
    }, 500);
   
  }
 
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.NameCategory === '') {
      Swal.fire({
        icon: "error",
        title: "Name Category is required",
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/AddCategory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const responseData = await response.json();
        if (response.ok) {
          const response=await axios.get('http://127.0.0.1:8000/api/getcategories');
        setCategories(response.data);
          setFormData({
            NameCategory: '',

          });
          Swal.fire({
            icon: "success",
            title: "Add category successfully",
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          if (responseData.errorcategory) {
            setFormData({
              NameCategory: '',

            });
            Swal.fire({
              icon: "error",
              title: responseData.errorcategory,
              showConfirmButton: false,
              timer: 1500
            });
          }
        }
      } catch (error) {
        console.error('Add error:' + error);
      }
    }
  
  
  }
 

  const filteredCategories = categories.filter(category =>
    
    category.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handlePageclick=(data)=>{
    setCurrentPage(data.selected);
  };
  const deleteSubmit = async (idCategory) => {
  
  
    // Show confirmation modal
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });
  
    if(confirmation.isConfirmed){
      const response = await axios.put(`http://127.0.0.1:8000/api/deleteCategory/${idCategory}`, {
        
      });
      if(response.data.message){
        Swal.fire({
          icon: 'success',
          title: 'Deletion successful',
          showConfirmButton: false,
          timer: 1500,
        });
        const response=await axios.get('http://127.0.0.1:8000/api/getcategories');
        setCategories(response.data);
      }
    }
  
  };
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if(formData.UpdateNameCategory===''){
      Swal.fire({
        icon: "error",
        title: "Category is required",
        showConfirmButton: false,
        timer: 1500,
      });
    }else{
      try {
        const response = await axios.put(`http://127.0.0.1:8000/api/categories/${formData.ID}`, {
          UpdateNameCategory: formData.UpdateNameCategory,
        });
        if (response.data.exists) {
          Swal.fire({
            icon: "error",
            title:"Category is exists",
            showConfirmButton: false,
            timer: 1500,
          });
         
        }else if(response.data.message){
          Swal.fire({
            icon: "success",
            title: "update category successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setPopupVisibility(false);
          const response=await axios.get('http://127.0.0.1:8000/api/getcategories');
          setCategories(response.data);
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
    }
    
  };
  
  const handleEditClick = (categoryId) => {
    const selectedCategory=categories.find(category=>category.ID==categoryId)
    if(selectedCategory){
      setFormData({
        UpdateNameCategory:selectedCategory.Name,
        ID:selectedCategory.ID,
      })
    }
    // Here you can perform any logic before showing the popup
    setPopupVisibility(true);

   
  };
  const indexOflastCategory=(currentPage+1)*perPage;
  const indexOfFirtCategory=indexOflastCategory-perPage;
  const currentCategories=filteredCategories.slice(indexOfFirtCategory,indexOflastCategory)
  return (
    <div className="wrapper">

      <header className="main-header">

        <a href="index2.html" className="logo"><b>Admin</b>LTE</a>

        <nav className="navbar navbar-static-top" role="navigation">
          <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span className="sr-only">Toggle navigation</span>
          </a>

          {/* Logo */}
          <a className="navbar-brand">
            <img src={image} className="user-image" alt="Logo" />
            {/* You can also add text or other elements alongside the logo */}
            {username}
          </a>

        </nav>
      </header>

      <aside className="main-sidebar ">

        <section className="sidebar h-auto">

          <div className="user-panel">
            <div className="pull-left image">
              <img src={image} className="img-circle" alt="User Image" />
            </div>
            <div className="pull-left info">
              <p className='text-white'>Alexander Pierce</p>

              <a href="#" className='text-white'><i className="fa fa-circle text-green-500"></i> Online</a>
            </div>
          </div>



          <ul className="sidebar-menu">
            <li className="header">MAIN NAVIGATION</li>
            <li className="active treeview text-white">
              <a className='cursor-pointer'  onClick={() => navigate('/admin', { state: { username: username } })}>
                <i className="fa fa-dashboard"></i> <span>Dashboard</span> 
              </a>

            </li>
            <li className="treeview">

             
            </li>
            <li className="active treeview text-white">
              <a className='cursor-pointer' onClick={() => navigate('/category', { state: { username: username } })}>
                <i className="fa fa-th"></i> <span>category</span>
              </a>
            </li>
            <li className='active treeview text-white'>
              <a className='cursor-pointer' onClick={() => navigate('/Picture', { state: { username: username } })}>
                <i className="fa fa-th"></i> <span>Picture</span>
              </a>
            </li>
            <li className="treeview text-white">
              <a className='cursor-pointer' onClick={() => navigate('/Provider', { state: { username: username } })}>
                <i className="fa fa-th"></i> <span>Provider</span> 
              </a>
            </li>
            <li className="treeview text-white">
              <a className='cursor-pointer' onClick={() => navigate('/Product', { state: { username: username } })}>
                <i className="fa fa-th"></i> <span>Product</span> 
              </a>
            </li>
            <li className="treeview">
              <a href="#">
                <i className="fa fa-pie-chart"></i>
                <span>Charts</span>
                <i className="fa fa-angle-left pull-right"></i>
              </a>
              <ul className="treeview-menu">
                <li><a href="pages/charts/morris.html"><i className="fa fa-circle-o"></i> Morris</a></li>
                <li><a href="pages/charts/flot.html"><i className="fa fa-circle-o"></i> Flot</a></li>
                <li><a href="pages/charts/inline.html"><i className="fa fa-circle-o"></i> Inline charts</a></li>
              </ul>
            </li>
            <li className="treeview">
              <a href="#">
                <i className="fa fa-laptop"></i>
                <span>UI Elements</span>
                <i className="fa fa-angle-left pull-right"></i>
              </a>
              <ul className="treeview-menu">
                <li><a href="pages/UI/general.html"><i className="fa fa-circle-o"></i> General</a></li>
                <li><a href="pages/UI/icons.html"><i className="fa fa-circle-o"></i> Icons</a></li>
                <li><a href="pages/UI/buttons.html"><i className="fa fa-circle-o"></i> Buttons</a></li>
                <li><a href="pages/UI/sliders.html"><i className="fa fa-circle-o"></i> Sliders</a></li>
                <li><a href="pages/UI/timeline.html"><i className="fa fa-circle-o"></i> Timeline</a></li>
                <li><a href="pages/UI/modals.html"><i className="fa fa-circle-o"></i> Modals</a></li>
              </ul>
            </li>
            <li className="treeview">
              <a href="#">
                <i className="fa fa-edit"></i> <span>Forms</span>
                <i className="fa fa-angle-left pull-right"></i>
              </a>
              <ul className="treeview-menu">
                <li><a href="pages/forms/general.html"><i className="fa fa-circle-o"></i> General Elements</a></li>
                <li><a href="pages/forms/advanced.html"><i className="fa fa-circle-o"></i> Advanced Elements</a></li>
                <li><a href="pages/forms/editors.html"><i className="fa fa-circle-o"></i> Editors</a></li>
              </ul>
            </li>
            <li className="treeview">
              <a href="#">
                <i className="fa fa-table"></i> <span>Tables</span>
                <i className="fa fa-angle-left pull-right"></i>
              </a>
              <ul className="treeview-menu">
                <li><a href="pages/tables/simple.html"><i className="fa fa-circle-o"></i> Simple tables</a></li>
                <li><a href="pages/tables/data.html"><i className="fa fa-circle-o"></i> Data tables</a></li>
              </ul>
            </li>
            <li>
              <a href="pages/calendar.html">
                <i className="fa fa-calendar"></i> <span>Calendar</span>
                <small className="label pull-right bg-red">3</small>
              </a>
            </li>
            <li>
              <a href="pages/mailbox/mailbox.html">
                <i className="fa fa-envelope"></i> <span>Mailbox</span>
                <small className="label pull-right bg-yellow">12</small>
              </a>
            </li>
            <li className="treeview">
              <a href="#">
                <i className="fa fa-folder"></i> <span>Examples</span>
                <i className="fa fa-angle-left pull-right"></i>
              </a>
              <ul className="treeview-menu">
                <li><a href="pages/examples/invoice.html"><i className="fa fa-circle-o"></i> Invoice</a></li>
                <li><a href="pages/examples/login.html"><i className="fa fa-circle-o"></i> Login</a></li>
                <li><a href="pages/examples/register.html"><i className="fa fa-circle-o"></i> Register</a></li>
                <li><a href="pages/examples/lockscreen.html"><i className="fa fa-circle-o"></i> Lockscreen</a></li>
                <li><a href="pages/examples/404.html"><i className="fa fa-circle-o"></i> 404 Error</a></li>
                <li><a href="pages/examples/500.html"><i className="fa fa-circle-o"></i> 500 Error</a></li>
                <li><a href="pages/examples/blank.html"><i className="fa fa-circle-o"></i> Blank Page</a></li>
              </ul>
            </li>


          </ul>
        </section>

      </aside>


      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            Category

          </h1>
          <ol className="breadcrumb">
            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
            <li><a href="#">Category</a></li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="box box-primary" style={{ maxHeight: '400px' }}>
              <div className="box-header">
                <h3 className="box-title">Quick Example</h3>
              </div>
              <form role="form" onSubmit={handleSubmit}>
                <div className="box-body">
                  {/* Form fields go here */}
                  <div className="form-group">
                    <label >Name</label>
                    <input name='NameCategory' className="form-control" value={formData.NameCategory} onChange={handleInputChange} id="exampleInputEmail1" placeholder="Enter Name Category" onBlur={() => validateInput('NameCategory', formData.NameCategory)} />
                    {errors.NameCategory && (
                      <p className="text-red-500 text-sm italic">{errors.NameCategory}</p>
                    )}
                  </div>

                </div>

                <div className="box-footer">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="box">
              <div className="box-header">
                <h3 className="box-title">Data Table With Full Features</h3>
              </div>
              <div className="flex items-center space-x-4 float-left flex-1 mb-2 ml-2">
    <label for="search" className="text-gray-600">Search</label>
    <input type="text" id="search" name="search" placeholder="Enter your search term" value={searchTerm} onChange={(e)=>setSearchtem(e.target.value)} className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500"/>
</div>

              <div className="box-body">
                <table id="example1" className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Update</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCategories.map((category,index)=>(
                      <tr key={category.id}>
                        <td>{index+1}</td>
                      <td>{category.Name}</td>
                      <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditClick(category.ID)}>Edit</button></td>
                      <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={()=>deleteSubmit(category.ID)}>Remove</button></td>
                    </tr>
                    ))}
                    
                   
                  </tbody>
                
                </table>
                <Pagination
         previousLabel={'previous'}
         nextLabel={'next'}
         breakLabel={'...'}
         pageCount={Math.ceil(filteredCategories.length / perPage)}
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
            {/* Additional boxes go here */}
          </div>
        </section>
      </div>
     
      <footer className="main-footer">
        <div className="pull-right hidden-xs">
          <b>Version</b> 2.0
        </div>
        <strong>Copyright &copy; 2014-2015 <a href="http://almsaeedstudio.com">Almsaeed Studio</a>.</strong> All rights reserved.
      </footer>
      {isPopupVisible && (
 <div className="popup-container">
  
 <div className="popup-content" style={IsClosingPopup ? {...popupContentStyle,...closingAnimation}:popupContentStyle}>
  <div className='flex justify-end'>
  <button onClick={handleClosepopup} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
  </div>

 <div >
 
                <h3 className="box-title">Edit Category</h3>
              </div>
              <form role="form" onSubmit={handleUpdateSubmit}>
                <div className="box-body">
                  {/* Form fields go here */}
                  <div className="form-group">
                    <label className='float-left'>Name</label>
                    <input name='UpdateNameCategory' className="form-control" value={formData.UpdateNameCategory} onChange={handleInputChange} id="exampleInputEmail1" placeholder="Enter Name Category" onBlur={() => validateInput('UpdateNameCategory', formData.UpdateNameCategory)} />
                    {errors.UpdateNameCategory && (
                      <p className="text-red-500 text-sm italic">{errors.UpdateNameCategory}</p>
                    )}
                  </div>

                </div>

                <div className="box-footer">
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
   
  
 </div>
</div>
)}
    </div>

  )
}
export default CategoryFrom;