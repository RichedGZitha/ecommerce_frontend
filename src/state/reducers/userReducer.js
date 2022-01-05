import {Types} from '../actions/actionTypes';


let user = JSON.parse(localStorage.getItem('ecom_user'));

const initState = user ? user : { username: undefined, id:undefined , email: undefined, first_name: undefined, last_name:undefined, isManager:false, isSeller:false};

const userReducer = (state = initState, action) => {
	
	switch(action.type)
	{
		case Types.UPDATE_USER:
		
			// update the state
			return{

				username: action.user.username,
				id: action.user.id,
				email : action.user.email,
				last_name:action.user.last_name,
				first_name:action.user.first_name,
				isSeller:action.user.isSeller,
				isManager:action.user.isManager
				
			};
				
		case Types.GET_USER:
		{
			return initState;
		}
		
		default:
		{
			return state;
		}
	}

}	

export default userReducer;