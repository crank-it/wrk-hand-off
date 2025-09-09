import { auth } from '../../../lib/auth'
import { redirect } from 'next/navigation'

export default async function MessagesPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/signin')
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600 mt-2">
          Communicate with your team and manage project discussions
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-12">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Messages Coming Soon</h3>
          <p className="text-gray-500">This feature is currently under development.</p>
        </div>
      </div>
    </div>
  )
}