'use client'

import { useState } from 'react'

interface TeamFiltersProps {
  onFilterChange: (filters: {
    service: string
    availability: string
    search: string
  }) => void
}

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

export default function TeamFilters({ onFilterChange }: TeamFiltersProps) {
  const [service, setService] = useState('all')
  const [availability, setAvailability] = useState('all')
  const [search, setSearch] = useState('')

  const handleFilterChange = (newFilters: Partial<{ service: string; availability: string; search: string }>) => {
    const updated = {
      service: newFilters.service ?? service,
      availability: newFilters.availability ?? availability,
      search: newFilters.search ?? search
    }
    setService(updated.service)
    setAvailability(updated.availability)
    setSearch(updated.search)
    onFilterChange(updated)
  }

  return (
    <div className="sticky top-16 z-30 bg-white border-b border-gray-100 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search Bar */}
          <div className="flex-grow max-w-md">
            <div className="relative">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search by name or skill..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={search}
                onChange={(e) => handleFilterChange({ search: e.target.value })}
              />
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
            </div>
          </div>

          {/* Service Filter */}
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={service}
            onChange={(e) => handleFilterChange({ service: e.target.value })}
          >
            <option value="all">All Services</option>
            <option value="WEBSITE">Web Development</option>
            <option value="SEO">SEO</option>
            <option value="SOCIAL">Social Media</option>
            <option value="DESIGN">Design</option>
            <option value="CONTENT">Content</option>
            <option value="EMAIL">Email Marketing</option>
          </select>

          {/* Availability Filter */}
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={availability}
            onChange={(e) => handleFilterChange({ availability: e.target.value })}
          >
            <option value="all">All Team Members</option>
            <option value="available">Available Now</option>
            <option value="busy">Join Waitlist</option>
          </select>

          {/* Clear Filters */}
          {(service !== 'all' || availability !== 'all' || search) && (
            <button
              onClick={() => {
                setService('all')
                setAvailability('all')
                setSearch('')
                onFilterChange({ service: 'all', availability: 'all', search: '' })
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  )
}