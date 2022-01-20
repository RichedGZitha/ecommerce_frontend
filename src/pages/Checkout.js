import React from 'react';

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link as link, useHistory, useLocation } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';


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
      user: state.userReducer
    }
  }



const Checkout =()=>{

    let cart = useSelector(mapStateToProps);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [street_name, setStreetname] = useState('');
    const [suburb, setSuburb] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [postal_code, setPostalcode] = useState('');
    const [country, setCountry] = useState('');


    const [phone, setPhone] = useState('');
    const [firstname, setFirstname] = useState(cart.user.first_name);
    const [lastname, setLastname] = useState(cart.user.last_name);
    const [email, setEmail] = useState(cart.user.email);


    const streetnameChangeHandler = (e)=>{

      setStreetname(()=>e.target.value);

    }

    const suburbChangeHandler = (e)=>{

      setSuburb(()=>e.target.value);

    }

    const cityChangeHandler = (e)=>{

      setCity(()=>e.target.value);

    }

    const provinceChangeHandler = (e)=>{

      setProvince(()=>e.target.value);

    }


    const postalcodeChangeHandler = (e)=>{

      setPostalcode(()=>e.target.value);

    }

    const countryChangeHandler = (e)=>{

      setCountry(()=>e.target.value);

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
          history.push('/signin?next=' + encodeURIComponent('/checkout'));
        }

        document.title = `${CONSTANTS.ECOM_WEBSITE_NAME} - Checkout`;

       }, []);


    const shippingSumbitHandler = (e)=>{
        e.preventDefault();

        if(cart.isLoggedIn === true)
        {

            // save information to cart.
           
            const shipping = {'firstname':firstname, 'lastname':lastname, 'email':email, 
            'phone':phone, 'street_name':street_name, 
            'country':country, 'postal_code':postal_code, 'province':province, 'city':city, 'suburb':suburb};
            
            localStorage.setItem(CONSTANTS.ECOM_USER_SHIPPING, JSON.stringify(shipping));
            
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

                      <p className="fs-4">Fill in Shipping Information</p>
                      <form method="post" onSubmit={shippingSumbitHandler} className="mt-4">

                          <div className="form-group mt-2">

                              <label className="form-label" forhtml="firstname">Firstname</label>
                              <input type="text" className="form-control" id="firstname" name="firstname" value={firstname} onChange={firstnameChangeHandler} required/>

                          </div>

                          <div className="form-group mt-2">

                              <label className="form-label" forhtml="lastname">Lastname</label>
                              <input type="text" className="form-control" id="lastname" name="lastname"  value={lastname} onChange={lastnameChangeHandler} required/>

                          </div>

                          <div className="form-group mt-2">

                              <label className="form-label" forhtml="email">Email</label>
                              <input type="email" className="form-control" id="email" name="email" value={email} onChange={emailChangeHandler} required/>

                          </div>

                          <div className="form-group mt-2">

                              <label className="form-label" forhtml="phone">Phone</label>
                              
                              
                              <PhoneInput
                                      placeholder="Enter phone number"
                                      value={ phone }
                                      international
                                      defaultCountry="ZA"
                                      required
                                      name="phone"
                                      className="form-control"
                                    onChange={setPhone} />

                          </div>

                          <div className="form-group mt-2">

                              <label className="form-label" forhtml="street_name">Street name & number </label>
                              <input type="text" className="form-control" id="street_name" name="street_name"  onChange={streetnameChangeHandler} required />

                          </div>

                           <div className="form-group mt-2">

                              <label className="form-label" forhtml="suburb">Suburb (Optional)</label>
                              <input type="text" className="form-control" id="suburb" name="suburb"  onChange={suburbChangeHandler}/>

                          </div>

                          <div className="form-group mt-2">

                              <label className="form-label" forhtml="city">City</label>
                              <input type="text" className="form-control" id="city" name="city"  onChange={cityChangeHandler} required/>

                          </div>


                          <div className="form-group mt-2">

                              <label className="form-label" forhtml="province">Country and Province/Region</label> <br/>
                            
                            <div className="row">

                              <div className="col-12 col-md-8 mb-2 mb-md-0">
                                <CountryDropdown
                                  value={country}
                                  onChange={(val) => setCountry(val)} 
                                    required
                                    className="form-select"
                                  />

                                </div>

                              <div className="col-12 col-md-4">

                                  <RegionDropdown
                                    country={country}
                                    value={province}
                                    onChange={(val) => setProvince(val)} 
                                    className="form-select"
                                    required
                                    />
                              </div>

                              </div>
                                
                          </div>


                          <div className="form-group mt-2">

                              <label className="form-label" forhtml="postal_code">Postal Code</label>
                              <input type="text" className="form-control" id="postal_code" name="postal_code"  onChange={postalcodeChangeHandler} required/>

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