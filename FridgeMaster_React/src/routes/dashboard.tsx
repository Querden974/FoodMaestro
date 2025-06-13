import { useNavigate } from "@tanstack/react-router"

import { useAuthStore } from "@/features/Login/store/useAuthStore"


export const Route = createFileRoute({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)

  if (!isLoggedIn) navigate({
    from:"/dashboard",
    to:"/",
    state:{
      message:"You mus be logged in"
    }
  })
  
  return (
    <div>😑</div>
  )
}
