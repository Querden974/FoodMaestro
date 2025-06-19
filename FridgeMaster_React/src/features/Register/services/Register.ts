import {showToast} from "@/components/ToastInfo";

export async function doRegister (form:object,
                                ):Promise<void> {
    const registerApi = import.meta.env.VITE_API_URL + "/Register";

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


            showToast({
                message: "Account created successfully",
                icon: "success",
            });



            console.log(resData);






        }

    }catch (err){
        console.error(err);
    }

}