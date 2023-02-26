import { Colors, ImageCard } from "../../ui/ui";
import ShowUserData from "./ShowUserData";

import { Radio, TextField, Button, CircularProgress } from "@mui/material";
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
    const [loader, setLoader] = useState(false);

    function onRadioChange(type){
        setSearchForm({
            type: type, 
            search: ''
        })

        // Remove any output present
        setSearchOutput({
            display: false, 
            output: null
        })
    }

    function onSubmitSearchForm(){
        setLoader(true);

        if(searchForm.type === 'user'){
            fetch(`/admin/getUserData/${searchForm.search}`)
            .then(response => response.json())
            .then(response => {
                if(response.success){
                    setLoader(false);
                    setSearchOutput({
                        display: true, 
                        output: response.userData
                    })
                }
            })
        }
        else{
            fetch(`/getMenuItem/${searchForm.search}`)
            .then(response => response.json())
            .then(response => {
                if(response.itemData){
                    setLoader(false);
                    setSearchOutput({
                        display: true, 
                        output: response.itemData
                    })
                }
            })
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

    return (
        // Search Form
        <div  className="column-alignment"> 
            <div style={{width: '40%', marginBottom: '1rem', alignSelf: 'start', paddingLeft: '1.5rem'}} className='row-alignment'>
                <div>
                    <Radio 
                        value='user'
                        checked={searchForm.type === 'user'}
                        onChange={event=> onRadioChange(event.target.value)}
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
                        onChange={event=> onRadioChange(event.target.value)}
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

            <div style={{width: '100%', padding: '0 2rem'}} className='row-alignment'>
                <TextField 
                    type='search'
                    label={searchForm.type === 'user'? 'Email': 'Menu Item Name'}
                    variant='filled'
                    size='small'
                    color="warning"
                    value={searchForm.search}
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
            
            {/* Displaying Loader */}
            {loader && 
                <div className='column-alignment loader'>
                    <CircularProgress color="warning"/>
                    <p style={{marginTop: '1rem'}}>Loading Data...</p>
                </div>
            }
            
            {/* Search Output */}
            {(showSearchOutput.display && searchForm.type === 'user') &&
                <ShowUserData 
                    userData={showSearchOutput.output}
                    onDeleteButtonPress={onDeleteUserData}
                />
            }

            {
                (showSearchOutput.display && searchForm.type === 'menu-item') && 
                <div style={{marginTop: '2rem'}}>
                    <ImageCard 
                        itemData={showSearchOutput.output}
                        displayEditOptions={true}  
                    />
                </div>
            }

            {/* {
                showAlert.display && <div style={styles.alertWrapper}>
                    <Alert severity={showAlert.type}>{showAlert.message}</Alert>
                </div>
            } */}
        </div>
    )
}