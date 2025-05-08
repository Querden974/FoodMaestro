import {create} from "zustand";

export type AuthState = {
    isLoggedIn: boolean;
    username:string;
    login : (username:string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    username: '',
    login: (username) => set({ isLoggedIn: true, username }),
    logout: () => set({ isLoggedIn: false, username: '' }) ,
}));