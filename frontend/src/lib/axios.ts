import axios from "axios";

export const axiosInstace = axios.create({
    baseURL: 'https://http://localhost:3333/api/',
    timeout: 2000,
    headers: {
        'X-Custom-Header': 'foobar',
    }
});

