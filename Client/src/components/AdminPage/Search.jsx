import { Colors, ImageCard, Loader } from "../../ui/ui";
import ShowUserData from "./ShowUserData";

import { Radio, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function Search({handleEditItemDetails}){
    const [searchForm, setSearchForm] = useState({
        type: 'user', 
        search: ''
    });
    const [showSearchOutput, setSearchOutput] = useState({
        displayOutput: false, 
        output: null,
        displayNotFound: false
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
            output: null,
            displayNotFound: false
        })
    }

    function onSubmitSearchForm(){
        // Remove any previous search result
        setSearchOutput({
            display: false, 
            output: null,
            displayNotFound: false
        })

        // Show Loader
        setLoader(true);

        if(searchForm.type === 'user'){
            fetch(`/admin/getUserData/${searchForm.search}`)
            .then(response => response.json())
            .then(response => {
                setLoader(false);
                if(response.success){
                    setSearchOutput({
                        displayOutput: true, 
                        output: response.userData,
                        displayNotFound: false
                    })
                }
                else{
                    displayNotFound();
                }
            })
        }
        else{
            fetch(`/getMenuItem/${searchForm.search}`)
            .then(response => response.json())
            .then(response => {
                setLoader(false);
                if(response.itemData){
                    setSearchOutput({
                        displayOutput: true, 
                        output: response.itemData,
                        displayNotFound: false
                    })
                }
                else{
                    displayNotFound();
                }
            })
        }
    }

    function displayNotFound(){
        setSearchOutput({
            displayOutput: false, 
            output: null, 
            displayNotFound: true
        })
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
        // displayAlert(message, 'success');
        // clearAlert();

        // Clearing out the result from screen
        setTimeout(()=> {
            setSearchOutput({
                displayOutput: false, 
                output: null,
                displayNotFound: false
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
            {loader && <Loader textColor='black'/>}
            
            {/* Search Output */}
            {(showSearchOutput.displayOutput && searchForm.type === 'user') &&
                <ShowUserData 
                    userData={showSearchOutput.output}
                    onDeleteButtonPress={onDeleteUserData}
                />
            }

            {
                (showSearchOutput.displayOutput && searchForm.type === 'menu-item') && 
                <div style={{marginTop: '2rem'}}>
                    <ImageCard 
                        itemData={showSearchOutput.output}
                        displayEditOptions={true}  
                        handleEditItemDetails={handleEditItemDetails}
                    />
                </div>
            }

            {/* Output when nothing found */}
            {showSearchOutput.displayNotFound && 
                <div style={{ padding: '0 1.5rem', margin: '2rem', width: '100%'}}>
                    <div className="card-light">
                        <p style={{textAlign: 'center'}}>Uh Oh! Nothing Found :(  </p>
                    </div>
                </div>
            }
        </div>
    )
}