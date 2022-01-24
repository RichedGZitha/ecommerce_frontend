import React from 'react';

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link as link, useHistory, useLocation } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';

import { getCartCountStore, 
         removeFromCart, 
         getAllCartProducts, 
         calculateSubtotalPrice, 
         calculateGrandTotal,
         getDiscount,
         getShippingCost,
         updateSingleItem,
         calculateTax,
         removeAllCart} from '../services/cartService';

import '../App.css';
import {CONSTANTS} from '../constants';

// 
const mapStateToProps = (state) => {
    
    return {
      cart: state.cartReducer,
      cartCount: getCartCountStore(state.cartReducer),
      isLoggedIn: state.loginReducer.isAuthenticated,
    }
  }



const Cart =()=>{

    let cart = useSelector(mapStateToProps);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const gotoShop = ()=>{

        history.push('/');

    }

    const checkout = ()=>{

        if(cart.isLoggedIn === true)
        {
          history.push('/checkout');
        }

        else
        {
          history.push('/signin?next=' + encodeURIComponent('/checkout'));
        }

    }


    // remove single item from cart.
    const removeItem = (e)=>
    {
          removeFromCart(e.target.id, dispatch);
    }

    // update the quantity of a single item.
    const updateItemQuantity = (e)=>{

          e.preventDefault();

          let quantity = e.target.elements[0].value;
          let index = e.target.id;

          const toUpdate = cart.cart[index];

          updateSingleItem(toUpdate.id, quantity, dispatch);    
          

    }

    useEffect(()=>{
      document.title = `Cart - ${CONSTANTS.ECOM_WEBSITE_NAME}`;
    }, []);

    const renderCartItems = ()=>{
      return cart.cart.map((item,index)=>

        <div className="row mb-md-2 mb-4" key={index}>
            <div className="col-12">
                  <div className="card shadow" >
                   <div className="card-body">

                      <div className="row">

                            <div className="col-3 col-md-3">
                                <Alert.Link to={'/product/' + item.id} as={link} className="text-dark"><img className="rounded pt-4" src={item.image_url} width="60" height="60"/> </Alert.Link>
                            </div>

                            <div className="col-9 col-md-5">
                                <p className="fs-6"> <Alert.Link to={'/product/' + item.id} as={link} className="text-dark"> {item.name}</Alert.Link> </p>
                                <div className="col-12">

                                      <form onSubmit={updateItemQuantity} id={index}>

                                      <div className="row">
                                          <div className="col-xs-12  col-md-8">
                                            <input type="number" name={index} className="rounded-pill form-control" placeholder={item.quantity} id={index} required />
                                          </div>

                                          <div className="col-xs-12 mt-4 mt-md-0 col-md-4">
                                             <button type="submit" className="btn-pill btn btn-primary">Update</button>
                                          </div>

                           
                                      </div>
                                  </form>
                                     
                                </div>
                            </div>

                            <hr className="col-12 mt-2 mb-2 d-md-none"/>
                            <div className="col-12 col-md-4">

                                <div className="row">
                                  <div className="col-12">
                                    <span className="cart-subtotals text-end float-md-end"> Price: <strong >{new Intl.NumberFormat("en-ZA", {style: "currency", currency: "ZAR"}).format(item.price)}</strong> </span>
                                    
                                  </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <button className="btn btn-pill btn-danger text-white float-md-end" onClick={removeItem} id={item.id}> Remove </button>
                                    </div>
                                  </div>
                            </div>

                      </div>

                                
                      </div>
                      </div>
                    </div>
                  </div>);
    }

    return (
        <div className="container">
          
            {cart.cart.length > 0 
              ?

              <div className="row mt-4">
                    <div className="col-md-8 col-xl-9 col-12 mt-xs-4 mt-sm-4 mt-md-0">

                      <p className="fs-4">Total Item (s): <strong>{cart.cartCount}</strong></p>

                        {renderCartItems()}

                  </div>


                  <div className="col-md-4 col-xl-3 col-12 order-first order-md-last">

                      <div className="card shadow">
                        <div className="card-body">

                          <h4 className="text-decoration-underline text-center"> Cart Information </h4>
                          
                          <p className="cart-subtotals"> Subtotal: <strong>{new Intl.NumberFormat("en-ZA", {style: "currency", currency: "ZAR"}).format(calculateSubtotalPrice(cart.cart))}</strong> </p>
                          <p className="cart-subtotals"> VAT at 15%: <strong>{new Intl.NumberFormat("en-ZA", {style: "currency", currency: "ZAR"}).format(calculateTax(cart.cart, 0.15))}</strong> </p>
                          <p className="cart-subtotals"> Shipping Cost: <strong>{new Intl.NumberFormat("en-ZA", {style: "currency", currency: "ZAR"}).format(getShippingCost())}</strong> </p>
                          

                          <hr/>
                          <p className="d-inline-block"><span className="text-md-wrap text-xl-nowrap">Grandtotal (inc. Tax, shipping etc)</span> <br/> <span className="cart-grandtotal">{new Intl.NumberFormat("en-ZA", {style: "currency", currency: "ZAR"}).format(calculateGrandTotal(cart.cart, 0.15))}</span> </p>

                          <button className="btn btn-pill primary-color text-white form-control" type="button" onClick={checkout}> Proceed to Checkout <span className="material-icons align-middle">shopping_cart_checkout</span> </button>

                        </div>
                      </div>

                      </div>
               </div>

              :

              
                <div className="row">
                  <div className="col-12 col-md-6 offset-md-3">
                      <h1> Your cart is empty. </h1>
                      <button className="btn btn-pill primary-color text-white" onClick={gotoShop}> Continue shopping </button>
                  </div>
                </div>

              }

        </div>);

}

export default Cart;