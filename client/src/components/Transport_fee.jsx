import image from '../images/user2-160x160.jpg';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import Select from 'react-select';
import { useLocation } from 'react-router-dom';
import Pagination from 'react-paginate';
import 'react-paginate/theme/basic/react-paginate.css';
import '../components/admin.css'
function Transport_fee() {

    const [searchTerm, setSearchtem] = useState('');
    const [loading, setloading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [perPage, setperPage] = useState(5);
    const [Picture, setPicture] = useState([]);
    const location = useLocation();
    const username = location.state?.username || 'Default Username';
    const ID = location.state?.ID || '';
    const navigate = useNavigate();
    const [selectedWard, setSelectedWard] = useState(null);
    const [ward, setward] = useState([]);
    const [city, setCity] = useState([]);

   
    const [selectedCity, setSelectedCity] = useState(null);
    const [Districts, setDistricts] = useState([]);
    const [selecteddistrict, setselecteddistrict] = useState(null);
    const [delivery, setdelivery] = useState([]);
    const handleWard = (selectedward) => {
        setSelectedWard(selectedward)
    }
    const [editingOrderIndex, setEditingOrderIndex] = useState(null);
    const [formData, setFormData] = useState({
        Price: '',
        updatePrice: ''
    });
    const [Categories, setCategories] = useState([]);
    const handlePriceChange = (index, value) => {
        const updatedCategories = [...Categories];
        updatedCategories[index] = {
            ...updatedCategories[index],
            Price: value,
        };
        setCategories(updatedCategories);
    
        // Assuming you want to update order.Price as well
        const updatedDelivery = [...delivery];
        updatedDelivery[index] = {
            ...updatedDelivery[index],
            Price: value,
        };
       setdelivery(updatedDelivery);
    };
    const handlePriceInputChange = (index, value) => {
        const updatedCategories = [...Categories];
        updatedCategories[index] = {
            ...updatedCategories[index],
            Price: value,
        };
        setCategories(updatedCategories);
    };
    const [isEditing, setIsEditing] = useState(false);
    const handleUpdatePrice = async (orderID, updatedPrice) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/updatedelivery/${orderID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPrice),
            });
    
            if (response.ok) {
                console.log('Delivery charge updated successfully');
              
            }
    
            
    
           
            // Perform any additional actions you need
        } catch (error) {
            console.error('Error updating delivery charge', error);
        }
    };
    useEffect(() => {
        const fetchdelivery = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/displaydelivery');
                setdelivery(response.data);
              

           
            } catch (error) {
                console.error('Error fetching districts', error);
            }
        }
        fetchdelivery()
    }, [])
 
    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/displaywardCity');
                setCity(response.data);
            } catch (error) {
                console.error('Error fetching districts', error);
            }
        };

        fetchDistricts();
    }, []);


    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/displaydistrict`);
                const filteredDistricts = response.data.filter(district => district.id_city === selectedCity.value);
                setDistricts(filteredDistricts);

            } catch (error) {
                console.error('Error fetching districts', error);
            }
        };

        if (selectedCity) {
            fetchDistricts();
        }
    }, [selectedCity]);
    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/displayward`);
                const filteredDistricts = response.data.filter(district => district.ID_district === selecteddistrict.value);
                setward(filteredDistricts);

            } catch (error) {
                console.error('Error fetching districts', error);
            }
        };

        if (selecteddistrict) {
            fetchDistricts();
        }
    }, [selecteddistrict]);
    const handleCityChange = (selectedCity) => {
        // Update selected city when it changes
        setSelectedCity(selectedCity);
    };
    const handledistrictChange = (selectedCity) => {
        setselecteddistrict(selectedCity)
    }
    const addSubmit = async (e) => {
        e.preventDefault();
        if(formData.Price=='' || selecteddistrict===null || selectedWard===null || selectedCity===null){
            Swal.fire({
                icon: "error",
                title: "City and warrd and district and price required",
                showConfirmButton: false,
                timer: 1500
            });
        }else{
            try {
                const response = await fetch('http://127.0.0.1:8000/api/Adddelivery_charges', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        Price: formData.Price,
                        ID_district: selecteddistrict.value,
                        ID_Ward: selectedWard.value,
                        id_city: selectedCity.value,
                    }),
                });
                const responseData = await response.json();
                if (response.ok) {
                    Swal.fire({
                        icon: "success",
                        title: "Add category successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setselecteddistrict(null);
                    setSelectedWard(null);
                    setSelectedCity(null);
                    formData.Price = '';
                    const response = await axios.get('http://127.0.0.1:8000/api/displaydelivery');
                    setdelivery(response.data);
                }
            } catch (error) {
                console.error('error:', error);
            }
        }
       

    }
    const filteredCategories = delivery.filter(category =>
        category.Namecity.toLowerCase().includes(searchTerm.toLowerCase())

    );
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
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
                                <a className='cursor-pointer' onClick={() => navigate('/admin', { state: { username: username, ID: ID } })}>
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
                            Order

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
                                <form role="form" onSubmit={addSubmit}>
                                    <div className="box-body">
                                        {/* Form fields go here */}

                                        <div className="form-group">
                                            <label >city</label>
                                            <Select
                                                options={city.map(d => ({ value: d.ID, label: d.Name }))}
                                                onChange={(selectedOption) => handleCityChange(selectedOption)}
                                                value={selectedCity}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>District</label>
                                            <Select
                                                options={Districts.map(d => ({ value: d.ID, label: d.Name }))}
                                                onChange={(selectedOption) => handledistrictChange(selectedOption)}
                                                value={selecteddistrict}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Ward</label>
                                            <Select
                                                options={ward.map(d => ({ value: d.ID, label: d.Name }))}
                                                onChange={(selectedOption) => handleWard(selectedOption)}
                                                value={selectedWard}
                                            />
                                        </div>


                                        <div className="form-group">
                                            <label >Delivery charges</label>
                                            <input type='number' name='Price' value={formData.Price} onChange={(e) => setFormData({ ...formData, Price: e.target.value })} className="form-control" id="exampleInputEmail1" placeholder="Enter Delivery charges" />

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
                                    <h3 className="box-title">list orders</h3>
                                </div>
                                <div className="flex items-center space-x-4 float-left flex-1 mb-2 ml-2">
                                    <label for="search" className="text-gray-600">Search</label>
                                    <select
                                        name="status"
                                        className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500 w-[100%]"
                                        value={searchTerm}
                                        onChange={(e) => setSearchtem(e.target.value)}
                                    >
                                        <option value="">Select City</option>
                                        {city.map((d, index) => (
                                            <option key={index} value={d.Name}>
                                                {d.Name}
                                            </option>
                                        ))}
                                    </select>



                                </div>

                                <div className="box-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>

                                                <th>City</th>
                                                <th>District</th>
                                                <th>Ward</th>
                                                <th>shipping fee</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentCategories.map((order, index) => (
                                                <tr key={index}>
                                                    <td>{order.Namecity}</td>
                                                    <td>{order.Namedistrict}</td>
                                                    <td>{order.NameWard}</td>
                                                    <td>
                        {editingOrderIndex === index ? (
                            <input
                                type="number"
                                value={order.Price}
                                className='form-control'
                                onChange={(e) => handlePriceChange(index, e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleUpdatePrice(order.ID, { Update_Price: order.Price });
                                        setEditingOrderIndex(null); // Switch back to label mode
                                    }
                                }}
                                onBlur={() => {
                                    handleUpdatePrice(order.ID, { Update_Price: order.Price });
                                    setEditingOrderIndex(null); // Switch back to label mode
                                }}
                            />
                        ) : (
                            <label onClick={() => setEditingOrderIndex(index)}>
                                {order.Price}
                            </label>
                        )}
                    </td>
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
export default Transport_fee;