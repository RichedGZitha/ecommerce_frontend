import {Types} from '../actions/actionTypes';

// call this from service.
// user_auth : {refresh: undefined, access: undefined, isAuthenticated: false}
const loginActionCreator = (user_auth) => { 

	return { 
		type: Types.LOGIN, user_auth };
	}


const logoutActionCreator = () =>{

	localStorage.removeItem('ecom_user_auth');

	return {type:Types.LOGOUT};
}


export const actionCreators = {logoutActionCreator, 
	loginActionCreator};
