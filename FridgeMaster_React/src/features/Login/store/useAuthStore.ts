import {create} from "zustand";
import { persist } from "zustand/middleware";
import type {UserInfoType} from "@/shared/store/useUserInfo.ts";
import type {Container} from "@/shared/store/useContainerStore.ts";


export type AuthStateType = {
    isLoggedIn: boolean;
    username:string;
    email:string;
    id: number;
    login : (username:string,email:string, id:number) => void;
    logout: () => void;
}
type LoginParameters =  Parameters<AuthStateType["login"]>

export type LoginResponseType = {
    data: {
        username: LoginParameters[0],
        email: LoginParameters[1],
        id: LoginParameters[2],
        isLoggedIn : boolean
        userInfo: UserInfoType
    }
    container: Container[]
}



export const useAuthStore = create<AuthStateType>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            username: '',
            email: '',
            id: 0,
            login: (username:string, email:string, id:number) => set({ isLoggedIn: true, username, email, id }),
            logout: () => set({ isLoggedIn: false, username: '', email: '', id: 0 }),
        }),
        {
            name: 'auth-storage',
            storage:{
                getItem: (name) => {
                    const item = sessionStorage.getItem(name);
                    return item ? JSON.parse(item) : null;
                },
                setItem: (name, value) => sessionStorage.setItem(name, JSON.stringify(value)),
                removeItem: (name) => sessionStorage.removeItem(name),
            }// unique name
        }
    )
);