import { Link as link, useHistory, useParams } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import Alert from 'react-bootstrap/Alert';

import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {getSingleProduct} from '../services/productService';
import {addToCart} from '../services/cartService';
import ProductReviews from '../components/product/ProductReviews';
import Stars from "../components/Stars"; 

import '../App.css'
import {CONSTANTS} from '../constants';

// maps the props to the reducer state.
/*const mapStateToProps = (state) => {
		
		return {
			login: state.loginReducer,
			user: state.userReducer
		}
	}
*/


function ProductDetail({isSpecial = false, isFeatured = false, membership=false}) {
   
   const [isLoading, setIsLoading] = useState(true);
   const [product, setProduct] = useState({});

   const { id } = useParams();
   const dispatch = useDispatch();
   const history = useHistory();

   const gotoCart = ()=>
   {
   		history.push('/cart');
   }

   const changeDisplayPreview = (e)=>
   {

   		let preview = document.getElementById("preview");
   		preview.src = e.target.currentSrc;
   		
   }

   const addToCartHandler = ()=>{

      const id = product.id;
      const unitprice = product.price;
      const name = product.name;
      const img_url = product.front_image;

      // add to the cart.
      addToCart(id, name, unitprice, img_url,1, dispatch);

   }


   // get single product from api.
   const getProductDetails = async ()=>{

      let data = await getSingleProduct(id);

      if(data.isError === false)
      {
      		setProduct(()=>data.product);
      		setIsLoading((prev)=>false);
      }

   }

/*const  renderSimilars = ()=>{

  const items = product.similar.map((data,index)=><ProductItem product={data} key={index} className="col-3"/>);
  return items;

}*/

// handle the email submission
const handleEmailSubmit =(e)=>
{
	e.preventDefault();

	// submit an amail
	//console.log(e.target.email.value);
}

// use effect
useEffect(()=>{

		getProductDetails();


		document.title = `Product details - ${CONSTANTS.ECOM_WEBSITE_NAME}`;

}, []);


  return (

      <div className="container mt-4 mb-4">
            <div className="row">


            	{/*--- Main section */}

            	{isLoading === false
            	?
	            	<div className="col-12 col-md-10 ">
	            		<div className="row">

	            				{/* Image gallery section */}
				            	<div className="col-md-5 col-12">

				            		<div className="row">
				            			<div className="col-12">
				            				<img src={product.front_image} alt="FrontImage"  className="img rounded img-fluid product-image" id="preview" />
				            			</div>
				            		</div>

				            		<div className="row mt-4 mb-4">
				            			<div className="col-12">

				            				<img src={product.front_image} alt="FrontImage"  className="img img-thumbnail" onClick={changeDisplayPreview} height="50" width="50"/>
				            				<img src={product.rear_image} alt="RearImage"  className="img img-thumbnail ms-2" onClick={changeDisplayPreview}   height="50"  width="50"/>

				            			</div>
				            		</div>


				            	</div>

				                {/* Description section */}
				            	<div className="col-md-7 col-12">

				            		<h4> {product.name}</h4>
				            		<div>Sold by:  <Alert.Link to={"/shop" + "?brand="+ "name" } as={link}> Name </Alert.Link></div>
				            		<Stars stars_count={product.average_stars} no_text={true} />
				            		<hr/>



				            		<p><strong><span className="text-danger">{new Intl.NumberFormat("en-ZA", {style: "currency", currency: "ZAR"}).format(product.price)} </span></strong>  </p>

				            		<p>
				            			{product.description}
				            		</p>


				            		<hr/>

				            		{product.in_stock === true ?
				            		
				            			<Button variant="primary" onClick={addToCartHandler} className="btn-pill primary-color col-md-7 col-12 text-nowrap mb-2"> Add to Cart <span className="material-icons align-middle">shopping_cart</span></Button>
				            		:
				            			<div className="row">

				            					<h5> Product is out of stock </h5>
				            					<p> Please kindly provide your <strong>Email address </strong> below to get a notification when product is available.</p>
				            					<form method="post" onSubmit={handleEmailSubmit}>

				            						<div className="form-group">
				            							<input type="email" name="email" id="email" className="form-control rounded-pill" placeholder="email@email.com"/>
				            						</div>
				            						
				            						<div className="form-group mt-2 mb-4">
				            							<button type="submit" className="btn btn-pill primary-color text-white form-control">Submit </button>
				            						</div>
				            						
				            						
				            						
				            					</form>

				            					<hr/>

				            			</div>

				            		}

				            		<Button variant="success" className="btn-pill col-md-4 text-white col-12  text-nowrap mb-2" onClick={gotoCart}> Go to cart  <span className="material-icons align-middle">chevron_right</span></Button>{' '}

				            	</div>
				         </div>
				    </div>




			         :
			         	<div className="col-md-6 offset-md-3 col-12">

			         		<div className="text-center mt-4">
            					<div className="spinner-border" role="status">
               						<span className="visually-hidden">Loading</span>
             					</div>
          					</div>

			         	</div>
			     }



			    {/* Revievs, questions and answers, specification   use tabs */}

			    	
			    	<div className="row mt-4">
			    			<hr></hr>
			         		
			         		<Tabs defaultActiveKey="Reviews" id="uncontrolled-tab-example" className="mb-3">

			         			 <Tab eventKey="Specification" title="Specification">
								    <h5> Product Specification </h5>
										
								  </Tab>

								  <Tab eventKey="Description" title="Product Description">
								    		<h6> Full Product description here </h6>
								  </Tab>

								   <Tab eventKey="Reviews" title="Reviews">
								    		

								    		<ProductReviews productIDProp={id} product={product} />
								    	

								  </Tab>
							</Tabs>

			         </div>

            	</div>

            	
            	<div className="col-12 col-md-2">

            	</div>


            </div>
      
  );
}

export default ProductDetail;