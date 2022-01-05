import loginReducer from './loginReducer';
import userReducer from './userReducer';
import userProfileReducer from './userProfileReducer';
import cartReducer from './cartReducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
  loginReducer, 
  userReducer,
  userProfileReducer,
  cartReducer
})

export default rootReducer;
