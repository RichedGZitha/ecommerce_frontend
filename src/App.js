import logo from './logo.svg';
import './App.css';

// replace with cdn version instead.
import 'bootstrap/dist/css/bootstrap.min.css';

import Register from './pages/Register';
import Login from './pages/Login';
import Error404 from './pages/Error404';
import Header from './components/Header';
import ContactHeader from './components/ContactHeader';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Newsletter from './components/Newsletter';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from "./pages/Payment";
import Shop from "./pages/Shop";


import { Fragment, useState } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import ReactNotifications from 'react-notifications-component';


function App() {

	const [cartCount, setCartCount] = useState(0);

  return (
	  <Fragment>

		<BrowserRouter>
			<ReactNotifications />
			<ContactHeader />
			<Header logo={logo} />
			
			<Switch>
				<Route path="/" exact component={Home}></Route>
				<Route path="/signin" component={Login}></Route>
				<Route path="/signup" component={Register}></Route>
				<Route path="/reset-password" component={ResetPassword}></Route>
				<Route path="/product/:id" component={ProductDetail}></Route>
				<Route path="/cart" component={Cart} ></Route>
				<Route path="/checkout" component={Checkout} ></Route>
				<Route path="/payment" component={Payment}></Route>
				<Route path="/shop" component={Shop}></Route>

				<Route component={Error404}></Route>
			</Switch>

			<Newsletter/>
        </BrowserRouter>

	  </Fragment>
	
  );
}

export default App;
