// src/api/api.ts
import axios from "axios";

// Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Response interceptor for errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Request timeout");
    } else if (error.code === "ERR_NETWORK") {
      console.error("Network error - server may be down");
    }
    return Promise.reject(error);
  }
);

/**
 * Retry logic helper
 */
export const retryApiCall = async <T>(
  apiCall: () => Promise<T>,
  maxRetries = 3,
  delay = 1500
): Promise<T> => {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      return await apiCall();
    } catch (error) {
      retries++;

      if (retries >= maxRetries) {
        console.error("Maximum retry attempts reached:", error);
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error("Unexpected retry error");
};

export default api;
