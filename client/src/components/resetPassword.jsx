import React, { useState, useEffect, useRef } from 'react';
import logoimage from "../images/logo-trang-suc-5.png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
    const initialCountdown = parseInt(localStorage.getItem('countdown')) || 300;
    const [otpInputs,setOtpInputs]=useState(['','','','']);
    const inputRefs =[useRef(),useRef(),useRef(),useRef()];
    const [formData, setFormData] = useState({
        otp:'',

    });
    const history=useNavigate();
    const[countDown,setCountdown]=useState(120);
    const handleInputChange = (index, value,e) => {
        
        const newOtpinputs=[...otpInputs];
        newOtpinputs[index]=value;
        setOtpInputs(newOtpinputs);
        setFormData({ ...formData, [e.target.name]: newOtpinputs.join('') });
        // Focus on the next input element
        if (value && index<inputRefs.length-1) {
            inputRefs[index+1].current.focus();
        }
    };
    const [Act,setAct]=useState(true);
    const navigate = useNavigate();
   
const handlekeyDown=(index,event)=>{
    if(event.key==='Backspace' && !otpInputs[index] && index>0){
        inputRefs[index-1].current.focus();
    }
}
const handleSubmit = (e) => {
    e.preventDefault();
    sendOtpRequest(); // Gọi hàm khi người dùng nhấn nút submit
};
const sendOtpRequest = async () => {
    if(minutes===0 && seconds===0){
        Swal.fire({
            icon: "error",
            title: "OTP is invalid",
            showConfirmButton: false,
            timer: 1500
        });
    }else{
        try {
            const response = await fetch('http://127.0.0.1:8000/api/otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const responseData = await response.json();
    
            if (response.ok) {
                setCountdown(0);
                Swal.fire({
                    icon: "success",
                    title: responseData.message,
                    showConfirmButton: false,
                    timer: 1500
                }).then(()=>{
                    history('/Login');
                });
           
            } else {
                console.error(responseData.error);
                // Xử lý logic khi có lỗi xác nhận OTP
            }
        } catch (e) {
            console.error('Error sending OTP request:', e);
        }
    }

    
};

useEffect(()=>{
    const interval = setInterval(() => {
        setCountdown((prevCountdown) => {
            const newCountdown = Math.max(prevCountdown - 1, 0);
               
            // Store the new countdown value in localStorage
            localStorage.setItem('countdown', newCountdown.toString());

            return newCountdown;
        });
    }, 1000);
   
    return () => {
        // Cleanup function when the component unmounts
        clearInterval(interval);
    };
}, []);
useEffect(() => {
    const handleBeforeUnload = () => {
        // Store the current countdown value in localStorage
        localStorage.setItem('countdown', countDown.toString());
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
        // Cleanup function when the component unmounts or changes page
        window.removeEventListener('beforeunload', handleBeforeUnload);
    };
}, [countDown]);
useEffect(()=>{
    const navigationType = performance.navigation.type;
    if (navigationType === performance.navigation.TYPE_RELOAD) {
        
        window.location.href = "/forgot";
    }
},[initialCountdown]);
const minutes = Math.max(Math.floor(countDown / 60),0);
const seconds = Math.max(countDown % 60,0);
    return (
<div>
            <section className="min-h-screen flex items-stretch text-white ">
                {/* Left side with background image */}
                <div className="bg-img lg:flex w-1/2  bg-gray-500 bg-no-repeat bg-cover relative items-center">
                    <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                    <div className="w-full px-24 z-10">
                        <h1 className="text-5xl font-bold text-left tracking-wide">Keep it special</h1>
                        <p className="text-3xl my-4">Since people will stare, satisfy them</p>
                    </div>
                    <div className="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4">
                        {/* Add your icons or buttons here */}
                    </div>
                </div>

                {/* Right side with form */}
                <div className="bg-jewelry lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0">
                    <div className="bg-img absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center">
                        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                    </div>
                    <div className="w-full py-6 z-20">
                        <h1 className="my-6 text-center flex justify-center">
                            <img src={logoimage} alt="" width="300" height="300" />
                        </h1>
                        <div className="py-6 space-x-2">
                            {/* Add your content here */}
                        </div>
                        <h2 className="mb-2 text-[2rem] text-white font-bold">{String(minutes).padStart(2,'0')}:{String(seconds).padStart(2,'0')}</h2>
                        <p className="text-gray-100">Enter Your OTP;</p>
                        <form onSubmit={handleSubmit} className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                            <div className="pb-2 pt-4 flex justify-between">
                            {otpInputs.map((input, index) => (
                    <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={input}
                    onChange={(e) => handleInputChange(index, e.target.value, e)}
                    onKeyDown={(e) => handlekeyDown(index, e)}
                    name='otp'
                    className="input"
                    ref={inputRefs[index]}
                    />
                ))}
                            </div>

                            {/* Buttons for OTP entry */}
                            

                            {/* Additional content */}
                         

                            <div className="px-4 pb-2 pt-4">
                                <button
                                    className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none"
                               
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ResetPassword;
