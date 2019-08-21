import axios from 'axios';

const api = axios.create({ baseURL: 'https://condominusbackend.herokuapp.com/' });

export default api;