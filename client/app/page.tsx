export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <section className="mx-auto flex max-w-4xl flex-col items-center rounded-2xl bg-white px-8 py-16 text-center shadow-lg">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
          MERN + Next.js Project
        </p>

        <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Team Issue Tracker
        </h1>

        <p className="mb-8 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          A full-stack project where users can sign up, log in, create issues,
          assign work, and manage team progress.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <button className="rounded-xl bg-sky-600 px-6 py-3 text-white transition hover:bg-sky-700">
            Get Started
          </button>

          <button className="rounded-xl border border-slate-300 px-6 py-3 text-slate-700 transition hover:bg-slate-100">
            View Features
          </button>
        </div>
      </section>
    </main>
  );
}