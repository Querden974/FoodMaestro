import { useNavigate } from "@tanstack/react-router"
import DashboardPanel  from "@/components/dashboardPanel"

import { useAuthStore } from "@/features/Login/store/useAuthStore"
import {useEffect} from "react";




export const Route = createFileRoute({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) navigate({

      to:"/",
      state:{
        icon:"error",
        message:"You must be logged in"
      }
    })
  }, []);

  return (


      <DashboardPanel />
  )
}
