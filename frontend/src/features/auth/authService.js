// authService.js

import axios from "axios";

const API_KEY = "http://127.0.0.1:8000";



const login = async (userData) => {
  const response = await axios.post(
    `${API_KEY}/auth/token`,
    `grant_type=&username=${userData.username}&password=${userData.password}&scope=&client_id=&client_secret=`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  if (response.data) {
    const expirationTime = new Date().getTime() + 480000; // 1 * 60 * 1000  1 minute
    const token = response.data.access_token;
    const expires_at = expirationTime;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("expires_at", expires_at);
  }

  return response.data.access_token;
};


export const isTokenExpired = () => {
  const expires_at = sessionStorage.getItem("expires_at");
  if (expires_at) {
    return Date.now() > parseInt(expires_at, 10);
  }
  return false;
};

const logout = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("expires_at");
};

const authService = {
  login,
  logout,
  isTokenExpired,
};

export default authService;
