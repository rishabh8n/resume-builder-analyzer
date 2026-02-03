import { GoogleLogin } from '@react-oauth/google'
import { googleLogin } from '@/features/auth/api/authApi'
import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { toast } from '@/components/ui/use-toast'

export function GoogleLoginButton() {
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated)
  const setError = useAuthStore((s) => s.setError)

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        if (!credentialResponse.credential) return
        try {
          const res = await googleLogin(credentialResponse.credential)
          setAuthenticated(res.data.user)
          toast.success('Signed in with Google')
        } catch (e: any) {
          setError('Google login failed')
          toast.error(e?.response?.data?.message || 'Google login failed')
        }
      }}
      onError={() => {
        setError('Google login failed')
        toast.error('Google login failed')
      }}
    />
  )
}
