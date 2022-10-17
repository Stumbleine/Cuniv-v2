import axios from 'axios';
/**
 * Configuracion de axios, indica la URL del API
 * @constant API
 * @exports API
 */
const URL = process.env.REACT_APP_API_URL;
const API = axios.create({
	baseURL: URL,
	responseEncoding: 'utf8',
});

export default API;
