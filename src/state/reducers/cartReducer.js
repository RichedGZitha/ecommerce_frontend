import {Types} from '../actions/actionTypes';


let cart = JSON.parse(localStorage.getItem('ecom_cart'));

const initState = cart ? cart : [];

const cartReducer = (state = initState, action) => {
	
	switch(action.type)
	{
		case Types.UPDATE_CART:
		
			// update the state
			return action.cart
				
		case Types.GET_CART:
		{
			return initState;
		}
		
		default:
		{
			return state;
		}
	}

}	

export default cartReducer;