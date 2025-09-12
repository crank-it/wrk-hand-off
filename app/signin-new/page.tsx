import { signInAction } from '../actions/auth'
import Link from 'next/link'

export default function NewSignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-2xl">W</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Work</span>
            </Link>
            <h1 className="mt-6 text-3xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-2 text-gray-600">Sign in to access your dashboard</p>
          </div>

          {/* Form */}
          <form 
            action={async (formData) => {
              'use server'
              const email = formData.get('email') as string
              const password = formData.get('password') as string
              
              const result = await signInAction(email, password)
              
              if (result?.error) {
                // For now, we'll just log the error
                // In production, you'd want to handle this better
                console.error('Sign in error:', result.error)
              }
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-shadow"
            >
              Sign in
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6">
            <Link 
              href="/signup" 
              className="w-full inline-flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}