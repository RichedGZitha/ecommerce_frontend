import Button from 'react-bootstrap/Button';
import ModalDialog from 'react-bootstrap/ModalDialog';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';

import { useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useState, useEffect, useContext } from "react";
import {getProductReviews, createProductReview, editProductReview} from '../../services/productService';
import '../../App.css';
import Stars from "../Stars";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';


// maps the props to the reducer state.
const mapStateToProps = (state) => {
    
    return {
      user: state.userReducer,
      profile:state.userProfileReducer,
      isLoggegIn: state.loginReducer.isAuthenticated, 
    }
  }

function ProductReviews({ productIDProp = -1, product}) {
	   
   const [pastReviews, setPastReviews] = useState([]); 

   const [productID, setproductID] = useState(productIDProp);
   const user = useSelector(mapStateToProps);
   const [stars, setStars] = useState(5);
   const [review, setReview] = useState('');
    let  history = useHistory();
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);


   // if a user has th edit their review 
   const [editMyReviewID, setEditMyReviewID] = useState(-1);

   const [editMyReviewStars, setEditMyReviewStars] = useState(5);
   const [editMyReviewSReview, setEditMyReviewsReviews] = useState('');


   // Edit: changes the value of the stars
   const handleEditStarsChanges = (e)=>
   {
      setEditMyReviewStars((prev)=>e.target.value);
   }

   // Edit: change edit review value
   const handleEditReviewChanges = (e)=>
   {
      setEditMyReviewsReviews((prev)=>e.target.value);
   }

   // go to the signin page.
   const gotoSignin = ()=>{
    history.push('/signin');
   }
   
   const starsChangeHandler = (e)=>{

      setStars((prev)=> e.target.value);
      
     // history.push(url);
   }


  const reviewsChangeHandler = (e)=>{

    setReview((prev)=> e.target.value);
      
     // history.push(url);
  }

  // get reviews
  const getReviews = async()=>
  {  
      let reviews = await getProductReviews(productID);

      if(reviews.isError === false)
      {
        setPastReviews((prev)=>[...reviews.reviews]);

        // editable review
        const editable = (pastReviews.filter((rev)=>rev.id === user.user.id))[0];

         if(editable !== undefined)
           {
              setEditMyReviewID((prev)=>editable['id']);
           }
      }

      else
      {
        reviews = await getProductReviews(productID);

        if(reviews.isError === false)
        {
           setPastReviews((prev)=>[...reviews.reviews]);

           // set editable review.
           const editable = (pastReviews.filter((rev)=>rev.id === user.user.id))[0];

           if(editable !== undefined)
           {
              setEditMyReviewID((prev)=>editable['id']);
           }
           
           
        }
       
  
      }
  }


   // submit a review.
   const handleReviewSubmit = async(e)=>{
        e.preventDefault();

      if(productID !== -1 && user.isLoggegIn === true)
      {
        
          const reviewResult =  await createProductReview(user.user.id, productID, stars, review);
        
          if(reviewResult.isError === false)
          {
            // set a notification.
            store.addNotification({
                          title: 'Product review success',
                          message: 'Congradulation you have successfully reviewed this product.',
                          type: 'success',                         // 'default', 'success', 'info', 'warning'
                          container: 'top-left',                // where to position the notifications
                          animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                          animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                          dismiss: {
                            duration: 0
                          }
                      });


              getReviews();

            }

            else
            {
                let error_msg = reviewResult.non_field_errors !== null || reviewResult.non_field_errors !== undefined ? "Sorry, you can only make 1 review per product" : "Could not submit the product due to an unknown error.";
                          // show notification.
                    store.addNotification({
                        title: 'Product review error',
                        message: error_msg,
                        type: 'danger',                         // 'default', 'success', 'info', 'warning'
                        container: 'top-left',                // where to position the notifications
                        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                        dismiss: {
                          duration: 0
                        }
                    });

            }
      }

   }


   // edit review
   const handleReviewEdit = async(e)=>{
        e.preventDefault();

      if(editMyReviewID !== -1 && user.isLoggegIn === true)
      { 
          const reviewEditResult =  await editProductReview(editMyReviewID, editMyReviewStars, editMyReviewSReview);
        
          if(reviewEditResult.isError === false)
          {
            // set a notification.
            store.addNotification({
                          title: 'Product edit success',
                          message: 'Congradulation you have successfully edited your review  of this product.',
                          type: 'success',                         // 'default', 'success', 'info', 'warning'
                          container: 'top-left',                // where to position the notifications
                          animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                          animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                          dismiss: {
                            duration: 0
                          }
                      });


              getReviews();
              handleClose();
              setEditMyReviewStars(()=>5);

            }

            else
            {
                /*let error_msg =  "Could not submit the product due to an unknown error.";
                          // show notification.
                    store.addNotification({
                        title: 'Product review error',
                        message: error_msg,
                        type: 'danger',                         // 'default', 'success', 'info', 'warning'
                        container: 'top-left',                // where to position the notifications
                        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                        dismiss: {
                          duration: 0
                        }
                    });

                    */

                    getReviews();
                    handleClose();
                    setEditMyReviewStars(()=>5);


            }
      }

   }



   useEffect(()=>{

        getReviews();


   }, []);


   // format date to human readable one.
   const getFormatedDate = (date)=>{

      return new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "long", day: "2-digit" }).format(new Date(date));

   }

   /** edit your own review
   const editReview = ()=>{
        setEditMyReviewID(()=>review_id);
   }*/

   // renders list of comments
   const renderComments = ()=>
   {
      return <div className="container-fluid">
                <div className="row">

                    { pastReviews.map((rev, index)=>(

                      <div className="col-12 p-0 mt-2" key={index}>

                                <div className="row">

                                    <div className="col-4">
                                        <img src={rev.avatar} className="img img-thumbnail img-fluid" height="100" width="100" alt={rev.username} />
                                    </div>

                                    <div className="col-8">
                                      <p> Posted {getFormatedDate(rev.created)}  {rev.is_edited === true && <strong>| Edited</strong>}</p>
                                      <Stars stars_count={rev.stars_count} no_text={true} />
                                    </div>

                                </div>

                                <div className="row">
                                  <div className="col-12">
                                      

                                      <br/>

                                      <figure>
                                            <blockquote className="blockquote">
                                              <p> {rev.review} </p>
                                            </blockquote>
                                            <figcaption className="blockquote-footer">
                                              said by <cite title="Source Title">{rev.username}</cite>
                                            </figcaption>
                                      </figure>

                                  </div>
                                </div>

                                { rev.user === user.user.id && user.isLoggegIn === true
                                  ?
                                <div className="row">
                                  <div className="col-12">
                                      <button type="button" className="rounded-pill col-md-6 col-12 btn btn-info" onClick={handleShow}> Edit </button>
                                  </div>
                                </div>
                                : ''
                                }

                                <hr />

                      </div>




                    ))

                  }

                </div>
            </div>;

   }


  return (

    <div className="row">
      <div className="col-12">

      {/* Model here */}

              
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your Review</Modal.Title>
        </Modal.Header>

        <Modal.Body>

        <form className="mb-4" method="post" onSubmit={handleReviewEdit}>

                      <div className="form-group">
                        <label forhtml="starsEdit" className="form-label"> Rate this product :  <strong>{editMyReviewStars}  stars</strong></label>

                        <input type="range" className="form-range form-control" min="0" max="5" step="1" id="starsEdit" name="stars" onChange={handleEditStarsChanges} required/>

                      </div>

                      <div className="form-group">
                        <label forhtml="reviewEdit" className="form-label"> Write a review </label>

                        <textarea type="textarea" id="reviewEdit" name="review" className="form-control"  onChange={handleEditReviewChanges} required/>

                      </div>

                      <input type="submit" className="btn-pill text-white primary-color mt-4 p-2 form-control"    value="Edit Review" />

                  </form>

        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="danger" onClick={handleClose} className="btn-pill text-white">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

          {/* end of modal*/}


      <div className="card rounded-0">
        <div className="card-body">
  
            <div className="row">
              <div className="col-12 col-md-4">

              {user.isLoggegIn === true && productIDProp !== -1
                ?
                <div>
                  <h4 className="section-title"> Review this product </h4>

                  <form onSubmit={handleReviewSubmit} className="mb-4" method="post">

                      <div className="form-group">
                        <label forhtml="stars" className="form-label"> Rate this product :  <strong>{stars}  stars</strong></label>

                        <input type="range" className="form-range form-control" min="0" max="5" step="1" id="stars" name="stars" onChange={starsChangeHandler} required/>

                      </div>

                      <div className="form-group">
                        <label forhtml="review" className="form-label"> Write a review </label>

                        <textarea type="textarea" id="review" name="review" className="form-control"  onChange={reviewsChangeHandler}   required/>

                      </div>

                      <input type="submit" className="btn-pill text-white primary-color mt-4 p-2 form-control"    value="Submit Review" />

                  </form>
                  </div>
                  :

                  <div>
                      <Button variant="default" className="btn-pill primary-color text-white" onClick={gotoSignin}> Please login to write a review</Button>
                  </div>
              }


              </div>

            {/* start of comments section*/}
              <div className="col-12 col-md-8">
                <h4 className="section-title"> Reviews comments </h4>

                {pastReviews.length > 0 && 
                  <div>
                     <h6> Average of {product.average_stars} out of 5 stars </h6>
                     <hr/>

                     {renderComments()}

                  </div>

                }




                    


                
              </div> {/* end of comments section*/}


                
            </div>
        </div>
      </div>


    </div>
  </div>
  );
}

export default ProductReviews;