import axios from "axios";
import { BASE_URL } from "../../utils/url";
import getAuthHeaders from "../../utils/getAuthHeaders";

const handleRequest = async (request) => {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    console.error("API Request Failed:", error.response?.data || error.message);
    throw error;
  }
};

//! Add transaction
export const addTransactionAPI = async ({ type, category, date, description, amount }) => {
  return handleRequest(() =>
    axios.post(`${BASE_URL}/transactions/create`, { category, date, description, amount, type }, { headers: getAuthHeaders() })
  );
};

//! Update category
export const updateCategoryAPI = async ({ name, type, id }) => {
  return handleRequest(() =>
    axios.put(`${BASE_URL}/categories/update/${id}`, { name, type }, { headers: getAuthHeaders() })
  );
};

//! Delete category
export const deleteCategoryAPI = async (id) => {
  return handleRequest(() =>
    axios.delete(`${BASE_URL}/categories/delete/${id}`, { headers: getAuthHeaders() })
  );
};

//! List transactions
export const listTransactionsAPI = async ({ category, type, startDate, endDate }) => {
  return handleRequest(() =>
    axios.get(`${BASE_URL}/transactions/lists`, { params: { category, endDate, startDate, type }, headers: getAuthHeaders() })
  );
};
