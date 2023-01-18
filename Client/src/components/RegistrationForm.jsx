import { useState } from "react";

import {Input, Button, Colors} from '../ui/ui';

export default function RegistrationForm(){
    const [registraionFormData, setRegistrationFormData] = useState({
        email: '', 
        registrationNumber: '', 
        password: '', 
        confirmPassword: ''
    })

    function setFormData(name, value){
        setRegistrationFormData(prevData => {
            return {
                ...prevData, 
                [name]: value
            }
        })
    }

    function onSubmitRegistrationForm(){
        console.table(registraionFormData);
    }

    return (
        <div className="form-wrapper card" style={{paddingBottom: '5rem'}}>
             <Input 
                labelText='Email' 
                placeholder='Enter your email address' 
                type='email' 
                name='email'
                value={registraionFormData.email}
                handleChange={setFormData}
            />        
             <Input 
                labelText='Registration Number' 
                placeholder='Enter your registration number' 
                type='text' 
                name='registrationNumber'
                value={registraionFormData.registrationNumber}
                handleChange={setFormData}
            />        
             <Input 
                labelText='Create Password'  
                type='password' 
                name='password'
                value={registraionFormData.password}
                handleChange={setFormData}
            />        
             <Input 
                labelText='Confirm Password' 
                type='password' 
                name='confirmPassword'
                value={registraionFormData.confirmPassword}
                handleChange={setFormData}
            />     

            <Button 
                color={Colors.primaryColor} 
                hoverColor={Colors.primaryColorDark} 
                onButtonPress={onSubmitRegistrationForm}
            > Register </Button>
        </div>
    )
}