import {Router} from "expo-router";
import {FormDataUserInfo} from "@/app/screens/Onboarding";

export default async function EditUserDataSubmit(apiUrl: string, form:FormDataUserInfo, router:Router): Promise<void> {
    try {
        const res:Response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),

        })
        if(!res.ok){
            throw new Error(`An error occured: ${res.status}`);
        }
        if(res.status === 200){
            console.log("User Edited successfully.");
            router.replace('/screens/Dashboard')
        }


    }catch (err){
        console.error(err);
    }
}