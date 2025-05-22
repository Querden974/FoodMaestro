import {Router} from "expo-router";
import {FormDataUserInfo} from "~/Validator/userInfoValidator";




export default async function EditUserDataSubmit(apiUrl: string,
                                                 form:FormDataUserInfo,
                                                 router:Router,
                                                 userInfo:(firstname:string,lastname:string, birthday:Date, isFirstLogin:boolean) => void)
    : Promise<void> {
    // console.log("✅ EditUserDataSubmit loaded");

    try {
        const payload = {
            ...form,
            Birthday:form.Birthday.toISOString(),
        }
        const res:Response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),

        })
        if(!res.ok){
            throw new Error(`An error occured: ${res.status}`);
        }
        if(res.status === 200){
            console.log("User Edited successfully.");
            userInfo(
                form.FirstName,
                form.LastName,
                form.Birthday,
                false
            )


        }


    }catch (err){
        console.error(err);
    }
}