
	
const getUserLocal =()=>{
		
		const authUserJSON = localStorage.getItem('ecom_user_auth');

		if(authUserJSON !== null)
		{
			const authUser = JSON.parse(authUserJSON);
		
			return authUser;
		}

		return undefined;

	}

const setAccessTokewn =(access)=>{
		
		const authUserJSON = localStorage.getItem('ecom_user_auth');

		const authUser = JSON.parse(authUserJSON);
		authUser['access']= access;

		const newUserAuth = JSON.stringify(authUser);
		localStorage.setItem('ecom_user_auth', newUserAuth);
	}

export  {getUserLocal, setAccessTokewn};