"use client"

import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"

function Settings() {
  const [userId, setUserId] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("jwtToken")
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUserId(decoded.id)
      } catch (err) {
        console.error(err)
        setError("Invalid token")
        setLoading(false)
      }
    } else {
      setError("No token found")
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!userId) return
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:8080/user/${userId}`)
        if (!res.ok) throw new Error("Failed to fetch user")
        const data = await res.json()
        setUser(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [userId])

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600"></div>
          <p className="mt-4 text-lg font-medium text-white">Loading your profile...</p>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl bg-red-900/20 p-8 text-center shadow-lg">
          <svg className="mx-auto mb-4 h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="mb-2 text-xl font-medium text-red-300">Error: {error}</h3>
          <button
            onClick={() => (window.location.href = "/login")}
            className="mt-4 rounded-lg bg-red-800/30 px-5 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-800/50"
          >
            Back to Login
          </button>
        </div>
      </div>
    )

  if (!user)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-xl bg-black p-8 text-center shadow-lg border border-white/10">
          <svg className="mx-auto mb-4 h-16 w-16 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <h3 className="text-xl font-medium text-white">No user profile found</h3>
        </div>
      </div>
    )

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold text-white">Account Settings</h1>

        <div className="mb-8 overflow-hidden rounded-xl bg-black shadow-lg border border-white/10">
          <div className="border-b border-white/10 bg-black px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Profile Information</h2>
          </div>

          <div className="p-6">
            <div className="flex flex-col items-center justify-center sm:flex-row sm:items-start">
              <div className="mb-6 flex flex-col items-center sm:mb-0 sm:mr-8">
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-5xl font-bold text-white shadow-lg">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="w-full max-w-md space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white">Full Name</label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      value={user.name || ""}
                      readOnly
                      className="block w-full rounded-lg border border-white/20 bg-black px-4 py-2 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white">Email Address</label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="email"
                      value={user.email || ""}
                      readOnly
                      className="block w-full rounded-lg border border-white/20 bg-black px-4 py-2 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white">Phone Number</label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="tel"
                      value={user.phone || ""}
                      readOnly
                      className="block w-full rounded-lg border border-white/20 bg-black px-4 py-2 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 overflow-hidden rounded-xl bg-black shadow-lg border border-white/10">
          <div className="border-b border-white/10 bg-black px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Security</h2>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              <div>
                <button className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-center font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                  Change Password
                </button>
              </div>

              <div>
                <button
                  onClick={() => {
                    localStorage.removeItem("jwtToken")
                    window.location.href = "/login"
                  }}
                  className="w-full rounded-lg bg-red-600 px-4 py-2 text-center font-medium text-white shadow-sm transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
