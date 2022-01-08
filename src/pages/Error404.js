import '../App.css';
import Alert from 'react-bootstrap/Alert';
import {CONSTANTS} from '../constants';
import {useEffect} from 'react';

const DoesNotExist = ()=>{

    const messages = [{'error':true, 'value':'testing'}, {'error':false, 'value':'testing 2'}];

    useEffect(()=>{

        document.title = `${CONSTANTS.ECOM_WEBSITE_NAME} - Page Not Found`;

    }, []);

    return (<div className="container">


        <div className="row">
            <div className="col-12 col-md-6 offset-md-3">
                <h1 className="offset-3">404 - Page Not found</h1>

                   {messages.length === 0
                    ?
                    <div>
                        {messages.map(message =>(
                            <Alert variant={message.error ? "danger" : "success"} >
                                {message.value}
                            </Alert>
                        ))}
                    </div>
                    
                    :<div></div>
                        }

                
            </div>

        </div>
        
    </div>);
}

export default DoesNotExist;