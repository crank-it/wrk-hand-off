import { NextResponse } from 'next/server'
import { auth } from '../../../lib/auth'
import { prisma } from '../../../lib/prisma'

// POST /api/requests - Create a new service request (canonical)
export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const data = await request.json()

    if (!data.serviceId || !data.title || !data.description || data.budgetCents === undefined || !data.timeline) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const created = await prisma.serviceRequest.create({
      data: {
        userId,
        serviceId: data.serviceId,
        title: data.title,
        description: data.description,
        budget: data.budgetCents,
        timeline: data.timeline,
        requirements: data.requirements || null,
        status: 'PENDING'
      }
    })

    await prisma.activityLog.create({
      data: {
        action: 'SERVICE_REQUEST_CREATED',
        entity: 'SERVICE_REQUEST',
        entityId: created.id,
        userId,
        metadata: JSON.stringify({ serviceId: created.serviceId, budgetCents: created.budget })
      }
    })

    return NextResponse.json(created, { status: 201 })
  } catch (error: any) {
    console.error('Error creating request:', error)
    return NextResponse.json({ error: 'Failed to create request' }, { status: 500 })
  }
}