import { useEffect, useState, useRef } from 'react';
import image from '../images/user2-160x160.jpg';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Bar, Chart } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { format } from 'date-fns';
import 'chart.js/auto';
import axios from 'axios';
function AdminPage() {
  const canvasRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || 'Default Username';
  const ID = location.state?.ID || '';
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [Month, setMonth] = useState(new Date().getMonth() + 1);
  const [orderData, setOrderData] = useState([]);
  const [productCount, setProductCount] = useState(null);
  const [categorycount, setcategorycount] = useState(null);
  const [Picturecount, setPicturecount] = useState(null);
  const [userCount, setuserCount] = useState(null);
  const [totalcity, settotalcity] = useState(null);
  const [totaldistrict, settotaldistrict] = useState(null);
  const [totalWard, settotalWard] = useState(null);
  const [totalBlog, setTotalBlog] = useState(null);
  const [totalorder, setcouttotalorder] = useState(null);
  const [totalEvent, settotalEvent] = useState(null);
  const [Feedback, setFeedback] = useState([]);
  const [WareHouse, SetWarehouse] = useState([]);
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/showfeedback');
        setFeedback(response.data.feedback);

      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, [])
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/coutEvent');
        settotalEvent(response.data.eventCount);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, [])
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/countOrder');
        setcouttotalorder(response.data.orderCount);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, [])
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/coutBlog');
        setTotalBlog(response.data.blogCount);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, [])

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/totalward');
        settotalWard(response.data.cityward);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, [])
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/totalCity');
        settotalcity(response.data.cityCount);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, [])
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/totaldistrict');
        settotaldistrict(response.data.cityDistrict);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, [])
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/countuser');
        setuserCount(response.data.totaluser);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, [])
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/totalPicture');
        setPicturecount(response.data.pictureCount);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, [])
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/countproduct');
        setProductCount(response.data.productCount);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, []);
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/totalCategory');
        setcategorycount(response.data.totalCategory);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, [])

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const charop = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/getOrderCountsByDay/${selectedMonth}`);
        setOrderData(response.data);
      } catch (error) {
        console.error('Error fetching order data', error);
      }
    };

    fetchOrderData();
  }, [selectedMonth]);
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/getWareHouseCountsOrder/${Month}`);
        SetWarehouse(response.data);
      } catch (error) {
        console.error('Error fetching order data', error);
      }
    };

    fetchOrderData();
  }, [Month]);
  const chartDataProduct = {
    labels: ['Product', 'Category', 'Picture', "User"],
    datasets: [{
      data: [productCount, categorycount, Picturecount, userCount],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        // Add more colors if you have more categories
      ],
    }],
  };
  const chartship = {
    labels: ["City", "District", "Ward"],
    datasets: [{
      data: [totalcity, totaldistrict, totalWard],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        // Add more colors if you have more categories
      ],
    }],
  }
  const generateChartData = () => {
    const daysInMonth = new Date(new Date().getFullYear(), selectedMonth, 0).getDate();
    const chartData = Array.from({ length: daysInMonth }, (_, index) => 0);

    orderData.forEach((orderCount) => {
      const orderDay = new Date(orderCount.order_date).getDate();
      chartData[orderDay - 1] = orderCount.order_count;
    });

    return chartData;
  };
  const generateChartData1 = () => {
    const daysInMonth = new Date(new Date().getFullYear(), Month, 0).getDate();
    const chartData = Array.from({ length: daysInMonth }, (_, index) => 0);

    WareHouse.forEach((orderCount) => {
      const orderDay = new Date(orderCount.detail_date).getDate();
      chartData[orderDay - 1] = orderCount.order_Quality;
    });

    return chartData;
  };

  const chartData = {
    labels: Array.from({ length: new Date(new Date().getFullYear(), selectedMonth, 0).getDate() }, (_, index) => index + 1),
    datasets: [
      {
        label: 'Number of Unique Orders',
        data: generateChartData(),
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };
  const chartWare = {
    labels: Array.from({ length: new Date(new Date().getFullYear(), Month, 0).getDate() }, (_, index) => index + 1),
    datasets: [
      {
        label: 'Number of Unique WareHouse',
        data: generateChartData1(),
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  }
  const chartOptionsBie = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Day',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Unique Orders',
        },
      },
    },
  };
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
            <li className="active treeview">
              <a href="" onClick={() => navigate('/admin', { state: { username: username, ID: ID } })}>
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
            Dashboard
            <small>Control panel</small>
          </h1>
          <ol className="breadcrumb">
            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
            <li className="active">Dashboard</li>
          </ol>
        </section>


        <section className="content">

          <div className="row">
            <div className="col-lg-3 col-xs-6">

              <div className="small-box bg-aqua">
                <div className="inner">
                  <h3>{totalBlog}</h3>
                  <p>Blog</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag"></i>
                </div>
                <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
              </div>
            </div>
            <div className="col-lg-3 col-xs-6">

              <div className="small-box bg-green">
                <div className="inner">
                  <h3>{totalorder}</h3>
                  <p>Order</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars"></i>
                </div>
                <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
              </div>
            </div>
            <div className="col-lg-3 col-xs-6">

              <div className="small-box bg-yellow">
                <div className="inner">
                  <h3>{userCount}</h3>
                  <p>User Registrations</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add"></i>
                </div>
                <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
              </div>
            </div>
            <div className="col-lg-3 col-xs-6">

              <div className="small-box bg-red">
                <div className="inner">
                  <h3>{totalEvent}</h3>
                  <p>Unique Visitors</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph"></i>
                </div>
                <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
              </div>
            </div>
          </div>

          <div className="row">

            <section className="col-lg-7 connectedSortable">


              <div className="box box-success">

                <div className="box-body chat" id="chat-box">

                  <Bar data={chartData} options={chartOptions} />

                  {/* Dropdown to select the month */}
                  <label>Select Month:</label>
                  <select id="selectMonth"
                    className="form-select" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                    {[...Array(12).keys()].map((month) => (
                      <option key={month + 1} value={month + 1}>
                        {month + 1}
                      </option>
                    ))}
                  </select>

                </div>
                <div className="box-footer">
                  <div className="input-group">
                    <input className="form-control" placeholder="Type message..." />
                    <div className="input-group-btn">
                      <button className="btn btn-success"><i className="fa fa-plus"></i></button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="box box-primary">
                <div className="box box-solid bg-light-blue-gradient">
                  <div className="box-header">

                    <div className="pull-right box-tools">
                      <button className="btn btn-primary btn-sm daterange pull-right" data-toggle="tooltip" title="Date range"><i className="fa fa-calendar"></i></button>
                      <button className="btn btn-primary btn-sm pull-right" data-widget='collapse' data-toggle="tooltip" title="Collapse" ><i className="fa fa-minus"></i></button>
                    </div>

                    <i className="fa fa-map-marker"></i>
                    <h3 className="box-title">
                      Visitors
                    </h3>
                  </div>
                </div>
                <div className="box-header">


                  <Pie data={chartship} />
                </div>
                <div className="box-body">

                </div>

              </div>

              <div className="box box-info">
                <div className="box-header">
                  <i className="fa fa-envelope"></i>
                  <h3 className="box-title">Quick Email</h3>

                  <div className="pull-right box-tools">
                    <button className="btn btn-info btn-sm" data-widget="remove" data-toggle="tooltip" title="Remove"><i className="fa fa-times"></i></button>
                  </div>
                </div>
                <Bar data={chartWare} options={charop} />

                {/* Dropdown to select the month */}
                <label>Select Month:</label>
                <select id="selectMonth"
                  className="form-select" value={Month} onChange={(e) => setMonth(e.target.value)}>
                  {[...Array(12).keys()].map((month) => (
                    <option key={month + 1} value={month + 1}>
                      {month + 1}
                    </option>
                  ))}
                </select>
                <div className="box-footer clearfix">
                  <button className="pull-right btn btn-default" id="sendEmail">Send <i className="fa fa-arrow-circle-right"></i></button>
                </div>
              </div>

            </section>
            <section className="col-lg-5 connectedSortable">


              <div className="box box-solid bg-light-blue-gradient">
                <div className="box-header">

                  <div className="pull-right box-tools">
                    <button className="btn btn-primary btn-sm daterange pull-right" data-toggle="tooltip" title="Date range"><i className="fa fa-calendar"></i></button>
                    <button className="btn btn-primary btn-sm pull-right" data-widget='collapse' data-toggle="tooltip" title="Collapse" ><i className="fa fa-minus"></i></button>
                  </div>

                  <i className="fa fa-map-marker"></i>
                  <h3 className="box-title">
                    Visitors
                  </h3>
                </div>

                <div className="box-footer no-border">

                  {productCount !== null && (
                    <Pie data={chartDataProduct} />
                  )}
                </div>
              </div>

              <div className="box box-solid bg-teal-gradient">
                <div className="box-header">
                  <i className="fa fa-th"></i>
                  <h3 className="box-title">Sales Graph</h3>
                  <div className="box-tools pull-right">
                    <button className="btn bg-teal btn-sm" data-widget="collapse"><i className="fa fa-minus"></i></button>
                    <button className="btn bg-teal btn-sm" data-widget="remove"><i className="fa fa-times"></i></button>
                  </div>
                </div>
                <div className="box-body border-radius-none">
                  <div className="chart" id="line-chart" ></div>
                </div>
                <div className="box-footer no-border">
                  <table id="example1" className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Product</th>

                        <th>Username</th>
                        <th>Content</th>

                        <th>Date</th>

                      </tr>
                    </thead>
                    <tbody>
                      {Feedback.map((Product, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{Product.Name}</td>
                          <td>{Product.Username}</td>
                          <td>{Product.Content}</td>
                          <td>  {format(new Date(Product.Create_time), 'yyyy-MM-dd HH:mm')}</td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>
              </div>




            </section>
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
export default AdminPage;