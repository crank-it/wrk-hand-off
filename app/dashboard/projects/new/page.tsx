'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function NewProjectPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      serviceId: formData.get('serviceId') as string || undefined,
      status: 'ACTIVE'
    }

    try {
      const response = await fetch('/api/dashboard/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create project')
      }

      const project = await response.json()
      toast.success('Project created successfully!')
      router.push(`/dashboard/projects/${project.id}`)
      router.refresh()
    } catch (err: any) {
      setError(err.message)
      toast.error(err.message || 'Failed to create project')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
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
        <h1 className="text-3xl font-bold text-gray-900">Create New Project</h1>
        <p className="text-gray-600 mt-2">
          Start a new project and assign your team to work on it
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Name */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Project Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., Website Redesign, SEO Campaign"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Describe your project goals and requirements..."
              />
            </div>
          </div>
        </div>

        {/* Service Selection */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Service</h2>
          <p className="text-sm text-gray-600 mb-4">
            Choose the primary service for this project (optional)
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: 'website', name: 'Website Development', icon: '🌐', color: 'blue' },
              { id: 'seo', name: 'SEO Optimization', icon: '📈', color: 'green' },
              { id: 'social', name: 'Social Media', icon: '📱', color: 'purple' },
              { id: 'design', name: 'Graphic Design', icon: '🎨', color: 'pink' },
              { id: 'content', name: 'Content Creation', icon: '✍️', color: 'orange' },
              { id: 'email', name: 'Email Marketing', icon: '📧', color: 'red' },
            ].map((service) => (
              <label
                key={service.id}
                className="relative flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-orange-300 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name="serviceId"
                  value={service.id}
                  className="sr-only"
                />
                <span className="text-2xl mr-3">{service.icon}</span>
                <span className="font-medium text-gray-900">{service.name}</span>
                <div className="absolute inset-0 border-2 border-transparent rounded-lg pointer-events-none peer-checked:border-orange-500" />
              </label>
            ))}
          </div>
        </div>

        {/* Initial Credit Allocation */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Credit Allocation</h2>
          <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Trial Credits</p>
                <p className="text-sm text-gray-600 mt-1">
                  Your new project will start with $300 in trial credits
                </p>
              </div>
              <div className="text-2xl font-bold text-orange-600">$300</div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Form Actions */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard/projects"
            className="px-6 py-3 text-gray-700 hover:text-gray-900 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  )
}