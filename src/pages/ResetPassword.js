import '../App.css';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';

import { Link as link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react"

import {password_reset} from '../services/authService';

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import {CONSTANTS} from '../constants';


const ResetPassword = ()=>{

    const [email, setEmail] = useState('');
    const [isError, setIsError] = useState(false);

    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
            document.title = `${CONSTANTS.ECOM_WEBSITE_NAME} - Reset Password`;

    }, []);

    // errors render list
    const showErrors = errors.map((error, index) =>
                            
        <Alert variant="danger" key={index}>{error}</Alert>
       
    );

    let history = useHistory();

    const handleEmailChange = (e) =>{
        setEmail((prev)=>{

            prev = e.target.value
            return prev;
        });
    }


    async function handleResetPOST(e){

            e.preventDefault();

            setIsError((prev)=>{
                return false;
            })
        
            setErrors((prev) =>{ 
                return [];
            });
            
            const resetResult = await password_reset(email, dispatch);

            // if no request errors occured.
            if (resetResult.isError === false)
            {
                // show notification.
                store.addNotification({
                    title: 'Password reset incomplete',
                    message: `An email has been sent to ${email} with further instructions to complete the process.`,
                    type: 'success',                         // 'default', 'success', 'info', 'warning'
                    container: 'top-left',                // where to position the notifications
                    animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                    animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                    dismiss: {
                      duration: 0
                    }
                });

                history.push('/');

            }
                
            else 
            {
                        
               let error_messages = [];
               const errors_result = resetResult['errors'];

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
            <h1>Password Reset</h1>

                {isError === true &&
                        <div>
                             {showErrors instanceof Array && showErrors}
                        </div>
                }


			<p className="lead text-wrap"> Enter your <strong>email address</strong> to reset your password. An email will be sent to the provided email address with further instruction.  </p>
			
			
                <Form id="resetPasswordForm" onSubmit={handleResetPOST}>
				
                    <div className="form-group mb-2">
                        <label forhtml="email">Email</label>
                        
                        <input id="email" type="email" name="email" className="form-control" placeholder="email@example.com" onChange={handleEmailChange} required />
                        
                    </div>
                    
                    <div className="form-group">
                        
                        <input type="submit" role="button" id="submit" variant="whiteborder" className="primary-color rounded-pill form-control text-white" value="Reset Password"/> 
                        <br></br>

                        <Alert.Link to="/signup" as={link} className="mr-auto">No account? Sign up</Alert.Link>
                    </div>

                </Form>
            </div>

        </div>
        
    </div>);
}

export default ResetPassword;