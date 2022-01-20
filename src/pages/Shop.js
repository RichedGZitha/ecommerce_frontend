import React from 'react';

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link as link, useHistory, useLocation } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';

import '../App.css';
import {CONSTANTS} from '../constants';

// 
const mapStateToProps = (state) => {
    
    return {
      
      isLoggedIn: state.loginReducer.isAuthenticated,
      user: state.userReducer
    }
  }


  const Shop = ()=>{

  		return (

  			<div className="container mt-4">
  				<div className="row">

  						<h1> Shop</h1>

  				</div>
  			</div>



  			);
  }


  export default Shop;