import axios from "axios";
const BASE_URL = "https://crm-backend-2-uz3g.onrender.com";

export async function userSignup(data) {
  return await axios.post(`${BASE_URL}/crm/api/v1/auth/signup`, data);
}

export async function userSignin(data) {
  return await axios.post(`${BASE_URL}/crm/api/v1/auth/signin`, data);
}
