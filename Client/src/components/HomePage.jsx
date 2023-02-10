import '../index.css';
import Navbar from './Navbar';
import { Heading, ImageBox, Colors } from '../ui/ui';

export default function HomePage(){
    // Styling
    const divStyle = {
        paddingTop: '3rem',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center'
    }

    return(
        <div className='dark-background' style={divStyle}>
            <Navbar />
            <Heading>Eat What Makes You Happy</Heading>
            <div id='categories-wrapper'>
                <ImageBox 
                    title='Fresh Cream Pastries'
                    imageURL={require('../assets/images/pastries.jpg')}
                />
                <ImageBox 
                    title='Baked Pasta & Pizza'
                    borderColor='orange'
                    imageURL={require('../assets/images/Baked.jpg')}
                />
                <ImageBox 
                    title='Sandwiches & Burgers'
                    imageURL={require('../assets/images/Burgers.jpg')}
                />
                <ImageBox 
                    title='Starters & Quick Bites'
                    borderColor='orange'
                    imageURL={require('../assets/images/Starters.jpg')}
                />
                <ImageBox 
                    title='Main Course Meals'
                    imageURL={require('../assets/images/Main-Course.jpg')}
                />
                <ImageBox 
                    title='Beverages'
                    borderColor='orange'
                    imageURL={require('../assets/images/Beverages.jpg')}
                />
            </div>

        </div>
    )
}