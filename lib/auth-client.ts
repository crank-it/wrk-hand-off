// Client-side authentication helper
export async function signInWithCredentials(email: string, password: string) {
  try {
    const response = await fetch('/api/auth/callback/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email,
        password,
        csrfToken: '', // NextAuth will handle this
      }),
    })

    if (!response.ok) {
      return { error: 'Invalid credentials' }
    }

    // Get the redirect URL from the response
    const data = await response.text()
    
    // Check if authentication was successful
    if (response.url.includes('error')) {
      return { error: 'Invalid email or password' }
    }

    return { ok: true }
  } catch (error) {
    console.error('Sign in error:', error)
    return { error: 'An error occurred during sign in' }
  }
}