import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { GoogleLoginButton } from '@/features/auth/components/GoogleLoginButton'
import { registerSchema } from '@/features/auth/validators'
import { toast } from '@/components/ui/use-toast'
import { CenteredAuthLayout } from '@/components/layout/CenteredAuthLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type FormData = {
  name: string
  email: string
  password: string
}

export function RegisterPage() {
  const navigate = useNavigate()
  const registerUser = useAuthStore((s) => s.register)
  const error = useAuthStore((s) => s.error)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' },
  })

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data.name, data.email, data.password)
      toast.success('Account created. Verify your email.')
      navigate('/')
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <CenteredAuthLayout title="Create account" subtitle="Start building your resume">
      <div className="mb-6">
        <GoogleLoginButton />
      </div>
      <div className="mb-6 text-center text-sm text-slate-500">or</div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Name</Label>
          <Input placeholder="Your name" {...register('name')} />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" placeholder="you@email.com" {...register('email')} />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" placeholder="********" {...register('password')} />
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create account'}
        </Button>
      </form>
      <div className="mt-2 text-sm text-slate-600">
        Already have an account? <Link to="/login" className="underline">Login</Link>
      </div>
    </CenteredAuthLayout>
  )
}
