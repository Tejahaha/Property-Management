"use client"

import { useState, useEffect } from "react"

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("All")

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setProperties([
            {
              id: 1,
              title: "Luxury Penthouse",
              price: 1250000,
              address: "123 Skyline Ave, New York",
              description: "Stunning penthouse with panoramic city views, featuring 3 bedrooms and a private terrace.",
              type: "Apartment",
              bedrooms: 3,
              bathrooms: 2,
              area: 2100,
              featured: true,
              imagePath: "https://plus.unsplash.com/premium_photo-1686090449192-4ab1d00cb735?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvcGVydHl8ZW58MHx8MHx8fDA%3D",
            },
            {
              id: 2,
              title: "Modern Villa",
              price: 2450000,
              address: "456 Oceanview Dr, Miami",
              description: "Contemporary beachfront villa with infinity pool and smart home technology.",
              type: "House",
              bedrooms: 5,
              bathrooms: 4,
              area: 3800,
              featured: true,
              imagePath: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvcGVydHl8ZW58MHx8MHx8fDA%3D",
            },
            {
              id: 3,
              title: "Urban Loft",
              price: 850000,
              address: "789 Downtown St, Chicago",
              description: "Industrial-style loft in the heart of the city with exposed brick and high ceilings.",
              type: "Apartment",
              bedrooms: 2,
              bathrooms: 2,
              area: 1600,
              featured: true,
              imagePath: "https://images.unsplash.com/photo-1483097365279-e8acd3bf9f18?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb3BlcnR5fGVufDB8fDB8fHww",
            },
            {
              id: 4,
              title: "Countryside Retreat",
              price: 1750000,
              address: "101 Valley Rd, Aspen",
              description: "Secluded mountain home with breathtaking views and modern amenities.",
              type: "House",
              bedrooms: 4,
              bathrooms: 3,
              area: 2900,
              featured: true,
              imagePath: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb3BlcnR5fGVufDB8fDB8fHww",
            },
            {
              id: 5,
              title: "Waterfront Condo",
              price: 975000,
              address: "202 Harbor Blvd, San Francisco",
              description: "Elegant waterfront condo with marina views and luxury finishes throughout.",
              type: "Apartment",
              bedrooms: 2,
              bathrooms: 2,
              area: 1800,
              featured: true,
              imagePath: "https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHByb3BlcnR5fGVufDB8fDB8fHww",
            },
            {
              id: 6,
              title: "Historic Townhouse",
              price: 1650000,
              address: "303 Heritage Ln, Boston",
              description: "Beautifully restored historic townhouse with modern updates and private garden.",
              type: "Townhouse",
              bedrooms: 3,
              bathrooms: 2.5,
              area: 2400,
              featured: true,
              imagePath: "https://images.unsplash.com/photo-1608429835892-30be51ea4d6c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fHByb3BlcnR5fGVufDB8fDB8fHww",
            },
          ])
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching properties:", error)
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  const filters = ["All", "Apartment", "House", "Townhouse"]

  const filteredProperties =
    activeFilter === "All" ? properties : properties.filter((property) => property.type === activeFilter)

  return (
    <div className="relative overflow-hidden bg-black py-24">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 h-96 w-96 bg-gradient-to-r from-emerald-900/20 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-96 w-96 bg-gradient-to-l from-purple-900/10 to-transparent blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 inline-block bg-gradient-to-r from-white via-white to-emerald-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Featured Properties
          </h2>
          <div className="mx-auto h-1 w-24 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            Discover our handpicked selection of premium properties in the most desirable locations
          </p>

          {/* Filters */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative overflow-hidden rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-emerald-600 to-teal-500 text-white"
                    : "border border-white/10 bg-black text-white/70 hover:border-white/30 hover:text-white"
                }`}
              >
                {activeFilter === filter && <span className="absolute inset-0 animate-pulse bg-white/10"></span>}
                <span className="relative">{filter}</span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-black transition-all duration-500 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5"
                >
                  {/* Property image with overlay */}
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60"></div>
                    <img
                      src={property.imagePath || "/placeholder.svg"}
                      alt={property.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 rounded-full bg-black/70 px-3 py-1 text-sm font-bold text-emerald-400 backdrop-blur-sm">
                      ${property.price.toLocaleString()}
                    </div>
                    <div className="absolute bottom-4 left-4 rounded-full bg-emerald-600/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {property.type}
                    </div>
                  </div>

                  {/* Property details */}
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold text-white group-hover:text-emerald-300">{property.title}</h3>
                    <p className="mb-4 line-clamp-2 text-white/70">{property.description}</p>

                    {/* Property features */}
                    <div className="mb-6 flex flex-wrap gap-4">
                      <div className="flex items-center text-white/60">
                        <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                        <span className="text-sm">{property.bedrooms} Beds</span>
                      </div>
                      <div className="flex items-center text-white/60">
                        <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-sm">{property.bathrooms} Baths</span>
                      </div>
                      <div className="flex items-center text-white/60">
                        <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                          />
                        </svg>
                        <span className="text-sm">{property.area} sqft</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-sm text-white/60">
                        <svg
                          className="mr-1 h-4 w-4 text-emerald-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {property.address}
                      </span>
                    </div>
                  </div>


                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default FeaturedProperties
