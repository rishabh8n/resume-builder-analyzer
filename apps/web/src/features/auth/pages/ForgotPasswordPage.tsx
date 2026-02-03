import { useState } from 'react'
import { Link } from 'react-router-dom'
import { forgotPassword } from '@/features/auth/api/authApi'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await forgotPassword(email)
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-md px-6 py-16">
        <h1 className="text-2xl font-semibold">Forgot password</h1>
        {sent ? (
          <p className="mt-4 text-slate-600">Check your email for the reset link.</p>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <input
              className="w-full rounded-md border px-3 py-2"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="w-full rounded-md bg-slate-900 px-4 py-2 text-white">Send link</button>
          </form>
        )}
        <div className="mt-4 text-sm text-slate-600">
          <Link to="/login" className="underline">Back to login</Link>
        </div>
      </div>
    </div>
  )
}
