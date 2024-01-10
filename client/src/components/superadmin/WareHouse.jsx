import axios from "axios";
import React from "react";
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-paginate';
import 'react-paginate/theme/basic/react-paginate.css';
import { useState,useEffect } from "react";

function WareHouse(){

  const [warehouses, setWarehouses] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/getInfomationWareHouse');
      if (response.data.success) {
        setWarehouses(response.data.data);
      } else {
        console.error('Failed to fetch data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);
const navigate = useNavigate();
const [Act,setAct]=useState(true);
useEffect(() => {
  if ( Act) {
   navigate(-1); 
  }
}, [ navigate]);

const [currentPage, setCurrentPage] = useState(0);
  const perPage = 8;

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Calculate the correct warehouses to display
  const indexOfLastWarehouse = (currentPage + 1) * perPage;
  const indexOfFirstWarehouse = indexOfLastWarehouse - perPage;
  const currentWarehouses = warehouses.slice(indexOfFirstWarehouse, indexOfLastWarehouse);

    return(
        <div class="content-wrapper">
       
        <section class="content-header">
          <h1>
          Manage Warehouse
            <small>superadmin</small>
          </h1>
          <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li><a href="#">Manage Warehouse</a></li>
            <li class="active">Data tables</li>
          </ol>
        </section>

       
        <section class="content">
          <div class="row">
            <div class="col-xs-12">
             

              <div class="box">
                <div class="box-header">
                  <h3 class="box-title">Show Information Warehouse</h3>
                </div>
                <div class="box-body">
                  <table id="example1" class="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Admin</th>
                        <th>Product name</th>
                        <th>Quantity</th>
                        <th>Created</th>
                        
                      </tr>
                    </thead>
                    <tbody>

                      {currentWarehouses.map((warehouse,index)=>(
                        <tr key={index}>
                        <td>{warehouse.username}</td>
                        <td>{warehouse.product_name}</td>
                        <td>{warehouse.quality}</td>
                        <td>{warehouse.created_at}</td>
                        
                      </tr>
                      ))}
                     
                      
                      
                    </tbody>
                    
                  </table>
                  <Pagination
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            pageCount={Math.ceil(warehouses.length / perPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
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
            // ... other pagination props
          />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
}
export default  WareHouse;