import SearchIcon from '@mui/icons-material/Search';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import {useParams, useNavigate} from 'react-router-dom'
import { useLayoutEffect, useState } from 'react';

import SidePanel from './Side Panel/SidePanel';

export default function Navbar(){
    const {userId} = useParams();
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState(null);
    const [search, setSearch] = useState('');

    const [showSidePanel, setSidePanel] = useState(false);

    useLayoutEffect(()=>{
        loadUserData();
    }, [])

    function handleSearchChange(key, value){
        console.log(key, value);
        if(key === 'Enter'){
            if(search.length === 0){
                alert('Search Query cannot be Empty!');
            }
            else{
                fetch(`/search/${search}`)
                .then(response => response.json())
                .then(response => {
                    if(response.success){
                        navigate(`/search/${search}`);
                    }
                })
            }
        }
        else if(value){
            // console.log('else block working')
            setSearch(value);
        }
        else if(value !== null){
            if(value.length === 0){
                setSearch('');
            }
        }
    }

    async function loadUserData(){
        const response = await fetch(`/${userId}/userData`);
        const data = await response.json();
        // console.log(data.userData);
        setUserInfo(data.userData);
    }

    function displaySidePanel(){
        setSidePanel(
            showSidePanel ? false : true
        )
    }

    return(
        <>
            <nav id="navbar" className="row-alignment">
                <div id="underbelly-icon"></div>
                <div className='row-alignment'>
                    {/* Search Bar */}
                    <div id='search-bar-wrapper'>
                        <input 
                            type='text' 
                            id="search-bar" 
                            placeholder="What do you want to eat?" 
                            value={search} 
                            onKeyDown={event => handleSearchChange(event.code, null)}
                            onChange={event => handleSearchChange(null, event.target.value)}
                        />
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>

                    <ul className='row-alignment'>
                        <li> <BookmarkBorderOutlinedIcon /> Menu</li>
                        <li> <BookmarkBorderOutlinedIcon /> My Cart</li>
                        <li> <BookmarkBorderOutlinedIcon /> About Us</li>
                        {userInfo && 
                            <li onClick={displaySidePanel}>
                                <img 
                                    src={`data:${userInfo.imageType};base64,${userInfo.userImage}`}
                                    style={{height: '2.5rem', width: '2.5rem', cursor:'pointer'}}
                                />
                                <p>Me</p>
                            </li>
                        }
                    </ul>
                </div>
            </nav>

            {showSidePanel && 
                <SidePanel 
                    displaySidePanel={displaySidePanel}
                    userInfo={userInfo} 
                    loadUserData={loadUserData}
                />
            }

        </>
    )
}