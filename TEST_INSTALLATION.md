# Testing ShadPanel Installation

This guide helps you test that ShadPanel is working correctly after installation.

## Local Testing (Before Publishing)

### Option 1: Using npm pack

1. **Build and pack the package**:
```bash
pnpm run build:package
npm pack
```

This creates `shadpanel-0.1.0.tgz`

2. **Create a test Next.js project**:
```bash
npx create-next-app@latest test-shadpanel --typescript --tailwind --app
cd test-shadpanel
```

3. **Install the local package**:
```bash
npm install ../nextonel/shadpanel-0.1.0.tgz
```

4. **Configure Tailwind CSS v4**:

Update `postcss.config.mjs`:
```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
```

5. **Import ShadPanel styles**:

Edit `app/layout.tsx`:
```tsx
import 'shadpanel/styles/globals.css'
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Test ShadPanel",
  description: "Testing ShadPanel direct usage",
}

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

6. **Test components**:

Edit `app/page.tsx`:
```tsx
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from 'shadpanel'

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Testing ShadPanel</h1>

        <Card>
          <CardHeader>
            <CardTitle>UI Components Test</CardTitle>
            <CardDescription>
              Testing basic ShadPanel components
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>If you can see this card styled properly, the basic components work!</p>
            <div className="flex gap-2">
              <Button>Primary Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              All imports working correctly ✓
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
```

7. **Test Form Builder**:

Create `app/test-form/page.tsx`:
```tsx
'use client'

import { Form, TextInput, FormSelect, Toggle, Button } from 'shadpanel'
import { Card, CardHeader, CardTitle, CardContent } from 'shadpanel'

export default function TestFormPage() {
  return (
    <main className="min-h-screen p-24">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Form Builder Test</CardTitle>
        </CardHeader>
        <CardContent>
          <Form
            initialValues={{
              name: '',
              email: '',
              role: 'user',
              active: true,
            }}
            onSubmit={(values) => {
              console.log('Form submitted:', values)
              alert(JSON.stringify(values, null, 2))
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

            <Button type="submit">Submit Form</Button>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}
```

8. **Test Data Table**:

Create `app/test-table/page.tsx`:
```tsx
'use client'

import { DataTable, TextColumn, ActionsColumn, Action } from 'shadpanel'
import { Card, CardHeader, CardTitle, CardContent } from 'shadpanel'
import { Edit, Trash } from 'lucide-react'

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
]

export default function TestTablePage() {
  return (
    <main className="min-h-screen p-24">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Data Table Test</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable data={mockUsers}>
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
                onClick={(row) => alert(`Edit: ${row.name}`)}
              />
              <Action
                icon={Trash}
                label="Delete"
                onClick={(row) => alert(`Delete: ${row.name}`)}
              />
            </ActionsColumn>
          </DataTable>
        </CardContent>
      </Card>
    </main>
  )
}
```

9. **Run the test project**:
```bash
npm run dev
```

10. **Visit test pages**:
- http://localhost:3000 - Basic components
- http://localhost:3000/test-form - Form Builder
- http://localhost:3000/test-table - Data Table

---

## Checklist

After running the test project, verify:

- [ ] **Styles loaded**: Cards and buttons have proper styling
- [ ] **Dark mode works**: CSS variables properly defined
- [ ] **TypeScript**: No type errors, autocomplete works
- [ ] **Form Builder**: Form submits with correct values
- [ ] **Data Table**: Table displays, sorting/searching works
- [ ] **Icons**: Lucide icons render correctly
- [ ] **No console errors**: Check browser console

---

## Expected Results

### ✅ Success Indicators

1. **Components render** with proper styling
2. **TypeScript autocomplete** works when importing
3. **Forms validate** and submit correctly
4. **Tables** sort and filter properly
5. **No build errors**
6. **No runtime errors** in console

### ❌ Common Issues

#### Styles not loading
**Problem**: Components render but look unstyled

**Solution**:
```tsx
// Make sure you added this to app/layout.tsx
import 'shadpanel/styles/globals.css'
```

#### Module not found
**Problem**: `Cannot find module 'shadpanel'`

**Solution**:
```bash
# Verify installation
npm list shadpanel

# Reinstall if needed
npm install ../path/to/shadpanel-0.1.0.tgz
```

#### TypeScript errors
**Problem**: Type errors when importing components

**Solution**:
```bash
# Clear Next.js cache
rm -rf .next

# Restart TypeScript server in VS Code
# Cmd+Shift+P > TypeScript: Restart TS Server
```

#### Tailwind classes not working
**Problem**: Utility classes not applying

**Solution**: Verify `postcss.config.mjs` has `@tailwindcss/postcss` plugin

---

## After Publishing to NPM

Once published, test with:

```bash
npx create-next-app@latest test-shadpanel --typescript --tailwind --app
cd test-shadpanel
npm install shadpanel
```

Then follow steps 4-10 above.

---

## Automated Testing Script

Create `test-install.sh`:

```bash
#!/bin/bash

# Build package
echo "Building package..."
pnpm run build:package
npm pack

# Create test directory
echo "Creating test project..."
mkdir -p ../test-shadpanel
cd ../test-shadpanel

# Create Next.js app
npx create-next-app@latest . --typescript --tailwind --app --no-git

# Install local package
echo "Installing ShadPanel..."
npm install ../nextonel/shadpanel-0.1.0.tgz

# Test imports
echo "Testing imports..."
node -e "const shadpanel = require('shadpanel'); console.log('✓ CJS import works'); console.log('Exports:', Object.keys(shadpanel).slice(0, 10))"

echo "✓ Installation test complete!"
```

Run with:
```bash
chmod +x test-install.sh
./test-install.sh
```

---

## Conclusion

If all tests pass, your package is ready for:
1. **Local use** (via npm pack)
2. **Publishing to NPM**
3. **Distribution to users**

Users can then simply run:
```bash
npm install shadpanel
```

And use components immediately!
