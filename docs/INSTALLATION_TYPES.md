# Installation Types

**Date**: 2025-10-18
**Version**: 0.1.0
**Feature**: Multiple installation modes for different use cases

---

## Overview

ShadPanel CLI now supports **3 installation types** to accommodate different project needs:

1. **Full Panel with Auth** (Recommended for fresh Next.js installations)
2. **Auth + Components** (For existing projects needing authentication)
3. **Components Only** (For existing projects that only need UI components)

---

## Installation Types

### 1. Full Panel with Auth (Recommended)

**Best for**: Fresh Next.js projects or complete admin panel setups

**What gets installed**:
- ✅ Complete Next.js app structure
- ✅ Admin panel layout with sidebar
- ✅ NextAuth.js authentication system
- ✅ Login & signup pages
- ✅ Auth provider configuration
- ✅ All UI components (Form Builder, Data Table, etc.)
- ✅ Demo pages (optional)
- ✅ Environment configuration

**Project structure**:
```
my-admin-panel/
├── app/
│   ├── admin/
│   │   ├── dashboard/
│   │   │   ├── layout.tsx          # Dashboard with sidebar
│   │   │   ├── page.tsx             # Dashboard home
│   │   │   ├── form-demo/           # (Optional) Form demos
│   │   │   ├── table-demo/          # (Optional) Table demos
│   │   │   └── notification-demo/   # (Optional) Notification demos
│   │   ├── login/
│   │   │   └── page.tsx             # Login page
│   │   ├── signup/
│   │   │   └── page.tsx             # Signup page
│   │   └── layout.tsx               # Auth wrapper
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts         # NextAuth config
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Home page
│   └── globals.css                  # Styles
├── components/
│   ├── app-sidebar.tsx              # Sidebar navigation
│   ├── login-form.tsx               # Login form
│   ├── signup-form.tsx              # Signup form
│   └── providers.tsx                # Root providers
├── config/
│   └── menu.ts                      # Menu configuration
├── contexts/
│   ├── auth-providers-context.tsx   # Auth state
│   └── panel-context.tsx            # Panel state
├── hooks/
│   └── use-auth-providers.ts        # Auth hooks
├── types/
│   └── next-auth.d.ts               # NextAuth types
├── .env.example
├── .env
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

**Usage**:
```bash
npx shadpanel init
# Select: "Full Panel with Auth (Recommended for fresh Next.js installation)"
```

**After installation**:
```bash
cd my-admin-panel
npm install           # or pnpm install
# Configure .env file with your auth providers
npm run dev
```

---

### 2. Auth + Components

**Best for**: Existing Next.js projects that need authentication + UI components

**What gets installed**:
- ✅ NextAuth.js authentication system
- ✅ Login & signup pages
- ✅ Auth provider configuration
- ✅ Auth contexts and hooks
- ✅ All UI components (Form Builder, Data Table, etc.)
- ❌ No full admin panel structure
- ❌ No demo pages

**Project structure**:
```
my-project/
├── app/
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx             # Login page
│   │   ├── signup/
│   │   │   └── page.tsx             # Signup page
│   │   └── layout.tsx               # Auth wrapper (minimal)
│   └── api/
│       └── auth/
│           └── [...nextauth]/
│               └── route.ts         # NextAuth config
├── components/
│   ├── login-form.tsx               # Login form
│   ├── signup-form.tsx              # Signup form
│   └── providers.tsx                # Auth providers
├── contexts/
│   └── auth-providers-context.tsx   # Auth state
├── hooks/
│   └── use-auth-providers.ts        # Auth hooks
├── types/
│   └── next-auth.d.ts               # NextAuth types
├── .env.example
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

**Usage**:
```bash
cd my-existing-project
npx shadpanel init
# Select: "Auth + Components"
```

**After installation**:
```bash
npm install           # Install dependencies
# Configure .env file with your auth providers
```

**Import components in your code**:
```tsx
import { Form, TextInput, Button } from "shadpanel"
import { DataTable, TextColumn } from "shadpanel"
```

