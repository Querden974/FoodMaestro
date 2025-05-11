import {create} from "zustand";

interface UserInfo {
    firstname: string;
    lastname: string;
    birthday: Date;
    isFirstLogin: boolean
}

export type AuthState = {
    isLoggedIn: boolean;
    username:string;
    email:string;
    id: number;
    userInfo: UserInfo | null;
    login : (username:string,email:string, id:number, userInfo:UserInfo) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    username: '',
    email: '',
    userInfo: null,
    id: 0,
    login: (username:string, email:string , id:number, userInfo:UserInfo) => set({ isLoggedIn: true, username,email, id, userInfo }),
    logout: () => set({ isLoggedIn: false, username: '' }) ,
}));