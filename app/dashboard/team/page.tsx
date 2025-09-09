import { auth } from '../../../lib/auth'
import { prisma } from '../../../lib/prisma'
import { redirect } from 'next/navigation'
import { TeamClient } from '../../../components/TeamClient'

export default async function TeamPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/signin')
  }

  // Fetch all team members
  const teamMembers = await prisma.teamMember.findMany({
    orderBy: [
      { available: 'desc' },
      { name: 'asc' }
    ]
  })

  return <TeamClient initialMembers={teamMembers} />
}