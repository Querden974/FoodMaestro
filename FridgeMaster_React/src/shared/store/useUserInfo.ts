import {create} from "zustand";

export interface UserInfoType {
    firstName: string;
    lastName: string;
    birthday: Date;
    isFirstLogin: boolean | undefined
    fetchData: (firstname:string,lastname:string, birthday:Date, isFirstLogin:boolean) => void;
    clearData: () => void;
}

export const useUserInfo = create<UserInfoType>((set) => ({
    firstName:"",
    lastName:"",
    birthday:new Date(),
    isFirstLogin: undefined,
    fetchData: (firstname:string,lastname:string,birthday:Date, isFirstLogin:boolean) => set({firstName:firstname,lastName:lastname, birthday:birthday, isFirstLogin:isFirstLogin}),
    clearData: () => set({firstName:"",lastName:"", birthday:new Date(), isFirstLogin:undefined})
}));