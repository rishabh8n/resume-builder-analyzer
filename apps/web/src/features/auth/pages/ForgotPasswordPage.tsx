import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'

import { forgotPassword } from '@/features/auth/api/authApi'
import { forgotSchema } from '@/features/auth/validators'
import { toast } from '@/components/ui/use-toast'
import { CenteredAuthLayout } from '@/components/layout/CenteredAuthLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type FormData = { email: string }

export function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = async (data: FormData) => {
    try {
      await forgotPassword(data.email)
      toast.success('Reset link sent')
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Failed to send reset link')
    }
  }

  return (
    <CenteredAuthLayout title="Forgot password" subtitle="We’ll email you a reset link">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Email</Label>
          <Input type="email" placeholder="you@email.com" {...register('email')} />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <Button className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send link'}
        </Button>
      </form>
      <div className="mt-4 text-sm text-slate-600">
        <Link to="/login" className="underline">Back to login</Link>
      </div>
    </CenteredAuthLayout>
  )
}
