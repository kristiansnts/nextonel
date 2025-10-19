# ShadPanel - Direct Usage Guide

This guide shows you how to use ShadPanel components directly after installing the package, **without** running `npx shadpanel init`.

## Installation

```bash
npm install shadpanel
# or
pnpm install shadpanel
# or
yarn add shadpanel
```

## Quick Start

### 1. Install Required Peer Dependencies

ShadPanel requires Next.js 15+, React 19+, and Tailwind CSS v4:

```bash
npm install next@latest react@latest react-dom@latest
npm install -D tailwindcss@latest @tailwindcss/postcss
```

### 2. Configure Tailwind CSS

Create or update `postcss.config.mjs`:

```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
```

### 3. Import ShadPanel Styles

In your root layout file (`app/layout.tsx` or `pages/_app.tsx`):

```tsx
import 'shadpanel/styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### 4. Start Using Components

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from 'shadpanel'

export default function MyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello ShadPanel</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click Me</Button>
      </CardContent>
    </Card>
  )
}
```

## Usage Examples

### Form Builder

```tsx
'use client'

import { Form, TextInput, FormSelect, Toggle, Button } from 'shadpanel'
import { useState } from 'react'

export default function CreateUserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    active: true,
  })

  return (
    <Form
      initialValues={formData}
      onSubmit={(values) => {
        console.log('Form submitted:', values)
        // Handle form submission
      }}
    >
      <TextInput
        accessor="name"
        label="Full Name"
        placeholder="John Doe"
        required
      />

      <TextInput
        accessor="email"
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        required
      />

      <FormSelect
        accessor="role"
        label="Role"
        options={[
          { label: 'User', value: 'user' },
          { label: 'Admin', value: 'admin' },
          { label: 'Editor', value: 'editor' },
        ]}
      />

      <Toggle
        accessor="active"
        label="Active"
        helperText="Enable or disable this user"
      />

      <Button type="submit">Create User</Button>
    </Form>
  )
}
```

### Data Table

```tsx
'use client'

import { DataTable, TextColumn, ImageColumn, ActionsColumn, Action } from 'shadpanel'
import { Edit, Trash } from 'lucide-react'

interface User {
  id: number
  name: string
  email: string
  avatar: string
  role: string
}

export default function UsersTable() {
  const users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '/avatars/john.jpg',
      role: 'Admin',
    },
    // ... more users
  ]

  return (
    <DataTable data={users}>
      <ImageColumn
        accessor="avatar"
        header="Avatar"
      />

      <TextColumn
        accessor="name"
        header="Name"
        sortable
        searchable
      />

      <TextColumn
        accessor="email"
        header="Email"
        searchable
      />

      <TextColumn
        accessor="role"
        header="Role"
        sortable
      />

      <ActionsColumn>
        <Action
          icon={Edit}
          label="Edit"
          onClick={(row) => console.log('Edit', row)}
        />
        <Action
          icon={Trash}
          label="Delete"
          onClick={(row) => console.log('Delete', row)}
        />
      </ActionsColumn>
    </DataTable>
  )
}
```

### Advanced Form with Layout

```tsx
'use client'

import {
  Form,
  TextInput,
  FormTextarea,
  FormSelect,
  DatePicker,
  Grid,
  Section,
  Fieldset,
  Button,
} from 'shadpanel'

export default function AdvancedForm() {
  return (
    <Form
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        bio: '',
        country: '',
        birthDate: new Date(),
      }}
      onSubmit={(values) => console.log(values)}
    >
      <Section title="Personal Information" description="Basic details about you">
        <Grid columns={2}>
          <TextInput accessor="firstName" label="First Name" required />
          <TextInput accessor="lastName" label="Last Name" required />
        </Grid>

        <FormTextarea
          accessor="bio"
          label="Biography"
          placeholder="Tell us about yourself"
          rows={4}
        />
      </Section>

      <Section title="Contact Information">
        <Fieldset legend="Contact Details">
          <TextInput accessor="email" label="Email" type="email" required />
          <TextInput accessor="phone" label="Phone" type="tel" />
        </Fieldset>
      </Section>

      <Section title="Additional Details">
        <Grid columns={2}>
          <FormSelect
            accessor="country"
            label="Country"
            options={[
              { label: 'United States', value: 'us' },
              { label: 'United Kingdom', value: 'uk' },
              { label: 'Canada', value: 'ca' },
            ]}
          />

          <DatePicker
            accessor="birthDate"
            label="Birth Date"
          />
        </Grid>
      </Section>

      <Button type="submit">Submit</Button>
    </Form>
  )
}
```

