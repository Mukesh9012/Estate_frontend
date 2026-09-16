import { useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function Signup({ onAuthenticated }) {
  const [mode, setMode] = useState('signup')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setIsError(false)
    setMessage(
      mode === 'signup'
        ? 'Creating account...'
        : mode === 'login'
          ? 'Signing you in...'
          : 'Updating your password...',
    )

    try {
      const formData = new FormData(event.target)
      const isSignup = mode === 'signup'
      const isReset = mode === 'reset'
      const endpoint = isReset ? 'reset-password' : mode

      const response = await fetch(`${API_BASE_URL}/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(isSignup && { name: formData.get('name'), phone: formData.get('phone') }),
          ...(isReset && { phone: formData.get('phone') }),
          email: formData.get('email'),
          password: formData.get('password'),
        }),
      })

      const responseText = await response.text()
      let data

      try {
        data = JSON.parse(responseText)
      } catch {
        throw new Error(
          response.status === 404
            ? 'The backend route was not found. Restart the backend server and try again.'
            : 'The server returned an unexpected response. Please try again.',
        )
      }

      if (!response.ok) {
        throw new Error(data.message)
      }

      setMessage(data.message)
      setIsError(false)
      event.target.reset()

      if (mode === 'login') {
        onAuthenticated(data.user)
      } else if (mode === 'reset') {
        setMode('login')
      }
    } catch (error) {
      setIsError(true)
      setMessage(error.message || 'Signup failed.')
    }
  }

  return (
    <div className="auth-section px-6 py-16">
      <div className="auth-card mx-auto max-w-md">
        <div className="auth-tabs" role="tablist" aria-label="Authentication options">
          <button
            type="button"
            className={mode === 'signup' ? 'auth-tab active' : 'auth-tab'}
            onClick={() => { setMode('signup'); setMessage('') }}
          >
            Sign up
          </button>
          <button
            type="button"
            className={mode === 'login' ? 'auth-tab active' : 'auth-tab'}
            onClick={() => { setMode('login'); setMessage('') }}
          >
            Log in
          </button>
          {mode === 'reset' && (
            <button type="button" className="auth-tab active">
              Reset
            </button>
          )}
        </div>

        <h2>
          {mode === 'signup' ? 'Create an Account' : mode === 'login' ? 'Welcome back' : 'Reset your password'}
        </h2>
        <p className="auth-subtitle">
          {mode === 'signup'
            ? 'Save your favorite homes and connect with our team.'
            : mode === 'login'
              ? 'Log in to continue exploring your saved properties.'
              : 'Verify your email and phone number to choose a new password.'}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <input name="name" type="text" placeholder="Full name" required />
          )}
          <input name="email" type="email" placeholder="Email address" required />
          {(mode === 'signup' || mode === 'reset') && (
            <input name="phone" type="tel" placeholder="Phone number" required />
          )}
          <input
            name="password"
            type="password"
            placeholder="Password"
            minLength={mode === 'login' ? undefined : 8}
            required
          />

          <button type="submit" className="auth-submit">
            {mode === 'signup' ? 'Create Account' : mode === 'login' ? 'Log In' : 'Update Password'}
          </button>

          {message && <p className={isError ? 'auth-message error' : 'auth-message'}>{message}</p>}
        </form>
        {mode === 'login' && (
          <button type="button" className="forgot-password" onClick={() => { setMode('reset'); setMessage('') }}>
            Forgot password?
          </button>
        )}
        {mode === 'reset' && (
          <button type="button" className="forgot-password" onClick={() => { setMode('login'); setMessage('') }}>
            Back to login
          </button>
        )}
      </div>
    </div>
  )
}

export default Signup