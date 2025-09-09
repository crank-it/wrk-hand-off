import { NextResponse } from 'next/server'
import { auth } from '../../../../../lib/auth'
import { prisma } from '../../../../../lib/prisma'

// GET /api/dashboard/projects/[id] - Get single project
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const projectId = params.id

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId
      },
      include: {
        service: true,
        tasks: {
          orderBy: { createdAt: 'desc' }
        },
        projectTeams: {
          include: {
            teamMember: true
          }
        }
      }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(project)
  } catch (error: any) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}

// PATCH /api/dashboard/projects/[id] - Update project
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
    const projectId = params.id
    const data = await request.json()

    // Verify project belongs to user
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId
      }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Update the project
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        name: data.name || project.name,
        description: data.description !== undefined ? data.description : project.description,
        status: data.status || project.status,
        creditBalance: data.creditBalance !== undefined ? data.creditBalance : project.creditBalance
      },
      include: {
        service: true,
        tasks: true,
        projectTeams: {
          include: {
            teamMember: true
          }
        }
      }
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: 'UPDATED',
        entity: 'PROJECT',
        entityId: projectId,
        userId,
        metadata: JSON.stringify({
          changes: data,
          previousValues: {
            name: project.name,
            description: project.description,
            status: project.status,
            creditBalance: project.creditBalance
          }
        })
      }
    })

    return NextResponse.json(updatedProject)
  } catch (error: any) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

// DELETE /api/dashboard/projects/[id] - Delete project
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
    const projectId = params.id

    // Verify project belongs to user
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId
      }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Delete project (cascades to tasks and team assignments)
    await prisma.project.delete({
      where: { id: projectId }
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: 'DELETED',
        entity: 'PROJECT',
        entityId: projectId,
        userId,
        metadata: JSON.stringify({
          projectName: project.name
        })
      }
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}