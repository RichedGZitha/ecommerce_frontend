import axiosInstance from "./axiosBase";
import  {actionCreators} from '../state/actions/actionCreators';

// refresh token
async function refreshTokenRequest(refresh, dispatch)
{
    let isError = false;
    let invalidToken = false;
    let error_messages = [];

    const url = "/auth/v1/jwt/refresh/";
    const data = {'refresh': refresh};
            
    await axiosInstance.post(url, data)
              .then(function (response) {

                if(response.data){
                   
                    // save response to redux store.
                    const access = response.data['access'];
                    
                    // set result variable (object).
                    let result = {'access': access, 'refresh': refresh};

                    // save to local storage.
                    let resultJSON = JSON.stringify(result);
                    localStorage.setItem('ecom_user_auth', resultJSON);

                    // update the store. using login action since it updates the store.
                    dispatch(actionCreators.loginActionCreator(result));
                }
                
              })
              .catch(function (error) {

                    if(error.response)
                    {    
                        const data = error.response.data;

                        if(data['code'] !== undefined)
                        {
                            //error_messages = [...error_messages, data['code']];

                            // expired or invalid token.
                            if(data['code'] === "token_not_valid")
                            {
                                invalidToken = true;
                            }

                        }

                        // details of the error.
                        if(data['detail'] !== undefined)
                        {
                            error_messages = [...error_messages, data['detail']];
                        }
                    
                        
                        // update the state.
                        if(error_messages.length > 0)
                        {
                            isError = true;
                        }

                        else
                        {
                            error_messages = [...error_messages, 'Something went wrong.'];
                            isError = true;
                        }
                    }

                    // any other error
                    else
                    {
                        error_messages = [...error_messages, 'Something went wrong. It may be due to your internet connection.'];
                        isError = true;
                    }
                    
              });

             // return {'isError': isError, 'errors': error_messages, 'invalidToken': invalidToken};
}

// logout function
async function logout (dispatch)
{
    dispatch(actionCreators.logoutActionCreator());
}


// login function.
async function login(email, password, dispatch){

    let isError = false;
    let error_messages = [];
    let access = '';
    let refresh = '';

    const data_ = {'email': email, 'password': password};
    const url = "/auth/v1/jwt/create/";
            
       await axiosInstance.post(url, data_)
              .then(function (response) {

                if(response.data){
                   
                    // save response to redux store.
                     access = response.data['access'];
                     refresh = response.data['refresh'];
                }
                
              })
              .catch(function (error) {

                    if(error.response !== undefined)
                    {
                        
                        const result = error.response.data;
                         
                        if(result !== undefined)
                        {
                                error_messages = [...error_messages, result['detail']];
                                isError = true;
                        }
                        
                        else
                        {
                            error_messages = [...error_messages, 'Something went wrong.'];
                            isError = true;
                        }
                    }

                    // any other errors including network connection.
                    else
                    {
                        error_messages = [...error_messages, 'Something went wrong. It might be your internet connection.'];
                        isError = true;
                    }
                    
              });


            if(isError === false)
            {

                // set result variable (object).
                let result = {'access': access, 'refresh': refresh};
                
                // update the store.
                dispatch(actionCreators.loginActionCreator(result));

                return {'isError': isError, 'errors': error_messages, 'auth': result};
            }

            else
            {
                return {'isError': isError, 'errors': error_messages, 'auth': ''};
            }

            
    }


    // register user
    async function register(username, email, password, confirmpassword)
    {
        const url = "/auth/v1/users/";
        
        let error_messages = [];
        let success_message = '';
        let isError = false;

        const user = {
                "username": username,
                "email": email,
                "password":password,
                "re_password":confirmpassword,
              };

              await axiosInstance.post(url, user)
              .then(function (response) {
                
                if(response.data)
                {
                    success_message = "Your account was successfully created. An email has been sent with further instructions to complete the signup process.";
                }
                
              })
              .catch(function (error) {
				  
				if (error.response) 
                {
                    const data = error.response.data;        
                    const username_errors = data["username"];
                    const email_errors = data["email"];
                    const password_errors = data["password"];
                    const re_password_errors = data["re_password"];
                            
                            
                    if(username_errors !== undefined)
                    {
                            error_messages = [...error_messages, ...username_errors];
                    }
                            
                    if(email_errors !== undefined)
                    {
                            error_messages = [...error_messages, ...email_errors];
                    }
                            
                            
                    if(password_errors !== undefined)
                    {
                        error_messages = [...error_messages, ...password_errors];
                    }
                            
                    // append repeat password errors..
                    if(re_password_errors !== undefined)
                    {
                        error_messages = [...error_messages, ...re_password_errors];
                    }
                            
                    // update the state
                    if(error_messages.length > 0)
                    {
                        isError = true;  
                    }

                    // any other error.
                    else
                    {
                        error_messages =  [...error_messages, 'Something went wrong.'];
                        isError = true;
                    }

				}

                else
                {
                    error_messages =  [...error_messages, 'Something went wrong. It might be your internet connection.'];
                    isError = true;
                }
				
              });


              return {'isError': isError, 'errors': error_messages, 'success': success_message};
			  
    }


// login function.
async function password_reset(email, dispatch){

    let isError = false;
    let error_messages = [];

    const data = {'email': email};
    const url = "/auth/v1/users/reset_password/";
            
        await axiosInstance.post(url, data)
              .then(function (response) {

                if(response.data){
                   
                   console.log(response.data);

                }
                
              })
              .catch(function (error) {

                    if(error.response)
                    {
                        
                        const data = error.response.data;
                         
                        if(data !== undefined)
                        {
                                error_messages = [...error_messages, data['detail']];
                        }
                        
                        
                        // update the state.
                        if(error_messages.length > 0)
                        {
                            isError = true;
                        }

                        else
                        {
                            error_messages = [...error_messages, 'Something went wrong.'];
                            isError = true;
                        }
                    }

                    // any other errors including network connection.
                    else
                    {
                        error_messages = [...error_messages, 'Something went wrong. It might be your internet connection.'];
                        isError = true;
                    }
                    
              });

              return {'isError': isError, 'errors': error_messages};
    }



    export {
            login, logout, refreshTokenRequest, register, password_reset
    };