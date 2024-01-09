import image from '../images/user2-160x160.jpg';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Pagination from 'react-paginate';
import 'react-paginate/theme/basic/react-paginate.css';
import './admin/admin.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { start } from '@popperjs/core';
function Event() {
    const location = useLocation();
    const username = location.state?.username || 'Default Username';
    const ID = location.state?.ID || '';
    const [perPage, setperPage] = useState(5);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const currentDate = new Date();
    const [loading, setloading] = useState(true);
    const [startDate, setStartDate] = useState(currentDate);
    const [updatestartDate, setupdatestartDate] = useState(null);
    const [updateEndDate, setupdateEndDate] = useState(null);
    const [EndDate, setEndDate] = useState(null);
    const [formData, setFormData] = useState({
        Description: '',
        Name: '',
        updateDescription: '',
        updateName: '',
        ID: '',
        image: null,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.Name === "" || formData.Description === "" || startDate == null || EndDate == null || formData.image == null) {
            Swal.fire({
                icon: 'error',
                title: 'Please enter complete information',
                showConfirmButton: false,
                timer: 1500,
            });
        } else {

            const formattedStartDate = format(startDate, 'yyyy-MM-dd');
            const formattedEndDate = format(EndDate, 'yyyy-MM-dd');
            const formDataApi = new FormData();
            formDataApi.append('Name', formData.Name);
            formDataApi.append('Description', formData.Description);
            formDataApi.append('StartDate', formattedStartDate);
            formDataApi.append('EndDate', formattedEndDate);
            formDataApi.append('image', formData.image);

            try {
                const response = await fetch('http://127.0.0.1:8000/api/AddEvent', {
                    method: 'POST',
                    body: formDataApi,
                });
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Add successful',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    formData.Name = '';
                    formData.Description = '';
                    setStartDate(null);
                    setEndDate(null);
                    formData.image = null;
                    document.getElementById('imageInput').value = '';
                    const responsedata = await axios.get("http://127.0.0.1:8000/api/getEvent");
                    setEvent(responsedata.data);
                }

                // Xử lý response
            } catch (error) {
                console.error('Add error:' + error);
            }
        }

    };
    const handleImageChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            image: e.target.files[0],
        }));
    };
    const [searchTerm, setSearchtem] = useState('');
    const [Event, setEvent] = useState([]);
    const [IsClosingPopup, setIsClosingPopup] = useState(false);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/getEvent");
                setEvent(response.data);
            } catch (error) {
                console.error("error fetching order", error);
            }
        }
        fetchdata();
    }, [])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/getEvent");
                setEvent(response.data);
            } catch (error) {
                console.error('Error during fetch:', error);
            } finally {
                setloading(false);
            }
        }
        fetchdata();
    }, [])
    const popupContentStyle = {
        background: 'white',
        padding: '20px',
        maxWidth: '400px',
        textAlign: 'center',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        animation: 'flipleft 0.5s', // Default animation
    };
    const handleEditClick = (Productid) => {
        const selectedProduct = Event.find(Product => Product.ID == Productid)

        if (selectedProduct) {
            formData.ID = Productid;
            formData.updateDescription = selectedProduct.Description;
            formData.updateName = selectedProduct.Title;

        }


        setPopupVisibility(true);
    }
    const closingAnimation = {
        animation: 'flipright 0.5s',
    };

    const [isPopupVisible, setPopupVisibility] = useState(false);

    // Step 2: Function to handle "Edit" button click and show popup
    const handleClosepopup = () => {

        setIsClosingPopup(true);
        setTimeout(() => {
            setFormData({
                UpdateNameCategory: '',
                ID: '',
            })
            setPopupVisibility(false);
            setIsClosingPopup(false);
        }, 500);

    }
    const filteredCategories = Event.filter(category =>

        category.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    const DeleteSubmit = async (idEvent) => {
        const confirmation = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });
        if (confirmation.isConfirmed) {
            const response = await axios.put(`http://127.0.0.1:8000/api/DeleteEvent/${idEvent}`, {

            });
            if (response.data.message) {
                Swal.fire({
                    icon: 'success',
                    title: 'Deletion successful',
                    showConfirmButton: false,
                    timer: 1500,
                });
                const response = await axios.get("http://127.0.0.1:8000/api/getEvent");
                setEvent(response.data);
            }
        }
    }
    const handleStartDateChange = (date) => {
        const newStartDate = date >= currentDate ? date : currentDate;
        setStartDate(newStartDate);

        // Ensure EndDate is not before the selected startDate
        if (EndDate && newStartDate > EndDate) {
            setEndDate(newStartDate);
        }
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        // Ensure startDate is not after the selected endDate
        if (startDate && date < startDate) {
            setStartDate(date);
        }
    };
    const updateSubmit = async (e) => {
        e.preventDefault();

        if (formData.updateDescription === '' || formData.updateName === '') {
            Swal.fire({
                icon: "error",
                title: "Description and Title  is required",
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            try {

                const response = await fetch(`http://127.0.0.1:8000/api/UpdateEvent/${formData.ID}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        UpdateName: formData.updateName,
                        updateDescription: formData.updateDescription,

                    }),
                });
                const responseData = await response.json();
                if (response.ok) {
                    Swal.fire({
                        icon: "success",
                        title: responseData.message,
                        showConfirmButton: false,
                        timer: 1500
                    });

                    const response = await axios.get("http://127.0.0.1:8000/api/getEvent");
                    setEvent(response.data);
                } else {
                    if (responseData.errorEvent) {

                        Swal.fire({
                            icon: "error",
                            title: responseData.errorEvent,
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



    const indexOflastCategory = (currentPage + 1) * perPage;
    const indexOfFirtCategory = indexOflastCategory - perPage;
    const currentCategories = filteredCategories.slice(indexOfFirtCategory, indexOflastCategory)
    return (
        <div>
            {loading && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
                </div>
            )}
            <div className="wrapper">

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
                            Event

                        </h1>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                            <li><a href="#">Event</a></li>
                        </ol>
                    </section>
                    <section className="content">
                        <div className="row">
                            <div className="box box-primary" style={{ maxHeight: '543px' }}>
                                <div className="box-header">
                                    <h3 className="box-title">Quick Example</h3>
                                </div>
                                <form role="form" onSubmit={handleSubmit}>
                                    <div className="box-body">
                                        {/* Form fields go here */}
                                        <div className="form-group">
                                            <label >Title</label>
                                            <input name='Name' className="form-control" id="exampleInputEmail1" value={formData.Name} onChange={(e) => setFormData({ ...formData, Name: e.target.value })} placeholder="Enter Name Category" />

                                        </div>
                                        <div className="form-group" style={{ marginTop: '20px' }}>
                                            <label >Start Date</label>
                                            <DatePicker
                                                selected={startDate}
                                                onChange={handleStartDateChange}
                                                className="form-control"
                                                placeholderText="Select Start Date"
                                                maxDate={EndDate} // Cannot select a date after endDate
                                            />

                                        </div>
                                        <div className="form-group" style={{ marginTop: '20px' }}>
                                            <label >End Date</label>
                                            <DatePicker
                                                selected={EndDate}
                                                onChange={handleEndDateChange}
                                                className="form-control"
                                                placeholderText="Select End Date"
                                                minDate={startDate} // Cannot select a date before startDate
                                            />

                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="">Banner Event</label>
                                            <input type='file' name="image" className="form-control" id="imageInput" onChange={handleImageChange} />

                                        </div>
                                        <div className="form-group">
                                            <label >Description</label>
                                            <textarea name="Description" value={formData.Description} onChange={(e) => setFormData({ ...formData, Description: e.target.value })} className="form-control" id="exampleTextarea" placeholder="Enter Content"></textarea>


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
                                    <h3 className="box-title">List Event</h3>
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
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Banner</th>
                                                <th>Update</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentCategories.map((category, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{category.Title}</td>
                                                    <td>{category.Description}</td>
                                                    <td>{new Date(category.StartDate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                                                    <td>{new Date(category.EndDate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                                                    <td><img src={`http://127.0.0.1:8000/${category.BannerUrl}`} width="100" height="100" style={{ objectFit: 'cover' }} alt="" /></td>
                                                    <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditClick(category.ID)}>Edit</button></td>
                                                    <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => DeleteSubmit(category.ID)}>Remove</button></td>
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

                        <div className="popup-content" style={IsClosingPopup ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                            <div className='flex justify-end'>
                                <button onClick={handleClosepopup} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                            </div>

                            <div >

                                <h3 className="box-title">Edit Product</h3>
                            </div>
                            <form role="form" onSubmit={updateSubmit}>
                                <div className="box-body">
                                    {/* Form fields go here */}
                                    <div className="form-group">
                                        <label >Title</label>
                                        <input name='Name' className="form-control" id="exampleInputEmail1" value={formData.updateName} onChange={(e) => setFormData({ ...formData, updateName: e.target.value })} placeholder="Enter Name Category" />

                                    </div>

                                    <div className="form-group">
                                        <label >Description</label>
                                        <textarea name="Description" value={formData.updateDescription} onChange={(e) => setFormData({ ...formData, updateDescription: e.target.value })} className="form-control" id="exampleTextarea" placeholder="Enter Content"></textarea>


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
export default Event;