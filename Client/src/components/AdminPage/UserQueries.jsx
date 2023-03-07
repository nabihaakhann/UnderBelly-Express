import { IconButton } from "@mui/material";
import { orange } from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import { useEffect, useState } from "react";
import { Divider} from "../../ui/ui";


export default function UserQueries(){
    const [userQueries, setUserQueries] = useState([]);

    useEffect(()=>{
        loadUserQueries();
    }, [])

    function loadUserQueries(){
        fetch('/userQueries')
        .then(response => response.json())
        .then(response => {
            if(response.success){
                setUserQueries(response.queries);
            }
        })
    }

    function onDeleteQueryButtonPress(id){
        fetch(`/deleteQuery/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(response => {
            if(response.success){
                setUserQueries(prevQueries => {
                    return prevQueries.filter(query => {
                        return query._id !== id
                    })
                })
            }
        })
    }

    const buttonHoverStyle = {
        '&:hover': {
            color: orange[800]
        }
    }

    return (
        <div className="column-alignment">
            <h1 style={{fontWeight: 400, color: 'black'}}>User Queries</h1>
            <div style={{width: '30%'}}>
                <Divider color='#D0D0D0' height='1px' />
            </div>

            <div style={{alignSelf: 'end', paddingRight: '2rem'}}>
                <IconButton>
                    <ReplayIcon 
                        onClick={loadUserQueries}
                        sx={buttonHoverStyle}/>
                </IconButton>
            </div>
            
            {userQueries.length === 0 ? 
                <div className="card-light" style={{marginTop: '1rem', color: 'black', fontSize: '1.2rem', width: '100%', textAlign: 'center'}}> 
                    <p>No Queries Found</p>
                </div>
                : 
                <div id="user-queries-wrapper">
                    {userQueries.map(query => {
                        return(
                            <div className="card-light user-query" key={query._id}>
                                <div className="row-alignment">
                                    <p style={{width: '10rem'}}>{query.name}</p>
                                    <p style={{overflowWrap: 'break-word'}}><em>{query.email}</em></p>
                                </div>
                                <p style={{marginTop: '1rem', fontSize: '0.9rem'}}>{query.message}</p>
                                <div style={{display: 'grid'}}>
                                    <IconButton style={{justifySelf: 'end'}}>
                                        <DeleteIcon 
                                            onClick={()=> onDeleteQueryButtonPress(query._id)}
                                            sx={buttonHoverStyle}
                                        />
                                    </IconButton>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}