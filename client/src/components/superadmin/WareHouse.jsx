import axios from "axios";
import React from "react";
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

                      {warehouses.map((warehouse,index)=>(
                        <tr key={index}>
                        <td>{warehouse.username}</td>
                        <td>{warehouse.product_name}</td>
                        <td>{warehouse.quality}</td>
                        <td>{warehouse.created_at}</td>
                        
                      </tr>
                      ))}
                     
                      
                      
                    </tbody>
                    
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
}
export default  WareHouse;