"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Hero = () => {
  const navigate = useNavigate()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = [
    "/placeholder.svg?height=1080&width=1920",
    "/placeholder.svg?height=1080&width=1920",
    "/placeholder.svg?height=1080&width=1920",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/80"></div>
            <img 
  src={"https://plus.unsplash.com/premium_photo-1672423154405-5fd922c11af2?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVpbGRpbmd8ZW58MHx8MHx8fDA%3D"} 
  alt="Property" 
  className="h-full w-full object-cover opacity-40" 
/>
          </div>
        ))}
      </div>

      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-black to-black"></div>

      {/* Animated particles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 h-32 w-32 animate-pulse rounded-full bg-emerald-500/10 blur-3xl"></div>
        <div className="absolute top-3/4 right-1/4 h-64 w-64 animate-pulse rounded-full bg-purple-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/2 h-48 w-48 animate-pulse rounded-full bg-blue-500/5 blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="max-w-5xl">
          <h1 className="mb-6 bg-gradient-to-r from-white via-white to-emerald-300 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl md:text-7xl">
            Find Your Dream Home Today
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/80 sm:text-xl">
            Discover exceptional properties in prime locations. Our curated selection offers luxury, comfort, and
            investment opportunities tailored to your lifestyle.
          </p>

          <div className="relative mx-auto mb-16 max-w-md overflow-hidden rounded-lg border border-white/10 bg-black/40 p-1 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-purple-500/10 to-blue-500/10 opacity-50"></div>
            <input
              type="text"
              placeholder="Enter location, property type, or keyword..."
              className="w-full bg-black/60 px-4 py-3 text-white placeholder-white/50 focus:outline-none"
            />
            <button className="absolute right-1 top-1 rounded-md bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-2 font-medium text-white transition-all hover:from-emerald-500 hover:to-emerald-400">
              Search
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate("/all-properties")}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-8 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:shadow-emerald-500/25"
            >
              <span className="relative z-10">Explore Properties</span>
              <span className="absolute inset-0 z-0 translate-y-full bg-gradient-to-r from-teal-500 to-emerald-600 transition-transform duration-300 group-hover:translate-y-0"></span>
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="group relative overflow-hidden rounded-full border border-white/20 bg-black/30 px-8 py-3 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:shadow-lg"
            >
              <span className="relative z-10 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent transition-all duration-300 group-hover:from-emerald-300 group-hover:to-white">
                Get Started
              </span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid w-full max-w-4xl grid-cols-2 gap-8 sm:grid-cols-4">
          {[
            { value: "2,500+", label: "Properties" },
            { value: "1,800+", label: "Happy Clients" },
            { value: "99%", label: "Satisfaction" },
            { value: "15+", label: "Years Experience" },
          ].map((stat, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/30 hover:bg-black/40"
            >
              <div className="absolute -inset-1 z-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-purple-500/0 opacity-0 blur transition-all duration-500 group-hover:opacity-100"></div>
              <div className="relative z-10">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/60">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="h-8 w-8 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Hero
