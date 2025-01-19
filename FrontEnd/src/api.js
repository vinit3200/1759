import axios from 'axios';

const api = axios.create({
  baseURL: 'https://foodapp-lq4i.onrender.com', // Backend base URL
});

export default api;
