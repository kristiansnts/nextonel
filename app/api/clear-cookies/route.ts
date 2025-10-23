import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()

  // Get all cookies
  const allCookies = cookieStore.getAll()

  // Delete all NextAuth cookies
  allCookies.forEach(cookie => {
    if (cookie.name.includes('next-auth')) {
      cookieStore.delete(cookie.name)
    }
  })

  return NextResponse.json({
    message: 'All NextAuth cookies cleared. You can now go back to /admin/login',
    clearedCookies: allCookies.filter(c => c.name.includes('next-auth')).map(c => c.name)
  })
}
