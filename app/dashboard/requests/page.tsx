import { auth } from '../../../lib/auth'
import { prisma } from '../../../lib/prisma'
import { redirect } from 'next/navigation'
import { ServiceRequestsClient } from '../../../components/ServiceRequestsClient'

export default async function RequestsPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/signin')
  }

  const userId = (session.user as any).id

  // .Fetch service requests
  const requests = await prisma.serviceRequest.findMany({
    where: { userId },
    include: {
      service: true,
      project: true,
      user: true
    },
    orderBy: { createdAt: 'desc' }
  })

  // Fetch available services
  const services = await prisma.service.findMany({
    orderBy: { name: 'asc' }
  })

  return <ServiceRequestsClient initialRequests={requests as any} services={services} />
}