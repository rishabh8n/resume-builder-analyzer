import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { resetPassword } from '@/features/auth/api/authApi'

export function ResetPasswordPage() {
  const [params] = useSearchParams()
  const token = params.get('token') || ''
  const [password, setPassword] = useState('')
  const [done, setDone] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await resetPassword(token, password)
    setDone(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-md px-6 py-16">
        <h1 className="text-2xl font-semibold">Reset password</h1>
        {done ? (
          <p className="mt-4 text-slate-600">Password updated. <Link to="/login" className="underline">Login</Link></p>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <input
              className="w-full rounded-md border px-3 py-2"
              placeholder="New password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full rounded-md bg-slate-900 px-4 py-2 text-white">Update password</button>
          </form>
        )}
      </div>
    </div>
  )
}
