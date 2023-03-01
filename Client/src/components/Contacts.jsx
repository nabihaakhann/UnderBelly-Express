import React, { useState } from "react";
import {useParams} from 'react-router-dom';
import Navbar from './Navbar';
import '../index.css';


const ContactPage = () => {


  const divStyle = {
    paddingBottom: '3rem',
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center'
 }


  
  const [status, setStatus] = useState("Submit");
  const {userId} = useParams();

  const[contactForm, setContactForm] = useState({
    name:'',
    email:'',
    message:''
  })


  const setContactFormData = (event) =>{
    setContactForm(event.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { name, email, message } = e.target.elements;
    let details = {
      userId: userId,
      name: name.value,
      email: email.value,
      message: message.value,
    };
    
    let response = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    
    setStatus("Submit");
    let result = await response.json();
    alert(result.message);

  };
  
  
  
  
  return (
    
    <div className="dark-background" style={divStyle}>
    
      <Navbar />
      <div className="banner">

        <div className="col">
          <div style={{display:"block",margin:"10px",padding:"50px",fontSize:"15px",backgroundColor:"black",height:"97%",borderRadius:"1rem"}}>
            <h2>Contact Information</h2><br/><br/>
            Contact us incase of any queries!<br/><br/>
            <div>
              <div>Phone</div>
              <div style={{display:"block"}}>+91-091-0911  +91999999999</div>
            </div>
          </div>
        </div>




        <div className="col">
          <form onSubmit={handleSubmit} style={{padding:"1rem", float:"center",margin:"10px",height:"97%"}}>
            <div>
              <label name="name" className="form-item" value={contactForm.name} handleChange={setContactFormData}>Name:</label>
              <input stygle={{textDecoration:"none"}} type="text" id="name" required />
            </div>
            <div>
              <label email="email"className="form-item" value={contactForm.email} handleChange={setContactFormData}>Email:</label>
              <input type="email" id="email" required />
            </div>
            <div>
              <label message="message" className="form-item" value={contactForm.message} handleChange={setContactFormData}>Message:</label>
              <textarea id="message" required />
            </div>
            <button className="btn" type="submit">{status}</button>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default ContactPage;
