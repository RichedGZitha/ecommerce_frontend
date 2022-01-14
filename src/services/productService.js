import axiosInstance from "./axiosBase";
import {header} from './header';


async function getAllCategories(){


	let isError = false;
	let error_messages = [];
	let categories = [];

	const url = "/products/get-all-categories/";
            
    await axiosInstance.get(url,)
              .then(function (response) {

                if(response.data){
                   
                    categories = ['All', ...response.data.map((obj)=>obj.Name)];
                   
                }
                
              })
              .catch(function (error) {

                    if(error.response)
                    {    
                        const data = error.response.data;

                        // details of the error.
                        if(data['detail'] !== undefined)
                        {
                            error_messages = [...error_messages, data['detail']];
                        }
                    
                        
                        // update the state.
                        if(error_messages.length > 0)
                        {
                            isError = true;
                        }

                        else
                        {
                            error_messages = [...error_messages, 'Something went wrong.'];
                            isError = true;
                        }
                    }

                    // any other error
                    else
                    {
                        error_messages = [...error_messages, 'Something went wrong. It may be due to your internet connection.'];
                        isError = true;
                    }
                    
              });


             return {'isError':isError, 'errors':error_messages, 'categories':categories};
                    

}



// get special products
async function getSpecialProducts(){


	let isError = false;
	let error_messages = [];
	let products = [];

	const url = "/products/get-products";
            
    await axiosInstance.get(url, { params: { special: 'yes' , 'count':4} })
              .then(function (response) {

                if(response.data){
                   
                    products = [...response.data];
                   
                }
                
              })
              .catch(function (error) {

                    if(error.response)
                    {    
                        const data = error.response.data;

                        // details of the error.
                        if(data['detail'] !== undefined)
                        {
                            error_messages = [...error_messages, data['detail']];
                        }
                    
                        
                        // update the state.
                        if(error_messages.length > 0)
                        {
                            isError = true;
                        }

                        else
                        {
                            error_messages = [...error_messages, 'Something went wrong.'];
                            isError = true;
                        }
                    }

                    // any other error
                    else
                    {
                        error_messages = [...error_messages, 'Something went wrong. It may be due to your internet connection.'];
                        isError = true;
                    }
                    
              });


             return {'isError':isError, 'errors':error_messages, 'products':products};
                    

}


// get featured products
async function getFeaturedProducts(){


	let isError = false;
	let error_messages = [];
	let products = [];

	const url = "/products/get-products";
            
    await axiosInstance.get(url, { params: { featured: true , 'count':6} })
              .then(function (response) {

                if(response.data){
                   
                    products = [...response.data];
                   
                }
                
              })
              .catch(function (error) {

                    if(error.response)
                    {    
                        const data = error.response.data;

                        // details of the error.
                        if(data['detail'] !== undefined)
                        {
                            error_messages = [...error_messages, data['detail']];
                        }
                    
                        
                        // update the state.
                        if(error_messages.length > 0)
                        {
                            isError = true;
                        }

                        else
                        {
                            error_messages = [...error_messages, 'Something went wrong.'];
                            isError = true;
                        }
                    }

                    // any other error
                    else
                    {
                        error_messages = [...error_messages, 'Something went wrong. It may be due to your internet connection.'];
                        isError = true;
                    }
                    
              });


             return {'isError':isError, 'errors':error_messages, 'products':products};
                    

}


// get single product
async function getSingleProduct(id){


    let isError = false;
    let error_messages = [];
    let product = undefined;

    const url = "/products/get-product-public/" + id + "/";
            
    await axiosInstance.get(url,)
              .then(function (response) {

                if(response.data){
                   
                    product = response.data;
                   
                }
                
              })
              .catch(function (error) {

                    if(error.response)
                    {    
                        const data = error.response.data;

                        // details of the error.
                        if(data['error'] !== undefined)
                        {
                            error_messages = [...error_messages, data['error']];
                        }
                    
                        
                        // update the state.
                        if(error_messages.length > 0)
                        {
                            isError = true;
                        }

                        else
                        {
                            error_messages = [...error_messages, 'Something went wrong.'];
                            isError = true;
                        }
                    }

                    // any other error
                    else
                    {
                        error_messages = [...error_messages, 'Something went wrong. It may be due to your internet connection.'];
                        isError = true;
                    }
                    
              });


             return {'isError':isError, 'errors':error_messages, 'product':product};
                    
}


