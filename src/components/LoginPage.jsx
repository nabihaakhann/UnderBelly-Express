import {useState} from 'react';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

export default function LoginPage(){
    const [showLoginForm, setShowLoginForm] = useState(true); 

    function showRegistrationForm(){
        setShowLoginForm(false);
    }

    return(
      <div id='login-page'>
        {showLoginForm ? <LoginForm register={showRegistrationForm} /> : <RegistrationForm />}
      </div>
    )
}