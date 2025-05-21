import axios from 'axios';

const api = axios.create({
    baseURL: 'https://parcerias-serpro.onrender.com',
});

export default api;