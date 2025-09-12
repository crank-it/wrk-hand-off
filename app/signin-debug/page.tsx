'use client'

import { useState } from 'react'

export default function DebugSignIn() {
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setStatus('Starting sign-in process...')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      // First test - verify credentials work
      setStatus('Step 1: Verifying credentials...')
      
      const verifyResponse = await fetch('/api/auth/custom-signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const verifyResult = await verifyResponse.json()
      
      if (verifyResult.error) {
        setStatus('❌ Credentials invalid: ' + verifyResult.error)
        setLoading(false)
        return
      }
      
      setStatus('✅ Credentials valid! User: ' + verifyResult.user.email)
      
      // Step 2 - Try NextAuth signin
      setStatus(prev => prev + '\n\nStep 2: Attempting NextAuth sign-in...')
      
      // Try a direct form submission to NextAuth
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = '/api/auth/signin/credentials'
      
      const csrfResponse = await fetch('/api/auth/csrf')
      const { csrfToken } = await csrfResponse.json()
      
      const fields = {
        email: email,
        password: password,
        csrfToken: csrfToken,
        callbackUrl: '/dashboard'
      }
      
      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = value
        form.appendChild(input)
      })
      
      document.body.appendChild(form)
      setStatus(prev => prev + '\n✅ Submitting form to NextAuth...')
      form.submit()
      
    } catch (error: any) {
      setStatus('❌ Error: ' + error.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Debug Sign In</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full p-2 border rounded"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Debug Sign In'}
          </button>
        </form>
        
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-bold mb-2">Debug Output:</h3>
          <pre className="whitespace-pre-wrap text-sm">{status}</pre>
        </div>
      </div>
    </div>
  )
}