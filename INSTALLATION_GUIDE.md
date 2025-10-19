# ShadPanel Local Installation Guide

This guide explains how to install and test the ShadPanel package locally using the generated tarball.

## Quick Start (TL;DR)

```bash
# 1. In an existing Next.js 15+ project
pnpm add ./shadpanel-0.1.0.tgz

# 2. Install required peer dependency
pnpm add sonner

# 3. (Optional) Install auth and theme features
pnpm add next-auth next-themes

# 4. Start using ShadPanel components!
```

---

## Package Information

**File:** `shadpanel-0.1.0.tgz`
**Size:** 2.4 MB
**Unpacked Size:** 13.2 MB
**Total Files:** 47

### Package Contents

- ✅ Compiled package code (CJS + ESM + TypeScript declarations)
- ✅ CLI executable (`dist/cli.js`)
- ✅ All template files (base, auth, demo, config)
- ✅ README.md
- ✅ Source maps for debugging

---

## Option 1: Test CLI Only (npx)

### 1. Copy the tarball to your test location

```bash
# Copy the tarball to anywhere you want
cp /Users/rpay/Documents/nextonel/shadpanel-0.1.0.tgz ~/Desktop/
cd ~/Desktop
```

### 2. Use npx to run the CLI directly from tarball

```bash
# Run init command
npx shadpanel-0.1.0.tgz init my-test-project

# Or specify full path
npx /path/to/shadpanel-0.1.0.tgz init my-test-project
```

This will:
- Extract the package temporarily
- Run the CLI
- Create your new project with all prompts

---

## Option 2: Install in Existing Next.js Project

### 1. Create or navigate to your Next.js project

**Important:** ShadPanel requires Next.js 15+ with React 18/19. Create a new Next.js project first:

```bash
# Create new Next.js 15 project with all required dependencies
npx create-next-app@latest my-nextjs-app --typescript --tailwind --app --use-pnpm

# Navigate to project
cd my-nextjs-app
```

Or use an existing Next.js 15+ project:

```bash
# Use existing project (must have Next.js 15+)
cd /path/to/your/nextjs-project

# Verify Next.js version
npm list next
# Should show: next@15.x.x or higher
```

### 2. Install ShadPanel from tarball

```bash
# Copy tarball to your project (or use full path)
cp /Users/rpay/Documents/nextonel/shadpanel-0.1.0.tgz .

# Install with npm
npm install ./shadpanel-0.1.0.tgz

# Or with pnpm
pnpm add ./shadpanel-0.1.0.tgz

# Or with yarn
yarn add ./shadpanel-0.1.0.tgz
```

### 3. Install peer dependencies

Since you already have a Next.js project, you already have `next`, `react`, and `react-dom` installed. You only need to install the additional peer dependencies:

```bash
# Required: Install Sonner for toast notifications
npm install sonner

# Optional: Install based on features you need
npm install next-auth      # If using authentication features
npm install next-themes    # If using theme switching features

# Or install all optional dependencies at once:
npm install sonner next-auth next-themes
```

**With pnpm:**
```bash
pnpm add sonner next-auth next-themes
```

**With yarn:**
```bash
yarn add sonner next-auth next-themes
```

**Note:** If your Next.js project uses React 18, that's fine! ShadPanel supports both React 18 and React 19.

### 4. Verify installation

```bash
# Check package.json
cat package.json | grep shadpanel
# Should show: "shadpanel": "file:shadpanel-0.1.0.tgz"

# Check node_modules
ls node_modules/shadpanel

# Test CLI command
npx shadpanel --version
# Should output: 0.1.0

# Verify peer dependencies are installed
npm list sonner next-auth next-themes
```

### 5. Use ShadPanel components in your project

**Example 1: Using Form Builder**

Create `app/test-form/page.tsx`:

```tsx
"use client"

import { Form, TextInput, Section, Button } from "shadpanel/components"
import { toast } from "sonner"

export default function TestFormPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Form Builder Test</h1>

      <Form
        initialValues={{
          name: "",
          email: "",
        }}
        onSubmit={(values) => {
          console.log("Form submitted:", values)
          toast.success("Form submitted successfully!")
        }}
      >
        <Section title="User Information">
          <TextInput
            accessor="name"
            label="Name"
            placeholder="Enter your name"
            required
          />

          <TextInput
            accessor="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </Section>

        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}
```

**Example 2: Using Data Table**

Create `app/test-table/page.tsx`:

```tsx
"use client"

import { DataTable, TextColumn, ActionsColumn, Action } from "shadpanel/components"
import { Edit, Trash } from "lucide-react"

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
]

export default function TestTablePage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Data Table Test</h1>

      <DataTable data={users}>
        <TextColumn accessor="name" header="Name" sortable searchable />
        <TextColumn accessor="email" header="Email" searchable />
        <TextColumn accessor="role" header="Role" />
        <ActionsColumn>
          <Action
            icon={Edit}
            label="Edit"
            onClick={(row) => console.log("Edit:", row)}
          />
          <Action
            icon={Trash}
            label="Delete"
            onClick={(row) => console.log("Delete:", row)}
          />
        </ActionsColumn>
      </DataTable>
    </div>
  )
}
```

**Example 3: Using UI Components**

Create `app/test-ui/page.tsx`:

