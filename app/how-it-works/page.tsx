import Link from 'next/link'
import ProcessFAQ from '../../components/ProcessFAQ'

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

const XIcon = () => (
  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6">
              <ClockIcon />
              <span className="text-sm font-medium">Get Started in 24 Hours</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              From Sign-Up to Success in{' '}
              <span className="text-gradient from-blue-500 to-cyan-500 bg-clip-text text-transparent bg-gradient-to-r">
                24 Hours
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              No complicated contracts. No lengthy onboarding. Just click buttons and get results.
              See exactly how our platform works before you commit.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started" className="btn btn-primary text-lg">
                Start Your Free Trial
                <ArrowRightIcon />
              </Link>
              <button className="btn btn-secondary text-lg">
                Watch Demo Video
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Process Steps */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Journey to Better Business Outcomes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four simple steps to transform how you work with offshore teams
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="relative flex items-start mb-12">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center text-2xl font-bold">
                  1
                </div>
              </div>
              <div className="ml-8 flex-grow">
                <div className="bg-gradient-to-r from-orange-50 to-transparent p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-3">Quick Sign-Up & Qualification</h3>
                  <p className="text-gray-600 mb-4">
                    Simple form with your business details. Our team reviews and approves within 2 hours.
                    Once approved, you instantly receive $300 in credits.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <CheckIcon />
                      <div>
                        <p className="font-medium">5-minute application</p>
                        <p className="text-sm text-gray-500">Basic business information</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckIcon />
                      <div>
                        <p className="font-medium">Hand-moderated approval</p>
                        <p className="text-sm text-gray-500">Ensures quality fit</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckIcon />
                      <div>
                        <p className="font-medium">Instant $300 credit</p>
                        <p className="text-sm text-gray-500">No payment required</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckIcon />
                      <div>
                        <p className="font-medium">Welcome onboarding</p>
                        <p className="text-sm text-gray-500">Platform walkthrough</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Connecting Line */}
              <div className="absolute left-8 top-20 w-0.5 h-24 bg-gray-300"></div>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-start mb-12">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center text-2xl font-bold">
                  2
                </div>
              </div>
              <div className="ml-8 flex-grow">
                <div className="bg-gradient-to-r from-blue-50 to-transparent p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-3">Choose Your Perfect Team</h3>
                  <p className="text-gray-600 mb-4">
                    Browse portfolios of pre-vetted Filipino professionals. Select based on skills, 
                    experience, and availability. Join a waitlist if your preferred team is busy.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <CheckIcon />
                      <div>
                        <p className="font-medium">Portfolio browsing</p>
                        <p className="text-sm text-gray-500">See actual work samples</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckIcon />
                      <div>
                        <p className="font-medium">Skill matching</p>
                        <p className="text-sm text-gray-500">Find the right expertise</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckIcon />
                      <div>
                        <p className="font-medium">Availability status</p>
                        <p className="text-sm text-gray-500">Real-time team status</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckIcon />
                      <div>
                        <p className="font-medium">Team consistency</p>
                        <p className="text-sm text-gray-500">Same people every time</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Connecting Line */}
              <div className="absolute left-8 top-20 w-0.5 h-24 bg-gray-300"></div>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-start mb-12">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 text-white flex items-center justify-center text-2xl font-bold">
                  3
                </div>
              </div>
              <div className="ml-8 flex-grow">
                <div className="bg-gradient-to-r from-green-50 to-transparent p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-3">Submit Your First Task</h3>
                  <p className="text-gray-600 mb-4">
                    Use our pre-built templates for common tasks or create a custom brief. 
                    Attach brand assets, set priorities, and your team gets to work immediately.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <CheckIcon />
                      <div>
                        <p className="font-medium">Task templates</p>
                        <p className="text-sm text-gray-500">Quick-start common projects</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckIcon />
                      <div>
                        <p className="font-medium">Custom briefs</p>
                        <p className="text-sm text-gray-500">Detailed requirements</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckIcon />
                      <div>
                        <p className="font-medium">File attachments</p>
                        <p className="text-sm text-gray-500">Brand assets & references</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckIcon />
                      <div>
                        <p className="font-medium">Priority settings</p>
                        <p className="text-sm text-gray-500">Urgent or standard delivery</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Connecting Line */}
              <div className="absolute left-8 top-20 w-0.5 h-24 bg-gray-300"></div>
            </div>

            {/* Step 4 */}
            <div className="relative flex items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-2xl font-bold">
                  4
                </div>
              </div>
              <div className="ml-8 flex-grow">
                <div className="bg-gradient-to-r from-purple-50 to-transparent p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-3">Track, Collaborate & Download</h3>
                  <p className="text-gray-600 mb-4">
                    Watch progress in real-time, provide feedback through the platform, 
                    request revisions, and download final deliverables. All without a single email.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <CheckIcon />
                      <div>
                        <p className="font-medium">Real-time updates</p>
                        <p className="text-sm text-gray-500">Progress notifications</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckIcon />
                      <div>
                        <p className="font-medium">In-app messaging</p>
                        <p className="text-sm text-gray-500">Direct team communication</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckIcon />
                      <div>
                        <p className="font-medium">Unlimited revisions</p>
                        <p className="text-sm text-gray-500">Until you're satisfied</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckIcon />
                      <div>
                        <p className="font-medium">Secure downloads</p>
                        <p className="text-sm text-gray-500">All files in one place</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features Showcase */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="section-header">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop juggling emails, Slack, Dropbox, and invoices. Everything lives in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center text-2xl mb-4">
                📊
              </div>
              <h3 className="font-semibold text-lg mb-2">Dashboard Central</h3>
              <p className="text-gray-600 text-sm mb-3">
                See all projects, tasks, and team activity in one unified dashboard
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-sm">
                  <CheckIcon />
                  <span>Credit balance tracking</span>
                </li>
                <li className="flex items-center space-x-2 text-sm">
                  <CheckIcon />
                  <span>Project status overview</span>
                </li>
                <li className="flex items-center space-x-2 text-sm">
                  <CheckIcon />
                  <span>Team performance metrics</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-2xl mb-4">
                💬
              </div>
              <h3 className="font-semibold text-lg mb-2">Built-in Communication</h3>
              <p className="text-gray-600 text-sm mb-3">
                Message your team directly without leaving the platform
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-sm">
                  <CheckIcon />
                  <span>Project-based chat</span>
                </li>
                <li className="flex items-center space-x-2 text-sm">
                  <CheckIcon />
                  <span>File sharing</span>
                </li>
                <li className="flex items-center space-x-2 text-sm">
                  <CheckIcon />
                  <span>@mentions & notifications</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center text-2xl mb-4">
                📁
              </div>
              <h3 className="font-semibold text-lg mb-2">File Management</h3>
              <p className="text-gray-600 text-sm mb-3">
                Upload briefs, download deliverables, all version controlled
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-sm">
                  <CheckIcon />
                  <span>Secure cloud storage</span>
                </li>
                <li className="flex items-center space-x-2 text-sm">
                  <CheckIcon />
                  <span>Version history</span>
                </li>
                <li className="flex items-center space-x-2 text-sm">
                  <CheckIcon />
                  <span>Batch downloads</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-2xl mb-4">
                ⏱️
              </div>
              <h3 className="font-semibold text-lg mb-2">Time Tracking</h3>
              <p className="text-gray-600 text-sm mb-3">
                Transparent time logs for per-minute billing services
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-sm">
                  <CheckIcon />
                  <span>Detailed time logs</span>
                </li>
                <li className="flex items-center space-x-2 text-sm">
                  <CheckIcon />
                  <span>Task-level tracking</span>
                </li>
                <li className="flex items-center space-x-2 text-sm">
                  <CheckIcon />
                  <span>Automated invoicing</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center text-2xl mb-4">
                📈
              </div>
              <h3 className="font-semibold text-lg mb-2">Reporting & Analytics</h3>
              <p className="text-gray-600 text-sm mb-3">
                Monthly reports on work completed and ROI achieved
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-sm">
                  <CheckIcon />
                  <span>Performance metrics</span>
                </li>
                <li className="flex items-center space-x-2 text-sm">
                  <CheckIcon />
                  <span>ROI tracking</span>
                </li>
                <li className="flex items-center space-x-2 text-sm">
                  <CheckIcon />
                  <span>Export to PDF/CSV</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center text-2xl mb-4">
                🎨
              </div>
              <h3 className="font-semibold text-lg mb-2">Brand Kit</h3>
              <p className="text-gray-600 text-sm mb-3">
                Store brand assets for your team to reference anytime
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-sm">
                  <CheckIcon />
                  <span>Logo library</span>
                </li>
                <li className="flex items-center space-x-2 text-sm">
                  <CheckIcon />
                  <span>Color & font specs</span>
                </li>
                <li className="flex items-center space-x-2 text-sm">
                  <CheckIcon />
                  <span>Brand guidelines</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              See the Platform in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch how easy it is to go from brief to delivery
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl p-8 text-center">
              <div className="aspect-video bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mb-6">
                <div className="text-white text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium">Demo Video Coming Soon</p>
                  <p className="text-sm opacity-75">See the entire workflow in 3 minutes</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn btn-primary">
                  Request Live Demo
                </button>
                <Link href="/get-started" className="btn btn-secondary">
                  Try It Yourself
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typical Project Timelines */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="section-header">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real Project Timelines
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Set realistic expectations - here's how long things actually take
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { project: 'Website Redesign', time: '2-3 weeks', tasks: ['Design mockups', 'Development', 'Testing', 'Launch'] },
              { project: 'SEO Audit', time: '3-5 days', tasks: ['Technical audit', 'Keyword research', 'Recommendations', 'Report'] },
              { project: 'Social Media Calendar', time: '2 days', tasks: ['Content planning', 'Design creation', 'Caption writing', 'Scheduling'] },
              { project: 'Logo Design', time: '3-5 days', tasks: ['Concepts', 'Revisions', 'Final files', 'Brand guide'] },
              { project: 'Blog Article', time: '24-48 hours', tasks: ['Research', 'Writing', 'Editing', 'SEO optimization'] },
              { project: 'Email Campaign', time: '3-4 days', tasks: ['Design', 'Copy', 'Testing', 'Setup'] }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">{item.project}</h3>
                <div className="flex items-center space-x-2 text-orange-600 font-medium mb-4">
                  <ClockIcon />
                  <span>{item.time}</span>
                </div>
                <ul className="space-y-2">
                  {item.tasks.map((task, i) => (
                    <li key={i} className="flex items-center space-x-2 text-sm text-gray-600">
                      <CheckIcon />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your First Week Timeline */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your First Week With Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here's exactly what to expect in your first 7 days
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {[
                { day: 'Day 1', title: 'Sign Up & Get Approved', desc: 'Complete application, receive approval, get $300 credit, explore platform' },
                { day: 'Day 2', title: 'Meet Your Team', desc: 'Browse portfolios, select team members, introduce yourself, share brand assets' },
                { day: 'Day 3', title: 'Submit First Brief', desc: 'Use a template or custom brief, set priorities, team begins work immediately' },
                { day: 'Day 4-5', title: 'Review & Refine', desc: 'See initial concepts, provide feedback, request revisions, collaborate in real-time' },
                { day: 'Day 6', title: 'Final Delivery', desc: 'Approve final work, download deliverables, track time/credits used' },
                { day: 'Day 7', title: 'Plan Ahead', desc: 'Schedule upcoming projects, explore more services, optimize workflow' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-20 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg text-sm font-medium text-center">
                      {item.day}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="section-header">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Work vs The Alternatives
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See why SMEs are switching to Work
            </p>
          </div>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-6">Feature</th>
                  <th className="text-center p-6">
                    <div className="font-semibold text-orange-600">Work</div>
                  </th>
                  <th className="text-center p-6">
                    <div className="font-semibold text-gray-600">Freelancers</div>
                  </th>
                  <th className="text-center p-6">
                    <div className="font-semibold text-gray-600">Local Agency</div>
                  </th>
                  <th className="text-center p-6">
                    <div className="font-semibold text-gray-600">In-House</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="p-6 font-medium">Cost</td>
                  <td className="p-6 text-center"><span className="text-green-600">70% savings</span></td>
                  <td className="p-6 text-center">Variable</td>
                  <td className="p-6 text-center"><span className="text-red-600">Premium</span></td>
                  <td className="p-6 text-center"><span className="text-red-600">Highest</span></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-6 font-medium">Team Consistency</td>
                  <td className="p-6 text-center"><CheckIcon /></td>
                  <td className="p-6 text-center"><XIcon /></td>
                  <td className="p-6 text-center"><CheckIcon /></td>
                  <td className="p-6 text-center"><CheckIcon /></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-6 font-medium">Management Overhead</td>
                  <td className="p-6 text-center"><span className="text-green-600">None</span></td>
                  <td className="p-6 text-center"><span className="text-red-600">High</span></td>
                  <td className="p-6 text-center"><span className="text-green-600">None</span></td>
                  <td className="p-6 text-center"><span className="text-red-600">High</span></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-6 font-medium">Quality Guarantee</td>
                  <td className="p-6 text-center"><CheckIcon /></td>
                  <td className="p-6 text-center"><XIcon /></td>
                  <td className="p-6 text-center"><CheckIcon /></td>
                  <td className="p-6 text-center">Variable</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-6 font-medium">Scalability</td>
                  <td className="p-6 text-center"><span className="text-green-600">Instant</span></td>
                  <td className="p-6 text-center">Limited</td>
                  <td className="p-6 text-center">Limited</td>
                  <td className="p-6 text-center"><span className="text-red-600">Slow</span></td>
                </tr>
                <tr>
                  <td className="p-6 font-medium">Platform & Tools</td>
                  <td className="p-6 text-center"><CheckIcon /></td>
                  <td className="p-6 text-center"><XIcon /></td>
                  <td className="p-6 text-center">Variable</td>
                  <td className="p-6 text-center"><XIcon /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Numbers That Matter
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient-primary mb-2">2 hrs</div>
              <p className="text-gray-600">Average approval time</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient-primary mb-2">24-48 hrs</div>
              <p className="text-gray-600">First delivery</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient-primary mb-2">98%</div>
              <p className="text-gray-600">Client satisfaction</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient-primary mb-2">70%</div>
              <p className="text-gray-600">Average savings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process FAQ */}
      <ProcessFAQ />

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="cta-section">
            <div className="cta-pattern"></div>
            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                See How Easy It Really Is
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join hundreds of businesses already saving time and money with Work
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="btn bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4">
                  Get Started Now - $300 Credit
                </Link>
                <button className="btn border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-4">
                  Watch Demo Video
                </button>
              </div>
              <p className="mt-6 text-sm opacity-75">
                No credit card • 2-hour approval • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}