import axios from 'axios';
import SetupInterceptors from './SetupInterceptors';
import { API_BASE_URL } from '../endpoints';

const httpClient = axios.create({
    baseURL: API_BASE_URL || API_BASE_URL, 
    timeout: 1000000, 
});


SetupInterceptors(httpClient);

export default httpClient;