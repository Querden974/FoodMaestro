import LoginForm from "@/features/Login/component/LoginForm.tsx"

export const Route = createFileRoute({
  component: Login,
})

function Login() {
  return <LoginForm/>
}
