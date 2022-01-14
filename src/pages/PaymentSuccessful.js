import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

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



const PaymentConfirmation =({isSuccessful= false})=>{

    let cart = useSelector(mapStateToProps);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    // go to shopping.
    const gotoShop = ()=>{

        history.push('/');

    }

    useEffect(()=>{

        if(isSuccessful === true)
        {
            document.title = `${CONSTANTS.ECOM_WEBSITE_NAME} - Payment Successful`;
        }
        

       }, []);


    return (
        <div className="container">
          
            {cart.cart.length > 0 
              ?

              <div className="row mt-4">
                    <div className="col-md-6 col-xl-7 col-12 mt-xs-4 mt-sm-4 mt-md-0">

                      
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

export default PaymentConfirmation;