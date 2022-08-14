import axios from "axios";
export const API_URL = "http://192.168.43.245:5000";
export const signup = (users) => axios.post(`${API_URL}/signup`, users);
export const signin = (users) => axios.post(`${API_URL}/signin`, users);
export const signout = (data) => axios.post(`${API_URL}/signout`, data);
export const getUserInfo = (data) => axios.post(`${API_URL}/userInfo`, data);
export const logout = () => axios.post(`${API_URL}/logout`);
export const createRoom = (data) => axios.post(`${API_URL}/room/create`, data);
