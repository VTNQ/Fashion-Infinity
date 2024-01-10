import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import MenuHomepage from "../menu/MenuHomepage";
import FooterHome from "../footer/FooterHome";
import Swal from 'sweetalert2';
import './Contact.css'

function Contact(){
    const location = useLocation();
    const username = location.state?.username || 'Default Username';
    const ID = location.state?.ID || '';
    const navigate = useNavigate();
const [formData,setFormData]=useState({
    Name:'',
    Email:'',
    Subject:'',
    Message:''
})
const handleSubmit=async (e)=>{
    e.preventDefault();
    if(formData.Name=='' || formData.Email=='' || formData.Subject=='' || formData.Message==''){
        Swal.fire({
            icon: "error",
            title: "Please complete all information",
            showConfirmButton: false,
            timer: 1500
        });
    }else if(ID==='' || username==='Default Username'){
        Swal.fire({
            icon: "error",
            title: "Please Login",
            showConfirmButton: false,
            timer: 1500
        });
    }else{
        try{
            const response=await fetch('http://127.0.0.1:8000/api/SendEmailContact',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body:JSON.stringify({
                    Name:formData.Name,
                    Email:formData.Email,
                    Subject:formData.Subject,
                    Message:formData.Message
                  })
            })
            if(response.ok){
                setFormData({
                    Email:'',
                    Name:'',
                    Subject:'',
                    Message:''
                })
                Swal.fire({
                    icon: "success",
                    title: "Send Contact successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Failed to send email",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }catch(error){
            console.error('Error:', error);
        }
    }
   
}
return(
    <div>
           <MenuHomepage/>
        <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <h2 className="font-bold" style={{ color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontSize: '36px', marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif' }}>Other</h2>
                        <ul>
                            <li>
                                <a href="" style={{ textDecoration: 'none' }}>Home</a>
                            </li>
                            <li className="active">Contact</li>
                        </ul>
                    </div>
                </div>
            </div>
     
            <div className="contact-main-page">
      <div className="container">
        <div
          id="google-map"
          style={{ position: 'relative', overflow: 'hidden' }}
       
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.060291476182!2d106.71160187451761!3d10.806694358635804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529ed00409f09%3A0x11f7708a5c77d777!2zQXB0ZWNoIENvbXB1dGVyIEVkdWNhdGlvbiAtIEjhu4cgVGjhu5FuZyDEkMOgbyB04bqhbyBM4bqtcCBUcsOsbmggVmnDqm4gUXXhu5FjIHThur8gQXB0ZWNo!5e0!3m2!1sfr!2s!4v1704812725990!5m2!1sfr!2s"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          {/* Add a custom overlay for the hover effect */}
        
        </div>
      </div>
    </div>
    <div className="container">
        <div className="row">
            <div className="col-lg-5 offset-lg-1 col-md-12 order-1 order-lg-2">
                <div className="contact-page-side-content">
                    <h3 className="contact-page-title" style={{fontFamily:'"Lato", sans-serif',color:'#333333'}}>Contact Us</h3>
                    <p className="contact-page-message">
                    Claritas est etiam processus dynamicus, qui sequitur
                                mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum
                                claram anteposuerit litterarum formas human.
                    </p>
                    <div className="single-contact-block">
                        <h4>
                            <i className="fa fa-fax">
                                
                            </i>
                            Address
                        </h4>
                        <p>123 Main Street, Anytown, CA 12345 – USA</p>
                    </div>
                    <div className="single-contact-block">
                        <h4>
                            <i className="fa fa-phone"></i>
                            Phone
                        </h4>
                        <p>Mobile: (08) 123 456 789</p>
                        <p>Hotline: 1009 678 456</p>
                    </div>
                    <div className="single-contact-block last-child">
                        <h4>
                            <i className="fa fa-envelope-o"></i>
                            Email
                        </h4>
                        <p>yourmail@domain.com</p>
                        <p>support@hastech.company</p>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-md-12 order-2 order-lg-1">
                <div className="contact-form-content">
                    <h3 className="contact-page-title" style={{fontFamily:'"Lato", sans-serif',color:'#333333'}}>Tell Us Your Message</h3>
                    <div className="contact-form">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="" style={{fontFamily:'"Lato", sans-serif',color:'#595959'}}>Your Name 
                                <span className="required">*</span>
                                </label>
                                <input type="text"  value={formData.Name} onChange={(e)=>setFormData({...formData,Name:e.target.value})}  style={{color:'#888888'}} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="" style={{fontFamily:'"Lato", sans-serif',color:'#595959'}}>Your Email 
                                <span className="required">*</span>
                                </label>
                                <input type="email" value={formData.Email} onChange={(e)=>setFormData({...formData,Email:e.target.value})}  style={{color:'#888888'}} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="" style={{fontFamily:'"Lato", sans-serif',color:'#595959'}}>Subject 
                                
                                </label>
                                <input type="text"  value={formData.Subject} onChange={(e)=>setFormData({...formData,Subject:e.target.value})}  style={{color:'#888888'}} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="" style={{fontFamily:'"Lato", sans-serif',color:'#595959'}}>Your Message 
                                
                                </label>
                               <textarea  id="" value={formData.Message} onChange={(e)=>setFormData({...formData,Message:e.target.value})} cols="30" rows="10"></textarea>
                            </div>
                            <div className="form-group">
                                <button type="submit"  id="submit" className="hiraola-contact-form_btn" name="submit">Send</button>
                            </div>
                        </form>
                        <p className="form-message mt-3 mb-0" style={{fontFamily:'"Lato", sans-serif',color:'#595959',fontSize:'16px',lineHeight:'24px'}}></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <FooterHome/>
    </div>
 
)
}
export default Contact;