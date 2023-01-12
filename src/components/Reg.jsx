import './Reg.css';
import FormInput from './FormInput';
import { useState } from "react";
 
const Reg = () => {
  const [values,setValues] = useState({
    Email:"",
    Registration_Number:"",
    Create_Password:"",
    Confirm_Password:"",
  })
 
  const [agree, setAgree] = useState(false);
 
  const checkboxHandler = () => {
    // if agree === true, it will be set to false
    // if agree === false, it will be set to true
    setAgree(!agree);
    // Don't miss the exclamation mark
  }
 
  const btnHandler = () => {
    alert('Registered Successfully!');
  }
 
  ;
 
  const inputs = [
    {
      id:1,
      name:"Email",
      type:"email",
      placeholder:"Enter Your Email Address",
      errorMessage:"Email should contain @vitbhopal.ac.in",
      label:"Email",
      pattern:"^[a-z0-9]{@vitbhopal.ac.in}$",
      required: true,
    },
    {
      id:2,
      name:"Registration_Number",
      type:"text",
      placeholder:"Enter Your Registration Number",
      errorMessage:"Registration Number should be 10 characters and shouldn't include any special character(s)",
      label:"Registration Number",
      pattern:"^[0-9A-Za-z]{10}$",
      required: true,
    },
    {
      id:3,
      name:"Create_Password",
      type:"password",
      placeholder:"",
      errorMessage:"Password should be 8-20 characters, including at least a letter, a number, and a special character",
      label:"Create Password",
      pattern:`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id:4,
      name:"Confirm_Password",
      type:"password",
      placeholder:"",
      errorMessage:"Passwords don't match!",
      label:"Confirm Password",
      pattern: values.Create_Password,
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
 
  return <div className="app">
    <form onSubmit={handleSubmit}>
      {inputs.map((input) => (
        <FormInput
        key={input.id}
        {...input}
        value={values[input.name]}
        onChange={onChange}/>
      ))}
       <input type="checkbox" id="agree" onChange={checkboxHandler} />
          <label htmlFor="agree" className="terms"> By creating an account, I agree to the terms and <br></br>conditions & privacy policy</label>
          <button disabled={!agree} className="btn" onClick={btnHandler}>
          REGISTER
        </button>
    </form>
   
  </div>;
};
 
export default Reg;