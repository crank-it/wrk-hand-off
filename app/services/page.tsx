export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { prisma } from '../../lib/prisma'
import ServiceCategoryNav from '../../components/ServiceCategoryNav'

// Icons for services
const ServiceIcons: Record<string, string> = {
  WEBSITE: '🌐',
  SEO: '📈',
  SOCIAL: '📱',
  DESIGN: '🎨',
  CONTENT: '✍️',
  EMAIL: '📧',
}

// Detailed features for each service
const ServiceFeatures: Record<string, string[]> = {
  'Website Development': [
    'Custom responsive websites',
    'E-commerce platforms',
    'Web applications',
    'WordPress/CMS development',
    'Mobile-first design',
    'API integrations'
  ],
  'SEO Optimization': [
    'Technical SEO audit',
    'Keyword research & strategy',
    'On-page optimization',
    'Link building campaigns',
    'Local SEO optimization',
    'Monthly performance reports'
  ],
  'Social Media Management': [
    'Content calendar creation',
    'Daily posting & scheduling',
    'Community management',
    'Social media advertising',
    'Influencer outreach',
    'Analytics & reporting'
  ],
  'Content Creation': [
    'Blog articles & posts',
    'Website copywriting',
    'Email newsletters',
    'Product descriptions',
    'Case studies & whitepapers',
    'SEO-optimized content'
  ],
  'Email Marketing': [
    'Campaign design & setup',
    'List management & segmentation',
    'Automation workflows',
    'A/B testing optimization',
    'Performance tracking',
    'Template design'
  ],
  'Graphic Design': [
    'Logo & brand identity',
    'Marketing materials',
    'Social media graphics',
    'Presentation design',
    'Infographics',
    'Brand guidelines'
  ]
}

// Turnaround times
const ServiceTurnaround: Record<string, string> = {
  'Website Development': '2-4 weeks',
  'SEO Optimization': 'Ongoing monthly',
  'Social Media Management': 'Daily delivery',
  'Content Creation': '2-3 days',
  'Email Marketing': '3-5 days',
  'Graphic Design': '3-5 days'
}

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

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

