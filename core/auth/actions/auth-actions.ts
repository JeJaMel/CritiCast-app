import { moviesApi } from "@/core/api/api";
import { User } from "../interfaces/user";

export interface AuthResponse {
    token: string;
    user: User;
}

export const authLogin = async (email: string, password: string) => {
    email = email.toLowerCase();
    try {
        const { data } = await moviesApi.post<AuthResponse>('/auth/login', {
            email, password
        });
        return data
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const authSignUp = async (email: string, password: string, username: string) => {
    email = email.toLowerCase();
    try {
        const { data } = await moviesApi.post<AuthResponse>('/auth/signUp', {
            email, password, username
        });
        return data
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const authCheckStatus = async (): Promise<User | null> => {
    try {
        const { data } = await moviesApi.get<User>('/users/me');
        return data
    } catch (error) {
        console.log('Token validation failed:', error);
        return null;
    }
}
