import {Types} from '../actions/actionTypes';


let profile = JSON.parse(localStorage.getItem('ecom_user_profile'));

const initState = profile ? profile : { id:undefined , avatar: undefined, header: undefined, loyaltypoints:0, country:undefined, contact:undefined};

const userProfileReducer = (state = initState, action) => {
	
	switch(action.type)
	{
		case Types.UPDATE_PROFILE:
		
			// update the state
			return{

				avatar: action.profile.Avatar,
				id: action.profile.id,
				header : action.profile.HeaderImage,
				loyaltypoints:action.profile.loyaltyPoints,
				country:action.profile.Country,
				contact:action.profile.Contact
				
			};
				
		case Types.GET_PROFILE:
		{
			return initState;
		}
		
		default:
		{
			return state;
		}
	}

}	

export default userProfileReducer;