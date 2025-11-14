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
        // 1. Primero, busca el token en el almacenamiento seguro.
        const token = await SecureStorageAdapter.getItem('token');
        if (!token) {
            // Si no hay token, no hay sesión que verificar.
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            return;
        }

        // 2. Si hay un token, intenta obtener los datos del usuario.
        // El interceptor de axios usará automáticamente este token.
        const user = await authCheckStatus();

        if (user) {
            // 3. Si la API devuelve un usuario, el token es válido.
            // Rehidratamos el estado con el TOKEN ORIGINAL y el USUARIO FRESCO.
            set({ status: 'authenticated', token: token, user: user });
        } else {
            // 4. Si la API devuelve null, el token es inválido o ha expirado.
            // Limpiamos el estado.
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            await SecureStorageAdapter.deleteItem('token'); // Limpia el token inválido
        }
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