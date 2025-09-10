export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { prisma } from '../../lib/prisma'
import TeamGrid from '../../components/TeamGrid'

// Icons
const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const StarIcon = () => (
  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

export default async function TeamPage() {
  // Fetch all team members from database
  const teamMembers = await prisma.teamMember.findMany({
    orderBy: { createdAt: 'asc' }
  })

  // Get featured team members (first 3 available)
  const featuredMembers = teamMembers.filter(m => m.available).slice(0, 3)

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium">Hand-Picked Professionals</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Meet Your Future{' '}
              <span className="text-gradient from-green-500 to-emerald-500 bg-clip-text text-transparent bg-gradient-to-r">
                Filipino Team
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Hand-picked professionals ready to become an extension of your business. 
              Choose the perfect team based on skills, experience, and availability.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started" className="btn btn-primary text-lg">
                Choose Your Team - $300 Credit
                <ArrowRightIcon />
              </Link>
              <button className="btn btn-secondary text-lg">
                Watch Team Introduction
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Statistics Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gradient-primary">50+</div>
              <p className="text-gray-600 mt-1">Team Members</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient-primary">8+</div>
              <p className="text-gray-600 mt-1">Years Avg Experience</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient-primary">98%</div>
              <p className="text-gray-600 mt-1">Client Retention</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient-primary">500+</div>
              <p className="text-gray-600 mt-1">Projects Completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Team Members */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="section-header">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Team Members
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our star performers with proven track records
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {featuredMembers.map((member) => {
              const portfolioItems = member.portfolio ? JSON.parse(member.portfolio) : []
              
              return (
                <div key={member.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="bg-gradient-to-br from-orange-100 to-red-100 p-8">
                    <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center mb-4">
                      <span className="text-6xl">👤</span>
                    </div>
                    <div className="flex justify-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </div>
                    <p className="text-center text-gray-700">Top Performer</p>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-center mb-2">{member.name}</h3>
                    <p className="text-center text-gray-600 mb-4">{member.role}</p>
                    
                    {member.bio && (
                      <p className="text-gray-500 mb-4">{member.bio}</p>
                    )}

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Experience</span>
                        <span className="font-medium">8+ years</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Projects</span>
                        <span className="font-medium">150+ completed</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Rating</span>
                        <span className="font-medium">4.9/5.0</span>
                      </div>
                    </div>

                    {member.skills && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Specializations:</p>
                        <div className="flex flex-wrap gap-1">
                          {member.skills.split(',').map((skill, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <button className="w-full btn btn-primary justify-center">
                      Request This Team Member
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Team Grid with Filters */}
      <section className="section bg-white">
        <div className="section-header">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Browse All Team Members
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Filter by service, availability, or search for specific skills
          </p>
        </div>
        
        <TeamGrid teamMembers={teamMembers} />
      </section>

      {/* How Team Selection Works */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="section-header">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Team Selection Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Build your perfect team in minutes, not months
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              { title: 'Browse Portfolios', desc: 'Review work samples and experience' },
              { title: 'Check Availability', desc: 'See who\'s ready to start now' },
              { title: 'Request Members', desc: 'Select your preferred team' },
              { title: 'Get Matched', desc: 'We ensure the perfect fit' },
              { title: 'Build Relationships', desc: 'Work with the same team long-term' }
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center text-2xl font-bold">
                  {idx + 1}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Culture Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Team Culture
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              What makes our Filipino teams exceptional
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="font-semibold mb-2">Top 2% Talent</h3>
              <p className="text-sm text-gray-600">
                Rigorous selection process ensures only the best join our teams
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="font-semibold mb-2">Continuous Training</h3>
              <p className="text-sm text-gray-600">
                Regular upskilling in latest technologies and best practices
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">🏢</span>
              </div>
              <h3 className="font-semibold mb-2">Modern Workspace</h3>
              <p className="text-sm text-gray-600">
                State-of-the-art office facilities in the Philippines
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">💪</span>
              </div>
              <h3 className="font-semibold mb-2">Strong Work Ethic</h3>
              <p className="text-sm text-gray-600">
                Initiative, quality, and reliability in everything we do
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Filipino Talent */}
      <section className="section bg-gradient-to-br from-yellow-50 via-white to-red-50">
        <div className="container">
          <div className="section-header">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Filipino Talent Excels
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The Philippines advantage for your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Cultural & Language Advantages</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckIcon />
                  <div>
                    <p className="font-medium">3rd Largest English-Speaking Country</p>
                    <p className="text-sm text-gray-600">Excellent communication skills</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckIcon />
                  <div>
                    <p className="font-medium">Western Business Culture Alignment</p>
                    <p className="text-sm text-gray-600">Familiar with ANZ business practices</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckIcon />
                  <div>
                    <p className="font-medium">Service-Oriented Mindset</p>
                    <p className="text-sm text-gray-600">Natural hospitality and client focus</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Technical & Professional Excellence</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckIcon />
                  <div>
                    <p className="font-medium">Strong Technical Education</p>
                    <p className="text-sm text-gray-600">IT and digital skills focus in universities</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckIcon />
                  <div>
                    <p className="font-medium">Time Zone Advantages</p>
                    <p className="text-sm text-gray-600">2-3 hours behind Australian Eastern Time</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckIcon />
                  <div>
                    <p className="font-medium">Proven BPO Track Record</p>
                    <p className="text-sm text-gray-600">Global leader in business process outsourcing</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Team Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results delivered by our Filipino professionals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <h4 className="font-semibold">Maria Santos</h4>
                  <p className="text-sm text-gray-600">Senior Developer</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Challenge:</p>
                <p className="text-sm text-gray-600 mb-3">
                  E-commerce site needed complete rebuild in 4 weeks
                </p>
                <p className="text-sm font-medium text-gray-700 mb-1">Result:</p>
                <p className="text-sm text-gray-600">
                  Delivered 2 days early, 40% performance improvement
                </p>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 italic">
                  "Maria's expertise saved our launch. She's now our go-to developer."
                </p>
                <p className="text-sm text-gray-500 mt-2">- Thompson Electrical</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-200 to-cyan-200 flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <h4 className="font-semibold">Juan Dela Cruz</h4>
                  <p className="text-sm text-gray-600">SEO Specialist</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Challenge:</p>
                <p className="text-sm text-gray-600 mb-3">
                  Local law firm invisible on Google
                </p>
                <p className="text-sm font-medium text-gray-700 mb-1">Result:</p>
                <p className="text-sm text-gray-600">
                  Page 1 rankings for 15 keywords in 3 months
                </p>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 italic">
                  "Juan transformed our online presence. Leads up 300%."
                </p>
                <p className="text-sm text-gray-500 mt-2">- Mitchell Legal</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-200 to-emerald-200 flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <h4 className="font-semibold">Ana Reyes</h4>
                  <p className="text-sm text-gray-600">Social Media Manager</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Challenge:</p>
                <p className="text-sm text-gray-600 mb-3">
                  Restaurant needed social media revival
                </p>
                <p className="text-sm font-medium text-gray-700 mb-1">Result:</p>
                <p className="text-sm text-gray-600">
                  10K followers gained, 50% increase in bookings
                </p>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 italic">
                  "Ana's creativity brought our brand to life online."
                </p>
                <p className="text-sm text-gray-500 mt-2">- Bella Vista Restaurant</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Are You a Talented Filipino Professional?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join our growing team and work with amazing Australian and New Zealand clients
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/careers" className="btn bg-white text-purple-600 hover:bg-gray-100">
                View Open Positions
              </Link>
              <button className="btn border-2 border-white text-white hover:bg-white/10">
                Learn About Benefits
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="cta-section">
            <div className="cta-pattern"></div>
            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Meet Your New Team?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Stop managing freelancers. Start working with a dedicated team that knows your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="btn bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4">
                  Start Working With Your Team
                </Link>
                <button className="btn border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-4">
                  Schedule Team Introduction Call
                </button>
              </div>
              <p className="mt-6 text-sm opacity-75">
                $300 free credit • Hand-picked professionals • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}