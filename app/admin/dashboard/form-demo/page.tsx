"use client"

import { useState } from "react"
import {
  Form,
  TextInput,
  Textarea,
  Checkbox,
  Toggle,
  Select,
  TagsInput,
  DatePicker,
  DateTimePicker,
  FileUpload,
  KeyValue,
  MarkdownEditor,
  RichEditor,
  Grid,
  Section,
  Fieldset,
  Tabs,
  Group,
} from "@/components/ui/form-builder"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { User, Lock, Settings, Code2 } from "lucide-react"

export default function FormDemoPage() {
  const [formData, setFormData] = useState<Record<string, unknown>>({})

  const handleSubmit = (values: Record<string, unknown>) => {
    console.log("Form submitted:", values)
    alert("Form submitted! Check console for values.")
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-8 pb-4">
        <div>
          <h1 className="text-4xl font-bold">Form Builder Demo</h1>
          <p className="mt-2 text-muted-foreground">
            Filament-style form components matching your Table builder pattern
          </p>
        </div>
      </div>

      <div className="px-8 pb-8">
        <Form
          initialValues={{
            first_name: "",
            email: "",
            terms: false,
            notifications: true,
            country: "",
            tags: [],
            birth_date: "",
          }}
          onSubmit={handleSubmit}
          onChange={setFormData}
          className="space-y-6"
        >
          <Section
            title="Basic Information"
            description="Enter your personal details"
          >
            <Grid columns={{ sm: 1, md: 2 }} gap={4}>
              <TextInput
                accessor="first_name"
                label="First Name"
                placeholder="John"
                required
                tooltip="Enter your legal first name"
                validation={{
                  minLength: { value: 2, message: "Name must be at least 2 characters" },
                }}
              />

              <TextInput
                accessor="last_name"
                label="Last Name"
                placeholder="Doe"
                required
              />

              <TextInput
                accessor="email"
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                required
                validation={{
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                }}
              />

              <TextInput
                accessor="phone"
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 000-0000"
                helperText="Include country code"
              />

              <TextInput
                accessor="age"
                label="Age"
                numeric
                min={18}
                max={120}
                placeholder="25"
                helperText="You must be 18 or older"
              />

              <Select
                accessor="country"
                label="Country"
                placeholder="Select your country"
                required
                options={[
                  { label: "United States", value: "us" },
                  { label: "Canada", value: "ca" },
                  { label: "United Kingdom", value: "uk" },
                  { label: "Australia", value: "au" },
                ]}
              />
            </Grid>
          </Section>

          <Section title="Additional Details">
            <Grid columns={{ sm: 1, md: 2 }} gap={4}>
              <DatePicker
                accessor="birth_date"
                label="Date of Birth (Native)"
                required
                native={true}
                maxDate={new Date()}
                helperText="Native HTML5 date picker"
              />

              <DatePicker
                accessor="birth_date_picker"
                label="Date of Birth (Calendar)"
                required
                native={false}
                maxDate={new Date()}
                helperText="Shadcn calendar picker with dropdown"
              />
            </Grid>

            <DateTimePicker
              accessor="appointment"
              label="Appointment Date & Time"
              helperText="Select your preferred appointment time"
            />

            <Grid columns={1} gap={4}>

              <TagsInput
                accessor="tags"
                label="Skills"
                placeholder="Type and press Enter"
                helperText="Add relevant skills (e.g., React, TypeScript)"
                maxTags={10}
              />

              <Textarea
                accessor="bio"
                label="Biography"
                placeholder="Tell us about yourself..."
                rows={4}
                helperText="Maximum 500 characters"
                validation={{
                  maxLength: { value: 500, message: "Bio must be less than 500 characters" },
                }}
              />
            </Grid>
          </Section>

          <Tabs
            tabs={[
              { label: "Profile", value: "profile", icon: <User className="h-4 w-4" /> },
              { label: "Security", value: "security", icon: <Lock className="h-4 w-4" /> },
              { label: "Preferences", value: "preferences", icon: <Settings className="h-4 w-4" /> },
            ]}
            defaultTab="profile"
          >
            <Group>
              <TextInput
                accessor="username"
                label="Username"
                placeholder="johndoe"
                prefix="@"
              />
              <TextInput
                accessor="website"
                label="Website"
                type="url"
                placeholder="https://example.com"
              />
            </Group>

            <Group>
              <TextInput
                accessor="password"
                label="New Password"
                type="password"
                placeholder="••••••••"
              />
              <TextInput
                accessor="confirm_password"
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
              />
            </Group>

            <Group>
              <Toggle
                accessor="notifications"
                label="Email Notifications"
                description="Receive email notifications for updates"
              />
              <Toggle
                accessor="newsletter"
                label="Newsletter Subscription"
                description="Get weekly updates about new features"
              />
              <Checkbox
                accessor="terms"
                label="I agree to the terms and conditions"
                required
              />
            </Group>
          </Tabs>

          <Fieldset legend="Advanced Options">
            <KeyValue
              accessor="metadata"
              label="Custom Metadata"
              keyLabel="Key"
              valueLabel="Value"
              helperText="Add custom key-value pairs"
            />
          </Fieldset>

          <Section title="File Upload">
            <FileUpload
              accessor="avatar"
              label="Profile Picture"
              accept="image/*"
              maxSize={5 * 1024 * 1024}
              preview
              helperText="Maximum file size: 5MB"
            />
          </Section>

          <Section title="Rich Text">
            <MarkdownEditor
              accessor="notes"
              label="Notes (Markdown)"
              height="200px"
              preview
              helperText="Supports markdown formatting"
            />
          </Section>

          <Section title="Content Editor">
            <RichEditor
              accessor="content"
              label="Content (Rich Text)"
              height="250px"
              helperText="Use the toolbar to format your content"
            />
          </Section>

          <div className="flex gap-4">
            <Button type="submit">Submit Form</Button>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </div>
        </Form>

        <div className="mt-8 p-4 rounded-lg border bg-muted/30">
          <h3 className="font-semibold mb-2">Form State (Live Preview)</h3>
          <pre className="text-xs overflow-auto max-h-96">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>

        {/* Usage Examples Section */}
        <Section
          title="Usage Examples"
          description="How to use the Form Builder in your code"
        >
          <div className="space-y-6">
            {/* Basic Form Example */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Basic Form Setup</h3>
              </div>
              <pre className="text-sm overflow-auto bg-muted p-4 rounded-lg">
{`import { Form, TextInput, Select, Section, Grid } from "@/components/ui/form-builder"
import { Button } from "@/components/ui/button"

export default function UserForm() {
  const handleSubmit = (values: Record<string, unknown>) => {
    console.log("Form values:", values)
    // Handle form submission (API call, etc.)
  }

  return (
    <Form
      initialValues={{
        name: "",
        email: "",
        role: "",
      }}
      onSubmit={handleSubmit}
    >
      <Section title="User Information">
        <Grid columns={{ sm: 1, md: 2 }} gap={4}>
          <TextInput
            accessor="name"
            label="Full Name"
            placeholder="John Doe"
            required
          />

          <TextInput
            accessor="email"
            label="Email"
            type="email"
            placeholder="john@example.com"
            required
          />

          <Select
            accessor="role"
            label="Role"
            placeholder="Select a role"
            options={[
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" },
            ]}
          />
        </Grid>
      </Section>

      <Button type="submit">Submit</Button>
    </Form>
  )
}`}
              </pre>
            </Card>

            {/* Available Field Types */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Available Field Types</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-1">TextInput</h4>
                  <p className="text-xs text-muted-foreground">
                    Text, email, password, tel, url inputs with validation
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-1">Textarea</h4>
                  <p className="text-xs text-muted-foreground">
                    Multi-line text input with character limits
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-1">Select</h4>
                  <p className="text-xs text-muted-foreground">
                    Dropdown selection with searchable options
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-1">Checkbox</h4>
                  <p className="text-xs text-muted-foreground">
                    Boolean checkbox for terms, agreements
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-1">Toggle</h4>
                  <p className="text-xs text-muted-foreground">
                    Switch toggle for on/off settings
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-1">DatePicker</h4>
                  <p className="text-xs text-muted-foreground">
                    Native or calendar-based date selection
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-1">DateTimePicker</h4>
                  <p className="text-xs text-muted-foreground">
                    Date and time selection combined
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-1">TagsInput</h4>
                  <p className="text-xs text-muted-foreground">
                    Add multiple tags/keywords dynamically
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-1">FileUpload</h4>
                  <p className="text-xs text-muted-foreground">
                    File upload with preview and size limits
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-1">KeyValue</h4>
                  <p className="text-xs text-muted-foreground">
                    Dynamic key-value pairs for metadata
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-1">MarkdownEditor</h4>
                  <p className="text-xs text-muted-foreground">
                    Markdown editor with live preview
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-1">RichEditor</h4>
                  <p className="text-xs text-muted-foreground">
                    WYSIWYG rich text editor with toolbar
                  </p>
                </div>
              </div>
            </Card>

            {/* Validation Example */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Form Validation</h3>
              </div>
              <pre className="text-sm overflow-auto bg-muted p-4 rounded-lg">
{`<TextInput
  accessor="email"
  label="Email Address"
  type="email"
  required
  validation={{
    pattern: {
      value: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
      message: "Please enter a valid email address"
    }
  }}
/>

<TextInput
  accessor="password"
  label="Password"
  type="password"
  required
  validation={{
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters"
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/,
      message: "Password must contain uppercase, lowercase, and number"
    }
  }}
/>

<Textarea
  accessor="bio"
  label="Biography"
  validation={{
    maxLength: {
      value: 500,
      message: "Bio must be less than 500 characters"
    }
  }}
/>`}
              </pre>
            </Card>

            {/* Layout Components */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Layout Components</h3>
              </div>
              <pre className="text-sm overflow-auto bg-muted p-4 rounded-lg">
{`// Section - Organize forms into sections
<Section
  title="Personal Information"
  description="Enter your details"
>
  {/* Fields here */}
</Section>

// Grid - Responsive column layouts
<Grid columns={{ sm: 1, md: 2, lg: 3 }} gap={4}>
  <TextInput accessor="field1" label="Field 1" />
  <TextInput accessor="field2" label="Field 2" />
  <TextInput accessor="field3" label="Field 3" />
</Grid>

// Tabs - Organize forms into tabs
<Tabs
  tabs={[
    { label: "General", value: "general" },
    { label: "Advanced", value: "advanced" },
  ]}
  defaultTab="general"
>
  <Group>{/* General fields */}</Group>
  <Group>{/* Advanced fields */}</Group>
</Tabs>

// Fieldset - Group related fields
<Fieldset legend="Contact Information">
  <TextInput accessor="email" label="Email" />
  <TextInput accessor="phone" label="Phone" />
</Fieldset>

// Group - Simple field grouping
<Group>
  <TextInput accessor="firstName" label="First Name" />
  <TextInput accessor="lastName" label="Last Name" />
</Group>`}
              </pre>
            </Card>

            {/* Advanced Features */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Advanced Features</h3>
              </div>
              <pre className="text-sm overflow-auto bg-muted p-4 rounded-lg">
{`// Watch form changes in real-time
const [formData, setFormData] = useState({})

<Form
  initialValues={{ name: "" }}
  onSubmit={handleSubmit}
  onChange={setFormData}  // Real-time updates
>
  {/* Fields */}
</Form>

// Prefix and suffix for inputs
<TextInput
  accessor="username"
  label="Username"
  prefix="@"  // Shows @username
/>

<TextInput
  accessor="price"
  label="Price"
  numeric
  prefix="$"
  suffix="USD"
/>

// Tooltips and helper text
<TextInput
  accessor="api_key"
  label="API Key"
  tooltip="Your secret API key from the dashboard"
  helperText="Keep this key secure and don't share it"
/>

// Conditional fields based on form state
{formData.has_company && (
  <TextInput
    accessor="company_name"
    label="Company Name"
    required
  />
)}`}
              </pre>
            </Card>
          </div>
        </Section>
      </div>
    </div>
  )
}
