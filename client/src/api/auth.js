import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth'; // Update with your server URL

export const login = (data) => axios.post(`${API_URL}/login`, data);
export const signup = (data) => axios.post(`${API_URL}/signup`, data);
export const sendOtp = (data) => axios.post(`${API_URL}/sendotp`, data);
