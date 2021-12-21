import logo from './logo.svg';
import './App.css';

// replace with cdn version instead.
import 'bootstrap/dist/css/bootstrap.min.css';

import JustAComponent from './components/JustAComponent';
import Register from './pages/Register';
import Login from './pages/Login';
import Error404 from './pages/Error404';
import Header from './components/Header';
import ContactHeader from './components/ContactHeader';
import ResetPassword from './pages/ResetPassword';

import { Fragment } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import ReactNotifications from 'react-notifications-component';


function App() {
  return (
	  <Fragment>

		<BrowserRouter>
			<ReactNotifications />
			<ContactHeader />
			<Header logo={logo} />
			
			<Switch>
				<Route path="/" exact component={JustAComponent}></Route>
				<Route path="/signin" component={Login}></Route>
				<Route path="/signup" component={Register}></Route>
				<Route path="/reset-password" component={ResetPassword}></Route>
				<Route component={Error404}></Route>
			</Switch>
        </BrowserRouter>

	  </Fragment>
	
  );
}

export default App;
