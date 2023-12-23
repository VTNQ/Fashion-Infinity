import image from '../images/user2-160x160.jpg';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Pagination from 'react-paginate';
import 'react-paginate/theme/basic/react-paginate.css';
import '../components/admin.css'


function EditProfile() {

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'Avatar' ? files[0] : value,
        }))
    }
    const location = useLocation();
    const username = location.state?.username || 'Default Username';
    const ID = location.state?.ID || '';
    const navigate = useNavigate();
    const [Acc, setAcc] = useState([]);
    const Default = 'http://127.0.0.1:8000/images/Default.jpg';
    const [selectedImage, setSelectedImage] = useState(null);
    const [formData, setFormData] = useState({
        Username: '',
        Email: '',
        Avatar: null
    })
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setFormData((prevData) => ({
                ...prevData,
                Avatar: file,
            }))
        }
    };
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        if(formData.Username===''||formData.Avatar==null||formData.Email===''){
            Swal.fire({
                icon: "error",
                title: "Username and Email And Avator is required",
                showConfirmButton: false,
                timer: 1500,
            });
        }else{
            const formDataApi = new FormData();
        formDataApi.append('Username', formData.Username); // Corrected from 'UserName'
        formDataApi.append('Email', formData.Email);
        formDataApi.append('Avatar', formData.Avatar);
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/Updateprofile/${ID}`, formDataApi, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
           
        
            if (response.data.message) {
                Swal.fire({
                    icon: "success",
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
                const updatedResponse = await axios.get(`http://127.0.0.1:8000/api/ProfileInformation/${ID}`);
            setAcc(updatedResponse.data);

            const updatedUsername = formData.Username;

            // Update the 'username' in the location state
            navigate(`/Edit`, { state: { username: updatedUsername, ID } });
            document.getElementById('imageInput').value = '';
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Username is exists",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            // Handle success
        } catch (error) {
            // Handle error
            Swal.fire({
                icon: "error",
                title: "Username is exists",
                showConfirmButton: false,
                timer: 1500,
            });
        }
        }
        
    }
    useEffect(() => {
        const fetchdata = async () => {

            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/ProfileInformation/${ID}`);
                setAcc(response.data);
                setFormData((prevData) => ({
                    ...prevData,
                    Username: response.data.user?.Username || '',
                    Email: response.data.user?.Email || '',
                }));

            } catch (error) {
                // Handle errors, log them, or show an error message
                console.error('Error fetching data:', error.message);
            }
        };

        // Call the fetchdata function
        fetchdata();
    }, [ID]);

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
                                <a className='cursor-pointer' onClick={() => navigate('/admin', { state: { username: username,ID:ID  } })}>
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
                                <a className='cursor-pointer' onClick={() => navigate('/category', { state: { username: username,ID:ID  } })}>
                                    <i className="fa fa-th"></i> <span>category</span>
                                </a>
                            </li>
                            <li className='active treeview text-white'>
                                <a className='cursor-pointer' onClick={() => navigate('/Picture', { state: { username: username,ID:ID  } })}>
                                    <i className="fa fa-th"></i> <span>Picture</span>
                                </a>
                            </li>
                            <li className="treeview text-white">
                                <a className='cursor-pointer' onClick={() => navigate('/Provider', { state: { username: username,ID:ID  } })}>
                                    <i className="fa fa-th"></i> <span>Provider</span>
                                </a>
                            </li>
                            <li className="treeview text-white">
                                <a className='cursor-pointer' onClick={() => navigate('/Edit', { state: { username: username,ID:ID  } })}>
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
                         


                                <div className="profile-container">

                                    <div className="profile-header">
                                        {selectedImage ? (
                                            <img
                                                src={selectedImage}
                                                alt="Selected Avatar"
                                                className="profile-avatar"
                                            />
                                        ) : (
                                            <img
                                                src={`http://127.0.0.1:8000/${Acc.user?.Avatar}` || Default}
                                                alt="Avatar"
                                                className="profile-avatar"
                                            />
                                        )}

                                        <h2 className="profile-username"></h2>
                                    </div>
                                    <form role='form' onSubmit={handleUpdateSubmit}>
                                    <div className="profile-details">
                                        <div className="profile-section">
                                            <label >Name Product</label>
                                            <input name='Username' className="form-control" value={formData.Username} onChange={handleInputChange} />

                                        </div>
                                        <div className="profile-section">
                                            <label >Name Product</label>
                                            <input name="Email" className="form-control" value={formData.Email} onChange={handleInputChange} />

                                        </div>
                                        <div className="profile-section">
                                            <label >Avatar</label>
                                            <input type='file' name="Avatar" id='imageInput' className="form-control" accept="image/*"
                                                onChange={handleImageChange} />

                                        </div>
                                        <div className="profile-section">
                                            <button type="submit" className="btn btn-primary">
                                                Submit
                                            </button>
                                        </div>

                                    </div>
                                    </form>
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
export default EditProfile;