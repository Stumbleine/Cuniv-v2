import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;
const API = axios.create({
	baseURL: URL,
	responseEncoding: 'utf8',
});

export default API;
