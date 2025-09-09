import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '../../../../lib/prisma'

export async function POST(req: Request) {
  try {
    const { name, email, password, company } = await req.json()

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'CLIENT'
      }
    })

    // Create initial project with $300 trial credit
    await prisma.project.create({
      data: {
        name: `${company || name}'s Trial Project`,
        description: 'Your trial project with $300 credit to explore our services',
        status: 'ACTIVE',
        userId: user.id,
        creditBalance: 30000 // $300 in cents
      }
    })

    return NextResponse.json(
      { message: 'Account created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    )
  }
}