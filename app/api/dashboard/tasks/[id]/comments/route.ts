import { NextResponse } from 'next/server'
import { auth } from '../../../../../../lib/auth'
import { prisma } from '../../../../../../lib/prisma'

// GET /api/dashboard/tasks/[id]/comments - Get task comments
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

    // Get comments
    const comments = await prisma.comment.findMany({
      where: { taskId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(comments)
  } catch (error: any) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}

// POST /api/dashboard/tasks/[id]/comments - Add comment
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
    const taskId = params.id
    const { content } = await request.json()

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: 'Comment content is required' },
        { status: 400 }
      )
    }

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

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        taskId,
        userId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: 'CREATED',
        entity: 'COMMENT',
        entityId: comment.id,
        userId,
        metadata: JSON.stringify({
          taskId,
          taskTitle: task.title
        })
      }
    })

    return NextResponse.json(comment)
  } catch (error: any) {
    console.error('Error creating comment:', error)
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}