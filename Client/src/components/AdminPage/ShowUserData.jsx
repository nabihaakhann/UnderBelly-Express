import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import { Colors } from "../../ui/ui";

export default function ShowUserData({userData, onDeleteButtonPress}){
    const wrapperStyle = {
        color: Colors.primaryColor,
        marginTop: '2rem', 
        width: '100%', 
    }

    function onDeleteUserButtonPress(){
        fetch(`/deleteUserData/${userData._id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(response => {
            if(response.success){
                onDeleteButtonPress(response.message);
            }
        })
    }

    // Formatting of JSON data for buffer data
    userData.userImage = userData.userImage ? 'Buffer Data...': 'Image not found';

    return (
        <div style={wrapperStyle} className='card-light column-alignment'>
            <pre> 
                {JSON.stringify(userData, null, 2)}
            </pre>
            <IconButton color='warning' style={{alignSelf: 'end'}} onClick={onDeleteUserButtonPress}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
}