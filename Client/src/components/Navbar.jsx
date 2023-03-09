import SearchIcon from '@mui/icons-material/Search';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import {useParams, useNavigate, Link} from 'react-router-dom'
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
        // console.log(key, value);
        if(key === 'Enter'){
            if(search.length === 0){
                alert('Search Query cannot be Empty!');
            }
            else{
                navigate(`/${userId}/search/${search}`);
            }
        }
        else if(value){
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
                        <li> 
                            <Link to={`/${userId}/categories`} style={{textDecoration: 'none', color: 'white'}}>
                                <div className='navbar-links'>
                                    <BookmarkBorderOutlinedIcon /> 
                                    <p>Menu </p>
                                </div>
                            </Link>
                        </li>
                        <li> 
                            <Link to={`/${userId}/about`} style={{textDecoration: 'none', color: 'white'}}>
                                <div className='navbar-links'>
                                    <BookmarkBorderOutlinedIcon /> 
                                    <p>About Us </p>
                                </div>
                            </Link>
                        </li>
                        <li> 
                            <Link to={`/${userId}/contact`} style={{textDecoration: 'none', color: 'white'}}>
                                <div className='navbar-links'>
                                    <BookmarkBorderOutlinedIcon /> 
                                    <p>Contact </p>
                                </div>
                            </Link>
                        </li>
                        <li> 
                            <Link to={`/${userId}/cart`} style={{textDecoration: 'none', color: 'white'}}>
                                <div className='navbar-links'>
                                    <BookmarkBorderOutlinedIcon /> 
                                    <p>My Cart</p>
                                </div>
                            </Link>
                        </li>

                        {userInfo && 
                            <li onClick={displaySidePanel}>
                                <div className='navbar-links'>
                                    <img 
                                        src={`data:${userInfo.imageType};base64,${userInfo.userImage}`}
                                        style={{height: '2.5rem', width: '2.5rem', cursor:'pointer'}}
                                    />
                                    <p>Me</p>
                                </div>
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