import Link from 'next/link'
import ContactForm from '../../components/ContactForm'

// Icons
const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const LocationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 via-white to-cyan-50 pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-teal-100 text-teal-800 px-4 py-2 rounded-full mb-6">
              <ClockIcon />
              <span className="text-sm font-medium">2-Hour Response Time</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Let's Build Something{' '}
              <span className="text-gradient from-teal-500 to-cyan-500 bg-clip-text text-transparent bg-gradient-to-r">
                Amazing Together
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Get in touch for a free consultation about your project. 
              Our team is ready to help you achieve your business goals.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckIcon />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckIcon />
                <span>No Obligation Quote</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckIcon />
                <span>$300 Trial Credit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Left Column - Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  <ContactForm />
                </div>
              </div>

              {/* Right Column - Contact Info */}
              <div className="space-y-6">
                {/* Quick Response */}
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6">
                  <h3 className="font-semibold mb-4">Quick Response Guaranteed</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <ClockIcon />
                      <div>
                        <p className="font-medium">Business Hours</p>
                        <p className="text-sm text-gray-600">Mon-Fri 9am-6pm AEST</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckIcon />
                      <div>
                        <p className="font-medium">Response Time</p>
                        <p className="text-sm text-gray-600">Within 2 hours</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-semibold mb-4">Direct Contact</h3>
                  <div className="space-y-3">
                    <a href="mailto:hello@wrk.ph" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900">
                      <EmailIcon />
                      <span>hello@wrk.ph</span>
                    </a>
                    <a href="tel:+61280000000" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900">
                      <PhoneIcon />
                      <span>+61 2 8000 0000</span>
                    </a>
                    <div className="flex items-start space-x-3 text-gray-600">
                      <LocationIcon />
                      <div>
                        <p className="font-medium">Philippines Office</p>
                        <p className="text-sm">Makati City, Metro Manila</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alternative Contact */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold mb-4">Other Ways to Connect</h3>
                  <div className="space-y-3">
                    <button className="w-full py-2 px-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                      📅 Schedule a Call
                    </button>
                    <button className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium">
                      💬 WhatsApp Us
                    </button>
                    <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                      💬 Live Chat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Contact Us */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="section-header">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Get In Touch?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No matter where you are in your journey, we're here to help
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center text-2xl">
                💡
              </div>
              <h3 className="font-semibold mb-2">Free Consultation</h3>
              <p className="text-sm text-gray-600">
                Discuss your project goals and get expert advice
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center text-2xl">
                📋
              </div>
              <h3 className="font-semibold mb-2">Custom Quote</h3>
              <p className="text-sm text-gray-600">
                Get a detailed proposal tailored to your needs
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center text-2xl">
                🎯
              </div>
              <h3 className="font-semibold mb-2">Strategy Session</h3>
              <p className="text-sm text-gray-600">
                Plan your digital growth with our experts
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-2xl">
                🚀
              </div>
              <h3 className="font-semibold mb-2">Quick Start</h3>
              <p className="text-sm text-gray-600">
                Get your $300 credit and start immediately
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Common Questions</h2>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-2">How quickly can we start working together?</h3>
                <p className="text-gray-600">
                  Once approved, you'll receive your $300 credit instantly and can start working with your team within 24 hours. 
                  The approval process typically takes just 2 hours during business hours.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-2">Do I need to commit to a long-term contract?</h3>
                <p className="text-gray-600">
                  No! Start with your $300 trial credit, then choose between project-based work, per-minute billing, or monthly retainers. 
                  You can change or cancel anytime.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-2">What if I'm not sure which services I need?</h3>
                <p className="text-gray-600">
                  That's perfectly fine! Book a free consultation and our team will help you identify the best services for your business goals 
                  and create a custom plan that fits your budget.
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link href="/faq" className="text-teal-600 hover:text-teal-700 font-medium">
                View All FAQs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="section-header">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Offices
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🇵🇭</span>
                <h3 className="text-xl font-semibold">Philippines Office</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Where your dedicated team works
              </p>
              <address className="not-italic text-gray-600">
                Makati City<br />
                Metro Manila, Philippines<br />
                <span className="text-sm">
                  Monday - Friday: 9:00 AM - 6:00 PM PHT
                </span>
              </address>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🇦🇺</span>
                <h3 className="text-xl font-semibold">Australian Contact</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Local support for ANZ clients
              </p>
              <address className="not-italic text-gray-600">
                Sydney, NSW<br />
                Australia<br />
                <span className="text-sm">
                  Monday - Friday: 9:00 AM - 6:00 PM AEST
                </span>
              </address>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-3xl p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join hundreds of Australian and New Zealand businesses already growing with Work
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started" className="btn bg-white text-teal-600 hover:bg-gray-100 text-lg px-8 py-4">
                Start Free Trial - $300 Credit
              </Link>
              <button className="btn border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-4">
                Schedule a Call
              </button>
            </div>
            <p className="mt-6 text-sm opacity-75">
              No credit card required • 2-hour approval • Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </>
  )
}