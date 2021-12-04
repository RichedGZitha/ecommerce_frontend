import logo from '../logo.svg';
import '../App.css';
import { useSelector} from 'react-redux';
import { useState } from "react";


// maps the props to the reducer state.
const mapStateToProps = (state) => {
		
		return {
			login: state.loginReducer,
		}
	}

function JustAComponent() {
	
   const data = useSelector(mapStateToProps);
      
   const [counter, setCounter] = useState(0); 
   
   const increment = () =>{
	
		   console.log(data.login);
		setCounter(previousState => {
					return previousState +=1;
    });
   }
   
	
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React ----- {data.login.isAuthenticated ?("Yes"): ("No")} --- {counter}
        </a>
		
		
		<button type="button" onClick={increment}>Press Play</button>
		
      </header>
    </div>
  );
}

export default JustAComponent;