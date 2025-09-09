import { auth } from '../../../lib/auth'
import { redirect } from 'next/navigation'

export default async function HelpPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/signin')
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-gray-600 mt-2">
          Get help with your account and find answers to common questions
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <a href="#" className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
          <p className="text-sm text-gray-600">Learn how to use all features</p>
        </a>

        <a href="#" className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
          <p className="text-sm text-gray-600">Chat with our support team</p>
        </a>

        <a href="mailto:support@wrk.ph" className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
          <p className="text-sm text-gray-600">support@wrk.ph</p>
        </a>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Frequently Asked Questions</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            {
              question: "How do I create a new project?",
              answer: "Navigate to the Projects section and click the 'New Project' button. Fill in your project details and select the services you need."
            },
            {
              question: "How are credits calculated?",
              answer: "Credits are deducted based on the time spent by team members on your tasks. Different services have different rates per minute or per project."
            },
            {
              question: "Can I add more team members?",
              answer: "Yes! You can request additional team members based on your subscription plan. Contact support to discuss your needs."
            },
            {
              question: "How do I track my project progress?",
              answer: "Each project has a dedicated page showing task status, progress percentage, and team activity. You can also view all tasks in the Tasks section."
            },
            {
              question: "What payment methods do you accept?",
              answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise accounts."
            }
          ].map((faq, index) => (
            <details key={index} className="group">
              <summary className="px-6 py-4 cursor-pointer hover:bg-gray-50 flex items-center justify-between">
                <span className="font-medium text-gray-900">{faq.question}</span>
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-600">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Need more help?</h2>
            <p className="text-white/90">
              Our support team is available Monday-Friday, 9am-5pm AEST
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-6 py-3 bg-white text-orange-600 rounded-lg font-medium hover:shadow-lg">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}