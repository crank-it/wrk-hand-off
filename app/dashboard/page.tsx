import { auth } from '../../lib/auth'
import { prisma } from '../../lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/signin')
  }

  // Fetch user's data
  const userId = (session.user as any).id
  
  const [user, projects, recentTasks, activeRequests] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      include: {
        projects: {
          include: {
            tasks: true
          }
        }
      }
    }),
    prisma.project.findMany({
      where: { userId },
      include: {
        tasks: {
          orderBy: { createdAt: 'desc' },
          take: 5
        }
      }
    }),
    prisma.task.findMany({
      where: {
        project: {
          userId
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        project: true
      }
    }),
    prisma.serviceRequest.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 3,
      include: {
        service: true
      }
    })
  ])

  // Calculate totals
  const totalCreditBalance = projects.reduce((sum, project) => sum + project.creditBalance, 0)
  const activeProjects = projects.filter(p => p.status === 'ACTIVE').length
  const totalTasks = projects.reduce((sum, project) => sum + project.tasks.length, 0)
  const completedTasks = projects.reduce((sum, project) => 
    sum + project.tasks.filter(t => t.status === 'DONE').length, 0
  )

  return (
    <div>
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name || user?.email}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's an overview of your projects and team activity
        </p>
      </div>

      {/* Credit Balance Alert */}
      <div className="mb-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Trial Credit Balance</h2>
            <p className="text-white/90">
              Use your credit to try any of our services
            </p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold">
              ${(totalCreditBalance / 100).toFixed(2)}
            </p>
            <Link 
              href="/dashboard/billing" 
              className="inline-flex items-center space-x-2 mt-3 text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              <span>Add Credit</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{activeProjects}</p>
          <p className="text-sm text-gray-600 mt-1">Active Projects</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{completedTasks}</p>
          <p className="text-sm text-gray-600 mt-1">Completed Tasks</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalTasks - completedTasks}</p>
          <p className="text-sm text-gray-600 mt-1">Pending Tasks</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">5</p>
          <p className="text-sm text-gray-600 mt-1">Team Members</p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Tasks */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Tasks</h2>
              <Link href="/dashboard/tasks" className="text-sm text-orange-600 hover:text-orange-500">
                View all →
              </Link>
            </div>
          </div>
          <div className="p-6">
            {recentTasks.length > 0 ? (
              <div className="space-y-4">
                {recentTasks.map((task) => (
                  <div key={task.id} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 mt-2 rounded-full ${
                      task.status === 'DONE' ? 'bg-green-500' :
                      task.status === 'IN_PROGRESS' ? 'bg-blue-500' :
                      task.status === 'REVIEW' ? 'bg-orange-500' :
                      'bg-gray-400'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{task.title}</p>
                      <p className="text-xs text-gray-500">
                        {task.project.name} • {new Date(task.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.status === 'DONE' ? 'bg-green-100 text-green-800' :
                      task.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                      task.status === 'REVIEW' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-gray-500 mb-4">No tasks yet</p>
                <Link 
                  href="/dashboard/projects" 
                  className="text-sm text-orange-600 hover:text-orange-500"
                >
                  Create your first project →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <Link 
                href="/dashboard/projects/new"
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors group"
              >
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900">New Project</p>
                </div>
              </Link>

              <Link 
                href="/dashboard/team"
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
              >
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900">Browse Team</p>
                </div>
              </Link>

              <Link 
                href="/dashboard/messages"
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors group"
              >
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900">Send Message</p>
                </div>
              </Link>

              <Link 
                href="/services"
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors group"
              >
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900">Browse Services</p>
                </div>
              </Link>
            </div>

            {/* Service Requests */}
            {activeRequests.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Recent Service Requests</h3>
                <div className="space-y-3">
                  {activeRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{request.title}</p>
                        <p className="text-xs text-gray-500">
                          {request.service?.name || 'General Request'}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        request.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                        request.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}