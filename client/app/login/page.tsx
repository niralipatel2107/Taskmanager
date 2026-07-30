export default function LoginPage() {
  return (
    <main className="min-h-[calc(100vh-73px)] px-6 py-12">
      <section className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-md">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
          Welcome Back
        </p>

        <h1 className="mb-6 text-3xl font-bold text-slate-900">Login</h1>

        <form className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-sky-600 px-4 py-3 font-semibold text-white transition hover:bg-sky-700"
          >
            Login
          </button>
        </form>
      </section>
    </main>
  );
}