import { BookAudio, Calendar, Database, GalleryHorizontal, Home, Inbox, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import LogoutButton from "@/components/LogoutButton"

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Program Kerja",
    url: "/dashboard/program-kerja",
    icon: Inbox,
  },
  {
    title: "Informasi",
    url: "/dashboard/informasi",
    icon: Calendar,
  },
  {
    title: "Pengurus",
    url: "/dashboard/pengurus",
    icon: Settings,
  },
  {
    title: "Database",
    url: "/dashboard/database",
    icon: Database,
  },
  {
    title: "Galery",
    url: "/dashboard/galery",
    icon: GalleryHorizontal,
  },
  {
    title: "Kritik & Saran",
    url: "/dashboard/kritik-saran",
    icon: BookAudio,
  },
]

export function SidebarSection() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>HME Polinema</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <LogoutButton />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
