import axios from "axios";
import {baseUrl} from "./api_endpoints";
export const ApiClient = axios.create({
    baseURL: baseUrl,
    timeout: 4000,
    headers:
        {
        'X-Custom-Header': 'foobar',
        'Authorization': localStorage.getItem('auth_token')
        },
    withCredentials: true
});
