'use client'

import { useState } from 'react'

export default function TestSignIn() {
  const [status, setStatus] = useState('')
  
  const testSignIn = async () => {
    setStatus('Testing credentials...')
    
    try {
      const response = await fetch('/api/auth/custom-signin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: 'jco@yoonet.io',
          password: prompt('Enter your password:')
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setStatus('✅ Credentials valid! User: ' + data.user.email)
        
        // Now try to sign in
        setStatus(prev => prev + '\n\nAttempting actual sign-in...')
        window.location.href = '/api/auth/signin?callbackUrl=/dashboard'
      } else {
        setStatus('❌ Invalid credentials: ' + data.error)
      }
    } catch (err: any) {
      setStatus('❌ Error: ' + err.message)
    }
  }
  
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Sign-In Test Page</h1>
      <button 
        onClick={testSignIn}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Test Sign In
      </button>
      <pre className="mt-4 p-4 bg-gray-100">{status}</pre>
    </div>
  )
}