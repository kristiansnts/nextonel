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
import { Eye, Edit, Trash } from "lucide-react"
import { User, UsersResponse } from "@/types/user"

export default function UsersPage() {
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
          <h1 className="text-4xl font-bold">Users</h1>
          <p className="mt-2 text-muted-foreground">
            Manage and view all users in the system.
          </p>
        </div>
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
      </div>
    </div>
  )
}
