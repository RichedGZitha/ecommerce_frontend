import logo from './logo.svg';
import './App.css';

// replace with cdn version instead.
import 'bootstrap/dist/css/bootstrap.min.css';

import JustAComponent from './components/JustAComponent';
import Header from './components/Header';
import ContactHeader from './components/ContactHeader';
import { Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavBar from 'react-bootstrap/NavBar';


function App() {
  return (
	  <Fragment>

		<ContactHeader />
		<Header logo={logo} />
		<JustAComponent />

	  </Fragment>
	
  );
}

export default App;
