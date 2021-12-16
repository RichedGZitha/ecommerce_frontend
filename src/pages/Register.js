import '../App.css';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { Link as link } from 'react-router-dom'

//import { useSelector} from 'react-redux';
import { useState } from "react"
import { useHistory } from 'react-router-dom';
import { store } from 'react-notifications-component';

import 'react-notifications-component/dist/theme.css';
import 'animate.css';

import {register as RegisterAuth} from '../services/authService';

const Register = ()=>{

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [isError, setIsError] = useState(false);

    const [errors, setErrors] = useState([]);
	let history = useHistory();

    // submit post request
    async function registerPOST(e){

        e.preventDefault();
        
        setIsError((prev)=>{
            return false;
        })
		
        setErrors((prev) =>{ 
            return [];
        });

        
        const registerResult = await RegisterAuth(username, email, password, confirmpassword);    
        
        if(registerResult.isError === false)
		{		// show notification.
				store.addNotification({
					title: 'Account Created',
					message: registerResult.success,
					type: 'success',                         // 'default', 'success', 'info', 'warning'
					container: 'top-left',                // where to position the notifications
					animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
					animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
					dismiss: {
					  duration: 0
					}
				});
				
				// redirect to sign up.
				history.push('/signin');
        }
         
        else
        {
            // update the state
            const error_messages = registerResult.errors;
            if(error_messages.length > 0)
            {
                setErrors((prev)=>{
                    return [...prev, ...error_messages];
                });
                                
                setIsError(()=>true);
            }

        }
			  
    }

    // handle username change
    const usernameChange = (e)=>{
        setUsername(e.target.value);
    }

    // handle email change
    const emailChange = (e)=>{
        setEmail(e.target.value);
    }

    // handle password change
    const passwordChange = (e)=>{
        setPassword(e.target.value);
    }

    // handle confirm password change
    const confirmPasswordChange = (e)=>{
        setConfirmPassword(e.target.value);
    }

    // errors render list
    const showErrors = errors.map((error, index) =>
                            
        <Alert variant="danger" key={index}>{error}</Alert>
       
    );

    return (
    <div className="container">

        <div className="row">
            <div className="col-12 col-md-6 offset-md-3">
            <h1 className="offset-5">Sign Up</h1>

                {isError === true &&
                        <div>
                             {showErrors instanceof Array && showErrors}
                        </div>
                }

                <Form id="registerForm" onSubmit={registerPOST}>

                <div className="form-group mb-2">
                        <label htmlFor="name" className="form-label">Username</label>
                        
                        <input id="username" required type="text" name="username" className="form-control" placeholder="username" onChange={usernameChange}/>
                        

                    </div>

                    <div className="form-group mb-2">
                        <label htmlFor="email" className="form-label">Email</label>
                        
                        <input id="email" required type="email" name="email" className="form-control" placeholder="email@example.com" onChange={emailChange}/>
                        <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                        </Form.Text>

                    </div>

                    <div className="form-group mb-2">
                        <label htmlFor="password" className="form-label">Password</label>
                        
                        <input id="password" required type="password" name="password" className="form-control" placeholder="password" onChange={passwordChange}/>
                        <Form.Text className="text-muted">
                                Must be at lease 8 characters long. Must contain numbers (0-9), alphabets (A-Z, a-z) and special characters.
                        </Form.Text>
						
						
                    </div>

                    <div className="form-group mb-2">
                        <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                        
                        <input id="confirmpassword" required type="password" name="confirmpassword" className="form-control" placeholder="confirm password" onChange={confirmPasswordChange}/>                        
						
					</div>
                    <div className="form-group">
                        
                        <input id="submit"  className="btn primary-color text-white form-control rounded-pill" type="submit"/>
                        <br></br>

                        <Alert.Link to="/signin" as={link} className="primaryColor"> Already have an account? Sign in</Alert.Link>
                        
                    </div>

                </Form>
            </div>

        </div>
        
    </div>);
}

export default Register;