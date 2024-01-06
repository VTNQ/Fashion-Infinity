import image from '../images/user2-160x160.jpg';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import Pagination from 'react-paginate';
import 'react-paginate/theme/basic/react-paginate.css';
import '../components/admin.css'
function WareHouse() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchtem] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [perPage, setperPage] = useState(5);
    const [WareHouse, setWareHouse] = useState([]);
    const [Product, setProduct] = useState([]);
    const username = location.state?.username || 'Default Username';
    const ID = location.state?.ID || '';
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    const [formData, setFormData] = useState({
        iDProduct: '',
        Quality: '',
        UpdateQualities: [],
        DeleteQualities:[]
    });
    const filterWareHouse=WareHouse.filter(warehouse=>
        warehouse.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    useEffect(() => {
        const fetchWareHouseData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/getWareHouse/${ID}`);
                if (response.ok) {
                    const data = await response.json();
                    setWareHouse(data);
                } else {
                    console.error("Failed to fetch cart data");
                }
            } catch (error) {
                console.error("Error during fetch:", error);
            }
        }
        fetchWareHouseData();
    }, []);
  const handleDeleteWareHouse=async (idProduct)=>{
    try{
        const response=await fetch(`http://127.0.0.1:8000/api/removeWareHouse/${idProduct}`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                DeleteQualities:formData.DeleteQualities
            })
        });
        if(!response.ok){
            throw new Error('Failed to Remove WareHouse');
        }
        const data=await response.json();
        if(data.message){
            Swal.fire({
                icon: "success",
                title: "remove quality product Successfully",
                showConfirmButton: false,
                timer: 1500,
            });
            const response = await fetch(`http://127.0.0.1:8000/api/getWareHouse/${ID}`);
            if (response.ok) {
                const data = await response.json();
                setWareHouse(data);
            }
            setFormData({
                iDProduct: '',
                Quality: '',
                UpdateQualities: [],
                DeleteQualities:[]
            })
        }else{
            Swal.fire({
                icon: "success",
                title: "remove quality product Successfully",
                showConfirmButton: false,
                timer: 1500,
            });
            const response = await fetch(`http://127.0.0.1:8000/api/getWareHouse/${ID}`);
            if (response.ok) {
                const data = await response.json();
                setWareHouse(data);
            }
            setFormData({
                iDProduct: '',
                Quality: '',
                UpdateQualities: [],
                DeleteQualities:[]
            })
        }
    }catch(error){
        console.error('Error Remove WareHouse:', error);
    }
  }
    const updateWarehouse = async (idProduct) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/EditWareHouse/${idProduct}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                    UpdateQualities: formData.UpdateQualities
                })
            });
            if (!response.ok) {
                throw new Error('Failed to add WareHouse');
            }
            const data = await response.json();
            if (data.message) {
                Swal.fire({
                    icon: "success",
                    title: "Add WareHouse Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                const response = await fetch(`http://127.0.0.1:8000/api/getWareHouse/${ID}`);
                if (response.ok) {
                    const data = await response.json();
                    setWareHouse(data);
                }
                setFormData({
                    iDProduct: '',
                    Quality: '',
                    UpdateQualities: [],
                    DeleteQualities:[]
                })
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Add WareHouse Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                const response = await fetch(`http://127.0.0.1:8000/api/getWareHouse/${ID}`);
                if (response.ok) {
                    const data = await response.json();
                    setWareHouse(data);
                }
                setProduct(response.data);
                setFormData({
                    iDProduct: '',
                    Quality: '',
                    UpdateQualities: [],
                    DeleteQualities:[]
                })
            }
        } catch (error) {
            console.error('Error Add WareHouse:', error);
        }
    }
    const AddWareHouse = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/AddWareHouse/${ID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    iDProduct: formData.iDProduct,
                    Quality: formData.Quality
                })
            });
            if (!response.ok) {
                throw new Error('Failed to add WareHouse');
            }
            const data = await response.json();
            if (data.message) {
                Swal.fire({
                    icon: "success",
                    title: "Add WareHouse Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                formData.iDProduct='';
                formData.Quality='';
                const response = await axios.get('http://127.0.0.1:8000/api/getProductWareHouse');
                setProduct(response.data);
                formData.iDProduct='';
                formData.Quality='';
                
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Add WareHouse Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                const response = await axios.get('http://127.0.0.1:8000/api/getProductWareHouse');
                setProduct(response.data);
                setFormData({
                    iDProduct: '',
                    Quality: '',
                    UpdateQualities: [],
                    DeleteQualities:[]
                })
            }
        } catch (error) {
            console.error('Error Add WareHouse:', error);
        }
    }
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/getProductWareHouse');
                setProduct(response.data);
            } catch (error) {
                console.error('error fetchinh Product:', error)
            }
        }
        fetchdata();
    }, [])
    const indexOflastCategory = (currentPage + 1) * perPage;
    const indexOfFirtCategory = indexOflastCategory - perPage;
    const currentCategories = filterWareHouse.slice(indexOfFirtCategory, indexOflastCategory)
    return (
        <div>
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
                                    <i className="fa fa-dashboard"></i> <span>Dashboard</span>
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
                            <li className='active treeview text-white'>
                                <a className='cursor-pointer' onClick={() => navigate('/category', { state: { username: username, ID: ID } })}>
                                    <i className="fa fa-th"></i> <span>category</span>
                                </a>
                            </li>
                            <li className='active treeview text-white'>
                                <a className='cursor-pointer' onClick={() => navigate('/Picture', { state: { username: username, ID: ID } })}>
                                    <i className="fa fa-th"></i> <span>Picture</span>
                                </a>
                            </li>
                            <li className='active treeview text-white'>
                                <a className='cursor-pointer' onClick={() => navigate('/Product', { state: { username: username, ID: ID } })}>
                                    <i className="fa fa-th"></i> <span>Product</span>
                                </a>
                            </li>
                            <li className="treeview text-white">
                                <a className='cursor-pointer' onClick={() => navigate('/Provider', { state: { username: username, ID: ID } })}>
                                    <i className="fa fa-th"></i> <span>Provider</span>
                                </a>
                            </li>

                            <li className="treeview text-white">
                                <a className='cursor-pointer' onClick={() => navigate('/Edit', { state: { username: username, ID: ID } })}>
                                    <i className="fa fa-th"></i> <span>Edit</span>
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
                            Product

                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                            <li><a href="#">Category</a></li>
                        </ol>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="box box-primary" >
                                <div className="box-header">
                                    <h3 className="box-title">Quick Example</h3>
                                </div>
                                <form role="form" onSubmit={AddWareHouse}  >
                                    <div className="box-body">
                                        {/* Form fields go here */}

                                        <div className="form-group">
                                            <label >Name Product</label>
                                            <select name="ID_Product" className="form-control" value={formData.iDProduct} onChange={(e) => setFormData({ ...formData, iDProduct: e.target.value })} >
                                                <option value="">Select Name Product</option>
                                                {Array.isArray(Product) && Product.map(product => (
                                                    <option value={product.ID}>{product.Name}</option>
                                                ))}
                                            </select>

                                        </div>
                                        <div className="form-group">
                                            <label >Quality</label>
                                            <input type='number' name='Quality' value={formData.Quality} onChange={(e) => setFormData({ ...formData, Quality: e.target.value })} className="form-control" id="exampleInputEmail1" placeholder="Enter Name Product" />

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
                                    <input type="text" id="search" name="search" placeholder="Enter your search term" className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500" value={searchTerm} onChange={(e)=>setSearchtem(e.target.value)} />

                                </div>

                                <div className="box-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Product</th>

                                                <th>Quality</th>
                                                <th>Provider</th>

                                                <th>Update</th>
                                                <th>Delete</th>
                                           
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentCategories && currentCategories.map((warehouse, index) => (
                                                <tr key={warehouse.ID}>
                                                    <td>{index + 1}</td>
                                                    <td>{warehouse.ProductName}</td>
                                                    <td>{warehouse.TotalQuantity}</td>
                                                    <td>{warehouse.ProviderName}</td>
                                                    <td>
                                                        <div className="flex items-center">
                                                            <div className="flex items-center mr-2">



                                                                <input
                                                                    key={warehouse.ID}
                                                                    name={`UpdateQuality-${index}`}
                                                                    value={formData.UpdateQualities[index] || ''}
                                                                    onChange={(e) => {
                                                                        const updatedQualities = [...formData.UpdateQualities];
                                                                        updatedQualities[index] = e.target.value;
                                                                        setFormData({ ...formData, UpdateQualities: updatedQualities });
                                                                    }}
                                                                    type="text"
                                                                    className="border rounded p-2"
                                                                    style={{ outline: 'none' }}
                                                                />


                                                            </div>
                                                            <button
                                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                                onClick={() => updateWarehouse(warehouse.ID)}
                                                            >
                                                                Update Quality
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="flex items-center">
                                                            <div className="flex items-center mr-2">



                                                                <input
                                                                     key={warehouse.ID}
                                                                     name={`DeleteQuality-${index}`}
                                                                     value={formData.DeleteQualities[index] || ''}
                                                                     onChange={(e) => {
                                                                         const DeleteQualities = [...formData.DeleteQualities];
                                                                         DeleteQualities[index] = e.target.value;
                                                                         setFormData({ ...formData, DeleteQualities: DeleteQualities });
                                                                     }}
                                                                    type="text"
                                                                    className="border rounded p-2"
                                                                    style={{ outline: 'none' }}
                                                                />


                                                            </div>
                                                            <button
                                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                                onClick={() => handleDeleteWareHouse(warehouse.ID)}
                                                            >
                                                                Delete Quality
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}


                                        </tbody>

                                    </table>
                                    <Pagination
                                        previousLabel={'previous'}
                                        nextLabel={'next'}
                                        breakLabel={'...'}
                                        pageCount={Math.ceil(filterWareHouse.length / perPage)}
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
export default WareHouse;