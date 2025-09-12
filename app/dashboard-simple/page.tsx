import { auth } from '../../lib/auth'
import { redirect } from 'next/navigation'

export default async function SimpleDashboard() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/signin')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🎉 SUCCESS! You're signed in!
          </h1>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800">
              ✅ Authentication is working perfectly!
            </p>
          </div>
          
          <div className="space-y-4">
            <p><strong>Name:</strong> {session.user.name}</p>
            <p><strong>Email:</strong> {session.user.email}</p>
            <p><strong>ID:</strong> {(session.user as any).id}</p>
            <p><strong>Role:</strong> {(session.user as any).role}</p>
          </div>
          
          <div className="mt-8">
            <a 
              href="/dashboard" 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Try Full Dashboard →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}