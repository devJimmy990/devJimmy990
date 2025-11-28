
import { CVModel } from "@/model/cv";
import api, { retryApiCall } from "./api";


export const cvService = {
    getAll: async (): Promise<CVModel[]> => {
        try {
            const apiCall = async () => {
                const response = await api.get("/cv");
                return response.data?.data || [];
            };
            return await retryApiCall(apiCall);
        } catch (error) {
            console.error("Error fetching CVs:", error);
            return [];
        }
    },

    create: async (cv: CVModel): Promise<CVModel> => {
        try {
            const apiCall = async () => {
                const response = await api.post("/cv", cv);
                return response.data?.data;
            };
            return await retryApiCall(apiCall);
        } catch (error) {
            console.error("Error creating CV:", error);
            throw error;
        }
    },

    update: async (cv: CVModel): Promise<CVModel> => {
        try {
            const apiCall = async () => {
                const response = await api.put("/cv", cv);
                return response.data?.data;
            };
            return await retryApiCall(apiCall);
        } catch (error) {
            console.error("Error updating CV:", error);
            throw error;
        }
    },

    delete: async (id: string): Promise<void> => {
        try {
            const apiCall = async () => {
                await api.delete(`/cv/${id}`);
            };
            return await retryApiCall(apiCall);
        } catch (error) {
            console.error("Error deleting CV:", error);
            throw error;
        }
    },
};
