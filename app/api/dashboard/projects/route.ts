import { NextResponse } from 'next/server'
import { auth } from '../../../../lib/auth'
import { prisma } from '../../../../lib/prisma'

// GET /api/dashboard/projects - Get all projects for authenticated user
export async function GET(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id

    const projects = await prisma.project.findMany({
      where: { userId },
      include: {
        service: true,
        tasks: {
          orderBy: { createdAt: 'desc' },
          take: 5
        },
        serviceRequest: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(projects)
  } catch (error: any) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST /api/dashboard/projects - Create a new project
export async function POST(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const data = await request.json()

    // Validate required fields
    if (!data.name) {
      return NextResponse.json(
        { error: 'Project name is required' },
        { status: 400 }
      )
    }

    // Get service if provided
    let service = null
    if (data.serviceId) {
      // Map frontend service IDs to actual service names/categories
      const serviceMap: Record<string, string> = {
        'website': 'WEBSITE',
        'seo': 'SEO',
        'social': 'SOCIAL',
        'design': 'DESIGN',
        'content': 'CONTENT',
        'email': 'EMAIL'
      }

      const category = serviceMap[data.serviceId]
      if (category) {
        service = await prisma.service.findFirst({
          where: { category }
        })
      }
    }

    // Create the project
    const project = await prisma.project.create({
      data: {
        name: data.name,
        description: data.description || null,
        status: data.status || 'ACTIVE',
        userId,
        serviceId: service?.id || null,
        creditBalance: 30000 // $300 in cents for trial
      },
      include: {
        service: true,
        tasks: true
      }
    })

    return NextResponse.json(project)
  } catch (error: any) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}