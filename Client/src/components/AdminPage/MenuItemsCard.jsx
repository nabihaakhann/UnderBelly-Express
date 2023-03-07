import { Divider } from "../../ui/ui";
import { TextField, Button, Alert } from "@mui/material";

import { useState } from "react";
import CategorySection from "./CategorySection";
import { useNavigate, useParams } from "react-router-dom";

export default function MenuItemCard({showAlert, displayAlert, clearAlert, editItemDetails}){
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

    const navigate = useNavigate();
    const {userId} = useParams();

    editItemDetails && function(){
        
    }();

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

    // Styling objects
    const styles = {
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
        },
        alertWrapper: {
            width: '100%',
            background: 'white', 
            padding: '0.5rem', 
            marginTop: '1rem', 
            borderRadius: '5px'
        }
    }
    
    return (
        <div>
            <div className="card-light" style={styles.columnAlignment}>
                <h1 style={{fontWeight: 400}}>For Menu Items</h1>
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
                    <div>
                        <Button 
                            variant="text" 
                            onClick={onClearButtonPress}
                        >Clear</Button>
                    </div>

                    <div className="column-alignment">
                        <Button 
                            variant="contained" 
                            color='primary'
                            onClick={onAddItemButtonPress}
                        >Add Item</Button>
                        <Button
                            variant="outlined"
                            color="success"
                            onClick={()=> navigate(`/${userId}/allItems`)}
                            style={{marginTop: '1rem'}}
                        >Show All Items</Button>
                    </div>
                </div>

                <div style={{margin: '1rem', width: '100%'}}>
                    <Divider color='#D0D0D0' height='1px' />
                </div>
                
                {/* For Adding New Category */}
                <CategorySection 
                    displayAlert={displayAlert}
                    clearAlert={clearAlert}
                    styles={styles}
                />
                
            </div>
            {
                showAlert.display && <div style={styles.alertWrapper}>
                    <Alert severity={showAlert.type}>{showAlert.message}</Alert>
                </div>
            }
        </div>

    )
}