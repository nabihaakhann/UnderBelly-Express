
import '../index.css';
import Navbar from './Navbar';
import { Heading, ImageBox, Colors } from '../ui/ui';
//import { Link, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import SchoolIcon from '@mui/icons-material/School';
import CoffeeIcon from '@mui/icons-material/Coffee';
import CleanHandsIcon from '@mui/icons-material/CleanHands';

  



export default function AboutPage(){

    useEffect(()=>{
        document.title = 'UnderBelly Express | AboutPage';
    }, [])
    

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
            
            <div id='aboutus-wrapper'>
                <div>
                <img id='aboutus' src={require('../assets/images/About-us.jpg')} alt="aboutus" width="420" height="600" 
                    />
                </div>
                <div>
                <img id='aboutus2' src={require('../assets/images/aboutus-2.jpg')} alt="aboutus" width="400" height="300" 
                    />
                <img id='aboutus' src={require('../assets/images/aboutus-3.jpg')} alt="aboutus" width="400" height="490" 
                    />
                </div>
                <div>
                <h1 style={{marginTop: '12.5rem',marginLeft: '25.5rem',color:"#ff9f0d"}}>About us </h1>
            <p id='aboutushead' style={{marginTop: '5.5rem', marginLeft: '20.5rem'}}>“A to Z of a healthy diet to help you tackle the complexities of science all day long. <br></br> <br />
            Cakes, Homemade Cookies, Range of Pastas, and much more now available at <br /> VIT Bhopal Food Court at Bhopal, Madhya Pradesh.” </p>
            <button id='showmore'>Show more</button>
                </div>
            
            </div>
           
            
    
            <h1 id='chooseus' style={{marginTop: '6.5rem', alignItems:'center',color:"#ff9f0d"}}>Why Choose Us </h1>
            <p id='aboutushead2' style={{marginTop: '5.5rem', alignItems:'justify'}}>Quality of Service, Food, Ambience and Value of Money are the primary elements for choosing a food venture. <br /> Underbelly Express is one of the most exquisite food venture in the campus of VIT Bhopal with a captivating view of  nature, perfect ambience and scrumptious food.
            Our team is always looking forward to provide you exceptional services and win your hearts out.</p>


            <img id='aboutus' src={require('../assets/images/Why-choose-us.jpg')} alt="aboutus" width="2000px" height="500px" 
                    />


                    <ul className='row-alignment'>
                        <li id='icons'> <SchoolIcon /> <br /> Best Chefs</li>
                        <li id='icons'> <CoffeeIcon /> <br /> 120+ Item food</li>
                        <li id='icons'> <CleanHandsIcon /> <br /> Clean Environment</li>

                    </ul>
                    <div>
                    <div id='overlay'>
                    <img id='meetourdev'  src={require('../assets/images/meet.jpeg')} alt="meet" width="2300" height="700" 
                    />
                    
                    </div>
                    <ul className='row-alignment'>
                 
                 <li id='pic'> <img id='pic' src={require('../assets/images/eshaan.jpeg')} alt="eshaan" width="380" height="450" 
                 />
                 <div id='polaroid'> <b>Eshaan Bahuguna</b>  <br /> Read more </div></li>

                 <li id='pic'> <img id='pic' src={require('../assets/images/Asmi.jpg')} alt="eshaan" width="380" height="450" 
                 />
                 <div id='polaroid'> <b>Asmi Bhardwaj</b>  <br /> Read more</div></li>

                 <li id='pic'> <img id='pic' src={require('../assets/images/Parth.jpg')} alt="eshaan" width="380" height="450" 
                 />
                 <div id='polaroid'> <b>Parth Dubey</b>  <br /> Read more</div></li>

                 <li id='pic'> <img id='pic' src={require('../assets/images/nabiha.jpeg')} alt="eshaan" width="380" height="450" 
                 />
                 <div id='polaroid'> <b>  Nabiha Khan </b> <br /> Read more</div></li>
                 
              
                 </ul>
                    </div>
                    
     
                 
        

            
        </div>
    )
}



