import axios from 'axios';

const API_URL = 'http://localhost:8080';

const AuthService = {
  signUp: (userData) => axios.post(`${API_URL}/users/signup`, userData),
  signIn: (credentials) => axios.post(`${API_URL}/users/signin`, credentials),
  saveToken: (token) => localStorage.setItem('token', token),
  getToken: () => localStorage.getItem('token'),
  isLoggedIn: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },
  logout: () => localStorage.removeItem('token'),
};

export default AuthService;
