import { auth } from '../../../../lib/auth'
import { prisma } from '../../../../lib/prisma'
import { redirect, notFound } from 'next/navigation'
import { ProjectDetailClient } from '../../../../components/ProjectDetailClient'

export default async function ProjectDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/signin')
  }

  const userId = (session.user as any).id

  // Fetch the project with all related data
  const project = await prisma.project.findFirst({
    where: {
      id: params.id,
      userId
    },
    include: {
      service: true,
      tasks: {
        orderBy: { createdAt: 'desc' }
      },
      serviceRequest: true,
      projectTeams: {
        include: {
          teamMember: true
        }
      }
    }
  })

  if (!project) {
    notFound()
  }

  return <ProjectDetailClient project={project} projectTeam={project.projectTeams} />
}