"use client"

import { useRouter } from "next/navigation"
import {
  Form,
  TextInput,
  Select,
  Section,
} from "shadpanel/components"
import { Button } from "shadpanel/components"
import { toast } from "sonner"

export default function CreateUserPage() {
  const router = useRouter()

  const handleSubmit = (values: Record<string, unknown>) => {
    console.log("Creating user:", values)
    toast.success("User created successfully!")

    // Redirect back to table after creation
    setTimeout(() => {
      router.push("/admin/dashboard/table-demo")
    }, 1000)
  }

  const handleCancel = () => {
    router.push("/admin/dashboard/table-demo")
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-8 pb-4">
        <div>
          <h1 className="text-4xl font-bold">Create New User</h1>
          <p className="mt-2 text-muted-foreground">
            Add a new user to the system
          </p>
        </div>
      </div>

      <div className="px-8 pb-8">
        <Form
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            role: "",
          }}
          onSubmit={handleSubmit}
          className="space-y-6 max-w-2xl"
        >
          <Section
            title="User Information"
            description="Enter the user's personal details"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <TextInput
                accessor="firstName"
                label="First Name"
                placeholder="John"
                required
              />

              <TextInput
                accessor="lastName"
                label="Last Name"
                placeholder="Doe"
                required
              />
            </div>

            <TextInput
              accessor="email"
              label="Email Address"
              type="email"
              placeholder="john.doe@example.com"
              required
            />

            <TextInput
              accessor="phone"
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 000-0000"
            />

            <Select
              accessor="role"
              label="Role"
              placeholder="Select a role"
              required
              options={[
                { label: "Administrator", value: "admin" },
                { label: "Manager", value: "manager" },
                { label: "User", value: "user" },
                { label: "Guest", value: "guest" },
              ]}
            />
          </Section>

          <div className="flex gap-4">
            <Button type="submit">Create User</Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
