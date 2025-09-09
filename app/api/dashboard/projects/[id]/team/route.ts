import { NextResponse } from 'next/server'
import { auth } from '../../../../../../lib/auth'
import { prisma } from '../../../../../../lib/prisma'

// GET /api/dashboard/projects/[id]/team - Get project team
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

    // Get project team members
    const projectTeam = await prisma.projectTeam.findMany({
      where: { projectId },
      include: {
        teamMember: true
      }
    })

    return NextResponse.json(projectTeam)
  } catch (error: any) {
    console.error('Error fetching project team:', error)
    return NextResponse.json(
      { error: 'Failed to fetch project team' },
      { status: 500 }
    )
  }
}

// POST /api/dashboard/projects/[id]/team - Update project team
export async function POST(
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
    const { team } = await request.json()

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

    // Delete existing team assignments
    await prisma.projectTeam.deleteMany({
      where: { projectId }
    })

    // Create new team assignments
    const projectTeamData = team.map((member: any) => ({
      projectId,
      teamMemberId: member.teamMemberId,
      role: member.role || null,
      hoursPerWeek: member.hoursPerWeek || null
    }))

    await prisma.projectTeam.createMany({
      data: projectTeamData
    })

    // Return updated team
    const updatedTeam = await prisma.projectTeam.findMany({
      where: { projectId },
      include: {
        teamMember: true
      }
    })

    return NextResponse.json(updatedTeam)
  } catch (error: any) {
    console.error('Error updating project team:', error)
    return NextResponse.json(
      { error: 'Failed to update project team' },
      { status: 500 }
    )
  }
}