import '../index.css';
import Navbar from './Navbar';
import { Heading, ImageBox, Colors } from '../ui/ui';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useEffect } from 'react';


export default function HomePage(){

    const {userId} = useParams();

    useEffect(()=>{
        document.title = 'UnderBelly Express | Categories'; 
    }, [])

    return(
        <div className='dark-background column-alignment' >
            <Navbar />

            <Heading style={{marginTop: '2.5rem'}}>Eat What Makes You Happy</Heading>

            <div id='categories-wrapper'>
                <Link to={`/${userId}/Pastries`} style={{textDecoration: 'none', color: 'white'}}>
                    <ImageBox 
                        title='Fresh Cream Pastries'
                        imageURL={require('../assets/images/pastries.jpg')}
                    />
                </Link>
                <Link to={`/${userId}/Pasta and Pizza`} style={{textDecoration: 'none', color: 'white'}}>
                    <ImageBox 
                        title='Baked Pasta & Pizza'
                        borderColor='orange'
                        imageURL={require('../assets/images/Baked.jpg')}
                    />
                </Link>
                <Link to={`/${userId}/Sandwiches and Burgers`} style={{textDecoration: 'none', color: 'white'}}>
                    <ImageBox 
                        title='Sandwiches & Burgers'
                        imageURL={require('../assets/images/Burgers.jpg')}
                    />
                </Link>
                <Link to={`/${userId}/Starters`} style={{textDecoration: 'none', color: 'white'}}>
                    <ImageBox 
                        title='Starters & Quick Bites'
                        borderColor='orange'
                        imageURL={require('../assets/images/Starters.jpg')}
                    />
                </Link>
                <Link to={`/${userId}/Main Course`} style={{textDecoration: 'none', color: 'white'}}>
                    <ImageBox 
                        title='Main Course Meals'
                        imageURL={require('../assets/images/Main-Course.jpg')}
                    />
                </Link>
                <Link to={`/${userId}/Beverages`} style={{textDecoration: 'none', color: 'white'}}>
                    <ImageBox 
                        title='Beverages'
                        borderColor='orange'
                        imageURL={require('../assets/images/Beverages.jpg')}
                    />
                </Link>
            </div>

            <Outlet />
        </div>
    )
}