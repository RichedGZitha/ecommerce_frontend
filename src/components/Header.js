import '../App.css';
//import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import {LinkContainer} from 'react-router-bootstrap'

import { useSelector} from 'react-redux';
import { useState } from "react"


// maps the props to the reducer state.
const mapStateToProps = (state) => {
		
		return {
			login: state.loginReducer,
		}
	}

const Header = ({logo})=> {
	
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

            <Navbar bg="dark" variant="dark" expand="lg"> 
                
                <Container>
                {/*<LinkContainer to="/"> */}
                    <Navbar.Brand href="/">
                        <img
                        alt="Logog"
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        />{' '}
                    Ecommerce Website
                    </Navbar.Brand>
                {/*</LinkContainer>*/}

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">

                    {/* The search bar nav */}
                    <Nav className="me-auto">
                    <Form className="d-flex">
                        <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    </Nav>

                    {/* right links */}
                    <Nav className="mr-auto">

                        <Nav.Link href="/Shop">Shop</Nav.Link>
                        <Nav.Link href="/Contact">Contact Us</Nav.Link>
                        <NavDropdown title="My Account" id="collasible-nav-dropdown">
                            
                            {/* If the user has logged in. */}
                            {data.login.isAuthenticated === true
                            ?
                                <div>
                                    <NavDropdown.Item href="/Admin">Admin</NavDropdown.Item>
                                    <NavDropdown.Item href="/OrderHistory">View Order History</NavDropdown.Item>
                                    <NavDropdown.Item href="/Dashboard">Dashboard</NavDropdown.Item>
                                    <NavDropdown.Item href="#">Notification (Modal) <Badge bg="danger">{counter}</Badge> </NavDropdown.Item>
                                    <NavDropdown.Item href="/TrackOrder">Track Order</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#">Logout</NavDropdown.Item>
                                </div>
                            

                            :
                                <NavDropdown.Item href="/Signin">Sign in</NavDropdown.Item>
                            }

                        </NavDropdown>
                    </Nav>

                 </Navbar.Collapse>




                </Container>
            </Navbar>
</div>
  )

};

export default Header;