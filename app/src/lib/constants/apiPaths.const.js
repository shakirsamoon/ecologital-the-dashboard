const serverURL = 'http://127.0.0.1:5000/api';

const API_PATHS={
  LOGIN_USER:`${serverURL}/user/login`,
  REGISTER_USER:`${serverURL}/user/register`,
  CURRENT_USER:`${serverURL}/user`,
  UPDATE_USER_DATA:`${serverURL}/user`,
  UPDATE_USER_PASSWORD:`${serverURL}/user/auth`,
  SETUP_USER_ACCOUNT:`${serverURL}/user/setup`,

  ADMIN_GET_ALL_USERS:`${serverURL}/admin/users`,
  ADMIN_GET_SINGLE_USER:(id)=>`${serverURL}/admin/users/${id.toString()}`,
  ADMIN_UPDATE_USER_DATA:(id)=>`${serverURL}/admin/users/${id.toString()}`,
  ADMIN_UPDATE_USER_PASSWORD:(id)=>`${serverURL}/admin/users/${id.toString()}/auth`,
  ADMIN_UPDATE_USER_STATUS:(id,status)=>`${serverURL}/admin/users/${id.toString()}/${status.toString()}`,
  ADMIN_ADD_NEW_USER:`${serverURL}/admin/users/new`,
}

export default API_PATHS;