```tsx
import { Button, Card } from "shadpanel/components"

export default function TestUIPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">UI Components Test</h1>

      <div className="space-y-4">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Card Component</h2>
          <p className="mb-4">This is a card from ShadPanel.</p>
          <Button>Click Me</Button>
        </Card>

        <div className="flex gap-2">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>
    </div>
  )
}
```

### 5. Add required styles

Make sure your `app/globals.css` includes Tailwind:

```css
@import "tailwindcss";
```

Or if using the old syntax:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Option 3: Initialize New Project with CLI

### 1. Run the init command

```bash
# Navigate to where you want to create the project
cd ~/projects

# Run init (using full path to tarball)
npx /Users/rpay/Documents/nextonel/shadpanel-0.1.0.tgz init my-admin-panel
```

### 2. Follow the interactive prompts

```
┌─────────────────────────────────────────────────┐
│                                                 │
│   Welcome to ShadPanel CLI                      │
│   Admin Panels Built on shadcn/ui               │
│                                                 │
└─────────────────────────────────────────────────┘

? What is your project name? › my-admin-panel
? Which package manager do you want to use? › pnpm
? Do you want to use TypeScript? › Yes
? Do you want to include authentication (NextAuth.js)? › Yes
? Which authentication providers do you want? › Credentials, Google OAuth
? Do you want to include demo pages? › Yes
? Which demos do you want to include? › All
? Do you want to customize the theme? › No
? Initialize a git repository? › Yes
? What is your application name? › My Admin Panel
```

### 3. Start the development server

```bash
cd my-admin-panel
pnpm dev  # or npm run dev
```

### 4. Visit the application

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Testing Checklist

### ✅ CLI Tests

```bash
# Test version command
npx /path/to/shadpanel-0.1.0.tgz --version

# Test help command
npx /path/to/shadpanel-0.1.0.tgz --help

# Test init command
npx /path/to/shadpanel-0.1.0.tgz init test-project
```

### ✅ Component Tests

1. Install package in Next.js project
2. Import components from `shadpanel/components`
3. Test Form Builder
4. Test Data Table
5. Test UI components (Button, Card, etc.)
6. Verify TypeScript types work
7. Check hot reload works

### ✅ Template Tests

1. Run init with authentication
2. Run init with demo pages
3. Verify all files are created
4. Check .env file is created
5. Verify dependencies are installed
6. Test the generated project

---

## Troubleshooting

### Issue: "Cannot find module 'shadpanel'"

**Solution:** Make sure you installed the package:
```bash
npm install ./shadpanel-0.1.0.tgz
```

### Issue: "npx command not found"

**Solution:** Make sure you have Node.js and npm installed:
```bash
node --version
npm --version
```

### Issue: CLI doesn't run

**Solution:** Use the full path to the tarball:
```bash
npx /Users/rpay/Documents/nextonel/shadpanel-0.1.0.tgz init
```

### Issue: TypeScript errors

**Solution:** Make sure your tsconfig.json includes:
```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Issue: Styles not working

**Solution:** Make sure you have Tailwind CSS configured:
```bash
npm install tailwindcss @tailwindcss/postcss
```

---

## Import Patterns

### Components

```typescript
// All components
import {
  Button,
  Card,
  Input,
  Label
} from "shadpanel/components"

// Form Builder
import {
  Form,
  TextInput,
  Section,
  Grid
} from "shadpanel/components"

// Data Table
import {
  DataTable,
  TextColumn,
  ActionsColumn
} from "shadpanel/components"
```

### Utilities

```typescript
// cn utility
import { cn } from "shadpanel"
```

### Toasts (Sonner)

```typescript
import { toast } from "sonner"

toast.success("Success!")
toast.error("Error!")
toast("Default message")
```

---

## Example Project Structure

After running `npx shadpanel init` with all options:

```
my-admin-panel/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── admin/
│   │   ├── layout.tsx                 # Auth wrapper
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── dashboard/
│   │       ├── layout.tsx             # Dashboard with sidebar
│   │       ├── page.tsx
│   │       ├── form-demo/page.tsx
│   │       ├── table-demo/
│   │       │   ├── page.tsx
│   │       │   └── create/page.tsx
│   │       └── notification-demo/page.tsx
│   └── api/
│       └── auth/[...nextauth]/route.ts
├── components/
│   ├── providers.tsx
│   ├── app-sidebar.tsx
│   ├── login-form.tsx
│   └── signup-form.tsx
├── config/
│   └── menu.ts
├── contexts/
│   ├── panel-context.tsx
│   └── auth-providers-context.tsx
├── hooks/
│   └── use-auth-providers.ts
├── types/
│   ├── user.ts
│   └── next-auth.d.ts
├── .env
├── .env.example
├── package.json
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs
```

---

## Next Steps

1. **Test the tarball** - Install it in a test project
2. **Try the CLI** - Run the init command
3. **Test components** - Import and use in your project
4. **Report issues** - If you find any bugs
5. **Provide feedback** - Suggest improvements

---

## Quick Start Commands

```bash
# Test CLI version
npx shadpanel-0.1.0.tgz --version

# Create new project
npx shadpanel-0.1.0.tgz init my-project

# Install in existing project
npm install ./shadpanel-0.1.0.tgz

# Import components
import { Button } from "shadpanel/components"
```

---

**Package Location:** `/Users/rpay/Documents/nextonel/shadpanel-0.1.0.tgz`

**Documentation:** See [docs/PHASE3_COMPLETE.md](docs/PHASE3_COMPLETE.md) for full CLI documentation.
