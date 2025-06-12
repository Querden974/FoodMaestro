import LoginForm from "@/features/Login/component/LoginForm.tsx"
import RegisterForm from "@/features/Register/component/RegisterForm.tsx"
import AlertDialog from "@/components/AlertDialog"
import {useState} from "react"

import {useAuthStore} from "@/features/Login/store/useAuthStore.ts";
import {Button} from "@/components/ui/button.tsx";


export const Route = createFileRoute({
    component: Index,
})

export function Index() {
    const [dialogOpen, setDialogOpen] = useState<string>("")
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const username = useAuthStore((state) => state.username);
    const doLogout = useAuthStore((state) => state.logout);


    return (
        <div className="place-items-center grid gap-4">

            {!isLoggedIn && (
                <>
                    <h3 className={"uppercase font-bold text-3xl"}>Welcome to Food Maestro</h3>
                    <div className={"grid grid-flow-col grid-cols-2 gap-2"}>

                        <AlertDialog
                            buttonLabel={"Login"}
                            title={"Login"}
                            description={"Enter your credentials to log into your Food Maestro account."}
                            component={<LoginForm/>}
                            variants={"secondary"}
                            setDialogOpen={setDialogOpen}
                            isOpen={dialogOpen === "Login"}
                            redirectTo={"Register"}


                        />
                        <AlertDialog
                            buttonLabel={"Register"}
                            title={"Register"}
                            description={"Please enter those required information to create your account."}
                            component={<RegisterForm/>}
                            setDialogOpen={setDialogOpen}
                            isOpen={dialogOpen === "Register"}
                            redirectTo={"Login"}


                        />


                    </div>
                </>
            )}


            {isLoggedIn && (
                <div className={"text-center"}>
                    <h3 className={"uppercase font-bold text-3xl"}>Welcome back {username}</h3>
                    <Button variant={"destructive"} onClick={() => doLogout()}>
                        Logout
                    </Button>
                </div>
            )}
        </div>
    )
}