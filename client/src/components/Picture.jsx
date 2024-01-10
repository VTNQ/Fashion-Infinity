import image from '../images/user2-160x160.jpg';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Pagination from 'react-paginate';
import 'react-paginate/theme/basic/react-paginate.css';
import './admin/admin.css'
function Picture() {

  const [searchTerm, setSearchtem] = useState('');
  const [loading, setloading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setperPage] = useState(5);
  const [Picture, setPicture] = useState([]);


  const [Act,setAct]=useState(true);
  useEffect(() => {
    if (!ID && Act) {
     navigate(-1); 
    }
  }, [ID, navigate]);
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
  const ID = location.state?.ID || '';
  const navigate = useNavigate();
  const [previewImage, setpreviewImage] = useState([]);

  const [formData, setFormData] = useState({
    Image: [],
    status: '1',
    ID: '',

  });
  const handleStatusChange = (e) => {
    setFormData({
      ...formData,
      status: e.target.value,
    });

  }

  const validateImageFormat = (file) => {
    return new Promise((resolve, reject) => {
      const render = new FileReader();
      render.onloadend = function () {
        const arr = new Uint8Array(render.result).subarray(0, 4);
        let header = '';
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }
        if (header.startsWith('89504e47')) {
          resolve(true);
        } else if (header.startsWith('ffd8ff')) {
          resolve(true)
        } else if (header.startsWith('47494638')) {
          resolve(true);
        } else {
          reject('Invalid image format')
        }
      };
      render.onerror = function () {
        reject('error reading the file');
      };
      render.readAsArrayBuffer(file);
    })
  }
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/getPicture");
        setPicture(response.data);
      } catch (error) {
        console.error('Error during fetch:', error);
      } finally {

        setloading(false);
      }
    }
    fetchdata();
  }, [])
  const filteredCategories = Picture.filter(category =>

    category.status.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleImageChange = async (e) => {
    const selectedImage = Array.from(e.target.files);

    try {

      await Promise.all(selectedImage.map(validateImageFormat));

      setpreviewImage(selectedImage.map((image) => URL.createObjectURL(image)));
      setFormData({
        ...formData,
        Image: selectedImage,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: error,
        showConfirmButton: true,
      });
      setpreviewImage([]);
      setFormData({
        ...formData,
        Image: [],
      });
      document.getElementById('imageInput').value = '';

      // Clear selected image names on error


    }
  };
  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (formData.Image.length <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Image is required',
        showConfirmButton: true,
      });
    } else {
      try {
        setloading(true);
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
          formDataApi.append('Image[]', image); // Note the square brackets to handle multiple files
        });

        formDataApi.append('status', formData.status);

        const response = await axios.post('http://127.0.0.1:8000/api/uploadImage', formDataApi);

        if (response.data.message) {
          setloading(false);
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
          const responseData = await axios.get('http://127.0.0.1:8000/api/getPicture');
          setPicture(responseData.data);
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
    }


  };
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/getPicture");
        setPicture(response.data);
      } catch (error) {
        console.error('Error during fetch:', error);
      } finally {

        setloading(false);
      }
    }
  })
  // ... (your existing code)


  const handlePageclick = (data) => {
    setCurrentPage(data.selected);
  };
  const handleToggleSwitchChange = async (index) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/Updatestatus/${index}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: '1', // Include the data you want to send in the request body
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: errorData.error,
          showConfirmButton: false,
          timer: 1500,
        });
      }

      const updatedPicture = [...Picture];
      if (updatedPicture[index]) {
        updatedPicture[index].status = '1';
        setPicture(updatedPicture);
      } else {
        console.error('Picture not found at index:', index);
      }

      const responseData = await axios.get('http://127.0.0.1:8000/api/getPicture');
      setPicture(responseData.data);
    } catch (error) {
      console.error(error);
    }
  };
  const deletePicture = async (idpicture) => {
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
        const response = await axios.put(`http://127.0.0.1:8000/api/DeletePicture/${idpicture}`);
        if (response.data.message) {
          Swal.fire({
            icon: 'success',
            title: 'Deletion successful',
            showConfirmButton: false,
            timer: 1500,
          });

          const responseData = await axios.get('http://127.0.0.1:8000/api/getPicture');
          setPicture(responseData.data);
        }
      } catch (error) {
        console.error('Error deleting picture:', error);
        // Handle error, show a message, or log it
      }
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
              <li className="treeview text-white">
                <a className='cursor-pointer' onClick={() => navigate('/admin', { state: { username: username, ID: ID } })}>
                  <i className="fa fa-dashboard" ></i> <span>Dashboard</span>
                </a>

              </li>

              <li className="treeview text-white">
                <a className='cursor-pointer' onClick={() => navigate('/category', { state: { username: username, ID: ID } })}>
                  <i className="fa fa-th"></i> <span>category</span>
                </a>
              </li>
              <li className="treeview text-white">
                <a className='cursor-pointer' onClick={() => navigate('/Picture', { state: { username: username, ID: ID } })}>
                  <i className="fa fa-th"></i> <span>Picture</span>
                </a>
              </li>
              <li className="treeview text-white">
                <a className='cursor-pointer' onClick={() => navigate('/Provider', { state: { username: username, ID: ID } })}>
                  <i className="fa fa-th"></i> <span>Provider</span>
                </a>
              </li>
              <li className="treeview text-white">
                <a className='cursor-pointer' onClick={() => navigate('/Product', { state: { username: username, ID: ID } })}>
                  <i className="fa fa-th"></i> <span>Product</span>
                </a>
              </li>
              <li className="treeview text-white">
                <a className='cursor-pointer' onClick={() => navigate('/Edit', { state: { username: username, ID: ID } })}>
                  <i className="fa fa-th"></i> <span>Edit</span>
                </a>
              </li>
              <li className="treeview text-white">
                <a className='cursor-pointer' onClick={() => navigate('/WareHouse', { state: { username: username, ID: ID } })}>
                  <i className="fa fa-th"></i> <span>WareHouse</span>
                </a>
              </li>

              <li className="treeview text-white">
                <a className='cursor-pointer' onClick={() => navigate('/Order', { state: { username: username, ID: ID } })}>
                  <i className="fa fa-th"></i> <span>Order</span>
                </a>
              </li>
              <li className="treeview text-white">
                <a className='cursor-pointer' onClick={() => navigate('/Transport_fee', { state: { username: username, ID: ID } })}>
                  <i className="fa fa-th"></i> <span>Transport fee</span>
                </a>
              </li>
              <li className="treeview text-white">
                <a className='cursor-pointer' onClick={() => navigate('/AdminBlog', { state: { username: username, ID: ID } })}>
                  <i className="fa fa-th"></i> <span>Blog</span>
                </a>
              </li>
              <li className="treeview text-white">
                <a className='cursor-pointer' onClick={() => navigate('/Category_Post', { state: { username: username, ID: ID } })}>
                  <i className="fa fa-th"></i> <span>Category Blog</span>
                </a>
              </li>
              <li className="treeview text-white">
                <a className='cursor-pointer' onClick={() => navigate('/Event', { state: { username: username, ID: ID } })}>
                  <i className="fa fa-th"></i> <span>Event</span>
                </a>
              </li>

              <li className="treeview text-white">
                <a className='cursor-pointer' onClick={() => navigate('/login')}>
                  <i className="fa fa-th"></i> <span>Log out</span>
                </a>
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
              <li><a href="#">Picture</a></li>
            </ol>
          </section>
          <section className="content">
            <div className="row">
              <div className="box box-primary" style={{ maxHeight: '400px' }}>
                <div className="box-header">
                  <h3 className="box-title">Picture</h3>
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
                  <h3 className="box-title">List Picture</h3>
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
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentCategories.map((item, index) => (
                        <tr key={item.ID}>
                          <td>{index + 1}</td>
                          <td><img src={`http://127.0.0.1:8000/${item.link}`} width="100" height="100" style={{ objectFit: 'cover' }} alt="" /></td>
                          <td>
                            <label className="switch">
                              <input type="checkbox" id={`toggleSwitch-${index}`}
                                onChange={() => handleToggleSwitchChange(item.ID)}
                                checked={item.status === 1} />
                              <span className="slider" ></span>
                            </label>
                          </td>

                          <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deletePicture(item.ID)} >Remove</button></td>
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

      </div>

    </div>

  )
}
export default Picture;