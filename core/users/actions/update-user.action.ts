import { moviesApi } from "@/core/api/api";
import { UpdateUserPayload, User } from "@/core/auth/interfaces/user";

export const updateUserAction = async (payload: UpdateUserPayload): Promise<User> => {
    try {
        const { data } = await moviesApi.patch<User>('/users/me/username', payload);
        return data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};