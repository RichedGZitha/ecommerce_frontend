const initState =
{
		refresh: '',
		access : '',
		isAuthenticated: false,
		exipires: ''
}


const loginReducer = (state = initState, action) => {
	
	switch(action.type)
	{
		case 'login':
		{
			
			// call functions to login using api.
			
			
			// update the state
			/*
				state.login.refresh = '';
				state.login.access = '';
				state.login.isAuthenticated = true;
				state.login.expires = '';
			*/
			return state;
			
		}
		
		case 'logout':
		{
			state.login.refresh = '';
			state.login.access = '';
			state.login.isAuthenticated = false;
			state.login.expires = '';
			
			return state;
		}
		
		default:
		{
			return state;
		}
	}

}	

export default loginReducer;