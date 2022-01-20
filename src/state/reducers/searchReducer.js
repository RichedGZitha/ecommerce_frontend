import {Types} from '../actions/actionTypes';


const initState = {"search":"", "category":"Balls"};

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