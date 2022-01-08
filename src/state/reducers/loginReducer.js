import {Types} from '../actions/actionTypes';


let user_auth = JSON.parse(localStorage.getItem('ecom_user_auth'));

const initState = user_auth ? {user_auth, isAuthenticated: true} : { refresh: undefined, access: undefined, isAuthenticated: false};

const loginReducer = (state = initState, action) => {
	
	switch(action.type)
	{
		case Types.LOGIN:
		
			// update the state
			return{

				refresh: action.user_auth.refresh,
				access: action.user_auth.access,
				isAuthenticated : true,
			};
		
		case Types.LOGOUT:
		{
			return { refresh: undefined, access: undefined, isAuthenticated: false};
		}
		
		default:
		{
			return state;
		}
	}

}	

export default loginReducer;