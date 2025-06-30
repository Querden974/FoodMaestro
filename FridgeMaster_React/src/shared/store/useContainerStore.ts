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

export type Container = {
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
    editContainers: (editedData:Container) => void,
    changeContainerName: (newName:string) => void,
    removeContainer: ( item:ContainerFoodType) => void,
    clearContainers: () => void;
}



export const useContainerStore = create<ContainerType>()(
    persist(
        (set) => ({
            containers: [],
            fetchContainers: (data) => set({ containers: data }),
            changeContainerName: (newName) => {
                const data = {...containerStore.containers, containerName:newName}
                set({
                    containers:data
                })
            },
            removeContainer: (item) => {
                const data = containerStore.containers.map(i =>
                    i.id == item.containerId
                        ? {...i, containerFood:i.containerFood.filter(food => food.id != item.id)}
                        : i

                )
                console.log(data)
                set({
                    containers:data
                })
            },
            editContainers: (editedData) => {
                const newContainers = containerStore.containers.map(container =>
                    container.id == editedData.id
                    ? {...container, containerName:editedData.containerName.trim()}
                    : container
                )
                // console.log("old: ", containerStore.containers)
                // console.log("new: ", newContainers)
                set({
                    containers:newContainers
                })
            },
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

