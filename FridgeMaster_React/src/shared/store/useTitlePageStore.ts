import {create} from 'zustand';

type TitleStoreType = {
    title: string;
    setTitle: (title: string) => void
}

export const useTitlePageStore = create<TitleStoreType>((set) => ({
    title: '',
    setTitle: (title) => set({title:title})
    }))