import { auth } from '../../../lib/auth'
import { prisma } from '../../../lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function ProjectsPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/signin')
  }

  const userId = (session.user as any).id

  // Fetch user's projects with related data
  const projects = await prisma.project.findMany({
    where: { userId },
    include: {
      service: true,
      tasks: {
        orderBy: { createdAt: 'desc' }
      },
      serviceRequest: true
    },
    orderBy: { createdAt: 'desc' }
  })

  // Calculate stats
  const activeProjects = projects.filter(p => p.status === 'ACTIVE').length
  const totalTasks = projects.reduce((sum, p) => sum + p.tasks.length, 0)
  const completedTasks = projects.reduce((sum, p) => 
    sum + p.tasks.filter(t => t.status === 'DONE').length, 0
  )
  const totalCredits = projects.reduce((sum, p) => sum + p.creditBalance, 0)

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-2">
            Manage your projects and track progress
          </p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-shadow"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Project
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
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
          <div className="flex items-center justify-between mb-2">
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
          <div className="flex items-center justify-between mb-2">
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
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">${(totalCredits / 100).toFixed(0)}</p>
          <p className="text-sm text-gray-600 mt-1">Total Credits</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex items-center space-x-4">
        <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium">
          All Projects
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
          Active
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
          On Hold
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
          Completed
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => {
          const progress = project.tasks.length > 0 
            ? Math.round((project.tasks.filter(t => t.status === 'DONE').length / project.tasks.length) * 100)
            : 0

          return (
            <div key={project.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                    {project.description && (
                      <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                    )}
                  </div>
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                    project.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                    project.status === 'ON_HOLD' ? 'bg-yellow-100 text-yellow-800' :
                    project.status === 'COMPLETE' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {project.status.replace('_', ' ')}
                  </span>
                </div>

                {/* Service Info */}
                {project.service && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">SERVICE</p>
                    <p className="text-sm font-medium text-gray-900">{project.service.name}</p>
                  </div>
                )}

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium text-gray-900">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">TASKS</p>
                    <p className="text-sm font-semibold text-gray-900">{project.tasks.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">COMPLETED</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {project.tasks.filter(t => t.status === 'DONE').length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">CREDITS</p>
                    <p className="text-sm font-semibold text-gray-900">
                      ${(project.creditBalance / 100).toFixed(0)}
                    </p>
                  </div>
                </div>

                {/* Recent Tasks */}
                {project.tasks.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">RECENT TASKS</p>
                    <div className="space-y-2">
                      {project.tasks.slice(0, 2).map((task) => (
                        <div key={task.id} className="flex items-center justify-between text-sm">
                          <span className="text-gray-700 truncate flex-1">{task.title}</span>
                          <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                            task.status === 'DONE' ? 'bg-green-100 text-green-700' :
                            task.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' :
                            task.status === 'REVIEW' ? 'bg-orange-100 text-orange-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {task.status.replace('_', ' ')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/dashboard/projects/${project.id}`}
                    className="flex-1 text-center py-2 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-shadow font-medium text-sm"
                  >
                    View Details
                  </Link>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-500 mb-4">Get started by creating your first project.</p>
            <Link 
              href="/dashboard/projects/new"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Project
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}