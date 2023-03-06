import { Fab } from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';


export default function ProfilePhotoSection({userId, userInfo, loadUserData, setAlert, setSnackBar, clearSnackBar}){

    function onUpdateProfilePhotoButtonPress(){
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = ()=> {
            const file = input.files[0];
            
            if(file.size < 16000000){
                const formData = new FormData();

                formData.append('userId', userId);
                formData.append('userProfilePhoto', file);

                fetch('/updateProfilePhoto', {
                    method: 'PUT', 
                    body: formData
                })
                .then(response => response.json())
                .then(response => {
                    if(response.success){
                        setSnackBar(true);
                        setAlert({type: 'success', message: response.message});
                        loadUserData();
                    }
                })
            }
            else{
                setSnackBar(true);
                setAlert({type: 'error', message: 'Image Size should be less than 16 MB'}); 
            }

            clearSnackBar();
        }
        input.click();
    }

    return(
        <div style={{position: 'relative', marginBottom: '1.5rem'}}>
            <img 
                src={`data:${userInfo.imageType};base64,${userInfo.userImage}`}
                style={{height: '9rem', width: '9rem'}}
            />
            <Fab 
                color="warning" 
                sx={{
                    position: 'absolute', 
                    bottom: '-5px',
                    right: '0'
                }}
                onClick={onUpdateProfilePhotoButtonPress}
            >
                <CameraAltIcon />
            </Fab>
        </div>
    )
}