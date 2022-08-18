import axios from "axios";
import { API_URL } from "./config.js";
import store from "./redux/store.js";

const getConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const signup = (users) => axios.post(`${API_URL}/signup`, users);
export const signin = (users, token) =>
  axios.post(`${API_URL}/signin`, users, getConfig(token));
export const signout = (data) => axios.post(`${API_URL}/signout`, data);
export const getUserInfo = (token) =>
  axios.get(`${API_URL}/userInfo`, getConfig(token));
export const isUsernameExist = (username) =>
  axios.get(`${API_URL}/usernameExist/${username}`);
export const addChild = (data, token) =>
  axios.post(`${API_URL}/addChild`, data, getConfig(token));
export const updateChild = (data, token) =>
  axios.put(`${API_URL}/child`, data, getConfig(token));
export const getChilds = (token) =>
  axios.get(`${API_URL}/childs`, getConfig(token));
export const createRoom = (data) =>
  axios.post(`${API_URL}/room/create`, data, getConfig(data.token));
export const getRooms = (userId) =>
  axios.get(`${API_URL}/user/rooms/${userId}`);
