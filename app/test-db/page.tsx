import { prisma } from '../../lib/prisma'
import bcrypt from 'bcryptjs'

export default async function TestDB() {
  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: 'jco@yoonet.io' }
    })

    if (!user) {
      return (
        <div className="p-8">
          <h1 className="text-2xl mb-4">Database Test</h1>
          <p className="text-red-600">❌ User jco@yoonet.io not found in database</p>
        </div>
      )
    }

    // Test password comparison
    let passwordTest = 'Unable to test'
    if (user.password) {
      try {
        const isValid = await bcrypt.compare('jcohannz', user.password)
        passwordTest = isValid ? '✅ Password matches!' : '❌ Password does not match'
      } catch (err) {
        passwordTest = '❌ Password comparison error: ' + (err as Error).message
      }
    }

    return (
      <div className="p-8 space-y-4">
        <h1 className="text-2xl mb-4">Database Test Results</h1>
        
        <div className="bg-white p-4 rounded border">
          <h2 className="font-bold mb-2">User Status:</h2>
          <p>✅ User exists: {user.email}</p>
          <p>✅ Name: {user.name}</p>
          <p>✅ Role: {user.role}</p>
          <p>Password stored: {user.password ? '✅ Yes' : '❌ No'}</p>
          {user.password && (
            <>
              <p>Password length: {user.password.length} characters</p>
              <p>Password starts with: {user.password.substring(0, 10)}...</p>
            </>
          )}
        </div>

        <div className="bg-white p-4 rounded border">
          <h2 className="font-bold mb-2">Password Test:</h2>
          <p>{passwordTest}</p>
        </div>

        <div className="bg-blue-50 p-4 rounded">
          <p className="text-blue-800">
            If password doesn't match, we need to reset it in the database.
          </p>
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl mb-4">Database Test</h1>
        <p className="text-red-600">❌ Database connection error: {(error as Error).message}</p>
      </div>
    )
  }
}