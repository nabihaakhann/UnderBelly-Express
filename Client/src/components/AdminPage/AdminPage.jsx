import { Heading, Colors} from "../../ui/ui";
import MenuItemCard from "./MenuItemsCard";
import Search from "./Search";

import { useEffect, useState } from "react";

export default function AdminPage(){
    const [showAlert, setShowAlert] = useState({
        display: false, 
        type: '',
        message: ''
    });

    const [editItemDetails, setEditItemDetails] = useState(null);

    useEffect(()=>{
        document.title = 'UnderBelly Express | Admin Page';
    },[])
    

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

    function handleEditItemDetails(itemData){
        setEditItemDetails(itemData);
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

            {/*  Add Categories & Menu Items  */}
            <div style={styles.gridStyle}>
                <MenuItemCard 
                    showAlert={showAlert}
                    displayAlert={displayAlert}
                    clearAlert={clearAlert}
                    editItemDetails={editItemDetails}
                />
                
                {/* Edit/Remove Menu Item & Users */}
                <Search 
                    handleEditItemDetails={handleEditItemDetails}
                />

                {/* User Queries section */}
                <div className="card-light" style={styles.columnAlignment}>
                </div>
            </div>
        </div>
    )
}