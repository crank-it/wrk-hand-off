import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { ToasterProvider } from '../components/ToasterProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Work - Your bespoke Filipino team working for your business',
  description: 'Stop juggling freelancers and overpaying agencies. Get local agency quality at offshore cost with your dedicated Filipino team.',
  keywords: 'BPO, Filipino team, outsourcing, Australian SME, New Zealand SME, web development, SEO, social media management',
}

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <div className="min-h-screen flex flex-col">
          {/* Navigation Header */}
          <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
            <div className="container mx-auto px-4">
              <nav className="flex items-center justify-between h-16">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">W</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">Work</span>
                  <span className="text-sm text-gray-500 hidden sm:inline">.ph</span>
                </Link>

                {/* Main Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                  <Link href="/services" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Services
                  </Link>
                  <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
                    How It Works
                  </Link>
                  <Link href="/team" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Our Team
                  </Link>
                  <Link href="/portfolio" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Portfolio
                  </Link>
                  <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Blog
                  </Link>
                  <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Contact
                  </Link>
                </div>

                {/* CTA Buttons */}
                <div className="flex items-center space-x-4">
                  <Link 
                    href="/signin" 
                    className="hidden sm:inline-flex text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/get-started" 
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-shadow"
                  >
                    Get $300 Credit
                  </Link>
                </div>
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-grow">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-50 border-t border-gray-100 mt-20">
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Company */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
                  <ul className="space-y-2">
                    <li><Link href="/about" className="text-gray-600 hover:text-gray-900">About Us</Link></li>
                    <li><Link href="/team" className="text-gray-600 hover:text-gray-900">Our Team</Link></li>
                    <li><Link href="/careers" className="text-gray-600 hover:text-gray-900">Careers</Link></li>
                    <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
                  </ul>
                </div>

                {/* Services */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Services</h3>
                  <ul className="space-y-2">
                    <li><Link href="/services#web" className="text-gray-600 hover:text-gray-900">Web Development</Link></li>
                    <li><Link href="/services#seo" className="text-gray-600 hover:text-gray-900">SEO</Link></li>
                    <li><Link href="/services#social" className="text-gray-600 hover:text-gray-900">Social Media</Link></li>
                    <li><Link href="/services#design" className="text-gray-600 hover:text-gray-900">Design</Link></li>
                  </ul>
                </div>

                {/* Resources */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
                  <ul className="space-y-2">
                    <li><Link href="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
                    <li><Link href="/portfolio" className="text-gray-600 hover:text-gray-900">Portfolio</Link></li>
                    <li><Link href="/testimonials" className="text-gray-600 hover:text-gray-900">Testimonials</Link></li>
                    <li><Link href="/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link></li>
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Get Started</h3>
                  <p className="text-gray-600 mb-4">
                    Ready to build your bespoke Filipino team?
                  </p>
                  <Link 
                    href="/get-started" 
                    className="inline-flex bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-shadow"
                  >
                    Start Free Trial
                  </Link>
                  <p className="text-sm text-gray-500 mt-4">
                    $300 credit • No credit card required
                  </p>
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-500 text-sm">
                  © 2024 Work (wrk.ph). All rights reserved.
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <Link href="/privacy" className="text-gray-500 hover:text-gray-700 text-sm">Privacy Policy</Link>
                  <Link href="/terms" className="text-gray-500 hover:text-gray-700 text-sm">Terms of Service</Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}