import { NextResponse } from 'next/server'
import { auth } from '../../../../../lib/auth'
import { prisma } from '../../../../../lib/prisma'

// PATCH /api/dashboard/service-requests/[id] - Update service request status
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const userRole = (session.user as any).role
    const data = await request.json()

    // Verify the service request exists
    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id: params.id }
    })

    if (!serviceRequest) {
      return NextResponse.json(
        { error: 'Service request not found' },
        { status: 404 }
      )
    }

    // Check permissions - only owner or admin can update
    if (serviceRequest.userId !== userId && userRole !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    // Update the service request
    const updatedRequest = await prisma.serviceRequest.update({
      where: { id: params.id },
      data: {
        status: data.status || serviceRequest.status,
        adminNotes: data.adminNotes !== undefined ? data.adminNotes : serviceRequest.adminNotes
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

    // If approved, create a project (idempotent)
    if (data.status === 'APPROVED' && serviceRequest.status !== 'APPROVED') {
      // If a project already exists for this request, do nothing
      const existingProject = await prisma.project.findFirst({
        where: { serviceRequestId: serviceRequest.id }
      })

      if (!existingProject) {
        const project = await prisma.project.create({
          data: {
            userId: serviceRequest.userId,
            name: serviceRequest.title,
            description: serviceRequest.description,
            status: 'ACTIVE',
            creditBalance: serviceRequest.budget ?? 30000,
            serviceId: serviceRequest.serviceId ?? null,
            serviceRequestId: serviceRequest.id
          }
        })

        // Log project creation
        await prisma.activityLog.create({
          data: {
            action: 'PROJECT_CREATED_FROM_REQUEST',
            entity: 'PROJECT',
            entityId: project.id,
            userId: serviceRequest.userId,
            metadata: JSON.stringify({
              serviceRequestId: serviceRequest.id,
              projectId: project.id,
              title: project.name
            })
          }
        })
      }
    }

    // Log status update
    await prisma.activityLog.create({
      data: {
        action: 'SERVICE_REQUEST_UPDATED',
        entity: 'SERVICE_REQUEST',
        entityId: params.id,
        userId,
        metadata: JSON.stringify({
          oldStatus: serviceRequest.status,
          newStatus: data.status,
          title: serviceRequest.title
        })
      }
    })

    return NextResponse.json(updatedRequest)
  } catch (error: any) {
    console.error('Error updating service request:', error)
    return NextResponse.json(
      { error: 'Failed to update service request' },
      { status: 500 }
    )
  }
}

// DELETE /api/dashboard/service-requests/[id] - Delete service request
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const userRole = (session.user as any).role

    // Verify the service request exists and user owns it
    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id: params.id }
    })

    if (!serviceRequest) {
      return NextResponse.json(
        { error: 'Service request not found' },
        { status: 404 }
      )
    }

    // Check permissions - only owner or admin can delete
    if (serviceRequest.userId !== userId && userRole !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    // Don't allow deletion if already approved
    if (serviceRequest.status === 'APPROVED') {
      return NextResponse.json(
        { error: 'Cannot delete approved service requests' },
        { status: 400 }
      )
    }

    // Delete the service request
    await prisma.serviceRequest.delete({
      where: { id: params.id }
    })

    // Log deletion
    await prisma.activityLog.create({
      data: {
        action: 'SERVICE_REQUEST_DELETED',
        entity: 'SERVICE_REQUEST',
        entityId: params.id,
        userId,
        metadata: JSON.stringify({
          title: serviceRequest.title,
          serviceId: serviceRequest.serviceId
        })
      }
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting service request:', error)
    return NextResponse.json(
      { error: 'Failed to delete service request' },
      { status: 500 }
    )
  }
}