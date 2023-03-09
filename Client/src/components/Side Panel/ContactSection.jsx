import { useState } from "react";
import { TextField, Button, IconButton } from "@mui/material";
import { grey, orange } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";


export default function ContactSection({userId, userInfo, loadUserData, setAlert, setSnackBar, clearSnackBar}){
    const [editContactNumber, setEditContactNumber] = useState({
        edit: false, 
        newContactNumber: ''
    });

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
        <>
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
                            <Button 
                                color='warning'
                                variant="outlined"
                                onClick={saveContactNumber}
                            >Save</Button>
                        </div>
                        <Button 
                            color="warning"
                            sx={{
                            marginTop: '3px'
                        }}
                            onClick={displayContactNumberForm}
                        >Cancel</Button>
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
        </>
    )
}