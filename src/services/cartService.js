import axiosInstance from "./axiosBase";
import {CONSTANTS} from '../constants';
import  { actionCreators } from '../state/actions/actionCreators';
import {header} from './header';


// get the index of the product item.
const getItemIndex = (idParam, cart)=>  
{  
  let index = -1;  
  
  for(let i=0; i<cart.length; i++)  
  {  
        let id_ = cart[i].id;  
        
        if(id_ === idParam)
        {  
          index = i;  
          break;  
        }  
  }

  return index;  
}  


// remove item from cart
const removeFromCart = (id, dispatch) =>{

    let cartJSON = localStorage.getItem(CONSTANTS.ECOM_CART);
    
    if(cartJSON !== null)
    {
        let cart = JSON.parse(cartJSON);
        let newCart =  cart.filter((obj) =>{
            
            return Number(obj.id) !== Number(id);

        });

        localStorage.setItem(CONSTANTS.ECOM_CART, JSON.stringify(newCart));
        dispatch(actionCreators.updateCartActionCreator(newCart));

    }

}

// remove everything in cart
const removeAllCart = (dispatch) =>{

    localStorage.removeItem(CONSTANTS.ECOM_CART);
    dispatch(actionCreators.updateCartActionCreator([]));
}

// get cart number count from localstorage
const getCartCount = () =>{

    let cartJSON = localStorage.getItem(CONSTANTS.ECOM_CART);
    
    if(cartJSON !== null)
    {
        let cart = JSON.parse(cartJSON);
        
        let count = 0;

     for( let i = 0; i < cart.length; i++) 
     {
        count += Number(cart[i].quantity);
      }


        return count;
    }

    return 0;

}

// get cart count from store.
const getCartCountStore = (cart) =>{

    
    if(cart !== null || cart !== undefined || cart.length > 0)
    {
        
        let count = 0;

        for( let i = 0; i < cart.length; i++) 
        {
           count += Number(cart[i].quantity);
         }


        return count;
    }

    return 0;

}


// get all products in the cart.
const getAllCartProducts = () =>{

    let cartJSON = localStorage.getItem(CONSTANTS.ECOM_CART);
    
    if(cartJSON !== null)
    {
        let cart = JSON.parse(cartJSON);
        return cart;
    }

    return [];

}


// add a product to the cart.
// update the item if it is already in the cart. 
const addToCart = (id, name, unitprice, img_url, quantity = 1, dispatch)=>
{

    let cartJSON = localStorage.getItem(CONSTANTS.ECOM_CART);
    
    if(cartJSON !== null)
    {
        let cart = JSON.parse(cartJSON);

        // check if item id exists already.
        const index = getItemIndex(id, cart);
        if(index !== -1)
        {
            cart[index].quantity = cart[index].quantity + quantity;
            cart[index].price = cart[index].quantity * cart[index].unitprice;
        }

        else
        {
            // price , unit price, image url, quantity, id, name
            const item = {'id':id, 'name':name, 'unitprice':unitprice, 'price':unitprice * quantity, 'quantity': quantity, 'image_url':img_url};
            cart.push(item);
        }

        // save to local storage.
        localStorage.setItem(CONSTANTS.ECOM_CART, JSON.stringify(cart));
        dispatch(actionCreators.updateCartActionCreator(cart));
    }


    // create a whole new cart.
    else
    {
        // price , unit price, image url, quantity, id, name
        const cart = [];
        const item = {'id':id, 'name':name, 'unitprice':unitprice, 'price':unitprice * quantity, 'quantity': quantity, 'image_url':img_url};

        cart.push(item);

        localStorage.setItem(CONSTANTS.ECOM_CART, JSON.stringify(cart));
        dispatch(actionCreators.updateCartActionCreator(cart));

    }
	
}


// calculate the sub total.
const calculateSubtotalPrice = (cart)=>
{
   let cost = 0.0;
   for(let i =0;i < cart.length;i++)
   {
        cost +=cart[i]['price'];
   }


   return cost;

}


// calculate the tax total.
const calculateTax = (cart, tax_rate)=>
{
   let cost = 0.0;
   for(let i =0;i < cart.length;i++)
   {
        cost +=cart[i]['price'];
   }


   return cost * tax_rate;

}


// get coupon discount
// calculate the tax total.
// TODO: Call the API / Backend.
const getDiscount = (code)=>
{
   let cost = 0.0;
   


   return cost;

}


// calculate the shipping cost.
// TODO: Call the API / Backend.
const getShippingCost = ()=>
{
   let cost = 0.0;
   


   return cost;

}

// calculate the grand total.
const calculateGrandTotal = (cart, tax_rate)=>
{
   let tax = calculateTax(cart, tax_rate);
   let discount = getDiscount('code here');
   let shipping = getShippingCost()
   let subtoatl = calculateSubtotalPrice(cart);
   
   let cost = subtoatl + tax + shipping - discount 
   return cost ;

}

// update single item
const updateSingleItem = (id, quantity, dispatch)=>{


    let cartJSON = localStorage.getItem(CONSTANTS.ECOM_CART);
    
    if(cartJSON !== null)
    {
        let cart = JSON.parse(cartJSON);

        // check if item id exists already.
        const index = getItemIndex(id, cart);
        if(index !== -1)
        {
            cart[index].quantity = quantity;
            cart[index].price = quantity * cart[index].unitprice;

            localStorage.setItem(CONSTANTS.ECOM_CART, JSON.stringify(cart));
            dispatch(actionCreators.updateCartActionCreator(cart));
        }
        
    }


}

// get orders
const getOrders = () =>{

    let cartJSON = localStorage.getItem(CONSTANTS.ECOM_CART);
    
    if(cartJSON !== null)
    {
        let cart = JSON.parse(cartJSON);
        
        let orders = [];

     for( let i = 0; i < cart.length; i++) 
     {
        orders.push({'id': cart[i].id, 'quantity':cart[i].quantity});
      }


        return orders;
    }

    return [];

}


export  {
	addToCart,
    removeFromCart,
    getAllCartProducts,
    getCartCount,
    getCartCountStore,
    calculateSubtotalPrice,
    calculateGrandTotal,
    getDiscount,
    getShippingCost,
    calculateTax,
    updateSingleItem,
    removeAllCart,
    getOrders


};