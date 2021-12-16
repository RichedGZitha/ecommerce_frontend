const axios = require('axios');
const baseURL = "http://127.0.0.1:8000/";

const axiosInstance = axios.create({
    baseURL: baseURL,
    
    timeout: 50000,
    
    headers: {
      'Authorization':localStorage.getItem('access_token') ? "JWT " + localStorage.getItem('access_token'): undefined,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    
     
});

//axiosInstance.defaults.withCredentials = false;


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