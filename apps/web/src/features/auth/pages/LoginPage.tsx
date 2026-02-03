import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { GoogleLoginButton } from '@/features/auth/components/GoogleLoginButton'
import { loginSchema } from '@/features/auth/validators'
import { toast } from '@/components/ui/use-toast'
import { CenteredAuthLayout } from '@/components/layout/CenteredAuthLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type FormData = {
  email: string
  password: string
}

export function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const error = useAuthStore((s) => s.error)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password)
      toast.success('Welcome back')
      navigate('/')
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <CenteredAuthLayout title="Login" subtitle="Sign in to continue">
      <div className="mb-6">
        <GoogleLoginButton />
      </div>
      <div className="mb-6 text-center text-sm text-slate-500">or</div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
          {isSubmitting ? 'Signing in...' : 'Login'}
        </Button>
      </form>
      <div className="mt-4 text-sm text-slate-600">
        <Link to="/forgot-password" className="underline">Forgot password?</Link>
      </div>
      <div className="mt-2 text-sm text-slate-600">
        Don’t have an account? <Link to="/register" className="underline">Register</Link>
      </div>
    </CenteredAuthLayout>
  )
}
