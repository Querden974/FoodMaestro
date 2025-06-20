import {showToast} from "@/components/ToastInfo.tsx";

type FormType = {
    quantity:number,
    unit:string
}
export async function AddItemToContainer(containerId:number,foodId:number, form:FormType){
    const url = import.meta.env.VITE_API_URL+"/ContainerFood"
    const data = {containerId, foodId, ...form}
    console.log(data)
    try{
        const res = await fetch(url,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        if(!res.ok) throw new Error(`An error occurred: ${res.status}`)

        showToast({
            icon:'success',
            message:'Item added to container'
        })
    } catch (err){
        showToast({
            icon:'error',
            message:`Item cannot be added in container: ${err}`
        })
    }
}