import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export const { 
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('Authorize function called with:', { email: credentials?.email, hasPassword: !!credentials?.password })
        
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials')
          return null
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email as string
            }
          })

          console.log('User found:', { exists: !!user, hasPassword: !!user?.password })

          if (!user || !user.password) {
            console.log('User not found or no password')
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          )

          console.log('Password valid:', isPasswordValid)

          if (!isPasswordValid) {
            console.log('Password invalid')
            return null
          }

          console.log('Authorization successful for user:', user.email)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          }
        } catch (error) {
          console.error('Authorization error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  callbacks: {
    jwt({ token, user }) {
      console.log('JWT callback - user:', user, 'token:', token)
      if (user) {
        token.id = user.id
        token.role = (user as any).role
      }
      return token
    },
    session({ session, token }) {
      console.log('Session callback - session:', session, 'token:', token)
      if (session?.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role
      }
      return session
    },
    redirect({ url, baseUrl }) {
      console.log('Redirect callback - url:', url, 'baseUrl:', baseUrl)
      // Always redirect to dashboard after successful sign in
      if (url.startsWith('/dashboard')) return url
      if (url === '/signin' || url === baseUrl + '/signin') return '/dashboard'
      return '/dashboard'
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Enable debug for now
  trustHost: true, // Add this for Vercel deployment
  useSecureCookies: process.env.NODE_ENV === 'production',
})