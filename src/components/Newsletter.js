import Button from 'react-bootstrap/Button';

import { useState } from "react";
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faFacebookSquare, faTwitterSquare, faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons'

//import {getSpecialProducts, getFeaturedProducts} from '../services/productService'
import '../App.css';

function Newsletter(props) {
	     
   const [email, setEmail] = useState('');
   

   // handle on change event.
  const emailChangeHandler = (e)=>{

    setEmail((prev)=>e.value);

  }

  // handle newsletter subscribtion
  const newsletterSubscribe= (e)=>
  {

      e.PreventDefault();

      const data = {'email': email};

      // delegate to service.
  }

  return (

    <div className="container-fluid mt-4 mb-4">
      <div className="row">

        <hr></hr>
        <div className="col-12">
          <div className="container">
            <div className="row">
                  <div className="col-12 col-md-6 offset-md-3">
                      <h2 className="text-center"> Sign Up for the <strong>Newsletter </strong></h2>

                      <Form className="d-flex mt-2">

                        <FormControl
                        type="email"
                        placeholder="Enter Your Email"
                        aria-label="email"
                        className = "curvedLeft"

                        required
                        />
                        <Button variant="outline-success" className="curvedRightButton primary-color">Subscribe</Button>
                    </Form>
                      

                  </div>
              </div>


              {/* socials */}
              <div className="row mt-2">
                <div className="col-12 col-md-6 offset-md-3 text-center">


                    <a href="#" role="button" className="btn btn-lg"><FontAwesomeIcon icon={faFacebookSquare} size="lg" /></a>
                    <a href="#" role="button" className="btn btn-lg"><FontAwesomeIcon icon={faTwitterSquare} size="lg" /></a>
                    <a href="#" role="button" className="btn btn-lg"><FontAwesomeIcon icon={faGithubSquare} size="lg" /></a>
                    <a href="#" role="button" className="btn btn-lg"><FontAwesomeIcon icon={faLinkedin} size="lg" /></a>

                </div>
              </div>

            </div>
        </div>

      </div>
      
    </div>

  );
}

export default Newsletter;