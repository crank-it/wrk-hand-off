'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import TeamFilters from './TeamFilters'

interface TeamMember {
  id: string
  name: string
  role: string
  bio: string | null
  skills: string | null
  available: boolean
  portfolio: string | null
}

interface TeamGridProps {
  teamMembers: TeamMember[]
}

export default function TeamGrid({ teamMembers }: TeamGridProps) {
  const [filters, setFilters] = useState({
    service: 'all',
    availability: 'all',
    search: ''
  })

  const filteredMembers = useMemo(() => {
    return teamMembers.filter(member => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesName = member.name.toLowerCase().includes(searchLower)
        const matchesRole = member.role.toLowerCase().includes(searchLower)
        const matchesSkills = member.skills?.toLowerCase().includes(searchLower)
        if (!matchesName && !matchesRole && !matchesSkills) return false
      }

      // Availability filter
      if (filters.availability === 'available' && !member.available) return false
      if (filters.availability === 'busy' && member.available) return false

      // Service filter (based on role/skills)
      if (filters.service !== 'all') {
        const roleMatch = member.role.toLowerCase().includes(filters.service.toLowerCase())
        const skillsMatch = member.skills?.toLowerCase().includes(filters.service.toLowerCase())
        if (!roleMatch && !skillsMatch) return false
      }

      return true
    })
  }, [teamMembers, filters])

  return (
    <>
      <TeamFilters onFilterChange={setFilters} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member) => {
            const portfolioItems = member.portfolio ? JSON.parse(member.portfolio) : []
            
            return (
              <div key={member.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
                {/* Profile Image Area */}
                <div className="aspect-square bg-gradient-to-br from-orange-200 to-red-200 p-8 relative">
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      member.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {member.available ? 'Available' : 'Waitlist'}
                    </span>
                  </div>
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
                        <span className="text-4xl">👤</span>
                      </div>
                      {portfolioItems.length > 0 && (
                        <p className="text-sm text-gray-700">
                          {portfolioItems.length} Portfolio Items
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-gray-600 mb-3">{member.role}</p>
                  
                  {member.bio && (
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {member.bio}
                    </p>
                  )}

                  {/* Skills */}
                  {member.skills && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {member.skills.split(',').slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {skill.trim()}
                        </span>
                      ))}
                      {member.skills.split(',').length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{member.skills.split(',').length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* CTA Button */}
                  <button className="w-full btn btn-primary justify-center group-hover:shadow-lg">
                    View Portfolio
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No team members found matching your criteria.</p>
            <button
              onClick={() => setFilters({ service: 'all', availability: 'all', search: '' })}
              className="mt-4 text-orange-600 hover:text-orange-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </>
  )
}