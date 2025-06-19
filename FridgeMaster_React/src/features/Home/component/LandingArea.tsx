import LoginForm from "@/features/Login/component/LoginForm.tsx"
import RegisterForm from "@/features/Register/component/RegisterForm.tsx"
import AlertDialog from "@/components/AlertDialog"

import {useState} from "react"
import {useAuthStore} from "@/features/Login/store/useAuthStore.ts"
import {Button} from "@/components/ui/button.tsx";
import {Link} from "@tanstack/react-router";

export default function LandingArea() {
    const [dialogOpen, setDialogOpen] = useState<string>("")
    const {isLoggedIn} = useAuthStore()
    return (

        <div className={"flex flex-col gap-6 place-items-center justify-center min-h-screen "}>
            <h1 className={"uppercase text-6xl w-6/10 text-center h-fit"}>A <span className={"font-fredoka-one"}>Maestro</span> to keep on track your <span className={"font-fredoka-one"}>food</span></h1>
            <h2 className={"font-light text-center"}>Stop wasting your food because of the expiry date. Start saving now and track your food.</h2>
            { !isLoggedIn
                ? (
                    <div className={"grid grid-flow-col grid-cols-2 gap-4 w-1/2"}>
                        <AlertDialog
                            buttonLabel={"Login"}
                            title={"Login"}
                            description={"Enter your credentials to log into your Food Maestro account."}
                            component={<LoginForm/>}
                            variants={"secondary"}
                            setDialogOpen={setDialogOpen}
                            isOpen={dialogOpen === "Login"}
                            redirectTo={"Register"}/>
                        <AlertDialog
                            buttonLabel={"Register"}
                            title={"Register"}
                            description={"Please enter those required information to create your account."}
                            component={<RegisterForm setDialogOpen={setDialogOpen}/>}
                            setDialogOpen={setDialogOpen}
                            isOpen={dialogOpen === "Register"}
                            redirectTo={"Login"}/>
                    </div>
                )
                : (
                    <Button asChild>
                        <Link to={"/dashboard"}>Go to your space</Link>
                    </Button>
                )}


            <p>Don’t be scared. It’s totally <span className={"font-fredoka-one underline"}>free</span></p>
        </div>
    )
}
