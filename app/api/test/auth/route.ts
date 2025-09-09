import { NextResponse } from 'next/server'
import { authOptions } from '../../../../lib/auth'
import { prisma } from '../../../../lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET(request: Request) {
  try {
    // Test database connection
    const userCount = await prisma.user.count()
    
    // Test finding test user
    const testUser = await prisma.user.findUnique({
      where: { email: 'test@example.com' }
    })
    
    let passwordValid = false
    if (testUser?.password) {
      passwordValid = await bcrypt.compare('password123', testUser.password)
    }
    
    return NextResponse.json({
      status: 'ok',
      database: {
        connected: true,
        userCount,
        testUser: testUser ? { 
          id: testUser.id, 
          email: testUser.email,
          hasPassword: !!testUser.password,
          passwordValid
        } : null
      },
      environment: {
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        nextAuthUrl: process.env.NEXTAUTH_URL
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      error: error.message
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    
    // Try to authenticate manually
    const user = await prisma.user.findUnique({
      where: { email }
    })
    
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      })
    }
    
    if (!user.password) {
      return NextResponse.json({
        success: false,
        error: 'User has no password'
      })
    }
    
    const isValid = await bcrypt.compare(password, user.password)
    
    return NextResponse.json({
      success: isValid,
      user: isValid ? {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      } : null
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
