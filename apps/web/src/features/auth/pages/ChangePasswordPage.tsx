import { useState } from 'react'
import { changePassword } from '@/features/auth/api/authApi'

export function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [done, setDone] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await changePassword(currentPassword, newPassword)
    setDone(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-md px-6 py-16">
        <h1 className="text-2xl font-semibold">Change password</h1>
        {done ? (
          <p className="mt-4 text-slate-600">Password changed successfully.</p>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <input
              className="w-full rounded-md border px-3 py-2"
              placeholder="Current password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              className="w-full rounded-md border px-3 py-2"
              placeholder="New password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className="w-full rounded-md bg-slate-900 px-4 py-2 text-white">Update</button>
          </form>
        )}
      </div>
    </div>
  )
}
