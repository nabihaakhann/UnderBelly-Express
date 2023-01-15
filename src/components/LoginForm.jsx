import '../index.css';
import {Colors, Button, Divider, Input}  from '../ui/ui';

import {FormControlLabel, Checkbox} from '@mui/material';

export default function LoginForm(){
    // Styling objects
    const checkboxStyle = {
        width: '80%', 
        display: 'flex', 
        justifyContent: 'space-between', 
        margin: '2rem', 
        fontSize: '1.2rem'
    }

    return (
       <div className='form-wrapper card'>
            <p className='heading'>Welcome Back</p>
            <Divider width='28%' />
            <div style={checkboxStyle}>
                {/* <div>
                    <input type='checkbox' id='admin-checkbox' className='input-checkbox'></input>
                    <label for='admin-checkbox'>Admin</label>
                </div>
                <div>
                    <input type='checkbox' id='student-checkbox'></input>
                        <label for='student-checkbox'>Student</label>
                </div> */}
                <FormControlLabel control={<Checkbox />} label='Admin' sx={{color: '#fff'}} />
                <FormControlLabel control={<Checkbox defaultChecked/>} label='Student' color='danger'/>
            </div>

            <Input labelText='Registration Number' placeholder='Enter your username' type='text' />
            <Input labelText='Password' placeholder='Enter your password' type= 'password' />

            <p style={{alignSelf: 'end', marginBottom: '1rem'}}>Forgot Password?</p>
            <Button color={Colors.primaryColor} hoverColor={Colors.primaryColorDark} >Login</Button>
            <p style={{fontWeight: 200, marginBottom: '5rem'}}>New to UB EXPRESS? <strong>Register</strong> Here</p>
       </div>
    )
}

