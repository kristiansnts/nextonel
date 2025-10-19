# Current Directory Installation

**Date**: 2025-10-18
**Feature**: Install components into existing projects using `.` (current directory)

---

## Overview

When you choose **"Components Only"** or **"Auth + Components"**, you can now install ShadPanel into your **existing project** by using `.` (dot) as the project name.

This is perfect for adding ShadPanel components to an existing Next.js application without creating a new directory.

---

## Usage

### Before (Problem)

```bash
cd my-existing-project
npx shadpanel init

✔ What do you want to install? › Components Only
? What is your project name? › .
✖ Directory "." already exists
```

**Issue**: CLI rejected `.` because validation prevented using existing directories.

### After (Solution)

```bash
cd my-existing-project
npx shadpanel init

✔ What do you want to install? › Components Only
✔ What is your project name? (use '.' for current directory) › .
✔ Which package manager? › pnpm
✔ Do you want TypeScript? › Yes
✔ Do you want authentication? › No
✔ Customize theme? › No
✔ Initialize git? › No

✨ Done! ShadPanel components are installed.

🚀 Get started:
  pnpm install
  Import components: import { Form, DataTable } from "shadpanel"
```

**Result**: Components installed directly into your existing project! ✅

---

## How It Works

### 1. Dynamic Prompt Message

The project name prompt changes based on installation type:

**Full Panel:**
```
? What is your project name? › my-admin-panel
```

**Components Only / Auth + Components:**
```
? What is your project name? (use '.' for current directory) › .
```

### 2. Smart Validation

```typescript
// Allow "." for components-only and auth-components
if (value === ".") {
  if (installationType === "components-only" || installationType === "auth-components") {
    return true  // ✅ Allow
  } else {
    return "Cannot install full panel in current directory"  // ❌ Reject
  }
}
```

### 3. Default Suggestions

- **Full Panel**: Suggests `my-admin-panel` (new directory)
- **Components Only**: Suggests `.` (current directory)
- **Auth + Components**: Suggests `.` (current directory)

### 4. Completion Message

When installing to current directory, the success message doesn't show `cd .`:

**New Directory:**
```
✨ Done! ShadPanel components are installed.

🚀 Get started:
  cd my-project          ← Shows cd
  pnpm install
```

**Current Directory:**
```
✨ Done! ShadPanel components are installed.

🚀 Get started:
  pnpm install           ← No cd shown
```

---

## Installation Type Behavior

### 1. Full Panel with Auth

**Allowed**: ❌ Must create new directory
**Reason**: Full panel creates complete app structure (conflicts with existing files)

```bash
✔ Installation Type: Full Panel
? Project name: .
✖ Cannot install full panel in current directory. Please specify a new directory name.
```

### 2. Auth + Components

**Allowed**: ✅ Can use current directory
**Reason**: Only adds auth files and components (less intrusive)

```bash
✔ Installation Type: Auth + Components
✔ Project name: .
✔ Installs to current directory ✅
```

### 3. Components Only

**Allowed**: ✅ Can use current directory
**Reason**: Only adds config files and package dependency (minimal changes)

```bash
✔ Installation Type: Components Only
✔ Project name: .
✔ Installs to current directory ✅
```

---

## What Gets Created

### Components Only (in current directory)

```
my-existing-project/     ← Your existing files remain
├── next.config.ts       ← Updated/created
├── package.json         ← Updated with shadpanel dependency
├── postcss.config.mjs   ← Created
├── tsconfig.json        ← Updated/created
└── .env.example         ← Created
```

**Note**: Your existing files are **not deleted** or modified (except config files that are updated).

### Auth + Components (in current directory)

```
my-existing-project/
├── app/
│   ├── admin/
│   │   ├── login/       ← Added
│   │   ├── signup/      ← Added
│   │   └── layout.tsx   ← Added
│   └── api/
│       └── auth/        ← Added
├── components/          ← Added
├── contexts/            ← Added
├── hooks/               ← Added
├── types/               ← Added
├── next.config.ts
├── package.json
└── .env.example
```

---

## Use Cases

### Use Case 1: Add Components to Existing App

You have an existing Next.js app and want to use ShadPanel's Form Builder and Data Table:

```bash
cd my-app
npx shadpanel init

# Choose: Components Only
# Project name: .
# Result: Components available via import
```

```tsx
import { Form, TextInput, DataTable } from "shadpanel"

// Use in your existing pages
```

### Use Case 2: Add Auth to Existing App

You have an app and want to add authentication:

```bash
cd my-app
npx shadpanel init

# Choose: Auth + Components
# Project name: .
# Result: Full auth system + components added
```

