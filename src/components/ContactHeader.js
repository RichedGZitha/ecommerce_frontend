import '../App.css';
//import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import {LinkContainer} from 'react-router-bootstrap'
import ToggleButton from 'react-bootstrap/ToggleButton'

import { useSelector} from 'react-redux';
import { useState } from "react";
import Fragment from 'react';


// maps the props to the reducer state.
const mapStateToProps = (state) => {
		
		return {
			login: state.loginReducer,
		}
	}

const Header = ()=> {
	
   const data = useSelector(mapStateToProps);
      
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
                {/*<LinkContainer to="/"> */}
                    
                {/*</LinkContainer>*/}

                    {/* The search bar nav */}
                    <Nav className="me-auto">
                        <Nav.Link href="mailto:email@email.com" className="d-none d-sm-block"> email@email.com</Nav.Link>
                        <Nav.Link className="d-none d-sm-block"> +27 123 456 7890</Nav.Link>
                    </Nav>

                    {/* right links */}
                    <Nav className="mr-auto">
                        <NavDropdown title="Lang" id="collasible-nav-dropdown">
                            
                                    <NavDropdown.Item href="/Admin">Eng (ZA)</NavDropdown.Item>
                                    <NavDropdown.Item href="/OrderHistory">Zul (ZA)</NavDropdown.Item>
                                    <NavDropdown.Item href="/Dashboard">AFRIK (ZA)</NavDropdown.Item>
                                    <NavDropdown.Item href="/TrackOrder">Track Order</NavDropdown.Item>
                                    <NavDropdown.Item href="#">Logout</NavDropdown.Item>
                                    <NavDropdown.Item href="/Signin">Sign in</NavDropdown.Item>

                        </NavDropdown>

                        <NavDropdown title="currency" id="collasible-nav-dropdown">
                            
                            <NavDropdown.Item href="/Admin">US </NavDropdown.Item>
                            <NavDropdown.Item href="/OrderHistory">R (ZA)</NavDropdown.Item>
                            <NavDropdown.Item href="/Dashboard">AFRIK (ZA)</NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link href="#" onClick={increment}>Cart <Badge bg="success">{counter}</Badge></Nav.Link>

                    </Nav>
                </Container>
            </Navbar>
</div>
  )

};

export default Header;