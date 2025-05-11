import * as Burnt from "burnt";
import {Router} from "expo-router";


export default async function LoginMethod (form:object, fn:Function, router:Router):Promise<void> {
    const registerApi = "http://192.168.1.96:5020/api/Login";


    try {
        const res:Response = await fetch(registerApi, {
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

            const resData = await res.json()
            console.log(resData);
            fn(resData.data.username, resData.data.id, resData.data.userInfo);
            Burnt.toast({
                title: resData.data.message,
                preset:"done",
                from: "top"
            })

                router.replace('/screens/Dashboard')


        }else{
            Burnt.toast({
                title: "Wrong Credentials",
                preset:"error",
                from: "top"
            })
        }

    }catch (err){
        console.error(err);
    }

}