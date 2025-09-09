import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.findFirst({ where: { email: 'demo@wrk.ph' } })
  if (!user) throw new Error('Demo user not found. Run prisma seed first.')

  const service = await prisma.service.findFirst({ where: { slug: 'website-development' } })
  if (!service) throw new Error('Service with slug website-development not found.')

  const title = `Automated Test Request ${Date.now()}`

  const createdRequest = await prisma.serviceRequest.create({
    data: {
      userId: user.id,
      serviceId: service.id,
      title,
      description: 'Automated test service request creation',
      budget: 123450, // $1,234.50 in cents
      timeline: 'normal',
      requirements: 'None',
      status: 'PENDING'
    }
  })

  console.log('Created ServiceRequest:', createdRequest.id)

  // Simulate approval handler idempotency
  async function approveOnce() {
    const existing = await prisma.project.findFirst({ where: { serviceRequestId: createdRequest.id } })
    if (existing) return existing

    const createdProject = await prisma.project.create({
      data: {
        userId: createdRequest.userId,
        name: createdRequest.title,
        description: createdRequest.description,
        status: 'ACTIVE',
        creditBalance: createdRequest.budget ?? 30000,
        serviceId: createdRequest.serviceId ?? null,
        serviceRequestId: createdRequest.id
      }
    })
    return createdProject
  }

  const p1 = await approveOnce()
  const p2 = await approveOnce()

  console.log('Project created:', p1.id)
  console.log('Idempotent project same id:', p1.id === p2.id)
  console.log('Project creditBalance (cents):', p1.creditBalance)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})


