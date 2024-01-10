
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import './admin/admin.css'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import Pagination from 'react-paginate';
import 'react-paginate/theme/basic/react-paginate.css';
import ReactQuill from 'react-quill';
import image from '../images/user2-160x160.jpg';
function AdminBlog() {
  const [Customer, setCustomer] = useState([]);
  const location = useLocation();
  const username = location.state?.username || 'Default Username';
  const ID = location.state?.ID || '';
  const [perPage, setperPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setloading] = useState(true);
  const [searchTerm, setSearchtem] = useState('');
  const navigate = useNavigate();
  const [isonline, setisonline] = useState('');
  const [viewBlog, setViewBlog] = useState([]);
  const [Blog, setBlog] = useState([]);
  const [formData, setFormData] = useState({
    Blog_tittle: '',
    Blog_desc: '',
    Blog_content: '',
    Blog_meta_desc: '',
    Blog_meta_keyword: '',
    Blog_category: '',
    Blog_status: '',
    image: null,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [Act,setAct]=useState(true);
  useEffect(() => {
    if (!ID && Act) {
     navigate(-1); 
    }
  }, [ID, navigate]);
  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleEditorChange = (content, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: content,
    }));
  };
  const handleToggleStatus = async (ID, currentStatus) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/UpdateStatus/${ID}`, {
        Blog_status: currentStatus,
      });
      if (response.data.message === 'Change successful') {
        setViewBlog((prevOrders) =>
          prevOrders.map((order) =>
            order.ID === ID ? { ...order, Blog_status: currentStatus === 1 ? 0 : 1 } : order
          )
        );
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        //gửi yêu cầu http để lấy dữ liệu từ api 
        const response = await axios.get('http://127.0.0.1:8000/api/ViewBlog');
        setViewBlog(response.data);
      } catch (error) {
        console.error('error fetchinh categories:', error)
      }
    }
    fetchdata();
  }, [])
  useEffect(() => {
    const fetchdata = async () => {
      try {
        //gửi yêu cầu http để lấy dữ liệu từ api 
        const response = await axios.get('http://127.0.0.1:8000/api/getpostCategory');
        setBlog(response.data);
      } catch (error) {
        console.error('error fetchinh categories:', error)
      }
    }
    fetchdata();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataApi = new FormData();
      formDataApi.append('image', formData.image);
      formDataApi.append('Blog_tittle', formData.Blog_tittle);
      formDataApi.append('Blog_desc', formData.Blog_desc);
      formDataApi.append('Blog_content', formData.Blog_content);
      formDataApi.append('Blog_meta_desc', formData.Blog_meta_desc);
      formDataApi.append('Blog_meta_keyword', formData.Blog_meta_keyword);
      formDataApi.append('Blog_category', formData.Blog_category);
      formDataApi.append('Blog_status', formData.Blog_status);

      const response = await axios.post('http://127.0.0.1:8000/api/AddBlog', formDataApi, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFormData({
        Blog_tittle: '',
        Blog_desc: '',
        Blog_content: '',
        Blog_meta_desc: '',
        Blog_meta_keyword: '',
        Blog_category: '',
        Blog_status: '',
        image: null,
      });
      document.getElementById('imageInput').value = '';
      const responsedata = await axios.get('http://127.0.0.1:8000/api/ViewBlog');
      setViewBlog(responsedata.data);
      console.log(formData.Blog_tittle)
      console.log(response.data);
      // Handle success, redirection, or display a success message to the user
    } catch (error) {
      console.error('Error adding blog:', error);
      // Handle error and show an error message to the user
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
        const response = await axios.put(`http://127.0.0.1:8000/api/deleteBlog/${idpicture}`);
        if (response.data.message) {
          Swal.fire({
            icon: 'success',
            title: 'Deletion successful',
            showConfirmButton: false,
            timer: 1500,
          });

          const responsedata = await axios.get('http://127.0.0.1:8000/api/ViewBlog');
          setViewBlog(responsedata.data);
        }
      } catch (error) {
        console.error('Error deleting picture:', error);
        // Handle error, show a message, or log it
      }
    }
  };
  const filteredCategories = viewBlog.filter(category =>

    category.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handlePageclick = (data) => {
    setCurrentPage(data.selected);
  };

  const indexOflastCategory = (currentPage + 1) * perPage;
  const indexOfFirtCategory = indexOflastCategory - perPage;
  const currentCategories = filteredCategories.slice(indexOfFirtCategory, indexOflastCategory)
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const responsedata = await axios.get('http://127.0.0.1:8000/api/ViewBlog');
        setViewBlog(responsedata.data);
      } catch (error) {
        console.error('Error during fetch:', error);
      } finally {
        setloading(false);
      }
    }
    fetchdata();
  }, [])
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
              Blog

            </h1>
            <ol className="breadcrumb">
              <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
              <li><a href="#">Blog</a></li>
            </ol>
          </section>
          <section className="content">
            <div className="row">

              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Blog</h3>
                </div>
                <form role="form" onSubmit={handleSubmit}>
                  <div className="box-body">
                    {/* Form fields go here */}
                    <div className="form-group">
                      <label >Article name</label>
                      <input name='Blog_tittle' className="form-control" id="exampleInputEmail1" placeholder="Enter Name Category Post"
                        onChange={(e) => setFormData({ ...formData, Blog_tittle: e.target.value })} value={formData.Blog_tittle} />

                    </div>
                    <div className="form-group">
                      <label >Summary of the article</label>
                      <ReactQuill
                        theme="snow"
                        value={formData.Blog_desc}
                        onChange={(content) => handleEditorChange(content, 'Blog_desc')}
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor="">Content</label>
                      <ReactQuill
                        theme="snow"
                        value={formData.Blog_content}
                        onChange={(content) => handleEditorChange(content, 'Blog_content')}
                      />

                    </div>
                    <div className='form-group'>
                      <label htmlFor="">Meta Keyword</label>
                      <textarea name="Blog_meta_keyword" className="form-control" id="exampleTextarea" placeholder="Enter Content" value={formData.Blog_meta_keyword}
                        onChange={handleInputChange}></textarea>

                    </div>
                    <div className='form-group'>
                      <label htmlFor="">Meta Content</label>
                      <textarea name="Blog_meta_desc" className="form-control" id="exampleTextarea" placeholder="Enter Content" value={formData.Blog_meta_desc}
                        onChange={handleInputChange}></textarea>

                    </div>
                    <div className='form-group'>
                      <label htmlFor="">article image</label>
                      <input type='file' name="image" className="form-control" id="imageInput" onChange={handleImageChange} />

                    </div>
                    <div className='form-group'>
                      <label htmlFor="">article category</label>
                      <select name="Blog_category" className="form-control" value={formData.Blog_category}
                        onChange={handleInputChange}>
                        <option value="">Select article category</option>
                        {Array.isArray(Blog) && Blog.map(provider => (
                          <option value={provider.ID}>{provider.Name}</option>
                        ))}
                      </select>


                    </div>
                    <div className='form-group'>
                      <label htmlFor="">Status</label>
                      <select name="Blog_status" className="form-control" value={formData.Blog_status}
                        onChange={handleInputChange}>
                        <option value="">Select Status</option>
                        <option value="0">Hide</option>
                        <option value="1">Show</option>
                      </select>


                    </div>

                  </div>

                  <div className="box-footer">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>

                <div className="box-body">
                  <table id="example1" className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Blog tittle</th>
                        <th>Blog Image</th>
                        {/* <th>Blog description</th> */}
                        <th>Blog keyword</th>
                        <th>Category Blog</th>
                        <th>Blog status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentCategories.map((order, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{order.Blog_tittle}</td>
                          <td><img src={`http://127.0.0.1:8000/${order.Blog_image}`} width="100" height="100" style={{ objectFit: 'cover' }} alt="" /></td>
                          {/* <td dangerouslySetInnerHTML={{ __html: order.Blog_desc }} /> */}
                          <td>{order.Blog_meta_keyword}</td>
                          <td>{order.Name}</td>
                          <td>  <label className="switch">
                            <input type="checkbox" id={`toggleSwitch-${order.ID}`}
                              onChange={() => handleToggleStatus(order.ID, order.Blog_status)}
                              checked={order.Blog_status === 1} />
                            <span className="slider" ></span>
                          </label></td>
                          <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deletePicture(order.ID)} >Remove</button></td>
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
export default AdminBlog;