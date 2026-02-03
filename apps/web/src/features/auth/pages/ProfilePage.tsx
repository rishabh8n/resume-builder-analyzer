import { useAuthStore } from '@/features/auth/store/useAuthStore'

export function ProfilePage() {
  const user = useAuthStore((s) => s.user)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-2xl font-semibold">Account</h1>
        <div className="mt-6 rounded-md border bg-white p-4">
          <p><span className="font-medium">Name:</span> {user?.name}</p>
          <p><span className="font-medium">Email:</span> {user?.email}</p>
        </div>
      </div>
    </div>
  )
}
