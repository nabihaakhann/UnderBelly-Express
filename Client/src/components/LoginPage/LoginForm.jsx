import '../../index.css';
import {
    Colors, 
    Button, 
    Divider, 
    Input, 
    HighlightedText, 
    MessageBox
}  from '../../ui/ui';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Radio} from '@mui/material';

export default function LoginForm({register, setOutput, clearOutput, showOutput}){
    const [loginFormData, setLoginFormData] = useState({
        email: '', 
        password: '', 
    })
    const [selectedUserLevel, setSelectedUserLevel] = useState('student');

    // For Redirecting to another url
    const navigate = useNavigate();

    function setFormData(name, value){
        setLoginFormData(prevData => {
            return {
                ...prevData, 
                [name]: value
            }
        })
    }

    function onSubmitLoginForm(){
        console.table(loginFormData);
        console.log('User level selected: ' + selectedUserLevel);

        if(loginFormData.email.length !== 0 && loginFormData.password.length !== 0){
            if(selectedUserLevel === 'student'){
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
        
                    if(response.success){
                        navigate(`/${response.userId}/categories`);
                    }
                })
            }
            else{
                fetch('/login/admin', {
                    method: 'POST', 
                    headers: {'Content-Type': 'application/json'}, 
                    body: JSON.stringify(loginFormData)
                })
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                    setOutput(response.responseMessage);
                    clearOutput();

                    if(response.success){
                        navigate(`/${response.userId}/admin`)
                    }
                })
            }
        }
        else{
            setOutput('Blank Email or Password Detected');
            clearOutput();
        }

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

            <div className='form-wrapper card-dark'>
                <p className='heading'>Welcome Back</p>
                <Divider width='28%' />

                <div style={checkboxWrapper}>
                    <div>
                        <Radio 
                            value='admin'
                            checked={selectedUserLevel === 'admin'}
                            onChange={(event)=> setSelectedUserLevel(event.target.value)}
                            sx={{
                                color: 'white', 
                                '&.Mui-checked': {
                                    color: Colors.primaryColor
                                }
                            }}
                        />
                        <label for='admin-checkbox' style={{fontWeight: '200'}}>Admin</label>
                    </div>
                    <div>
                        <Radio 
                            value='student'
                            checked={selectedUserLevel === 'student'}
                            onChange={(event)=> setSelectedUserLevel(event.target.value)}
                            sx={{
                                color: 'white',
                                '&.Mui-checked': {
                                    color: Colors.primaryColor
                                }
                            }}
                        />
                        <label for='student-checkbox' style={{fontWeight: '200'}}>Student</label>
                    </div>
                </div>

                <Input 
                    labelText='Email' 
                    placeholder='Enter your email' 
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

                <HighlightedText style={{alignSelf: 'end', marginBottom: '1rem'}}>Forgot Password?</HighlightedText>

                <Button 
                    color={Colors.primaryColor} 
                    hoverColor={Colors.primaryColorDark} 
                    onButtonPress={onSubmitLoginForm}
                    margin={{marginTop: '2rem', marginBottom: '1rem', }}
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

