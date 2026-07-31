"use client";

import { FormEvent, useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("Nirali");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

const handleSignup = async (event:FormEvent<HTMLFormElement>)=>{
event.preventDefault();
setMessage("");
setIsLoading(true);
// console.log({
//   name,
//   email,
//   password
// })

try {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
  } catch (error) {
    setMessage("Something went wrong. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <main className="min-h-[calc(100vh-73px)] px-6 py-12">
      <section className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-md">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
          Create Account
        </p>

        <h1 className="mb-6 text-3xl font-bold text-slate-900">Sign Up</h1>

        <form className="space-y-5" onSubmit={handleSignup}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-sky-600 px-4 py-3 font-semibold text-white transition hover:bg-sky-700"
          >
            Create Account
          </button>
        </form>
      </section>
    </main>
  );
}