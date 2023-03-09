import React, { useState } from "react";
import {useParams} from 'react-router-dom';
import Navbar from './Navbar';
import '../index.css';
import { Container, Table, Row, Button } from "react-bootstrap";
import { display, height } from "@mui/system";
import AddressSection from "./Side Panel/AddressSection";
import { Divider } from "../ui/ui";


const CartPage=()=> {


    const divStyle = {
        paddingBottom: '3rem',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        height: '1850px',

     }

  return (
    <>
        <div className="dark-background" style={divStyle}>
            <Navbar />

            <div className="cart-background">
                <p className='col-heading' style={{marginTop:"100px",marginBottom:"500px",fontSize:"5rem"}}>My Cart</p>
            </div>
            
            <section>
                <div id="cart-items">
                    <div className="items-info">
                            <div className="title" style={{paddingLeft:"120px"}}>
                                <h2>Product</h2>
                            </div>
                            <div className="title" style={{paddingLeft:"60px"}}>
                                <h2>Title</h2>
                            </div>
                            <div className="title" style={{paddingLeft:"220px"}}>
                                <h2>Quantity</h2>
                            </div>

                            <div className="title" style={{paddingLeft:"235px"}}>
                                <h2>Price</h2>
                            </div>
                            <div className="title" style={{paddingLeft:"120px"}}>
                            <h2>Remove</h2>
                            </div>
                    </div>




                    <div className="cart-items-container">
                        <div className="items-info">
                            <div className="product-img">
                                <img src={require('../assets/images/Main-Course.jpg')} alt=" " size={30}></img>
                            </div>
                            <div className="title">
                                <h2>Butter Paneer</h2>
                                <div>
                                    <i className="fa-solid fa-star"  style={{color:"orange"}}></i>
                                    <i className="fa-solid fa-star"  style={{color:"orange"}}></i>
                                    <i className="fa-solid fa-star"  style={{color:"orange"}}></i>
                                    <i className="fa-solid fa-star"  style={{color:"grey"}}></i>
                                    <i className="fa-solid fa-star"  style={{color:"grey"}}></i>
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
                                <i className="fa-solid fa-xmark remove"></i>
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
                                    <i className="fa-solid fa-star"  style={{color:"orange"}}></i>
                                    <i className="fa-solid fa-star"  style={{color:"orange"}}></i>
                                    <i className="fa-solid fa-star"  style={{color:"orange"}}></i>
                                    <i className="fa-solid fa-star"  style={{color:"grey"}}></i>
                                    <i className="fa-solid fa-star"  style={{color:"grey"}}></i>
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
                                <i className="fa-solid fa-xmark remove"></i>
                            </div>
                        </div><hr/>

                        <div className="items-info">
                            <div className="product-img">
                                <img src={require('../assets/images/Baked.jpg')} alt=" "></img>
                            </div>
                            <div className="title">
                                <h2>Momos</h2>
                                <div>
                                    <i className="fa-solid fa-star"  style={{color:"orange"}}></i>
                                    <i className="fa-solid fa-star"  style={{color:"orange"}}></i>
                                    <i className="fa-solid fa-star"  style={{color:"orange"}}></i>
                                    <i className="fa-solid fa-star"  style={{color:"grey"}}></i>
                                    <i className="fa-solid fa-star"  style={{color:"grey"}}></i>
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
                                <i className="fa-solid fa-xmark remove"></i>
                            </div>
                        </div><hr/>

                        <div className="items-info">
                            <div className="product-img">
                                <img src={require('../assets/images/Starters.jpg')} alt=" "></img>
                            </div>
                            <div className="title">
                                <h2>Honey Chilli Potato</h2>
                                <div>
                                    <i className="fa-solid fa-star"  style={{color:"orange"}}></i>
                                    <i className="fa-solid fa-star"  style={{color:"orange"}}></i>
                                    <i className="fa-solid fa-star"  style={{color:"orange"}}></i>
                                    <i className="fa-solid fa-star"  style={{color:"grey"}}></i>
                                    <i className="fa-solid fa-star"  style={{color:"grey"}}></i>
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
                                <i className="fa-solid fa-xmark remove"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div id='cart-footer' >
                <div className="card-address">
                        <h3>Delivering To : </h3>
                        <span>dfdfdf</span>
                </div>
                <div className="card-total" style={{width:"100%", padding: '0 2rem'}}>
                    <div className="row-alignment" style={{margin: '1.5rem 0', paddingLeft: '1.2rem'}}>
                        <p>Card Subtotal </p>
                        <p>Rs.342.00</p>
                        
                    </div>
                    <div  className="row-alignment" style={{margin: '1.5rem 0', paddingLeft: '1.2rem'}}>
                        <p>Shipping Charges </p>
                        <p>Rs.0.00</p>
                    </div>
                    
                    <Divider height="1px" color="white"/>
                    <div  className="row-alignment" style={{margin: '1.5rem 0', paddingLeft: '1.2rem'}}>
                        <p><strong>Total Amount</strong></p>
                        <p>Rs.342.00</p>
                    </div>
                    
                    <div>
                        <button>Place an Order!</button>    
                    </div>
                </div>
            </div>
        </div>
    </>
    
  );
};


export default CartPage;
