import type {AuthStateType} from "@/features/Login/store/useAuthStore.ts";
import type {UserInfoType} from "@/shared/store/useUserInfo.ts";
import type {ContainerType} from "@/shared/store/useContainerStore.ts";

export async function doLogin (form:object,
                               setAuth: AuthStateType["login"] ,
                               setUserInfo:UserInfoType["fetchData"],
                               setContainer:ContainerType["fetchContainers"],
                               redirect: () => void  ):Promise<void> {
    const registerApi = import.meta.env.VITE_API_URL + "/Login";

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

            setAuth(resData.data.username, resData.data.email ,resData.data.id);
            setUserInfo(
                resData.data.userInfo.firstName,
                resData.data.userInfo.lastName,
                resData.data.userInfo.birthday,
                resData.data.userInfo.isFirstLoggin
            );
            setContainer(resData.container);
            redirect();

            
            console.log(resData);






        }

    }catch (err){
        console.error(err);
    }

}