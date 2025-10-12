"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Section, Grid } from "@/components/ui/form-builder"
import { toast } from "sonner"
import {
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  Loader2,
  Bell,
  Sparkles,
  Rocket,
  Code2,
} from "lucide-react"

export default function NotificationDemoPage() {
  const [loading, setLoading] = useState(false)

  // Basic toast examples
  const showDefaultToast = () => {
    toast("Event has been created")
  }

  const showSuccessToast = () => {
    toast.success("User created successfully!", {
      description: "The user has been added to the database.",
    })
  }

  const showErrorToast = () => {
    toast.error("Something went wrong!", {
      description: "Unable to save changes. Please try again.",
    })
  }

  const showWarningToast = () => {
    toast.warning("Storage limit exceeded", {
      description: "You've used 95% of your available storage.",
    })
  }

  const showInfoToast = () => {
    toast.info("New update available", {
      description: "Version 2.0 is now available for download.",
    })
  }

  // Advanced examples
  const showWithAction = () => {
    toast("Event has been created", {
      action: {
        label: "Undo",
        onClick: () => toast.info("Undo clicked!"),
      },
    })
  }

  const showCustomIcon = () => {
    toast.success("Mission accomplished!", {
      description: "You've completed all tasks for today.",
      icon: <Rocket className="h-5 w-5" />,
    })
  }

  const showWithDuration = () => {
    toast("This will disappear in 10 seconds", {
      duration: 10000,
    })
  }

  const showPersistent = () => {
    toast("This won't close automatically", {
      duration: Infinity,
    })
  }

  const showLoading = () => {
    const promise = new Promise((resolve) => setTimeout(resolve, 3000))

    toast.promise(promise, {
      loading: "Loading...",
      success: "Data loaded successfully!",
      error: "Failed to load data",
    })
  }

  const showCustomJSX = () => {
    toast.custom(() => (
      <Card className="p-4 flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
        <Sparkles className="h-5 w-5" />
        <div>
          <div className="font-semibold">Custom Toast!</div>
          <div className="text-sm opacity-90">Fully customizable JSX content</div>
        </div>
      </Card>
    ))
  }

  const showMultiple = () => {
    toast.success("First notification")
    setTimeout(() => toast.info("Second notification"), 200)
    setTimeout(() => toast.warning("Third notification"), 400)
  }

  // Simulated API call
  const simulateApiCall = async () => {
    setLoading(true)

    const promise = fetch("https://dummyjson.com/products/1")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        return data
      })
      .catch((error) => {
        setLoading(false)
        throw error
      })

    toast.promise(promise, {
      loading: "Fetching data from API...",
      success: (data) => `Successfully loaded: ${data.title}`,
      error: "Failed to fetch data",
    })
  }

  const showFormSubmitExample = () => {
    const submitPromise = new Promise<{ id: number; name: string }>((resolve) => {
      setTimeout(() => resolve({ id: 123, name: "John Doe" }), 2000)
    })

    toast.promise(submitPromise, {
      loading: "Creating user...",
      success: (data) => {
        return `User ${data.name} created with ID: ${data.id}`
      },
      error: "Failed to create user",
    })
  }

  const showDismissAll = () => {
    toast.success("Toast 1")
    toast.info("Toast 2")
    toast.warning("Toast 3")

    setTimeout(() => {
      toast.dismiss()
      toast.success("All previous toasts dismissed!")
    }, 2000)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-8 pb-4">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Bell className="h-8 w-8" />
            Notification System Demo
          </h1>
          <p className="mt-2 text-muted-foreground">
            Interactive examples of toast notifications using Sonner
          </p>
        </div>
      </div>

      <div className="px-8 pb-8 space-y-6">
        {/* Basic Notifications */}
        <Section
          title="Basic Notifications"
          description="Standard notification types with different severity levels"
        >
          <Grid columns={{ sm: 2, md: 3, lg: 4 }} gap={4}>
            <Button onClick={showDefaultToast} variant="outline">
              <Bell className="mr-2 h-4 w-4" />
              Default
            </Button>
            <Button onClick={showSuccessToast} variant="outline">
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
              Success
            </Button>
            <Button onClick={showErrorToast} variant="outline">
              <AlertCircle className="mr-2 h-4 w-4 text-red-600" />
              Error
            </Button>
            <Button onClick={showWarningToast} variant="outline">
              <AlertTriangle className="mr-2 h-4 w-4 text-yellow-600" />
              Warning
            </Button>
            <Button onClick={showInfoToast} variant="outline">
              <Info className="mr-2 h-4 w-4 text-blue-600" />
              Info
            </Button>
          </Grid>
        </Section>

        {/* Advanced Features */}
        <Section
          title="Advanced Features"
          description="Notifications with actions, custom icons, and durations"
        >
          <Grid columns={{ sm: 2, md: 3, lg: 4 }} gap={4}>
            <Button onClick={showWithAction} variant="outline">
              With Action Button
            </Button>
            <Button onClick={showCustomIcon} variant="outline">
              <Rocket className="mr-2 h-4 w-4" />
              Custom Icon
            </Button>
            <Button onClick={showWithDuration} variant="outline">
              10s Duration
            </Button>
            <Button onClick={showPersistent} variant="outline">
              Persistent
            </Button>
            <Button onClick={showCustomJSX} variant="outline">
              <Sparkles className="mr-2 h-4 w-4" />
              Custom JSX
            </Button>
            <Button onClick={showMultiple} variant="outline">
              Multiple Toasts
            </Button>
            <Button onClick={showDismissAll} variant="outline">
              Auto Dismiss All
            </Button>
          </Grid>
        </Section>

        {/* Promise/Loading States */}
        <Section
          title="Promise & Loading States"
          description="Async operations with loading, success, and error states"
        >
          <Grid columns={{ sm: 1, md: 2, lg: 3 }} gap={4}>
            <Button onClick={showLoading} variant="outline">
              <Loader2 className="mr-2 h-4 w-4" />
              Loading Promise
            </Button>
            <Button onClick={simulateApiCall} disabled={loading} variant="outline">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              API Call Example
            </Button>
            <Button onClick={showFormSubmitExample} variant="outline">
              Form Submit Simulation
            </Button>
          </Grid>
        </Section>

        {/* Real-World Examples */}
        <Section
          title="Real-World Scenarios"
          description="Common use cases in admin panels"
        >
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">User Management</h3>
                <p className="text-sm text-muted-foreground">
                  Simulate user CRUD operations
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() =>
                    toast.success("User created", {
                      description: "John Doe has been added to the system.",
                    })
                  }
                >
                  Create User
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    toast.info("User updated", {
                      description: "Changes saved successfully.",
                    })
                  }
                >
                  Update User
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    toast.error("User deleted", {
                      description: "This action cannot be undone.",
                      action: {
                        label: "Undo",
                        onClick: () => toast.success("Delete cancelled"),
                      },
                    })
                  }
                >
                  Delete User
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <h3 className="font-semibold">File Upload</h3>
                <p className="text-sm text-muted-foreground">
                  Simulate file upload progress
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  const upload = new Promise((resolve) =>
                    setTimeout(resolve, 3000)
                  )
                  toast.promise(upload, {
                    loading: "Uploading file...",
                    success: "File uploaded successfully!",
                    error: "Upload failed",
                  })
                }}
              >
                Upload File
              </Button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <h3 className="font-semibold">Bulk Actions</h3>
                <p className="text-sm text-muted-foreground">
                  Process multiple items at once
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  toast.info("Processing 15 items...", { duration: 1000 })
                  setTimeout(
                    () =>
                      toast.success("Bulk operation completed", {
                        description: "15 items processed successfully.",
                      }),
                    1500
                  )
                }}
              >
                Process Bulk
              </Button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <h3 className="font-semibold">Email Notification</h3>
                <p className="text-sm text-muted-foreground">
                  Send email notifications
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  const sendEmail = new Promise<boolean>((resolve, reject) => {
                    setTimeout(() => {
                      if (Math.random() > 0.5) {
                        resolve(true)
                      } else {
                        reject(false)
                      }
                    }, 2000)
                  })

                  toast.promise(sendEmail, {
                    loading: "Sending email...",
                    success: "Email sent to 5 recipients",
                    error: "Failed to send email. Please check your SMTP settings.",
                  })
                }}
              >
                Send Email
              </Button>
            </div>
          </Card>
        </Section>

        {/* Usage Examples Section */}
        <div className="mt-8">
          <Section
            title="Usage Examples"
            description="How to use the Notification System (Sonner) in your code"
          >
            <div className="space-y-6">
              {/* Setup & Installation */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Setup & Installation</h3>
                </div>
                <pre className="text-sm overflow-auto bg-muted p-4 rounded-lg">
{`// 1. Install Sonner
npm install sonner

// 2. Add Toaster to your root layout
import { Toaster } from "sonner"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}

// 3. Import and use in any component
import { toast } from "sonner"

function MyComponent() {
  return (
    <button onClick={() => toast("Hello World")}>
      Show Toast
    </button>
  )
}`}
                </pre>
              </Card>

              {/* Basic Usage */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Basic Toast Types</h3>
                </div>
                <pre className="text-sm overflow-auto bg-muted p-4 rounded-lg">
{`import { toast } from "sonner"

// Default toast
toast("Event has been created")

// Success toast
toast.success("User created successfully!")

// Error toast
toast.error("Something went wrong!")

// Warning toast
toast.warning("Storage limit exceeded")

// Info toast
toast.info("New update available")

// With description
toast.success("User created", {
  description: "The user has been added to the database."
})

// With custom duration (ms)
toast("This will stay for 10 seconds", {
  duration: 10000
})

// Persistent toast (won't auto-close)
toast("This won't close automatically", {
  duration: Infinity
})`}
                </pre>
              </Card>

              {/* Toast with Actions */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Toast with Action Buttons</h3>
                </div>
                <pre className="text-sm overflow-auto bg-muted p-4 rounded-lg">
{`// Action button for undo/redo
toast("Event deleted", {
  action: {
    label: "Undo",
    onClick: () => {
      // Restore the deleted item
      console.log("Undo clicked")
    }
  }
})

// Multiple examples with actions
toast.error("User deleted", {
  description: "This action cannot be undone.",
  action: {
    label: "Undo",
    onClick: () => toast.success("Delete cancelled")
  }
})

toast.info("New message received", {
  description: "John Doe sent you a message",
  action: {
    label: "View",
    onClick: () => window.location.href = "/messages"
  }
})`}
                </pre>
              </Card>

              {/* Custom Icons & Styling */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Custom Icons & Styling</h3>
                </div>
                <pre className="text-sm overflow-auto bg-muted p-4 rounded-lg">
{`import { Rocket, Star, Heart } from "lucide-react"

// Custom icon
toast.success("Mission accomplished!", {
  description: "You've completed all tasks",
  icon: <Rocket className="h-5 w-5" />
})

// Custom JSX content
toast.custom(() => (
  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
    <Star className="h-5 w-5" />
    <div>
      <div className="font-semibold">Custom Toast!</div>
      <div className="text-sm opacity-90">Fully customizable</div>
    </div>
  </div>
))

// Using Card component for custom styling
import { Card } from "@/components/ui/card"

toast.custom(() => (
  <Card className="p-4 flex items-center gap-3">
    <Heart className="h-5 w-5 text-red-500" />
    <div>
      <div className="font-semibold">Thank you!</div>
      <div className="text-sm text-muted-foreground">
        Your feedback helps us improve
      </div>
    </div>
  </Card>
))`}
                </pre>
              </Card>

              {/* Promise/Loading States */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Promise & Loading States</h3>
                </div>
                <pre className="text-sm overflow-auto bg-muted p-4 rounded-lg">
{`// Basic promise toast
const promise = fetch('/api/users')

toast.promise(promise, {
  loading: "Loading...",
  success: "Data loaded successfully!",
  error: "Failed to load data"
})

// API call with detailed messages
async function createUser(data) {
  const promise = fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(data)
  })

  toast.promise(promise, {
    loading: "Creating user...",
    success: (response) => {
      return \`User \${response.name} created successfully!\`
    },
    error: (error) => {
      return \`Failed: \${error.message}\`
    }
  })
}

// Form submission example
async function handleSubmit(formData) {
  const submitPromise = new Promise((resolve, reject) => {
    // Your API call here
    fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err))
  })

  toast.promise(submitPromise, {
    loading: "Submitting form...",
    success: (data) => \`Form submitted! ID: \${data.id}\`,
    error: "Submission failed. Please try again."
  })
}

// File upload with progress
async function uploadFile(file) {
  const upload = new Promise((resolve) => {
    setTimeout(() => resolve({ url: "/uploads/file.pdf" }), 3000)
  })

  toast.promise(upload, {
    loading: "Uploading file...",
    success: "File uploaded successfully!",
    error: "Upload failed"
  })
}`}
                </pre>
              </Card>

              {/* Toast Management */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Toast Management</h3>
                </div>
                <pre className="text-sm overflow-auto bg-muted p-4 rounded-lg">
{`// Dismiss specific toast
const toastId = toast("Processing...")
setTimeout(() => {
  toast.dismiss(toastId)
}, 2000)

// Dismiss all toasts
toast.dismiss()

// Show multiple toasts sequentially
toast.success("First notification")
setTimeout(() => toast.info("Second notification"), 200)
setTimeout(() => toast.warning("Third notification"), 400)

// Auto-dismiss all and show new one
function resetNotifications() {
  toast.dismiss() // Clear all existing
  toast.success("All notifications cleared!")
}

// Replace existing toast
const loadingToast = toast.loading("Processing...")
// Later...
toast.success("Done!", { id: loadingToast })
`}
                </pre>
              </Card>

              {/* Real-World Use Cases */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Real-World Use Cases</h3>
                </div>
                <pre className="text-sm overflow-auto bg-muted p-4 rounded-lg">
{`// 1. Form Validation Error
function validateForm(data) {
  if (!data.email) {
    toast.error("Email is required", {
      description: "Please enter a valid email address"
    })
    return false
  }
  return true
}

// 2. CRUD Operations
async function deleteUser(userId) {
  toast("User will be deleted", {
    action: {
      label: "Undo",
      onClick: () => {
        cancelDelete(userId)
        toast.success("Delete cancelled")
      }
    }
  })

  setTimeout(() => {
    // Proceed with delete
    toast.success("User deleted successfully")
  }, 3000)
}

// 3. Bulk Actions
async function processBulkItems(items) {
  toast.info(\`Processing \${items.length} items...\`, {
    duration: 1000
  })

  const promise = Promise.all(
    items.map(item => processItem(item))
  )

  toast.promise(promise, {
    loading: "Processing...",
    success: \`Successfully processed \${items.length} items\`,
    error: "Some items failed to process"
  })
}

// 4. Real-time Updates
socket.on('notification', (data) => {
  toast.info(data.message, {
    description: data.details,
    action: {
      label: "View",
      onClick: () => navigate(data.link)
    }
  })
})

// 5. Copy to Clipboard
async function copyToClipboard(text) {
  await navigator.clipboard.writeText(text)
  toast.success("Copied to clipboard!", {
    duration: 2000
  })
}

// 6. Network Status
window.addEventListener('offline', () => {
  toast.error("No internet connection", {
    description: "Please check your network settings",
    duration: Infinity
  })
})

window.addEventListener('online', () => {
  toast.dismiss()
  toast.success("Back online!")
})

// 7. Auto-save Feedback
let saveTimeout
function autoSave(data) {
  clearTimeout(saveTimeout)
  saveTimeout = setTimeout(() => {
    toast.promise(
      saveData(data),
      {
        loading: "Saving...",
        success: "Changes saved",
        error: "Failed to save"
      }
    )
  }, 1000)
}`}
                </pre>
              </Card>

              {/* Configuration Options */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Configuration Options</h3>
                </div>
                <pre className="text-sm overflow-auto bg-muted p-4 rounded-lg">
{`// Toaster component props (in root layout)
<Toaster
  position="top-right"           // Position on screen
  expand={false}                 // Expand toasts on hover
  richColors={true}              // Use rich colors for variants
  closeButton={true}             // Show close button
  duration={4000}                // Default duration (ms)
  visibleToasts={5}              // Max visible toasts
  theme="system"                 // "light" | "dark" | "system"
  toastOptions={{
    className: 'my-toast',
    style: { background: 'red' }
  }}
/>

// Available positions:
// - top-left
// - top-center
// - top-right
// - bottom-left
// - bottom-center
// - bottom-right

// Individual toast options
toast("Message", {
  duration: 5000,              // How long to show (ms)
  position: "bottom-center",   // Override default position
  icon: <Icon />,              // Custom icon
  action: {                    // Action button
    label: "Action",
    onClick: () => {}
  },
  cancel: {                    // Cancel button
    label: "Cancel",
    onClick: () => {}
  },
  description: "Details...",   // Secondary text
  className: "custom-class",   // Custom CSS class
  style: { color: 'red' },    // Inline styles
  onDismiss: () => {},        // Callback on dismiss
  onAutoClose: () => {},      // Callback on auto-close
})`}
                </pre>
              </Card>

              {/* Best Practices */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Best Practices</h3>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">✅ Do&apos;s</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Use appropriate toast types (success, error, warning, info)</li>
                      <li>Keep messages concise and actionable</li>
                      <li>Use descriptions for additional context</li>
                      <li>Provide action buttons for reversible operations (Undo)</li>
                      <li>Use promise toasts for async operations</li>
                      <li>Set appropriate durations (errors longer, success shorter)</li>
                      <li>Dismiss all toasts when navigating away from a page</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">❌ Don&apos;ts</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Don&apos;t show too many toasts at once (limit: 3-5)</li>
                      <li>Don&apos;t use toasts for critical information (use dialogs instead)</li>
                      <li>Don&apos;t make persistent toasts without a close button</li>
                      <li>Don&apos;t use long messages (use descriptions for details)</li>
                      <li>Avoid using toasts for every single action</li>
                      <li>Don&apos;t nest toasts or show during another toast&apos;s animation</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">💡 Tips</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Use toast.promise() for loading states instead of manual management</li>
                      <li>Group related notifications with sequential timing</li>
                      <li>Consider using custom JSX for complex notifications</li>
                      <li>Test toast visibility on different screen sizes</li>
                      <li>Use icons to make toasts more scannable</li>
                      <li>Implement toast.dismiss() when user navigates away</li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* TypeScript Types */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">TypeScript Types</h3>
                </div>
                <pre className="text-sm overflow-auto bg-muted p-4 rounded-lg">
{`import { toast } from "sonner"
import type { ExternalToast } from "sonner"

// Toast options type
const options: ExternalToast = {
  duration: 5000,
  position: "top-right",
  description: "Additional details",
  action: {
    label: "Undo",
    onClick: () => console.log("Undo")
  }
}

toast("Message", options)

// Promise with typed response
interface User {
  id: number
  name: string
  email: string
}

async function createUser(data: Partial<User>) {
  const promise = fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(res => res.json() as Promise<User>)

  toast.promise<User>(promise, {
    loading: "Creating user...",
    success: (user) => \`User \${user.name} created!\`,
    error: "Failed to create user"
  })
}

// Custom toast function with types
function showNotification(
  message: string,
  type: "success" | "error" | "info" | "warning" = "info",
  options?: ExternalToast
) {
  toast[type](message, options)
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
