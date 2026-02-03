import { ReactNode } from 'react'

export function CenteredAuthLayout({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-slate-500">Resume Builder</p>
          <h1 className="mt-2 text-2xl font-semibold">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-slate-600">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  )
}
