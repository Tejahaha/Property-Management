"use client"

import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [jwtToken, setJwtToken] = useState(null)
  const [user, setUser] = useState(null)

  // Check for JWT token on initial load
  useEffect(() => {
    // Check if we're in a browser environment before accessing localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('jwtToken')
      setJwtToken(token)
    }
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    if (jwtToken) {
      try {
        const decoded = jwtDecode(jwtToken)
        const fetchUser = async () => {
          try {
            const res = await fetch(`http://localhost:8080/user/${decoded.id}`)
            if (!res.ok) throw new Error("Failed to fetch user")
            const data = await res.json()
            setUser(data)
          } catch (err) {
            console.error(err)
          }
        }
        fetchUser()
      } catch (err) {
        console.error("Invalid token", err)
      }
    }
  }, [jwtToken])

  return (
    <header className={`navbar fixed top-0 left-30 z-50 w-full transition-all duration-300 ${
      isScrolled ? 'scrolled bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="navbar-container container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-emerald-500/20">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 opacity-80"></div>
                <div className="absolute inset-0 animate-pulse-slow bg-gradient-to-br from-emerald-300/20 via-transparent to-purple-500/10"></div>
              </div>
              <span className="ml-3 bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-xl font-bold text-transparent">ZYPHOR Property</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <a 
                  href="/"
                  className="relative text-white/80 transition-colors duration-300 hover:text-white"
                >
                  Home
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 hover:w-full"></span>
                </a>
              </li>
              <li>
                <a 
                  href="/sites"
                  className="relative text-white/80 transition-colors duration-300 hover:text-white"
                >
                  properties
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 hover:w-full"></span>
                </a>
              </li>
              <li>
                <a 
                  href="/all-properties"
                  className="relative text-white/80 transition-colors duration-300 hover:text-white"
                >
                  properties on lease
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 hover:w-full"></span>
                </a>
              </li>
              <li>
                <a 
                  href="/settings"
                  className="relative text-white/80 transition-colors duration-300 hover:text-white"
                >
                  Settings
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 hover:w-full"></span>
                </a>
              </li>
            </ul>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden items-center space-x-4 md:flex">
            {!jwtToken ? (
              <>
                <a 
                  href="/login"
                  className="rounded-full border border-white/10 bg-black/30 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-black/40 hover:underline"
                >
                  Log In
                </a>
                <a 
                  href="/signup"
                  className="rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 hover:underline"
                >
                  Sign Up
                </a>
              </>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-lg font-bold text-white shadow-lg">
                {user && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-lg font-bold text-white shadow-lg">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            )}
          </div>


          {/* Mobile Menu Button */}
          <button 
            className="block md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mt-4 rounded-lg border border-white/10 bg-black/80 p-4 backdrop-blur-lg md:hidden">
            <nav className="flex flex-col space-y-4">
              <a 
                href="/"
                className="text-white/80 transition-colors duration-300 hover:text-white"
              >
                Home
              </a>
              <a 
                href="/sites"
                className="text-white/80 transition-colors duration-300 hover:text-white"
              >
                Sites
              </a>
              <a 
                href="/all-properties"
                className="text-white/80 transition-colors duration-300 hover:text-white"
              >
                All Properties
              </a>
              <a 
                href="/settings"
                className="text-white/80 transition-colors duration-300 hover:text-white"
              >
                Settings
              </a>
              
              {!jwtToken && (
                <div className="flex flex-col space-y-3 pt-2">
                  <a 
                    href="/login"
                    className="w-full rounded-full border border-white/10 bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-white/30 hover:underline"
                  >
                    Log In
                  </a>
                  <a 
                    href="/signup"
                    className="w-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-emerald-500/25 hover:underline"
                  >
                    Sign Up
                  </a>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar