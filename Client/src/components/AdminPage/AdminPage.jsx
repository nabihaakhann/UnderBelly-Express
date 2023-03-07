import { Heading, Colors} from "../../ui/ui";
import MenuItemCard from "./MenuItemsCard";
import Search from "./Search";
import UserQueries from './UserQueries';
import UserStatistics from './UserStatistics';

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
        userStatisticsWrapper: {
            margin: '3rem auto', 
            width: '80rem',  
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '2rem'
        }
    }

    return (
        <div id="admin-page">
            {/* Needs to be implemented fully once other features are working properly */}
            <div style={styles.userStatisticsWrapper}>
                {/* User Statistics section */}
                <UserStatistics />
            </div>

            <div style={styles.gridStyle}>
                {/*  Add Categories & Menu Items  */}
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
                <UserQueries />
            </div>
        </div>
    )
}