---

### 3. Components Only

**Best for**: Existing projects that only need UI components (no authentication)

**What gets installed**:
- ✅ All UI components (Form Builder, Data Table, etc.)
- ✅ Basic configuration files
- ❌ No authentication system
- ❌ No admin panel structure
- ❌ No demo pages

**Project structure**:
```
my-project/
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

**Usage**:
```bash
cd my-existing-project
npx shadpanel init
# Select: "Components Only"
```

**After installation**:
```bash
npm install           # Install dependencies
```

**Import and use components**:
```tsx
// Form Builder
import { Form, TextInput, Select, Button } from "shadpanel"

export default function CreateUser() {
  return (
    <Form
      initialValues={{ name: "", email: "", role: "" }}
      onSubmit={(values) => console.log(values)}
    >
      <TextInput accessor="name" label="Name" required />
      <TextInput accessor="email" label="Email" type="email" required />
      <Select
        accessor="role"
        label="Role"
        options={[
          { value: "admin", label: "Admin" },
          { value: "user", label: "User" },
        ]}
      />
      <Button type="submit">Create User</Button>
    </Form>
  )
}
```

```tsx
// Data Table
import { DataTable, TextColumn, ActionsColumn, Action } from "shadpanel"
import { Edit, Trash } from "lucide-react"

export default function UsersTable({ users }) {
  return (
    <DataTable data={users}>
      <TextColumn accessor="name" header="Name" sortable searchable />
      <TextColumn accessor="email" header="Email" searchable />
      <TextColumn accessor="role" header="Role" />
      <ActionsColumn>
        <Action icon={Edit} label="Edit" onClick={(row) => edit(row)} />
        <Action icon={Trash} label="Delete" onClick={(row) => remove(row)} />
      </ActionsColumn>
    </DataTable>
  )
}
```

---

## CLI Flow

### Full Panel with Auth

```
✓ What do you want to install? › Full Panel with Auth (Recommended)
✓ What is your project name? › my-admin-panel
✓ Which package manager? › pnpm
✓ Do you want to use TypeScript? › Yes
✓ Which authentication providers? › Email/Password, Google OAuth, GitHub OAuth
✓ Do you want to include demo pages? › Yes
✓ Which demos? › Form Builder, Data Table, Notification
✓ Do you want to customize the theme? › No
✓ Initialize a git repository? › Yes
```

**Installation steps**:
1. Creating project structure
2. Copying base template files
3. Setting up configuration
4. Adding authentication system
5. Adding demo pages
6. Creating environment file
7. Updating dependencies
8. Installing dependencies
9. Initializing git repository

### Auth + Components

```
✓ What do you want to install? › Auth + Components
✓ What is your project name? › my-project
✓ Which package manager? › npm
✓ Do you want to use TypeScript? › Yes
✓ Which authentication providers? › Email/Password, Google OAuth
✓ Do you want to customize the theme? › No
✓ Initialize a git repository? › No
```

**Installation steps**:
1. Creating project structure
2. Setting up configuration
3. Adding authentication system
4. Creating environment file
5. Updating dependencies
6. Installing dependencies

### Components Only

```
✓ What do you want to install? › Components Only
✓ What is your project name? › my-project
✓ Which package manager? › pnpm
✓ Do you want to use TypeScript? › Yes
✓ Do you want to include authentication? › No
✓ Do you want to customize the theme? › No
✓ Initialize a git repository? › No
```

**Installation steps**:
1. Creating project structure
2. Setting up configuration
3. Creating environment file
4. Updating dependencies
5. Installing dependencies

---

## Comparison Table

| Feature | Full Panel | Auth + Components | Components Only |
|---------|-----------|-------------------|----------------|
| **Admin Panel Layout** | ✅ | ❌ | ❌ |
| **Sidebar Navigation** | ✅ | ❌ | ❌ |
| **Authentication** | ✅ | ✅ | Optional |
| **Login/Signup Pages** | ✅ | ✅ | ❌ |
| **Auth Providers Config** | ✅ | ✅ | ❌ |
| **Demo Pages** | Optional | ❌ | ❌ |
| **UI Components** | ✅ | ✅ | ✅ |
| **Form Builder** | ✅ | ✅ | ✅ |
| **Data Table** | ✅ | ✅ | ✅ |
| **Notification System** | ✅ | ✅ | ✅ |
| **Config Files** | ✅ | ✅ | ✅ |
| **Best For** | New projects | Existing projects needing auth | Existing projects |

---

## Implementation Details

### Code Changes

#### 1. Updated Prompts ([cli/utils/prompts.ts](../cli/utils/prompts.ts))

Added `installationType` field to `InitAnswers`:
```typescript
export type InstallationType = "full-panel" | "auth-components" | "components-only"

