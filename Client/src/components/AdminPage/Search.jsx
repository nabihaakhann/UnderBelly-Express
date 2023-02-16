import { Colors } from "../../ui/ui";
import ShowUserData from "./ShowUserData";

import { Radio, TextField, Button, Alert } from "@mui/material";
import { useState } from "react";

export default function Search({showAlert, displayAlert, clearAlert}){
    const [searchForm, setSearchForm] = useState({
        type: 'user', 
        search: ''
    });
    const [showSearchOutput, setSearchOutput] = useState({
        display: false, 
        output: null
    });


    function onSubmitSearchForm(){
        if(searchForm.type === 'user'){
            fetch(`/admin/getUserData/${searchForm.search}`)
            .then(response => response.json())
            .then(response => {
                if(response.success){
                    setSearchOutput({
                        display: true, 
                        output: response.userData
                    })
                }
                else{
                    displayAlert(response.message, 'error')
                }
            })
        }
        else{

        }
    }

    function onDeleteUserData(message){
        // Removing the search text 
        setSearchForm(prevData => {
            return {
                ...prevData, 
                search: ''
            }
        })

        // Displaying Alert 
        displayAlert(message, 'success');
        clearAlert();

        // Clearing out the result from screen
        setTimeout(()=> {
            setSearchOutput({
                display: false, 
                output: null
            })
        }, 3000);
    }


    // Styling object
    const styles = {
        columnAlignment: {
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center'
        }, 
        rowAlignment: {
            display: 'flex', 
            justifyContent: 'space-between'
        }
    }

    return (
        <div  style={styles.columnAlignment}> 
            <div style={{width: '40%', marginBottom: '1rem',  ...styles.rowAlignment, alignSelf: 'start', paddingLeft: '1.5rem'}}>
                <div>
                    <Radio 
                        value='user'
                        checked={searchForm.type === 'user'}
                        onChange={(event)=> setSearchForm({type: event.target.value, search: ''})}
                        sx={{
                            color: 'grey', 
                            '&.Mui-checked': {
                                color: Colors.primaryColor
                            }
                        }}
                    />
                    <label style={{color: 'black'}}>User</label>
                </div>
                <div>
                    <Radio 
                        value='menu-item'
                        checked={searchForm.type === 'menu-item'}
                        onChange={(event)=> setSearchForm({type: event.target.value, search: ''})}
                        sx={{
                            color: 'grey',
                            '&.Mui-checked': {
                                color: Colors.primaryColor
                            }
                        }}
                    />
                    <label style={{color: 'black'}}>Menu Item</label>
                </div>
            </div>

            <div style={{width: '100%', ...styles.rowAlignment, padding: '0 2rem'}}>
                <TextField 
                    type='search'
                    label='Search'
                    variant='filled'
                    size='small'
                    color="warning"
                    sx={{
                        width: '80%',
                        marginRight: '2rem'
                    }}
                    onChange={event => {
                        const value = event.target.value;

                        setSearchForm(prevData => {
                            return {
                                ...prevData, 
                                search: value
                            }
                        })
                    }}
                />

                <Button color='warning' variant='text' onClick={onSubmitSearchForm}>Search</Button>
            </div>           

            {showSearchOutput.display && searchForm.type === 'user'? 
                <ShowUserData 
                    userData={showSearchOutput.output}
                    styles={styles.columnAlignment}
                    onDeleteButtonPress={onDeleteUserData}
                /> : null
            }

            {
                showAlert.display && <div style={styles.alertWrapper}>
                    <Alert severity={showAlert.type}>{showAlert.message}</Alert>
                </div>
            }
        </div>
    )
}