// export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { auth } from '../../../../lib/auth'
import { prisma } from '../../../../lib/prisma'

// GET /api/dashboard/team - Get all team members
export async function GET(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const teamMembers = await prisma.teamMember.findMany({
      orderBy: [
        { available: 'desc' },
        { name: 'asc' }
      ]
    })

    return NextResponse.json(teamMembers)
  } catch (error: any) {
    console.error('Error fetching team members:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    )
  }
}