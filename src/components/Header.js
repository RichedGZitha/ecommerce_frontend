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
import {getProductsByCustomParams} from "../services/productService";

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
   const [category, setCategorySelected] = useState("All");

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

   // handle category changes.
   const categoryChange = (e)=>{

            setCategorySelected(()=>e.target.value);
            
            //updateSearch({"serach": data.search.search,"count":data.search.count, "min_price":data.search.min_price, "max_price":data.search.max_price ,"category": e.target.value}, dispatch);
   }

   // handle changes to the search bar
   const searchChange = (e)=>{

            setSearchSelected(()=>e.target.value);
            
            //updateSearch({"serach": e.target.value, "category": data.search.category, "search_products":data.search.search_products ,"count":data.search.count, "min_price":data.search.min_price, "max_price":data.search.max_price}, dispatch);
   }


   // handle search
   const handleSearch = (e)=>
   {

      e.preventDefault();

      (async ()=>{
        let searchResults = await getProductsByCustomParams({'count':data.search.count, 'min_price':data.search.min_price, 'max_price':data.search.max_price, 'category':category, 'name':searchSelected});

        if(searchResults.isError === false)
        {
          console.log(searchResults);

          updateSearch({"serach": searchSelected,"count":data.search.count, "search_products":searchResults.products, "min_price":data.search.min_price, "max_price":data.search.max_price ,"category": category}, dispatch);
        }

        if(window.location.pathname !== "/shop")
        {
            history.push("/shop");
        }

      })();


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

                    <form className="d-flex mt-2" method="post" onSubmit={handleSearch}>

                        <select className="categoryDropdown" value={category} onChange={categoryChange}>


                            {categories.map((category, index) =>(
                                <option key={index} value={category} variant="secondary">
                                    {category}
                                </option>
                            ))}

                        </select>

                        <input
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={searchChange}
                        value={searchSelected}
                        
                        className = "rounded-0"
                        />
                        <button type="submit" className="btn searchButton primary-color">Search</button>
                    </form>
                    </Nav>

                    {/* right links */}
                    <Nav className="mr-auto">

                        <Nav.Link to="/shop" as={link}> Shop</Nav.Link>
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