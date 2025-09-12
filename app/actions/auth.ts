'use server'

import { signIn } from '../../lib/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'

export async function signInAction(email: string, password: string) {
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/dashboard',
    })
    // If we reach here, sign-in was successful
    redirect('/dashboard')
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' }
        default:
          return { error: 'Something went wrong' }
      }
    }
    throw error
  }
}