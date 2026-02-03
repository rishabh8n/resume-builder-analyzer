import { Link } from 'react-router-dom'

export function HomeRoute() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-sm uppercase tracking-widest text-slate-500">Resume Builder</div>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/login" className="text-slate-700 hover:text-slate-900">Login</Link>
            <Link
              to="/register"
              className="rounded-md bg-slate-900 px-4 py-2 text-white"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">AI Resume Builder</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Build a job‑ready resume in minutes
            </h1>
            <p className="mt-5 text-base text-slate-600">
              A clean, modern resume builder with AI suggestions, ATS scoring, and smart
              project matching—designed for students and job seekers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="rounded-md bg-slate-900 px-5 py-2.5 text-sm text-white"
              >
                Start free
              </Link>
              <Link
                to="/login"
                className="rounded-md border px-5 py-2.5 text-sm text-slate-700"
              >
                I already have an account
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 md:grid-cols-3">
          {[
            {
              title: 'Smart Builder',
              desc: 'Drag‑and‑drop sections, beautiful templates, and instant preview.',
            },
            {
              title: 'AI Enhancements',
              desc: 'Improve bullets, add impact, and tailor to a job description.',
            },
            {
              title: 'ATS Friendly',
              desc: 'Keyword matching and scoring to boost your chances.',
            },
          ].map((f) => (
            <div key={f.title} className="rounded-lg border p-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500">
                {f.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600">{f.desc}</p>
            </div>
          ))}
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="rounded-xl bg-slate-900 px-6 py-10 text-white">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-semibold">Ready to build yours?</h2>
                <p className="mt-2 text-sm text-slate-300">
                  Create a professional resume with AI in a few clicks.
                </p>
              </div>
              <Link to="/register" className="rounded-md bg-white px-5 py-2.5 text-sm text-slate-900">
                Get started
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Resume Builder</span>
          <span>Built for students and job seekers</span>
        </div>
      </footer>
    </div>
  )
}
