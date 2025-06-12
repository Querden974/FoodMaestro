import {create} from "zustand";

export type AuthStateType = {
    isLoggedIn: boolean;
    username:string;
    email:string;
    id: number;
    login : (username:string,email:string, id:number) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStateType>((set) => ({
    isLoggedIn: false,
    username: '',
    email: '',
    userInfo: null,
    id: 0,
    login: (username:string, email:string , id:number, ) => set({ isLoggedIn: true, username,email, id }),
    logout: () => set({ isLoggedIn: false, username: '', email: '', id: 0  }),
    // editInfo: () => set({userInfo})
}));