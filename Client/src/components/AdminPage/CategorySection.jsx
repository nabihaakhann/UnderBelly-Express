import '../../index.css';

import { useState } from "react";
import { Button, TextField } from "@mui/material";

export default function CategorySection({displayAlert, clearAlert, styles}){
    const [categoryInput, setCategoryInput] = useState('');
    const [allCategories, setAllCategories] = useState([]);

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
                    displayAlert(response.message, 'success');
                }
                else{
                    displayAlert(response.message, 'error');
                }
            })
        }
        else{
            console.log('Validation for adding new category failed');
            displayAlert('Empty Category Field cannot be added', 'warning');
        }
        clearAlert();
    }

    function onDeleteCategoryButtonPress(){
        fetch('/allCategories')
        .then(response => response.json())
        .then(response => {
            setAllCategories(response);
        })
    }

    function deleteCategory(id, element){
        fetch(`/category/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(response => {
            if(response.success){
                element.style.textDecoration = 'line-through';
                displayAlert(response.message, 'success');
            }
            else{
                displayAlert(response.message, 'error');
            }
            clearAlert();
        })
    }

    return(
        <div style={{width: '100%'}} id='category-section'>
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
                    onClick={onDeleteCategoryButtonPress}
                >Delete Category</Button>
            </div>

            {/* Displaying all Categories section */}
            <div style={{marginTop: '2rem', ...styles.columnAlignment}}>
                <ul>
                    {allCategories.map((category)=>{
                        return <li key={category._id} onClick={(event)=> deleteCategory(category._id, event.target)}>{category.category}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}