import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000', //URL for the API
    timeout: 1000,
    headers: {
        "Content-Type": "application/json"
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        //Do something before request is sent
        return config;
    },
    (error) => {
        //Do something with request error
        return Promise.reject(error);
    }
);

export default axiosClient;