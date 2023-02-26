import { useState } from 'react';
import '../index.css';

import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

const Colors = {
    primaryColor: '#E4905C', 
    primaryColorDark: '#cd8152'
}

// Width is in percentages
export function Divider({width, color, height}){
    const style = {
        width: width? width: '100%',
        height: height? height: '2px',
        background: color? color: 'white',
        margin: '0.2rem'
    }

    return (<div style={style}></div>)
}

export function Button({color, hoverColor, children, onButtonPress}){
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
        <div style={styles.buttonWrapper} onMouseOver={()=> setHover(true)} onMouseOut={()=> setHover(false)} onClick={onButtonPress}>
            <p style={styles.text}>{children}</p>
        </div>
    )
}

export function Input({labelText, placeholder, type, name, value, handleChange}){
    return(
        <div style={{width: '100%',  marginBottom: '2rem'}}>
            <label className='input-label'>{labelText}</label>
            <input 
                type={type}  
                placeholder={placeholder} 
                name={name} 
                value={value} 
                onChange={event => handleChange(name, event.target.value)} 
                className='input-field'
                />   
        </div>
    )
}

export function HighlightedText({children, style}){
    const [isHover, setHover] = useState(false);

    const spanStyle={
        color: isHover ? Colors.primaryColor : 'white', 
        cursor: 'pointer'
    }

    return (
        <span style={{...spanStyle, ...style}} onMouseOver={()=> setHover(true)} onMouseOut={()=> setHover(false)}> {children} </span>
    )
}

export function MessageBox({children, backgroundColor}){
    const messageBoxStyle = {
        backgroundColor: backgroundColor? backgroundColor : Colors.primaryColor, 
        color: 'black', 
        padding: '1rem', 
        borderRadius: '5px'
    }

    return(
        <div style={messageBoxStyle}>
            <p> {children} </p>
        </div>
    )
}

export function Heading({children, style}){
    return (
        <p className='heading' style={style}> {children} </p>
    )
}

export function ImageBox({title, borderColor, imageURL}){
    const boxStyle= { 
        background: `url(${imageURL}) no-repeat center center/cover`, 
        borderColor: borderColor? borderColor: 'white', 
    }
    
    return (
        <div style={boxStyle} className='image-box'>
            <p> {title} </p>
        </div>
    )
}

export function ImageCard({itemData, displayEditOptions}){

    function onDeleteButtonPress(){
        // fetch(`deleteMenuItem/`)
    }

    return (
        <div className='image-card'>
            <img src={`data:${itemData.imageType};base64,${itemData.itemImage}`} />
            <div className='row-alignment' style={{width: '100%'}}>
                <strong>{itemData.name}</strong>
                <div style={{alignItems: 'center', width: '13%'}} className='row-alignment'>
                    <StarIcon color='warning' />
                    <span style={{color: 'grey'}}>{itemData.currentRating}</span>
                </div>
            </div>
            <p style={{color: Colors.primaryColor}}>Rs {itemData.price} </p>
            <p>{itemData.description}</p>

            {
                displayEditOptions && 
                <div style={{alignSelf: 'end'}}>
                    <IconButton color='error' onClick={onDeleteButtonPress}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            }
        </div>
    )
}

export {
    Colors
}