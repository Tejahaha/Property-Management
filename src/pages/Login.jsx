"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const BaseURL = "http://localhost:8080"
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch(BaseURL + "/user/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.text();
      if (res.ok && data.toLowerCase().indexOf("invalid") === -1) {
        localStorage.setItem("jwtToken", data);
        setSuccess("Login successful! Redirecting to profile...");
        setTimeout(() => navigate("/all-properties"), 1500);
      } else {
        setError(data || "Login failed");
      }
    } catch (err) {
      console.error(err); // log the error for debugging purpose
      setError("Network error");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-black shadow-xl border border-white/10">
        <div className="bg-emerald-600 py-6">
          <h2 className="text-center text-4xl font-extrabold text-white">Welcome Back</h2>
          <p className="mt-2 text-center text-lg text-emerald-100">Sign in to your account</p>
        </div>

        <div className="px-8 py-8">
          {error && (
            <div className="mb-4 rounded-md bg-red-900/30 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-200">{error}</p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-md bg-green-900/30 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-200">{success}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-2xl font-large text-white">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="block w-full appearance-none rounded-lg border border-white/20 bg-black px-4 py-3 placeholder-white/50 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-lg"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
            <label htmlFor="password" className="block text-2xl font-large text-white">
            Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="block w-full appearance-none rounded-lg border border-white/20 bg-black px-4 py-3 placeholder-white/50 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-lg"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-lg border border-transparent bg-emerald-600 px-5 py-3 text-lg font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-emerald-500 group-hover:text-emerald-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-black px-2 text-white/70">Don't have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="/signup"
                className="flex w-full justify-center rounded-lg border border-white/20 bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-white/5"
              >
                Create new account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
