import {useForm} from "@tanstack/react-form"
import {Label} from "@/components/ui/label.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Button} from "@/components/ui/button.tsx"
import {doLogin} from "@/features/Login/services/Login.ts";

import {useAuthStore} from "@/features/Login/store/useAuthStore.ts";
import {useContainerStore} from "@/shared/store/useContainerStore.ts";
import {useUserInfo} from "@/shared/store/useUserInfo.ts";

import { useNavigate } from "@tanstack/react-router";

import { z } from "zod";


type LoginFormType = {
    username: string;
    password: string;
}

const loginFormSchema = z
    .object({
        username: z.string().min(1, "Username is required"),
        password: z.string().min(6, "Password is required"),
    })


export default function LoginForm() {
    const navigate = useNavigate();
    const redirect = () => {navigate({
                to:"/dashboard"
            })}
    const login = useAuthStore((s) => s.login);
    const userInfo = useUserInfo(s => s.fetchData);
    const containers = useContainerStore(s => s.fetchContainers);
    const form = useForm({
        defaultValues:{
            username: '',
            password: '',
        } as LoginFormType,
        validators:{
            onChange: loginFormSchema
        },
        onSubmit: async ( {value}) => {

               await doLogin(value, login, userInfo, containers, redirect )

            
            
            
            
            // alert(JSON.stringify(value, null, 2))
        },
    })

    return (
        <div className={"mt-4"}>

            <form className={"grid gap-2"} onSubmit={(e)=> {
                if(form.state.errorMap) e.preventDefault()
                form.handleSubmit()
            }}>


                <form.Field name="username">
                    {(field) => (
                        <div className="grid gap-1">
                            <Label htmlFor={"username"}>Username:</Label>
                            <Input type={"username"}
                                   id={"username"}
                                   value={field.state.value}
                                   placeholder={"ex: JohnDoe"}
                                   onChange={(e) => field.handleChange(e.target.value)}
                            />
                            {field.state.meta.errors.length > 0 && (
                                <p className="text-red-500 text-sm mt-1">
                                    {field.state.meta.errors.map((error) =>
                                        typeof error === 'string' ? error : error?.message ?? JSON.stringify(error)
                                    ).join(", ")}
                                </p>
                            )}
                        </div>
                    )}
                </form.Field>

                <form.Field name="password">
                    {(field) => (
                        <div className="grid gap-1">
                            <Label htmlFor={"password"}>Password:</Label>
                            <Input type={"password"}
                                   id={"password"}
                                   value={field.state.value}
                                   placeholder={"********"}
                                   onChange={(e) => field.handleChange(e.target.value)}
                            />
                            {field.state.meta.errors.length > 0 && (
                                <p className="text-red-500 text-sm mt-1">
                                    {field.state.meta.errors.map((error) =>
                                        typeof error === 'string' ? error : error?.message ?? JSON.stringify(error)
                                    ).join(", ")}
                                </p>
                            )}
                        </div>
                    )}
                </form.Field>


                <Button type={"submit"} className={"cursor-pointer mt-2"}>
                    Log into your account
                </Button>
            </form>



        </div>

    )
}
