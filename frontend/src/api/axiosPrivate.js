import axios from 'axios';
import SetupInterceptors from './SetupInterceptors';
import { API_BASE_URL } from '../endpoints';

// Create an Axios instance
const httpClient = axios.create({
    baseURL: API_BASE_URL || API_BASE_URL, // replace with your API base URL
    timeout: 1000000, // You can adjust the timeout value as needed
});

// Apply the interceptors to the Axios instance
SetupInterceptors(httpClient);

export default httpClient;