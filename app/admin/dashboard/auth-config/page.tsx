'use client'

import { AuthProviderConfig } from "@/components/auth-provider-config"

export default function AuthConfigPage() {
  return (
    <div className="flex flex-1 flex-col p-8">
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Authentication Configuration</h1>
          <p className="text-muted-foreground mt-2">
            Configure which authentication providers are available on the login page.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Provider Settings</h2>
            <AuthProviderConfig />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div className="p-4 border rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-4">
                The login form will show the enabled providers. Visit{" "}
                <a href="/admin/login" className="text-primary hover:underline">
                  /admin/login
                </a>{" "}
                to see the changes in action.
              </p>

              <div className="text-xs space-y-2">
                <div><strong>How it works:</strong></div>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Settings are saved automatically to localStorage</li>
                  <li>Changes apply immediately to the login form</li>
                  <li>At least one provider must remain enabled</li>
                  <li>OAuth providers require proper environment configuration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}