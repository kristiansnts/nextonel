# Quick Start - Using ShadPanel Without CLI

This guide shows the **fastest way** to start using ShadPanel components directly in your Next.js project.

## 3-Step Setup

### Step 1: Install ShadPanel

```bash
npm install shadpanel
```

### Step 2: Import Styles

Add this single line to your root layout (`app/layout.tsx`):

```tsx
import 'shadpanel/styles/globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### Step 3: Use Components

```tsx
import { Button, Card, CardContent } from 'shadpanel'

export default function Page() {
  return (
    <Card>
      <CardContent>
        <Button>Hello ShadPanel!</Button>
      </CardContent>
    </Card>
  )
}
```

That's it! You're ready to use all ShadPanel components.

## What You Get

- ✅ **50+ UI Components** - All shadcn/ui components
- ✅ **Form Builder** - Create forms with validation
- ✅ **Data Table** - Sortable, searchable tables
- ✅ **Sidebar System** - Complete navigation layout
- ✅ **Dark Mode Ready** - Built-in theme support
- ✅ **TypeScript** - Full type definitions
- ✅ **Zero Config** - Works out of the box

## Common Use Cases

### Simple Form

```tsx
'use client'

import { Form, TextInput, Button } from 'shadpanel'

export default function ContactForm() {
  return (
    <Form
      initialValues={{ name: '', email: '', message: '' }}
      onSubmit={(values) => console.log(values)}
    >
      <TextInput accessor="name" label="Name" required />
      <TextInput accessor="email" label="Email" type="email" required />
      <TextInput accessor="message" label="Message" required />
      <Button type="submit">Send</Button>
    </Form>
  )
}
```

### Data Table

```tsx
import { DataTable, TextColumn } from 'shadpanel'

export default function UsersTable({ users }) {
  return (
    <DataTable data={users}>
      <TextColumn accessor="name" header="Name" sortable searchable />
      <TextColumn accessor="email" header="Email" searchable />
      <TextColumn accessor="role" header="Role" sortable />
    </DataTable>
  )
}
```

### Dashboard Card

```tsx
import { Card, CardHeader, CardTitle, CardContent } from 'shadpanel'

export default function StatsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Users</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">1,234</p>
      </CardContent>
    </Card>
  )
}
```

## Prerequisites

Make sure you have:

- **Next.js 15+** (App Router)
- **React 19+**
- **Tailwind CSS v4**

If you don't have Tailwind CSS v4 configured:

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

## More Examples

See [DIRECT_USAGE.md](../DIRECT_USAGE.md) for comprehensive examples including:
- Advanced forms with validation
- Complex data tables with actions
- Sidebar layouts
- Form layouts (Grid, Section, Fieldset)
- Custom theming

## Want a Full Admin Panel?

If you need a complete admin panel with authentication, use the CLI:

```bash
npx shadpanel init
```

This scaffolds a full project with:
- Complete folder structure
- NextAuth.js authentication (optional)
- Demo pages
- Pre-configured sidebar
- Dark mode toggle

## Documentation

- **Full Documentation**: [DIRECT_USAGE.md](../DIRECT_USAGE.md)
- **Package Strategy**: [PACKAGE.md](../PACKAGE.md)
- **GitHub**: https://github.com/kristiansnts/shadpanel

## Support

Questions or issues? Open an issue on GitHub or email epafroditus.kristian@gmail.com
