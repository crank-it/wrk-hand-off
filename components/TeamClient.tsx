'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

interface TeamMember {
  id: string
  name: string
  role: string
  bio: string | null
  skills: string | null
  available: boolean
  portfolio: string | null
}

interface TeamClientProps {
  initialMembers: TeamMember[]
}

export function TeamClient({ initialMembers }: TeamClientProps) {
  const [teamMembers, setTeamMembers] = useState(initialMembers)
  const [filter, setFilter] = useState<'all' | 'available' | 'busy'>('all')
  const [loading, setLoading] = useState<string | null>(null)

  const toggleAvailability = async (memberId: string) => {
    setLoading(memberId)
    const member = teamMembers.find(m => m.id === memberId)
    if (!member) return

    try {
      const response = await fetch(`/api/dashboard/team/${memberId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          available: !member.available
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update availability')
      }

      const updatedMember = await response.json()
      setTeamMembers(members => 
        members.map(m => m.id === memberId ? updatedMember : m)
      )
      
      toast.success(`${member.name} is now ${!member.available ? 'available' : 'busy'}`)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(null)
    }
  }

  const filteredMembers = teamMembers.filter(member => {
    if (filter === 'available') return member.available
    if (filter === 'busy') return !member.available
    return true
  })

  const availableCount = teamMembers.filter(m => m.available).length
  const busyCount = teamMembers.filter(m => !m.available).length

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Team</h1>
        <p className="text-gray-600 mt-2">
          Meet your dedicated Filipino team members ready to work on your projects
        </p>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{availableCount}</p>
          <p className="text-sm text-gray-600 mt-1">Available Now</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
          <p className="text-sm text-gray-600 mt-1">Total Members</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{busyCount}</p>
          <p className="text-sm text-gray-600 mt-1">Currently Busy</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          All Members ({teamMembers.length})
        </button>
        <button
          onClick={() => setFilter('available')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'available'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Available ({availableCount})
        </button>
        <button
          onClick={() => setFilter('busy')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'busy'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Busy ({busyCount})
        </button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            {/* Member Avatar */}
            <div className="aspect-square bg-gradient-to-br from-orange-200 to-red-200 p-8 relative">
              <div className="flex items-center justify-center h-full">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-4xl font-bold text-gray-700">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              
              {/* Availability Toggle */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => toggleAvailability(member.id)}
                  disabled={loading === member.id}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    member.available 
                      ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                      : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  } disabled:opacity-50`}
                >
                  {loading === member.id ? 'Updating...' : (member.available ? 'Available' : 'Busy')}
                </button>
              </div>
            </div>

            {/* Member Info */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{member.role}</p>
              
              {member.bio && (
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{member.bio}</p>
              )}

              {/* Skills */}
              {member.skills && (
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.split(',').slice(0, 3).map((skill, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {skill.trim()}
                      </span>
                    ))}
                    {member.skills.split(',').length > 3 && (
                      <span className="text-xs text-gray-500">+{member.skills.split(',').length - 3} more</span>
                    )}
                  </div>
                </div>
              )}

              {/* Portfolio Links */}
              {member.portfolio && (() => {
                try {
                  const portfolio = JSON.parse(member.portfolio)
                  if (Array.isArray(portfolio) && portfolio.length > 0) {
                    return (
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-700">Portfolio</p>
                        {portfolio.slice(0, 2).map((item: any, index: number) => (
                          <a
                            key={index}
                            href={item.url}
                            className="text-xs text-orange-600 hover:text-orange-500 block truncate"
                          >
                            {item.title}
                          </a>
                        ))}
                      </div>
                    )
                  }
                } catch (e) {
                  return null
                }
              })()}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
          <p className="text-gray-500">
            {filter === 'available' ? 'No available team members at the moment.' : 'All team members are currently available.'}
          </p>
        </div>
      )}
    </div>
  )
}