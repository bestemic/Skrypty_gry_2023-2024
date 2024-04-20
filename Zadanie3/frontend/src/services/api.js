import axios from 'axios';

const BASE_URL = "http://localhost:3000";

const api = axios.create({
    baseURL: BASE_URL + "/api/v1/",
    headers: {
        'Access-Control-Allow-Origin': BASE_URL,
        'Access-Control-Allow-Headers': 'Content-Type'
    },
});

export default api;