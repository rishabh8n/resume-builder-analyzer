import { Link } from 'react-router-dom'

export function NotFoundRoute() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-20 text-center">
        <p className="text-sm font-medium text-slate-500">404</p>
        <h1 className="mt-2 text-3xl font-semibold">Page not found</h1>
        <p className="mt-3 text-slate-600">
          The page you’re looking for doesn’t exist or was moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
