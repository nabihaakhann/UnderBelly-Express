import '../index.css';

import {Card, FormControlLabel, Checkbox} from '@mui/material';

export default function LoginForm(){
    // Styling objects
    const cardStyle = {
        backgroundColor: 'rgba(126, 113, 113, 0.31)', 
        color: '#fff',
        marginTop: '20rem', 
        padding: '2rem 5rem', 
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center', 
        width: '40rem'
    }, 
    checkboxStyle = {
        width: '100%', 
        display: 'flex', 
        justifyContent: 'space-between', 
        margin: '2rem'
    }

    return (
       <Card variant='outlined' sx={cardStyle}>
            <p className='login-page-title'>Welcome Back</p>
            <div className='divider'></div>
            <div style={checkboxStyle}>
                <FormControlLabel control={<Checkbox />} label='Admin' />
                <FormControlLabel control={<Checkbox defaultChecked/>} label='Student' />
            </div>
            <div style={{width: '100%'}}>
                <label for='textInput' className='label'>Registration Number</label>
                <input type='text' className='input' placeholder='Enter your username' id='textInput' />   
            </div>
            <div style={{width: '100%'}}>
                <label for='password'>Password</label>
                <input type='password' className='input' placeholder='Enter your password' id='password' />
            </div>
       </Card>
    )
}

