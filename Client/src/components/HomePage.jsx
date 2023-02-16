import '../index.css';
import Navbar from './Navbar';
import { Heading, ImageBox, Colors } from '../ui/ui';
import { Link, Outlet } from 'react-router-dom';

export default function HomePage(){
    // Styling
    const divStyle = {
        paddingBottom: '3rem',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center'
    }

    return(
        <div className='dark-background' style={divStyle}>
            <Navbar />
            <Heading>Eat What Makes You Happy</Heading>


            <div id='categories-wrapper'>
                <Link to={'pastries'} style={{textDecoration: 'none', color: 'white'}}>
                    <ImageBox 
                        title='Fresh Cream Pastries'
                        imageURL={require('../assets/images/pastries.jpg')}
                    />
                </Link>
                <Link to={'pasta-and-pizza'} style={{textDecoration: 'none', color: 'white'}}>
                    <ImageBox 
                        title='Baked Pasta & Pizza'
                        borderColor='orange'
                        imageURL={require('../assets/images/Baked.jpg')}
                    />
                </Link>
                <Link to={'sandwiches-and-burgers'} style={{textDecoration: 'none', color: 'white'}}>
                    <ImageBox 
                        title='Sandwiches & Burgers'
                        imageURL={require('../assets/images/Burgers.jpg')}
                    />
                </Link>
                <Link to={'starters-and-quickbites'} style={{textDecoration: 'none', color: 'white'}}>
                    <ImageBox 
                        title='Starters & Quick Bites'
                        borderColor='orange'
                        imageURL={require('../assets/images/Starters.jpg')}
                    />
                </Link>
                <Link to={'main-course'} style={{textDecoration: 'none', color: 'white'}}>
                    <ImageBox 
                        title='Main Course Meals'
                        imageURL={require('../assets/images/Main-Course.jpg')}
                    />
                </Link>
                <Link to={'beverages'} style={{textDecoration: 'none', color: 'white'}}>
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