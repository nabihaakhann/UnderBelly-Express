import SearchIcon from '@mui/icons-material/Search';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import {useParams} from 'react-router-dom'
import { useLayoutEffect, useState } from 'react';

import SidePanel from './SidePanel';

export default function Navbar(){
    const {userId} = useParams();

    const [userInfo, setUserInfo] = useState();

    const [showSidePanel, setSidePanel] = useState(false);

    useLayoutEffect(()=>{
        fetch(`/${userId}/userData`)
        .then(response => response.json())
        .then(response => {
            console.log(response.userData);
            if(response.userData){
                setUserInfo(response.userData);
            }
            console.log(userInfo);
        })
    }, [])

    return(
        <>
            <nav id="navbar" className="row-alignment">
                <div id="underbelly-icon"></div>
                <div className='row-alignment'>
                    {/* Search Bar */}
                    <div id='search-bar-wrapper'>
                        <input type='text' id="search-bar" placeholder="What do you want to eat?" />
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>

                    <ul className='row-alignment'>
                        <li> <BookmarkBorderOutlinedIcon /> Menu</li>
                        <li> <BookmarkBorderOutlinedIcon /> My Cart</li>
                        <li> <BookmarkBorderOutlinedIcon /> About Us</li>
                        <li>
                            {/* <img 
                                src={`data:${userInfo.imageType};base64,${userInfo.userImage}`}
                                style={{height: '2.8rem', width: '2.8rem', cursor:'pointer'}}
                            /> */}
                        </li>
                    </ul>
                </div>
            </nav>

            {showSidePanel && <SidePanel userInfo={userInfo} />}
        </>
    )
}