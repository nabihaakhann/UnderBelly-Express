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



   //show box
  const [show, setShow] = useState({
    text: '', 
    display: false
  }); 

  const clearShow=()=>{
    setTimeout(()=>{
       setShow({
            text: '', 
            display: false
        })
    }, 1000);
  }
  function displayShow(text){
    setShow({
      text: text, 
      display: true
    })
  }

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
    displayShow("Your response has been submitted");
    let result = await response.json();
    alert(result.message);
    clearShow("");

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
              <div>Phone : </div>
              <div style={{margin:"20px"}}>
                <ul>
                  <li><table>
                    <tr><td>Eshaan :</td><td> +91-9099901124</td></tr>
                    <tr><td>Eshaan : </td><td> +91-9099901124</td></tr>
                    <tr><td>Eshaan : </td><td> +91-9099901124</td></tr>
                    <tr><td>Eshaan : </td><td> +91-9099901124</td></tr>
                  </table></li>
                </ul>
              </div>
              <div>Email: </div>
              <div style={{margin:"20px"}}>
                <ul>
                  <li><table>
                    <tr><td>Eshaan : </td><td> +91-9099901124</td></tr>
                    <tr><td>Eshaan : </td><td> +91-9099901124</td></tr>
                    <tr><td>Eshaan : </td><td> +91-9099901124</td></tr>
                    <tr><td>Eshaan : </td><td> +91-9099901124</td></tr>
                  </table></li>
                </ul>
              </div>
          

            </div>
          </div>
        </div>




        <div className="col">
          <p className='col-heading'>Contact Us</p>
          <form onSubmit={handleSubmit} style={{padding:"1rem", float:"center",margin:"10px",height:"97%"}}>
            <div>
              <label name="name" className="form-item" value={contactForm.name} handleChange={setContactFormData}>Name:</label>
              <input className="form-field" type="text" id="name" required />
            </div>
            <div>
              <label email="email"className="form-item" value={contactForm.email} handleChange={setContactFormData}>Email:</label>
              <input className="form-field" type="email" id="email" required />
            </div>
            <div>
              <label message="message" className="form-item" value={contactForm.message} handleChange={setContactFormData}>Message:</label>
              <textarea className="form-field" id="message" required />
            </div>
            <button className="btn" type="submit">{status}</button>
            <div className="form-message">{show.message}</div>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default ContactPage;
