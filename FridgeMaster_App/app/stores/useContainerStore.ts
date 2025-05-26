import {create} from "zustand";

interface Container {
    id: number;
    name: string;
    items: string[];
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