export default async function ServicesPage() {
  // Fetch all services from database
  const services = await prisma.service.findMany({
    orderBy: { createdAt: 'asc' }
  })

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 via-white to-red-50 pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Comprehensive BPO Services for{' '}
              <span className="text-gradient-primary">Australian & NZ SMEs</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Agency-quality work at 70% less cost. All managed through one unified platform. 
              No more juggling freelancers or email chaos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started" className="btn btn-primary text-lg">
                Start with $300 Free Credit
                <ArrowRightIcon />
              </Link>
              <Link href="/how-it-works" className="btn btn-secondary text-lg">
                See How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Navigation */}
      <ServiceCategoryNav />

      {/* Main Services Grid */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                id={`category-${service.category}`}
                className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {/* Service Header */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center text-3xl">
                      {ServiceIcons[service.category]}
                    </div>
                    <span className="badge badge-primary">
                      {service.pricingModel.replace('_', ' ')}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>

                {/* Service Features */}
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">What's Included:</h4>
                  <ul className="space-y-3 mb-6">
                    {ServiceFeatures[service.name]?.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckIcon />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Pricing & Turnaround */}
                  <div className="space-y-3 py-4 border-t border-gray-100">
                    {service.basePrice && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Starting from</span>
                        <span className="text-2xl font-bold text-gray-900">
                          ${(service.basePrice / 100).toLocaleString()}
                          {service.pricingModel === 'PER_MINUTE' && '/min'}
                          {service.pricingModel === 'RETAINER' && '/mo'}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 flex items-center space-x-1">
                        <ClockIcon />
                        <span>Turnaround</span>
                      </span>
                      <span className="font-medium text-gray-900">
                        {ServiceTurnaround[service.name]}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link 
                    href="/get-started" 
                    className="w-full btn btn-primary mt-6 justify-center group-hover:shadow-lg"
                  >
                    Get Started
                    <ArrowRightIcon />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Our Services Work */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Our Services Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, transparent, and efficient. No complicated contracts or hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              { step: '1', title: 'Choose Service', desc: 'Select the service package that fits your needs' },
              { step: '2', title: 'Get Matched', desc: 'We match you with the perfect Filipino team' },
              { step: '3', title: 'Brief Your Team', desc: 'Submit your requirements through our platform' },
              { step: '4', title: 'Review & Iterate', desc: 'Get updates and provide feedback in real-time' },
              { step: '5', title: 'Receive Results', desc: 'Download your deliverables and track ROI' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Models Explained */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="section-header">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Transparent Pricing Models
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the billing model that works best for your business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="card">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-2xl mb-4">
                📋
              </div>
              <h3 className="text-xl font-semibold mb-3">Project-Based</h3>
              <p className="text-gray-600 mb-4">
                Fixed price for defined scope. Perfect for one-off projects like websites or design work.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckIcon />
                  <span className="text-sm text-gray-600">Fixed cost upfront</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckIcon />
                  <span className="text-sm text-gray-600">Clear deliverables</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckIcon />
                  <span className="text-sm text-gray-600">Defined timeline</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center text-2xl mb-4">
                ⏱️
              </div>
              <h3 className="text-xl font-semibold mb-3">Per-Minute Billing</h3>
              <p className="text-gray-600 mb-4">
                Pay only for the time used. Ideal for ongoing content creation and support tasks.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckIcon />
                  <span className="text-sm text-gray-600">No minimum commitment</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckIcon />
                  <span className="text-sm text-gray-600">Detailed time tracking</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckIcon />
                  <span className="text-sm text-gray-600">Scale up or down anytime</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-2xl mb-4">
                🔄
              </div>
              <h3 className="text-xl font-semibold mb-3">Monthly Retainer</h3>
              <p className="text-gray-600 mb-4">
                Predictable monthly cost for ongoing services like SEO and social media management.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckIcon />
                  <span className="text-sm text-gray-600">Priority support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckIcon />
                  <span className="text-sm text-gray-600">Dedicated team</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckIcon />
                  <span className="text-sm text-gray-600">Monthly reports</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Work */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Australian & NZ Businesses Choose Work
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: 'Dedicated Filipino Team',
                desc: 'Not random freelancers. Your own consistent team that learns your business.',
                icon: '👥'
              },
              {
                title: 'No Email Chaos',
                desc: 'Everything in one platform. No more lost emails or miscommunication.',
                icon: '📨'
              },
              {
                title: 'Built-in Project Management',
                desc: 'Track progress, give feedback, and download deliverables in one place.',
                icon: '📊'
              },
              {
                title: 'Quality Guarantee',
                desc: 'Unlimited revisions until you\'re satisfied. Your success is our success.',
                icon: '✨'
              },
              {
                title: 'Australian Business Hours',
                desc: 'Our teams work in your timezone. Real-time collaboration when you need it.',
                icon: '🕐'
              },
              {
                title: '70% Cost Savings',
                desc: 'Agency quality at offshore prices. Stretch your budget further.',
                icon: '💰'
              }
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="section-header">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: 'How quickly can we start working together?',
                a: 'Once approved, you\'ll receive your $300 credit instantly and can choose your team immediately. Most clients are up and running within 24 hours.'
              },
              {
                q: 'What if I\'m not satisfied with the work?',
                a: 'We offer unlimited revisions on all work. If you\'re still not happy, we\'ll reassign you to a different team or refund unused credits.'
              },
              {
                q: 'Can I change services or scale up/down anytime?',
                a: 'Absolutely! Switch between services, add team members, or adjust your plan anytime through your dashboard. No lock-in contracts.'
              },
              {
                q: 'How does the billing work exactly?',
                a: 'Choose between project-based (fixed price), per-minute (pay for time used), or monthly retainer. All billing is transparent and managed through Stripe.'
              },
              {
                q: 'What\'s included in each service package?',
                a: 'Each service includes dedicated team members, project management, quality assurance, revisions, and all deliverables. Check individual service cards for specifics.'
              },
              {
                q: 'Do you work with businesses outside Australia and New Zealand?',
                a: 'While we focus on ANZ SMEs, we welcome businesses from anywhere. Our teams can adjust to different timezones as needed.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-3">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
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
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join hundreds of Australian and New Zealand SMEs already saving 70% on their digital services
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="btn bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4">
                  Claim Your $300 Credit
                </Link>
                <Link href="/contact" className="btn border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-4">
                  Talk to Our Team
                </Link>
              </div>
              <p className="mt-6 text-sm opacity-75">
                No credit card required • Instant approval • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}