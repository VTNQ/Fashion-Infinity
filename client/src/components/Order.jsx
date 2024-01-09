import image from '../images/user2-160x160.jpg';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Pagination from 'react-paginate';
import 'react-paginate/theme/basic/react-paginate.css';
import './admin/admin.css'
function Order() {

    const [searchTerm, setSearchtem] = useState('');
    const [loading, setloading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [perPage, setperPage] = useState(5);
    const [Picture, setPicture] = useState([]);
    const location = useLocation();
    const username = location.state?.username || 'Default Username';
    const ID = location.state?.ID || '';
    const navigate = useNavigate();
    const [order, setorder] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const filteredCategories = order.filter(customer => {
        const codeMatches = customer.order_code.toLowerCase().includes(searchTerm.toLowerCase());
        const statusMatches = selectedStatus === 'all' || customer.status.toString() === selectedStatus;

        return codeMatches && statusMatches;
    });
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    const getStatusText = (status) => {
        switch (status) {
            case 0:
                return 'Pending Confirmation';
            case 1:
                return 'Ready for Pickup';
            case 2:
                return 'Out for Delivery';
            case 3:
                return 'Delivered';
            default:
                return 'unknown';
        }
    }
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/displayOrder");
                setorder(response.data);
            } catch (error) {
                console.error("error fetching order", error);
            }
        }
        fetchdata();
    }, [])
    const Confirmdelivery = async (IDorder) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/updateOrder/${IDorder}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: 3,
                }),

            });
            const data = await response.json();
            if (data.message) {
                Swal.fire({
                    icon: "success",
                    title: "Delete Successfull",
                    showConfirmButton: false,
                    timer: 1500
                });
                const response = await axios.get("http://127.0.0.1:8000/api/displayOrder");
                setorder(response.data);
            }
        } catch (error) {
            console.error('Error adding card:', error);
        }
    }
    const Confirmpickup = async (IDorder) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/updateOrder/${IDorder}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: 2,
                }),

            });
            const data = await response.json();
            if (data.message) {
                Swal.fire({
                    icon: "success",
                    title: "Delete Successfull",
                    showConfirmButton: false,
                    timer: 1500
                });
                const response = await axios.get("http://127.0.0.1:8000/api/displayOrder");
                setorder(response.data);
            }
        } catch (error) {
            console.error('Error adding card:', error);
        }
    }
    const Orderconfirmation = async (IDorder) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/updateOrder/${IDorder}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: 1,
                }),

            });
            const data = await response.json();
            if (data.message) {
                Swal.fire({
                    icon: "success",
                    title: "Delete Successfull",
                    showConfirmButton: false,
                    timer: 1500
                });
                const response = await axios.get("http://127.0.0.1:8000/api/displayOrder");
                setorder(response.data);
            }
        } catch (error) {
            console.error('Error adding card:', error);
        }

    }
    const indexOflastCategory = (currentPage + 1) * perPage;
    const indexOfFirtCategory = indexOflastCategory - perPage;
    const currentCategories = filteredCategories.slice(indexOfFirtCategory, indexOflastCategory)
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/displayOrder");
                setorder(response.data);
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
                            Order

                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                            <li><a href="#">Order</a></li>
                        </ol>
                    </section>
                    <section className="content">
                        <div className="row">

                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">list orders</h3>
                                </div>
                                <div className="flex items-center space-x-4 float-left flex-1 mb-2 ml-2">
                                    <label for="search" className="text-gray-600">Search</label>

                                    <input type="text" id="search" name="search" placeholder="Enter your search term" className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500" value={searchTerm} onChange={(e) => setSearchtem(e.target.value)} />

                                </div>
                                <div className="flex items-center space-x-4 float-right flex-1 mb-2 ml-2">
                                    <label for="search" className="text-gray-600">Search</label>
                                    <select name='Address' className="form-control" value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}>
                                        <option value="all">All</option>
                                        <option value="0">Pending Confirmation</option>
                                        <option value="1">Ready for Pickup</option>
                                        <option value="2">Out for Delivery</option>
                                        <option value="3">Delivered</option>
                                    </select>
                                </div>
                                <div className="box-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Code orders</th>
                                                <th>Status</th>
                                                <th>Confirmation</th>
                                                <th>View</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentCategories.map((order, index) => (
                                                <tr key={order.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{order.order_code}</td>
                                                    <td>{getStatusText(order.status)}</td>
                                                    <td>
                                                        {order.status === 0 && (
                                                            <button className='btn btn-primary' onClick={() => Orderconfirmation(order.ID)}>Order confirmation</button>
                                                        )}
                                                        {order.status === 1 && (
                                                            <button className='btn btn-primary' onClick={() => Confirmpickup(order.ID)}>Confirm pickup</button>
                                                        )}
                                                        {order.status === 2 && (
                                                            <button className='btn btn-primary' onClick={() => Confirmdelivery(order.ID)}>Confirm delivery</button>
                                                        )}
                                                        {order.status === 3 && (
                                                            <span>Finish</span>
                                                        )}
                                                    </td>
                                                    <td><button className='btn btn-primary' onClick={() => navigate('/DetailOrder', { state: { IDorder: order.ID } })}><i class="fa fa-eye " aria-hidden="true"></i></button></td>
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
export default Order;