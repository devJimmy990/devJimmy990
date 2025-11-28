import { ProjectModel } from "@/model/project";
import api, { retryApiCall } from "./api";

export const projectService = {
    getAll: async () => {
        try {
            const apiCall = async () => {
                const response = await api.get("/project");
                // Safely extract data from response
                if (response.data && response.data.data) {
                    return response.data.data || [];
                }
                return [];
            };

            // Call with retry logic
            return await retryApiCall(apiCall);
        } catch (error) {
            console.error("Error fetching projects after multiple retries:", error);
            // Return empty array instead of throwing to prevent UI breaking
            return [];
        }
    },

    create: async (project: ProjectModel) => {
        try {
            const apiCall = async () => {
                const response = await api.post("/project", project);
                return response.data.data;
            };

            return await retryApiCall(apiCall);
        } catch (error) {
            console.error("Error creating project:", error);
            throw error;
        }
    },

    update: async (project: ProjectModel) => {
        try {
            const apiCall = async () => {
                const response = await api.put("/project", project);
                return response.data.data;
            };

            return await retryApiCall(apiCall);
        } catch (error) {
            console.error("Error updating project:", error);
            throw error;
        }
    },

    delete: async (id: string) => {
        try {
            const apiCall = async () => {
                const response = await api.delete(`/project/${id}`);
                return response.data.data;
            };

            return await retryApiCall(apiCall);
        } catch (error) {
            console.error("Error deleting project:", error);
            throw error;
        }
    }
};
