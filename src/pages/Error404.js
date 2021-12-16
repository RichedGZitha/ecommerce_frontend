import '../App.css';
import Alert from 'react-bootstrap/Alert';

const doesNotExist = ()=>{

    const messages = [{'error':true, 'value':'testing'}, {'error':false, 'value':'testing 2'}];

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

export default doesNotExist;