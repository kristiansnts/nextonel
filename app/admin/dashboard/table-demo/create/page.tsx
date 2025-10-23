"use client"

import {
  Form,
  TextInput,
  FormSelect as Select,
  DatePicker,
  Section,
  Grid,
} from "@/components/ui/form-builder"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import {
  initialValues,
  validationRules,
  genderOptions,
} from "./form-validation"
import { useCreateUser } from "./hooks"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle } from "lucide-react"

export default function CreateUserPage() {
  const router = useRouter()
  const { isSubmitting, response, error, handleSubmit, resetResponse } = useCreateUser()

  const onSubmit = async (values: Record<string, unknown>) => {
    await handleSubmit(values)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-8 pb-4">
        <div>
          <h1 className="text-4xl font-bold">Create New User</h1>
          <p className="mt-2 text-muted-foreground">
            Add a new user using DummyJSON API
          </p>
        </div>
      </div>

      <div className="px-8 pb-8">
        <div className="max-w-4xl">
          <Form
            initialValues={initialValues}
            onSubmit={onSubmit}
            className="space-y-6"
          >
            <Section
              title="Basic Information"
              description="Required fields for user creation"
            >
              <Grid columns={{ sm: 1, md: 2 }} gap={4}>
                <TextInput
                  accessor="firstName"
                  label="First Name"
                  placeholder="John"
                  required
                  tooltip="User's first name"
                  validation={validationRules.firstName}
                />

                <TextInput
                  accessor="lastName"
                  label="Last Name"
                  placeholder="Doe"
                  required
                  tooltip="User's last name"
                  validation={validationRules.lastName}
                />

                <TextInput
                  accessor="age"
                  label="Age"
                  numeric
                  required
                  min={1}
                  max={150}
                  placeholder="25"
                  helperText="Must be between 1 and 150"
                  validation={validationRules.age}
                />

                <Select
                  accessor="gender"
                  label="Gender"
                  placeholder="Select gender"
                  options={genderOptions}
                />
              </Grid>
            </Section>

            <Section
              title="Contact Information"
              description="Optional contact details"
            >
              <Grid columns={{ sm: 1, md: 2 }} gap={4}>
                <TextInput
                  accessor="email"
                  label="Email"
                  type="email"
                  placeholder="john.doe@example.com"
                  validation={validationRules.email}
                />

                <TextInput
                  accessor="phone"
                  label="Phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  validation={validationRules.phone}
                />

                <DatePicker
                  accessor="birthDate"
                  label="Birth Date"
                  native={false}
                  maxDate={new Date()}
                  helperText="Select date of birth"
                />
              </Grid>
            </Section>

            <Section
              title="Account Credentials"
              description="Optional login credentials"
            >
              <Grid columns={{ sm: 1, md: 2 }} gap={4}>
                <TextInput
                  accessor="username"
                  label="Username"
                  placeholder="johndoe123"
                  helperText="Letters, numbers, and underscores only"
                  validation={validationRules.username}
                />

                <TextInput
                  accessor="password"
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  helperText="Minimum 6 characters"
                  validation={validationRules.password}
                />
              </Grid>
            </Section>

            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create User"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/dashboard/users")}
              >
                Cancel
              </Button>
            </div>
          </Form>

          {error && (
            <Alert variant="destructive" className="mt-6">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {response && (
            <Card className="mt-8 p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-lg">User Created Successfully!</h3>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Note: This is a simulated response. The user was not actually added to the server.
              </p>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/admin/dashboard/users")}
                >
                  Back to Users
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetResponse}
                >
                  Create Another
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
