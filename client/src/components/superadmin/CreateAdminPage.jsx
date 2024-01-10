import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../admin/admin.css';
import Swal from 'sweetalert2';
import image from '../../../src/images/user2-160x160.jpg';

function CreateAdmin(){
    const location = useLocation();
    const username = location.state?.username || 'Default Username';
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Username: '',
        Email: '',
        Password: '25f9e794323b453885f5181f1b624d0b',
    });
    
    const [errors, setErrors] = useState({});
    const [loading, setloading] = useState(false);
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    }
    const validateInput = (fieldName, value) => {
      const newErrors = { ...errors };
      if (fieldName === "Username") {
          newErrors[fieldName] = value.trim() === '' ? 'Username is required' : '';
      }
      if (fieldName === "Email") {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          newErrors[fieldName] = !emailPattern.test(value) ? "Invalid email format" : '';
      }
      if (fieldName === "Password") {
          if (value.trim() === '') {
              newErrors[fieldName] = 'Password is required';
          } else if (value.length < 8) {
              newErrors[fieldName] = 'Password Must be at least 8 characters';
          } else {
              newErrors[fieldName] = '';
          }

      }
      setErrors(newErrors)
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      setloading(true);

      try {
          if (formData.Username === '' || formData.Password === '' || formData.Email === '') {
              // Handle the case where Username, Password, and Email are required
              Swal.fire({
                  icon: "error",
                  title: "Username, Password, Email is required",
                  showConfirmButton: false,
                  timer: 1500
              });
          } else {
              if (formData.Password.length < 8) {
                  Swal.fire({
                      icon: "error",
                      title: "Password must be over 8 characters",
                      showConfirmButton: false,
                      timer: 1500
                  });

              } else {
                  const response = await fetch('http://127.0.0.1:8000/api/register/registerAdmin', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(formData),
                  });

                  const responseData = await response.json();

                  if (response.ok) {
                      // Registration successful
                      setFormData({
                          Username: '',
                          Email: '',
                          Password: '',
                      });
                      Swal.fire({
                          icon: "success",
                          title: "Registration Admin successfully",
                          showConfirmButton: false,
                          timer: 1500
                      });
                  } else {
                      // Registration failed
                      if (responseData.errorAll) {
                          // Display the specific error message for existing username
                          Swal.fire({
                              icon: "error",
                              title: responseData.errorAll,
                              showConfirmButton: false,
                              timer: 1500
                          });
                      } else {
                          // Display a generic error message
                          Swal.fire({
                              icon: "error",
                              title: responseData.error || "Registration Admin failed",
                              showConfirmButton: false,
                              timer: 1500
                          });
                      }
                  }
              }

              // Make the API call to register the user

          }
      } catch (error) {
          console.error('Registration Error:', error);

          // Optionally, you can log specific properties of the error object:

      } finally {
          setloading(false);
      }
  };
    return(
        
      <div class="content-wrapper">
        
        <section class="content-header">
          <h1>
            General Form Elements
            <small>Preview</small>
          </h1>
          <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li><a href="#">Create admin</a></li>
            <li class="active">General Elements</li>
          </ol>
        </section>

        
        <section class="content">
          <div class="row">
           
            <div class="col-md-6">
              
              <div class="box box-primary">
                <div class="box-header">
                  <h3 class="box-title">Create New admin</h3>
                </div>
                
                <form onSubmit={handleSubmit} role="form">
                  <div class="box-body">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Username</label>
                      <input name="Username" class="form-control" id="username" placeholder="Enter Username"
                      value={formData.Username} onChange={handleInputChange} onBlur={() => validateInput('Username', formData.Username)}/>
                    {errors.Username && (
                                    <p className="text-red-500 text-sm italic">{errors.Username}</p>
                                )}
                    
                    </div>
                    {/* <div class="form-group">
                      <label for="exampleInputEmail1">Username</label>
                      <input name="Username" class="form-control" id="username" placeholder="Enter Username"
                      value={formData.Username} onChange={handleInputChange} onBlur={() => validateInput('Username', formData.Username)}/>
                    {errors.Username && (
                                    <p className="text-red-500 text-sm italic">{errors.Username}</p>
                                )}
                    
                    </div> */}
                    <div class="form-group">
                      <label for="exampleInputPassword1">Gmail</label>
                      <input name="Email" type="email" class="form-control" id="email" placeholder="Gmail" value={formData.Email} onChange={handleInputChange} onBlur={() => validateInput('Email', formData.Email)} />
                      {errors.Email && (
                                    <p className="text-red-500 text-sm italic">{errors.Email}</p>
                                )}
                    </div>


                    <div class="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input type="password" name="Password" id="password" class="form-control" placeholder="Password"
                      value={formData.Password} onChange={handleInputChange} onBlur={() => validateInput('Password', formData.Password)}/>
                    {errors.Password && (
                                    <p className="text-red-500 text-sm italic">{errors.Password}</p>
                                )}
                                
                    </div>
                    
                    <div class="checkbox">
                      <label>
                        <input type="checkbox"/> Check me out
                      </label>
                    </div>
                  </div>

                  <div class="box-footer">
                    <button type="submit" class="btn btn-primary" disabled={loading}>Submit</button>
                  </div>
                </form>
              </div>

              
              
            </div>
           
            
          </div>   
        </section>
      </div>

    )
}
export default CreateAdmin;
