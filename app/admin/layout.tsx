'use client';

import { useSession, signOut } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  // Don't protect login and signup pages
  const publicPages = ['/admin/login', '/admin/signup']
  const isPublicPage = publicPages.includes(pathname)

  useEffect(() => {
    if (status === 'loading') return
    if (!session && !isPublicPage) {
      router.push('/admin/login')
    }
  }, [session, status, router, isPublicPage])

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  // For public pages, render without authentication wrapper
  if (isPublicPage) {
    return <>{children}</>
  }

  if (!session) {
    return null
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/admin/login' })
  }

  return (
    <div className="min-h-screen">
      <header className="border-b bg-white">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Welcome, {session.user?.email}
            </span>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}