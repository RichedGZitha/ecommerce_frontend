import '../App.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Link as link, useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import {logout} from '../services/authService';
import {updateSearch} from "../services/searchService";
import {getAllCategories} from '../services/productService';

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

import {CONSTANTS} from '../constants';

// maps the props to the reducer state.
const mapStateToProps = (state) => {
		
		return {
			login: state.loginReducer,
            search: state.searchReducer,
		}
	}

const Header = ({logo})=> {
	
   const data = useSelector(mapStateToProps);
   const [categories, setCategories] = useState(['All','Electronics', 'Camping', 'Tools', 'Kitchen']);
   const [notifsCount, setNotifsCount] = useState(0);
   const dispatch = useDispatch();
   const history = useHistory();
   
   const [searchSelected, setSearchSelected] = useState("");

   useEffect(()=> {
        
         (async () => {
              const categories_ = await getAllCategories();

              if(categories_.isError === false)
              {

                setCategories((prev)=>{

                    return categories_.categories;
                });

              }
            })();
    

  }, []);



const logoutHandler = ()=>{
        logout(dispatch);

        // show notification.
        store.addNotification({
            title: 'Logout Successful',
            message: 'You have Successfully logged out to your account.',
            type: 'info',                         // 'default', 'success', 'info', 'warning'
            container: 'top-left',                // where to position the notifications
            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
            dismiss: {
                        duration: 0
                    }
                    });


        history.push('/signin');

   }

   const categoryChange = (e)=>{
            
            updateSearch({"serach": data.search.search, "category": e.target.value}, dispatch);
   }

  return (

        <div>

            <Navbar bg="dark" variant="dark" expand="lg"> 
                
                <Container>
                
                    <Navbar.Brand to="/" as={link}>
                        <img
                        alt="Logo"
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        />{' '}
                                {CONSTANTS.ECOM_WEBSITE_NAME}
                    </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">

                    {/* The search bar nav */}
                    <Nav className="me-auto">

                    <Form className="d-flex mt-2">

                        <select className="categoryDropdown">


                            {categories.map((category, index) =>(
                                <option key={index} value={category} variant="secondary">
                                    {category}
                                </option>
                            ))}

                        </select>

                        <FormControl
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        className = "rounded-0"
                        />
                        <Button variant="outline-success" className="searchButton primary-color">Search</Button>
                    </Form>
                    </Nav>

                    {/* right links */}
                    <Nav className="mr-auto">

                        <Nav.Link to="/shop" as={link}>Shop</Nav.Link>
                        <Nav.Link to="/contact" as={link}>Contact Us</Nav.Link>
                        <NavDropdown title="My Account" id="collasible-nav-dropdown">
                            
                            {/* If the user has logged in. */}
                            {data.login.isAuthenticated === true
                            ?
                                <div>
                                    <NavDropdown.Item to="/profile" as={link}>Profile</NavDropdown.Item>
                                    <NavDropdown.Item to="/orderHistory" as={link}>View Order History</NavDropdown.Item>
                                    <NavDropdown.Item to="/dashboard" as={link}>Dashboard</NavDropdown.Item>
                                    <NavDropdown.Item to="#" as={link}>Notification (Modal) <Badge bg="danger" pill>{notifsCount}</Badge> </NavDropdown.Item>
                                    <NavDropdown.Item to="/trackOrder" as={link}>Track Order</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item to="#" as={link} onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </div>
                            

                            :
                           
                            <NavDropdown.Item to="/signin" as={link}>Sign in</NavDropdown.Item>
                            
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