import image from '../images/user2-160x160.jpg';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Pagination from 'react-paginate';
import 'react-paginate/theme/basic/react-paginate.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './admin/admin.css'

function Category_Post() {
    const [searchTerm, setSearchtem] = useState('');
    const [editorContent, setEditorContent] = useState('');

    const location = useLocation();
    const username = location.state?.username || 'Default Username';
    const ID = location.state?.ID || '';
    const [loading, setloading] = useState(true);
    const [perPage, setperPage] = useState(5);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [categoryPage, setcategoryPage] = useState([]);
    const [formData, setFormData] = useState({
        NamePageCategory: '',
        status: ''
    });
    const handleToggleStatus = async (ID, currentStatus) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/UpdateCategoryUpdate/${ID}`, {
                status: currentStatus,
            });
            if (response.data.message === 'Change successful') {
                setcategoryPage((prevOrders) =>
                    prevOrders.map((order) =>
                        order.ID === ID ? { ...order, status: currentStatus === 1 ? 0 : 1 } : order
                    )
                );
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    useEffect(() => {
        const fetchCategoryProduct = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/ListCategory")
                setcategoryPage(response.data);
            } catch (error) {
                console.error('Error fetching providers:', error);
            }
        }
        fetchCategoryProduct();
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.NamePageCategory === '' && formData.status === '' && editorContent === '') {
            Swal.fire({
                icon: "error",
                title: "Please enter complete information",
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/AddCategoryPost", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        NamePageCategory: formData.NamePageCategory,
                        status: formData.status,
                        Content: editorContent
                    }),

                })

                const responseData = await response.json();
                if (response.ok) {
                    setFormData({
                        NamePageCategory: '',
                        status: ''
                    })
                    setEditorContent('');
                    Swal.fire({
                        icon: "success",
                        title: "Add Page Category Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    const responsedata = await axios.get("http://127.0.0.1:8000/api/ListCategory")
                    setcategoryPage(responsedata.data);
                }
            } catch (error) {
                console.error('Error submitting data:', error);
            }
        }

    }
    const [content, setContent] = useState('');
    const filteredCategories = categoryPage.filter(category =>

        category.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleEditorChange = (content) => {
        setEditorContent(content);
    };
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };

    const [categories, setCategories] = useState([]);
    const [IsClosingPopup, setIsClosingPopup] = useState(false);

    const indexOflastCategory = (currentPage + 1) * perPage;
    const indexOfFirtCategory = indexOflastCategory - perPage;
    const currentCategories = filteredCategories.slice(indexOfFirtCategory, indexOflastCategory)
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const responsedata = await axios.get("http://127.0.0.1:8000/api/ListCategory")
                setcategoryPage(responsedata.data);
            } catch (error) {
                console.error('Error during fetch:', error);
            } finally {
                setloading(false);
            }
        }
        fetchdata();
    },[])

    return (
        <div>
            <div className="wrapper">
                {loading && (
                    <div
                        className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
                    </div>
                )}
                <header className="main-header" style={{ zIndex: '20' }}>

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

                <aside className="main-sidebar " style={{ zIndex: '10' }}>

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
                            <li  className='cursor-pointer'>
                                <a  className='cursor-pointer' onClick={() => navigate('/admin', { state: { username: username, ID: ID } })}>
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
                            Category Blog

                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                            <li><a href="#">Category Blog</a></li>
                        </ol>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="box box-primary" style={{ maxHeight: '400px' }}>
                                <div className="box-header">
                                    <h3 className="box-title">Category Blog</h3>
                                </div>
                                <form role="form" onSubmit={handleSubmit}>
                                    <div className="box-body">
                                        {/* Form fields go here */}
                                        <div className="form-group">
                                            <label >Name Category Page</label>
                                            <input name='NameCategory' className="form-control" onChange={(e) => setFormData({ ...formData, NamePageCategory: e.target.value })} value={formData.NamePageCategory} id="exampleInputEmail1" placeholder="Enter Name Category Post" />

                                        </div>
                                        <div className="form-group">
                                            <label >Name Category Page</label>
                                            <ReactQuill
                                                value={editorContent}
                                                onChange={handleEditorChange}
                                                theme="snow"
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="">Status</label>
                                            <select value={formData.status}
                                                onChange={(e) => {

                                                    setFormData({ ...formData, status: e.target.value });
                                                }}
                                                name="UpdateCategory"
                                                className="form-control"


                                            >
                                                <option value="">Select Status</option>
                                                <option value="1">Show</option>
                                                <option value="0">Hide</option>
                                            </select>

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
                                    <h3 className="box-title">List Category Blog</h3>
                                </div>
                                <div className="flex items-center space-x-4 float-left flex-1 mb-2 ml-2">
                                    <label for="search" className="text-gray-600">Search</label>
                                    <input type="text" id="search" name="search" placeholder="Enter your search term" value={searchTerm} onChange={(e) => setSearchtem(e.target.value)} className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500" />
                                </div>


                                <div className="box-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>status</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentCategories.map((order, index) => (
                                                <tr>
                                                    <td>{index++}</td>
                                                    <td>{order.Name}</td>
                                                    <td>  <label className="switch">
                                                        <input type="checkbox" id={`toggleSwitch-${order.ID}`}
                                                            onChange={() => handleToggleStatus(order.ID, order.status)}
                                                            checked={order.status === 1} />
                                                        <span className="slider" ></span>
                                                    </label></td>
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
export default Category_Post;