### Use Case 3: Create New Admin Panel

You want a complete admin panel from scratch:

```bash
npx shadpanel init

# Choose: Full Panel with Auth
# Project name: my-admin-panel (cannot use ".")
# Result: New directory with complete panel
```

---

## Code Changes

### 1. Updated Prompts ([cli/utils/prompts.ts](../cli/utils/prompts.ts))

**Dynamic prompt message:**
```typescript
message: (prev: any, answers: any) => {
  if (answers.installationType === "full-panel") {
    return "What is your project name?"
  } else {
    return "What is your project name? (use '.' for current directory)"
  }
}
```

**Dynamic initial value:**
```typescript
initial: (prev: any, answers: any) => {
  return answers.installationType === "full-panel" ? defaultProjectName : "."
}
```

**Smart validation:**
```typescript
validate: (value: string, answers: any) => {
  if (value === ".") {
    if (answers.installationType === "components-only" ||
        answers.installationType === "auth-components") {
      return true
    } else {
      return "Cannot install full panel in current directory"
    }
  }
  // ... existing validation
}
```

### 2. Updated Init Command ([cli/commands/init.ts](../cli/commands/init.ts))

**Handle current directory:**
```typescript
const targetDir = answers.projectName === "."
  ? process.cwd()
  : path.resolve(process.cwd(), answers.projectName)
```

**Project name for message:**
```typescript
const projectNameForMessage = answers.projectName === "."
  ? path.basename(process.cwd())
  : answers.projectName

logger.complete(
  projectNameForMessage,
  getDevCommand(answers.packageManager),
  answers.installationType,
  answers.projectName === "."  // isCurrentDir flag
)
```

### 3. Updated Logger ([cli/utils/logger.ts](../cli/utils/logger.ts))

**Conditional "cd" instruction:**
```typescript
complete: (projectName: string, packageManager: string, installationType?: string, isCurrentDir?: boolean) => {
  // ...
  if (!isCurrentDir) {
    console.log(chalk.cyan(`  cd ${projectName}`))
  }
  // ...
}
```

---

## Safety Features

✅ **Full Panel Protection**: Cannot install full panel in current directory (prevents conflicts)
✅ **Existing File Respect**: Config files are updated, but your code is safe
✅ **Clear Messaging**: Prompts clearly indicate current directory is an option
✅ **Smart Defaults**: Suggests `.` for components, new directory for full panel

---

## Examples

### Example 1: Minimal Component Installation

```bash
cd my-next-app
npx shadpanel init

# Selections:
✔ Installation Type: Components Only
✔ Project name: .
✔ Package manager: pnpm
✔ TypeScript: Yes
✔ Authentication: No
✔ Customize theme: No
✔ Initialize git: No

# Result:
✨ Done! ShadPanel components are installed.

🚀 Get started:
  pnpm install
  Import components: import { Form, DataTable } from "shadpanel"
```

### Example 2: Add Auth to Existing Project

```bash
cd my-existing-app
npx shadpanel init

# Selections:
✔ Installation Type: Auth + Components
✔ Project name: .
✔ Package manager: npm
✔ TypeScript: Yes
✔ Auth providers: Email/Password, Google OAuth
✔ Customize theme: No
✔ Initialize git: No

# Result:
✨ Done! Authentication and components are installed.

🚀 Get started:
  npm install
  Import components: import { Form, DataTable } from "shadpanel"

ℹ Don't forget to set up your authentication providers in .env
```

---

## Comparison

| Scenario | Before | After |
|----------|--------|-------|
| **Install to existing project** | ❌ Not possible | ✅ Use `.` |
| **Create new project** | ✅ Works | ✅ Still works |
| **Full panel to current dir** | ❌ Would cause conflicts | ❌ Prevented with clear error |
| **Components to current dir** | ❌ Not possible | ✅ Use `.` |
| **Completion message** | Shows `cd .` (confusing) | Smart (no `cd` if current dir) |

---

## Related Documentation

- [Installation Types](./INSTALLATION_TYPES.md) - All installation modes
- [CLI Updates Summary](./CLI_UPDATES_SUMMARY.md) - Complete changelog
- [Local Tarball Fix](./LOCAL_TARBALL_FIX.md) - Development installation

---

## Benefits

✅ **Flexible**: Install anywhere - new or existing projects
✅ **Safe**: Prevents full panel conflicts in existing dirs
✅ **Clear UX**: Obvious prompts and helpful defaults
✅ **Smart**: Adapts behavior based on installation type
✅ **Convenient**: No need to create new directory for simple installs

---

**Status**: ✅ IMPLEMENTED
**Version**: 0.1.0
**Date**: 2025-10-18
