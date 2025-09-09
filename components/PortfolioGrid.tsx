'use client'

import { useState } from 'react'

const portfolioProjects = [
  {
    id: 1,
    title: 'Thompson Electrical E-commerce Rebuild',
    client: 'Thompson Electrical Services',
    category: 'WEBSITE',
    description: 'Complete e-commerce platform rebuild with modern design and improved performance',
    results: '400% traffic increase, 60% faster load times',
    image: '🛒'
  },
  {
    id: 2,
    title: 'Mitchell Legal SEO Campaign',
    client: 'Mitchell Legal',
    category: 'SEO',
    description: 'Comprehensive SEO strategy to dominate local search results',
    results: 'Page 1 for 15 keywords, 300% lead increase',
    image: '⚖️'
  },
  {
    id: 3,
    title: 'Bella Vista Social Media Revival',
    client: 'Bella Vista Restaurant',
    category: 'SOCIAL',
    description: 'Complete social media strategy and content creation',
    results: '10K new followers, 50% booking increase',
    image: '🍽️'
  },
  {
    id: 4,
    title: 'StartupHub Brand Identity',
    client: 'StartupHub Accelerator',
    category: 'DESIGN',
    description: 'Complete brand identity including logo, colors, and guidelines',
    results: 'Cohesive brand across 50+ touchpoints',
    image: '🚀'
  },
  {
    id: 5,
    title: 'TechFlow Content Marketing',
    client: 'TechFlow Solutions',
    category: 'CONTENT',
    description: 'Monthly blog content strategy and creation',
    results: '200% organic traffic growth in 6 months',
    image: '📝'
  },
  {
    id: 6,
    title: 'RetailPlus Email Campaigns',
    client: 'RetailPlus Store',
    category: 'EMAIL',
    description: 'Automated email marketing campaigns and newsletters',
    results: '35% open rate, 12% conversion rate',
    image: '📧'
  },
  {
    id: 7,
    title: 'GreenScape WordPress Site',
    client: 'GreenScape Landscaping',
    category: 'WEBSITE',
    description: 'Custom WordPress site with booking system',
    results: 'Online bookings up 250%',
    image: '🌿'
  },
  {
    id: 8,
    title: 'FitLife Instagram Growth',
    client: 'FitLife Gym',
    category: 'SOCIAL',
    description: 'Instagram content strategy and community management',
    results: '15K followers in 3 months',
    image: '💪'
  },
  {
    id: 9,
    title: 'CloudTech Google Ads',
    client: 'CloudTech Services',
    category: 'SEO',
    description: 'Google Ads campaign optimization',
    results: 'CPA reduced by 45%, ROI increased 180%',
    image: '☁️'
  },
  {
    id: 10,
    title: 'Artisan Bakery Rebrand',
    client: 'Artisan Bakery',
    category: 'DESIGN',
    description: 'Complete visual rebrand and packaging design',
    results: 'Sales increased 30% post-rebrand',
    image: '🥐'
  },
  {
    id: 11,
    title: 'ConsultPro Lead Magnets',
    client: 'ConsultPro Advisory',
    category: 'CONTENT',
    description: 'Whitepapers and ebooks for lead generation',
    results: '500+ qualified leads per month',
    image: '📊'
  },
  {
    id: 12,
    title: 'StyleHub Abandoned Cart',
    client: 'StyleHub Fashion',
    category: 'EMAIL',
    description: 'Abandoned cart email sequence',
    results: 'Recovered $50K in lost sales',
    image: '👗'
  }
]

export default function PortfolioGrid() {
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  
  const categories = ['ALL', 'WEBSITE', 'SEO', 'SOCIAL', 'DESIGN', 'CONTENT', 'EMAIL']
  
  const filteredProjects = selectedCategory === 'ALL' 
    ? portfolioProjects 
    : portfolioProjects.filter(p => p.category === selectedCategory)

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-lg transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {cat === 'ALL' ? 'All Projects' : cat}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(project => (
          <div 
            key={project.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            {/* Project Image/Icon */}
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-6xl">
              {project.image}
            </div>
            
            {/* Project Info */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium px-3 py-1 bg-orange-100 text-orange-800 rounded-full">
                  {project.category}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-1">{project.client}</p>
              <p className="text-gray-500 text-sm mb-4">{project.description}</p>
              
              <div className="border-t pt-4 mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Results:</p>
                <p className="text-sm text-green-600 font-medium">{project.results}</p>
              </div>
              
              <button className="w-full btn btn-primary justify-center group-hover:shadow-lg">
                View Case Study
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}