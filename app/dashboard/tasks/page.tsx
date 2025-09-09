import { auth } from '../../../lib/auth'
import { prisma } from '../../../lib/prisma'
import { redirect } from 'next/navigation'
import { KanbanBoard } from '../../../components/KanbanBoard'

export default async function TasksPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/signin')
  }

  const userId = (session.user as any).id

  // Fetch all tasks for user's projects
  const tasks = await prisma.task.findMany({
    where: {
      project: {
        userId
      }
    },
    include: {
      project: {
        include: {
          service: true
        }
      }
    },
    orderBy: [
      { status: 'asc' },
      { createdAt: 'desc' }
    ]
  })

  // Calculate stats
  const overdueTasks = tasks.filter(t => 
    t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'DONE'
  ).length

  return (
    <KanbanBoard initialTasks={tasks} overdueTasks={overdueTasks} />
  )
}