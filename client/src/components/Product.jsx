import image from '../images/user2-160x160.jpg';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Pagination from 'react-paginate';
import 'react-paginate/theme/basic/react-paginate.css';
import '../components/admin.css'
function Product() {
    const fileInputRef = useRef(null);
    const [searchTerm, setSearchtem] = useState('');
    const [loading, setloading] = useState(false);
    
    const [currentPage, setCurrentPage] = useState(0);
    const [perPage, setperPage] = useState(5);
    const [Provider, setprviders] = useState([]);
    const [Product, setProduct] = useState([]);
    const [ProductDetails, setProductDetails] = useState([]);
    const [categories, setCategories] = useState([]);
    const [IsClosingPopup, setIsClosingPopup] = useState(false);
    const [Isclosedetail, setIscloseDetail] = useState(false);
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const [isDetail, setDetail] = useState(false);
    const location = useLocation();
    const colorOptions = [
        { name: 'Red', color: 'red' },
        { name: 'Green', color: 'green' },
        { name: 'Blue', color: 'blue' },
        { name: 'Yellow', color: 'yellow' },
        { name: 'Purple', color: 'purple' },
    ]
    const handlePageclick=(data)=>{
        setCurrentPage(data.selected);
      };
    const username = location.state?.username || 'Default Username';
    const ID=location.state?.ID||'';
    const popupContentStyle = {
        background: 'white',
        padding: '20px',
        maxWidth: '400px',
        textAlign: 'center',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        animation: 'flipleft 0.5s', // Default animation
    };
    const handleCloseDetail = () => {
        setIscloseDetail(true);
        setTimeout(() => {
            setFormData({

            })
            setDetail(false);
            setIscloseDetail(false);
        }, 500);

    }
    const handleClosepopup = () => {

        setIsClosingPopup(true);
        setTimeout(() => {
            setFormData({

                ID: '',
                UpdateProvider: '',

            })
            setPopupVisibility(false);
            setIsClosingPopup(false);
        }, 500);

    }
    const closingAnimation = {
        animation: 'flipright 0.5s',
    };
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/getProduct');
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching providers:', error);
            }
        };
        fetchProduct();
    }, [])
    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/getProvider');
                setprviders(response.data);
            } catch (error) {
                console.error('Error fetching providers:', error);
            }
        };
        fetchProviders();
    }, [])
    const [formData, setFormData] = useState({
        Image: [],
        NameProduct: '',
        content: '',
        Provider: '',
        Category: '',
        size: '',

        Extra: [],
        UpdateNameProduct: '',
        UpdateContent: '',
        UpdateProvider: '',
        UpdateCategory: '',
        UpdateSize: '',
        Color: '',
        ID: '',
        IDcategory:'',
    });
    const updatesubmit = async (e) => {
        e.preventDefault();
        try{
            if(formData.UpdateCategory==''||formData.UpdateProvider==''||formData.UpdateContent==''){
                Swal.fire({
                    icon: "error",
                    title: "Please Enter full Information Product",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }else{
                try {
                    const response = await axios.put(`http://127.0.0.1:8000/api/updateProduct/${formData.ID}`, {
                        UpdateCategory: formData.UpdateCategory,
                        UpdateNameProduct: formData.UpdateNameProduct,
                        UpdateContent: formData.UpdateContent,
                        UpdateProvider: formData.UpdateProvider,
        
                    });
                    if (response.data.message) {
                        Swal.fire({
                            icon: "success",
                            title: "update product successfully",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        setPopupVisibility(false);
                        const responseData = await axios.get('http://127.0.0.1:8000/api/getProduct');
                        setProduct(responseData.data);
                    }
                } catch (error) {
                    console.error('Update error:', error);
                }
            }
           
        }catch(error) {
            console.error('Update error:', error);
        }
      
        
    }
    const deletesubmit = async (idProduct) => {
        
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
                const response = await axios.put(`http://127.0.0.1:8000/api/deleteProduct/${idProduct}`);
                if (response.data.message) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deletion successful',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    const responseData = await axios.get('http://127.0.0.1:8000/api/getProduct');
                    setProduct(responseData.data);
                }
            } catch (error) {
                console.error('Error deleting picture:', error);
            }
        }
    }
    const handleDetail = async (Productid, NameProduct, size) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/getDetailProduct/${Productid}`);
            const selectedProduct = response.data;
            formData.UpdateNameProduct = NameProduct;
            formData.UpdateSize = size;
            // Now you can use the selectedProduct in your state or perform other actions
            setDetail(true);
            setProductDetails(selectedProduct);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };
    const handleEditClick = (Productid, color) => {
        const selectedProduct = Product.find(Product => Product.IDproduct == Productid)

        if (selectedProduct) {


            formData.ID = selectedProduct.IDproduct;
            formData.UpdateImage = selectedProduct.link;
            formData.UpdateNameProduct = selectedProduct.ProductName;
            formData.UpdateContent = selectedProduct.content;
            formData.UpdateProvider = selectedProduct.ID_provider;
            formData.UpdateCategory = selectedProduct.ID_category;
            formData.IDcategory=selectedProduct.ID_category;
        }


        setPopupVisibility(true);
    }

    const handleImageChange = async (e) => {
        const selectedImage = Array.from(e.target.files);


        try {




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

            setFormData({
                ...formData,
                Image: [],

            });

            document.getElementById('Main').value = '';

            // Clear selected image names on error


        }
    };
    const handleExtral = async (e) => {
        const selectedImage = Array.from(e.target.files);


        try {




            setFormData({
                ...formData,

                Extra: selectedImage
            });

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: error,
                showConfirmButton: true,
            });

            setFormData({
                ...formData,

                Extra: [],
            });

            document.getElementById('Extra').value = '';

            // Clear selected image names on error


        }
    };

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/getcategories');
                setCategories(response.data);
            } catch (error) {
                console.error('error fetchinh categories:', error)
            }
        }
        fetchdata();
    }, []);
    const navigate = useNavigate();
    const handleImageUpload = async (e) => {
        e.preventDefault();
        setloading(true);
        console.log(formData.Image)
        if (formData.Image.length > 1) {
            Swal.fire({
                icon: 'error',
                title: 'Main category can only have one image',
                showConfirmButton: true,
            });
            return;
        }

        try {
            const formDataApi = new FormData();



            formData.Image.forEach((image) => {
                formDataApi.append('Image[]', image); // Note the square brackets to handle multiple files
            });
            formData.Extra.forEach((image) => {
                formDataApi.append('Extra[]', image);
            })
            formDataApi.append('NameProduct', formData.NameProduct);
            formDataApi.append('content', formData.content);
            formDataApi.append('Provider', formData.Provider);
            formDataApi.append('Category', formData.Category);
            formDataApi.append('size', formData.size);
            formDataApi.append('Color', formData.Color);

            const response = await axios.post('http://127.0.0.1:8000/api/Addproduct', formDataApi);

            if (response.data.message) {
                setloading(false);
                Swal.fire({
                    icon: 'success',
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });

                setFormData({
                    NameProduct: '',
                    content: '',
                    Provider: '',
                    Color: '',
                    Category: '',
                    size: ''
                })
                const responseData = await axios.get('http://127.0.0.1:8000/api/getProduct');
                setProduct(responseData.data);
                document.getElementById('imageInput').value = '';
                document.getElementById('Extra').value = '';

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
    const filteredCategories = Product.filter(category =>
    
        category.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const indexOflastCategory=(currentPage+1)*perPage;
    const indexOfFirtCategory=indexOflastCategory-perPage;
    const currentCategories=filteredCategories.slice(indexOfFirtCategory,indexOflastCategory)

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
                                <a className='cursor-pointer' onClick={() => navigate('/category', { state: { username: username,ID:ID  } })}>
                                    <i className="fa fa-th"></i> <span>category</span>
                                </a>
                            </li>
                            <li className='active treeview text-white'>
                                <a className='cursor-pointer' onClick={() => navigate('/Picture', { state: { username: username,ID:ID  } })}>
                                    <i className="fa fa-th"></i> <span>Picture</span>
                                </a>
                            </li>
                            <li className='active treeview text-white'>
                                <a className='cursor-pointer' onClick={() => navigate('/Product', { state: { username: username,ID:ID  } })}>
                                    <i className="fa fa-th"></i> <span>Product</span>
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
                            <div className="box box-primary" >
                                <div className="box-header">
                                    <h3 className="box-title">Quick Example</h3>
                                </div>
                                <form role="form" onSubmit={handleImageUpload} >
                                    <div className="box-body">
                                        {/* Form fields go here */}
                                        <div className="form-group">
                                            <label >Main</label>
                                            <input type='file' name='Image' className="form-control" id="imageInput" placeholder="Enter Name Category" onChange={handleImageChange} multiple />


                                        </div>
                                        <div className="form-group">
                                            <label >Extral</label>
                                            <input type='file' name='Extra' className="form-control" id="Extra" placeholder="Enter Name Category" onChange={handleExtral} multiple />


                                        </div>
                                        <div className="form-group">
                                            <label >Name Product</label>
                                            <input name='NameProduct' className="form-control" value={formData.NameProduct} onChange={(e) => setFormData({ ...formData, NameProduct: e.target.value })} id="exampleInputEmail1" placeholder="Enter Name Product" />


                                        </div>
                                        <div className="form-group">
                                            <label >Content</label>
                                            <textarea name="Content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="form-control" id="exampleTextarea" placeholder="Enter Content"></textarea>


                                        </div>
                                        <div className="form-group">
                                            <label >Name Provider</label>
                                            <select value={formData.Provider} onChange={(e) => setFormData({ ...formData, Provider: e.target.value })} name="NameProvider" className="form-control" >
                                                <option value="">Select Name Providers</option>
                                                {Array.isArray(Provider) && Provider.map(provider => (
                                                    <option value={provider.ID}>{provider.Name}</option>
                                                ))}
                                            </select>

                                        </div>
                                        <div className="form-group">
                                            <label >color</label>
                                            <select name="Color" value={formData.Color} onChange={(e) => setFormData({ ...formData, Color: e.target.value })} className="form-control" >
                                                <option value="">Select color</option>
                                                {colorOptions.map((color) => (
                                                    <option key={color.name} value={color.name} className="color-option">
                                                        {color.name}
                                                    </option>
                                                ))}
                                            </select>

                                        </div>
                                        <div className="form-group">
                                            <label >Name category</label>
                                            <select value={formData.Category} onChange={(e) => setFormData({ ...formData, Category: e.target.value })} name="Category" className="form-control" >
                                                <option value="">Select Name Category</option>
                                                {Array.isArray(categories) && categories.map(category => (
                                                    <option value={category.ID}>{category.Name}</option>
                                                ))}
                                            </select>

                                        </div>
                                        <div className="form-group">
                                            <label >Size</label>
                                            <input type='number' name='size' value={formData.size} onChange={(e) => setFormData({ ...formData, size: e.target.value })} className="form-control" id="exampleInputEmail1" placeholder="Enter Name Product" />

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
                                    <input type="text" id="search" name="search" placeholder="Enter your search term" value={searchTerm} onChange={(e)=>setSearchtem(e.target.value)} className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500"/>

                                </div>

                                <div className="box-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Product</th>

                                                <th>Provider</th>
                                                <th>Category</th>

                                                <th>Update</th>
                                                <th>Delete</th>
                                                <th>Detail</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentCategories.map((Product, index) => (
                                                <tr key={Product.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{Product.ProductName}</td>

                                                    <td>{Product.ProviderName}</td>
                                                    <td>{Product.NameCategory}</td>
                                                    <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditClick(Product.IDproduct, Product.Color)}>Edit</button></td>
                                                    <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deletesubmit(Product.IDproduct)}>Remove</button></td>
                                                    <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " onClick={() => handleDetail(Product.IDproduct, Product.ProductName, Product.size)}  >Detail</button></td>
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
            {isPopupVisible && (
                <div className="popup-container">

                    <div className="popup-content" style={IsClosingPopup ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                        <div className='flex justify-end'>
                            <button onClick={handleClosepopup} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                        </div>

                        <div >

                            <h3 className="box-title">Edit Product</h3>
                        </div>
                        <form role="form" onSubmit={updatesubmit}>
                            <div className="box-body">
                                {/* Form fields go here */}
                                <div className="form-group">
                                    <label className='float-left'>Name Product</label>
                                    <input name='UpdateNameProduct' defaultValue={formData.UpdateNameProduct} value={formData.UpdateNameProduct} onChange={(e) => setFormData({ ...formData, UpdateNameProduct: e.target.value })} className="form-control" id='Main' />

                                </div>
                                <div className="form-group">
                                    <label className='float-left'>Content</label>
                                    <textarea name="UpdateContent" value={formData.UpdateContent} defaultValue={formData.UpdateContent} onChange={(e) => setFormData({ ...formData, UpdateContent: e.target.value })} className="form-control" id="Extral" placeholder="Enter Content"></textarea>

                                </div>
                                <div className="form-group">
                                    <label className='float-left'>Name Provider</label>
                                    <select
                                        name="UpdateProvider"
                                        className="form-control"
                                        value={formData.UpdateProvider}
                                        defaultValue={formData.UpdateProvider}
                                        onChange={(e) => setFormData({ ...formData, UpdateProvider: e.target.value })}
                                    >
                                        {/* Map through the Provider array */}
                                    <option value="">Select providers</option>
                                        {Provider.map((Provider) => (
    <option key={Provider.ID} value={Provider.ID}>
      {Provider.Name}
    </option>
  ))}
                                    </select>

                                </div>
                                <div className="form-group">
                                    <label className="float-left">Name Categories</label>
                                    <select
  name="UpdateCategory"
  className="form-control"
  value={formData.UpdateCategory}
  onChange={(e) => setFormData({ ...formData, UpdateCategory: e.target.value })}
>
  {/* Map through the categories */}
  {categories.map((category) => (
    <option key={category.ID} value={category.ID}>
      {category.Name}
    </option>
  ))}
</select>

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
            {isDetail && (
                <div className="popup-container">
                    <div className="popup-content" style={Isclosedetail ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                        <div className='flex justify-end'>
                            <button onClick={handleCloseDetail} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right ">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div>
                            <h3 className="box-title">Product Details</h3>
                        </div>
                        <div className="box-body">
                            <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
                                <label className='float-left' style={{ marginRight: '10px' }}>Name:</label>
                                <div>{formData.UpdateNameProduct}</div>
                            </div>
                            <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>

                                <label className='float-left' >Picture</label>
                                {ProductDetails.map((Product, index) => (
                                    <div><img src={`http://127.0.0.1:8000/${Product.link}`} width="100" height="100" style={{ objectFit: 'cover' }} alt="" /></div>
                                ))}

                            </div>
                            <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
                                <label className='float-left' style={{ marginRight: '10px' }}>Size:</label>
                                <div>{formData.UpdateSize}</div>
                            </div>
                            <div className="form-group" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f0f0f0', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                                <label className='float-left'>Color:</label>
                                {[...new Set(ProductDetails.map((product) => product.Color))].map((color, index) => (
                                    <div key={index} style={{ backgroundColor: color, padding: '14px', margin: '0 5px', borderRadius: '28px' }}>

                                    </div>
                                ))}
                            </div>

                            {/* Add more details as needed */}
                        </div>
                        <div className="box-footer">
                            {/* You can add additional buttons or actions here */}
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}
export default Product;