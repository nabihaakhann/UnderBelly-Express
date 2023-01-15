import { useState } from 'react';
import '../index.css';

const Colors = {
    primaryColor: '#E4905C', 
    primaryColorDark: '#cd8152'
}

// Width will is in percentages
export function Divider({width}){
    const style = {
        width: width,
        height: '2px',
        background: 'white',
        margin: '0.2rem'
    }

    return (<div style={style}></div>)
}

export function Button({color, hoverColor, children}){
    const [isHover, setHover] = useState(false);

    const styles = {
        buttonWrapper: {
            backgroundColor: isHover ? hoverColor: color, 
            width: '100%',
            marginTop: '2rem',
            marginBottom: '1rem', 
            padding: '0.8rem', 
            borderRadius: '5px', 
            cursor: 'pointer'
        }, 
        text: {
            color: 'black',
            textAlign: 'center',
            fontWeight: 'bold', 
            textTransform: 'uppercase'
        }
    }

    return (
        <div style={styles.buttonWrapper} onMouseOver={()=> setHover(true)} onMouseOut={()=> setHover(false)}>
            <p style={styles.text}>{children}</p>
        </div>
    )
}

export function Input({labelText, placeholder, type}){
    return(
        <div style={{width: '100%',  marginBottom: '2rem'}}>
            <label className='input-label'>{labelText}</label>
            <input type={type}  placeholder={placeholder} />   
        </div>
    )
}

export {
    Colors
}