import image from '../images/user2-160x160.jpg';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import axios from 'axios';

import { useLocation } from 'react-router-dom';
import Pagination from 'react-paginate';
import 'react-paginate/theme/basic/react-paginate.css';
import './admin/admin.css'
function DetailOrder() {

    const [searchTerm, setSearchtem] = useState('');
    const [loading, setloading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [perPage, setperPage] = useState(5);
    const [customer, setCustomer] = useState(null);
    const [Picture, setPicture] = useState([]);
    const location = useLocation();
    const [Product, setProduct] = useState([]);
    const [shipprice, setshipprice] = useState([]);
    const username = location.state?.username || 'Default Username';
    const ID = location.state?.ID || '';
    const IDorder = location.state?.IDorder || '';
    const caculateTotalPrice = (quanlity, Price) => {
        return (quanlity * Price);
    }
    const [Act,setAct]=useState(true);
    useEffect(() => {
      if (!ID && Act) {
       navigate(-1); 
      }
    }, [ID, navigate]);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/detailProductOrder/${IDorder}`);
                setProduct(response.data);
            } catch (error) {
                console.error("error fetching product", error)
            }

        }
        fetchdata();
    }, [IDorder])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/ship/${IDorder}`);
                setshipprice(response.data);
            } catch (error) {
                console.error("error fetching customer", error)
            }
        }
        fetchdata();
    }, [IDorder])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/detailCustomer/${IDorder}`);
                setCustomer(response.data);
            } catch (error) {
                console.error("error fetching customer", error)
            }
        }
        fetchdata();
    }, [IDorder])

    const exportPdf = () => {
        const doc = new jsPDF();
    
        // Add header
        doc.setFont('Arial', 'bold');
        doc.setFontSize(14);
        doc.text('Fashion Infinity', 105, 10, { align: 'center' });
        doc.text('Order Summary', 105, 20, { align: 'center' });
        doc.line(20, 30, 190, 30);
    
        // Add customer information title
        doc.setFont('Arial', 'bold');
        doc.setFontSize(12);
        doc.text('Information Customer', 20, 40);
    
        // Reset font for customer details
        doc.setFont('Arial', 'normal');
        doc.setFontSize(12);
    
        // Add customer information
        doc.text(`Customer Name: ${customer ? customer.FullName : ""}`, 20, 50);
        doc.text(`Address: ${customer ? customer.Address : ""}`, 20, 60);
        doc.text(`City: ${customer ? customer.Namecity : ""}`, 20, 70);
        doc.text(`Phone: ${customer ? customer.Phone : ""}`, 20, 80);
    
        let currentY = 90; // Adjust starting Y position based on customer info height
    
        // Add title for product details
        doc.setFont('Arial', 'bold');
        doc.setFontSize(12);
        doc.text('Detail Product', 20, currentY);
    
        // Reset font for product details
        doc.setFont('Arial', 'normal');
        doc.setFontSize(12);
    
        // Increment currentY to make space for the title
        currentY += 15;
    
        // Iterate through products and add to the PDF table
        Product.forEach((product, index) => {
            // Product Name
            const productNameLines = doc.splitTextToSize(product.Nameproduct, 160); // Adjust the width based on your needs
            productNameLines.forEach((line, lineIndex) => {
                doc.text(line, 20, currentY + lineIndex * 10);
            });
    
            // Quantity
            doc.text(`Quantity: ${product.Quality}`, 20, currentY + productNameLines.length * 10);
    
            // Price
            doc.text(`Price: $${product.Price}`, 20, currentY + productNameLines.length * 10 + 10);
    
            // Total
            doc.text(`Total: $${(product.Quality * product.Price).toFixed(2)}`, 20, currentY + productNameLines.length * 10 + 20);
    
            currentY += productNameLines.length * 10 + 35; // Adjust spacing
        });
    
        // Add total prices
        uniqueTotalPrices.forEach((totalPrice, index) => {
            doc.text(`Total pay: $${totalPrice.toFixed(2)}`, 20, currentY + index * 15);
        });
    
        // Add ship price outside the table
        if (shipprice.Price !== null && shipprice.Price !== undefined && shipprice.Price !== '') {
            doc.text(`Ship price: $${shipprice.Price}`, 20, currentY + uniqueTotalPrices.length * 15);
        }
    
        // Save the PDF
        doc.save('order_summary.pdf');
    };
    
    const navigate = useNavigate();

    const uniqueTotalPrices = [...new Set(Product.map((card) => card.TotalPrice))];
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

                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Customer information</h3>
                                </div>


                                <div className="box-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>FullName</th>
                                                <th>Date</th>
                                                <th>Phone</th>
                                                <th>Address</th>
                                                <th>City</th>
                                                <th>Ward</th>
                                                <th>District</th>
                                                <th>Postcode</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{customer ? customer.FullName : ""}</td>
                                                <td>{customer ? new Date(customer.Start_Order).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' }) : ""}</td>
                                                <td>{customer ? customer.Phone : ""}</td>
                                                <td>{customer ? customer.Address : ""}</td>
                                                <td>{customer ? customer.Namecity : ""}</td>
                                                <td>{customer ? customer.Namedistrict : ""}</td>
                                                <td>{customer ? customer.NameWard : ""}</td>
                                                <td>{customer ? customer.Postcode : ""}</td>

                                            </tr>
                                        </tbody>

                                    </table>


                                </div>
                            </div>
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">List order details</h3>
                                </div>


                                <div className="box-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Product Name</th>
                                                <th>Quality</th>
                                                <th>Price</th>
                                                <th>Total Price</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Product.map((product, index) => (
                                                <tr>

                                                    <td>{index + 1}</td>
                                                    <td>{product.Nameproduct}</td>
                                                    <td>{product.Quality}</td>
                                                    <td>${product.Price}</td>
                                                    <td>${caculateTotalPrice(product.Quality, product.Price)}</td>


                                                </tr>
                                            ))}
                                            {shipprice.Price !== null && shipprice.Price !== undefined && shipprice.Price !== "" && (
                                                <tr>
                                                    <td>Ship price: {shipprice.Price}</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>

                                            )}
                                            <tr>
                                                {uniqueTotalPrices.map((totalPrice, index) => (
                                                    <td>Total pay:${totalPrice}</td>

                                                ))}

                                                <td></td>
                                            </tr>
                                            <tr> <button style={{
                                                padding: '10px 20px',
                                                fontSize: '16px',
                                                fontWeight: 'bold',
                                                backgroundColor: '#3498db',
                                                color: '#ffffff',
                                                border: 'none',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                            }} onClick={exportPdf}>Export PDF</button></tr>
                                        </tbody>

                                    </table>


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
export default DetailOrder;