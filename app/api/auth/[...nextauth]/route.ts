import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.email === "admin@example.com" && credentials?.password === "admin123") {
          return {
            id: "1",
            email: "admin@example.com",
            name: "Admin User"
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after successful login
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/admin/dashboard`
      }
      return baseUrl
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  events: {
    async signOut() {
      // Clear session on signout
    }
  },
  // Handle JWT decryption errors gracefully
  logger: {
    error(code, metadata) {
      if (code === 'JWT_SESSION_ERROR') {
        // Suppress JWT decryption errors in logs (they'll be handled by returning null session)
        console.log('JWT session error - invalid or expired token will be cleared')
      } else {
        console.error(code, metadata)
      }
    },
    warn(code) {
      console.warn(code)
    },
    debug(code, metadata) {
      // Suppress debug logs in production
    }
  }
})

export { handler as GET, handler as POST }