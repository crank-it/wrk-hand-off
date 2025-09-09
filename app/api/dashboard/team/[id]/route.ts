import { NextResponse } from 'next/server'
import { auth } from '../../../../../lib/auth'
import { prisma } from '../../../../../lib/prisma'

// PATCH /api/dashboard/team/[id] - Update team member
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
    const memberId = params.id
    const data = await request.json()

    // Check if team member exists
    const member = await prisma.teamMember.findUnique({
      where: { id: memberId }
    })

    if (!member) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      )
    }

    // Update team member
    const updatedMember = await prisma.teamMember.update({
      where: { id: memberId },
      data: {
        available: data.available !== undefined ? data.available : member.available,
        role: data.role || member.role,
        bio: data.bio !== undefined ? data.bio : member.bio,
        skills: data.skills !== undefined ? data.skills : member.skills
      }
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: 'UPDATED',
        entity: 'TEAM',
        entityId: memberId,
        userId,
        metadata: JSON.stringify({
          memberName: member.name,
          changes: data
        })
      }
    })

    return NextResponse.json(updatedMember)
  } catch (error: any) {
    console.error('Error updating team member:', error)
    return NextResponse.json(
      { error: 'Failed to update team member' },
      { status: 500 }
    )
  }
}