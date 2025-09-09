import { NextResponse } from 'next/server'
import { auth } from '../../../../../../../lib/auth'
import { prisma } from '../../../../../../../lib/prisma'

// DELETE /api/dashboard/tasks/[id]/comments/[commentId] - Delete comment
export async function DELETE(
  request: Request,
  { params }: { params: { id: string; commentId: string } }
) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const { id: taskId, commentId } = params

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

    // Verify comment exists and belongs to user
    const comment = await prisma.comment.findFirst({
      where: {
        id: commentId,
        taskId,
        userId
      }
    })

    if (!comment) {
      return NextResponse.json(
        { error: 'Comment not found or unauthorized' },
        { status: 404 }
      )
    }

    // Delete comment
    await prisma.comment.delete({
      where: { id: commentId }
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        action: 'DELETED',
        entity: 'COMMENT',
        entityId: commentId,
        userId,
        metadata: JSON.stringify({
          taskId,
          commentContent: comment.content
        })
      }
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting comment:', error)
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    )
  }
}