import {Types} from '../actions/actionTypes';


const initState = {"search":"", "category":"All", "count":10, "min_price":0.0, "max_price":10000.0, "search_products":[]};

const searchReducer = (state = initState, action) => {
	
	switch(action.type)
	{
		case Types.UPDATE_SEARCH:
		
			// update the state
			return action.search
				
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

export default searchReducer;