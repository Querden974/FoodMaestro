"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,

  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {useRouter} from "@tanstack/react-router"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const router = useRouter()
  console.log(router.latestLocation.href)
  const currentPath = router.latestLocation.href

  return (
    <SidebarGroup>

      <SidebarMenu>
        {items.map((item, index) => (

            <div key={index}>
              {item.items && item.items.length > 0 ? (
                  <Collapsible
                      key={item.title}
                      asChild
                      defaultOpen={item.isActive}
                      className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title} className={`cursor-pointer rounded-full pl-3 ${currentPath === item.url ? "bg-primary text-white" : ""}`}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className={"ml-1"}>
                        <SidebarMenuSub className={""}>
                          {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title} className={`rounded-full ${currentPath === item.url ? "bg-primary text-white" : ""}`}>
                                <SidebarMenuSubButton asChild className={`rounded-full ${currentPath === subItem.url ? "bg-primary text-white" : ""}`}>
                                  <a href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title} >
                    <SidebarMenuButton asChild className={`rounded-full px-3 ${currentPath === item.url ? "bg-primary text-white" : ""}`}>
                      <a href={item.url}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

              )
              }


           </div>

        ))}
        </SidebarMenu>
    </SidebarGroup>
  )
}
