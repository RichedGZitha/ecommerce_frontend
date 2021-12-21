const axios = require('axios');

import auth from './getAuthUser/auth';

const baseURL = "http://127.0.0.1:8000/";

const axiosInstance = axios.create({
    baseURL: baseURL,
    
    timeout: 50000,
    
    headers: {
      'Authorization': auth.getUserLocal()['access'] ? "JWT " +  auth.getUserLocal()['access'] : undefined,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    
     
});


axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/auth/v1/jwt/create/" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
            const rs = await instance.post("/auth/v1/jwt/refresh/", 

            {
              refresh: auth.getUserLocal()['refresh'],
            });

            const { accessToken } = rs.data;
            auth.setAccessTokewn(accessToken);

            return instance(originalConfig);
        } catch (_error) {
            return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }

);





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