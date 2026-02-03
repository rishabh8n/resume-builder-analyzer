import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { changePassword } from '@/features/auth/api/authApi'
import { changeSchema } from '@/features/auth/validators'
import { toast } from '@/components/ui/use-toast'
import { CenteredAuthLayout } from '@/components/layout/CenteredAuthLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type FormData = { currentPassword: string; newPassword: string }

export function ChangePasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(changeSchema),
    defaultValues: { currentPassword: '', newPassword: '' },
  })

  const onSubmit = async (data: FormData) => {
    try {
      await changePassword(data.currentPassword, data.newPassword)
      toast.success('Password updated')
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Failed to update password')
    }
  }

  return (
    <CenteredAuthLayout title="Change password">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Current password</Label>
          <Input type="password" placeholder="********" {...register('currentPassword')} />
          {errors.currentPassword && <p className="mt-1 text-xs text-red-600">{errors.currentPassword.message}</p>}
        </div>
        <div>
          <Label>New password</Label>
          <Input type="password" placeholder="********" {...register('newPassword')} />
          {errors.newPassword && <p className="mt-1 text-xs text-red-600">{errors.newPassword.message}</p>}
        </div>
        <Button className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update password'}
        </Button>
      </form>
    </CenteredAuthLayout>
  )
}
