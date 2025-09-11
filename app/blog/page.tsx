// export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { prisma } from '../../lib/prisma'

// Icons
const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

// Additional blog posts to supplement database content
const additionalPosts = [
  {
    id: 'add-1',
    title: 'The Hidden Costs of Not Outsourcing Your Digital Marketing',
    slug: 'hidden-costs-not-outsourcing',
    excerpt: 'Discover the opportunity costs and competitive disadvantages of keeping everything in-house',
    category: 'Business Growth',
    author: 'Maria Santos',
    readTime: '5 min read',
    published: true
  },
  {
    id: 'add-2',
    title: 'How to Manage Remote Teams Effectively in 2024',
    slug: 'manage-remote-teams-2024',
    excerpt: 'Best practices for working with offshore teams and maximizing productivity',
    category: 'Outsourcing Tips',
    author: 'Juan Dela Cruz',
    readTime: '7 min read',
    published: true
  },
  {
    id: 'add-3',
    title: 'SEO Trends Every Australian Business Should Know',
    slug: 'seo-trends-australian-business',
    excerpt: 'Stay ahead of the competition with these local SEO strategies',
    category: 'Digital Marketing',
    author: 'Ana Reyes',
    readTime: '6 min read',
    published: true
  },
  {
    id: 'add-4',
    title: 'Building a Strong Social Media Presence on a Budget',
    slug: 'social-media-budget',
    excerpt: 'Effective strategies for SMEs to compete with bigger brands online',
    category: 'Digital Marketing',
    author: 'Carlos Mendoza',
    readTime: '4 min read',
    published: true
  },
  {
    id: 'add-5',
    title: 'The ROI of Professional Content Marketing',
    slug: 'roi-content-marketing',
    excerpt: 'Real numbers showing why content marketing delivers long-term value',
    category: 'Case Studies',
    author: 'Rosa Garcia',
    readTime: '8 min read',
    published: true
  },
  {
    id: 'add-6',
    title: 'Website Speed: Why Every Second Costs You Money',
    slug: 'website-speed-costs',
    excerpt: 'How slow loading times impact your conversion rates and what to do about it',
    category: 'Industry News',
    author: 'Maria Santos',
    readTime: '5 min read',
    published: true
  }
]

export default async function BlogPage() {
  // Fetch blog posts from database
  const dbPosts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' }
  })

  // Format dates for display
  const formatDate = (date: Date | null) => {
    if (!date) return 'Recently'
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium">Weekly Insights</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Insights for{' '}
              <span className="text-gradient from-indigo-500 to-purple-500 bg-clip-text text-transparent bg-gradient-to-r">
                Growing Your Business
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Expert tips on digital marketing, outsourcing, and business growth. 
              Learn from our experience working with 200+ Australian and New Zealand SMEs.
            </p>

            {/* Newsletter Signup */}
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
              <h3 className="font-semibold mb-3">Get Weekly Insights</h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="btn btn-primary">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">No spam, unsubscribe anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {dbPosts.length > 0 && (
        <section className="section bg-white">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full mb-4">
                      Featured
                    </span>
                    <h3 className="text-3xl font-bold mb-4">{dbPosts[0].title}</h3>
                    <p className="text-gray-600 mb-4">{dbPosts[0].excerpt}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                      <span className="flex items-center space-x-1">
                        <CalendarIcon />
                        <span>{formatDate(dbPosts[0].publishedAt)}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <ClockIcon />
                        <span>5 min read</span>
                      </span>
                    </div>
                    <Link href={`/blog/${dbPosts[0].slug}`} className="btn btn-primary">
                      Read Article
                      <ArrowRightIcon />
                    </Link>
                  </div>
                  <div className="aspect-video bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center">
                    <span className="text-6xl">📚</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Categories */}
      <section className="bg-gray-50 py-8 sticky top-16 z-20">
        <div className="container">
          <div className="flex overflow-x-auto gap-4 pb-2">
            <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow-lg whitespace-nowrap">
              All Posts
            </button>
            {['Business Growth', 'Digital Marketing', 'Outsourcing Tips', 'Case Studies', 'Industry News'].map(cat => (
              <button key={cat} className="px-6 py-2 bg-white hover:bg-gray-100 text-gray-700 rounded-lg whitespace-nowrap transition-colors">
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Database posts */}
            {dbPosts.slice(1).map(post => (
              <article key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-4xl">
                  📝
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                      Business Growth
                    </span>
                    <span className="text-xs text-gray-500">5 min read</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <Link href={`/blog/${post.slug}`} className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center space-x-1">
                      <span>Read More</span>
                      <ArrowRightIcon />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
            
            {/* Additional posts */}
            {additionalPosts.map(post => (
              <article key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-4xl">
                  {post.category === 'Case Studies' ? '📊' : 
                   post.category === 'Digital Marketing' ? '📱' :
                   post.category === 'Outsourcing Tips' ? '🌏' :
                   post.category === 'Industry News' ? '📰' : '💡'}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span>By {post.author}</span>
                    </div>
                    <Link href={`/blog/${post.slug}`} className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center space-x-1">
                      <span>Read More</span>
                      <ArrowRightIcon />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="btn btn-secondary">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Popular Posts Sidebar */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Most Popular</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {dbPosts.slice(0, 3).map((post, idx) => (
                  <div key={post.id} className="flex space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold mb-1">
                        <Link href={`/blog/${post.slug}`} className="hover:text-indigo-600">
                          {post.title}
                        </Link>
                      </h4>
                      <p className="text-sm text-gray-500">{formatDate(post.publishedAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                <h3 className="font-semibold mb-4">Topics We Cover</h3>
                <div className="flex flex-wrap gap-2">
                  {['SEO', 'Web Design', 'Social Media', 'Content Marketing', 'Email Marketing', 'PPC', 'Branding', 'Analytics', 'Outsourcing', 'Team Management'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white text-sm text-gray-700 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Put These Insights Into Action?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let our expert team implement these strategies for your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started" className="btn bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-4">
                Get Started - $300 Credit
              </Link>
              <Link href="/services" className="btn border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-4">
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}