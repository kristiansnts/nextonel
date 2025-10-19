/**
 * Component exports for ShadPanel
 * All UI components including Form Builder and Data Table systems
 */

// ============================================================================
// Base UI Components (shadcn/ui)
// ============================================================================
export { Alert, AlertTitle, AlertDescription } from "./ui/alert"
export { Badge, badgeVariants } from "./ui/badge"
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./ui/breadcrumb"
export { Button, buttonVariants } from "./ui/button"
export { Calendar } from "./ui/calendar"
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./ui/card"
export { Checkbox } from "./ui/checkbox"
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "./ui/dropdown-menu"
export {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "./ui/field"
export { Input } from "./ui/input"
export { Label } from "./ui/label"
export { Popover, PopoverTrigger, PopoverContent } from "./ui/popover"
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "./ui/select"
export { Separator } from "./ui/separator"
export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription } from "./ui/sheet"
export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "./ui/sidebar"
export { Skeleton } from "./ui/skeleton"
export { Switch } from "./ui/switch"
export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from "./ui/table"
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs"
export { Textarea } from "./ui/textarea"
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./ui/tooltip"

// ============================================================================
// Form Builder System
// ============================================================================
export {
  Form,
  TextInput,
  Textarea as FormTextarea,
  Checkbox as FormCheckbox,
  Toggle,
  Select as FormSelect, // Use FormSelect for form fields
  TagsInput,
  DatePicker,
  DateTimePicker,
  FileUpload,
  KeyValue,
  MarkdownEditor,
  RichEditor,
  Grid,
  Section,
  Fieldset,
  Tabs as FormTabs,
  Group,
  Placeholder,
  useFormContext,
} from "./ui/form-builder"

// ============================================================================
// Data Table System
// ============================================================================
export {
  DataTable,
  SelectColumn,
  TextColumn,
  ImageColumn,
  ActionsColumn,
  Action,
} from "./ui/data-table"

// ============================================================================
// Notifications (Sonner re-export)
// ============================================================================
export { Toaster } from "sonner"
