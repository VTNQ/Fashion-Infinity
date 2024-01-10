import React, { useState, useEffect } from "react";
import MenuHomepage from '../menu/MenuHomepage';
import { useLocation, useNavigate } from 'react-router-dom';
import FooterHome from "../footer/FooterHome";
import axios from "axios";
import Swal from 'sweetalert2';
function Edit() {
  const location = useLocation();
  const ID = location.state?.ID || '';
  const username = location.state?.username || 'Default Username';
  const [Act,setAct]=useState(true);
  const [userData, setUserData] = useState({
    // Initialize with default values or fetch from an API
    Username: "",
    FullName: "",
    email: "",
    Phone: "",
    Address: "",
    // Add more fields as needed
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!ID && Act) {
     navigate(-1); 
    }
  }, [ID, navigate]);
  const handleSubmit = async () => {

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/EditProfile/${ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Username: userData.Username,
          Email: userData.email,
          FullName: userData.FullName,
          Phone: userData.Phone,
          Address: userData.Address,
        }),
     
      });
 
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Profile updated successfully",
          showConfirmButton: false,
          timer: 1500
        });
        const responsedata = await axios.get(`http://127.0.0.1:8000/api/showEdit/${ID}`);
        responsedata.data.forEach((user) => {
          // Access individual user properties, e.g., user.username
          setUserData({
            Username: user.Username,
            FullName: user.FullName,
            email: user.Email,
            Phone: user.Phone,
            Address: user.Address

          })
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to update profile",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      console.error('Add error:' + error);
    }
  }
  useEffect(() => {

    const fetchdata = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/showEdit/${ID}`);
        console.log(response.data);
        response.data.forEach((user) => {
          // Access individual user properties, e.g., user.username
          setUserData({
            Username: user.Username,
            FullName: user.FullName,
            email: user.Email,
            Phone: user.Phone,
            Address: user.Address

          })
        });
      } catch (error) {
        console.log(error);
      }
    }



    fetchdata();
  }, [])


  return (
    <div>
      <MenuHomepage />
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <h2 className="font-bold" style={{ color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontSize: '36px', marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif' }}>Other</h2>
            <ul>
              <li>
                <a href="" style={{ textDecoration: 'none' }}>Home</a>
              </li>
              <li className="active">Edit</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="user-edit-container" style={containerStyle}>
        <h2 className="font-bold" style={headerStyle}>
          Edit User Profile
        </h2>
        <form role="form" style={formStyle} onSubmit={handleSubmit}>
          <label style={labelStyle}>
            First Name:
            <input
              type="text"
              value={userData.Username}
              onChange={(e) =>
                setUserData({ ...userData, Username: e.target.value })
              }
              style={inputStyle}
            />
          </label>
          <br />
          <label style={labelStyle}>
            Full Name:
            <input
              type="text"
              value={userData.FullName}
              onChange={(e) =>
                setUserData({ ...userData, FullName: e.target.value })
              }
              style={inputStyle}
            />
          </label>
          <br />
          <label style={labelStyle}>
            Email:
            <input
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              style={inputStyle}
            />
          </label>
          <br />
          <label style={labelStyle}>
            Phone:
            <input
              type="number"
              value={userData.Phone}
              onChange={(e) =>
                setUserData({ ...userData, Phone: e.target.value })
              }
              style={inputStyle}
            />
          </label>
          <br />
          <br />
          <label style={labelStyle}>
            Address:
            <input
              type="text"
              value={userData.Address}
              onChange={(e) =>
                setUserData({ ...userData, Address: e.target.value })
              }
              style={inputStyle}
            />
          </label>
          <br />
          {/* Add more fields as needed */}
          <button type="button" style={buttonStyle} onClick={()=>handleSubmit()}>
            Update Profile
          </button>
        </form>
      </div>
      <FooterHome/>
    </div>
  );
}

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  width: "100%",
  margin: "0 auto",
  height: "100vh",
  boxSizing: "border-box",
  fontFamily: '"Lato", sans-serif', // Added consistent font family
};

const headerStyle = {
  color: "#333",
  fontSize: "24px",
  marginBottom: "20px",
  fontFamily: '"Lato", sans-serif', // Added consistent font family
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%", // Full width for form
};

const labelStyle = {
  marginBottom: "10px",
  fontSize: "16px",
};

const inputStyle = {
  padding: "12px",
  fontSize: "16px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  marginBottom: "10px",
  width: "100%",
};

const buttonStyle = {
  backgroundColor: "#4285f4",
  color: "#fff",
  padding: "12px",
  fontSize: "16px",
  borderRadius: "4px",
  cursor: "pointer",
  width: "50%",
  alignSelf: "center",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#357ae8", // Darker color on hover
  },
};

export default Edit;