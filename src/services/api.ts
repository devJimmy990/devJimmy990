import axios from "axios";
import { Project } from "@/data/projects";

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error cases
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    } else if (error.code === 'ERR_NETWORK') {
      console.error('Network error - server may be down');
    }
    return Promise.reject(error);
  }
);

// Project service
export const projectService = {
  getAll: async () => {
    try {
      const response = await api.get("/project");
      // Safely extract data from response
      if (response.data && response.data.data) {
        return response.data.data || [];
      }
      return [];
    } catch (error) {
      console.error("Error fetching projects:", error);
      // Return empty array instead of throwing to prevent UI breaking
      return [];
    }
  },
  
  create: async (project: Project) => {
    try {
      const response = await api.post("/project", project);
      return response.data.data;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  },
  
  update: async (project: Project) => {
    try {
      const response = await api.put("/project", project);
      return response.data.data;
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  },
  
  delete: async (id: string) => {
    try {
      const response = await api.delete(`/project/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  }
};

// CV service
export interface CV {
  _id: string;
  url: string;
}

export const cvService = {
  getAll: async () => {
    try {
      const response = await api.get("/cv");
      // Safely extract data from response
      if (response.data && response.data.data) {
        return response.data.data || [];
      }
      return [];
    } catch (error) {
      console.error("Error fetching CVs:", error);
      // Return empty array instead of throwing to prevent UI breaking
      return [];
    }
  },
  
  create: async (cv: CV) => {
    try {
      const response = await api.post("/cv", cv);
      return response.data.data;
    } catch (error) {
      console.error("Error creating CV:", error);
      throw error;
    }
  },
  
  update: async (cv: CV) => {
    try {
      const response = await api.put("/cv", cv);
      return response.data.data;
    } catch (error) {
      console.error("Error updating CV:", error);
      throw error;
    }
  },
  
  delete: async (id: string) => {
    try {
      const response = await api.delete(`/cv/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Error deleting CV:", error);
      throw error;
    }
  }
};
