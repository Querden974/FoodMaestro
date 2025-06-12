import { createRootRoute, Link, Outlet, useRouter } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useAuthStore } from '@/features/Login/store/useAuthStore.ts';

function RootComponent() {
    const isAuthenticated = useAuthStore(state => state.isLoggedIn);
    const router = useRouter();
    const location = router.state.location;

    const isIndexPage = location.pathname === '/';
    const showNavbar = isAuthenticated || !isIndexPage;

    return (
        <>
            {showNavbar && (
                <div className="p-2 flex gap-2">
                    <Link to="/" className="[&.active]:font-bold">
                        Home
                    </Link>
                </div>
            )}

            <Outlet />

            <TanStackRouterDevtools />
        </>
    );
}

export const Route = createRootRoute({
    component: RootComponent,
});
