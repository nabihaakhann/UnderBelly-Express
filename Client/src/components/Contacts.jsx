import React, { useState } from "react";
import {useParams} from 'react-router-dom';
import Navbar from './Navbar';
import '../index.css';
import {BiPhoneCall,BiMailSend} from 'react-icons/bi';
import {CiLocationOn} from 'react-icons/ci';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';


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
  const [show, setShow] = useState(""); 

  const clear=()=>{
    setTimeout(()=>{
       setShow("")
    }, 700);
  }
  function displayShow(text){
    setShow({
      text: text, 
      display: true
    })
  }

  const[contactForm, setContactForm] = useState({
    fname: '',
    sname: '',
    email:'',
    message:''
  })


  const setContactFormData = (name,value) =>{
    setContactForm(prevData => {
      return {
          ...prevData, 
          [name]: value
      }
  })
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    
    const { fname, sname, email, message } = e.target.elements;
    let details = {
      userId: userId,
      name: fname.value + " " + sname.value,
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
    setShow("Thank you for submission!");
    setContactForm({
      fname: '',
      sname: '',
      email:'',
      message:''
    });
    setTimeout(()=>{
      setStatus("Submit")
   }, 700);
    clear();

    
    // displayShow("Your response has been submitted");
    let result = await response.json();
    //alert(result.message);
    // clearShow("");

  };
  
  
  
  
  return (
    
    <div className="dark-background" style={divStyle}>
    
      <Navbar />

      <p className='col-heading'>Contact Us</p>
      <p className='col-heading2'>Any questions or remarks? Just write us a message!</p>
      <div className="banner">

        <div className="col">
          <div style={{display:"block",margin:"10px",padding:"50px",fontSize:"15px",backgroundColor:"black",height:"97%",borderRadius:"1rem"}}>
            <h2>Contact Information</h2>
            Contact us incase of any queries!<br/><br/>
            <div>
              <div style={{display:"flex"}}>
              <div style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}><BiPhoneCall size={25}/></div>
              <div style={{margin:"10px 30px"}}>

                  <table>
                    <tr><td> +91-9099901124</td></tr>
                    <tr><td> +91-9099901124</td></tr>
                  </table>
              </div></div>

              <div style={{display:"flex", marginTop:"20px"}}>
              <div style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}><BiMailSend size={25}/></div>
              <div style={{margin:"10px 30px"}}>
                <ul>
                  <li><table>
                    <tr><td>asmi.bhardwaj2019@vitbhopal.ac.in</td></tr>
                    <tr><td>eshaan.bahuguna2019@vitbhopal.ac.in</td></tr>
                    <tr><td>nabiha.khan2019@vitbhopal.ac.in</td></tr>
                    <tr><td>parth.sarthi2019@vitbhopal.ac.in</td></tr>
                  </table></li>
                </ul>
              </div></div>



              <div style={{display:"flex", marginTop:"20px"}}>
              <div style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}><CiLocationOn size={25}/></div>
              <div style={{margin:"10px 30px"}}>
              <ul>
                  <li><table>
                    <tr><td>Vit Bhopal University, Kotri Kalan,</td></tr>
                    <tr><td>Ashta, Near Indore Road, Bhopal,</td></tr>
                    <tr><td>Madhya Pradesh 466114</td></tr>
                  </table></li>
                </ul>
              </div></div>


              <div style={{display:"flex", marginTop:"20px"}}>
              <div style={{display:'flex', justifyContent: 'center', alignItems: 'center',margin:"10px"}}><TwitterIcon size={25}/></div>
              <div style={{display:'flex', justifyContent: 'center', alignItems: 'center',margin:"10px"}}><InstagramIcon size={25}/></div>
              <div style={{display:'flex', justifyContent: 'center', alignItems: 'center',margin:"10px"}}><FacebookIcon size={25}/></div></div>

               

            </div>
          </div>
        </div>




        <div className="col">
          
          <form onSubmit={handleSubmit} style={{padding:"1rem", float:"center"}}>
            <div>
              <label name ="fname" class="custom-field">
                <input type="text" id="fname" placeholder=" " value={contactForm.fname} onChange={event => setContactFormData("fname",event.target.value)} required />
                <span className="placeholder">First Name</span>
              </label>
              <label  name ="sname" class="custom-field">
                <input type="text" id="sname" placeholder=" "  value={contactForm.sname} onChange={event => setContactFormData("sname",event.target.value)} required />
                <span className="placeholder">Last Name</span>
              </label>
            </div>


           
            <div>
              <label email="email" className="custom-field">
                <input type="email" id="email" placeholder=" " value={contactForm.email} onChange={event => setContactFormData("email",event.target.value)} required />
                <span className="placeholder">Email</span>
              </label> 
            </div>

            
            <div>
              <label message="message" className="custom-field">
                <textarea id="message" placeholder=" " value={contactForm.message} onChange={event => setContactFormData("message",event.target.value)} required />
                <span className="placeholder">Your Message</span>
              </label>
            </div>
            <button className="btn" type="submit">{status}</button>
            <div className="form-message">{show}</div>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default ContactPage;
