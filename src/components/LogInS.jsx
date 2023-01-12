import React from "react";
import "./LogInS.css";
import { Link } from "react-router-dom";
import StuInput from './StuInput';
import { useState } from "react";
  
  //LogIn for Students

const LogInS = () => {
  const [values,setValues] = useState({
    Registration_Number:"",
    Password:"",
  });

  const inputs = [
    {
      id:1,
      name:"Registration_Number",
      type:"text",
      placeholder:"Enter Your Registration Number",
      errorMessage:"Registration Number should be 10 characters and shouldn't include any special character(s)",
      label:"Registration Number",
      pattern:"^[0-9A-Za-z]{10}$",
      required: true,
    },
    {
      id:2,
      name:"Password",
      type:"password",
      placeholder:"Enter Your Password",
      errorMessage:"Password should be 8-20 characters, including at least a letter, a number, and a special character",
      label:"Password",
      pattern:`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];
 
  const handleSubmit = (e) => {
    e.preventDefault();
  };
 
  const onChange = (e)=>{
    setValues({...values, [e.target.name]: e.target.value });
  };
 
  console.log(values);


  return (
    <div className="app">
      <form className="formS" onSubmit={handleSubmit}>
        <h1>Welcome Back</h1>


        
      {inputs.map((input) => (
        <StuInput
        key={input.id}
        {...input}
        value={values[input.name]}
        onChange={onChange}/>
      ))}
      <button className="btn">
          LOGIN
        </button>
        <label htmlFor="agree" className="terms"> New to UB Express? <Link to="/Reg">Register Here</Link> </label>
    </form>
    </div>
  );
};
  
export default LogInS;