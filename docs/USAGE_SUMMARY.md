# ShadPanel - Usage Summary

## Two Ways to Use ShadPanel

### 🚀 Method 1: Direct Usage (No CLI Required)

**Perfect for**: Existing Next.js projects, gradual adoption, component library usage

```bash
# 1. Install
npm install shadpanel

# 2. Import styles in your layout
# app/layout.tsx
import 'shadpanel/styles/globals.css'

# 3. Use components anywhere
import { Button, Form, DataTable } from 'shadpanel'
```

**Benefits**:
- ✅ Works immediately after installation
- ✅ No scaffolding needed
- ✅ Use only what you need
- ✅ Import components like any npm package
- ✅ Full TypeScript support

**Example**:
```tsx
import { Card, Button } from 'shadpanel'

export default function Page() {
  return (
    <Card>
      <Button>Click Me</Button>
    </Card>
  )
}
```

---

### 🏗️ Method 2: Full Scaffolding (Using CLI)

**Perfect for**: New projects, complete admin panels, authentication needs

```bash
npx shadpanel init
```

**Benefits**:
- ✅ Complete project structure
- ✅ Pre-configured authentication (optional)
- ✅ Demo pages and examples
- ✅ Sidebar navigation setup
- ✅ Dark mode toggle
- ✅ Ready-to-customize templates

**What You Get**:
```
your-project/
├── app/
│   ├── admin/
│   │   ├── dashboard/      # Admin pages
│   │   ├── login/          # Auth pages (optional)
│   │   └── layout.tsx      # Auth wrapper
│   └── layout.tsx          # Root layout
├── components/
│   ├── app-sidebar.tsx     # Sidebar navigation
│   └── providers.tsx       # App providers
├── config/
│   └── menu.ts            # Menu configuration
└── ...
```

---

## Complete Setup Guide (Method 1 - Direct Usage)

### Prerequisites

Ensure your project has:
- **Next.js 15+** with App Router
- **React 19+**
- **Tailwind CSS v4**

### Step-by-Step Setup

#### 1. Install ShadPanel

```bash
npm install shadpanel
```

#### 2. Configure Tailwind CSS v4 (if not already done)

Install Tailwind:
```bash
npm install -D tailwindcss @tailwindcss/postcss
```

Create `postcss.config.mjs`:
```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
```

#### 3. Import Styles

In `app/layout.tsx`:
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

#### 4. Start Using Components

Create a page (`app/page.tsx`):
```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from 'shadpanel'

export default function Home() {
  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to ShadPanel</CardTitle>
        </CardHeader>
        <CardContent>
          <Button>Get Started</Button>
        </CardContent>
      </Card>
    </div>
  )
}
```

---

## Available Imports

### All Components (Single Import)
```tsx
import { Button, Card, Form, DataTable } from 'shadpanel'
```

### Component-Specific Import (if needed)
```tsx
import { Button } from 'shadpanel/components'
```

### Styles Import
```tsx
import 'shadpanel/styles/globals.css'
```

---

## Common Patterns

### Form with Validation
```tsx
'use client'

import { Form, TextInput, Button } from 'shadpanel'

export default function MyForm() {
  return (
    <Form
      initialValues={{ email: '', password: '' }}
      onSubmit={(values) => {
        // Handle submission
        console.log(values)
      }}
    >
      <TextInput
        accessor="email"
        label="Email"
        type="email"
        required
      />
      <TextInput
        accessor="password"
        label="Password"
        type="password"
        required
      />
      <Button type="submit">Login</Button>
    </Form>
  )
}
```

### Data Table with Actions
```tsx
import { DataTable, TextColumn, ActionsColumn, Action } from 'shadpanel'
import { Edit, Trash } from 'lucide-react'

export default function UsersTable({ users }) {
  return (
    <DataTable data={users}>
      <TextColumn accessor="name" header="Name" sortable searchable />
      <TextColumn accessor="email" header="Email" searchable />
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

### Sidebar Layout
```tsx
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarTrigger,
} from 'shadpanel'

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          {/* Your navigation */}
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header>
          <SidebarTrigger />
        </header>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

---

## TypeScript Support

Full type definitions included:

```tsx
import type { ButtonProps, FormProps, DataTableProps } from 'shadpanel'

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />
}
```

---

## Troubleshooting

### Styles not loading?
Make sure you imported the CSS:
```tsx
import 'shadpanel/styles/globals.css'
```

### Components not found?
Verify installation:
```bash
npm list shadpanel
```

### Tailwind classes not working?
Ensure you have Tailwind CSS v4 configured with PostCSS.

---

## Next Steps

- **[Quick Start Guide](./QUICK_START.md)** - 3-step setup
- **[Full Usage Examples](../DIRECT_USAGE.md)** - Comprehensive component examples
- **[GitHub](https://github.com/kristiansnts/shadpanel)** - Source code and issues

---

## Summary

| Method | Installation | Setup Time | Use Case |
|--------|-------------|------------|----------|
| **Direct Usage** | `npm install shadpanel` | 2 minutes | Existing projects, component library |
| **CLI Scaffolding** | `npx shadpanel init` | 5 minutes | New projects, full admin panels |

Both methods give you access to the same components. Choose based on your needs!
