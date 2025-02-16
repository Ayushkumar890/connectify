import axios from 'axios';

const API_URL = 'https://connectify-93bj.onrender.com/api/auth'; 

export const login = (data) => axios.post(`${API_URL}/login`, data);
export const signup = (data) => axios.post(`${API_URL}/signup`, data);
export const sendOtp = (data) => axios.post(`${API_URL}/sendotp`, data);
export const test = (data) => axios.get(`${API_URL}/test`, data);
export const profile = (data) => axios.get(`${API_URL}/profile`, data);
export const logout = (data) => axios.get(`${API_URL}/logout`, data);
export const verifyToken = (data) => axios.get(`${API_URL}/verify-token`, data);
export const getposts = (data) => axios.get(`${API_URL}/posts`, data);
export const setposts = (data) => axios.post(`${API_URL}/posts`, data);
