import { NextResponse } from 'next/server'
import { auth } from '../../../lib/auth'
import { prisma } from '../../../lib/prisma'

// POST /api/projects - Create a project directly or from a request
export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const data = await request.json()

    // If fromRequestId provided, create from existing service request idempotently
    if (data.fromRequestId) {
      const sr = await prisma.serviceRequest.findFirst({
        where: { id: data.fromRequestId, userId }
      })
      if (!sr) {
        return NextResponse.json({ error: 'Service request not found' }, { status: 404 })
      }

      const existing = await prisma.project.findFirst({ where: { serviceRequestId: sr.id } })
      if (existing) return NextResponse.json(existing)

      const created = await prisma.project.create({
        data: {
          userId,
          name: sr.title,
          description: sr.description,
          status: 'ACTIVE',
          creditBalance: sr.budget ?? 30000,
          serviceId: sr.serviceId ?? null,
          serviceRequestId: sr.id
        },
        include: { service: true, tasks: true }
      })

      await prisma.activityLog.create({
        data: {
          action: 'PROJECT_CREATED_FROM_REQUEST',
          entity: 'PROJECT',
          entityId: created.id,
          userId,
          metadata: JSON.stringify({ serviceRequestId: sr.id })
        }
      })

      return NextResponse.json(created, { status: 201 })
    }

    // Direct project creation
    if (!data.name) {
      return NextResponse.json({ error: 'Project name is required' }, { status: 400 })
    }

    const created = await prisma.project.create({
      data: {
        userId,
        name: data.name,
        description: data.description || null,
        status: data.status || 'ACTIVE',
        creditBalance: typeof data.creditBalance === 'number' ? data.creditBalance : 30000,
        serviceId: data.serviceId || null
      },
      include: { service: true, tasks: true }
    })

    await prisma.activityLog.create({
      data: {
        action: 'CREATED',
        entity: 'PROJECT',
        entityId: created.id,
        userId,
        metadata: JSON.stringify({})
      }
    })

    return NextResponse.json(created, { status: 201 })
  } catch (error: any) {
    console.error('Error creating project:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}