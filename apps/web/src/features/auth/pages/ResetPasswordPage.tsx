import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams, Link } from 'react-router-dom'

import { resetPassword } from '@/features/auth/api/authApi'
import { resetSchema } from '@/features/auth/validators'
import { toast } from '@/components/ui/use-toast'
import { CenteredAuthLayout } from '@/components/layout/CenteredAuthLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type FormData = { token: string; newPassword: string }

export function ResetPasswordPage() {
  const [params] = useSearchParams()
  const token = params.get('token') || ''

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(resetSchema),
    defaultValues: { token, newPassword: '' },
  })

  const onSubmit = async (data: FormData) => {
    try {
      await resetPassword(data.token, data.newPassword)
      toast.success('Password updated')
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Reset failed')
    }
  }

  return (
    <CenteredAuthLayout title="Reset password" subtitle="Set a new password">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>New password</Label>
          <Input type="password" placeholder="********" {...register('newPassword')} />
          {errors.newPassword && <p className="mt-1 text-xs text-red-600">{errors.newPassword.message}</p>}
        </div>
        <Button className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update password'}
        </Button>
      </form>
      <div className="mt-4 text-sm text-slate-600">
        <Link to="/login" className="underline">Back to login</Link>
      </div>
    </CenteredAuthLayout>
  )
}
