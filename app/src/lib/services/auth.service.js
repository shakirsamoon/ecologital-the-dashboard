import axios from 'axios';
import API_PATHS from '../constants/apiPaths.const';
import APP_CONFIG from '../constants/config.const';

const registerUser = async (userData) => {
  const response = await axios.post(API_PATHS.REGISTER_USER, userData);

  if (response.data) {
    localStorage.setItem(APP_CONFIG.TOKEN_PROPERTY, response.data.token);
  }

  return response.data;
};

const loginUser = async (credentials) => {
  const response = await axios.post(API_PATHS.LOGIN_USER, credentials);

  if (response.data) {
    localStorage.setItem(APP_CONFIG.TOKEN_PROPERTY, response.data.token);
  }

  return response.data;
};

const logoutUser = async () => {
  localStorage.removeItem(APP_CONFIG.TOKEN_PROPERTY);
};

const getCurrentUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_PATHS.CURRENT_USER, config);

  return response.data;
};

const updateUserAuth = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_PATHS.updateAuth, data, config);

  return response.data;
};

const authService = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateUserAuth,
};

export default authService;
