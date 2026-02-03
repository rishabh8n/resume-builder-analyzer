import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'

import { resendVerification } from '@/features/auth/api/authApi'
import { resendSchema } from '@/features/auth/validators'
import { toast } from '@/components/ui/use-toast'
import { CenteredAuthLayout } from '@/components/layout/CenteredAuthLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type FormData = { email: string }

export function ResendVerificationPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(resendSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = async (data: FormData) => {
    try {
      await resendVerification(data.email)
      toast.success('Verification email sent')
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Failed to send email')
    }
  }

  return (
    <CenteredAuthLayout title="Resend verification">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Email</Label>
          <Input type="email" placeholder="you@email.com" {...register('email')} />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <Button className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send email'}
        </Button>
      </form>
      <div className="mt-4 text-sm text-slate-600">
        <Link to="/login" className="underline">Back to login</Link>
      </div>
    </CenteredAuthLayout>
  )
}
