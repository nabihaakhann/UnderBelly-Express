import Navbar from '../Navbar';
import { Heading } from "../../ui/ui";

import React, { useEffect, useState } from "react";
import {Link, useParams, useNavigate} from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CartItem from './CartItem';
import CartFooter from './CartFooter';

const CartPage=()=> {
    const {userId} = useParams();
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);
    
    useEffect(()=>{
        document.title = 'UnderBelly Express | My Cart';

        const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        setCartItems(cart);
    },[])

    function deleteCartItem(id){
        const cart = JSON.parse(localStorage.getItem('cart'));

        const result = cart.filter(item => item._id !== id);

        localStorage.setItem('cart', JSON.stringify(result));
        setCartItems(result);
    }

    function handleQuantityChange(id, operation){
        const result = JSON.parse(localStorage.getItem('cart')).map(item => {
            if(item._id === id){
                if(operation === 'add'){
                    item.quantity = item.quantity + 1;
                }
                else{
                    item.quantity = item.quantity - 1;
                }
            }

            return item;
        })

        localStorage.setItem('cart', JSON.stringify(result));
        setCartItems(result);
    }

    function onPlacingOrder(totalAmount, address){
        const orderObject = {
            totalAmount: totalAmount, 
            address: address, 
            order: cartItems.map(item => {
                return {
                    name: item.name, 
                    quantity: item.quantity, 
                    itemId: item._id
                }
            })
        }

        fetch(`/${userId}/order`, {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(orderObject)
        })
        .then(response => response.json())
        .then(response => {
            if(response.success){
                localStorage.setItem('cart', []);
                console.log('Cart from Local Storage resetted');

                navigate(`/${userId}/categories`);
            }
        })

    }

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
                    {cartItems.map(item => {
                        return <CartItem 
                                itemData={item}
                                deleteCartItem={deleteCartItem}
                                handleQuantityChange={handleQuantityChange}
                                key={item._id}
                            />
                    })}
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

            <CartFooter 
                items={cartItems}
                onPlacingOrder={onPlacingOrder}
            />
        </div>
    </>
    
  );
};


export default CartPage;
