import { Link } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { CenteredAuthLayout } from '@/components/layout/CenteredAuthLayout'
import { Button } from '@/components/ui/button'

export function ProfilePage() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  return (
    <CenteredAuthLayout title="Account">
      <div className="space-y-4">
        <div className="text-sm text-slate-600">
          <div><span className="font-medium text-slate-900">Name:</span> {user?.name}</div>
          <div><span className="font-medium text-slate-900">Email:</span> {user?.email}</div>
        </div>
        <div className="flex gap-3">
          <Link to="/change-password" className="text-sm underline">Change password</Link>
          <Button variant="default" onClick={() => logout()}>Logout</Button>
        </div>
      </div>
    </CenteredAuthLayout>
  )
}
