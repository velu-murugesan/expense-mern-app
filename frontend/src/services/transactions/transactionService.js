import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

//! Get the token
const getAuthHeaders = () => {
  const user = getUserFromStorage();
  return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
};
//! Add
export const addTransactionAPI = async ({ type, category, date, description, amount }) => {
  console.log("oh what it is: " + getAuthHeaders());
  const response = await axios.post(
    `${BASE_URL}/transactions/create`,
    { category, date, description, amount, type },
    { headers: { ...getAuthHeaders() } } // Call getAuthHeaders() here
  );
  return response.data;
};
//! update
export const updateCategoryAPI = async ({ name, type, id }) => {
  const response = await axios.put(
    `${BASE_URL}/categories/update/${id}`,
    { name, type },
    { headers: { ...getAuthHeaders() } } // Call getAuthHeaders() here
  );
  return response.data;
};
//! delete
export const deleteCategoryAPI = async (id) => {
  const response = await axios.delete(`${BASE_URL}/categories/delete/${id}`, {
    headers: { ...getAuthHeaders() } } // Call getAuthHeaders() here
  );
  return response.data;
};
//! lists
export const listTransactionsAPI = async ({ category, type, startDate, endDate }) => {
  const response = await axios.get(`${BASE_URL}/transactions/lists`, {
    params: { category, endDate, startDate, type },
    headers: { ...getAuthHeaders() } } // Call getAuthHeaders() here
  );
  return response.data;
};