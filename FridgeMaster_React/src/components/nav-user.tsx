"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Moon, Sun, LayoutDashboard
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {useTheme} from "@/components/theme-provider";


import { useAuthStore } from "@/features/Login/store/useAuthStore.ts";
import { useNavigate } from "@tanstack/react-router";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {showToast} from "@/components/ToastInfo.tsx";




export function NavUser({
  user,
  }: {
  user: {
    name: string
    email: string
    avatar: string
  }
  }) {
  const { isMobile } = useSidebar()
  const logout = useAuthStore.getState().logout
  const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate({
        to: "/",
        state: {
            icon: "success",
            message: "You have been logged out",
        },
        });
    };
    const {theme, setTheme} = useTheme();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-full"
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-full capitalize">{user.name.slice(0,2)}</AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg font-fredoka"
            side={isMobile ? "bottom" : "right"}
            align="start"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-full capitalize">{user.name.slice(0,2)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className={"cursor-pointer"} onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                { theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
                Switch to {theme === "light" ? "Dark" : "Light"} Mode
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className={"cursor-pointer"}>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className={"cursor-pointer"}>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className={"cursor-pointer"}>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant={"destructive"} className={"cursor-pointer "} onClick={() => handleLogout()}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export function NavUserHome({
                          user,
                        }: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
 const [isDisabled, setIsDisabled] = useState(false);
  const logout = useAuthStore(s=>s.logout)
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate({
      to: "/"
    });
    showToast({
      icon:"success",
      message:"Logged out successfully",
    })
  };
  const {theme, setTheme} = useTheme();
  return (

          <DropdownMenu>

            <DropdownMenuTrigger asChild >
              <Button variant={"ghost"}
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border-2 h-12 rounded-full"
              >
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-full capitalize">{user.name.slice(0,2)}</AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </Button>
            </DropdownMenuTrigger>


            <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg font-fredoka"
                side={"bottom"}
                align="start"
                sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-full">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-full capitalize">{user.name.slice(0,2)}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className={"cursor-pointer text-primary  "} onClick={() => navigate({to: "/dashboard"})}>
                  <LayoutDashboard className={"text-primary"} />
                  Dashboard
                </DropdownMenuItem >
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className={"cursor-pointer"} onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                  { theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
                  Switch to {theme === "light" ? "Dark" : "Light"} Mode
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem  className={"cursor-pointer"}>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem >
                <DropdownMenuItem className={"cursor-pointer"}>
                  <CreditCard />
                  Billing
                </DropdownMenuItem >
                <DropdownMenuItem className={"cursor-pointer"}>
                  <Bell />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

                <DropdownMenuItem variant={"destructive"}
                                  className={"cursor-pointer"}
                                  disabled={isDisabled}
                                  onClick={() => {
                                    handleLogout()
                                    setIsDisabled(true);
                                  }}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>


            </DropdownMenuContent>
          </DropdownMenu>

  )
}
