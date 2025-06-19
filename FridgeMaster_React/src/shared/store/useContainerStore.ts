import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FoodType = {
    id:number,
    code:string,
    brand:string,
    productName:string,
    nutriGrade: string,
    imageUrl: string,
    ingredientImgUr: string,
    nutritionImgUrl: string,
    hasPalmOil: false,
    keywords: string[],
    ingredients: string,
    nutriments: string,
    createdAt:Date,
    updatedAt:Date

}

export type ContainerFoodType = {
    containerId: number,
    createdAt: Date,
    updatedAt:Date,
    expirationDate: Date | null,
    foodFactItem: FoodType ,
    foodId: number,
    id:number,
    quantity:  number,
    unit:string
}

interface Container {
    id: number;
    userId: number;
    createdAt:Date;
    updatedAt:Date;
    containerName: string;
    containerFood: ContainerFoodType[];
}
export type ContainerType = {
    containers: Container[]
    fetchContainers: (data:Container[]) => void;
    clearContainers: () => void;
}



export const useContainerStore = create<ContainerType>()(
    persist(
        (set) => ({
            containers: [],
            fetchContainers: (data: Container[]) => set({ containers: data }),
            clearContainers: () => set({ containers: [] }),
        }),
        {
            name: 'container-storage',
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

const containerStore = useContainerStore.getState();
export default containerStore;

