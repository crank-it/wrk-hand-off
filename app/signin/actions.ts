'use server'

import { signIn } from '../../lib/auth'
import { redirect } from 'next/navigation'

export async function handleSignIn(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Please provide both email and password' }
  }

  try {
    console.log('Server action: Attempting signin with:', email)
    
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    console.log('Server action: SignIn result:', result)

    if (result?.error) {
      console.log('Server action: Auth failed:', result.error)
      return { error: 'Invalid email or password' }
    }

    console.log('Server action: Auth successful, redirecting...')
    // If successful, redirect to dashboard
    redirect('/dashboard')
    
  } catch (error) {
    console.error('Server action: SignIn error:', error)
    return { error: 'An error occurred during sign in' }
  }
}