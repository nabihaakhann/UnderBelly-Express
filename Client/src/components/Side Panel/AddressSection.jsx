import { useEffect, useState } from "react";
import { TextField, Button, Radio, IconButton } from "@mui/material";
import GridViewIcon from '@mui/icons-material/GridView';
import LogoutIcon from '@mui/icons-material/Logout';
import BusinessIcon from '@mui/icons-material/Business';
import Delete from "@mui/icons-material/Delete";
import { grey, orange, red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { Colors } from "../../ui/ui";

export default function AddressSection({userId, userInfo, loadUserData, setAlert, setSnackBar, clearSnackBar}){
    const [userAddresses, setUserAddresses] = useState(userInfo.addresses);
    const [addNewAddress, setAddNewAddress] = useState({
        display: false, 
        newAddress: ''
    });

    useEffect(()=>{
        setUserAddresses(userInfo.addresses);
    }, [userInfo.addresses])

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
            setAddNewAddress({display: true, newAddress: ''});

        }
    }

    function onDeleteAddressButtonPress(id){
        fetch(`/${userId}/deleteAddress/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(response => {
            // console.log(response)
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

    function closeAddNewAddress(){
        setAddNewAddress({display: false, newAddress: ''})
    }

    const adderssesStyle = {
        color: grey[600], 
        fontSize: '1rem',
        borderColor: grey[600], 
        border: '1px solid',
        borderRadius: '5px', 
        padding: '1rem'
    }

    return (
        <>
            {/* Address Section */}
            <p className="row-alignment" style={{ alignSelf: 'start', marginTop: '2rem'}}>
                <BusinessIcon fontSize='large'/>
                <span style={{marginLeft: '1rem', paddingTop: '0.5rem'}}>My Addresses</span>
            </p>

            <div style={{width: '100%', height: '100%', justifyContent: 'space-between'}} className='column-alignment'>
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
                                    <p style={adderssesStyle}>
                                        {address.address}
                                    </p>
                                     <IconButton 
                                        style={{marginLeft: '0.5rem'}} 
                                        sx={{
                                            color: 'white', 
                                            '&:hover': {
                                                color: orange[800]
                                            }
                                        }}>
                                        <Delete 
                                            onClick={() => onDeleteAddressButtonPress(address._id)}
                                        />
                                    </IconButton>
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
                        <Button 
                            color="warning" 
                            variant='outlined' 
                            onClick={onAddAddressButtonPress}
                        > Add Address </Button>

                        {addNewAddress.display && 
                            <Button 
                                color="warning"
                                onClick={closeAddNewAddress}
                            >Cancel</Button>
                        }
                    </div>
                </div>

                <div style={{alignSelf: 'start'}}>
                    <div style={{marginBottom: '1rem'}} >
                        <Link to={`/${userId}/orders`} style={{textDecoration: 'none', color: 'inherit', alignItems: 'center'}} className='row-alignment'>
                            <GridViewIcon /> 
                            <p style={{marginLeft: '1rem'}}>My Orders</p>
                        </Link>
                    </div>
                    <div style={{marginBottom: '1rem', width: '2rem'}}>
                    <Link to={`/`} style={{textDecoration: 'none', color: 'inherit', alignItems: 'center', color: red[500]}} className='row-alignment'>
                            <LogoutIcon color="error" /> 
                            <p style={{marginLeft: '1rem'}}>Logout</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}