import { Link, useRouteError } from 'react-router-dom'

type RouteError = {
  statusText?: string
  message?: string
}

export function ErrorRoute() {
  const error = useRouteError() as RouteError

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-20 text-center">
        <p className="text-sm font-medium text-slate-500">Something went wrong</p>
        <h1 className="mt-2 text-3xl font-semibold">We hit an error</h1>
        <p className="mt-3 text-slate-600">
          {error?.statusText || error?.message || 'Please try again.'}
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            to="/"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Go home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium"
          >
            Reload
          </button>
        </div>
      </div>
    </div>
  )
}