### Using UI Components

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Badge,
  Separator,
} from 'shadpanel'

export default function DashboardCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Dashboard Stats</CardTitle>
          <Badge>New</Badge>
        </div>
        <CardDescription>
          Overview of your key metrics
        </CardDescription>
      </CardHeader>

      <Separator />

      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Total Users</span>
            <span className="font-bold">1,234</span>
          </div>
          <div className="flex justify-between">
            <span>Active Sessions</span>
            <span className="font-bold">56</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  )
}
```

### Sidebar Layout

```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from 'shadpanel'
import { Home, Users, Settings } from 'lucide-react'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/dashboard">
                      <Home />
                      <span>Dashboard</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/users">
                      <Users />
                      <span>Users</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/settings">
                      <Settings />
                      <span>Settings</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">My App</h1>
        </header>
        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

## Available Components

### UI Components
- `Button`, `Badge`, `Card`, `Input`, `Label`
- `Select`, `Checkbox`, `Switch`, `Textarea`
- `Dialog`, `DropdownMenu`, `Popover`, `Tooltip`
- `Table`, `Tabs`, `Separator`, `Skeleton`
- `Alert`, `Breadcrumb`, `Calendar`, `Sheet`
- `Sidebar` (complete sidebar system)

### Form Builder
- **Fields**: `TextInput`, `FormTextarea`, `FormCheckbox`, `Toggle`, `FormSelect`, `TagsInput`, `DatePicker`, `DateTimePicker`, `FileUpload`, `KeyValue`, `MarkdownEditor`, `RichEditor`
- **Layout**: `Form`, `Grid`, `Section`, `Fieldset`, `FormTabs`, `Group`, `Placeholder`
- **Hook**: `useFormContext`

### Data Table
- `DataTable`
- **Columns**: `TextColumn`, `ImageColumn`, `SelectColumn`, `ActionsColumn`
- **Actions**: `Action`

### Utilities
- `cn` - Tailwind class merge utility
- `useIsMobile` - Mobile detection hook

### Notifications
- `Toaster` (from Sonner)

## TypeScript Support

ShadPanel is fully typed with TypeScript. Import types as needed:

```tsx
import type { ButtonProps, FormProps, DataTableProps } from 'shadpanel'
```

## Customization

### Custom Theme

You can customize the color scheme by modifying CSS variables in your own CSS file:

```css
:root {
  --primary: oklch(0.5 0.2 250);
  --primary-foreground: oklch(1 0 0);
  /* Add more custom variables */
}
```

### Tailwind Configuration

ShadPanel uses Tailwind CSS v4. No additional configuration needed, but you can extend it:

```css
@import "shadpanel/styles/globals.css";

/* Your custom styles */
@layer utilities {
  .custom-class {
    /* Your styles */
  }
}
```

## Need Full Project Scaffolding?

If you want a complete admin panel setup with authentication, demo pages, and full configuration, use the CLI:

```bash
npx shadpanel init
```

This will scaffold a complete Next.js admin panel with:
- Pre-configured project structure
- Optional NextAuth.js authentication
- Demo pages for Form Builder and Data Table
- Sidebar navigation setup
- Dark mode support

## Documentation

For more detailed documentation, visit:
- **GitHub**: https://github.com/kristiansnts/shadpanel
- **Examples**: See the `templates/` directory in the package

## Support

- Report issues: https://github.com/kristiansnts/shadpanel/issues
- Email: epafroditus.kristian@gmail.com

## License

MIT License - Free to use in commercial and open source projects.
