import { NextResponse } from 'next/server'
import { auth } from '../../../../../lib/auth'
import { prisma } from '../../../../../lib/prisma'

// GET /api/dashboard/tasks/[id] - Get single task
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
    const taskId = params.id

    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        project: {
          userId
        }
      },
      include: {
        project: {
          include: {
            service: true
          }
        },
        comments: {
          include: {
            user: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(task)
  } catch (error: any) {
    console.error('Error fetching task:', error)
    return NextResponse.json(
      { error: 'Failed to fetch task' },
      { status: 500 }
    )
  }
}

// PATCH /api/dashboard/tasks/[id] - Update task
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
    const taskId = params.id
    const data = await request.json()

    // Verify task belongs to user's project
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
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

    // Update the task
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title: data.title || task.title,
        description: data.description !== undefined ? data.description : task.description,
        status: data.status || task.status,
        dueDate: data.dueDate !== undefined ? (data.dueDate ? new Date(data.dueDate) : null) : task.dueDate
      },
      include: {
        project: true
      }
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: 'UPDATED',
        entity: 'TASK',
        entityId: taskId,
        userId,
        metadata: JSON.stringify({
          changes: data,
          previousValues: {
            title: task.title,
            description: task.description,
            status: task.status,
            dueDate: task.dueDate
          }
        })
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

// DELETE /api/dashboard/tasks/[id] - Delete task
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
    const taskId = params.id

    // Verify task belongs to user's project
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
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

    // Delete task
    await prisma.task.delete({
      where: { id: taskId }
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: 'DELETED',
        entity: 'TASK',
        entityId: taskId,
        userId,
        metadata: JSON.stringify({
          taskTitle: task.title
        })
      }
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting task:', error)
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    )
  }
}