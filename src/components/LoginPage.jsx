import {useState} from 'react';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

export default function LoginPage(){
    const [showLoginForm, setShowLoginForm] = useState(true); 

    return(
      <div id='login-page'>
        <LoginForm />
      </div>
    )
}