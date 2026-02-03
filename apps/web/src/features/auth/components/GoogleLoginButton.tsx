import { GoogleLogin } from '@react-oauth/google'
import { googleLogin } from '@/features/auth/api/authApi'
import { useAuthStore } from '@/features/auth/store/useAuthStore'

export function GoogleLoginButton() {
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated)
  const setError = useAuthStore((s) => s.setError)

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        if (!credentialResponse.credential) return
        const res = await googleLogin(credentialResponse.credential)
        setAuthenticated(res.data.user)
      }}
      onError={() => {
        setError('Google login failed')
      }}
    />
  )
}
