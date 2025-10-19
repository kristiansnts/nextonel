"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  DataTable,
  SelectColumn,
  TextColumn,
  ImageColumn,
  ActionsColumn,
} from "shadpanel/components"
import { Button } from "shadpanel/components"
import { Plus } from "lucide-react"
import { User, UsersResponse } from "@/types/user"
import { toast } from "sonner"

export default function TableDemoPage() {
  const router = useRouter()
  const [data, setData] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const response = await fetch("https://dummyjson.com/users")
        if (!response.ok) {
          throw new Error("Failed to fetch users")
        }
        const result: UsersResponse = await response.json()
        setData(result.users)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        toast.error("Failed to load users")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleView = (user: User) => {
    toast.info(`Viewing user: ${user.firstName} ${user.lastName}`)
    console.log("View user:", user)
  }

  const handleEdit = (user: User) => {
    toast.info(`Editing user: ${user.firstName} ${user.lastName}`)
    console.log("Edit user:", user)
  }

  const handleDelete = (user: User) => {
    toast.error(`Deleting user: ${user.firstName} ${user.lastName}`)
    setData((prevData) => prevData.filter((u) => u.id !== user.id))
  }

  if (loading) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-8 pb-4">
          <div>
            <h1 className="text-4xl font-bold">Table Builder Demo</h1>
            <p className="mt-2 text-muted-foreground">
              Loading user data...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-8 pb-4">
          <div>
            <h1 className="text-4xl font-bold">Table Builder Demo</h1>
            <p className="mt-2 text-destructive">
              Error: {error}
            </p>
          </div>
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
            Example table built with ShadPanel Table Builder
          </p>
        </div>
        <Button onClick={() => router.push("/admin/dashboard/table-demo/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Create User
        </Button>
      </div>

      <div className="px-8 pb-8">
        <DataTable
          data={data}
          searchable
          searchAccessor="firstName"
          searchPlaceholder="Search users..."
        >
          <SelectColumn />

          <ImageColumn
            accessor="image"
            header="Avatar"
            fallback={(row) => `${row.firstName[0]}${row.lastName[0]}`}
          />

          <TextColumn
            accessor="firstName"
            header="First Name"
            sortable
          />

          <TextColumn
            accessor="lastName"
            header="Last Name"
            sortable
          />

          <TextColumn
            accessor="email"
            header="Email"
          />

          <TextColumn
            accessor="phone"
            header="Phone"
          />

          <TextColumn
            accessor={(row) => row.company.title}
            header="Job Title"
          />

          <TextColumn
            accessor="age"
            header="Age"
            sortable
          />

          <ActionsColumn
            actions={[
              {
                label: "View",
                onClick: handleView,
              },
              {
                label: "Edit",
                onClick: handleEdit,
              },
              {
                label: "Delete",
                onClick: handleDelete,
                variant: "destructive",
              },
            ]}
          />
        </DataTable>
      </div>
    </div>
  )
}
