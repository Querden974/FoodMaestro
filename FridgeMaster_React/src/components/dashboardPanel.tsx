import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import ContainerBox from "@/components/ContainerBox"
import {Calendar} from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { useState } from "react"
import {useContainerStore} from "@/shared/store/useContainerStore.ts";

export default function DashboardPanel() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const { containers } = useContainerStore();
    console.log(containers)
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
                                    <BreadcrumbLink href="#">
                                        Food Maestro
                                    </BreadcrumbLink>
                                </BreadcrumbItem>

                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="grid w-full h-2/3 gap-4 md:grid-cols-3">
                        {containers && containers.map((container, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle>{container.containerName}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ContainerBox items={container.containerFood}/>
                                </CardContent>
                            </Card>
                        ))}



                    </div>
                    <div className="bg-muted/50 f-full flex-1 rounded-xl md:min-h-min w-full" >
                        <div className={"flex w-1/2 gap-0"}>
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-l-xl border mx-0 "
                            />
                            <Card className={"w-full rounded-none rounded-r-xl shadow-none"}>
                                <CardHeader>
                                    <CardTitle>Expires Soon</CardTitle>
                                    <CardDescription>Pay attention to those foods</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Card Content</p>
                                </CardContent>

                            </Card>
                        </div>

                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
