import * as React from "react"
import {
  AudioWaveform,
  Calendar,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  CookingPot,
    Refrigerator,
    View,
    List
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { useAuthStore} from "@/features/Login/store/useAuthStore.ts";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {useContainerStore} from "@/shared/store/useContainerStore.ts";
import {useEffect, useState} from "react";

const {username, email} = useAuthStore.getState();
const {containers} = useContainerStore.getState();

// This is sample data.
const data = {
  user: {
    name: username,
    email: email,
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: View,
      isActive: true,
    },
    {
      title: "Containers",
      url: "#",
      icon: Refrigerator,
      isActive: true,
      items:
          containers.map((container) => ({
          title: container.containerName,
          url: `/dashboard/container/${container.id}`,
          isActive: true,
      })),

    },
    {
      title: "Shopping List",
      url: "#",
      icon: List,
      isActive: false,
    },
    {
      title: "Recipes",
      url: "#",
      icon: CookingPot,
      items: [
        {
          title: "My Recipes",
          url: "#",
        },
        {
          title: "Favorite Recipes",
          url: "#",
        },
        {
          title: "All Recipes",
          url: "#",
        },
      ],
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const containers = useContainerStore(state => state.containers)
  const [navMain, setNavMain] = useState(() =>
      data.navMain.map(elem =>
          elem.title === "Containers"
              ? {
                ...elem,
                items: containers.map((container) => ({
                  title: container.containerName,
                  url: `/dashboard/container/${container.id}`,
                  isActive: true,
                })),
              }
              : elem
      )
  );

  useEffect(() => {
    const updatedNav = data.navMain.map(elem =>
        elem.title === "Containers"
            ? {
              ...elem,
              items: containers.map((container) => ({
                title: container.containerName,
                url: `/dashboard/container/${container.id}`,
                isActive: true,
              })),
            }
            : elem
    );
    setNavMain(updatedNav);
  }, [containers,data.navMain]);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/*<TeamSwitcher teams={data.teams} />*/}
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />

      </SidebarContent>
      <SidebarFooter>

      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
