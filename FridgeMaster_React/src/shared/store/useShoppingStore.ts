import {create} from "zustand";
import {persist} from "zustand/middleware";

export type ShoppingItemType = {
    id: number;
    name: string;
    checked: boolean;

}

type ShoppingStoreType = {
    items: Array<ShoppingItemType>,
    addItem: (newItem: string) => void,
    removeItem: (id: number) => void,
    toggleChecked: (id: number) => void,
};



export const useShoppingStore = create<ShoppingStoreType>()(
    persist(
        (set) => ({
            items: [],
            addItem: (newItem) => {
                set((state) => {
                    const createItem = {
                        id: state.items.length +1 ,
                        name: newItem.trim(),
                        checked:false,
                    }
                    return {items: [...state.items, createItem]}
                });
            },
            removeItem: (id: number) => set((state)=> ({items: state.items.filter((item) => item.id !== id)})),

            toggleChecked: (id: number) => {
                set((state) => {
                    return {
                        items: state.items.map((item) =>
                            item.id === id ? { ...item, checked: !item.checked } : item
                        ),
                    };
                });
            }
        }),
        {
            name: 'user-shopping-list-storage',
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
const shoppingStore = useShoppingStore.getState();
export default shoppingStore;
