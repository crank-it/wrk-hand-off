import { auth } from '../../../lib/auth'
import { prisma } from '../../../lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function BillingPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/signin')
  }

  const userId = (session.user as any).id

  // Get user's projects and calculate total credits
  const projects = await prisma.project.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      creditBalance: true,
      createdAt: true
    }
  })

  const totalCredits = projects.reduce((sum, p) => sum + p.creditBalance, 0)
  const usedCredits = 30000 - totalCredits // Assuming $300 initial credit

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Billing & Credits</h1>
        <p className="text-gray-600 mt-2">
          Manage your credits and view billing history
        </p>
      </div>

      {/* Credit Balance Card */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/90 mb-2">Available Credits</p>
            <p className="text-5xl font-bold">${(totalCredits / 100).toFixed(2)}</p>
            <p className="text-white/80 mt-2">
              ${(usedCredits / 100).toFixed(2)} used of $300.00 trial credit
            </p>
          </div>
          <div className="text-right">
            <button className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur rounded-lg transition-colors">
              Add Credits
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">${(totalCredits / 100).toFixed(0)}</p>
          <p className="text-sm text-gray-600 mt-1">Current Balance</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">${(usedCredits / 100).toFixed(0)}</p>
          <p className="text-sm text-gray-600 mt-1">Credits Used</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
          <p className="text-sm text-gray-600 mt-1">Active Projects</p>
        </div>
      </div>

      {/* Credit Usage by Project */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Credit Usage by Project</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {projects.map((project) => (
            <div key={project.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-500">
                    Created {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ${(project.creditBalance / 100).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">remaining</p>
                </div>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">No projects yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Starter</h3>
            <p className="text-3xl font-bold text-gray-900 mb-4">
              $299<span className="text-lg font-normal text-gray-500">/month</span>
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Up to 5 projects
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                2 team members
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Email support
              </li>
            </ul>
            <button className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Select Plan
            </button>
          </div>

          <div className="bg-white rounded-xl border-2 border-orange-500 p-6 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full">
                POPULAR
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional</h3>
            <p className="text-3xl font-bold text-gray-900 mb-4">
              $799<span className="text-lg font-normal text-gray-500">/month</span>
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Unlimited projects
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                5 team members
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Priority support
              </li>
            </ul>
            <button className="w-full py-2 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg">
              Select Plan
            </button>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Enterprise</h3>
            <p className="text-3xl font-bold text-gray-900 mb-4">
              Custom
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Unlimited everything
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Dedicated team
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                24/7 phone support
              </li>
            </ul>
            <button className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}