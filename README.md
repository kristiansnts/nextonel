# ShadPanel

> Next.js Admin Panel Toolkit with Form Builder, Data Table, and Authentication

**ShadPanel** is a comprehensive admin panel toolkit built on top of [shadcn/ui](https://ui.shadcn.com) for Next.js 15+ applications. It provides a complete set of components, a powerful Form Builder, Data Table system, and optional authentication.

## Features

- 🎨 **50+ UI Components** - Complete shadcn/ui component library
- 📝 **Form Builder** - Filament-inspired declarative forms with validation
- 📊 **Data Table** - Powerful tables with sorting, searching, and pagination
- 🎯 **TypeScript First** - Full type safety and IntelliSense support
- 🌙 **Dark Mode Ready** - Built-in theme support
- 📱 **Responsive** - Mobile-friendly sidebar and layouts
- 🔐 **Authentication** - Optional NextAuth.js integration
- ⚡ **Zero Config** - Works out of the box

## Installation

### Option 1: Direct Usage (Recommended for existing projects)

Install the package and start using components immediately:

```bash
npm install shadpanel
# or
pnpm install shadpanel
```

Import styles in your root layout:

```tsx
import 'shadpanel/styles/globals.css'
```

Start using components:

```tsx
import { Button, Card, Form, DataTable } from 'shadpanel'

export default function MyPage() {
  return (
    <Card>
      <Button>Hello ShadPanel!</Button>
    </Card>
  )
}
```

**📖 [Quick Start Guide](./docs/QUICK_START.md)** | **📚 [Full Usage Examples](./DIRECT_USAGE.md)**

### Option 2: Full Project Scaffolding

Create a complete admin panel with authentication and demo pages:

```bash
npx shadpanel init
```

This will:
- ✅ Set up complete project structure
- ✅ Configure Tailwind CSS and TypeScript
- ✅ Add NextAuth.js authentication (optional)
- ✅ Include demo pages and examples
- ✅ Set up sidebar navigation

## Quick Examples

### Form Builder

```tsx
'use client'

import { Form, TextInput, FormSelect, Button } from 'shadpanel'

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

### Data Table

```tsx
import { DataTable, TextColumn, ActionsColumn, Action } from 'shadpanel'
import { Edit } from 'lucide-react'

export default function UsersTable({ users }) {
  return (
    <DataTable data={users}>
      <TextColumn accessor="name" header="Name" sortable searchable />
      <TextColumn accessor="email" header="Email" searchable />
      <TextColumn accessor="role" header="Role" sortable />
      <ActionsColumn>
        <Action icon={Edit} label="Edit" onClick={(row) => handleEdit(row)} />
      </ActionsColumn>
    </DataTable>
  )
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

## Documentation

- **[Quick Start Guide](./docs/QUICK_START.md)** - Get started in 3 steps
- **[Direct Usage Guide](./DIRECT_USAGE.md)** - Comprehensive usage examples
- **[Package Strategy](./PACKAGE.md)** - Development and architecture docs
- **[Installation Guide](./INSTALLATION_GUIDE.md)** - Detailed installation instructions

## Requirements

- **Next.js** 15.0.0 or higher
- **React** 18.0.0 or 19.0.0
- **Tailwind CSS** v4
- **TypeScript** (recommended)

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build package
pnpm build:package

# Build Next.js app
pnpm build
```

## Tech Stack

- [Next.js 15](https://nextjs.org) - React framework
- [React 19](https://react.dev) - UI library
- [Tailwind CSS v4](https://tailwindcss.com) - Styling
- [shadcn/ui](https://ui.shadcn.com) - Base components
- [Radix UI](https://www.radix-ui.com) - Headless components
- [TanStack Table](https://tanstack.com/table) - Data tables
- [NextAuth.js](https://next-auth.js.org) - Authentication (optional)
- [Sonner](https://sonner.emilkowal.ski) - Toast notifications

## Project Structure

```
shadpanel/
├── src/               # Package source code
│   ├── components/    # All UI components
│   ├── lib/          # Utilities
│   ├── hooks/        # React hooks
│   └── types/        # TypeScript types
├── styles/           # Importable CSS
├── templates/        # CLI scaffolding templates
├── cli/             # CLI tool source
└── dist/            # Built package (generated)
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](LICENSE) for details

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

**📦 Published on NPM**: [shadpanel](https://www.npmjs.com/package/shadpanel)
