import Button from 'react-bootstrap/Button';

import { useSelector, useDispatch} from 'react-redux';
import { Link as link, useHistory, useLocation, useParams } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';

import { useState, useEffect } from "react";
import {addToCart} from '../../services/cartService';
import '../../App.css'

import Stars from "../Stars";


function ProductItem({product, isSpecial = false, isFeatured = false, membership=false}) {

   let history = useHistory();
   const dispath = useDispatch();
 
   const addToCartHandler = ()=>{

      const id = product.id;
      const unitprice = product.price;
      const name = product.name;
      const img_url = product.front_image;

      // add to the cart.
      addToCart(id, name, unitprice, img_url, 1, dispath);

   }


   const gotoProductDetails = ()=>{

      const id = product.id;
      const url = "/product/" + id;

      history.push(url);
   }


  return (

      <div className="card rounded-0 h-100 card-width">

        <img src={product.front_image} className="img card-img-top change-cursor" alt="Image"  onClick={gotoProductDetails} height="150" width="150" />
        <div className="card-body">
            {isFeatured === true ?<span className="badge rounded-pill bg-success">Featured</span>:''}
            {isSpecial === true ?<span className="badge rounded-pill bg-danger">On Special</span>:''}
            {membership === true ?<span className="badge rounded-pill bg-primary text-wrap">Membership Discount</span>:''}

            <h6 className="card-title text-wrap text-link change-cursor" onClick={gotoProductDetails}>{product.name}  
            </h6>


            <div className="d-flex align-content-end flex-wrap">
                {isSpecial
                ? 
                  <p><span className="text-decoration-line-through small">{new Intl.NumberFormat("en-ZA", {style: "currency", currency: "ZAR"}).format(product.price)}</span> <span className="text-danger text-nowrap">{new Intl.NumberFormat("en-ZA", {style: "currency", currency: "ZAR"}).format(product.price)}</span></p>
                : <p className="text-danger">{new Intl.NumberFormat("en-ZA", {style: "currency", currency: "ZAR"}).format(product.price)}</p>}


                <Stars stars_count={product.average_stars} no_text={true} />

                {product.in_stock === true &&
                
                  <Button variant="primary" onClick={addToCartHandler} className="btn-pill primary-color col-12 mb-2 text-nowrap"> Add to Cart  <span className="material-icons align-middle">shopping_cart</span></Button>

                }

                <Button variant="warning" onClick={gotoProductDetails} className="btn-pill border border-warning text-dark col-12 text-nowrap"> See Details </Button>{' '}

            </div>
        </div>
      </div>
  );
}

export default ProductItem;