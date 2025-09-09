import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'

async function createTestUser() {
  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: 'test@example.com' }
    })
    
    // Hash the password
    const hashedPassword = await bcrypt.hash('password123', 10)
    
    let user
    if (existingUser) {
      // Update existing user
      user = await prisma.user.update({
        where: { email: 'test@example.com' },
        data: {
          password: hashedPassword,
          name: 'Test User',
          role: 'CLIENT'
        }
      })
      console.log('✅ Test user updated successfully')
    } else {
      // Create new test user
      user = await prisma.user.create({
        data: {
          email: 'test@example.com',
          name: 'Test User',
          password: hashedPassword,
          role: 'CLIENT'
        }
      })
      console.log('✅ Test user created successfully')
    }
    
    console.log('Email: test@example.com')
    console.log('Password: password123')
    console.log('User ID:', user.id)
    
    // Verify password works
    const isValid = await bcrypt.compare('password123', user.password!)
    console.log('Password verification:', isValid ? '✅ Valid' : '❌ Invalid')
    
  } catch (error) {
    console.error('❌ Error creating test user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestUser()
