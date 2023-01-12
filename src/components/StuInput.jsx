import "./StuInput.css";
import {useState} from "react";
 
const StuInput = (props) => {
  const[focused,setFocused]=useState(false);
  const{label, errorMessage, onChange, id, ...inputProps}=props;
 
  const handleFocus=(e)=>{
    setFocused(true);
  };
 
  return(
    <div className="stu">
      <label>{label}</label>
      <input className="inputS"
         {...inputProps}
         onChange={onChange}
         onBlur={handleFocus}
         onFocus={()=>
          inputProps.name==="Confirm_Password" && setFocused(true)}
         focused={focused.toString()} />
      <span>{errorMessage}</span>
    </div>
  )
}
 
 
export default StuInput; 