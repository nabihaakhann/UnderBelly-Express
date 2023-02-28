import { useState } from "react";

import {Input, Button, Colors, MessageBox, HighlightedText} from '../../ui/ui';

export default function RegistrationForm({showOutput, clearOutput, setOutput, login}){
    // Form Handling
    const [registrationFormData, setRegistrationFormData] = useState({
        email: '', 
        registrationNumber: '', 
        password: '', 
        confirmPassword: '',
        checkboxValue: false
    })

    function setFormData(name, value){
        setRegistrationFormData(prevData => {
            return {
                ...prevData, 
                [name]: value
            }
        })
    }

    function checkRegistrationNumber(number){
        const   checkDigits = /^\d{2}\w{3}\d{5}$/, 
                testOne = checkDigits.test(number),
                checkLetters = /[A-Z][A-Z][A-Z]/,
                testTwo = checkLetters.test(number.substring(2, 5));

        if(number.length === 10 && testOne && testTwo){
            return true;
        }
        return false;
    }

    function onSubmitRegistrationForm(){
        console.table(registrationFormData);

        // Registration Form Validation 
        const emailValidation = /@vitbhopal.ac.in$/
        let message = 'Account Successfully created!';

        const   validPassword = registrationFormData.password.length !== 0,
                samePassword = registrationFormData.password === registrationFormData.confirmPassword,
                validEmail = emailValidation.test(registrationFormData.email), 
                validRegistrationNumber = checkRegistrationNumber(registrationFormData.registrationNumber), 
                isChecked = registrationFormData.checkboxValue === true;

        if(!validPassword){
            message = 'Entered Password is Invalid';
        }        
        if(!samePassword){
            message = 'Password do not match';
        }
        if(!validEmail){
            message = 'Entered Email Id is Invalid';
        }
        if(!validRegistrationNumber){
            message = 'Entered Registration Number is incorrect';
        }
        if(!isChecked){
            message = 'Agreement to our terms & policies is mandatory';
        }

        if(message.indexOf('Successfully') !== -1){
           fetch('/register', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(registrationFormData)
           })
           .then(response => response.json())
           .then(response => {
                setOutput(response.responseMessage);
           })

        }
        else{
            setOutput(message);
        }

        // Remove Message Box
        clearOutput();
    }

    const divStyle = {
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        paddingTop: '13rem',
    }


    return (
        <div style={divStyle}>
            {showOutput.display && <MessageBox>{showOutput.text}</MessageBox>}

            <div className="form-wrapper card-dark" style={{paddingBottom: '5rem'}}>
                <Input 
                    labelText='Email' 
                    placeholder='Enter your email address' 
                    type='email' 
                    name='email'
                    value={registrationFormData.email}
                    handleChange={setFormData}
                />        
                <Input 
                    labelText='Registration Number' 
                    placeholder='Enter your registration number' 
                    type='text' 
                    name='registrationNumber'
                    value={registrationFormData.registrationNumber}
                    handleChange={setFormData}
                />        
                <Input 
                    labelText='Create Password'  
                    type='password' 
                    name='password'
                    value={registrationFormData.password}
                    handleChange={setFormData}
                />        
                <Input 
                    labelText='Confirm Password' 
                    type='password' 
                    name='confirmPassword'
                    value={registrationFormData.confirmPassword}
                    handleChange={setFormData}
                />     

                <div style={{display: 'flex', justifyContent: 'space-between', padding: '0 1rem', gap: '1rem'}}>
                    <input type='checkbox' style={{display: 'inline-block', marginBottom: '1.3rem'}} checked={registrationFormData.checkboxValue} onClick={()=> setFormData('checkboxValue', !registrationFormData.checkboxValue)}/> 
                    <p style={{display: 'inline-block'}}>By creating an Account, I agree to the terms and conditions & privacy policy</p>
                </div>


                <Button 
                    color={Colors.primaryColor} 
                    hoverColor={Colors.primaryColorDark} 
                    onButtonPress={onSubmitRegistrationForm}
                    margin={{margin: '1rem'}}
                > Register </Button>
            
                <div>
                    <p>
                        Already have an account? 
                        <HighlightedText><strong onClick={login}>Log In</strong></HighlightedText>
                    </p>
                </div>
            </div>
        </div>
    )
}