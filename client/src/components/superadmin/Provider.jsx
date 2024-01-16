import image from '../../images/user2-160x160.jpg';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Pagination from 'react-paginate';
import 'react-paginate/theme/basic/react-paginate.css';
// import '../components/admin.css'
import '../admin/admin.css';

function ProviderSuperadmin() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchtem] = useState('');
    const [searchCountry, setsearchCountry] = useState('');
    const [perPage, setperPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [Provider, setprovider] = useState([]);
    const [errors, setErrors] = useState({});
    const username = location.state?.username || 'Default Username';
    const ID=location.state?.ID||'';
    const [SelectedCountry, setSelectedCountry] = useState('');
    const [IsClosingPopup, setIsClosingPopup] = useState(false);
    const [isPopupVisible, setPopupVisibility] = useState(false);
   
 
    const validateInput = (fieldname, value) => {
        const newErors = { ...errors };
        if (fieldname === 'NameOrigin') {
            newErors[fieldname] = value.trim() === '' ? 'Name Provider is required' : '';
        } else if (fieldname === 'UpdateNameOrigin') {
            newErors[fieldname] = value.trim() === '' ? 'Name Provider is required' : '';
        }
        setErrors(newErors);
    }
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
    const handleClosepopup = () => {

        setIsClosingPopup(true);
        setTimeout(() => {
            setFormData({
                UpdateNameOrigin: '',
                ID: '',
                UpdateNameAddress: '',
            })
            setPopupVisibility(false);
            setIsClosingPopup(false);
        }, 500);

    }
    const handleEditClick = (categoryId) => {
        const selectedCategory = Provider.find(category => category.ID == categoryId)
        if (selectedCategory) {
            setFormData({
                UpdateNameOrigin: selectedCategory.Name,
                ID: selectedCategory.ID,
                UpdateNameAddress: selectedCategory.Address,
            })
        }
        // Here you can perform any logic before showing the popup
        setPopupVisibility(true);
    }
    const [formData, setFormData] = useState({
        NameOrigin: '',
        Address: '',
        UpdateNameOrigin: '',
        UpdateNameAddress: '',
        ID: '',
    });
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    const filteredCategories = Provider.filter(Provider =>

        Provider.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (searchCountry === '' || Provider.Address.toLowerCase().includes(searchCountry.toLowerCase()))
    );
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/getprovider');
                setprovider(response.data);
            } catch (error) {
                console.error('error fetchinh Origin:', error)
            }
        }
        fetchdata();
    }, []);
    const deleteSubmit = async (idProvider) => {
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
            const response = await axios.put(`http://127.0.0.1:8000/api/deleteProvider/${idProvider}`, {

            });
            if (response.data.message) {
                Swal.fire({
                    icon: 'success',
                    title: 'Deletion successful',
                    showConfirmButton: false,
                    timer: 1500,
                });
                const response = await axios.get('http://127.0.0.1:8000/api/getprovider');
                setprovider(response.data);
            }
        }
    }
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.NameOrigin === '' || formData.Address === '') {
            Swal.fire({
                icon: "error",
                title: "Name origin or Address is required",
                showConfirmButton: false,
                timer: 1500
            });
            setFormData({
                NameOrigin: '',
                Address: ''
            });
        } else {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/AddProvider', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const responseData = await response.json();
                if (response.ok) {
                    Swal.fire({
                        icon: "success",
                        title: responseData.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    const response = await axios.get('http://127.0.0.1:8000/api/getprovider');
                    setprovider(response.data);
                    setFormData({
                        NameOrigin: '',
                        Address: ''
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: responseData.errorcategory,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setFormData({
                        NameOrigin: '',
                        Address: ''
                    });
                }
            } catch (error) {
                console.error('Add error:' + error);
            }
        }

    }
    const countries = ["United States",
        "China",
        "India",
        "Brazil",
        "Russia",
        "United Kingdom",
        "France",
        "Germany",
        "Japan",
        "South Korea",
        "Australia",
        "Canada",
        "Mexico",
        "South Africa",
        "Saudi Arabia",
        "United Arab Emirates",
        "Turkey",
        "Indonesia",
        "Singapore",
        "Malaysia"];
    const handleSelectChange = (e) => {
        setSelectedCountry(e.target.value);
    }
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        if (formData.UpdateNameOrigin == '' || formData.UpdateNameAddress == '') {
            Swal.fire({
                icon: "error",
                title: "Name Address or Name Provider is required",
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            try {
                const response = await axios.put(`http://127.0.0.1:8000/api/UpdateProvider/${formData.ID}`, {
                    UpdateNameAddress: formData.UpdateNameAddress,
                    UpdateNameOrigin: formData.UpdateNameOrigin
                });
                if (response.data.exists) {
                    Swal.fire({
                        icon: "error",
                        title: "Category is exists",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else if (response.data.message) {
                    Swal.fire({
                        icon: "success",
                        title: "update category successfully",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setPopupVisibility(false);
                    const response = await axios.get('http://127.0.0.1:8000/api/getprovider');
                    setprovider(response.data);
                }
            } catch (error) {
                console.error('Error message:', error.message);
            }
        }
    }
    const indexOflastCategory = (currentPage + 1) * perPage;
    const indexOfFirtCategory = indexOflastCategory - perPage;
    const currentCategories = filteredCategories.slice(indexOfFirtCategory, indexOflastCategory)

    const [totalProvider,setTotalProvider] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/api/getprovider');
            setTotalProvider(response.data.length);
          } catch (error) {
            console.error("error fetching data", error);
          }
        };
        fetchData();
      }, []);


    return (
        <div className="wrapper">

            


            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Provider

                    </h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                        <li><a href="#">Provider</a></li>
                    </ol>
                </section>

                <section class="content">
          
          <div class="row">
            <div class="col-lg-3 col-xs-6">
              
              <div class="small-box bg-aqua">
                <div class="inner">
                  <h3>{totalProvider}</h3>
                  <p>Total Provider</p>
                </div>
                <div class="icon">
                  <i class="ion ion-bag"></i>
                </div>
                <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
              </div>
            </div>
            
          </div>
          

        </section>

                <section className="content">
                    <div className="row">
                        



                        <div className="box">
                            <div className="box-header">
                                <h3 className="box-title">Data Table With Full Features</h3>
                            </div>
                            <div className="flex items-center space-x-4 float-left flex-1 mb-2 ml-2">
                                <label for="search" className="text-gray-600">Search</label>
                                <input type="text" id="search" name="search" value={searchTerm} onChange={(e) => setSearchtem(e.target.value)} placeholder="Enter your search term" className="border border-gray-300 px-3 py-1 rounded-md focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="flex items-center space-x-4 float-right flex-1 mb-2 ml-2">
                                <label for="search" className="text-gray-600">Search</label>
                                <select name='Address' className="form-control" value={searchCountry} onChange={(e) => setsearchCountry(e.target.value)} >
                                    <option value="">Select Country</option>
                                    {countries.map((coutry, index) => (
                                        <option key={index} value={coutry}>
                                            {coutry}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="box-body">
                                <table id="example1" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Address</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {currentCategories.map((origin, index) => (
                                            <tr key={origin.ID}>
                                                <td>{index + 1}</td>
                                                <td>{origin.Name}</td>
                                                <td>{origin.Address}</td>
                                                
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

            
            {isPopupVisible && (
                <div className="popup-container">

                    <div className="popup-content" style={IsClosingPopup ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                        <div className='flex justify-end'>
                            <button onClick={handleClosepopup} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                        </div>

                        <div >

                            <h3 className="box-title">Edit Provider</h3>
                        </div>
                        <form role="form" onSubmit={handleUpdateSubmit}>
                            <div className="box-body">
                                {/* Form fields go here */}
                                <div className="form-group">
                                    <label className='float-left'>Name Provider</label>
                                    <input name='UpdateNameOrigin' className="form-control" id="exampleInputEmail1" placeholder="Enter Name Origin" value={formData.UpdateNameOrigin} onChange={handleInputChange} onBlur={() => validateInput('UpdateNameOrigin', formData.UpdateNameOrigin)} />
                                    {errors.UpdateNameOrigin && (
                                        <p className="text-red-500 text-sm italic">{errors.UpdateNameOrigin}</p>
                                    )}
                                </div>
                                <div className="form-group" value={SelectedCountry} onChange={handleSelectChange}>
                                    <label className='float-left' >Name</label>
                                    <select name='UpdateNameAddress' className="form-control" value={formData.UpdateNameAddress} onChange={handleInputChange}  >
                                        <option value="">Select Country</option>
                                        {countries.map((coutry, index) => (
                                            <option key={index} value={coutry}>
                                                {coutry}
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
        </div>

    )
}
export default ProviderSuperadmin;