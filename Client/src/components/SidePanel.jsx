import { Fab, IconButton, TextField, Button as MuiButton, Snackbar, Alert, Radio } from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import GridViewIcon from '@mui/icons-material/GridView';
import BusinessIcon from '@mui/icons-material/Business';
import { grey, orange } from "@mui/material/colors";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { Button, Colors, Divider } from "../ui/ui";

export default function SidePanel({userInfo, displaySidePanel, loadUserData}){
    const [editContactNumber, setEditContactNumber] = useState({
        edit: false, 
        newContactNumber: ''
    });

    const [userAddresses, setUserAddresses] = useState(userInfo.addresses);
    const [addNewAddress, setAddNewAddress] = useState({
        display: false, 
        newAddress: ''
    });

    const [showSnackBar, setSnackBar] = useState(false)
    const [alert, setAlert] = useState({
        type: 'error',
        message: ''
    })
    const {userId} = useParams();

    function clearSnackBar(){
        setTimeout(()=>{
            setSnackBar(false);
        }, 2000);
    }

    function displayContactNumberForm(){
        setEditContactNumber(prev => {
            return {
                    edit: prev.edit? false: true,
                    newContactNumber: ''
                }
        })
    }

    function saveContactNumber(){
        if(editContactNumber.newContactNumber && editContactNumber.newContactNumber.length === 10){
            fetch('/saveNewContactNumber', {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    userId: userId,
                    contactNumber: editContactNumber.newContactNumber
                })
            })
            .then(response => response.json())
            .then(response => {
                setSnackBar(true);
                if(response.success){
                    setAlert({type: 'success', message: response.message});

                    loadUserData();
                }
                else{
                    setAlert({type: 'error', message: response.message});
                }
            })
        }
        else{
            setSnackBar(true);
            setAlert({type: 'error', message: 'Entered Contact Number is Invalid'});
        }
        
        clearSnackBar();
    }

    function setNewDefaultAddress(id){
        setUserAddresses(prevAddresses => {
            return (
                prevAddresses.map(address => {
                    if(address._id === id){
                        address.default = true;
                    }
                    else{
                        address.default = false;
                    }
                    return address;
                })
            )
        })

        // Save the updated Default Address in the DB
        fetch('/updateDefaultAddress', {
            method: 'PUT', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                addressId: id, 
                userId: userId
            })
        })
        .then(response => response.json())
        .then(response => {
            if(response.success){
                console.log(response.message);
            }
        })
    }
    
    function onAddAddressButtonPress(){
        if(addNewAddress.display && addNewAddress.newAddress){
            fetch('/addNewAddress', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    userId: userId,
                    newAddress: {
                        address: addNewAddress.newAddress, 
                        default: userInfo.addresses.length === 0 ? true: false
                    }
                })
            })
            .then(response => response.json())
            .then(response => {
                setSnackBar(true);
                if(response.success){
                    setAlert({type: 'success', message: response.message});
                    loadUserData();
                }
                else{
                    setAlert({type: 'error', message: response.message});
                }

                clearSnackBar();
            })
        }
        else if(addNewAddress.display && !addNewAddress.newAddress){
            setSnackBar(true);
            setAlert({type: 'error', message: 'Address Cannot Be Empty'});
            clearSnackBar();
        }
        else if(addNewAddress.display === false){
            setAddNewAddress(prev => {
                return {
                    ...prev, 
                    display: true
                }
            });

        }
    }

    function closeAddNewAddress(){
        setAddNewAddress(prev => {
            return {
                ...prev, 
                display: false
            }
        })
    }

    // Styling object
    const styles= {
        editOptionsStyle: {
            color: grey[500],
            '&:hover': {
                color: orange[800]
            }
        },
        textfieldStyle: {
            background: '#D1CCCC'
        }
    }


    return (
        <div id="side-panel" className="column-alignment">
            <ArrowForwardIosIcon style={{alignSelf: 'end', cursor: 'pointer', marginBottom: '1rem'}} onClick={displaySidePanel}/>
            
            {/* User Profile Photo Section */}
            <div style={{position: 'relative', marginBottom: '1.5rem'}}>
                <img 
                    src={`data:${userInfo.imageType};base64,${userInfo.userImage}`}
                    style={{height: '9rem', width: '9rem'}}
                />
                <Fab color="warning" sx={{
                    position: 'absolute', 
                    bottom: '-5px',
                    right: '0'
                }}>
                    <CameraAltIcon />
                </Fab>
            </div>
            <p> {userInfo.registrationNumber} </p>

            {/* Contact Form */}
            {editContactNumber.edit ? 
                <div className="column-alignment" style={{width: '90%'}}>
                    <TextField 
                        label='New Number'
                        variant="filled"
                        number
                        value={editContactNumber.newContactNumber}
                        onChange={event => {
                            const currValue = event.target.value;
                            setEditContactNumber(prevDetails => {
                                return ({
                                    ...prevDetails,
                                    newContactNumber: currValue
                                })
                            })
                        }}
                        color='warning'
                        sx={{
                            ...styles.textfieldStyle,
                            width: '80%'
                        }}
                    />
                    
                    <div className="row-alignment" style={{width: '100%', alignItems: 'center', marginTop: '1rem', padding: '0 3rem'}}>
                        <div style={{width: '30%'}}>
                            <MuiButton 
                                color='warning'
                                variant="outlined"
                                onClick={saveContactNumber}
                            >Save</MuiButton>
                        </div>
                        <MuiButton 
                            color="warning"
                            sx={{
                            marginTop: '3px'
                        }}
                            onClick={displayContactNumberForm}
                        >Cancel</MuiButton>
                    </div>
                </div>
                : 
                <p style={{marginBottom: '1rem'}}>Contact Number: {userInfo.contactNumber ? userInfo.contactNumber : <em>Add Number</em>} 
                    <span>
                        <IconButton onClick={displayContactNumberForm}  size='small'
                        style={{marginLeft: '1rem', transform: 'translateY(-3px)', }}>
                                <EditIcon 
                                    sx={styles.editOptionsStyle}
                                />
                        </IconButton>
                    </span>
                </p>
            }

            <Divider />

            {/* Address Section */}
            <p className="row-alignment" style={{ alignSelf: 'start', marginTop: '2rem'}}>
                <BusinessIcon fontSize='large'/>
                <span style={{marginLeft: '1rem', paddingTop: '0.5rem'}}>My Addresses</span>
            </p>

            <div id='address-section'>
                {userAddresses.length > 0 ? 
                    userAddresses.map((address)=>{
                        return (
                            <div key={address._id} className='row-alignment'>
                                <Radio 
                                    checked={address.default}
                                    value={address._id}
                                    onChange={event => setNewDefaultAddress(event.target.value)}
                                    sx={{
                                        color: 'white', 
                                        '&.Mui-checked': {
                                            color: Colors.primaryColor
                                        }
                                    }}
                                />
                                <TextField 
                                    multiline
                                    variant="outlined"
                                    value={address.address}
                                    disabled
                                    sx={{
                                        width: '88%',
                                        '& .MuiOutlinedInput-root.Mui-disabled':{
                                            // color: grey[300],

                                            '& fieldset': {
                                                borderColor: grey[600],
                                            }
                                        }, 
                                        '& .MuiInputBase-inputMultiline.Mui-disabled': {
                                            color: grey[300]
                                        },
                                        '& .MuiInputBase-root.Mui-disabled > textarea': {
                                            color: grey[300]
                                        }
                                    }}
                                />
                            </div>
                        )
                    })
                :
                    <p style={{fontSize: '1rem', textAlign: 'center'}}>No Saved Addresses</p>
                }

                {/* Add New Address Form */}
                {addNewAddress.display && 
                    <TextField 
                        multiline
                        minRows={4}
                        variant='outlined'
                        color="warning"
                        label='Enter Address'
                        onChange={event => {
                            const currValue = event.target.value;
                            setAddNewAddress(prev => {
                                return {
                                    ...prev, 
                                    newAddress: currValue
                                }
                        })}}
                        style={{width: '100%'}}
                        sx={{
                            '& .MuiOutlinedInput-root':{
                                color: grey[300],

                                '& fieldset': {
                                    borderColor: grey[600],
                                },
                                '&:hover fieldset': {
                                    borderColor: orange[800]
                                }
                            }, 
                            '& .MuiFormLabel-root': {
                                color: grey[600], 
                            },
                            '& .MuiInputLabel-formControl.Mui-focused': {
                                color: orange[800]
                            }    
                        }}
                    />
                }
                
                <div className="row-alignment">
                    <MuiButton 
                        color="warning" 
                        variant='outlined' 
                        onClick={onAddAddressButtonPress}
                    > Add Address </MuiButton>

                    {addNewAddress.display && 
                        <MuiButton 
                            color="warning"
                            onClick={closeAddNewAddress}
                        >Cancel</MuiButton>
                    }
                </div>
            </div>



            {/* Display Alert output */}
            {showSnackBar && 
                <Snackbar 
                    open={showSnackBar}
                    autoHideDuration={3000}
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                >
                    <Alert severity={alert.type} variant='filled'> 
                        {alert.message}
                    </Alert>
                </Snackbar>
            }
        </div>
    )
}