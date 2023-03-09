import { Snackbar, Alert } from "@mui/material";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from "react";
import { useParams } from "react-router-dom";

import { Divider } from "../../ui/ui";
import ContactSection from "./ContactSection";
import AddressSection from "./AddressSection";
import ProfilePhotoSection from "./ProfilePhotoSection";


export default function SidePanel({userInfo, displaySidePanel, loadUserData}){
    const [showSnackBar, setSnackBar] = useState(false)
    const [alert, setAlert] = useState({
        type: 'error',
        message: ''
    })
    const {userId} = useParams();

    function clearSnackBar(){
        setTimeout(()=>{
            setSnackBar(false);
        }, 2000);
    }

    return (
        <div id="side-panel" className="column-alignment">
            <ArrowForwardIosIcon style={{alignSelf: 'end', cursor: 'pointer', marginBottom: '1rem'}} onClick={displaySidePanel}/>
            
            <ProfilePhotoSection 
                userId={userId}
                userInfo={userInfo}
                loadUserData={loadUserData}
                clearSnackBar={clearSnackBar}
                setAlert={setAlert}
                setSnackBar={setSnackBar}
            />
            
            <p> {userInfo.registrationNumber} </p>

            <ContactSection 
                userId={userId}
                userInfo={userInfo}
                loadUserData={loadUserData}
                clearSnackBar={clearSnackBar}
                setAlert={setAlert}
                setSnackBar={setSnackBar}
            />

            <Divider />

            <AddressSection 
                userId={userId}
                userInfo={userInfo}
                loadUserData={loadUserData}
                clearSnackBar={clearSnackBar}
                setAlert={setAlert}
                setSnackBar={setSnackBar}
            />

            {/* Display Alert output */}
            {showSnackBar && 
                <Snackbar 
                    open={showSnackBar}
                    autoHideDuration={3000}
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                >
                    <Alert severity={alert.type} variant='filled'> 
                        {alert.message}
                    </Alert>
                </Snackbar>
            }
        </div>
    )
}