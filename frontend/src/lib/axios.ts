import axios from "axios";

export const axiosInstace = axios.create({
    baseURL: 'http://localhost:3333/',
    headers: {
        'X-Custom-Header': 'foobar',
    }
});

