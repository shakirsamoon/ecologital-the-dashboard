import axios from 'axios';
import API_PATHS from '../constants/apiPaths.const';

const updateUserData = async (token, id, data) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.put(
      API_PATHS.ADMIN_UPDATE_USER_DATA(id),
      data,
      config
    );

    return response.data;
  } catch (error) {
    return null;
  }
};

const adminService = {
  updateUserData,
};

export default adminService;
