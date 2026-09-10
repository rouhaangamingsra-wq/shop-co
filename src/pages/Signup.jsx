import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { firebaseEnabled } from '../firebase/config'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const validate = () => {
    const e = {}
    if (form.name.trim().length < 2) e.name = 'Enter your name'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (form.password.length < 6) e.password = 'At least 6 characters'
    if (form.confirm !== form.password) e.confirm = 'Passwords do not match'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (ev) => {
    ev.preventDefault()
    setServerError('')
    if (!validate()) return
    setSubmitting(true)
    try {
      await signup(form.name, form.email, form.password)
      navigate('/account', { replace: true })
    } catch (err) {
      setServerError(err?.message?.replace('Firebase:', '').trim() || 'Signup failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="shell flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-md card p-8">
        <h1 className="text-2xl font-extrabold tracking-tight">Create your account</h1>
        <p className="mt-2 text-sm text-muted">Join SHOP.CO and start shopping your style.</p>

        {!firebaseEnabled && (
          <p className="mt-4 rounded-pill bg-smoke px-4 py-2 text-xs text-muted">
            Dev mode: Firebase not configured. Signup creates a mock user session.
          </p>
        )}

        <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Name</label>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <input type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Password</label>
            <input type="password" className="input" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Confirm password</label>
            <input type="password" className="input" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} placeholder="••••••••" />
            {errors.confirm && <p className="mt-1 text-xs text-red-600">{errors.confirm}</p>}
          </div>
          {serverError && <p className="text-sm text-red-600">{serverError}</p>}
          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            {submitting ? 'Creating account…' : 'Sign up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-ink underline underline-offset-4">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
