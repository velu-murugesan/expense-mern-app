import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

//! Get the Authorization Header
const getAuthHeaders = () => {
  const token = getUserFromStorage();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

//! Helper function to handle API requests safely
const handleRequest = async (request) => {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    console.error("API Request Failed:", error.response?.data || error.message);
    throw error;
  }
};

//! Register User
export const registerUserAPI = async ({ name, email, password }) => {
  return handleRequest(() =>
    axios.post(`${BASE_URL}/users/register`, { name, email, password })
  );
};

//! Login User
export const loginUserAPI = async ({ email, password }) => {
  return handleRequest(() =>
    axios.post(`${BASE_URL}/users/login`, { email, password })
  );
};

//! Get User Profile (Protected Route)
export const getUserProfileAPI = async () => {
  return handleRequest(() =>
    axios.get(`${BASE_URL}/users/profile`, { headers: getAuthHeaders() })
  );
};

//! Change User Password (Protected Route)
export const changeUserPasswordAPI = async ({ oldPassword, newPassword }) => {
  return handleRequest(() =>
    axios.put(
      `${BASE_URL}/users/change-password`,
      { oldPassword, newPassword },
      { headers: getAuthHeaders() }
    )
  );
};

//! Update User Profile (Protected Route)
export const updateUserProfileAPI = async ({ name, email }) => {
  return handleRequest(() =>
    axios.put(
      `${BASE_URL}/users/update-profile`,
      { name, email },
      { headers: getAuthHeaders() }
    )
  );
};

//! Export getAuthHeaders for general use
export { getAuthHeaders };
