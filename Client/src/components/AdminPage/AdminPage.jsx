import { Heading, Colors} from "../../ui/ui";
import MenuItemCard from "./MenuItemsCard";
import Search from "./Search";

import { useState } from "react";

export default function AdminPage(){
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
            justifyContent: 'space-between'
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
                {/*  Add Categories & Menu Items  */}
                <MenuItemCard 
                    showAlert={showAlert}
                    displayAlert={displayAlert}
                    clearAlert={clearAlert}
                />
                
                {/* Edit/Remove Menu Item & Users */}
                <Search 
                    showAlert={showAlert}
                    displayAlert={displayAlert}
                    clearAlert={clearAlert}
                />

                {/* User Queries section */}
                <div className="card-light" style={styles.columnAlignment}>
                </div>
            </div>
        </div>
    )
}