# ShadPanel

> Next.js Admin Panel CLI - Create complete admin panels instantly

**ShadPanel** is a CLI tool that scaffolds complete Next.js admin panels with authentication, form builders, data tables, and 50+ UI components based on [shadcn/ui](https://ui.shadcn.com).

## Quick Start

Create a new admin panel in seconds:

```bash
npx shadpanel init
```

This will:
- ✅ Set up complete Next.js 15 project structure
- ✅ Configure Tailwind CSS v4 and TypeScript
- ✅ Add NextAuth.js authentication with OAuth providers
- ✅ Include Form Builder with validation
- ✅ Add Data Table with sorting, filtering, and pagination
- ✅ Set up responsive sidebar navigation
- ✅ Include 50+ pre-configured UI components
- ✅ Add demo pages and examples

## Features

- 🎨 **50+ UI Components** - Complete shadcn/ui component library
- 📝 **Form Builder** - Filament-inspired declarative forms with validation
- 📊 **Data Table** - Powerful tables with sorting, searching, and pagination
- 🔐 **Authentication** - NextAuth.js with Google, GitHub, and credentials
- 🎯 **TypeScript First** - Full type safety and IntelliSense support
- 🌙 **Dark Mode Ready** - Built-in theme support
- 📱 **Responsive** - Mobile-friendly sidebar and layouts
- ⚡ **Zero Config** - Works out of the box

## Usage

### Interactive Setup

```bash
npx shadpanel init
```

The CLI will prompt you for:
- Project directory
- Authentication providers (Google, GitHub, Credentials)
- Component selection
- Configuration options

### Example Project Structure

After running `npx shadpanel init`, you'll get:

```
your-project/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── admin/
│   │   ├── layout.tsx          # Admin auth wrapper
│   │   ├── login/page.tsx      # Login page
│   │   ├── dashboard/page.tsx  # Dashboard
│   │   └── auth-config/        # Auth settings
│   └── api/
│       └── auth/[...nextauth]/ # NextAuth API
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── app-sidebar.tsx         # Sidebar navigation
│   ├── login-form.tsx          # Login component
│   └── auth-provider-config.tsx
├── hooks/
│   └── use-auth-providers.ts   # Auth state management
├── contexts/
│   └── auth-providers-context.tsx
└── lib/
    └── utils.ts                # Utilities
```

## What You Get

### Form Builder Example

```tsx
'use client'

import { Form, TextInput, FormSelect, Button } from '@/components/ui/form-builder'

export default function UserForm() {
  return (
    <Form
      initialValues={{ name: '', email: '', role: 'user' }}
      onSubmit={(values) => console.log(values)}
    >
      <TextInput accessor="name" label="Name" required />
      <TextInput accessor="email" label="Email" type="email" required />
      <FormSelect
        accessor="role"
        label="Role"
        options={[
          { label: 'User', value: 'user' },
          { label: 'Admin', value: 'admin' },
        ]}
      />
      <Button type="submit">Submit</Button>
    </Form>
  )
}
```

### Data Table Example

```tsx
import { DataTable, TextColumn, ActionsColumn, Action } from '@/components/ui/data-table'
import { Edit, Trash } from 'lucide-react'

export default function UsersTable({ users }) {
  return (
    <DataTable data={users}>
      <TextColumn accessor="name" header="Name" sortable searchable />
      <TextColumn accessor="email" header="Email" searchable />
      <TextColumn accessor="role" header="Role" sortable />
      <ActionsColumn>
        <Action icon={Edit} label="Edit" onClick={(row) => handleEdit(row)} />
        <Action icon={Trash} label="Delete" onClick={(row) => handleDelete(row)} />
      </ActionsColumn>
    </DataTable>
  )
}
```

### Authentication Example

```tsx
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function AuthButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div>
        <p>Welcome, {session.user?.email}</p>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </div>
    )
  }

  return <Button onClick={() => signIn()}>Sign In</Button>
}
```

## Available Components

### UI Components
`Button`, `Badge`, `Card`, `Input`, `Label`, `Select`, `Checkbox`, `Switch`, `Textarea`, `Dialog`, `DropdownMenu`, `Popover`, `Tooltip`, `Table`, `Tabs`, `Separator`, `Skeleton`, `Alert`, `Breadcrumb`, `Calendar`, `Sheet`, `Sidebar`

### Form Builder
**Fields**: `TextInput`, `FormTextarea`, `FormCheckbox`, `Toggle`, `FormSelect`, `TagsInput`, `DatePicker`, `DateTimePicker`, `FileUpload`, `KeyValue`, `MarkdownEditor`, `RichEditor`

**Layout**: `Form`, `Grid`, `Section`, `Fieldset`, `FormTabs`, `Group`, `Placeholder`

### Data Table
`DataTable`, `TextColumn`, `ImageColumn`, `SelectColumn`, `ActionsColumn`, `Action`

### Utilities
`cn` (classnames utility), `useIsMobile` (responsive hook), `Toaster` (notifications)

## Requirements

- **Node.js** 18.0.0 or higher
- **Next.js** 15.0.0 or higher
- **React** 18.0.0 or 19.0.0
- **Tailwind CSS** v4

## Environment Variables

After installation, create a `.env.local` file:

```bash
# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth (optional)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# App Config
NEXT_APP_NAME="My Admin Panel"
```

Generate a secret key:
```bash
openssl rand -base64 32
```

## Development

After installation, run:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see your admin panel.

## Tech Stack

- [Next.js 15](https://nextjs.org) - React framework
- [React 19](https://react.dev) - UI library
- [Tailwind CSS v4](https://tailwindcss.com) - Styling
- [shadcn/ui](https://ui.shadcn.com) - Base components
- [Radix UI](https://www.radix-ui.com) - Headless components
- [TanStack Table](https://tanstack.com/table) - Data tables
- [NextAuth.js](https://next-auth.js.org) - Authentication
- [Sonner](https://sonner.emilkowal.ski) - Toast notifications

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE for details

## Author

**Kristian Santoso** ([@kristiansnts](https://github.com/kristiansnts))
- Email: epafroditus.kristian@gmail.com
- GitHub: https://github.com/kristiansnts/shadpanel

## Acknowledgments

Built with and inspired by:
- [shadcn/ui](https://ui.shadcn.com) by [@shadcn](https://twitter.com/shadcn)
- [Filament](https://filamentphp.com) for form builder inspiration
- The Next.js and React communities

---

**⭐ Star this repo if you find it useful!**

**📦 NPM Package**: [shadpanel](https://www.npmjs.com/package/shadpanel)
