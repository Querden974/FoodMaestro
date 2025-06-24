import {showToast} from "@/components/ToastInfo.tsx";

type CallApiParams <T> =
    | {
    endpoint:string
    method: "GET" | "DELETE"
    data?: null | undefined
    okMessage:string
    errorMessage:string
        }
    | {
    endpoint:string
    method: "GET" | "POST" | "PUT" | "DELETE"
    data?: T
    okMessage:string
    errorMessage:string
    }


export async function callApi<T,U>({endpoint, method, data, okMessage, errorMessage} : CallApiParams<T>) {

        const url = import.meta.env.VITE_API_URL + endpoint;
        let fetchOptions;

        try {

            if(method === "POST" || method === "PUT"){
                fetchOptions = {
                    method:method,
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify(data)
                }
            } else{
                fetchOptions = {
                    method:method,
                    headers:{
                        "Content-Type": "application/json"
                    }
                }
            }

            const res:Response = await fetch(url,fetchOptions)

            if(!res.ok) throw new Error(`An error occurred: ${res.status}` )

            if(method === "POST" || method === "PUT"){
                showToast({
                    icon:"success",
                    message:okMessage,
                })


            }
            return await res.json() as U

        } catch (err:unknown){
            if(err instanceof Error){
                showToast({
                    icon:"error",
                    message:`${errorMessage} : ${err.message}`,
                })
            } else {
                showToast({
                    icon:"error",
                    message:`An unknown error occurred`,
                })
            }

            return null
        }
    }