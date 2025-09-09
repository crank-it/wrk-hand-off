'use client'

import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

interface TeamMember {
  id: string
  name: string
  role: string
  skills: string | null
  available: boolean
}

interface ProjectTeamMember {
  id: string
  teamMemberId: string
  role: string | null
  hoursPerWeek: number | null
  teamMember: TeamMember
}

interface TeamAssignmentModalProps {
  isOpen: boolean
  onClose: () => void
  projectId: string
  currentTeam: ProjectTeamMember[]
  onTeamUpdated: () => void
}

export function TeamAssignmentModal({ 
  isOpen, 
  onClose, 
  projectId, 
  currentTeam, 
  onTeamUpdated 
}: TeamAssignmentModalProps) {
  const [loading, setLoading] = useState(false)
  const [allTeamMembers, setAllTeamMembers] = useState<TeamMember[]>([])
  const [selectedMembers, setSelectedMembers] = useState<Map<string, { role: string; hours: number }>>(new Map())

  useEffect(() => {
    if (isOpen) {
      fetchTeamMembers()
      // Initialize selected members from current team
      const initial = new Map()
      currentTeam.forEach(pt => {
        initial.set(pt.teamMemberId, {
          role: pt.role || pt.teamMember.role,
          hours: pt.hoursPerWeek || 40
        })
      })
      setSelectedMembers(initial)
    }
  }, [isOpen, currentTeam])

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('/api/dashboard/team')
      if (response.ok) {
        const data = await response.json()
        setAllTeamMembers(data)
      }
    } catch (error) {
      console.error('Failed to fetch team members:', error)
    }
  }

  const toggleMember = (memberId: string, memberRole: string) => {
    const newSelected = new Map(selectedMembers)
    if (newSelected.has(memberId)) {
      newSelected.delete(memberId)
    } else {
      newSelected.set(memberId, { role: memberRole, hours: 40 })
    }
    setSelectedMembers(newSelected)
  }

  const updateMemberDetails = (memberId: string, field: 'role' | 'hours', value: string | number) => {
    const newSelected = new Map(selectedMembers)
    const current = newSelected.get(memberId)
    if (current) {
      newSelected.set(memberId, {
        ...current,
        [field]: value
      })
      setSelectedMembers(newSelected)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)

    try {
      const teamData = Array.from(selectedMembers.entries()).map(([memberId, details]) => ({
        teamMemberId: memberId,
        role: details.role,
        hoursPerWeek: details.hours
      }))

      const response = await fetch(`/api/dashboard/projects/${projectId}/team`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ team: teamData }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update team')
      }

      toast.success('Team updated successfully!')
      onTeamUpdated()
      onClose()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Manage Team Assignment</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Select team members to assign to this project and specify their roles and weekly hours.
          </p>

          {/* Team Members List */}
          <div className="space-y-4 mb-6">
            {allTeamMembers.map((member) => {
              const isSelected = selectedMembers.has(member.id)
              const memberDetails = selectedMembers.get(member.id)
              
              return (
                <div 
                  key={member.id}
                  className={`border rounded-lg p-4 transition-colors ${
                    isSelected ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleMember(member.id, member.role)}
                      className="mt-1 mr-3 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{member.name}</h4>
                          <p className="text-sm text-gray-600">{member.role}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          member.available 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {member.available ? 'Available' : 'Busy'}
                        </span>
                      </div>
                      
                      {member.skills && (
                        <div className="mb-3">
                          <p className="text-xs text-gray-500">Skills:</p>
                          <p className="text-sm text-gray-700">{member.skills}</p>
                        </div>
                      )}
                      
                      {isSelected && (
                        <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-gray-200">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Project Role
                            </label>
                            <input
                              type="text"
                              value={memberDetails?.role || ''}
                              onChange={(e) => updateMemberDetails(member.id, 'role', e.target.value)}
                              className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
                              placeholder={member.role}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Hours/Week
                            </label>
                            <input
                              type="number"
                              min="1"
                              max="40"
                              value={memberDetails?.hours || 40}
                              onChange={(e) => updateMemberDetails(member.id, 'hours', parseInt(e.target.value))}
                              className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Summary */}
          {selectedMembers.size > 0 && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Team Summary</h3>
              <p className="text-sm text-gray-600">
                {selectedMembers.size} team member{selectedMembers.size > 1 ? 's' : ''} selected
              </p>
              <p className="text-sm text-gray-600">
                Total hours per week: {Array.from(selectedMembers.values()).reduce((sum, m) => sum + m.hours, 0)}
              </p>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading || selectedMembers.size === 0}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Team'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}