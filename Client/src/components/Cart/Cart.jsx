import Navbar from '../Navbar';
// import '../index.css';   
import { Heading } from "../../ui/ui";

import React, { useEffect, useState } from "react";
import {Link, useParams} from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddressSection from "../Side Panel/AddressSection";
import CartItem from './CartItem';
import CartFooter from './CartFooter';

const CartPage=()=> {
    const {userId} = useParams();

    const localStorageItems = localStorage.getItem('cart');
    const [cartItems, setCartItems] = useState(localStorageItems);

    useEffect(()=>{
        
    }, [cartItems])

    useEffect(()=>{
        document.title = 'UnderBelly Express | My Cart';
    },[])


  return (
    <>
        <div className="dark-background" >
            <Navbar />

            <div id="cart-heading-background">
                <Heading style={{textAlign: 'center'}}>My Cart</Heading>
            </div>
            
            {/* Cart Items Table */}
            <section id="cart-items">
                <div id="headers">
                    <h3>Product</h3>
                    <h3>Price</h3>
                    <h3>Quantity</h3>
                    <h3>Total</h3>
                    <h3>Remove</h3>
                </div>

                <div className="products">
                    <CartItem />
                </div>
                <div style={{textAlign: 'center', margin: '1rem'}}>
                    <Link to={`/${userId}/categories`} style={{textDecoration: 'none', color: 'inherit'}}>
                        <p style={{cursor: 'pointer'}}>
                            Add More Items 
                            <span><AddCircleOutlineIcon 
                                sx={{marginLeft: '1rem', transform: 'translateY(7px)'}}
                            /></span>
                        </p>
                    </Link>
                </div>  
            </section>

            <CartFooter />
        </div>
    </>
    
  );
};


export default CartPage;
