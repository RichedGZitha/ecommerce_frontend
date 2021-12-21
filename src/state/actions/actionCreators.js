import {Types} from '../actions/actionTypes';

// call this from service.
// user_auth : {refresh: undefined, access: undefined, isAuthenticated: false}
const loginActionCreator = (user_auth) => { 

	// save to local storage.
    let resultJSON = JSON.stringify(user_auth);
    localStorage.setItem('ecom_user_auth', resultJSON);
	
	return { 
		type: Types.LOGIN, user_auth };
	}


// logout
const logoutActionCreator = () =>{

	localStorage.removeItem('ecom_user_auth');
	localStorage.removeItem('ecom_user');
	
	return {type:Types.LOGOUT};
}

// update user information.
const updateUserActionCreator = (user) => { 

	// save to local storage.
    let resultJSON = JSON.stringify(user);
    localStorage.setItem('ecom_user', resultJSON);
	
	return { 
		type: Types.UPDATE_USER, user};
}


export const actionCreators = {logoutActionCreator, 
	loginActionCreator, updateUserActionCreator};
