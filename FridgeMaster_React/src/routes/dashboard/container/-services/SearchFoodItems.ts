import type {FoodType} from "@/shared/store/useContainerStore.ts";

export async function SearchItem(keyword:string):Promise<FoodType[] | null>{
    const url = import.meta.env.VITE_API_URL+"/OpenFoodFacts/keywords?keywords="+keyword;

    try {
        const res:Response = await fetch(url,{
            method:"GET",
            headers:{
                "Content-Type": "application/json"
            }
        })
        if(!res.ok) throw new Error(`An error occurred: ${res.status}` )



        return await res.json() as FoodType[]

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err){
        return null
    }
}