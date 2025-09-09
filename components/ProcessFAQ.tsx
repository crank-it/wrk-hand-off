'use client'

import { useState } from 'react'

const ChevronDownIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

export default function ProcessFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'What happens immediately after I sign up?',
      answer: 'Once you submit your application, our team reviews it within 2 hours during business hours. Upon approval, you\'ll receive an email with your login credentials and $300 in credits will be automatically added to your account. You can then immediately browse teams, submit your first task, and start getting work done.'
    },
    {
      question: 'How do I communicate with my team?',
      answer: 'All communication happens through our platform\'s built-in messaging system. Each project has its own chat thread where you can message your team, share files, and provide feedback. You\'ll receive notifications for new messages, and you can @mention specific team members. No more lost emails or scattered Slack conversations.'
    },
    {
      question: 'Can I change teams if I\'m not satisfied?',
      answer: 'Absolutely! If you\'re not completely satisfied with your current team, just contact your account manager and we\'ll reassign you to a different team that better matches your needs. We track satisfaction scores internally to ensure quality, and your success is our priority.'
    },
    {
      question: 'How do revisions work?',
      answer: 'All our services include unlimited revisions until you\'re satisfied. Simply provide feedback through the platform, and your team will make the requested changes. For project-based work, revisions are included in the fixed price. For per-minute billing, revision time is tracked transparently.'
    },
    {
      question: 'What if I need something done urgently?',
      answer: 'When submitting a task, you can mark it as "Urgent" and it will be prioritized by your team. For extremely urgent needs (same-day delivery), we have dedicated rapid response teams available. Urgent tasks may incur a rush fee depending on the complexity and timeline.'
    },
    {
      question: 'How does the $300 credit work?',
      answer: 'Your $300 credit is applied to your account immediately upon approval and can be used for any service. Credits are deducted as work is completed - either when you approve project deliverables or as time is logged for per-minute services. The credits don\'t expire, giving you time to explore different services.'
    },
    {
      question: 'Can I see examples of work before choosing a team?',
      answer: 'Yes! Each team has a detailed portfolio showcasing their previous work. You can browse examples relevant to your industry and service needs. During onboarding, your account manager can also share specific case studies similar to your requirements.'
    },
    {
      question: 'What happens if I run out of credits?',
      answer: 'When your credit balance gets low, you\'ll receive a notification. You can then add more credits via credit card, or switch to a monthly retainer for predictable costs. Work in progress continues uninterrupted - we\'ll never stop mid-project due to credits.'
    }
  ]

  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="section-header">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Process Questions Answered
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about working with Work
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <button
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <h3 className="font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <div
                    className={`transform transition-transform ${
                      openIndex === idx ? 'rotate-180' : ''
                    }`}
                  >
                    <ChevronDownIcon />
                  </div>
                </button>
                {openIndex === idx && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}