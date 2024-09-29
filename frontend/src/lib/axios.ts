import axios from "axios";

export const axiosInstace = axios.create({
    baseURL: 'http://localhost:3333/',
    timeout: 2000,
    headers: {
        'X-Custom-Header': 'foobar',
    }
});

