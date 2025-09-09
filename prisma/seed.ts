import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Create services
  const services = [
    {
      name: 'Website Development',
      slug: 'website-development',
      description: 'Custom websites built with modern technologies',
      category: 'WEBSITE',
      pricingModel: 'PROJECT',
      basePrice: 299900, // $2,999
    },
    {
      name: 'SEO Optimization',
      slug: 'seo-optimization',
      description: 'Improve your search engine rankings',
      category: 'SEO',
      pricingModel: 'RETAINER',
      basePrice: 99900, // $999/month
    },
    {
      name: 'Social Media Management',
      slug: 'social-media-management',
      description: 'Complete social media presence management',
      category: 'SOCIAL',
      pricingModel: 'RETAINER',
      basePrice: 149900, // $1,499/month
    },
    {
      name: 'Content Creation',
      slug: 'content-creation',
      description: 'Blog posts, articles, and web content',
      category: 'CONTENT',
      pricingModel: 'PER_MINUTE',
      basePrice: 200, // $2/minute
    },
    {
      name: 'Email Marketing',
      slug: 'email-marketing',
      description: 'Email campaigns and automation',
      category: 'EMAIL',
      pricingModel: 'PROJECT',
      basePrice: 49900, // $499
    },
    {
      name: 'Graphic Design',
      slug: 'graphic-design',
      description: 'Logos, banners, and marketing materials',
      category: 'DESIGN',
      pricingModel: 'PROJECT',
      basePrice: 79900, // $799
    },
  ]

  for (const service of services) {
    await prisma.service.create({
      data: service,
    })
  }

  // Create team members
  const teamMembers = [
    {
      name: 'Maria Santos',
      role: 'Senior Developer',
      bio: 'Full-stack developer with 8 years of experience in web technologies',
      skills: 'React, Node.js, TypeScript, PostgreSQL, AWS',
      available: true,
      portfolio: JSON.stringify([
        { title: 'E-commerce Platform', url: '#' },
        { title: 'SaaS Dashboard', url: '#' },
      ]),
    },
    {
      name: 'Juan Dela Cruz',
      role: 'SEO Specialist',
      bio: 'SEO expert helping businesses rank higher on Google',
      skills: 'Technical SEO, Content Strategy, Link Building, Analytics',
      available: true,
      portfolio: JSON.stringify([
        { title: '300% Traffic Growth Case Study', url: '#' },
      ]),
    },
    {
      name: 'Ana Reyes',
      role: 'Social Media Manager',
      bio: 'Creative social media strategist with viral content expertise',
      skills: 'Facebook, Instagram, TikTok, Content Creation, Analytics',
      available: false,
      portfolio: JSON.stringify([
        { title: 'Viral Campaign Examples', url: '#' },
      ]),
    },
    {
      name: 'Carlos Mendoza',
      role: 'Graphic Designer',
      bio: 'Award-winning designer specializing in brand identity',
      skills: 'Adobe Creative Suite, Figma, Brand Design, UI/UX',
      available: true,
      portfolio: JSON.stringify([
        { title: 'Brand Portfolio', url: '#' },
        { title: 'Logo Designs', url: '#' },
      ]),
    },
    {
      name: 'Rosa Garcia',
      role: 'Content Writer',
      bio: 'Professional writer creating engaging content that converts',
      skills: 'Blog Writing, Copywriting, SEO Content, Email Copy',
      available: true,
      portfolio: JSON.stringify([
        { title: 'Published Articles', url: '#' },
      ]),
    },
    {
      name: 'Miguel Rodriguez',
      role: 'Junior Developer',
      bio: 'Enthusiastic developer specializing in frontend technologies',
      skills: 'HTML, CSS, JavaScript, React, Vue.js, Tailwind CSS',
      available: true,
      portfolio: JSON.stringify([
        { title: 'Personal Portfolio Site', url: '#' },
        { title: 'Restaurant Website', url: '#' },
      ]),
    },
    {
      name: 'Isabella Cruz',
      role: 'Email Marketing Specialist',
      bio: 'Expert in email campaigns with 6 years experience driving conversions',
      skills: 'Mailchimp, Klaviyo, Campaign Strategy, A/B Testing, Automation',
      available: true,
      portfolio: JSON.stringify([
        { title: '45% Open Rate Campaign', url: '#' },
        { title: 'E-commerce Automation Flow', url: '#' },
      ]),
    },
    {
      name: 'Diego Fernandez',
      role: 'Video Editor',
      bio: 'Creative video editor producing engaging content for social media',
      skills: 'Adobe Premiere, After Effects, DaVinci Resolve, Motion Graphics',
      available: false,
      portfolio: JSON.stringify([
        { title: 'Brand Story Videos', url: '#' },
        { title: 'Social Media Reels', url: '#' },
      ]),
    },
    {
      name: 'Sophia Luna',
      role: 'Virtual Assistant',
      bio: 'Efficient VA handling administrative tasks and customer support',
      skills: 'Admin Support, Customer Service, Calendar Management, Data Entry',
      available: true,
      portfolio: JSON.stringify([
        { title: 'Client Testimonials', url: '#' },
      ]),
    },
    {
      name: 'Gabriel Torres',
      role: 'PPC Specialist',
      bio: 'Google Ads expert managing campaigns with proven ROI',
      skills: 'Google Ads, Facebook Ads, Campaign Optimization, Analytics, Reporting',
      available: true,
      portfolio: JSON.stringify([
        { title: '200% ROI Case Study', url: '#' },
        { title: 'Lead Generation Campaign', url: '#' },
      ]),
    },
  ]

  for (const member of teamMembers) {
    await prisma.teamMember.create({
      data: member,
    })
  }

  // Create testimonials
  const testimonials = [
    {
      clientName: 'David Thompson',
      company: 'Thompson Electrical Services',
      content: 'Work transformed our online presence. Our website traffic increased by 400% and we\'re getting quality leads daily.',
      rating: 5,
      serviceType: 'WEBSITE',
    },
    {
      clientName: 'Sarah Mitchell',
      company: 'Mitchell Legal',
      content: 'The team at Work is exceptional. They manage our entire digital marketing and the results speak for themselves.',
      rating: 5,
      serviceType: 'SEO',
    },
    {
      clientName: 'James Wilson',
      company: 'Wilson Construction',
      content: 'Finally, an affordable solution that delivers agency-quality work. Couldn\'t be happier with the service.',
      rating: 5,
      serviceType: 'SOCIAL',
    },
  ]

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial,
    })
  }

  // Create blog posts
  const blogPosts = [
    {
      title: 'Why Australian SMEs Are Switching to Filipino Teams',
      slug: 'australian-smes-filipino-teams',
      excerpt: 'Discover how businesses are saving 70% on costs while getting better results',
      content: 'Full article content here...',
      published: true,
      publishedAt: new Date(),
    },
    {
      title: '5 Signs You Need Professional Social Media Management',
      slug: '5-signs-social-media-management',
      excerpt: 'Is your social media strategy falling behind? Here are the warning signs',
      content: 'Full article content here...',
      published: true,
      publishedAt: new Date(),
    },
    {
      title: 'The Complete Guide to SEO for Australian Businesses',
      slug: 'seo-guide-australian-businesses',
      excerpt: 'Everything you need to know about ranking on Google in Australia',
      content: 'Full article content here...',
      published: true,
      publishedAt: new Date(),
    },
  ]

  for (const post of blogPosts) {
    await prisma.blogPost.create({
      data: post,
    })
  }

  // Create demo users
  const hashedPassword = await bcrypt.hash('demo123', 10)
  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@wrk.ph',
      name: 'Demo User',
      password: hashedPassword,
      role: 'CLIENT',
    },
  })

  const hashedPassword2 = await bcrypt.hash('test123', 10)
  const testUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test Business Owner',
      password: hashedPassword2,
      role: 'CLIENT',
    },
  })

  // Get service IDs for project assignments
  const allServices = await prisma.service.findMany()
  const websiteService = allServices.find(s => s.category === 'WEBSITE')
  const seoService = allServices.find(s => s.category === 'SEO')
  const socialService = allServices.find(s => s.category === 'SOCIAL')
  const contentService = allServices.find(s => s.category === 'CONTENT')
  const designService = allServices.find(s => s.category === 'DESIGN')

  // Create projects for demo user
  const projects = [
    {
      name: 'Website Redesign Project',
      description: 'Complete overhaul of company website with modern design and improved UX',
      status: 'ACTIVE',
      userId: demoUser.id,
      serviceId: websiteService?.id,
      creditBalance: 500000, // $5000 in cents
    },
    {
      name: 'Q1 SEO Campaign',
      description: 'Comprehensive SEO strategy to improve organic search rankings',
      status: 'ACTIVE',
      userId: demoUser.id,
      serviceId: seoService?.id,
      creditBalance: 300000, // $3000 in cents
    },
    {
      name: 'Social Media Management',
      description: 'Daily social media posting and engagement across all platforms',
      status: 'ACTIVE',
      userId: demoUser.id,
      serviceId: socialService?.id,
      creditBalance: 200000, // $2000 in cents
    },
    {
      name: 'Content Marketing Initiative',
      description: 'Weekly blog posts and content creation for thought leadership',
      status: 'ON_HOLD',
      userId: demoUser.id,
      serviceId: contentService?.id,
      creditBalance: 150000, // $1500 in cents
    },
    {
      name: 'Brand Identity Refresh',
      description: 'New logo, color scheme, and brand guidelines',
      status: 'COMPLETE',
      userId: demoUser.id,
      serviceId: designService?.id,
      creditBalance: 50000, // $500 in cents (mostly used)
    },
  ]

  // Create projects for test user
  const testProjects = [
    {
      name: 'E-commerce Platform Development',
      description: 'Building a new online store with payment integration',
      status: 'ACTIVE',
      userId: testUser.id,
      serviceId: websiteService?.id,
      creditBalance: 800000, // $8000 in cents
    },
    {
      name: 'Local SEO Optimization',
      description: 'Targeting local search results for brick-and-mortar locations',
      status: 'ACTIVE',
      userId: testUser.id,
      serviceId: seoService?.id,
      creditBalance: 250000, // $2500 in cents
    },
  ]

  // Create all projects and store them for task creation
  const createdProjects = []
  for (const project of [...projects, ...testProjects]) {
    const created = await prisma.project.create({
      data: project,
    })
    createdProjects.push(created)
  }

  // Create tasks for each project
  const taskTemplates = [
    // Website project tasks
    {
      projectIndex: 0,
      tasks: [
        { title: 'Design homepage mockup', description: 'Create initial homepage design concepts', status: 'DONE', dueDate: new Date('2024-12-20') },
        { title: 'Develop responsive navigation', description: 'Build mobile-friendly navigation menu', status: 'DONE', dueDate: new Date('2024-12-22') },
        { title: 'Implement contact form', description: 'Add contact form with email integration', status: 'IN_PROGRESS', dueDate: new Date('2024-12-25') },
        { title: 'Set up CMS backend', description: 'Configure content management system', status: 'IN_PROGRESS', dueDate: new Date('2024-12-28') },
        { title: 'Optimize page load speed', description: 'Improve performance metrics', status: 'TODO', dueDate: new Date('2024-12-30') },
        { title: 'Cross-browser testing', description: 'Test on all major browsers', status: 'TODO', dueDate: new Date('2025-01-02') },
      ]
    },
    // SEO project tasks
    {
      projectIndex: 1,
      tasks: [
        { title: 'Keyword research', description: 'Identify target keywords for Q1', status: 'DONE', dueDate: new Date('2024-12-15') },
        { title: 'Competitor analysis', description: 'Analyze top 5 competitors SEO strategies', status: 'DONE', dueDate: new Date('2024-12-18') },
        { title: 'On-page optimization', description: 'Optimize meta tags and content', status: 'REVIEW', dueDate: new Date('2024-12-24') },
        { title: 'Build backlinks', description: 'Outreach for quality backlink opportunities', status: 'IN_PROGRESS', dueDate: new Date('2024-12-28') },
        { title: 'Create SEO report', description: 'Monthly performance report', status: 'TODO', dueDate: new Date('2024-12-31') },
      ]
    },
    // Social Media project tasks
    {
      projectIndex: 2,
      tasks: [
        { title: 'Content calendar creation', description: 'Plan posts for next month', status: 'DONE', dueDate: new Date('2024-12-20') },
        { title: 'Design Instagram templates', description: 'Create 10 reusable post templates', status: 'IN_PROGRESS', dueDate: new Date('2024-12-25') },
        { title: 'Write Facebook ad copy', description: 'Create copy for 3 ad campaigns', status: 'REVIEW', dueDate: new Date('2024-12-26') },
        { title: 'Schedule weekly posts', description: 'Queue posts for next week', status: 'TODO', dueDate: new Date('2024-12-27') },
        { title: 'Engagement report', description: 'Analyze engagement metrics', status: 'TODO', dueDate: new Date('2024-12-30') },
      ]
    },
    // Content project tasks
    {
      projectIndex: 3,
      tasks: [
        { title: 'Blog topic research', description: 'Identify trending topics in industry', status: 'DONE', dueDate: new Date('2024-12-18') },
        { title: 'Write cornerstone article', description: '2000-word comprehensive guide', status: 'TODO', dueDate: new Date('2024-12-28') },
        { title: 'Create email newsletter', description: 'Monthly newsletter content', status: 'TODO', dueDate: new Date('2024-12-30') },
      ]
    },
    // Brand Identity project tasks
    {
      projectIndex: 4,
      tasks: [
        { title: 'Logo design concepts', description: 'Create 3 initial logo concepts', status: 'DONE', dueDate: new Date('2024-11-15') },
        { title: 'Color palette selection', description: 'Define brand colors', status: 'DONE', dueDate: new Date('2024-11-18') },
        { title: 'Brand guidelines document', description: 'Create comprehensive brand guide', status: 'DONE', dueDate: new Date('2024-11-25') },
        { title: 'Business card design', description: 'Design and prepare for print', status: 'DONE', dueDate: new Date('2024-11-28') },
      ]
    },
    // E-commerce project tasks (test user)
    {
      projectIndex: 5,
      tasks: [
        { title: 'Product catalog setup', description: 'Import and organize product data', status: 'IN_PROGRESS', dueDate: new Date('2024-12-26') },
        { title: 'Payment gateway integration', description: 'Set up Stripe payment processing', status: 'TODO', dueDate: new Date('2024-12-28') },
        { title: 'Shopping cart development', description: 'Build cart functionality', status: 'IN_PROGRESS', dueDate: new Date('2024-12-27') },
        { title: 'Order management system', description: 'Create admin order interface', status: 'TODO', dueDate: new Date('2024-12-30') },
        { title: 'Email notifications', description: 'Set up order confirmation emails', status: 'TODO', dueDate: new Date('2025-01-02') },
      ]
    },
    // Local SEO project tasks (test user)
    {
      projectIndex: 6,
      tasks: [
        { title: 'Google My Business optimization', description: 'Optimize GMB listings', status: 'DONE', dueDate: new Date('2024-12-20') },
        { title: 'Local citations audit', description: 'Check and update business listings', status: 'IN_PROGRESS', dueDate: new Date('2024-12-24') },
        { title: 'Location pages creation', description: 'Build pages for each location', status: 'TODO', dueDate: new Date('2024-12-28') },
      ]
    },
  ]

  // Create tasks for each project
  for (const template of taskTemplates) {
    const project = createdProjects[template.projectIndex]
    if (project) {
      for (const task of template.tasks) {
        await prisma.task.create({
          data: {
            ...task,
            projectId: project.id,
          },
        })
      }
    }
  }

  console.log('✅ Database seeded successfully with:')
  console.log('   - 2 demo users')
  console.log('   - 10 team members')
  console.log('   - 6 services')
  console.log('   - 7 projects')
  console.log('   - 33 tasks')
  console.log('   - Testimonials and blog posts')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })