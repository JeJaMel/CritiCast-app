import { moviesApi } from "@/core/api/movie-api";

export const deleteUserAction = async (): Promise<void> => {
    try {
        await moviesApi.delete('/users/me');
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};