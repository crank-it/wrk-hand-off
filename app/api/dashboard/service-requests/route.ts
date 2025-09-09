import { NextResponse } from 'next/server'
import { auth } from '../../../../lib/auth'
import { prisma } from '../../../../lib/prisma'

// GET /api/dashboard/service-requests - Get all service requests for authenticated user
export async function GET(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id

    const serviceRequests = await prisma.serviceRequest.findMany({
      where: {
        userId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(serviceRequests)
  } catch (error: any) {
    console.error('Error fetching service requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch service requests' },
      { status: 500 }
    )
  }
}

// POST /api/dashboard/service-requests - Create a new service request
export async function POST(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const data = await request.json()

    // Validate required fields
    if (!data.serviceId || !data.title || !data.description || data.budgetCents === undefined || !data.timeline) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create the service request
    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        userId,
        serviceId: data.serviceId,
        title: data.title,
        description: data.description,
        budget: data.budgetCents,
        timeline: data.timeline,
        requirements: data.requirements || null,
        status: 'PENDING'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: 'SERVICE_REQUEST_CREATED',
        entityType: 'ServiceRequest',
        entityId: serviceRequest.id,
        userId,
        metadata: JSON.stringify({
          title: serviceRequest.title,
          serviceId: serviceRequest.serviceId,
          budgetCents: serviceRequest.budget
        })
      }
    })

    return NextResponse.json(serviceRequest)
  } catch (error: any) {
    console.error('Error creating service request:', error)
    return NextResponse.json(
      { error: 'Failed to create service request' },
      { status: 500 }
    )
  }
}