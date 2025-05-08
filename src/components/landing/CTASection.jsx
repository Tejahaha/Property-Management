"use client"

import { useNavigate } from "react-router-dom"

const CtaSection = () => {
  const navigate = useNavigate()

  return (
    <div className="relative overflow-hidden bg-black py-24">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-black to-black"></div>
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-900/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-emerald-900/10 blur-3xl"></div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left side - Text content */}
          <div>
            <h2 className="mb-6 bg-gradient-to-r from-white via-white to-emerald-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
              Ready to Find Your Dream Home?
            </h2>

            <p className="mb-8 text-lg text-white/70">
              Join thousands of satisfied homeowners who found their perfect property with us. Create an account today
              and get personalized recommendations based on your preferences.
            </p>

            <div className="space-y-4 sm:flex sm:space-x-4 sm:space-y-0">
              <button
                onClick={() => navigate("/signup")}
                className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 px-8 py-4 font-medium text-white shadow-lg transition-all duration-300 hover:shadow-emerald-500/25 sm:w-auto"
              >
                <span className="relative z-10">Create Account</span>
                <span className="absolute inset-0 z-0 translate-y-full bg-gradient-to-r from-teal-500 to-emerald-600 transition-transform duration-300 group-hover:translate-y-0"></span>
              </button>

              <button
                onClick={() => navigate("/login")}
                className="group relative w-full overflow-hidden rounded-lg border border-white/20 bg-black/30 px-8 py-4 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 sm:w-auto"
              >
                <span className="relative z-10 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent transition-all duration-300 group-hover:from-emerald-300 group-hover:to-white">
                  Sign In
                </span>
              </button>
            </div>

            {/* Testimonial */}
            <div className="mt-12 rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-xl font-bold text-white">
                  JD
                </div>
                <div>
                  <p className="font-medium text-white">Satish Pamarthi</p>
                  <p className="text-sm text-white/60">Homeowner since 2022</p>
                </div>
              </div>
              <p className="mt-4 text-white/80">
                "The process was seamless from start to finish. I found my dream home within weeks of signing up, and
                the support team was incredible throughout the entire journey."
              </p>
              <div className="mt-2 flex text-emerald-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Floating cards */}
          <div className="relative h-[500px]">
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 opacity-30"></div>
            <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 opacity-20"></div>
            <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 opacity-10"></div>

            {/* Property cards */}
            <div className="absolute top-0 left-0 w-64 animate-float rounded-xl border border-white/10 bg-black/80 p-4 shadow-lg backdrop-blur-sm">
              <div className="relative mb-3 h-36 overflow-hidden rounded-lg">
                <img
                                  src="https://plus.unsplash.com/premium_photo-1711412116755-928b109ae852?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvcGVydHklMjBmb3IlMjBzYWxlfGVufDB8fDB8fHww"

                  alt="Property"
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-2 right-2 rounded-full bg-emerald-600 px-2 py-1 text-xs font-bold text-white">
                  $1.2M
                </div>
              </div>
              <h3 className="text-lg font-bold text-white">Luxury Apartment</h3>
              <p className="text-sm text-white/60">New York, NY</p>
              <div className="mt-2 flex justify-between text-xs text-white/70">
                <span>3 beds</span>
                <span>2 baths</span>
                <span>1,800 sqft</span>
              </div>
            </div>

            <div className="absolute top-1/4 right-0 w-64 animate-float-delayed rounded-xl border border-white/10 bg-black/80 p-4 shadow-lg backdrop-blur-sm">
              <div className="relative mb-3 h-36 overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1608429835892-30be51ea4d6c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fHByb3BlcnR5fGVufDB8fDB8fHww"
                  alt="Property"
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-2 right-2 rounded-full bg-emerald-600 px-2 py-1 text-xs font-bold text-white">
                  $850K
                </div>
              </div>
              <h3 className="text-lg font-bold text-white">Modern Townhouse</h3>
              <p className="text-sm text-white/60">Chicago, IL</p>
              <div className="mt-2 flex justify-between text-xs text-white/70">
                <span>4 beds</span>
                <span>3 baths</span>
                <span>2,200 sqft</span>
              </div>
            </div>

            <div className="absolute bottom-0 left-1/4 w-64 animate-float-reverse rounded-xl border border-white/10 bg-black/80 p-4 shadow-lg backdrop-blur-sm">
              <div className="relative mb-3 h-36 overflow-hidden rounded-lg">
                <img
                                  src="https://images.unsplash.com/photo-1648840887119-a9d33c964054?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHByb3BlcnR5fGVufDB8fDB8fHww"
                  alt="Property"
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-2 right-2 rounded-full bg-emerald-600 px-2 py-1 text-xs font-bold text-white">
                  $1.5M
                </div>
              </div>
              <h3 className="text-lg font-bold text-white">Beachfront Villa</h3>
              <p className="text-sm text-white/60">Miami, FL</p>
              <div className="mt-2 flex justify-between text-xs text-white/70">
                <span>5 beds</span>
                <span>4 baths</span>
                <span>3,500 sqft</span>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-1/3 left-1/3 animate-pulse-slow">
              <div className="rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 p-1">
                <div className="rounded-md bg-black p-2 text-xs font-medium text-white">Just Listed</div>
              </div>
            </div>

            <div className="absolute bottom-1/4 right-1/4 animate-pulse-slow">
              <div className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-1">
                <div className="rounded-md bg-black p-2 text-xs font-medium text-white">Price Reduced</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: (
                <svg className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              ),
              title: "Easy Search",
              description: "Find properties that match your criteria with our powerful search tools.",
            },
            {
              icon: (
                <svg className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              ),
              title: "Virtual Tours",
              description: "Explore properties from the comfort of your home with immersive virtual tours.",
            },
            {
              icon: (
                <svg className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
              title: "Fast Process",
              description: "Our streamlined process ensures quick and hassle-free property transactions.",
            },
            {
              icon: (
                <svg className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              ),
              title: "Secure Transactions",
              description: "Rest easy knowing your transactions are protected with bank-level security.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/30 hover:bg-black/60"
            >
              <div className="mb-4 rounded-full bg-emerald-900/20 p-3 text-emerald-400 transition-colors duration-300 group-hover:bg-emerald-900/30">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CtaSection
