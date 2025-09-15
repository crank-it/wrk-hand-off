import { NextRequest, NextResponse } from 'next/server'
import { auth } from '../../../../lib/auth'
import { prisma } from '../../../../lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const data = await request.json()

    // Create a project for the email campaign
    const project = await prisma.project.create({
      data: {
        name: data.campaignName || 'Email Campaign',
        description: `Email Marketing Campaign - ${data.emailType || 'General'}`,
        userId,
        serviceId: null, // We can link to an Email Marketing service if it exists
        status: 'ACTIVE'
      }
    })

    // Create tasks based on the campaign requirements
    const tasks = []

    // Always create a planning task
    tasks.push({
      title: 'Campaign Planning & Strategy',
      description: `Plan the ${data.campaignName || 'email campaign'} including audience targeting and content strategy`,
      projectId: project.id,
      status: 'TODO',
      dueDate: data.sendDate ? new Date(new Date(data.sendDate).getTime() - 3 * 24 * 60 * 60 * 1000) : null // 3 days before send date
    })

    // Content creation task based on who's providing content
    if (data.contentProvider === 'agency') {
      tasks.push({
        title: 'Content Creation',
        description: `Create email content based on brief: ${data.emailBrief || 'Generate email content'}`,
        projectId: project.id,
        status: 'TODO',
        dueDate: data.sendDate ? new Date(new Date(data.sendDate).getTime() - 2 * 24 * 60 * 60 * 1000) : null // 2 days before send date
      })
    } else if (data.contentProvider === 'client') {
      tasks.push({
        title: 'Content Review & Setup',
        description: `Review and set up provided content: ${data.subjectLine || 'Client-provided content'}`,
        projectId: project.id,
        status: 'TODO',
        dueDate: data.sendDate ? new Date(new Date(data.sendDate).getTime() - 1 * 24 * 60 * 60 * 1000) : null // 1 day before send date
      })
    }

    // Segmentation task if needed
    if (data.isSegmented) {
      tasks.push({
        title: 'Audience Segmentation',
        description: `Set up audience segments: ${data.segments || 'Configure email segments'}`,
        projectId: project.id,
        status: 'TODO',
        dueDate: data.sendDate ? new Date(new Date(data.sendDate).getTime() - 1 * 24 * 60 * 60 * 1000) : null
      })
    }

    // Campaign setup and testing
    tasks.push({
      title: 'Campaign Setup & Testing',
      description: 'Configure email campaign settings, test emails, and prepare for deployment',
      projectId: project.id,
      status: 'TODO',
      dueDate: data.sendDate ? new Date(new Date(data.sendDate).getTime() - 12 * 60 * 60 * 1000) : null // 12 hours before send
    })

    // Send campaign task
    tasks.push({
      title: 'Deploy Email Campaign',
      description: `Send ${data.emailType || 'email'} campaign to ${data.isSegmented ? 'segmented audience' : 'entire list'}`,
      projectId: project.id,
      status: 'TODO',
      dueDate: data.sendDate ? new Date(data.sendDate) : null
    })

    // Create all tasks
    await prisma.task.createMany({
      data: tasks
    })

    // Store the campaign data as metadata (you might want to create a separate EmailCampaign model)
    await prisma.project.update({
      where: { id: project.id },
      data: {
        description: `${project.description}\n\nCampaign Details:\n${JSON.stringify(data, null, 2)}`
      }
    })

    return NextResponse.json({
      success: true,
      project,
      tasksCreated: tasks.length,
      message: 'Email campaign created successfully with associated tasks'
    })

  } catch (error) {
    console.error('Error creating email campaign:', error)
    return NextResponse.json(
      { error: 'Failed to create email campaign' },
      { status: 500 }
    )
  }
}