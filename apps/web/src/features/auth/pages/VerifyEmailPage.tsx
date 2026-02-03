import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'

import { verifyEmail } from '@/features/auth/api/authApi'
import { toast } from '@/components/ui/use-toast'
import { CenteredAuthLayout } from '@/components/layout/CenteredAuthLayout'

export function VerifyEmailPage() {
  const [params] = useSearchParams()
  const token = params.get('token') || ''
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    if (!token) return
    verifyEmail(token)
      .then(() => {
        setStatus('success')
        toast.success('Email verified')
      })
      .catch(() => {
        setStatus('error')
        toast.error('Verification failed')
      })
  }, [token])

  return (
    <CenteredAuthLayout title="Verify email">
      {status === 'success' && (
        <p className="text-slate-600">Email verified. <Link to="/login" className="underline">Login</Link></p>
      )}
      {status === 'error' && (
        <p className="text-slate-600">Verification failed. <Link to="/resend-verification" className="underline">Resend</Link></p>
      )}
      {status === 'idle' && <p className="text-slate-600">Verifying...</p>}
    </CenteredAuthLayout>
  )
}
