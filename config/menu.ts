import { LucideIcon, House, KeyRound, Users, FileEdit } from "lucide-react"

export interface MenuItem {
  title: string
  url?: string
  icon?: LucideIcon
  isActive?: boolean
  items?: MenuItem[]
}

export interface MenuConfig {
  navMain: MenuItem[]
}

// Default menu configuration
// You can modify this array to customize what appears in the sidebar
export const defaultMenuConfig: MenuConfig = {
  navMain: [
    {
      title: "Nextonel",
      items: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
          icon: House,
        },
        {
          title: "Users",
          url: "/admin/dashboard/users",
          icon: Users,
        },
        {
          title: "Form Builder Demo",
          url: "/admin/dashboard/form-demo",
          icon: FileEdit,
        },
      ],
    },
    {
      title: "Configuration",
      items: [
        {
          title: "Authentication",
          url: "/admin/dashboard/auth-config",
          icon: KeyRound,
        },
      ],
    },
  ],
}
