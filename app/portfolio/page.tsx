// export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { prisma } from '../../lib/prisma'
import PortfolioGrid from '../../components/PortfolioGrid'

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

export default async function PortfolioPage() {
  // Fetch testimonials from database to show alongside portfolio
  const testimonials = await prisma.testimonial.findMany({
    take: 3
  })

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-pink-50 pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium">500+ Successful Projects</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Real Work,{' '}
              <span className="text-gradient from-purple-500 to-pink-500 bg-clip-text text-transparent bg-gradient-to-r">
                Real Results
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Browse through hundreds of successful projects delivered for Australian and New Zealand SMEs. 
              Every project showcases our commitment to quality and results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started" className="btn btn-primary text-lg">
                Start Your Project
                <ArrowRightIcon />
              </Link>
              <Link href="/services" className="btn btn-secondary text-lg">
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Results Metrics Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gradient-primary">500+</div>
              <p className="text-gray-600 mt-1">Projects Completed</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient-primary">200+</div>
              <p className="text-gray-600 mt-1">Happy Clients</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient-primary">95%</div>
              <p className="text-gray-600 mt-1">On-Time Delivery</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient-primary">4.9/5</div>
              <p className="text-gray-600 mt-1">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="section-header">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Portfolio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Filter by service type to see relevant examples for your industry
            </p>
          </div>
          
          <PortfolioGrid />
        </div>
      </section>

      {/* Client Success Stories */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real feedback from real businesses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 rounded-xl p-6">
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.clientName}</p>
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
                  {testimonial.serviceType && (
                    <span className="inline-block mt-2 text-xs px-3 py-1 bg-orange-100 text-orange-800 rounded-full">
                      {testimonial.serviceType}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="section-header">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How We Deliver Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every project follows our proven methodology
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center text-2xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Discovery</h3>
              <p className="text-sm text-gray-600">
                Understanding your goals and requirements
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Strategy</h3>
              <p className="text-sm text-gray-600">
                Creating a tailored plan for success
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 text-white flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Execution</h3>
              <p className="text-sm text-gray-600">
                Implementing with precision and care
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-2xl font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Results</h3>
              <p className="text-sm text-gray-600">
                Measuring success and optimizing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Expertise */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized experience across diverse sectors
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'E-commerce', icon: '🛒' },
              { name: 'Healthcare', icon: '🏥' },
              { name: 'Legal', icon: '⚖️' },
              { name: 'Real Estate', icon: '🏠' },
              { name: 'Education', icon: '🎓' },
              { name: 'Hospitality', icon: '🏨' },
              { name: 'Finance', icon: '💰' },
              { name: 'Technology', icon: '💻' },
              { name: 'Retail', icon: '🏪' },
              { name: 'Construction', icon: '🏗️' },
              { name: 'Fitness', icon: '💪' },
              { name: 'Food & Beverage', icon: '🍽️' }
            ].map((industry) => (
              <div key={industry.name} className="text-center p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="text-4xl mb-2">{industry.icon}</div>
                <p className="text-sm font-medium text-gray-700">{industry.name}</p>
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
                Ready to Start Your Success Story?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join hundreds of businesses achieving remarkable results with Work
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="btn bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4">
                  Start Your Project - $300 Credit
                </Link>
                <Link href="/contact" className="btn border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-4">
                  Discuss Your Needs
                </Link>
              </div>
              <p className="mt-6 text-sm opacity-75">
                No credit card required • Results guaranteed • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}