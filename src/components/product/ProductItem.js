import Button from 'react-bootstrap/Button';

import { useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useState } from "react";
import {addToCart} from '../../services/cartService';
import '../../App.css'


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

      <div className="card rounded-0">

        <img src={product.front_image} className="img-fluid" alt="Image"  onClick={gotoProductDetails}/>
        <div className="card-body">
            {isFeatured === true ?<span className="badge rounded-pill bg-success">Featured</span>:''}
            {isSpecial === true ?<span className="badge rounded-pill bg-danger">On Special</span>:''}
            {membership === true ?<span className="badge rounded-pill bg-primary text-wrap">Membership Discount</span>:''}

            <h5 className="card-title text-wrap text-link" onClick={gotoProductDetails}>{product.name}  
            </h5>


            {isSpecial
            ? 
              <p><span className="text-decoration-line-through small">R {product.Price}</span> <span className="text-danger text-nowrap">{new Intl.NumberFormat("en-ZA", {style: "currency", currency: "ZAR"}).format(product.price)}</span></p>
            : <p className="text-danger">R {new Intl.NumberFormat("en-ZA", {style: "currency", currency: "ZAR"}).format(product.price)}</p>}


          {/* TODO: render avarage star count out of 5 */}
            {product.stars
              ? <p></p>

              : ''
            }



            <Button variant="primary" onClick={addToCartHandler} className="btn-pill primary-color col-12 mb-2 text-nowrap"> Add to Cart</Button>{' '}

            <Button variant="warning" onClick={gotoProductDetails} className="btn-pill border border-warning text-dark col-12 text-nowrap"> See Details </Button>{' '}

        </div>
      </div>
  );
}

export default ProductItem;