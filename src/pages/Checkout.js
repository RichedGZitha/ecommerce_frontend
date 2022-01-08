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



const Checkout =()=>{

    let cart = useSelector(mapStateToProps);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState();
    const [email, setEmail] = useState('');

    const addressChangeHandler = (e)=>{

      setAddress(()=>e.target.value);

    }


    const emailChangeHandler = (e)=>{

      setEmail(()=>e.target.value);

    }

    const firstnameChangeHandler = (e)=>{

      setFirstname(()=>e.target.value);

    }

    const phoneChangeHandler = (e)=>{

      setPhone(()=>e.target.value);

    }

    const lastnameChangeHandler = (e)=>{

      setLastname(()=>e.target.value);

    }


    // go to shopping.
    const gotoShop = ()=>{

        history.push('/');

    }

    useEffect(()=>{

        if(cart.isLoggedIn === false)
        {
          history.push('/signin?next=' + encodeURIComponent('/Checkout'));
        }

        document.title = `${CONSTANTS.ECOM_WEBSITE_NAME} - Checkout`;

       }, []);


    const billingSumbitHandler = (e)=>{
        e.preventDefault();

        if(cart.isLoggedIn === true)
        {
          history.push('/payment');
        }

        else
        {
          history.push('/signin?next=' + encodeURIComponent('/payment'));
        }


    }


    return (
        <div className="container">
          
            {cart.cart.length > 0 
              ?

              <div className="row mt-4">
                    <div className="col-md-6 col-xl-7 col-12 mt-xs-4 mt-sm-4 mt-md-0">

                      <p className="fs-4">Fill in Billing Information</p>
                      <form method="post" onSubmit={billingSumbitHandler} className="mt-4">

                          <div className="form-group">

                              <label className="form-label" forHtml="firstname">Firstname</label>
                              <input type="text" className="form-control" id="firstname" name="firstname"  onChange={firstnameChangeHandler} required/>

                          </div>

                          <div className="form-group">

                              <label className="form-label" forHtml="lastname">Lastname</label>
                              <input type="text" className="form-control" id="lastname" name="lastname"  onChange={lastnameChangeHandler} required/>

                          </div>

                          <div className="form-group">

                              <label className="form-label" forHtml="email">Email</label>
                              <input type="email" className="form-control" id="email" name="email"  onChange={emailChangeHandler} required/>

                          </div>

                          <div className="form-group">

                              <label className="form-label" forHtml="phone">Phone</label>
                              <input type="number" className="form-control" id="phone" name="phone"  onChange={phoneChangeHandler} required/>

                          </div>

                          <div className="form-group">

                              <label className="form-label" forHtml="address">Address</label>
                              <input type="text" className="form-control" id="address" name="address"  onChange={addressChangeHandler} required/>

                          </div>

                          <div className="form-group mt-4">
                              <button className="btn btn-pill primary-color text-white form-control" type="submit"> Proceed to Payment </button>
                          </div>
                          


                      </form>


                  </div>


                  <div className="col-md-6 col-xl-5 col-12 order-last mt-4">

                      <div className="card shadow">
                        <div className="card-body">

                          <h5 className="text-decoration-underline text-center"> Checkout Information </h5>
                          
                          <p className="cart-subtotals"> Subtotal: <strong>{new Intl.NumberFormat("en-ZA", {style: "currency", currency: "ZAR"}).format(calculateSubtotalPrice(cart.cart))}</strong> </p>
                          <p className="cart-subtotals"> VAT at 15%: <strong>{new Intl.NumberFormat("en-ZA", {style: "currency", currency: "ZAR"}).format(calculateTax(cart.cart, 0.15))}</strong> </p>
                          <p className="cart-subtotals"> Shipping Cost: <strong>{new Intl.NumberFormat("en-ZA", {style: "currency", currency: "ZAR"}).format(getShippingCost())}</strong> </p>
                          

                          <hr/>
                          <p className="d-inline-block"><span className="text-md-wrap text-xl-nowrap">Grandtotal (inc. Tax, shipping etc)</span> <br/> <span className="cart-grandtotal">{new Intl.NumberFormat("en-ZA", {style: "currency", currency: "ZAR"}).format(calculateGrandTotal(cart.cart, 0.15))}</span> </p>

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

export default Checkout;