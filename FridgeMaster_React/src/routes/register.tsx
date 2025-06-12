import RegisterForm from '@/features/Register/component/RegisterForm.tsx';

export const Route = createFileRoute({
  component: register,
})

function register() {
  return <RegisterForm />
}
