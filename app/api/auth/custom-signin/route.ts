import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '../../../../lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    console.log('Custom signin attempt:', { email, passwordLength: password?.length })

    if (!email || !password) {
      console.log('Missing email or password')
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { email }
    })

    console.log('User found:', { 
      exists: !!user, 
      hasPassword: !!user?.password,
      passwordLength: user?.password?.length 
    })

    if (!user || !user.password) {
      console.log('User not found or no password in database')
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    console.log('Comparing passwords...')
    const isPasswordValid = await bcrypt.compare(password, user.password)
    console.log('Password valid:', isPasswordValid)

    if (!isPasswordValid) {
      console.log('Password comparison failed')
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    console.log('Authentication successful!')
    // If we get here, credentials are valid
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Custom sign-in error:', error)
    return NextResponse.json(
      { error: 'An error occurred during sign-in' },
      { status: 500 }
    )
  }
}