// get reviews
async function getProductReviews(product_id){


    let isError = false;
    let error_messages = [];
    let reviews = undefined;

    const url = `/products/get-reviews/${product_id}/`;
        
    await axiosInstance.get(url,)
              .then(function (response) {

                if(response.data){
                   
                    reviews = response.data;
                   
                }
                
              })
              .catch(function (error) {

                    if(error.response)
                    {    
                        const data = error.response.data;

                        // details of the error.
                        if(data['error'] !== undefined)
                        {
                            error_messages = [...error_messages, data['error']];
                        }
                    
                        
                        // update the state.
                        if(error_messages.length > 0)
                        {
                            isError = true;
                        }

                        else
                        {
                            error_messages = [...error_messages, 'Something went wrong.'];
                            isError = true;
                        }
                    }

                    // any other error
                    else
                    {
                        error_messages = [...error_messages, 'Something went wrong. It may be due to your internet connection.'];
                        isError = true;
                    }
                    
              });


             return {'isError':isError, 'errors':error_messages, 'reviews':reviews};
                    
}


// post a product review
async function createProductReview(userID,productID, stars, review){

    let isError = false;
    let error_messages = [];
    let result = undefined;

    const data = {'starsCount': stars, 'user': userID, 'product': productID, 'review': review};
    const url = "/products/create-review/";
            
        await axiosInstance.post(url, data, {headers: header})
              .then(function (response) {

                if(response.data){
                   
                    result = response.data;

                }
                
              })
              .catch(function (error) {

                    if(error.response)
                    {
                        
                        const data_ = error.response.data;
                         
                        if(data_ !== undefined)
                        {
                                error_messages = [...error_messages, data_['detail']];
                        }
                        
                        
                        // update the state.
                        if(error_messages.length > 0)
                        {
                            isError = true;
                        }

                        else
                        {
                            error_messages = [...error_messages, 'Something went wrong.'];
                            isError = true;
                        }
                    }

                    // any other errors including network connection.
                    else
                    {
                        error_messages = [...error_messages, 'Something went wrong. It might be your internet connection.'];
                        isError = true;
                    }
                    
              });


              return {'isError': isError, 'errors': error_messages, 'data': result};
    }


    // edit reviews
    async function editProductReview(reviewID, stars, review){

    let isError = false;
    let error_messages = [];
    let result = undefined;

    const data = {'starsCount': stars, 'review': review};
    const url = "/products/edit-product-review/" + reviewID + "/";
            
        await axiosInstance.post(url, data, {headers: header})
              .then(function (response) {

                if(response.data){
                   
                    result = response.data;

                }
                
              })
              .catch(function (error) {

                    if(error.response)
                    {
                        
                        const data_ = error.response.data;
                         
                        if(data_ !== undefined)
                        {
                                error_messages = [...error_messages, data_['detail']];
                        }
                        
                        
                        // update the state.
                        if(error_messages.length > 0)
                        {
                            isError = true;
                        }

                        else
                        {
                            error_messages = [...error_messages, 'Something went wrong.'];
                            isError = true;
                        }
                    }

                    // any other errors including network connection.
                    else
                    {
                        error_messages = [...error_messages, 'Something went wrong. It might be your internet connection.'];
                        isError = true;
                    }
                    
              });


              return {'isError': isError, 'errors': error_messages, 'data': result};
    }


/// calculate the grandprice as per the database
async function getGrandPrice(orders, discountcode = null){

    let isError = false;
    let error_messages = [];
    let result = undefined;

    const data =  discountcode === null || discountcode === undefined ? {'orders': orders}: {'orders': orders, 'discountcode':discountcode};

    const url = "/transactions/calculate-purchase/";
            
        await axiosInstance.post(url, data, {headers: header})
              .then(function (response) {

                if(response.data){
                   
                    result = response.data;

                }
                
              })
              .catch(function (error) {

                    if(error.response)
                    {
                        
                        const data_ = error.response.data;
                         
                        if(data_ !== undefined)
                        {
                                error_messages = [...error_messages, data_['detail']];
                        }
                        
                        
                        // update the state.
                        if(error_messages.length > 0)
                        {
                            isError = true;
                        }

                        else
                        {
                            error_messages = [...error_messages, 'Something went wrong.'];
                            isError = true;
                        }
                    }

                    // any other errors including network connection.
                    else
                    {
                        error_messages = [...error_messages, 'Something went wrong. It might be your internet connection.'];
                        isError = true;
                    }
                    
              });


              return {'isError': isError, 'errors': error_messages, 'data': result};
    }



export  {
	getAllCategories,
	getSpecialProducts,
	getFeaturedProducts,
    getSingleProduct,
    getProductReviews,
    createProductReview,
    editProductReview,
    getGrandPrice,

};