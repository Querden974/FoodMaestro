import {useContainerStore} from "@/shared/store/useContainerStore.ts";
import type {Container} from "@/shared/store/useContainerStore.ts";
import {showToast} from "@/components/ToastInfo.tsx";


const editContainerStore = useContainerStore.getState().editContainers
/**
 * @deprecated use `CallApi` from `@/shared/functions/CallApi` instead
 */
export async function EditContainerName(form:Container) {
    const url = import.meta.env.VITE_API_URL+"/Container/id?id="+form.id;

    try{
        const res = await fetch(url, {
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        })
        if(!res.ok) throw new Error("Request Invalid")

            editContainerStore(form)
            showToast({
                icon:"success",
                message:"Container edited successfully"
            })
        return true

    }catch (err){
        showToast({
            icon:"error",
            message:"An error occured, container edition aborted."
        })
        return false
    }
}