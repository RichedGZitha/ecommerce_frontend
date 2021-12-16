import '../App.css';
//import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useSelector} from 'react-redux';
import { useState } from "react";


// maps the props to the reducer state.
const mapStateToProps = (state) => {
		
		return {
			login: state.loginReducer,
		}
	}

const ContactHeader = ()=> {
	
   const data = useSelector(mapStateToProps);
   const languages = ['English', 'Afrikaans', 'Zulu'];
   const currencies = ['ZAR (R)', 'USD ($)', 'YEN'];
      
   const [counter, setCounter] = useState(0); 
   
   const increment = () =>{
	
		   console.log(data.login);
		setCounter(previousState => {
					return previousState +=1;
    });
   }
   
	
  return (

        <div>

            <Navbar bg="dark" variant="dark"> 
                
                <Container>
                
                    {/* The search bar nav */}
                    <Nav className="me-auto">
                        <Nav.Link href="mailto:email@email.com" className="d-none d-sm-block"> email@email.com</Nav.Link>
                        <Nav.Link className="d-none d-sm-block"> +27 123 456 7890</Nav.Link>
                    </Nav>

                    {/* right links */}
                    <Nav className="mr-auto">

                        {/* Language dropdown */}
                        <NavDropdown title="Lang" id="collasible-nav-dropdown">
                            
                            {
                                languages.map((language, index) =>(
                                    <NavDropdown.Item href="#" key={index}>{language}</NavDropdown.Item> 
                                ))
                            }
                                    
                        </NavDropdown>

                        {/* Currencies dropdown */}
                        <NavDropdown title="Currency" id="collasible-nav-dropdown">
                            
                            {
                                currencies.map((currency, index)=>(
                                    <NavDropdown.Item href="#" key={index}> {currency} </NavDropdown.Item>
                                ))
                            }
                            
                            
                        </NavDropdown>


                        {/* Cart naviagtion */}
                        <Nav.Link href="#" onClick={increment}>Cart <span className="badge rounded-pill primary-color">{counter}</span></Nav.Link>

                    </Nav>
                </Container>
            </Navbar>
</div>
  )

};

export default ContactHeader;