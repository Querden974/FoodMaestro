import {useForm} from "@tanstack/react-form"
import {Label} from "@/components/ui/label.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Button} from "@/components/ui/button.tsx"
import { z } from "zod";



type RegisterFormType = {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

const registerFormSchema = z
    .object({
        username: z.string().min(1, "Username is required"),
        email: z.string().email("Invalid email address").min(1, "Email is required"),
        password: z.string().min(6, "Password is required"),
        passwordConfirm: z.string()
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords do not match",
        path: ["passwordConfirm"],
    })

export default function LoginForm() {
    const form = useForm({
        defaultValues:{
            username: '',
            email: '',
            password: '',
        } as RegisterFormType,
        validators:{
            onChange: registerFormSchema
        },
        onSubmit: ( {value}) => {
            alert(JSON.stringify(value, null, 2)) // Replace with your registration logic
        },
    })

    return (
        <div className={"mt-4 "}>
            <h1 className={"text-2xl font-bold mb-4"}>Register</h1>
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

                <form.Field name="email">
                    {(field) => (
                        <div className="grid gap-1">
                            <Label htmlFor={"email"}>Email:</Label>
                            <Input type={"email"}
                                   id={"email"}
                                   value={field.state.value}
                                   placeholder={"ex: JohnDoe@domain.com"}
                                   onChange={(e) => field.handleChange(e.target.value)}
                            />
                            {field.state.meta.errors.length > 0 && (
                                <p className="text-red-500 text-sm mt-1 whitespace-pre-line">
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

                <form.Field name="passwordConfirm">
                    {(field) => (
                        <div className="grid gap-1">
                            <Label htmlFor={"passwordConfirm"}>Confirm Password:</Label>
                            <Input type={"password"}
                                   id={"passwordConfirm"}
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