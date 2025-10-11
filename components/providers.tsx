'use client';

import { SessionProvider } from "next-auth/react"
import { AuthProvidersProvider } from "@/contexts/auth-providers-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvidersProvider>
        {children}
      </AuthProvidersProvider>
    </SessionProvider>
  )
}