"use client"

import { useEffect, useState } from "react"
import {
  DataTable,
  SelectColumn,
  ImageColumn,
  TextColumn,
  ActionsColumn,
  Action,
} from "@/components/ui/data-table"
import { Eye, Edit, Trash, Code2 } from "lucide-react"
import { User, UsersResponse } from "@/types/user"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/ui/form-builder"
import Link from "next/link"

export default function TableDemoPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true)
        const response = await fetch("https://dummyjson.com/users")

        if (!response.ok) {
          throw new Error("Failed to fetch users")
        }

        const data: UsersResponse = await response.json()
        setUsers(data.users)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleView = (user: User) => {
    console.log("View user:", user.id)
    alert(`View user: ${user.firstName} ${user.lastName}`)
  }

  const handleEdit = (user: User) => {
    console.log("Edit user:", user.id)
    alert(`Edit user: ${user.firstName} ${user.lastName}`)
  }

  const handleDelete = (user: User) => {
    console.log("Delete user:", user.id)
    if (confirm(`Delete ${user.firstName} ${user.lastName}?`)) {
      alert("User deleted (demo)")
    }
  }

  const handleCopyEmail = (user: User) => {
    navigator.clipboard.writeText(user.email)
  }

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-sm text-muted-foreground">Loading users...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-destructive">Error</p>
          <p className="mt-2 text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-8 pb-4">
        <div>
          <h1 className="text-4xl font-bold">Table Builder Demo</h1>
          <p className="mt-2 text-muted-foreground">
            Manage and view all users in the system.
          </p>
        </div>
        <Link href="/admin/dashboard/users/create">
          <Button className="hover:cursor-pointer">
            Create User
          </Button>
        </Link>
      </div>
      <div className="px-8 pb-8">
        <DataTable data={users}>
          <SelectColumn />
          <ImageColumn
            accessor="image"
            header="Avatar"
            alt={(row) => `${(row as User).firstName} ${(row as User).lastName}`}
          />
          <TextColumn accessor="firstName" header="First Name" sortable searchable />
          <TextColumn accessor="lastName" header="Last Name" sortable searchable />
          <TextColumn accessor="email" header="Email" sortable searchable/>
          <TextColumn accessor="phone" header="Phone" searchable/>
          <TextColumn accessor="age" header="Age" sortable numeric />
          <TextColumn
            accessor="gender"
            header="Gender"
            filterable
            filterOptions={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ]}
          />
          <TextColumn accessor="company.name" header="Company" searchable/>
          <TextColumn accessor="company.title" header="Job Title" searchable/>
          <ActionsColumn>
            <Action icon={Eye} label="Copy email" onClick={(row) => handleCopyEmail(row as User)} />
            <Action separator label="" onClick={() => {}} />
            <Action icon={Eye} label="View details" onClick={(row) => handleView(row as User)} />
            <Action icon={Edit} label="Edit user" onClick={(row) => handleEdit(row as User)} />
            <Action separator label="" onClick={() => {}} />
            <Action
              icon={Trash}
              label="Delete user"
              onClick={(row) => handleDelete(row as User)}
              variant="destructive"
            />
          </ActionsColumn>
        </DataTable>

        {/* Usage Examples Section */}
        <div className="mt-8">
          <Section
            title="Usage Examples"
            description="How to use the Data Table Builder in your code"
          >
            <div className="space-y-6">
              {/* Basic Table Example */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Basic Table Setup</h3>
                </div>
                <pre className="text-sm overflow-auto bg-muted p-4 rounded-lg">
{`import {
  DataTable,
  TextColumn,
  ActionsColumn,
  Action,
} from "@/components/ui/data-table"
import { Eye, Edit, Trash } from "lucide-react"

export default function UsersTable() {
  const [users, setUsers] = useState([])

  // Fetch your data
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("/api/users")
      const data = await response.json()
      setUsers(data)
    }
    fetchUsers()
  }, [])

  return (
    <DataTable data={users}>
      <TextColumn accessor="name" header="Name" sortable />
      <TextColumn accessor="email" header="Email" searchable />
      <ActionsColumn>
        <Action
          icon={Eye}
          label="View"
          onClick={(row) => console.log(row)}
        />
      </ActionsColumn>
    </DataTable>
  )
}`}
                </pre>
              </Card>

              {/* Available Column Types */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Available Column Types</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">SelectColumn</h4>
                    <p className="text-xs text-muted-foreground">
                      Checkbox column for row selection with bulk actions
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">TextColumn</h4>
                    <p className="text-xs text-muted-foreground">
                      Display text data with sorting, searching, and filtering
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">ImageColumn</h4>
                    <p className="text-xs text-muted-foreground">
                      Display images with fallback avatars and alt text
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">ActionsColumn</h4>
                    <p className="text-xs text-muted-foreground">
                      Dropdown menu with actions for each row (edit, delete, etc.)
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">BadgeColumn</h4>
                    <p className="text-xs text-muted-foreground">
                      Display status badges with custom colors and variants
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">DateColumn</h4>
                    <p className="text-xs text-muted-foreground">
                      Format and display dates with custom formatting
                    </p>
                  </div>
                </div>
              </Card>

              {/* Column Features */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Column Features</h3>
                </div>
                <pre className="text-sm overflow-auto bg-muted p-4 rounded-lg">
{`// Sortable columns
<TextColumn
  accessor="name"
  header="Name"
  sortable
/>

// Searchable columns (adds to global search)
<TextColumn
  accessor="email"
  header="Email"
  searchable
/>

// Filterable columns with options
<TextColumn
  accessor="status"
  header="Status"
  filterable
  filterOptions={[
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ]}
/>

// Numeric sorting
<TextColumn
  accessor="age"
  header="Age"
  sortable
  numeric
/>

// Nested object access
<TextColumn
  accessor="company.name"
  header="Company"
  searchable
/>

// Image column with custom alt text
<ImageColumn
  accessor="avatar"
  header="Avatar"
  alt={(row) => \`\${row.firstName} \${row.lastName}\`}
/>`}
                </pre>
              </Card>

              {/* Actions Column Example */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Actions Column</h3>
                </div>
                <pre className="text-sm overflow-auto bg-muted p-4 rounded-lg">
{`import { Eye, Edit, Trash } from "lucide-react"

<ActionsColumn>
  {/* View action */}
  <Action
    icon={Eye}
    label="View details"
    onClick={(row) => handleView(row)}
  />

  {/* Edit action */}
  <Action
    icon={Edit}
    label="Edit"
    onClick={(row) => handleEdit(row)}
  />

  {/* Separator for visual grouping */}
  <Action separator label="" onClick={() => {}} />

  {/* Delete action with destructive variant */}
  <Action
    icon={Trash}
    label="Delete"
    onClick={(row) => handleDelete(row)}
    variant="destructive"
  />
</ActionsColumn>`}
                </pre>
              </Card>

              {/* Bulk Selection Example */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Bulk Selection & Actions</h3>
                </div>
                <pre className="text-sm overflow-auto bg-muted p-4 rounded-lg">
{`// Enable row selection with SelectColumn
<DataTable data={users}>
  <SelectColumn />
  <TextColumn accessor="name" header="Name" />
  <TextColumn accessor="email" header="Email" />
  {/* Other columns */}
</DataTable>

// The table automatically provides:
// - Select all checkbox in header
// - Individual row checkboxes
// - Bulk action toolbar when rows are selected
// - Selection state management

// Access selected rows (internally handled):
// - selectedRows: Set of selected row IDs
// - clearSelection: Function to clear all selections
// - Bulk actions UI appears automatically`}
                </pre>
              </Card>

              {/* Advanced Features */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Advanced Features</h3>
                </div>
                <pre className="text-sm overflow-auto bg-muted p-4 rounded-lg">
{`// Custom cell rendering
<TextColumn
  accessor="status"
  header="Status"
  render={(value) => (
    <span className={value === 'active' ? 'text-green-500' : 'text-red-500'}>
      {value}
    </span>
  )}
/>

// Loading and error states
if (loading) {
  return <div>Loading...</div>
}

if (error) {
  return <div>Error: {error}</div>
}

// Empty state (automatic)
// The table shows "No data available" when data array is empty

// Pagination (built-in)
// Tables automatically paginate with 10 rows per page

// Global search (built-in)
// Searches across all columns marked with searchable

// Column visibility toggle (built-in)
// Users can show/hide columns via the column menu

// Data export (built-in)
// Export table data to CSV via the table toolbar`}
                </pre>
              </Card>

              {/* Complete Example */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Complete Example</h3>
                </div>
                <pre className="text-sm overflow-auto bg-muted p-4 rounded-lg">
{`"use client"

import { useEffect, useState } from "react"
import {
  DataTable,
  SelectColumn,
  ImageColumn,
  TextColumn,
  ActionsColumn,
  Action,
} from "@/components/ui/data-table"
import { Eye, Edit, Trash } from "lucide-react"

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products")
        const data = await response.json()
        setProducts(data)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Products</h1>

      <DataTable data={products}>
        <SelectColumn />

        <ImageColumn
          accessor="image"
          header="Image"
          alt={(row) => row.name}
        />

        <TextColumn
          accessor="name"
          header="Product Name"
          sortable
          searchable
        />

        <TextColumn
          accessor="category"
          header="Category"
          filterable
          filterOptions={[
            { label: "Electronics", value: "electronics" },
            { label: "Clothing", value: "clothing" },
          ]}
        />

        <TextColumn
          accessor="price"
          header="Price"
          sortable
          numeric
        />

        <TextColumn
          accessor="stock"
          header="Stock"
          sortable
          numeric
        />

        <ActionsColumn>
          <Action
            icon={Eye}
            label="View"
            onClick={(row) => console.log("View", row)}
          />
          <Action
            icon={Edit}
            label="Edit"
            onClick={(row) => console.log("Edit", row)}
          />
          <Action separator label="" onClick={() => {}} />
          <Action
            icon={Trash}
            label="Delete"
            onClick={(row) => console.log("Delete", row)}
            variant="destructive"
          />
        </ActionsColumn>
      </DataTable>
    </div>
  )
}`}
                </pre>
              </Card>
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}
