import { Outlet, useRouter} from '@tanstack/react-router';
import {AppSidebar} from "@/components/app-sidebar.tsx";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";
import {useTitlePageStore} from "@/shared/store/useTitlePageStore.ts";

export const Route = createFileRoute({
  component: RouteComponent,
})

function RouteComponent() {
  const route = useRouter();
  const currentRoute = route.latestLocation.href;
  const routeTitle = useTitlePageStore((state) => state.title);
  console.log(routeTitle)


  return (
      <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">

                <BreadcrumbLink href="/dashboard">
                  Food Maestro
                </BreadcrumbLink>
              </BreadcrumbItem>

              {routeTitle && currentRoute  !== "/dashboard" &&
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="hidden md:block">

                  <BreadcrumbLink href={currentRoute}>
                    {routeTitle}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
              }



            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <Outlet/>

    </SidebarInset>
  </SidebarProvider>
  )
}
