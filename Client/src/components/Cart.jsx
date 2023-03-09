import React, { useState } from "react";
import {useParams} from 'react-router-dom';
import Navbar from './Navbar';
import '../index.css';
import { Container, Table, Row, Button } from "react-bootstrap";
import { display, height } from "@mui/system";


const CartPage=()=> {


    const divStyle = {
        paddingBottom: '3rem',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        height: '1600px'
     }

  return (
    <div className="dark-background" style={divStyle}>
        <Navbar />
        <p className='col-heading'>My Cart</p>
        <section className="main-cart-section">
            <div className="cart-items">
                <div className="cart-items-container">
                    <div className="items-info">
                        <div className="product-img">
                            <img src={require('../assets/images/Main-Course.jpg')} alt=" " size={30}></img>
                        </div>
                        <div className="title">
                            <h2>Butter Paneer</h2>
                            <div>
                                <i className="fa-solid fa-star" size={30} style={{color:"orange"}}></i>
                                <i className="fa-solid fa-star" size={30} style={{color:"orange"}}></i>
                                <i className="fa-solid fa-star" size={30} style={{color:"orange"}}></i>
                                <i className="fa-solid fa-star" size={30} style={{color:"grey"}}></i>
                                <i className="fa-solid fa-star" size={30} style={{color:"grey"}}></i>
                            </div>
                            
                        </div>
                        <div className="add-minus-quantity">
                            <i className="fa-solid fa-minus minus"></i>
                            <input type="text" placeholder="2"></input>
                            <i className="fa-solid fa-plus add"></i>
                        </div>

                        <div className="price">
                            <h3>RS.70.00</h3>
                        </div>
                        <div className="remove-item">
                            <i className="fa-solid fa-trash-alt remove"></i>
                        </div>
                    </div>
                    <hr/>
                    <div className="items-info">
                        <div className="product-img">
                            <img src={require('../assets/images/pastries.jpg')} alt="none "></img>
                        </div>
                        <div className="title">
                            <h2>Pastries</h2>
                            <div>
                                <i className="fa-solid fa-star" size={30} style={{color:"orange"}}></i>
                                <i className="fa-solid fa-star" size={30} style={{color:"orange"}}></i>
                                <i className="fa-solid fa-star" size={30} style={{color:"orange"}}></i>
                                <i className="fa-solid fa-star" size={30} style={{color:"grey"}}></i>
                                <i className="fa-solid fa-star" size={30} style={{color:"grey"}}></i>
                            </div>
                        </div>
                        <div className="add-minus-quantity">
                            <i className="fa-solid fa-minus minus"></i>
                            <input type="text" placeholder="2"></input>
                            <i className="fa-solid fa-plus add"></i>
                        </div>

                        <div className="price">
                            <h3>RS.40.00</h3>
                        </div>
                        <div className="remove-item">
                            <i className="fa-solid fa-trash-alt remove"></i>
                        </div>
                    </div><hr/>

                    <div className="items-info">
                        <div className="product-img">
                            <img src={require('../assets/images/Baked.jpg')} alt=" "></img>
                        </div>
                        <div className="title">
                            <h2>Momos</h2>
                            <div>
                                <i className="fa-solid fa-star" size={30} style={{color:"orange"}}></i>
                                <i className="fa-solid fa-star" size={30} style={{color:"orange"}}></i>
                                <i className="fa-solid fa-star" size={30} style={{color:"orange"}}></i>
                                <i className="fa-solid fa-star" size={30} style={{color:"grey"}}></i>
                                <i className="fa-solid fa-star" size={30} style={{color:"grey"}}></i>
                            </div>
                        </div>
                        <div className="add-minus-quantity">
                            <i className="fa-solid fa-minus minus"></i>
                            <input type="text" placeholder="2"></input>
                            <i className="fa-solid fa-plus add"></i>
                        </div>

                        <div className="price">
                            <h3>RS.230.00</h3>
                        </div>
                        <div className="remove-item">
                            <i className="fa-solid fa-trash-alt remove"></i>
                        </div>
                    </div><hr/>

                    <div className="items-info">
                        <div className="product-img">
                            <img src={require('../assets/images/Starters.jpg')} alt=" "></img>
                        </div>
                        <div className="title">
                            <h2>Honey Chilli Potato</h2>
                            <div>
                                <i className="fa-solid fa-star" size={30} style={{color:"orange"}}></i>
                                <i className="fa-solid fa-star" size={30} style={{color:"orange"}}></i>
                                <i className="fa-solid fa-star" size={30} style={{color:"orange"}}></i>
                                <i className="fa-solid fa-star" size={30} style={{color:"grey"}}></i>
                                <i className="fa-solid fa-star" size={30} style={{color:"grey"}}></i>
                            </div>
                        </div>
                        <div className="add-minus-quantity">
                            <i className="fa-solid fa-minus minus"></i>
                            <input type="text" placeholder="2"></input>
                            <i className="fa-solid fa-plus add"></i>
                        </div>

                        <div className="price">
                            <h3>3000</h3>
                        </div>
                        <div className="remove-item">
                            <i className="fa-solid fa-trash-alt remove"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{display:'flex'}}>
                <div className="card-address">
                    <h3>Delivering To<i className="fa-sharp fa-solid fa-circle-chevron-down" style={{marginLeft:"10px"}}></i></h3>
                    <span>Room no 45, Boys Hostel 2, Vit bhopal University.</span>
                </div>
                <div className="card-total">
                            <p>Card Subtotal: <span style={{marginLeft:"100px"}}>Rs.342.00</span></p>
                            <p>Shipping Charges: <span style={{marginLeft:"130px"}}>Rs.0.00</span></p>
                            <hr/>
                            <h3>Card Total: <span style={{marginLeft:"70px"}}>Rs.342.00</span></h3>
                            <button>Checkout</button>
                </div>
            </div>
           
        </section>
    </div>

    
  );
};


export default CartPage;
