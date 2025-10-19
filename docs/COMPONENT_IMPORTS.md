# ShadPanel Component Import Guide

**Important:** Understanding how to import components correctly to avoid naming conflicts.

---

## Component Categories

ShadPanel exports components from three main categories:

1. **Base UI Components** (shadcn/ui primitives)
2. **Form Builder Components** (for use inside `<Form>`)
3. **Data Table Components** (for building tables)

---

## Import Rules

### ✅ Correct Imports

#### Using Form Builder Components

When using components **inside a `<Form>`**, use the `Form` prefix:

```tsx
import {
  Form,
  TextInput,
  FormSelect,     // ← Use FormSelect, not Select
  FormCheckbox,   // ← Use FormCheckbox, not Checkbox
  FormTextarea,   // ← Use FormTextarea, not Textarea
  FormTabs,       // ← Use FormTabs, not Tabs
  Button
} from "shadpanel"

export default function MyForm() {
  return (
    <Form initialValues={{ country: "" }} onSubmit={console.log}>
      <FormSelect
        accessor="country"
        label="Country"
        options={[
          { label: "USA", value: "us" },
          { label: "UK", value: "uk" },
        ]}
      />
      <Button type="submit">Submit</Button>
    </Form>
  )
}
```

#### Using Base UI Components

For standalone components (not in forms):

```tsx
import {
  Select,          // ← Base Select for controlled usage
  Checkbox,        // ← Base Checkbox
  Textarea,        // ← Base Textarea
  Tabs,            // ← Base Tabs
  Button
} from "shadpanel"

export default function MyComponent() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="us">USA</SelectItem>
      </SelectContent>
    </Select>
  )
}
```

---

## Component Naming Reference

| Use Case | Import Name | When to Use |
|----------|------------|-------------|
| **Form field** | `FormSelect` | Inside `<Form>` with `accessor` prop |
| **Standalone** | `Select` | Outside forms, manual state management |
| **Form field** | `FormCheckbox` | Inside `<Form>` with `accessor` prop |
| **Standalone** | `Checkbox` | Outside forms, manual state management |
| **Form field** | `FormTextarea` | Inside `<Form>` with `accessor` prop |
| **Standalone** | `Textarea` | Outside forms, manual state management |
| **Form field** | `FormTabs` | Tab layout inside `<Form>` |
| **Standalone** | `Tabs` | Tab layout outside forms |

---

## Common Errors & Solutions

### ❌ Error: Property 'accessor' does not exist

```tsx
// ❌ WRONG - Using base Select in Form
import { Form, Select } from "shadpanel"

<Form>
  <Select
    accessor="country"  // ← Error! Base Select doesn't have 'accessor'
    label="Country"
  />
</Form>
```

**Solution:** Use `FormSelect` instead:

```tsx
// ✅ CORRECT
import { Form, FormSelect } from "shadpanel"

<Form>
  <FormSelect
    accessor="country"  // ✅ Works!
    label="Country"
  />
</Form>
```

### ❌ Error: Type mismatch for Select props

This happens when you import the wrong Select variant.

**Wrong:**
```tsx
import { Select } from "shadpanel"

// Using inside Form - will fail
<Select accessor="field" options={[...]} />
```

**Right:**
```tsx
import { FormSelect } from "shadpanel"

// Using inside Form - works!
<FormSelect accessor="field" options={[...]} />
```

---

## Complete Import Examples

### Example 1: Form with All Field Types

```tsx
"use client"

import {
  Form,
  TextInput,
  FormSelect,
  FormCheckbox,
  FormTextarea,
  DatePicker,
  Toggle,
  Button,
  Section
} from "shadpanel"

export default function CompleteForm() {
  return (
    <Form
      initialValues={{
        name: "",
        email: "",
        country: "",
        terms: false,
        bio: "",
        birthdate: null,
        notifications: false,
      }}
      onSubmit={(values) => console.log(values)}
    >
      <Section title="Personal Information">
        <TextInput
          accessor="name"
          label="Full Name"
          required
        />

        <TextInput
          accessor="email"
          label="Email"
          type="email"
          required
        />

        <FormSelect
          accessor="country"
          label="Country"
          options={[
            { label: "United States", value: "us" },
            { label: "Canada", value: "ca" },
          ]}
        />

        <DatePicker
          accessor="birthdate"
          label="Date of Birth"
        />
      </Section>

      <Section title="Additional">
        <FormTextarea
          accessor="bio"
          label="Bio"
          rows={4}
        />

        <FormCheckbox
          accessor="terms"
          label="I agree to terms and conditions"
          required
        />

        <Toggle
          accessor="notifications"
          label="Enable email notifications"
        />
      </Section>

      <Button type="submit">Submit</Button>
    </Form>
  )
}
```

### Example 2: Data Table

```tsx
import {
  DataTable,
  TextColumn,
  ImageColumn,
  ActionsColumn,
  Action
} from "shadpanel"
import { Edit, Trash } from "lucide-react"

export default function UsersTable({ users }) {
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

### Example 3: Standalone UI Components

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "shadpanel"

export default function SettingsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Choose theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
          </SelectContent>
        </Select>

        <Button className="mt-4">Save Settings</Button>
      </CardContent>
    </Card>
  )
}
```

---

## Why the Name Difference?

The Form Builder components (with `Form` prefix) are designed to work with the `<Form>` component's state management system. They:

- Accept an `accessor` prop (field name in form state)
- Handle validation automatically
- Update form state on change
- Show error messages from form validation

The base UI components are lower-level primitives that:

- Require manual state management
- Don't have `accessor` prop
- Are used for custom implementations

---

## Quick Reference Table

| Category | Components |
|----------|-----------|
| **Form Inputs** | `TextInput`, `FormSelect`, `FormCheckbox`, `FormTextarea`, `Toggle`, `DatePicker`, `DateTimePicker`, `TagsInput`, `FileUpload`, `KeyValue`, `MarkdownEditor`, `RichEditor` |
| **Form Layout** | `Form`, `Section`, `Fieldset`, `Grid`, `Group`, `FormTabs`, `Placeholder` |
| **Data Table** | `DataTable`, `TextColumn`, `ImageColumn`, `SelectColumn`, `ActionsColumn`, `Action` |
| **Base UI** | `Button`, `Card`, `Input`, `Label`, `Select`, `Checkbox`, `Switch`, `Textarea`, `Tabs`, `Dialog`, `Dropdown`, `Popover`, `Tooltip`, `Separator`, `Skeleton`, `Badge`, `Alert` |
| **Layout** | `Sidebar`, `Sheet`, `Breadcrumb` |

---

## TypeScript Support

ShadPanel is fully typed. If you see a TypeScript error about missing props, you're likely using the wrong component variant:

```tsx
// TypeScript will error here
import { Select } from "shadpanel"
<Select accessor="field" />  // ❌ 'accessor' doesn't exist on Select

// TypeScript is happy here
import { FormSelect } from "shadpanel"
<FormSelect accessor="field" />  // ✅ Types match!
```

---

## Need Help?

- Check [INSTALLATION_TYPES.md](./INSTALLATION_TYPES.md) for installation options
- Check [CLI_UPDATES_SUMMARY.md](./CLI_UPDATES_SUMMARY.md) for CLI usage
- Open an issue at https://github.com/kristiansnts/shadpanel/issues

---

**Created**: 2025-10-18
**Version**: 0.1.0
