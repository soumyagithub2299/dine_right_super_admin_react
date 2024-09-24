import { axiosInstance, axiosInstanceNoAuth } from './commonHeadApiLogic.js';
import { authorizeMe } from './commonHeadApiLogic.js'; // Ensure you import this function

// Ensure authorization header is set before making authenticated requests
const withAuthorization = async (apiFunction, ...args) => {
  try {
    await authorizeMe(); // Ensure the Authorization header is set
    return await apiFunction(...args);
  } catch (error) {
    // Handle errors as necessary
    console.error("Error in API request:", error);
    throw error;
  }
};

export async function LoginAPI(data) {
  return withAuthorization(async () => {
    const response = await axiosInstanceNoAuth.post("/user/user_login_check", data);
    return response;
  });
}

export async function forgotPasswordAPI(data) {
  return withAuthorization(async () => {
    const response = await axiosInstanceNoAuth.post("/user/user_Forgot_Password_check_api", data);
    return response;
  });
}

export async function createNewAccountAPI(data) {
  return withAuthorization(async () => {
    const response = await axiosInstanceNoAuth.post("/user/create_an_account", data);
    return response;
  });
}

export async function updateProfileAPI(data) {
  return withAuthorization(async () => {
    const response = await axiosInstance.post("/user/account_update_", data);
    return response;
  });
}

export async function updatePasswordAPI(data) {
  return withAuthorization(async () => {
    const response = await axiosInstanceNoAuth.post("/user/account_update_pass_reset", data);
    return response;
  });
}

export async function dashboardDataAPI() {
  return withAuthorization(async () => {
    const response = await axiosInstance.get("/user/get_dashboard_data_api");
    return response;
  });
}