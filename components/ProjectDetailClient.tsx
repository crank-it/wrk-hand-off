'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TeamAssignmentModal } from './TeamAssignmentModal'
import { CreateTaskModal } from './CreateTaskModal'
import { EditProjectModal } from './EditProjectModal'
import { useRouter } from 'next/navigation'

interface ProjectDetailClientProps {
  project: any
  projectTeam: any[]
}

export function ProjectDetailClient({ project, projectTeam: initialTeam }: ProjectDetailClientProps) {
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false)
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [projectTeam, setProjectTeam] = useState(initialTeam)
  const router = useRouter()

  const completedTasks = project.tasks.filter((t: any) => t.status === 'DONE').length
  const progress = project.tasks.length > 0 
    ? Math.round((completedTasks / project.tasks.length) * 100)
    : 0

  const tasksByStatus = {
    TODO: project.tasks.filter((t: any) => t.status === 'TODO'),
    IN_PROGRESS: project.tasks.filter((t: any) => t.status === 'IN_PROGRESS'),
    REVIEW: project.tasks.filter((t: any) => t.status === 'REVIEW'),
    DONE: project.tasks.filter((t: any) => t.status === 'DONE')
  }

  const refreshTeam = async () => {
    try {
      const response = await fetch(`/api/dashboard/projects/${project.id}/team`)
      if (response.ok) {
        const data = await response.json()
        setProjectTeam(data)
      }
    } catch (error) {
      console.error('Failed to refresh team:', error)
    }
  }

  const refreshPage = () => {
    router.refresh()
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <Link 
          href="/dashboard/projects"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            {project.description && (
              <p className="text-gray-600 mt-2">{project.description}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 text-sm rounded-full font-medium ${
              project.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
              project.status === 'ON_HOLD' ? 'bg-yellow-100 text-yellow-800' :
              project.status === 'COMPLETE' ? 'bg-blue-100 text-blue-800' :
              'bg-red-100 text-red-800'
            }`}>
              {project.status.replace('_', ' ')}
            </span>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Edit Project"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Project Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{project.tasks.length}</p>
          <p className="text-sm text-gray-600 mt-1">Total Tasks</p>
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
          <p className="text-sm text-gray-600 mt-1">Completed</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{progress}%</p>
          <p className="text-sm text-gray-600 mt-1">Progress</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            ${(project.creditBalance / 100).toFixed(0)}
          </p>
          <p className="text-sm text-gray-600 mt-1">Credits</p>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Assigned Team</h2>
          <button
            onClick={() => setIsTeamModalOpen(true)}
            className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm rounded-lg hover:shadow-lg transition-shadow"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Manage Team
          </button>
        </div>

        {projectTeam.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-gray-500 mb-4">No team members assigned yet</p>
            <button
              onClick={() => setIsTeamModalOpen(true)}
              className="text-orange-600 hover:text-orange-500 font-medium"
            >
              Assign Team Members
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectTeam.map((member) => (
              <div key={member.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-semibold">
                  {member.teamMember.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{member.teamMember.name}</p>
                  <p className="text-sm text-gray-600">{member.role || member.teamMember.role}</p>
                  {member.hoursPerWeek && (
                    <p className="text-xs text-gray-500 mt-1">{member.hoursPerWeek} hrs/week</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Service Information */}
      {project.service && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Service Type</p>
              <p className="font-medium text-gray-900">{project.service.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Category</p>
              <p className="font-medium text-gray-900">{project.service.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Pricing Model</p>
              <p className="font-medium text-gray-900">{project.service.pricingModel.replace('_', ' ')}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tasks Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
            <button 
              onClick={() => setIsTaskModalOpen(true)}
              className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm rounded-lg hover:shadow-lg transition-shadow"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Task
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Overall Progress</span>
            <span className="text-sm font-medium text-gray-900">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Task List */}
        <div className="divide-y divide-gray-200">
          {project.tasks.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
              <p className="text-gray-500 mb-4">Add tasks to track progress on this project.</p>
              <button 
                onClick={() => setIsTaskModalOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create First Task
              </button>
            </div>
          ) : (
            <>
              {/* Task Items */}
              {project.tasks.map((task: any) => (
                <div key={task.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`mt-1 w-2 h-2 rounded-full ${
                        task.status === 'DONE' ? 'bg-green-500' :
                        task.status === 'IN_PROGRESS' ? 'bg-blue-500' :
                        task.status === 'REVIEW' ? 'bg-orange-500' :
                        'bg-gray-400'
                      }`} />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                        {task.description && (
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        )}
                        <div className="flex items-center space-x-4 mt-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            task.status === 'DONE' ? 'bg-green-100 text-green-700' :
                            task.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' :
                            task.status === 'REVIEW' ? 'bg-orange-100 text-orange-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {task.status.replace('_', ' ')}
                          </span>
                          {task.dueDate && (
                            <span className="text-xs text-gray-500">
                              Due {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            Created {new Date(task.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <TeamAssignmentModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        projectId={project.id}
        currentTeam={projectTeam}
        onTeamUpdated={refreshTeam}
      />

      <CreateTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onTaskCreated={refreshPage}
      />

      <EditProjectModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        project={project}
        onProjectUpdated={refreshPage}
      />
    </div>
  )
}