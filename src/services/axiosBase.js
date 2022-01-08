import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {getUserLocal, setAccessTokewn} from './getAuthUser';

const axios = require('axios');

const APIbaseURL = "http://127.0.0.1:8000";
const FrontEnd = "http://127.0.0.1:3000"

const axiosInstance = axios.create({
    baseURL: APIbaseURL,
    
    timeout: 50000,
    
    headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
    
     
});




// Function that will be called to refresh authorization
const refreshAuthLogic = failedRequest => axios.post(APIbaseURL + '/auth/v1/jwt/refresh/', {
                refresh: getUserLocal()['refresh'],
              }).then(tokenRefreshResponse => {
    

    const { access } = tokenRefreshResponse.data;

    if(access !== undefined)
    {
      setAccessTokewn(access);
      failedRequest.response.config.headers['Authorization'] = 'Bearer ' + access;
    }
 
    

    return Promise.resolve();
}).catch(error =>{

      window.location.replace(FrontEnd + "/signin");


})

// Instantiate the interceptor
createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic, {
    pauseInstanceWhileRefreshing: true // default: false
});


    //axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';//'application/json'
    //axiosInstance.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://127.0.0.1:8000';
    //axiosInstance.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS, HEAD';
    //axiosInstance.defaults.headers.post['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
   // axiosInstance.defaults.preflightContinue = true;
    //axiosInstance.defaults.xsrfCookieName = 'csrftoken';
    //axiosInstance.defaults.xsrfHeaderName = 'x-csrftoken';
   // axiosInstance.defaults.headers.common['X-CSRFToken'] = 'WeQ4j2agiYkaJ46M4TpSUf3q2Es0hNkcuD4vmgWBReeP1HNx5mTvm3MWGAEGHtZ9';

//axiosInstance.defaults.headers.post["WWW-Authenticate"]= "JWT realm=\"api\"";


export default axiosInstance;