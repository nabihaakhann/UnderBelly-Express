import React, { useState } from "react";
import {useParams} from 'react-router-dom';

const ContactForm = () => {
  
  const [status, setStatus] = useState("Submit");
  const {userId} = useParams();
  
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
    alert(result.status);
  };
  
  
  
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" required />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea id="message" required />
      </div>
      <button type="submit">{status}</button>
    </form>
//take button from ui
//divider
//navbar
//background image ni css file
  );
};

export default ContactForm;
