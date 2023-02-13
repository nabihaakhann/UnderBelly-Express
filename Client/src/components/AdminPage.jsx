import { Heading, Divider } from "../ui/ui";

import { TextField, Button, Alert } from "@mui/material";
import { useState } from "react";

export default function AdminPage(){
    const [addMenuItemFormData, setAddMenuFormData] = useState({
        name: '', 
        categoryName: '',  
        description: '', 
        filterTags: '', 
        price: ''
    })
    const [menuItemImage, setMenuItemImage] = useState({
        name: 'None', 
        file: ''
    });
    const [categoryInput, setCategoryInput] = useState('');


    const [showAlert, setShowAlert] = useState({
        display: false, 
        type: '',
        message: ''
    });

    function displayAlert(message, type){
        setShowAlert({
            display: true, 
            message: message, 
            type: type
        })
    }

    function clearAlert(){
        setTimeout(()=>{
            setShowAlert({
                display: false, 
                type: '',
                message: ''
            })
        }, 3000);
    }

    function handleMenuItemFormChange(name, value){
        setAddMenuFormData((prevData)=>{
            return {
                ...prevData, 
                [name]: value
            }
        })
    }

    function onClearButtonPress(){
        setAddMenuFormData({
            name: '', 
            categoryName: '',  
            description: '', 
            filterTags: '', 
            price: ''
        });
        setMenuItemImage({
            name: 'None',
            file: ''
        });
    }
    
    function onAddItemButtonPress(){
        // Validation for required fields
        const validate = (function(){
            for (const key in addMenuItemFormData){
                if(addMenuItemFormData[key].length === 0){
                    return false;
                }
            }
            return true;
        }());

        if(validate){
            console.log('Menu-Item Form Validation Passed');

            const formData = new FormData();

            for (const key in addMenuItemFormData){
                formData.append(key, addMenuItemFormData[key]);
            }
            formData.append('imageFile', menuItemImage.file);

            fetch('/addMenuItem', {
                method: 'POST', 
                body: formData
            })
            .then(response => response.json())
            .then(response => {
                if(response.success){
                    displayAlert(response.message, 'success');
                }
                else{
                    displayAlert(response.message, 'error');
                }
            })
        }
        else{
            console.log('Menu-Item Form Validation Failed');
            displayAlert('All Required Fields are not Filled', 'error');
        }
        clearAlert();
    }

    function onAddNewCategoryButtonPress(){
        const validate = categoryInput.length !== 0;

        if(validate){
            fetch('/addCategory', {
                method: 'POST',  
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({
                    category: categoryInput
                })
            })
            .then(response => response.json())
            .then(response => {
                if(response.success){
                    setShowAlert({
                        display: true, 
                        message: response.message, 
                        type: 'success'
                    })
                }
                else{
                    setShowAlert({
                        display: true, 
                        message: response.message, 
                        type: 'warning'
                    })
                }
                clearAlert();
            })
        }
        else{
            console.log('Validation for adding new category failed');
        }
    }
    
    // Styling object
    const styles = {
        gridStyle: {
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            padding: '2rem',
            height: '20rem', 
            gap: '2rem'
        },
        columnAlignment: {
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center'
        }, 
        rowAlignment: {
            display: 'flex', 
            justifyContent: 'space-between', 
            width: '100%', 
        }, 
        informationStyling: {
            alignSelf: 'start', 
            fontSize: '0.75rem',  
            margin: '1rem 0', 
            color: 'grey'
        },
        imageNameStyle: {
            fontSize: '0.65rem',
            color: '#1976d2', 
            marginLeft: '5px',
            textAlign: 'center'
        }
    }

    return (
        <div id="admin-page">
            {/* Needs to be implemented fully once other features are working properly */}
            <div style={{margin: 'auto', width: '80rem', paddingTop: '3rem'}}>
                <div className="card-light" style={{ minHeight: '16rem'}}>
                    {/* Displays User-Related Data */}
                    <Heading>User Statistics</Heading>
                </div>
            </div>

            <div style={styles.gridStyle}>
                <div className="card-light" style={styles.columnAlignment}>
                    <h1 style={{fontWeight: 200}}>For Menu Items</h1>
                    <div style={{marginBottom: '1rem', width: '25%'}}>
                        <Divider color='#D0D0D0' height='1px' />
                    </div>

                    <p style={styles.informationStyling}>Required fields are marked with *</p>

                    {/* Add/Remove Items section */}
                    <div style={styles.rowAlignment}>
                        <div>
                            <TextField 
                                label="Item Name"
                                variant="outlined"
                                value={addMenuItemFormData.name}
                                onChange={(event)=> handleMenuItemFormChange('name', event.target.value)}
                                sx={{
                                    marginBottom: '1rem',
                                    marginRight: '1rem'
                                }}
                                required
                            />
                            <TextField 
                                label="Category Name"
                                variant="outlined"
                                value={addMenuItemFormData.categoryName}
                                onChange={(event)=> handleMenuItemFormChange('categoryName', event.target.value)}
                                sx={{
                                    marginBottom: '1rem'
                                }}
                                required
                            />
                        </div>
                        <div style={{alignSelf: 'center'}}>
                        <p style={styles.imageNameStyle}>{
                            (function(){
                                if(menuItemImage.name.length > 20){
                                    return `${menuItemImage.name.substring(0, 20)}...`
                                }
                                return menuItemImage.name;
                            })()
                        }</p>
                            <Button variant="text" component='label'>
                                Upload Image
                                <input type='file' accept='.jpeg, .png, .jpg' hidden onChange={event => {
                                    const file = event.target.files[0];
                                    setMenuItemImage({
                                        file: file,
                                        name: file.name
                                    }); 
                                }}/>
                            </Button>
                        </div>
                    </div>

                    <TextField 
                        multiline
                        fullWidth
                        minRows={3}
                        label='Description'
                        value={addMenuItemFormData.description}
                        onChange={(event)=> handleMenuItemFormChange('description', event.target.value)}
                        sx={{
                            marginBottom: '1rem'
                        }}
                        required
                    />

                    <div style={styles.rowAlignment}>
                        <TextField 
                            label='Filter Tags'
                            helperText="Seperated by comma's"
                            value={addMenuItemFormData.filterTags}
                            onChange={(event)=> handleMenuItemFormChange('filterTags', event.target.value)}
                            sx={{
                                marginBottom: '1rem', 
                                width: '60%'
                            }}
                            required
                        />
                        <TextField 
                            label='Price'
                            type='number'
                            value={addMenuItemFormData.price}
                            onChange={(event)=> handleMenuItemFormChange('price', event.target.value)}
                            required
                        />
                    </div>

                    <div style={styles.rowAlignment}>
                         <Button 
                            variant="text" 
                            onClick={onClearButtonPress}
                        >Clear</Button>
                        <Button 
                            variant="contained" 
                            color='primary'
                            onClick={onAddItemButtonPress}
                        >Add Item</Button>
                    </div>

                    <div style={{margin: '1rem', width: '100%'}}>
                        <Divider color='#D0D0D0' height='1px' />
                    </div>
                    
                    {/* For Adding New Category */}
                    <div style={{width: '100%'}}>
                        <TextField 
                            label='New Category'
                            variant="outlined"
                            color="warning"
                            style={{width: '55%'}}
                            onChange={(event)=> setCategoryInput(event.target.value)}
                        />
                        <div style={{marginTop: '1rem', ...styles.rowAlignment}}>
                            <Button 
                                variant="contained"
                                color="warning"
                                onClick={onAddNewCategoryButtonPress}
                            >Add Category</Button>
                            <Button 
                                variant="outlined"
                                color="warning"
                            >Delete Category</Button>
                        </div>
                        
                        {showAlert.display && <Alert severity={showAlert.type} style={{marginTop: '1rem'}}>{showAlert.message}</Alert>}
                    </div>
                </div>

                {/* <div className="card-light" style={styles.columnAlignment}> */}
                    {/* Add/Remove Users section */}
                {/* </div> */}
                {/* <div className="card-light" style={styles.columnAlignment}> */}
                    {/* User Queries section */}
                {/* </div> */}
            </div>
        </div>
    )
}