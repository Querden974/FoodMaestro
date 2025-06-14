import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {SidebarMenuButton} from "@/components/ui/sidebar.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {ChevronDown} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {User, Settings, LogOut} from "lucide-react";

import {useNavigate} from "@tanstack/react-router";
import {useAuthStore} from "@/features/Login/store/useAuthStore.ts";

export default function NavUser({username}: { username: string }) {
    const navigate = useNavigate();
    const doLogout = useAuthStore((s) => s.logout);
    const handleLogout = () => {
        doLogout();
        navigate({
            to: "/",
            replace: true,
            state:{
                icon: "success",
                message: "You have been logged out successfully."
            }
        });
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild >
                <SidebarMenuButton className={"p-2 h-fit border cursor-pointer"}>
                    <div className={"flex items-center gap-2 text-xl"}>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span className="ml-2 font-fredoka">{username}</span>
                    </div>

                    <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-full grid gap-1 ">
                <DropdownMenuItem className={"cursor-pointer"} >
                    <User className="mr-2" />
                    <span>Profile</span>
                </DropdownMenuItem>

                <DropdownMenuItem className={"cursor-pointer"}>
                    <Settings className="mr-2" />
                    <span>Settings</span>
                </DropdownMenuItem>

                <Button asChild variant={"destructive"} className={"w-full justify-start cursor-pointer"} onClick={() => handleLogout()}>
                    <DropdownMenuItem >
                        <LogOut className="mr-2" />
                        <span>Logout</span>
                    </DropdownMenuItem>
                </Button>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
