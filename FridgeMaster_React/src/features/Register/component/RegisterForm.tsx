import {useForm} from "@tanstack/react-form"
import {Label} from "@/components/ui/label.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Button} from "@/components/ui/button.tsx"
import { z } from "zod";
import {doRegister} from "@/features/Register/services/Register.ts";



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
        password: z.string().min(6, "Password must be at least 6 characters long"),
        passwordConfirm: z.string().min(1)
    }).required()

const registerFormSchemaWithRefinement = registerFormSchema
    .refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords do not match",
        path: ["passwordConfirm"],
})


export default function RegisterForm({setDialogOpen}: { setDialogOpen?: (open:string) => void }) {
    const closeDialog = () =>{
        if(setDialogOpen) setDialogOpen("")
    }
    const form = useForm({
        defaultValues:{
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
        } as RegisterFormType,

        onSubmit: async ( {value}) => {

            await doRegister(value)
            closeDialog()
        },
    })



    return (
        <div className={"mt-4 "}>
            <h1 className={"text-2xl font-bold mb-4"}>Register</h1>
            <form className={"grid gap-2"} onSubmit={(e)=> {
                if(form.state.errorMap) e.preventDefault()
                form.handleSubmit()
            }}>


                <form.Field name="username"
                            asyncDebounceMs={500}
                            validators={{
                                onChangeAsync: async ({value}) => {
                                    try {
                                        await registerFormSchema.pick({username: true}).parseAsync({username: value});

                                        return [];
                                    } catch (error) {
                                        if (error instanceof z.ZodError) {
                                            return error.errors.map((err) => err.message);
                                        }
                                        return ["Invalid input"];
                                    }
                                }
                            }}
                >
                    {(field) => (
                        <div className="grid gap-1">
                            <Label htmlFor={"username"}>Username:</Label>
                            <Input type={"username"}
                                   id={"username"}
                                   autoComplete={"username"}
                                   value={field.state.value}
                                   placeholder={"ex: JohnDoe"}
                                   required
                                   onChange={(e) => field.handleChange(e.target.value)}
                            />
                            {field.state.meta.errors.length > 0 && (
                                <p className="text-red-500 text-sm mt-1">
                                    {field.state.meta.errors.map((error) =>
                                        JSON.stringify(error)
                                    ).join(", ")}
                                </p>
                            )}
                        </div>
                    )}
                </form.Field>

                <form.Field name="email"
                            asyncDebounceMs={500}
                            validators={{
                                onChangeAsync: async ({value}) => {
                                    try {
                                        await registerFormSchema.pick({email: true}).parseAsync({email: value});

                                        return [];
                                    } catch (error) {
                                        if (error instanceof z.ZodError) {
                                            return error.errors.map((err) => err.message);
                                        }
                                        return ["Invalid input"];
                                    }
                                }
                            }}>
                    {(field) => (
                        <div className="grid gap-1">
                            <Label htmlFor={"email"}>Email:</Label>
                            <Input type={"email"}
                                   autoComplete={"email"}
                                   id={"email"}
                                   required
                                   value={field.state.value}
                                   placeholder={"ex: JohnDoe@domain.com"}
                                   onChange={(e) => field.handleChange(e.target.value)}
                            />
                            {field.state.meta.errors.length > 0 && (
                                <p className="text-red-500 text-sm mt-1 whitespace-pre-line">
                                    {field.state.meta.errors.map((error) =>
                                        JSON.stringify(error)
                                    ).join(", ")}
                                </p>
                            )}
                        </div>
                    )}
                </form.Field>

                <form.Field name="password"
                            asyncDebounceMs={500}
                            validators={{
                                onChangeAsync: async ({value}) => {
                                    try {
                                        await registerFormSchema.pick({password: true}).parseAsync({password: value});

                                        return [];
                                    } catch (error) {
                                        if (error instanceof z.ZodError) {
                                            return error.errors.map((err) => err.message);
                                        }
                                        return ["Invalid input"];
                                    }
                                }
                            }}

                >
                    {(field) => (
                        <div className="grid gap-1">
                            <Label htmlFor={"password"}>Password:</Label>
                            <Input type={"password"}
                                   id={"password"}
                                   required
                                   value={field.state.value}
                                   autoComplete={"new-password"}
                                   placeholder={"********"}
                                   onChange={(e) => field.handleChange(e.target.value)}
                            />
                            {field.state.meta.errors.length > 0 && (
                                <p className="text-red-500 text-sm mt-1">
                                    {field.state.meta.errors.map((error) =>
                                        JSON.stringify(error)
                                    ).join(", ")}
                                </p>
                            )}
                        </div>
                    )}
                </form.Field>

                <form.Field
                    name="passwordConfirm"
                    asyncDebounceMs={500}
                    validators={{
                        onChangeAsync: async ({ value }) => {
                            const values = form.store.state.values;

                            try {
                                await registerFormSchemaWithRefinement.parseAsync({
                                    ...values,
                                    passwordConfirm: value, // on remplace juste celui qu'on est en train de valider
                                });
                                return [];
                            } catch (error) {
                                if (error instanceof z.ZodError) {
                                    // on retourne seulement les erreurs liées à ce champ
                                    return error.errors
                                        .filter((err) => err.path.includes("passwordConfirm"))
                                        .map((err) => err.message);
                                }
                                return ["Invalid input"];
                            }
                        },
                    }}

                >
                    {(field) => (
                        <div className="grid gap-1">
                            <Label htmlFor={field.name}>Confirm Password:</Label>
                            <Input
                                type="password"
                                required
                                id={field.name}
                                value={field.state.value}
                                autoComplete={"new-password"}
                                placeholder="********"
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                            {field.state.meta.errors.length > 0 && (
                                <p className="text-red-500 text-sm mt-1">
                                    {field.state.meta.errors
                                        .map((error) =>
                                            JSON.stringify(error)
                                        )
                                        .join(", ")}
                                </p>
                            )}
                        </div>
                    )}
                </form.Field>


                <Button type={"submit"} className={"cursor-pointer mt-2"} >
                    Create Account
                </Button>
            </form>



        </div>

    )
}