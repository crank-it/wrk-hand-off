import { NextResponse } from 'next/server'
import { auth } from '../../../../lib/auth'
import { prisma } from '../../../../lib/prisma'

// GET /api/dashboard/tasks - Get all tasks for authenticated user's projects
export async function GET(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id

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

    return NextResponse.json(tasks)
  } catch (error: any) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    )
  }
}

// POST /api/dashboard/tasks - Create a new task
export async function POST(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const data = await request.json()

    // Validate required fields
    if (!data.projectId || !data.title) {
      return NextResponse.json(
        { error: 'Project ID and title are required' },
        { status: 400 }
      )
    }

    // Verify the project belongs to the user
    const project = await prisma.project.findFirst({
      where: {
        id: data.projectId,
        userId
      }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Create the task
    const task = await prisma.task.create({
      data: {
        projectId: data.projectId,
        title: data.title,
        description: data.description || null,
        status: data.status || 'TODO',
        dueDate: data.dueDate ? new Date(data.dueDate) : null
      },
      include: {
        project: true
      }
    })

    return NextResponse.json(task)
  } catch (error: any) {
    console.error('Error creating task:', error)
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    )
  }
}

// PATCH /api/dashboard/tasks - Update task status
export async function PATCH(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const data = await request.json()

    if (!data.id || !data.status) {
      return NextResponse.json(
        { error: 'Task ID and status are required' },
        { status: 400 }
      )
    }

    // Verify the task belongs to a user's project
    const task = await prisma.task.findFirst({
      where: {
        id: data.id,
        project: {
          userId
        }
      }
    })

    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      )
    }

    // Update the task status
    const updatedTask = await prisma.task.update({
      where: { id: data.id },
      data: { status: data.status },
      include: {
        project: true
      }
    })

    return NextResponse.json(updatedTask)
  } catch (error: any) {
    console.error('Error updating task:', error)
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    )
  }
}