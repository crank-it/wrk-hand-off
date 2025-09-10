export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { prisma } from '../lib/prisma'

// Hero Icons (using simple SVG icons)
const CheckIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const StarIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

export default async function HomePage() {
  // Fetch data for the homepage
  const [services, testimonials, teamMembers] = await Promise.all([
    prisma.service.findMany({ take: 6 }),
    prisma.testimonial.findMany({ take: 3 }),
    prisma.teamMember.findMany({ where: { available: true }, take: 4 })
  ])

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-red-50 pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full mb-6">
                <span className="text-sm font-medium">Limited Time Offer</span>
                <span className="text-sm">$300 Free Credit</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Stop juggling freelancers and{' '}
                <span className="text-gradient-primary">overpaying agencies</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Your bespoke Filipino team working for your business. Get local agency quality at offshore cost with our dedicated professionals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/get-started" className="btn btn-primary text-lg">
                  Choose Your Team Today
                  <ArrowRightIcon />
                </Link>
                <Link href="/how-it-works" className="btn btn-secondary text-lg">
                  See How It Works
                </Link>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckIcon />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckIcon />
                  <span>Hand-picked teams</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckIcon />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
            
            <div className="relative lg:pl-12">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-br from-orange-400 to-red-500 p-8 text-white">
                  <h3 className="text-2xl font-semibold mb-4">Your Dashboard Preview</h3>
                  <div className="space-y-4">
                    <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span>Trial Credit Balance</span>
                        <span className="text-2xl font-bold">$300.00</span>
                      </div>
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span>Active Projects</span>
                        <span className="text-2xl font-bold">3</span>
                      </div>
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span>Team Members</span>
                        <span className="text-2xl font-bold">5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-yellow-400 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Australian & NZ SMEs Choose Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We bridge the gap between expensive local agencies and unreliable freelancer platforms
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Team</h3>
              <p className="text-gray-600">
                Browse portfolios and select the perfect team for your business needs
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">70% Cost Savings</h3>
              <p className="text-gray-600">
                Get agency-quality work at a fraction of the local market price
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">All-in-One Platform</h3>
              <p className="text-gray-600">
                No more email chaos - manage everything through our unified dashboard
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="section-header">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive BPO Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything your business needs to thrive online, all under one roof
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon">
                  <span className="text-2xl">
                    {service.category === 'WEBSITE' && '🌐'}
                    {service.category === 'SEO' && '📈'}
                    {service.category === 'SOCIAL' && '📱'}
                    {service.category === 'DESIGN' && '🎨'}
                    {service.category === 'CONTENT' && '✍️'}
                    {service.category === 'EMAIL' && '📧'}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="badge badge-primary">
                    {service.pricingModel.replace('_', ' ')}
                  </span>
                  {service.basePrice && (
                    <span className="text-sm text-gray-500">
                      From ${(service.basePrice / 100).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/services" className="btn btn-primary">
              View All Services
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Start Working With Your Team in 4 Simple Steps
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="process-step">
              <div className="process-number">1</div>
              <h3 className="font-semibold mb-2">Sign Up</h3>
              <p className="text-sm text-gray-600">
                Quick qualification process to ensure we're a good fit
              </p>
            </div>
            
            <div className="process-step">
              <div className="process-number">2</div>
              <h3 className="font-semibold mb-2">Get $300 Credit</h3>
              <p className="text-sm text-gray-600">
                Instant credit to try our services risk-free
              </p>
            </div>
            
            <div className="process-step">
              <div className="process-number">3</div>
              <h3 className="font-semibold mb-2">Choose Your Team</h3>
              <p className="text-sm text-gray-600">
                Browse portfolios and select your perfect team
              </p>
            </div>
            
            <div className="process-step">
              <div className="process-number">4</div>
              <h3 className="font-semibold mb-2">Start Growing</h3>
              <p className="text-sm text-gray-600">
                Watch your business thrive with dedicated support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="section-header">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Your Future Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hand-picked Filipino professionals ready to work for your business
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-card">
                <div className="aspect-square bg-gradient-to-br from-orange-200 to-red-200 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
                      <span className="text-4xl">👤</span>
                    </div>
                    <div className="badge badge-success">Available</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{member.role}</p>
                  <p className="text-sm text-gray-500 mb-3">{member.bio}</p>
                  <div className="flex flex-wrap gap-1">
                    {member.skills?.split(',').slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/team" className="btn btn-primary">
              Browse All Teams
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.clientName}</p>
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
                </div>
              </div>
            ))}
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
                Ready to Build Your Bespoke Team?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join hundreds of Australian and New Zealand SMEs who've transformed their business with Work
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="btn bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4">
                  Start Your Free Trial
                </Link>
                <Link href="/contact" className="btn border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-4">
                  Talk to Our Team
                </Link>
              </div>
              <p className="mt-6 text-sm opacity-75">
                $300 free credit • No credit card required • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}