import {useState} from 'react';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

export default function LoginPage(){
  // Show Login & Registration Form
  const [showLoginForm, setShowLoginForm] = useState(true); 

  function showRegistrationForm(){
    setShowLoginForm(false);
  }

  //Show Message/Alert Box
  const [showMessageBox, setMessageBox] = useState({
    text: '', 
    display: false
  }); 

  function clearMessageBox(){
    setTimeout(()=>{
        setMessageBox({
            text: '', 
            display: false
        })
    }, 3000);
  }

  function displayMessageBox(text){
    setMessageBox({
      text: text, 
      display: true
    })
  }

  return(
    <div id='login-page'>
      {showLoginForm ? 
        <LoginForm 
          register={showRegistrationForm} 
          showOutput={showMessageBox} 
          clearOutput={clearMessageBox}
          setOutput={displayMessageBox}
        /> : 
        <RegistrationForm 
          showOutput={showMessageBox}
          clearOutput={clearMessageBox}
          setOutput={displayMessageBox}
        />}
    </div>
  )
}