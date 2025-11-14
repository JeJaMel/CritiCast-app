import { authCheckStatus, authLogin, authSignUp } from "@/core/auth/actions/auth-actions";
import { User } from "@/core/auth/interfaces/user";
import { SecureStorageAdapter } from "@/helpers/adapters/secure-storage.adapter";
import { create } from "zustand";

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking'

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User

    //Actions
    login: (email: string, password: string) => Promise<boolean>;
    checkStatus: () => Promise<void>;
    signUp: (email: string, password: string, username: string) => Promise<boolean>;
    logout: () => Promise<void>;
    changeStatus: (token?: string, user?: User) => Promise<boolean>;
    updateUserInStore: (user: Partial<User>) => void;
}

//Auth using Zustand                
export const useAuthStore = create<AuthState>()((set, get) => ({
    // Properties
    status: 'checking',
    token: undefined,
    user: undefined,

    // Actions
    changeStatus: async (token?: string, user?: User) => {
        if (!token || !user) {
            set({ status: 'unauthenticated', token: undefined, user: undefined })
            await SecureStorageAdapter.deleteItem('token')
            return false
        }
        set({
            status: 'authenticated', token: token, user: user,
        })

        await SecureStorageAdapter.setItem('token', token)
        return true;
    },


    checkStatus: async () => {
        const resp = await authCheckStatus();
        get().changeStatus(resp?.token, resp?.user);
    },



    login: async (email: string, password: string) => {

        const resp = await authLogin(email, password)

        return get().changeStatus(resp?.token, resp?.user)
    },

    signUp: async (email: string, password: string, username: string) => {

        const resp = await authSignUp(email, password, username)

        return get().changeStatus(resp?.token, resp?.user)
    },


    logout: async () => {
        // Clear token of secure storage
        await SecureStorageAdapter.deleteItem('token')
        set({ status: 'unauthenticated', token: undefined, user: undefined })
    },

    updateUserInStore: (updatedUserData: Partial<User>) => {
        set(state => ({
            user: state.user ? { ...state.user, ...updatedUserData } : undefined
        }));
    },


}))