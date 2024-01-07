import image from '../images/user2-160x160.jpg';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Pagination from 'react-paginate';
import 'react-paginate/theme/basic/react-paginate.css';
import '../components/admin.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
function Event() {
    const location = useLocation();
    const username = location.state?.username || 'Default Username';
    const ID = location.state?.ID || '';
    const [perPage, setperPage] = useState(5);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [EndDate, setEndDate] = useState(null);
    const [formData, setFormData] = useState({
        Description: '',
        Name: '',
    });
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(EndDate, 'yyyy-MM-dd');
        if (formData.Description === '' || formData.Name == '' || startDate == null || EndDate == null) {
            Swal.fire({
                icon: "error",
                title: "Description and Title And start Date And End Date is required",
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/AddEvent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        Name: formData.Name,
                        Description: formData.Description,
                        StartDate: formattedStartDate,
                        EndDate: formattedEndDate
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
                    formData.Description = '';
                    formData.Name = '';
                    setStartDate(null);
                    setEndDate(null);
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
                            <a className='cursor-pointer' onClick={() => navigate('/admin', { state: { username: username, ID: ID } })}>
                                <i className="fa fa-dashboard"></i> <span>Dashboard</span>
                            </a>

                        </li>
                        <li className="treeview">


                        </li>
                        <li className="active treeview text-white">
                            <a className='cursor-pointer' onClick={() => navigate('/category', { state: { username: username, ID: ID } })}>
                                <i className="fa fa-th"></i> <span>category</span>
                            </a>
                        </li>
                        <li className='active treeview text-white'>
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
                        Event

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
                                        <label >Title</label>
                                        <input name='Name' className="form-control" id="exampleInputEmail1" value={formData.Name} onChange={(e) => setFormData({ ...formData, Name: e.target.value })} placeholder="Enter Name Category" />

                                    </div>
                                    <div className="form-group" style={{ marginTop: '20px' }}>
                                        <label >Start Date</label>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            className="form-control"
                                            placeholderText="Select Start Date"
                                        />

                                    </div>
                                    <div className="form-group" style={{ marginTop: '20px' }}>
                                        <label >End Date</label>
                                        <DatePicker
                                            selected={EndDate}
                                            onChange={(date) => setEndDate(date)}
                                            className="form-control"
                                            placeholderText="Select End Date"
                                        />

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
                                <h3 className="box-title">Data Table With Full Features</h3>
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
                                                <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Edit</button></td>
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

        </div>

    )
}
export default Event;