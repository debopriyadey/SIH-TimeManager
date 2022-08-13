import axios from 'axios';
import { API_URL } from './config.js';

export const signup = (users) => axios.post(`${API_URL}/signup`, users);
export const signin = (users) => axios.post(`${API_URL}/signin`, users);
export const signout = (data) => axios.post(`${API_URL}/signout`, data);
export const getUserInfo = (data) => axios.post(`${API_URL}/userInfo`, data);
export const logout = () => axios.post(`${API_URL}/logout`)