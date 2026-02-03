import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { verifyEmail } from '@/features/auth/api/authApi'

export function VerifyEmailPage() {
  const [params] = useSearchParams()
  const token = params.get('token') || ''
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    if (!token) return
    verifyEmail(token)
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'))
  }, [token])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-md px-6 py-16">
        <h1 className="text-2xl font-semibold">Verify email</h1>
        {status === 'success' && (
          <p className="mt-4 text-slate-600">Email verified. <Link to="/login" className="underline">Login</Link></p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-slate-600">Verification failed. <Link to="/login" className="underline">Try again</Link></p>
        )}
        {status === 'idle' && <p className="mt-4 text-slate-600">Verifying...</p>}
      </div>
    </div>
  )
}
