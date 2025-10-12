import { LucideIcon, House, KeyRound, Users, FileEdit, Bell } from "lucide-react"

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
          title: "Table Builder Demo",
          url: "/admin/dashboard/table-demo",
          icon: Users,
        },
        {
          title: "Form Builder Demo",
          url: "/admin/dashboard/form-demo",
          icon: FileEdit,
        },
        {
          title: "Notification Demo",
          url: "/admin/dashboard/notification-demo",
          icon: Bell,
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
