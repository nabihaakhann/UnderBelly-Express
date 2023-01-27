import '../index.css';
import {
    Colors, 
    Button, 
    Divider, 
    Input, 
    HighlightedText, 
    MessageBox
}  from '../ui/ui';

import { useState } from 'react';

export default function LoginForm({register, setOutput, clearOutput, showOutput}){
    const [loginFormData, setLoginFormData] = useState({
        email: '', 
        password: '', 
        user: 'student'
    })

    function setFormData(name, value){
        setLoginFormData(prevData => {
            return {
                ...prevData, 
                [name]: value
            }
        })
    }

    function addCheckboxValue(id){
        if(id.indexOf('admin') !== -1){
            setLoginFormData(prevData => {
                return {
                    ...prevData, 
                    user: 'admin'
                }
            })
        }
    }

    function onSubmitLoginForm(){
        console.table(loginFormData);

        fetch('/login', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(loginFormData)
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setOutput(response.responseMessage);
            clearOutput();
        })
    }

    // Styling objects
    const checkboxWrapper = {
        width: '80%', 
        display: 'flex', 
        justifyContent: 'space-between', 
        margin: '2rem', 
        fontSize: '1.2rem'
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

            <div className='form-wrapper card'>
                <p className='heading'>Welcome Back</p>
                <Divider width='28%' />

                <div style={checkboxWrapper}>
                    {/* Make elements radio instead of checkbox */}
                    <div>
                        <input type='checkbox' id='admin-checkbox' className='input-checkbox' onClick={event => addCheckboxValue(event.target.id)}/>
                        <label for='admin-checkbox' style={{fontWeight: '200'}}>Admin</label>
                    </div>
                    <div>
                        <input type='checkbox' id='student-checkbox' className='input-checkbox' checked onClick={event => addCheckboxValue(event.target.id)}/>
                        <label for='student-checkbox' style={{fontWeight: '200'}}>Student</label>
                    </div>
                </div>

                <Input 
                    labelText='Registration Number' 
                    placeholder='Enter your username' 
                    type='email' 
                    name='email'
                    value={loginFormData.email}
                    handleChange={setFormData}
                />
                <Input 
                    labelText='Password' 
                    placeholder='Enter your password' 
                    type= 'password' 
                    name='password'
                    value={loginFormData.password}
                    handleChange={setFormData}
                />

                <p style={{alignSelf: 'end', marginBottom: '1rem'}}>Forgot Password?</p>

                <Button 
                    color={Colors.primaryColor} 
                    hoverColor={Colors.primaryColorDark} 
                    onButtonPress={onSubmitLoginForm}
                    > Login </Button>
                
                <p style={{fontWeight: 200, marginBottom: '5rem'}}>
                    New to UB EXPRESS? 
                    <strong onClick={register}> 
                        <HighlightedText>Register</HighlightedText>
                    </strong> Here
                </p>
            </div>
        </div>
    )
}

