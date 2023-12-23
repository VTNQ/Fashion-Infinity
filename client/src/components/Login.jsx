

import logoimage from "../images/logo-trang-suc-5.png";
import Swal from "sweetalert2";
import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import {useNavigate} from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [ID,SetID]=useState('');
    const [loading, setloading] = useState(false);
    function Logingoogle({ onSuccess, onFailure }) {
        const clientId = '459264668372-o7aqna11uh89jqtbuc05o285tsphoopc.apps.googleusercontent.com'; // Replace with your actual client ID

        const handleGoogleSuccess = async (response) => {
            setloading(true);
            console.log('Google Sign-In success:', response);
            try {
                const googleuser = {
                  
                    Email: response.profileObj.email,
                }
                const googleResponse = await fetch('http://127.0.0.1:8000/api/login/google', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(googleuser),
                });
                const googledata = await googleResponse.json();

                if (googleResponse.ok) {
                    // Registration successful
                    setFormData({
                        Username: '',
                        Email: '',
                        Password: '',
                    });
                    Swal.fire({
                        icon: "success",
                        title: googledata.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    // Registration failed
                    // Handle the error from the server
                    Swal.fire({
                        icon: "error",
                        title: googledata.errorMessage || "Registration failed",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } catch (error) {
                console.error('Google Registration Error:', error);
            }finally{
                setloading(false);
            }

        };

        const handleGoogleFailure = (error) => {
            console.error('Google Sign-In error:', error);
            onFailure(error);
        };

        return (
            <GoogleLogin
                clientId={clientId}
                onSuccess={handleGoogleSuccess}
                onFailure={handleGoogleFailure}
                cookiePolicy={'single_host_origin'}
                render={(renderProps) => (
                    <button
                        onClick={renderProps.onClick}

                        className="w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-white"
                    >

                        G+
                    </button>
                )}
            />

        );
    }
    const [errors, setErrors] = useState({});
    const navigate=useNavigate();
    const [formData,setFormData]=useState({
        Email: '',
        Password: '',
    });
    
    const validateInput = (fieldName, value)=>{
        const newErrors = { ...errors };
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
    const handleInputChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }


    const handleSubmit=async (e)=>{
        if(formData.Email===''|| formData.Password===''){
            Swal.fire({
                icon: "error",
                title: 'Email and Password is required',
                showConfirmButton: false,
                timer: 2000
            });
        }else{
            e.preventDefault(); // ngăn ko cho gửi form theo cách thông thường
            const response=await fetch('http://127.0.0.1:8000/api/Login', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const responseData=await response.json();
            if(response.ok){
                console.log(responseData);
               if(responseData.message){
            
                setUsername(responseData.Username);
                SetID(responseData.ID);
                console.log(username);
                Swal.fire({
                    icon: "success",
                    title: responseData.message,
                    showConfirmButton: false,
                    timer: 1500
                }).then(()=>{
                    if(responseData.isSuperAdmin){
                        navigate('/superadmin', { state: { username: responseData.Username } });
                    }else if(responseData.isAdmin){
                        navigate('/admin', { state: { username: responseData.Username,ID:responseData.ID } });
                    }
                });
               
            }
            
                  
                
            }else{
                if(responseData.errorMessage){
                    Swal.fire({
                        icon: "error",
                        title: responseData.errorMessage,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        }
        
    }
    return (
        <div>

            <section className="min-h-screen flex items-stretch text-white ">
                <div className="bg-img lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
                >
                    <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                    <div className="w-full px-24 z-10">
                        <h1 className="text-5xl font-bold text-left tracking-wide">Keep it special</h1>
                        <p className="text-3xl my-4">Since people will stare, satisfy them</p>
                    </div>
                    <div className="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4">
                <span>
                    <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path
                        d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </span>
                        <span>
                    <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path
                        d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </span>
                        <span>
                    <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </span>
                    </div>
                </div>
                <div
                    className="bg-jewelry lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
                >
                    <div
                        className="bg-img absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
                    >
                        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                    </div>
                    <div className="w-full py-6 z-20">
                        <h1 className="my-6 text-center flex justify-center">
                            <img src={logoimage} alt="" width="300" height="300"/>
                        </h1>
                        <div className="py-6 space-x-2">
                        <Logingoogle
                         onSuccess={(response) => console.log('Google Sign-In Success in Register:', response)}
                         onFailure={(error) => console.error('Google Sign-In Error in Register:', error)}
                        />
                           
                        </div>
                        <p className="text-gray-100">
                            or use email your account
                        </p>
                        <form onSubmit={handleSubmit} className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                            <div className="pb-2 pt-4">
                                <input  type="email" name="Email" id="email" placeholder="Email"
                                value={formData.Email} onChange={handleInputChange}
                                       className="block w-full p-4 text-lg rounded-sm bg-black" onBlur={()=>validateInput('Email',formData.Email)}
                                />
                                {errors.Email &&(
                                     <p className="text-red-500 text-sm italic">{errors.Email}</p>
                                )}
                            </div>

                            <div className="pb-2 pt-4">
                                <input className="block w-full p-4 text-lg rounded-sm bg-black" type="password"
                                value={formData.Password} onChange={handleInputChange}
                                       name="Password" id="password" placeholder="Password" onBlur={()=>validateInput('Password',formData.Password)}
                                />
                                 {errors.Password &&(
                                     <p className="text-red-500 text-sm italic">{errors.Password}</p>
                                )}
                            </div>
                            <div className="flex justify-between">
                                <div className="text-right text-gray-400 hover:underline hover:text-gray-100">
                                    <a href="#" onClick={()=>navigate('/')}>Don't Have Account</a>
                                </div>
                                <div className="text-right text-gray-400 hover:underline hover:text-gray-100">
                                    <a href="#"  onClick={()=>navigate('/forgot')}>Forgot Password?</a>
                                </div>
                            </div>

                            <div className="px-4 pb-2 pt-4">
                                <button
                                    className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none"
                                >Login
                                </button>
                            </div>

                            <div
                                className="p-4 text-center right-0 left-0 flex justify-center space-x-4 mt-16 lg:hidden ">
                                <a href="#">
                                    <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                         viewBox="0 0 24 24">
                                        <path
                                            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                    </svg>
                                </a>
                                <a href="#">
                                    <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                         viewBox="0 0 24 24">
                                        <path
                                            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                                    </svg>
                                </a>
                                <a href="#">
                                    <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                         viewBox="0 0 24 24">
                                        <path
                                            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
