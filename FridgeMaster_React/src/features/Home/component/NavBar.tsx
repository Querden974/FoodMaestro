import {Button} from "@/components/ui/button.tsx";
import { NavUserHome} from "@/components/nav-user";
import {useAuthStore} from "@/features/Login/store/useAuthStore.ts";

export default function NavBar() {
    const {username, email, isLoggedIn} = {
        username:useAuthStore(s=>s.username),
        email:useAuthStore(s=>s.email),
        isLoggedIn:useAuthStore(s=>s.isLoggedIn)
    }



    return (
        <nav className={"grid grid-cols-3 grid-flow-col items-center justify-between px-16 mt-4"}>
            <a href={"/"} className={"font-fredoka-one text-3xl"}>Food Maestro</a>
            <div className="p-2 mx-auto flex flex- gap-2">
                <Button asChild variant={"link"}>
                    <a href={"#howItWorks"} className="font-bold" >
                        How it works
                    </a>
                </Button>
                <Button asChild variant={"link"}>
                    <a href={"#features"} className="font-bold" >
                        Features
                    </a>
                </Button>
                <Button asChild variant={"link"} >
                    <a href={"#faq"} className="font-bold" >
                        Faq
                    </a>
                </Button>
            </div>
            {isLoggedIn ? (
                <div className={"ml-auto"}>
                    <NavUserHome user={{name: username, email: email, avatar: "/avatars/shadcn.jpg"}} />
                </div>

            ) :
            (
                ""
            )}



        </nav>
    )
}
