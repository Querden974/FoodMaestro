import type {Container} from "@/shared/store/useContainerStore"
import {showToast} from "@/components/ToastInfo.tsx";


export async function FetchUserContainer(id:number):Promise<Container[] | null>{

    const url = import.meta.env.VITE_API_URL+"/Container/uId?uId="+id;

    try{
        const res = await fetch(url, {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (!res.ok) throw new Error("Process aborted")
        showToast({
            icon:"success",
            message:"Container reloaded successfully"
        })

        return res.json()
    }catch (err){
        showToast({
            icon:"error",
            message:"Fetch data is aborted"
        })
        return null
    }

}