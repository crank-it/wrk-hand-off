import Link from 'next/link'

export default async function SignInPage() {
  // Get CSRF token server-side
  const csrfResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/csrf`).catch(() => null)
  const csrfData = csrfResponse ? await csrfResponse.json() : null
  const csrfToken = csrfData?.csrfToken || ''

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

          {/* Simple Form - Direct submission to NextAuth */}
          <form 
            method="POST" 
            action="/api/auth/callback/credentials"
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

            <input type="hidden" name="callbackUrl" value="/dashboard" />
            <input type="hidden" name="csrfToken" value={csrfToken} />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-shadow"
            >
              Sign in
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">New to Work?</span>
              </div>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6">
            <Link 
              href="/signup" 
              className="w-full inline-flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Create an account
            </Link>
          </div>

          {/* Trial Credit Notice */}
          <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🎁</span>
              <div>
                <p className="text-sm font-medium text-gray-900">$300 Trial Credit</p>
                <p className="text-xs text-gray-600">Sign up today and get instant credit to try our services</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}