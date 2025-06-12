import { create } from "zustand";

type FoodType = {
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
    Containers: Container[]
    fetchContainers: (data:Container[]) => void;
    clearContainers: () => void;
}

export const useContainerStore = create<ContainerType>((set) => ({

    Containers:[],
    fetchContainers: (data:Container[]) => set({ Containers: data }),
    clearContainers: () => set({ Containers: [] }),
}));

const containerStore = useContainerStore.getState();
export default containerStore;

