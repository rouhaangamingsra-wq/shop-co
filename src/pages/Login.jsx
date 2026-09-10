import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { firebaseEnabled } from '../firebase/config'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/account'
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const validate = () => {
    const e = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (ev) => {
    ev.preventDefault()
    setServerError('')
    if (!validate()) return
    setSubmitting(true)
    try {
      await login(form.email, form.password)
      navigate(from, { replace: true })
    } catch (err) {
      setServerError(err?.message?.replace('Firebase:', '').trim() || 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="shell flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-md card p-8">
        <h1 className="text-2xl font-extrabold tracking-tight">Login to SHOP.CO</h1>
        <p className="mt-2 text-sm text-muted">Welcome back. Please sign in to continue.</p>

        {!firebaseEnabled && (
          <p className="mt-4 rounded-pill bg-smoke px-4 py-2 text-xs text-muted">
            Dev mode: Firebase not configured. Any email/password will log you in as a mock user.
          </p>
        )}

        <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <input
              type="email"
              className="input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Password</label>
            <input
              type="password"
              className="input"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
            />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
          </div>
          {serverError && <p className="text-sm text-red-600">{serverError}</p>}
          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-ink underline underline-offset-4">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
