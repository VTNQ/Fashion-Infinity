import image from '../images/user2-160x160.jpg';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Pagination from 'react-paginate';
import 'react-paginate/theme/basic/react-paginate.css';
import '../components/admin.css'
function Picture() {
  const [searchTerm, setSearchtem] = useState('');
  const [loading, setloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setperPage] = useState(5);
  const [Picture, setPicture] = useState([]);
  const [IsClosingPopup,setIsClosingPopup]=useState(false);
  const popupContentStyle = {
    background: 'white',
    padding: '20px',
    maxWidth: '400px',
    textAlign: 'center',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    animation: 'flipleft 0.5s', // Default animation
  };
  const handleEditClick = (categoryId) => {
    const selectedCategory=Picture.find(category=>category.ID==categoryId)
    if(selectedCategory){
      setFormData({
        
      })
    }
    setPopupVisibility(true);
  }
  const closingAnimation = {
    animation: 'flipright 0.5s',
  };
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const handleClosepopup=()=>{
    
    setIsClosingPopup(true);
    setTimeout(() => {
      setFormData({
       
      })
      setPopupVisibility(false);
      setIsClosingPopup(false);
    }, 500);
   
  }
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/getPicture");
        setPicture(response.data);
      } catch (error) {
        console.error("error picture", error);
      }
    }
    fetchdata();
  }, []);
  const location = useLocation();
  const username = location.state?.username || 'Default Username';

  const navigate = useNavigate();
  const [previewImage, setpreviewImage] = useState([]);
  const [formData, setFormData] = useState({
    Image: [],
    status: '1',
  });
  const handleStatusChange = (e) => {
    setFormData({
      ...formData,
      status: e.target.value,
    });

  }
  const filteredCategories = Picture.filter(category =>

    category.status.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleImageChange = (e) => {
    const selectedImage = Array.from(e.target.files);
    setpreviewImage(selectedImage.map((image) => URL.createObjectURL(image)));
    setFormData({
      ...formData,
      Image: selectedImage,
    });
  };
  const handleImageUpload = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const formDataApi = new FormData();

      // Check if status is "main" and more than one image is selected
      if (formData.status === '1' && formData.Image.length > 1) {
        Swal.fire({
          icon: 'error',
          title: 'Main category can only have one image',
          showConfirmButton: true,
        });
        return;
      }

      formData.Image.forEach((image) => {
        formDataApi.append('Image', image);
      });

      formDataApi.append('status', formData.status);

      const response = await axios.post('http://127.0.0.1:8000/api/uploadImage', formDataApi);

      if (response.data.message) {
        Swal.fire({
          icon: 'success',
          title: 'Image uploaded successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        setFormData({
          Image: null,
          status: '1',

        });

        setpreviewImage([]);
        document.getElementById('imageInput').value = '';
      } else if (response.data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Failed to upload image',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Image upload error:', error);
    } finally {
      setloading(false);
    }
  };


  const handlePageclick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleToggleSwitchChange = async (index) => {
   try{
    const response=await fetch(`http://127.0.0.1:8000/api/Updatestatus/${index}`,{
    method:'PUT',
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({}),
    });
    if(!response.ok){
      const errorData=await response.json();
      Swal.fire({
        icon: "error",
        title: errorData.error,
        showConfirmButton: false,
        timer: 1500
      });
    }
    
    const updatedPicture=[...Picture];
    updatedPicture[index].status =  1 ;
    setPicture(updatedPicture);
    const responsedata = await axios.get("http://127.0.0.1:8000/api/getPicture");
    setPicture(responsedata.data);

    console.log('Change successful');
   }catch(error){
    console.error(error);
   }
  };
  const indexOflastCategory = (currentPage + 1) * perPage;
  const indexOfFirtCategory = indexOflastCategory - perPage;
  const currentCategories = filteredCategories.slice(indexOfFirtCategory, indexOflastCategory)

  return (
    <div>
      {loading && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-[9000]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
        </div>
      )}
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
                <a className='cursor-pointer' onClick={() => navigate('/admin', { state: { username: username } })}>
                  <i className="fa fa-dashboard"></i> <span>Dashboard</span> <i className="fa fa-angle-left pull-right"></i>
                </a>

              </li>
              <li className="treeview">

                <ul className="treeview-menu">
                  <li><a href="pages/layout/top-nav.html"><i className="fa fa-circle-o"></i> Top Navigation</a></li>
                  <li><a href="pages/layout/boxed.html"><i className="fa fa-circle-o"></i> Boxed</a></li>
                  <li><a href="pages/layout/fixed.html"><i className="fa fa-circle-o"></i> Fixed</a></li>
                  <li><a href="pages/layout/collapsed-sidebar.html"><i className="fa fa-circle-o"></i> Collapsed Sidebar</a></li>
                </ul>
              </li>
              <li>
                <a href="pages/widgets.html">
                  <i className="fa fa-th"></i> <span>category</span>
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
              Picture

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
                <form role="form" onSubmit={handleImageUpload} >
                  <div className="box-body">
                    {/* Form fields go here */}
                    <div className="form-group">
                      <label >Name</label>
                      <input type='file' name='Image' className="form-control" id="imageInput" placeholder="Enter Name Category" onChange={handleImageChange} multiple />

                    </div>
                    <div className="form-group">
                      <label >Name</label>
                      <select name="status" className="form-control" value={formData.status} onChange={handleStatusChange}>

                        <option value="1">Main</option>
                        <option value="2">extra</option>
                      </select>

                    </div>
                    {previewImage.length > 0 && (
                      <div className='form-group'>
                        <label >Preview</label>
                        <div className="img form-group flex">
                          {previewImage.map((previewImage, index) => (
                            <img key={index} src={previewImage} alt={`Preview ${index}`} width="100" height="100" />
                          ))}
                        </div>

                      </div>

                    )}

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
                  <select name="status" className="border border-gray-300 px-3  py-1 rounded-md focus:outline-none focus:border-blue-500 w-[100%]" value={searchTerm} onChange={(e) => setSearchtem(e.target.value)}>

                    <option value="1">Main</option>
                    <option value="2">extra</option>
                  </select>

                </div>

                <div className="box-body">
                  <table id="example1" className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Picture</th>
                        <th>Status</th>
                        <th>Update</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentCategories.map((item, index) => (
                        <tr key={item.ID}>
                          <td>{index + 1}</td>
                          <td><img src={item.link} width="100" height="100" style={{ objectFit: 'cover' }} alt="" /></td>
                          <td>
                            <label className="switch">
                              <input type="checkbox" id={`toggleSwitch-${index}`}
                                onChange={() => handleToggleSwitchChange(item.ID)}
                                checked={item.status === 1} />
                              <span className="slider" ></span>
                            </label>
                          </td>
                          <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditClick(item.ID)} >Edit</button></td>
                          <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" >Remove</button></td>
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
              <form role="form" >
                <div className="box-body">
                  {/* Form fields go here */}
                  <div className="form-group">
                    <label className='float-left'>Name</label>
                    <input name='UpdateNameCategory' className="form-control" value={formData.UpdateNameCategory} onChange={handleImageUpload} id="exampleInputEmail1" placeholder="Enter Name Category"  />
                  
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

    </div>

  )
}
export default Picture;