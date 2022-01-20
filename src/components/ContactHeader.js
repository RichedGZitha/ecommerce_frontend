import '../App.css';
//import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link as link, useHistory } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faCartShopping } from '@fortawesome/free-solid-svg-icons';

import { getCartCountStore} from '../services/cartService';

// maps the props to the reducer state.
const mapStateToProps = (state) => {
    
    return {
      cart: state.cartReducer,
      cartCount: getCartCountStore(state.cartReducer),
      search:state.searchReducer
    }
  }


const ContactHeader = ()=> {

   const languages = ['English', 'Afrikaans', 'Zulu'];
   const currencies = ['ZAR (R)', 'USD ($)', 'YEN'];
   const cart = useSelector(mapStateToProps);
   
  return (

        <div>

            <Navbar bg="dark" variant="dark"> 
                
                <Container>
                
                    {/* The search bar nav */}
                    <Nav className="me-auto">
                        <Nav.Link href="mailto:email@email.com" className="d-none d-sm-block"> email@email.com</Nav.Link>
                    </Nav>

                    {/* right links */}
                    <Nav className="mr-auto">

                        {/* Language dropdown */}
                        <NavDropdown title="Language" id="collasible-nav-dropdown">
                            
                            {
                                languages.map((language, index) =>(
                                    <NavDropdown.Item href="#" key={index}>{language}</NavDropdown.Item> 
                                ))
                            }
                                    
                        </NavDropdown>

                        {/* Currencies dropdown */}
                        <NavDropdown title="Currency" id="collasible-nav-dropdown">
                            
                            {
                                currencies.map((currency, index)=>(
                                    <NavDropdown.Item href="#" key={index}> {currency} </NavDropdown.Item>
                                ))
                            }
                            
                            
                        </NavDropdown>


                        {/* Cart naviagtion */}
                        <Nav.Link to="/cart" as={link} className="text-white">{cart.cartCount > 0?'Checkout':'Trolley'} <FontAwesomeIcon icon={faCartShopping} size="lg" /> <span className="badge rounded-pill primary-color">{cart.cartCount}</span></Nav.Link>

                    </Nav>
                </Container>
            </Navbar>
</div>
  )

};

export default ContactHeader;