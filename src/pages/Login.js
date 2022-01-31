import '../App.css';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';

import { Link as link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';

import { useDispatch } from "react-redux";
import { useState, useEffect } from "react"

import {login} from '../services/authService';
import {getUserInfo} from '../services/userService';

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

import {CONSTANTS} from '../constants';
	
const Signin = ()=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);

    const search = useLocation().search;
    const next = new URLSearchParams(search).get('next');;

    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{

        document.title = `Signin - ${CONSTANTS.ECOM_WEBSITE_NAME}`;

    }, []);

    // errors render list
    const showErrors = errors.map((error, index) =>
                            
        <Alert variant="danger" key={index}>{error}</Alert>
       
    );

    //const messages = [{'error':true, 'value':'testing'}, {'error':false, 'value':'testing 2'}];
    let history = useHistory();

    const handleEmailChange = (e) =>{
        setEmail((prev)=>{

            prev = e.target.value
            return prev;
        });
    }

    const handlePasswordChange = (e) =>{
        setPassword((prev)=>{

            prev = e.target.value
            return prev;
        });
    }
	
	
    async function handleLoginPOST(e){

            e.preventDefault();

            setIsError((prev)=>{
                return false;
            })
        
            setErrors((prev) =>{ 
                return [];
            });
            
            
            const loginResult =  await login(email, password, dispatch);
			
			// call function to refresh token every 5 min.
			//setInterval(await refreshTokenRequest(refresh, dispatch),  5 * 60 * 1000);

            // if no request errors occured.
            if (loginResult.isError === false)
            {
                
                const updateUser = await getUserInfo(dispatch);

                if(updateUser.isError === false)
                {
                        // show notification.
                    store.addNotification({
                        title: 'Login Successful',
                        message: 'You have Successfully logged in to your account.',
                        type: 'success',                         // 'default', 'success', 'info', 'warning'
                        container: 'top-left',                // where to position the notifications
                        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                        dismiss: {
                          duration: 0
                        }
                    });



                    // if next was not provided.
                    if(next === undefined || next === null)
                    {
                       history.push('/');  
                    }

                    else
                    {
                        history.push(next);
                    }
                   

                }

                

            }
                
            else 
            {
                        
               let error_messages = [];
               const errors_result = loginResult['errors'];

                if(errors_result !== undefined)
                {
                    error_messages = [...error_messages, ...errors_result];
                }
                
                
                // update the state
                if(error_messages.length > 0)
                {
                    setErrors((prev)=>{
                        return [...prev, ...error_messages];
                    });
                            
                    setIsError(()=>true);
                        
                }
            }


    }

    return (<div className="container">


        <div className="row">
            <div className="col-12 col-md-6 offset-md-3">
            <h1 className="offset-5">Sign In</h1>

                {isError === true &&
                        <div>
                             {showErrors instanceof Array && showErrors}
                        </div>
                }

                <Form id="loginForm" onSubmit={handleLoginPOST}>

                    <div className="form-group mb-2">
                        <label forhtml="email">Email</label>
                        
                        <input id="email" type="email" name="email" className="form-control" placeholder="email@example.com" onChange={handleEmailChange} required />
                        
                    </div>

                    <div className="form-group mb-2">
                        <label forhtml="current-password">Password</label>
                        
                        <input id="current-password" type="password" name="current-password" className="form-control" placeholder="password" onChange={handlePasswordChange} required/>
                        
                    </div>

                    
                    <div className="form-group">
                        
                        <input type="submit" id="submit" variant="whiteborder" className="primary-color rounded-pill form-control text-white" value="Sign in"/> 
                        <br></br>

                        <Alert.Link to="/reset-password" as={link} className="mr-auto">Forgot your Password?</Alert.Link>
                        <br></br>
                        <Alert.Link to="/signup" as={link} className="mr-auto">No account? Sign up</Alert.Link>
                    </div>

                </Form>
            </div>

        </div>
        
    </div>);
}

export default Signin;