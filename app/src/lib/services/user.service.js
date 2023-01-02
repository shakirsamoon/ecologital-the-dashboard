import axios from 'axios';
import API_PATHS from '../constants/apiPaths.const';

const setupUserAccount = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_PATHS.SETUP_USER_ACCOUNT, data, config);

  return response.data;
};

const updateUserData = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_PATHS.UPDATE_USER_DATA, data, config);

  return response.data;
};

const userService = {
  setupUserAccount,
  updateUserData,
};

export default userService;
