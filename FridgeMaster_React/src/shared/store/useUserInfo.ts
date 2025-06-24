import {create} from "zustand";
import { persist } from "zustand/middleware";

export interface UserInfoType {
    firstName: string;
    lastName: string;
    birthday: Date;
    isFirstLogin: boolean
    fetchData: (firstname:string,lastname:string, birthday:Date, isFirstLogin:boolean) => void;
    clearData: () => void;
}


export const useUserInfo = create<UserInfoType>()(
    persist(
        (set) => ({
            firstName: "",
            lastName: "",
            birthday: new Date(),
            isFirstLogin: false,
            fetchData: (firstname:string, lastname:string, birthday:Date, isFirstLogin:boolean) => set({ firstName: firstname, lastName: lastname, birthday, isFirstLogin }),
            clearData: () => set({ firstName: "", lastName: "", birthday: new Date(), isFirstLogin: false }),
        }),
        {
            name: 'user-info-storage',
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