export interface InitAnswers {
  installationType: InstallationType
  // ... other fields
}
```

Added installation type selection as the first prompt:
```typescript
{
  type: "select",
  name: "installationType",
  message: "What do you want to install?",
  choices: [
    {
      title: "Full Panel with Auth (Recommended for fresh Next.js installation)",
      value: "full-panel",
    },
    {
      title: "Auth + Components",
      value: "auth-components",
    },
    {
      title: "Components Only",
      value: "components-only",
    },
  ],
}
```

#### 2. Conditional Template Copying ([cli/commands/init.ts](../cli/commands/init.ts))

```typescript
// Only copy base template for full-panel
if (answers.installationType === "full-panel") {
  await copyBaseTemplate(templatesDir, targetDir, variables)
}

// Only copy demos for full-panel
if (answers.installationType === "full-panel" && answers.demos) {
  await copyDemoTemplate(templatesDir, targetDir, variables)
}
```

#### 3. Updated Completion Messages ([cli/utils/logger.ts](../cli/utils/logger.ts))

Different success messages based on installation type:
```typescript
if (installationType === "full-panel") {
  console.log("✨ Done! Your ShadPanel admin panel is ready.")
} else if (installationType === "auth-components") {
  console.log("✨ Done! Authentication and components are installed.")
} else if (installationType === "components-only") {
  console.log("✨ Done! ShadPanel components are installed.")
}
```

---

## Testing

### Test All Three Installation Types

**Test 1: Full Panel**
```bash
cd /tmp
node /path/to/shadpanel/dist/cli.js init test-full-panel
# Select: Full Panel with Auth
# Verify: Complete project structure created
```

**Test 2: Auth + Components**
```bash
cd /tmp
node /path/to/shadpanel/dist/cli.js init test-auth-components
# Select: Auth + Components
# Verify: Auth files + components, no full panel structure
```

**Test 3: Components Only**
```bash
cd /tmp
node /path/to/shadpanel/dist/cli.js init test-components-only
# Select: Components Only
# Verify: Only config files, no auth, no panel
```

---

## Benefits

✅ **Flexible Installation**: Choose only what you need
✅ **Better UX**: Clear options for different use cases
✅ **Reduced Bloat**: Don't install unnecessary files
✅ **Easier Migration**: Add to existing projects without full panel
✅ **Clear Intent**: User knows exactly what they're getting

---

## Future Enhancements

- Add `npx shadpanel add auth` to add authentication to existing installations
- Add `npx shadpanel add panel` to upgrade to full panel
- Add `npx shadpanel add demo` to add demo pages later
- Support partial installations (e.g., only Form Builder, only Data Table)

---

## Related Files

- [cli/utils/prompts.ts](../cli/utils/prompts.ts) - Installation type prompts
- [cli/commands/init.ts](../cli/commands/init.ts) - Conditional template copying
- [cli/utils/logger.ts](../cli/utils/logger.ts) - Completion messages
- [docs/LOCAL_TARBALL_FIX.md](./LOCAL_TARBALL_FIX.md) - Local installation fix

---

**Created**: 2025-10-18
**Status**: ✅ IMPLEMENTED
**Version**: 0.1.0
